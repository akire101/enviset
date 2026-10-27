import {localDay} from './analytics-model';
import {hoursAllowed} from './support-server';
import {supportDb} from './support-db';
// Credit only confirmed heartbeat intervals; never extrapolate through an outage.
export async function heartbeat(user:{id:string;username:string},online:boolean,now=Date.now()){
 const db=await supportDb(),day=localDay(new Date(now));const utc=Date.parse(day+'T00:00:00Z');const offset=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bratislava',hour:'2-digit',hourCycle:'h23'}).format(new Date(utc)));const midnight=utc-offset*3600000,previousDay=localDay(new Date(midnight-1));const allowed=await hoursAllowed(new Date(now));
 const statements=[];
 if(allowed){
 const base=' FROM support_presence p WHERE p.username=? AND p.last_at>? AND p.last_at<? AND EXISTS(SELECT 1 FROM support_sessions s WHERE s.username=p.username AND s.seen_at>? AND s.expires_at>?)';
 statements.push(db.prepare('INSERT INTO support_online_days(username,day,milliseconds) SELECT username,?,MAX(0,?-MAX(last_at,?))'+base+' ON CONFLICT(username,day) DO UPDATE SET milliseconds=milliseconds+excluded.milliseconds').bind(day,now,midnight,user.username,now-75000,now,now-75000,now));
 statements.push(db.prepare('INSERT INTO support_online_days(username,day,milliseconds) SELECT username,?,MAX(0,MIN(?,?)-last_at)'+base+' AND p.last_at<? ON CONFLICT(username,day) DO UPDATE SET milliseconds=milliseconds+excluded.milliseconds').bind(previousDay,now,midnight,user.username,now-75000,now,now-75000,now,midnight));
 }
 statements.push(db.prepare('UPDATE support_sessions SET seen_at=? WHERE id=?').bind(online?now:0,user.id));
 statements.push(db.prepare('INSERT INTO support_presence(username,last_at) VALUES(?,?) ON CONFLICT(username) DO UPDATE SET last_at=excluded.last_at').bind(user.username,now));
 statements.push(db.prepare('UPDATE support_presence SET last_at=0 WHERE username=? AND NOT EXISTS(SELECT 1 FROM support_sessions WHERE username=? AND seen_at>? AND expires_at>?)').bind(user.username,user.username,now-75000,now));
 await db.batch(statements);
}
