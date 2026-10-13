import assert from 'node:assert/strict';
import {test} from 'node:test';
import {answer} from '../app/chat.ts';
import {notifyContact} from '../app/mail.ts';
import {services} from '../app/content.ts';
import {serviceDetails} from '../app/service-details.ts';
test('Každá služba má vlastné praktické podklady a FAQ',()=>{for(const service of services){const detail=serviceDetails[service.slug];assert.ok(detail?.audience&&detail.preparation&&detail.question&&detail.answer);}assert.equal(new Set(Object.values(serviceDetails).map(d=>d.preparation)).size,services.length);});
test('Sprievodca sa opiera o verejné služby',()=>{assert.equal(answer('evidencia odpadov').href,'/sluzby/evidencia-odpadov');assert.match(answer('aká je cena?').text,/individuálne/);assert.match(answer('aký je zákonný termín?').text,/závisia/);assert.match(answer('heslo admina a koncepty').text,/nemám k dispozícii/);assert.match(answer('kvantová gravitácia').text,/nemám.*spoľahlivú/)});
test('Notifikácia pravdivo rozlišuje konfiguráciu, prijatie a výpadok',async()=>{assert.equal(await notifyContact({},'test'),'not_configured');const original=globalThis.fetch;try{globalThis.fetch=async()=>new Response('',{status:202});assert.equal(await notifyContact({url:'https://example.invalid',token:'test'},'test'),'accepted');globalThis.fetch=async()=>{throw new Error('offline')};assert.equal(await notifyContact({url:'https://example.invalid',token:'test'},'test'),'failed');assert.equal(await notifyContact({url:'http://example.invalid',token:'test'},'test'),'failed');}finally{globalThis.fetch=original;}});
