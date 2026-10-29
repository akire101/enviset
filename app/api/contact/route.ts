import { env } from 'cloudflare:workers';
import { notifyContact } from '../../mail';
import { getDb } from '../../../db';
import { messages } from '../../../db/schema';
import { contactSchema, contactMessage } from '../../validation';
import { api,body,json,limit } from '../../server';
export async function POST(request:Request){return api(async()=>{const input=await body(request);await limit(request,'contact',5,60*60*1000);const parsed=contactSchema.safeParse(input);if(!parsed.success)return json({error:'Skontrolujte názov spoločnosti (2 až 150 znakov), platný e-mail a dĺžku vyplnených polí. Správa môže mať najviac 5 000 znakov.'},400);if(parsed.data.website)return json({error:'Formulár sa nepodarilo overiť.'},400);const {consent,website,companyId,locations,documents,requestedServices,...data}=parsed.data;const key=request.headers.get('Idempotency-Key');if(key&&!/^[a-f0-9-]{36}$/.test(key))return json({error:'Neplatný identifikátor požiadavky.'},400);const id=key||crypto.randomUUID();const inserted=await getDb().insert(messages).values({...data,message:contactMessage(parsed.data),id,createdAt:Date.now()}).onConflictDoNothing().returning({id:messages.id});const notification=inserted.length?await notifyContact({url:env.CONTACT_NOTIFICATION_URL,token:env.CONTACT_NOTIFICATION_TOKEN},id):'not_configured';return json({ok:true,id,stored:true,notification},201)})}
