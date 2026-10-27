import {env} from 'cloudflare:workers';
// Additive, idempotent bootstrap also supports deployments without a migration CLI.
let ready:Promise<unknown>|undefined;
export async function analyticsDb(){
 ready??=env.DB!.batch(["CREATE TABLE IF NOT EXISTS analytics_views (\n id TEXT PRIMARY KEY, visitor TEXT NOT NULL, session TEXT NOT NULL, path TEXT NOT NULL,\n device TEXT NOT NULL, day TEXT NOT NULL, hour TEXT NOT NULL, started_at INTEGER NOT NULL,\n updated_at INTEGER NOT NULL, sequence INTEGER NOT NULL, seconds INTEGER NOT NULL,\n depth INTEGER NOT NULL, clicks INTEGER NOT NULL, payload TEXT NOT NULL\n)","CREATE INDEX IF NOT EXISTS analytics_day ON analytics_views(day)","CREATE INDEX IF NOT EXISTS analytics_started ON analytics_views(started_at)"].map(sql=>env.DB!.prepare(sql))).catch(error=>{ready=undefined;throw error});
 await ready;return env.DB!;
}
