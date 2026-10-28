import {ensureBlogImages} from './blog-image-migration';
import { env } from 'cloudflare:workers';
import { cookies } from 'next/headers';
import { eq, desc, and } from 'drizzle-orm';
import { getDb } from '../db';
import { posts } from '../db/schema';
import { sameOrigin } from './validation';
export type Post=typeof posts.$inferSelect;
export async function publicPosts(){await ensureBlogImages();return getDb().select().from(posts).where(eq(posts.status,'published')).orderBy(desc(posts.publishedAt));}
export async function publicPost(slug:string){await ensureBlogImages();return (await getDb().select().from(posts).where(and(eq(posts.slug,slug),eq(posts.status,'published'))).limit(1))[0];}
export async function oldPost(slug:string){return env.DB!.prepare('SELECT p.slug FROM post_redirects r JOIN posts p ON p.id = r.post_id WHERE r.slug = ? AND p.status = ?').bind(slug,'published').first<{slug:string}>();}
export async function digest(text:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('');}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:100000},key,256);return Array.from(new Uint8Array(bits),x=>x.toString(16).padStart(2,'0')).join('');}
export const cookieName='envi_admin_session';
export async function isAdmin(){const token=(await cookies()).get(cookieName)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return false;return !!await env.DB!.prepare('SELECT id FROM sessions WHERE id = ? AND expires_at > ?').bind(await digest(token),Date.now()).first();}
export class HttpError extends Error{constructor(public status:number,message:string){super(message)}}
export async function body(request:Request){if(!sameOrigin(request))throw new HttpError(403,'Požiadavka pochádza z inej stránky.');if(!request.headers.get('content-type')?.includes('application/json'))throw new HttpError(415,'Vyžaduje sa JSON.');const reader=request.body?.getReader();if(!reader)throw new HttpError(400,'Chýbajú údaje.');const chunks:Uint8Array[]=[];let size=0;while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>70000){await reader.cancel();throw new HttpError(413,'Príliš veľa údajov.')}chunks.push(value)}const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}try{return JSON.parse(new TextDecoder().decode(bytes))}catch{throw new HttpError(400,'Neplatné údaje.')}}
export async function adminBody(request:Request){if(!await isAdmin())throw new HttpError(401,'Najprv sa prihláste.');return body(request);}
export function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{'Cache-Control':'no-store',...headers}})}
export async function api(fn:()=>Promise<Response>){try{return await fn()}catch(e){if(e instanceof HttpError)return json({error:e.message},e.status);console.error('API operation failed');return json({error:'Operáciu sa nepodarilo dokončiť. Skúste to znova.'},500)}}
export async function limit(request:Request,kind:string,max:number,windowMs:number){const now=Date.now();const ip=request.headers.get('cf-connecting-ip')||'local';const key=await digest(`${kind}:${ip}:${env.ADMIN_PASSWORD_SALT||'envi'}`);await env.DB!.prepare('DELETE FROM rate_limits WHERE expires_at < ?').bind(now).run();const row=await env.DB!.prepare('INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count').bind(key,now+windowMs).first<{count:number}>();if(!row||row.count>max)throw new HttpError(429,'Príliš veľa pokusov. Skúste to neskôr.');}
