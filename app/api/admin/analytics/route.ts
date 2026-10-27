import {analyticsDb} from '../../../analytics-db';
import {api,isAdmin,json} from '../../../server';
import {fillSeries,aggregateDetails,analyticsPath,localDay,periodStart,retentionDays,type ViewRow} from '../../../analytics-model';
export const dynamic='force-dynamic';
export async function GET(request:Request){return api(async()=>{
 if(!await isAdmin())return json({error:'Prihlásenie je potrebné.'},401);
 const q=new URL(request.url).searchParams,period=q.get('period')||'week',path=q.get('path')||'',device=q.get('device')||'';
 if(!['day','week','month','year','all'].includes(period)||(path&&!analyticsPath.safeParse(path).success)||(device&&!['mobile','desktop'].includes(device)))return json({error:'Neplatný filter.'},400);
 const db=await analyticsDb();
 await db.prepare('DELETE FROM analytics_views WHERE started_at < ?').bind(Date.now()-retentionDays*86400000).run();
 const from=period==='all'?((await db.prepare('SELECT MIN(day) AS day FROM analytics_views').first<{day:string|null}>())?.day||localDay()):periodStart(period),to=localDay();const where='day >= ? AND day <= ?'+(path?' AND path = ?':'')+(device?' AND device = ?':'');const args=[from,to,...(path?[path]:[]),...(device?[device]:[])];
 const bucket=period==='day'?'hour':(period==='year'||period==='all')?"substr(day,1,7)":'day';
 const [summary,series,pages,rows,paths]=await Promise.all([
 db.prepare('SELECT COUNT(*) views, COUNT(DISTINCT visitor) visitors, COUNT(DISTINCT session) sessions, COALESCE(SUM(seconds),0) seconds, COALESCE(SUM(clicks),0) clicks, COALESCE(AVG(depth),0) depth FROM analytics_views WHERE '+where).bind(...args).first(),
 db.prepare('SELECT '+bucket+' bucket,COUNT(*) views,COUNT(DISTINCT visitor) visitors FROM analytics_views WHERE '+where+' GROUP BY bucket ORDER BY bucket').bind(...args).all(),
 db.prepare('SELECT path,COUNT(*) views,COUNT(DISTINCT visitor) visitors,SUM(seconds) seconds,SUM(clicks) clicks FROM analytics_views WHERE '+where+' GROUP BY path ORDER BY views DESC LIMIT 100').bind(...args).all(),
 db.prepare('SELECT path,payload FROM analytics_views WHERE '+where+' ORDER BY started_at DESC LIMIT 1000').bind(...args).all<ViewRow>(),
 db.prepare('SELECT DISTINCT path FROM analytics_views ORDER BY path LIMIT 300').all()
 ]);
 return json({from,to,period,summary,series:fillSeries(series.results as {bucket:string;views:number;visitors:number}[],period,from,to),pages:pages.results,paths:paths.results.map((r:any)=>r.path),sample:rows.results.length,...aggregateDetails(rows.results)});
})}
