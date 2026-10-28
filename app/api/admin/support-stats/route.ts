import {supportQueue,reminderSeconds} from '../../../support-insights';
import {responseSummary} from '../../../support-metrics';
import {api,json,isAdmin,HttpError} from '../../../server';
import {supportDb} from '../../../support-db';
import {overrideUntil,hoursAllowed} from '../../../support-server';
import {supportAccounts,supportName,bratislavaDayStart} from '../../../support-model';
import {localDay} from '../../../analytics-model';
export async function GET(request:Request){return api(async()=>{
 if(!await isAdmin())throw new HttpError(401,'Najprv sa prihláste.');
 const days=new URL(request.url).searchParams.get('days')||'30';if(!['1','7','30','365','all'].includes(days))throw new HttpError(400,'Neplatné obdobie.');
 const now=Date.now(),from=days==='all'?0:bratislavaDayStart(new Date(Date.parse(localDay()+'T12:00:00Z')-(Number(days)-1)*86400000)),fromDay=days==='all'?'0000-01-01':localDay(new Date(from)),db=await supportDb();
 const summary=await db.prepare(`SELECT COUNT(*) AS rooms,SUM(status='closed') AS closed,AVG((SELECT MIN(m.created_at) FROM support_messages m WHERE m.room=r.id AND m.sender='support')-r.created_at)/1000 AS response_seconds FROM support_rooms r WHERE r.created_at>=?`).bind(from).first();
 const messages=await db.prepare(`SELECT COUNT(*) AS total,SUM(sender='visitor' AND read_at IS NULL) AS unread,SUM(sender='visitor' AND read_at IS NULL AND created_at<?) AS overdue FROM support_messages WHERE created_at>=?`).bind(now-300000,from).first();
 const first=(await db.prepare(`SELECT m.operator,(m.created_at-r.created_at)/1000.0 AS seconds FROM support_rooms r JOIN support_messages m ON m.seq=(SELECT MIN(f.seq) FROM support_messages f WHERE f.room=r.id AND f.sender='support') WHERE r.created_at>=?`).bind(from).all<{operator:string;seconds:number}>()).results;
 const responses=responseSummary(first.map(r=>r.seconds));
 const allowed=await hoursAllowed();
 const operators=await Promise.all(supportAccounts.map(async username=>{
 const [activity,duration,presence,account,review]=await Promise.all([
 db.prepare(`SELECT COUNT(*) AS replies,COUNT(DISTINCT room) AS conversations,AVG(CASE WHEN m.seq=(SELECT MIN(first.seq) FROM support_messages first WHERE first.room=m.room AND first.sender='support') THEN (m.created_at-r.created_at)/1000 END) AS response_seconds FROM support_messages m JOIN support_rooms r ON r.id=m.room WHERE m.sender='support' AND m.operator=? AND m.created_at>=?`).bind(username,from).first<Record<string,number|null>>(),
 db.prepare('SELECT COALESCE(SUM(milliseconds),0) AS online_ms FROM support_online_days WHERE username=? AND day>=?').bind(username,fromDay).first<{online_ms:number}>(),
 db.prepare('SELECT MAX(seen_at) AS seen_at FROM support_sessions WHERE username=? AND expires_at>? AND seen_at>?').bind(username,now,now-75000).first<{seen_at:number|null}>(),
 db.prepare('SELECT username FROM support_users WHERE username=?').bind(username).first(),
 db.prepare('SELECT AVG(v.rating) AS rating,COUNT(*) AS ratings FROM support_reviews v JOIN support_rooms r ON r.id=v.room WHERE v.operator=? AND r.created_at>=?').bind(username,from).first<Record<string,number|null>>()
 ]);return {username,name:supportName(username),...activity,...duration,...review,responses:responseSummary(first.filter(r=>r.operator===username).map(r=>r.seconds)),online:allowed&&!!presence?.seen_at,ready:!!account};
 }));return json({summary,messages,operators,responses,queue:await supportQueue(db),reminderSeconds:await reminderSeconds(db),overrideUntil:await overrideUntil(),hoursAllowed:allowed,from,days,updatedAt:now});
})}
