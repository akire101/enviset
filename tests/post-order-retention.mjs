import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const base=process.env.ENVI_TEST_URL;
if(!base||!/^http:\/\/127\.0\.0\.1:\d+$/.test(base))throw Error('Use an isolated local test server only.');
let cookie='';
async function call(path,method='GET',data,auth=true,origin=base){return fetch(base+path,{headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'198.18.1.22',...(auth?{Cookie:cookie}:{})},method,...(data?{body:JSON.stringify(data)}:{})})}
assert.equal((await call('/api/admin/post-order','GET',undefined,false)).status,401);
const login=await call('/api/login','POST',JSON.parse(readFileSync('.local-admin.json','utf8')),false);assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
const original=await (await call('/api/admin/post-order')).json();
const posts=await (await call('/api/admin/posts')).json();const published=posts.filter(p=>p.status==='published');assert.ok(published.length>=3);
const ordered=published.slice().reverse().map(p=>p.id);const chosen=published[0];
const next={order:ordered,pinned:[chosen.id],revision:original.revision};
assert.equal((await call('/api/admin/post-order','PUT',next,true,'https://other.invalid')).status,403);
assert.equal((await call('/api/admin/post-order','PUT',{...next,order:[chosen.id,chosen.id]})).status,400);
let saved;
try{
 const response=await call('/api/admin/post-order','PUT',next);assert.equal(response.status,200);saved=await response.json();
 assert.equal((await call('/api/admin/post-order','PUT',next)).status,409);
 const home=await (await call('/')).text();assert.ok(home.includes(chosen.title));
 const positions=ordered.filter(id=>id!==chosen.id);const second=posts.find(p=>p.id===positions[0]);assert.ok(home.indexOf('/blog/'+chosen.slug)<home.indexOf('/blog/'+second.slug));
 assert.deepEqual((await (await call('/api/admin/post-order')).json()).pinned,[chosen.id]);
}finally{if(saved)assert.equal((await call('/api/admin/post-order','PUT',{...original,revision:saved.revision})).status,200)}
const contact=await call('/api/contact','POST',{company:'QA retention fixture',email:'qa@example.invalid',message:'Local retention check',consent:true},false);assert.equal(contact.status,201);const {id}=await contact.json();
assert.equal((await call('/api/admin/messages','PUT',{id,status:'done'})).status,200);
mkdirSync('work',{recursive:true});const sqlFile='work/retention-test.sql';
writeFileSync(sqlFile,`UPDATE message_resolutions SET resolved_at=${Date.now()-366*86400000} WHERE id='${id}';`);
execFileSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','envi-set-local','--local','--config','wrangler.local.json','--persist-to','.wrangler/state','--file',sqlFile],{stdio:'pipe'});
const messages=await (await call('/api/admin/messages')).json();assert.ok(!messages.some(m=>m.id===id));
console.log('Passed: authorization, origin, validation, persisted pin/order, homepage order, stale revision conflict, restoration and expired completed inquiry cleanup.');
