import {env} from 'cloudflare:workers';
import {postOrderSchema,type PostOrder} from './post-order';
let ready:Promise<unknown>|undefined;
export async function postOrderDb(){ready??=env.DB!.batch([
 env.DB!.prepare('CREATE TABLE IF NOT EXISTS post_order (id INTEGER PRIMARY KEY CHECK(id=1),value TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 0)'),
 env.DB!.prepare('INSERT OR IGNORE INTO post_order(id,value,revision) VALUES(1,?,0)').bind(JSON.stringify({order:[],pinned:[]}))
]).catch(error=>{ready=undefined;throw error});await ready;return env.DB!}
export async function readPostOrder():Promise<PostOrder>{const db=await postOrderDb();const row=await db.prepare('SELECT value,revision FROM post_order WHERE id=1').first<{value:string;revision:number}>();if(!row)throw new Error('Missing article order');return postOrderSchema.parse({...JSON.parse(row.value),revision:row.revision})}
