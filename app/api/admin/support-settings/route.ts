import {z} from 'zod';
import {api,adminBody,json} from '../../../server';
import {supportDb} from '../../../support-db';
export async function POST(request:Request){return api(async()=>{
 const parsed=z.object({minutes:z.union([z.literal(0),z.literal(30),z.literal(60),z.literal(120)]).optional(),reminderSeconds:z.union([z.literal(15),z.literal(30),z.literal(60),z.literal(120)]).optional()}).strict().refine(p=>p.minutes!==undefined||p.reminderSeconds!==undefined).safeParse(await adminBody(request));
 if(!parsed.success)return json({error:'Vyberte platné trvanie otvorenia alebo interval upozornení (15, 30, 60 či 120 sekúnd).'},400);
 const p=parsed.data,db=await supportDb(),updates=[];let until:number|undefined;
 if(p.minutes!==undefined){until=p.minutes?Date.now()+p.minutes*60000:0;updates.push(db.prepare('UPDATE support_settings SET override_until=? WHERE id=1').bind(until))}
 if(p.reminderSeconds!==undefined)updates.push(db.prepare('UPDATE support_preferences SET reminder_seconds=? WHERE id=1').bind(p.reminderSeconds));
 await db.batch(updates);return json({ok:true,...(until!==undefined?{overrideUntil:until}:{}),...(p.reminderSeconds!==undefined?{reminderSeconds:p.reminderSeconds}:{})});
})}
