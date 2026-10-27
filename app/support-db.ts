import {env} from 'cloudflare:workers';
let ready:Promise<unknown>|undefined;
export async function supportDb(){const db=env.DB!;if(!ready)ready=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS support_settings (id INTEGER PRIMARY KEY,override_until INTEGER NOT NULL DEFAULT 0)'),
 db.prepare('INSERT OR IGNORE INTO support_settings(id,override_until) VALUES(1,0)'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_presence (username TEXT PRIMARY KEY,last_at INTEGER NOT NULL)'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_online_days (username TEXT NOT NULL,day TEXT NOT NULL,milliseconds INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(username,day))'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_reviews (room TEXT NOT NULL,operator TEXT NOT NULL,rating INTEGER NOT NULL,note TEXT NOT NULL,PRIMARY KEY(room,operator))'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_users (username TEXT PRIMARY KEY,salt TEXT NOT NULL,hash TEXT NOT NULL)'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_sessions (id TEXT PRIMARY KEY,username TEXT NOT NULL,expires_at INTEGER NOT NULL,seen_at INTEGER NOT NULL DEFAULT 0)'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_rooms (id TEXT PRIMARY KEY,token_hash TEXT NOT NULL,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,status TEXT NOT NULL DEFAULT \'open\',rating INTEGER,note TEXT NOT NULL DEFAULT \'\')'),
 db.prepare('CREATE TABLE IF NOT EXISTS support_messages (seq INTEGER PRIMARY KEY AUTOINCREMENT,id TEXT UNIQUE NOT NULL,room TEXT NOT NULL,sender TEXT NOT NULL,text TEXT NOT NULL,created_at INTEGER NOT NULL,read_at INTEGER,operator TEXT)'),
 db.prepare('CREATE INDEX IF NOT EXISTS support_messages_room ON support_messages(room,seq)'),
 db.prepare('CREATE INDEX IF NOT EXISTS support_rooms_updated ON support_rooms(updated_at)')
]).catch(e=>{ready=undefined;throw e});await ready;const cutoff=Date.now()-90*86400000;await db.batch([db.prepare('DELETE FROM support_online_days WHERE day<?').bind(new Date(Date.now()-400*86400000).toISOString().slice(0,10)),db.prepare('DELETE FROM support_reviews WHERE room IN (SELECT id FROM support_rooms WHERE updated_at<?)').bind(cutoff),db.prepare('DELETE FROM support_messages WHERE room IN (SELECT id FROM support_rooms WHERE updated_at<?)').bind(cutoff),db.prepare('DELETE FROM support_rooms WHERE updated_at<?').bind(cutoff)]);return db}
