import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const base=process.env.ENVI_TEST_URL;
if(!base)throw new Error('Nastavte ENVI_TEST_URL na samostatny lokalny testovaci server; test zapisuje data.');
if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(base))throw new Error('Testy smú meniť iba lokálny náhľad.');
const testIp='198.18.0.'+(1+Math.floor(Math.random()*200));let cookie='';let checks=0;const evidence=[];
async function call(path,method='GET',data,auth=false,extra={}){const response=await fetch(base+path,{method,redirect:'manual',headers:{'CF-Connecting-IP':testIp,...(method==='GET'?{}:{Origin:base,'Content-Type':'application/json'}),...(auth?{Cookie:cookie}:{}),...extra},...(data?{body:JSON.stringify(data)}:{})});return response;}
function ok(condition,label){assert.ok(condition,label);checks++;evidence.push(label);}
for(const path of ['/','/o-nas','/sluzby','/kontakt','/blog','/ochrana-sukromia','/sluzby/odborna-dokumentacia','/sluzby/evidencia-odpadov','/sluzby/ohlasovacie-povinnosti','/sluzby/kontrola-a-poradenstvo','/sluzby/nebezpecne-odpady','/sluzby/riesenia-pre-firmy'])ok((await call(path)).status===200,'Stránka '+path);
ok((await call('/neexistujuca-stranka')).status===404,'HTTP 404');
ok((await call('/api/admin/posts')).status===401,'Anonym nemôže čítať koncepty');
ok((await call('/api/admin/posts','POST',{})).status===401,'Anonym nemôže vytvárať obsah');
ok((await call('/api/contact','POST',{},{}, {Origin:'https://example.invalid'})).status===403,'CSRF cudzieho pôvodu odmietnuté');
ok((await call('/api/contact','POST',{})).status===400,'Neplatný formulár odmietnutý');
const c={name:'Lokálny test',email:'qa@example.invalid',company:'Test firma',phone:'',service:'Evidencia odpadov',industry:'',message:'Testovací dopyt v samostatnej lokálnej databáze.',consent:true,website:''};const key=crypto.randomUUID();
const received=await call('/api/contact','POST',c,false,{'Idempotency-Key':key});ok(received.status===201,'Dopyt skutočne uložený');
ok((await received.json()).notification==='not_configured','Bez konfigurácie sa nepredstiera e-mail');
ok((await call('/api/contact','POST',c,false,{'Idempotency-Key':key})).status===201,'Opakovaný dopyt má rovnaký identifikátor');
ok((await call('/api/contact','POST',{...c,website:'spam'})).status===400,'Honeypot odmietnutý');
const login=await call('/api/login','POST',JSON.parse(readFileSync('.local-admin.json','utf8')));ok(login.status===200,'Prihlásenie admina');cookie=login.headers.get('set-cookie').split(';')[0];ok(/HttpOnly/.test(login.headers.get('set-cookie'))&&/SameSite=Strict/.test(login.headers.get('set-cookie')),'Bezpečnostné atribúty relácie');
const existing=await (await call('/api/admin/posts','GET',undefined,true)).json();ok(existing.filter(p=>p.status==='published').length>=3,'Verejne clanky sa nacitali z cisteho exportu');
const slug='qa-'+Date.now();const data={title:'Lokálny overovací článok',slug,excerpt:'Testovanie životného cyklu článku v oddelenej databáze.',content:'Prvý odsek\nOverovací obsah.\n\nDruhý odsek\n<script>alert("xss")</script> sa musí vykresliť ako text.',category:'Pre firmy',image:'/images/forest.webp',imageAlt:'Ilustračný les',seoTitle:'Overovací SEO titulok',seoDescription:'Overovací popis článku.',status:'draft'};
const created=await call('/api/admin/posts','POST',data,true);ok(created.status===201,'Vytvorenie konceptu');let post=await created.json();
ok((await call('/blog/'+slug)).status===404,'Koncept na predvidatelnej URL vracia 404');
async function save(changes){const response=await call('/api/admin/posts/'+post.id,'PUT',{...data,...changes,updatedAt:post.updatedAt},true);ok(response.status===200,'Uloženie '+JSON.stringify(changes));post=await response.json();return post;}
await save({status:'published'});const article=await call('/blog/'+slug);const html=await article.text();ok(article.status===200&&html.includes('Overovací SEO titulok'),'Publikovaný detail a SEO');ok(!html.includes('<script>alert("xss")</script>'),'HTML obsahu sa nevykonáva');
await save({status:'published',slug:slug+'-novy'});const redirect=await call('/blog/'+slug);ok(redirect.status===308&&redirect.headers.get('location').includes(slug+'-novy'),'Stará adresa vracia trvalé presmerovanie');
await save({status:'draft',slug:slug+'-novy'});ok((await call('/blog/'+slug)).status===404&&(await call('/blog/'+slug+'-novy')).status===404,'Stiahnutý článok sa neodhalí ani presmerovaním');
await save({status:'archived',slug:slug+'-novy'});
const messages=await (await call('/api/admin/messages','GET',undefined,true)).json();ok(messages.filter(m=>m.id===key).length===1,'Opakované odoslanie nevytvorilo duplikát');
ok((await call('/api/logout','POST',{},true)).status===200,'Odhlásenie');ok((await call('/api/admin/posts','GET',undefined,true)).status===401,'Odhlásená relácia neplatí');
writeFileSync('TEST-RESULTS.json',JSON.stringify({date:new Date().toISOString(),base,checks,evidence},null,2));console.log(`${checks} integračných kontrol úspešných.`);
