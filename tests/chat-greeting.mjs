// Local browser check; no messages are sent and no support settings are changed.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});page.setDefaultTimeout(15000);console.log(width,"start");
  await page.addInitScript(()=>{
   window.chimes=0;
   const start=OscillatorNode.prototype.start;
   OscillatorNode.prototype.start=function(...args){window.chimes++;return start.apply(this,args)};
  });
  await page.goto('http://127.0.0.1:6010',{waitUntil:'domcontentloaded'});
  const reject=page.getByRole('button',{name:'Zamietnuť',exact:true});
  await reject.waitFor();await reject.click();
  await page.locator('h1').click();
  await page.locator('.chat-window').waitFor({timeout:25000});
  assert.match(await page.locator('.live-transcript').innerText(),/S čím vám môžeme pomôcť/);
  assert.equal(await page.locator('#live-message').evaluate(el=>el===document.activeElement),false);
  await page.waitForFunction(()=>window.chimes===1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  console.log(width,"greeted");await page.screenshot({path:`outputs/chat-greeting-${width}.png`});
  await page.getByRole('button',{name:'Zavrieť chat',exact:true}).click();
  console.log(width,"closed");await page.reload({waitUntil:"domcontentloaded",timeout:15000});if(await reject.isVisible())await reject.click();await page.waitForTimeout(9000);console.log(width,"reloaded");if(await reject.isVisible()){await reject.click();await page.waitForTimeout(9000)}
  assert.equal(await page.locator('.chat-window').count(),0);
  await page.locator('.chat-launch').click();
  await page.locator('#live-message').waitFor();
  assert.equal(await page.locator('#live-message').evaluate(el=>el===document.activeElement),true);
  await page.close();
 }
 console.log('PASS: desktop/mobile greeting, one chime, no automatic input focus, no repeat after reload, manual focus.');
}finally{await browser.close()}
