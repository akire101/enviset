import {z} from 'zod';
export const retentionDays=400;
export const analyticsPath=z.string().max(180).regex(/^\/(?:[a-z0-9-]+\/?)*$/).refine(p=>!/^\/(admin|api)(\/|$)/.test(p));
const label=z.string().min(1).max(100);
const count=z.number().int().min(0).max(100000);
export const analyticsSchema=z.object({
 consent:z.literal(true),id:z.string().uuid(),visitor:z.string().uuid(),session:z.string().uuid(),
 path:analyticsPath,device:z.enum(['mobile','desktop']),sequence:z.number().int().min(0).max(10000),
 seconds:z.number().int().min(0).max(14400),depth:z.number().int().min(0).max(100),
 sections:z.array(z.object({key:label,label,seconds:count})).max(40),
 targets:z.array(z.object({key:label,label,clicks:count,seen:z.boolean()})).max(100),
 points:z.array(z.object({x:z.number().int().min(0).max(19),y:z.number().int().min(0).max(99),clicks:count,moves:count})).max(400)
}).strict();
export type AnalyticsPayload=z.infer<typeof analyticsSchema>;
export function localDay(now=new Date()){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Bratislava',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}
export function periodStart(period:string,today=localDay()){
 const days=({day:1,week:7,month:30,year:365} as Record<string,number>)[period]||7;
 const date=new Date(today+'T12:00:00Z');date.setUTCDate(date.getUTCDate()-days+1);return date.toISOString().slice(0,10);
}
export type ViewRow={payload:string;path:string};
export function aggregateDetails(rows:ViewRow[]){
 const sections=new Map<string,{label:string;seconds:number;views:number}>(),targets=new Map<string,{label:string;clicks:number;views:number}>(),points=new Map<string,{x:number;y:number;clicks:number;moves:number}>();
 for(const row of rows){const p=JSON.parse(row.payload) as AnalyticsPayload;
 for(const s of p.sections){const key=row.path+' · '+s.key;const old=sections.get(key)||{label:row.path+' · '+s.label,seconds:0,views:0};old.seconds+=s.seconds;old.views+=s.seconds>0?1:0;sections.set(key,old)}
 for(const t of p.targets){const key=row.path+' · '+t.key;const old=targets.get(key)||{label:row.path+' · '+t.label,clicks:0,views:0};old.clicks+=t.clicks;old.views+=t.seen?1:0;targets.set(key,old)}
 for(const point of p.points){const key=point.x+':'+point.y;const old=points.get(key)||{x:point.x,y:point.y,clicks:0,moves:0};old.clicks+=point.clicks;old.moves+=point.moves;points.set(key,old)}
 }
 return {sections:[...sections.values()].sort((a,b)=>b.seconds-a.seconds),targets:[...targets.values()].filter(t=>t.views>0).sort((a,b)=>b.clicks-a.clicks),points:[...points.values()]};
}

export function fillSeries(rows:{bucket:string;views:number;visitors:number}[],period:string,from:string,to:string){
 const keys=new Set<string>();
 if(period==='day'){for(let h=0;h<24;h++)keys.add(String(h).padStart(2,'0'))}
 else {const day=new Date(from+'T12:00:00Z');while(day.toISOString().slice(0,10)<=to){const key=day.toISOString().slice(0,10);keys.add(period==='year'?key.slice(0,7):key);day.setUTCDate(day.getUTCDate()+1)}}
 const byKey=new Map(rows.map(r=>[r.bucket,r]));return [...keys].map(bucket=>byKey.get(bucket)||{bucket,views:0,visitors:0});
}
