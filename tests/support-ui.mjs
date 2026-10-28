// Local browser integration. Requires Playwright (or PLAYWRIGHT_MODULE) and the dev server on port 6010.
﻿import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium,request}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base='http://127.0.0.1:6010';
fs.mkdirSync('outputs',{recursive:true});
const api=await request.newContext({baseURL:base,extraHTTPHeaders:{Origin:base}});
assert.equal((await api.post('/api/login',{data:JSON.parse(fs.readFileSync('.local-admin.json','utf8'))})).status(),200);
const password=crypto.randomUUID();assert.equal((await api.post('/api/admin/support-user',{data:{username:'podpora2',password}})).status(),200);
await api.post('/api/admin/support-settings',{data:{minutes:60}});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const support=await browser.newPage();await support.goto(base+'/admin');await support.locator('[name=username]').fill('podpora2');await support.locator('[name=password]').fill(password);await support.getByRole('button',{name:'Prihlásiť sa',exact:true}).click();await support.getByRole('heading',{name:'Pracovisko podpory · Podpora 2'}).waitFor();assert.equal(await support.getByText('Konverzácie, online čas a časy reakcií môže').count(),0);
 const visitor=await browser.newPage({viewport:{width:390,height:844}});await visitor.goto(base);await visitor.locator('.chat-online').waitFor();if(await visitor.getByRole('button',{name:'Zamietnuť',exact:true}).isVisible())await visitor.getByRole('button',{name:'Zamietnuť',exact:true}).click();await visitor.getByRole('button',{name:'Otvoriť sprievodcu ENVI set'}).click();assert.equal(await visitor.locator('.chat-mode').count(),0);
 const unique='V15 Enter test '+Date.now();await visitor.getByLabel('Vaša správa',{exact:true}).fill(unique);await visitor.getByRole('button',{name:'Odoslať správu',exact:true}).click();await support.getByRole('button').filter({hasText:unique}).click();const reply=support.getByLabel('Odpoveď návštevníkovi');await reply.fill('Prvý riadok');await reply.press('Enter');assert.equal(await reply.inputValue(),'Prvý riadok\n');
 await support.getByLabel('Enter odošle správu').check();await reply.fill('Pozrite https://enviset.sk/sluzby.');await reply.press('Shift+Enter');assert.ok((await reply.inputValue()).endsWith('\n'));await reply.press('Enter');await visitor.getByRole('link',{name:'https://enviset.sk/sluzby'}).waitFor();assert.equal(await visitor.getByRole('link',{name:'https://enviset.sk/sluzby'}).getAttribute('href'),'https://enviset.sk/sluzby');assert.equal(await visitor.getByText('Podpora 2',{exact:true}).count(),1);
 await visitor.screenshot({path:'outputs/v15-unified-chat-mobile.png'});
 await support.reload();await support.getByRole('heading',{name:'Pracovisko podpory · Podpora 2'}).waitFor();await support.getByRole('button').filter({hasText:'Pozrite https://enviset.sk/sluzby.'}).first().click();assert.equal(await support.getByLabel('Enter odošle správu').isChecked(),true);
 await support.getByLabel('Enter odošle správu').uncheck();await reply.fill('Nevyslaná odpoveď');await reply.press('Enter');assert.equal(await reply.inputValue(),'Nevyslaná odpoveď\n');
 await support.getByLabel('Prijímať konverzácie').uncheck();await visitor.getByText('Automatický sprievodca · podpora je offline',{exact:true}).waitFor({timeout:25000});await visitor.getByLabel('Vaša správa',{exact:true}).fill('Chcem bezplatnu konzultaciu');await visitor.getByRole('button',{name:'Odoslať správu',exact:true}).click();await visitor.getByRole('link',{name:'Dohodnúť konzultáciu'}).waitFor();
 for(const width of [1440,768,390]){await visitor.setViewportSize({width,height:900});await visitor.goto(base+'/o-nas');if(await visitor.getByRole('button',{name:'Zamietnuť',exact:true}).isVisible())await visitor.getByRole('button',{name:'Zamietnuť',exact:true}).click();for(const img of await visitor.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode())}await visitor.locator('.about-values').scrollIntoViewIfNeeded();await visitor.evaluate(()=>window.scrollTo(0,0));assert.equal(await visitor.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await visitor.locator('main img').count(),4);assert.equal(await visitor.locator('main img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)),true);await visitor.screenshot({path:'outputs/v15-about-'+width+'.png',fullPage:true})}
 await visitor.goto(base+'/blog');const cards=await visitor.locator('.blog-card').count(),pictures=await visitor.locator('.blog-card img').count();console.log(JSON.stringify({localBlogCards:cards,localBlogPictures:pictures}));
 await support.getByRole('button',{name:'Odhlásiť sa',exact:true}).click();console.log('PASS: Podpora2 identity, one visitor chat, live delivery, safe clickable URL, Enter off/on, Shift+Enter, preference persistence, offline FAQ, responsive about page.');
}finally{await api.post('/api/admin/support-settings',{data:{minutes:0}});await api.post('/api/logout',{data:{}});await api.dispose();await browser.close()}
