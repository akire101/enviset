import {requireArticleImage} from '../../../article-image-server';
import {ensureBlogImages} from '../../../blog-image-migration';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../db';
import { posts } from '../../../../db/schema';
import { eq,desc } from 'drizzle-orm';
import { postSchema } from '../../../validation';
import { api,adminBody,json,isAdmin } from '../../../server';
export const dynamic='force-dynamic';
export async function GET(){return api(async()=>{if(!await isAdmin())return json({error:'Prihlásenie je potrebné.'},401);await ensureBlogImages();return json(await getDb().select().from(posts).orderBy(desc(posts.updatedAt)))})}
export async function POST(request:Request){return api(async()=>{const parsed=postSchema.safeParse(await adminBody(request));if(!parsed.success)return json({error:parsed.error.issues[0].message},400);await requireArticleImage(parsed.data.image);const {updatedAt,...data}=parsed.data;const existing=await getDb().select({id:posts.id}).from(posts).where(eq(posts.slug,data.slug)).limit(1);const reserved=await env.DB!.prepare('SELECT slug FROM post_redirects WHERE slug = ?').bind(data.slug).first();if(existing.length||reserved)return json({error:'Táto adresa článku už existuje.'},409);const now=Date.now();const row={...data,id:crypto.randomUUID(),createdAt:now,updatedAt:now,publishedAt:data.status==='published'?now:null};try{await getDb().insert(posts).values(row)}catch(e){if(String(e).includes('UNIQUE'))return json({error:'Táto adresa článku už existuje.'},409);throw e}return json(row,201)})}
