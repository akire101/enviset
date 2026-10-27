import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://127.0.0.1:6010';
async function call(path,data,auth=''){const r=await fetch(base+path,{method:data?'POST':'GET',headers:{Origin:base,'Content-Type':'application/json',...(auth.startsWith('Bearer ')?{Authorization:auth}:auth?{Cookie:auth}:{})},...(data?{body:JSON.stringify(data)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]}}
const admin=await call('/api/login',JSON.parse(fs.readFileSync('.local-admin.json','utf8')));assert.equal(admin.status,200);
const cookies=[];
for(const username of ['podpora','podpora2']){const credentials={username,password:crypto.randomUUID()};assert.equal((await call('/api/admin/support-user',credentials,admin.cookie)).status,200);const login=await call('/api/login',credentials);assert.equal(login.status,200);cookies.push(login.cookie);if(username==='podpora')cookies.push((await call('/api/login',credentials)).cookie)}
const [first,duplicate,second]=cookies;
assert.equal((await call('/api/admin/support-settings',{minutes:60},first)).status,401);
assert.equal((await call('/api/admin/support-settings',{minutes:9999},admin.cookie)).status,400);
const enabled=await call('/api/admin/support-settings',{minutes:60},admin.cookie);assert.equal(enabled.status,200);assert.ok(enabled.body.overrideUntil>Date.now());
for(const cookie of cookies)assert.equal((await call('/api/support',{action:'heartbeat',online:true},cookie)).status,200);
assert.equal((await call('/api/chat')).body.online,true);
const before=(await call('/api/admin/support-stats?days=all',undefined,admin.cookie)).body;
await new Promise(r=>setTimeout(r,1200));
await Promise.all(cookies.map(cookie=>call('/api/support',{action:'heartbeat',online:true},cookie)));
const after=(await call('/api/admin/support-stats?days=all',undefined,admin.cookie)).body;
assert.equal(after.operators.length,2);
for(const name of ['podpora','podpora2']){const delta=after.operators.find(x=>x.username===name).online_ms-before.operators.find(x=>x.username===name).online_ms;assert.ok(delta>=1100&&delta<3000,'Confirmed online duration without duplicate tab counting: '+delta)}
const start=await call('/api/chat',{id:crypto.randomUUID(),text:'Two operator test'});assert.equal(start.status,200);const room=start.body.room,auth='Bearer '+start.body.token;
for(const [cookie,text] of [[first,'Answer by one'],[second,'Answer by two']])assert.equal((await call('/api/support',{action:'reply',room,message:{id:crypto.randomUUID(),text}},cookie)).status,200);
const messages=(await call('/api/chat',undefined,auth)).body.messages;assert.deepEqual(messages.filter(m=>m.sender==='support').map(m=>m.operator),['podpora','podpora2']);assert.deepEqual(messages.filter(m=>m.sender==='support').map(m=>m.operator_name),['Podpora 1','Podpora 2']);
for(const [operator,rating] of [['podpora',5],['podpora2',3]])assert.equal((await call('/api/support',{action:'rate',room,operator,rating,note:'QA'},admin.cookie)).status,200);
const reviews=(await call('/api/support?room='+room,undefined,admin.cookie)).body.reviews;assert.equal(reviews.length,2);
for(const period of ['1','7','30','365','all'])assert.equal((await call('/api/admin/support-stats?days='+period,undefined,admin.cookie)).status,200);
assert.equal((await call('/api/admin/analytics?period=all',undefined,admin.cookie)).status,200);
assert.equal((await call('/api/admin/support-stats?days=all',undefined,second)).status,401);
assert.equal((await call('/api/admin/support-settings',{minutes:0},admin.cookie)).body.overrideUntil,0);
fs.writeFileSync('outputs/v14-qa.json',JSON.stringify({admin:admin.cookie,first,second}));
console.log('v14 integration passed: admin-only timed override, two roles, author identities, separate reviews, online accounting without double count, all periods.');
