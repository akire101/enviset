import { env } from 'cloudflare:workers';
import { cookies } from 'next/headers';
import { api,body,json,digest,cookieName } from '../../server';
export async function POST(request:Request){return api(async()=>{await body(request);const token=(await cookies()).get(cookieName)?.value;if(token)await env.DB!.prepare('DELETE FROM sessions WHERE id = ?').bind(await digest(token)).run();return json({ok:true},200,{'Set-Cookie':`${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${new URL(request.url).protocol==='https:'?'; Secure':''}`})})}
