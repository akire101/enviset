import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const width of [1440,768,390]){
  const page=await browser.newPage({viewport:{width,height:1000}});page.setDefaultTimeout(15000);
  await page.addInitScript(()=>sessionStorage.setItem('envi_chat_greeted','1'));
  await page.goto('http://127.0.0.1:6010',{waitUntil:'domcontentloaded'});
  await page.locator('.analytics-consent button').first().click();
  assert.equal(await page.locator('#pre-koho').count(),0);
  assert.equal(await page.locator('.hero-actions .button').innerText(),'Nezáväzný dopyt');
  assert.match(await page.locator('#pomoc h2').innerText(),/Riešenia, ktoré Vás zbavia starostí/);
  assert.equal(await page.locator('.help-highlight').evaluate(e=>getComputedStyle(e).fontWeight),'800');
  await page.locator('#pomoc').scrollIntoViewIfNeeded();await page.screenshot({path:`outputs/v31-home-${width}.png`});
  await page.goto('http://127.0.0.1:6010/kontakt?sluzba=konzultacia#formular',{waitUntil:'domcontentloaded'});
  const form=page.locator('#formular');await form.waitFor();
  assert.deepEqual(await form.locator(':required').evaluateAll(els=>els.map(e=>e.name)),['company','email']);
  assert.equal(await form.locator('input[type=radio]:checked').inputValue(),'Bezplatná konzultácia');
  await form.locator('[name=company]').fill('Test firma');await form.locator('[name=email]').fill('qa@example.invalid');
  assert.equal(await form.evaluate(e=>e.checkValidity()),true);
  let payload;
  await page.route('**/api/contact',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:201,json:{id:'test-reference',stored:true}})});
  await page.screenshot({path:`outputs/v31-form-${width}.png`});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await form.locator('button[type=submit]').click();await page.getByText('Ďakujeme za správu.').waitFor();
  assert.equal(payload.company,'Test firma');assert.equal(payload.name,'');assert.equal(payload.phone,'');assert.equal(payload.message,'');assert.equal(payload.service,'Bezplatná konzultácia');
  await page.close();
 }
 console.log('PASS: home copy/removal, highlight, responsive form, required fields, optional empty fields, consultation selection and mocked submission.');
}finally{await browser.close()}
