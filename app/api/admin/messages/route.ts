import { getDb } from '../../../../db';
import { messages } from '../../../../db/schema';
import { desc } from 'drizzle-orm';
import { api,adminBody,json,isAdmin } from '../../../server';
import { z } from 'zod';
import {inquiryDb} from '../../../message-retention';
export const dynamic='force-dynamic';
export async function GET(){return api(async()=>{if(!await isAdmin())return json({error:'Prihlásenie je potrebné.'},401);await inquiryDb();return json(await getDb().select().from(messages).orderBy(desc(messages.createdAt)))})}
export async function PUT(request:Request){return api(async()=>{const parsed=z.object({id:z.string().uuid(),status:z.enum(['new','done'])}).safeParse(await adminBody(request));if(!parsed.success)return json({error:'Neplatná zmena.'},400);const db=await inquiryDb();const {id,status}=parsed.data;await db.batch([
 db.prepare('UPDATE messages SET status=? WHERE id=?').bind(status,id),
 status==='done'?db.prepare('INSERT OR IGNORE INTO message_resolutions(id,resolved_at) SELECT id,? FROM messages WHERE id=?').bind(Date.now(),id):db.prepare('DELETE FROM message_resolutions WHERE id=?').bind(id)
 ]);return json({ok:true})})}
