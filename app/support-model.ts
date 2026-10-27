import {z} from 'zod';
export function officeOpen(now=new Date()){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bratislava',weekday:'short',hour:'2-digit',hourCycle:'h23'}).formatToParts(now);const day=parts.find(x=>x.type==='weekday')?.value;const hour=Number(parts.find(x=>x.type==='hour')?.value);return !['Sat','Sun'].includes(day||'')&&hour>=8&&hour<17}
export const messageInput=z.object({id:z.string().uuid(),text:z.string().trim().min(1).max(2000)}).strict();
export function needsReminder(unreadAt:number|null,now=Date.now()){return !!unreadAt&&now-unreadAt>=300000}
export type ChatMessage={seq:number;id:string;sender:'visitor'|'support';operator?:string|null;operator_name?:string|null;text:string;created_at:number;read_at:number|null};
export type ChatRoom={id:string;created_at:number;updated_at:number;status:'open'|'closed';unread:number;unread_at:number|null;last_text:string;rating?:number|null;note?:string};
export const offlineText='Online podpora je momentálne nedostupná. Napíšte nám na enviset@enviset.sk. Sme tu v pracovné dni od 08:00 do 17:00.';




export const supportAccounts=['podpora','podpora2'] as const;
export function supportName(username:string){return username==='podpora2'?'Podpora 2':'Podpora 1'}
export function onlineCredit(previous:number,now:number){return previous>0&&now>previous&&now-previous<=75000?now-previous:0}
export function chatHoursAllowed(open:boolean,overrideUntil:number,now=Date.now()){return open||overrideUntil>now}
export function bratislavaDayStart(now=new Date()){const day=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Bratislava',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);const utc=Date.parse(day+'T00:00:00Z');const offset=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bratislava',hour:'2-digit',hourCycle:'h23'}).format(new Date(utc)));return utc-offset*3600000}
