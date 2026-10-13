import { getDb } from '../../../../db';
import { messages } from '../../../../db/schema';
import { desc,eq } from 'drizzle-orm';
import { api,adminBody,json,isAdmin } from '../../../server';
import { z } from 'zod';
export const dynamic='force-dynamic';
export async function GET(){return api(async()=>{if(!await isAdmin())return json({error:'Prihlásenie je potrebné.'},401);return json(await getDb().select().from(messages).orderBy(desc(messages.createdAt)))})}
export async function PUT(request:Request){return api(async()=>{const parsed=z.object({id:z.string().uuid(),status:z.enum(['new','done'])}).safeParse(await adminBody(request));if(!parsed.success)return json({error:'Neplatná zmena.'},400);await getDb().update(messages).set({status:parsed.data.status}).where(eq(messages.id,parsed.data.id));return json({ok:true})})}
