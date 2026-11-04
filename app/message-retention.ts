import {env} from 'cloudflare:workers';
let ready:Promise<unknown>|undefined;
export const inquiryRetentionDays=365;
export async function inquiryDb(){const db=env.DB!;ready??=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS message_resolutions (id TEXT PRIMARY KEY,resolved_at INTEGER NOT NULL)'),
 // Existing completed inquiries receive a full retention period from introduction.
 db.prepare("INSERT OR IGNORE INTO message_resolutions(id,resolved_at) SELECT id,? FROM messages WHERE status='done'").bind(Date.UTC(2026,10,4))
]).catch(error=>{ready=undefined;throw error});await ready;
 await db.batch([
 db.prepare("DELETE FROM messages WHERE status='done' AND id IN (SELECT id FROM message_resolutions WHERE resolved_at<?)").bind(Date.now()-inquiryRetentionDays*86400000),
 db.prepare('DELETE FROM message_resolutions WHERE id NOT IN (SELECT id FROM messages)')
 ]);return db;
}
