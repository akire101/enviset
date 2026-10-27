import {cookies} from 'next/headers';
import {cookieName,digest,isAdmin,HttpError} from './server';
import {supportDb} from './support-db';
import {officeOpen,chatHoursAllowed} from './support-model';
export async function supportSession(){const token=(await cookies()).get(cookieName)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return (await supportDb()).prepare('SELECT id,username FROM support_sessions WHERE id=? AND expires_at>?').bind(await digest(token),Date.now()).first<{id:string;username:string}>()}
export async function staff(){if(await isAdmin())return {role:'admin' as const,id:'admin',username:'admin'};const s=await supportSession();if(s)return {...s,role:'support' as const};throw new HttpError(401,'Najprv sa prihláste.')}
export async function overrideUntil(){return (await(await supportDb()).prepare('SELECT override_until FROM support_settings WHERE id=1').first<{override_until:number}>())?.override_until||0}
export async function hoursAllowed(now=new Date()){return chatHoursAllowed(officeOpen(now),await overrideUntil(),now.getTime())}
export async function available(now=new Date()){if(!await hoursAllowed(now))return false;return !!await (await supportDb()).prepare('SELECT id FROM support_sessions WHERE expires_at>? AND seen_at>? LIMIT 1').bind(now.getTime(),now.getTime()-75000).first()}
export async function visitorRoom(request:Request){const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token||!/^[a-f0-9]{64}$/.test(token))throw new HttpError(401,'Konverzácia nie je dostupná.');const room=await (await supportDb()).prepare('SELECT id,status FROM support_rooms WHERE token_hash=?').bind(await digest(token)).first<{id:string;status:string}>();if(!room)throw new HttpError(404,'Konverzácia sa nenašla.');return room}
