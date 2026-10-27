import {z} from 'zod';
import {api,adminBody,json} from '../../../server';
import {supportDb} from '../../../support-db';
export async function POST(request:Request){return api(async()=>{const p=z.object({minutes:z.union([z.literal(0),z.literal(30),z.literal(60),z.literal(120)])}).strict().safeParse(await adminBody(request));if(!p.success)return json({error:'Vyberte 30, 60 alebo 120 minút.'},400);const until=p.data.minutes?Date.now()+p.data.minutes*60000:0;await(await supportDb()).prepare('UPDATE support_settings SET override_until=? WHERE id=1').bind(until).run();return json({ok:true,overrideUntil:until})})}
