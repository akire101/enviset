import {analyticsDb} from '../../analytics-db';
import {api,body,json,limit} from '../../server';
import {analyticsSchema,localDay,retentionDays} from '../../analytics-model';
export async function POST(request:Request){return api(async()=>{
 const parsed=analyticsSchema.safeParse(await body(request));if(!parsed.success)return json({error:'Neplatné meranie.'},400);
 if(/bot|crawler|spider|headless/i.test(request.headers.get('user-agent')||''))return json({ok:true});
 await limit(request,'analytics',600,60000);
 const db=await analyticsDb();
 const p=parsed.data,now=Date.now();const clicks=p.targets.reduce((n,t)=>n+t.clicks,0);
 const hour=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bratislava',hour:'2-digit',hourCycle:'h23'}).format(now);
 await db.batch([
 db.prepare('DELETE FROM analytics_views WHERE started_at < ?').bind(now-retentionDays*86400000),
 db.prepare('INSERT INTO analytics_views (id,visitor,session,path,device,day,hour,started_at,updated_at,sequence,seconds,depth,clicks,payload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET updated_at=excluded.updated_at,sequence=excluded.sequence,seconds=excluded.seconds,depth=excluded.depth,clicks=excluded.clicks,payload=excluded.payload WHERE excluded.sequence>analytics_views.sequence AND excluded.visitor=analytics_views.visitor AND excluded.path=analytics_views.path').bind(p.id,p.visitor,p.session,p.path,p.device,localDay(new Date(now)),hour,now,now,p.sequence,p.seconds,p.depth,clicks,JSON.stringify(p))
 ]);return json({ok:true});
})}
