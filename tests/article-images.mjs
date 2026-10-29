// Local-only end-to-end test; uses the existing local admin and a disposable draft.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {chromium, request} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.ENVI_TEST_URL;
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(base || '')) throw new Error('Set ENVI_TEST_URL to a local server. This test writes local data.');
const api = await request.newContext({baseURL: base, extraHTTPHeaders: {Origin: base, 'CF-Connecting-IP': `198.18.1.${1 + Math.floor(Math.random()*200)}`}});
const anonymous = await request.newContext({baseURL: base});
const browser = await chromium.launch({channel: 'msedge', headless: true});
let saved;
let newArticle;
let checks = 0;
function check(value, label) { assert.ok(value, label); checks++; }
try {
  assert.equal((await api.post('/api/login', {data: JSON.parse(fs.readFileSync('.local-admin.json', 'utf8'))})).status(), 200);
  const bytes = fs.readFileSync('public/images/forest.webp');
  const upload = (client, data = bytes, headers = {}) => client.post('/api/admin/images', {data, headers: {'Content-Type': 'image/webp', ...headers}});
  check((await upload(anonymous)).status() === 401, 'Anonymous uploads refused');
  const crossOrigin = await upload(api, bytes, {Origin: 'https://example.invalid'});
  check(crossOrigin.status() === 403, `Cross-origin uploads refused: ${crossOrigin.status()} ${(await crossOrigin.text()).slice(0,200)}`);
  check((await upload(api, Buffer.from('<svg onload="alert(1)"/>'))).status() === 415, 'Disguised SVG refused');
  check((await upload(api, bytes, {'Content-Type': 'image/jpeg'})).status() === 415, 'MIME mismatch refused');
  check((await upload(api, Buffer.alloc(768001))).status() === 413, 'Oversized request refused');
  const uploaded = await upload(api);
  check(uploaded.status() === 201, 'Valid upload stored');
  const {image} = await uploaded.json();
  check((await (await upload(api)).json()).image === image, 'Identical uploads reuse storage');
  const fetched = await api.get(image);
  check(fetched.status() === 200 && Buffer.compare(await fetched.body(), bytes) === 0, 'Stored image bytes survive readback');
  check(fetched.headers()['x-content-type-options'] === 'nosniff', 'Image cannot be sniffed as executable content');
  const postData = {title: 'Lokálny test vlastného obrázka ' + Date.now(), slug: 'qa-image-' + Date.now(), excerpt: 'Overenie nahrávania obrázka v lokálnej databáze.', content: 'Lokálne overenie článku a jeho titulnej fotografie po uložení aj obnovení stránky.', category: 'Pre firmy', image, imageAlt: 'Testovací les', status: 'draft'};
  check((await api.post('/api/admin/posts', {data: {...postData, image: '/media/'+'0'.repeat(64)}})).status() === 400, 'Missing uploaded image refused');
  const created = await api.post('/api/admin/posts', {data: postData});
  check(created.status() === 201, 'Draft accepts uploaded image');
  saved = await created.json();
  check((await anonymous.get(image)).status() === 404, 'Draft image stays private');
  async function save(status) {
    const {id, createdAt, publishedAt, ...data} = saved;
    const response = await api.put('/api/admin/posts/'+id, {data: {...data, status}});
    assert.equal(response.status(), 200);
    saved = await response.json();
  }
  await save('published');
  check((await anonymous.get(image)).status() === 200, 'Published image loads without login');
  check((await (await anonymous.get('/blog/'+saved.slug)).text()).includes(image), 'Public article uses uploaded image');
  await save('draft');
  check((await anonymous.get(image)).status() === 404, 'Withdrawing the article hides its image');

  const context = await browser.newContext({storageState: await api.storageState(), viewport: {width: 1440, height: 1000}});
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  await page.addInitScript(() => sessionStorage.setItem('envi_chat_greeted', '1'));
  async function openEditor() {
    await Promise.all([page.waitForResponse(r => r.url().endsWith('/api/admin/posts')), page.goto(base+'/admin')]);
    await page.getByRole('button', {name: /^Články/}).click();
    await page.locator('.admin-list button').filter({hasText: saved.title}).click();
    await page.locator('.article-image-field img').evaluate(img => img.decode());
  }
  await openEditor();
  check(await page.getByLabel('Titulný obrázok', {exact: true}).inputValue() === image, 'Saved upload selected after reload');
  const file = page.getByLabel('Obrázok z počítača', {exact: true});
  const previous = await page.locator('.article-image-field img').getAttribute('src');
  await file.setInputFiles({name: 'invalid.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>')});
  await page.getByRole('alert').filter({hasText: 'Vyberte obrázok JPG'}).waitFor();
  check(await page.locator('.article-image-field img').getAttribute('src') === previous, 'Invalid file keeps original image');
  await file.setInputFiles({name: 'large.jpg', mimeType: 'image/jpeg', buffer: Buffer.alloc(10*1024*1024+1)});
  await page.getByRole('alert').filter({hasText: 'viac než 10 MB'}).waitFor();
  await file.setInputFiles({name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not an image')});
  await page.getByRole('alert').filter({hasText: 'nedá otvoriť'}).waitFor();
  check(await page.locator('.article-image-field img').getAttribute('src') === previous, 'Broken file keeps original image');
  // Actual browser decoding, scaling and encoding, then a real upload to local D1.
  const bigPng = await page.evaluate(() => {const c=document.createElement('canvas');c.width=2400;c.height=1200;const ctx=c.getContext('2d');ctx.fillStyle='#315d45';ctx.fillRect(0,0,c.width,c.height);return c.toDataURL('image/png').split(',')[1]});
  const png = {name: 'fotografia.png', mimeType: 'image/png', buffer: Buffer.from(bigPng, 'base64')};
  await page.route('**/api/admin/images', route => route.abort('failed'));
  await file.setInputFiles(png);
  await page.getByRole('alert').filter({hasText: 'Spojenie sa prerušilo'}).waitFor();
  check(await page.locator('.article-image-field img').getAttribute('src') === previous, 'Failed network keeps original image');
  await page.unroute('**/api/admin/images');
  await page.route('**/api/admin/images', route => route.fulfill({status: 503, contentType: 'text/html', body: '<h1>Unavailable</h1>'}));
  await file.setInputFiles(png);
  await page.getByRole('alert').filter({hasText: 'Nahrávanie sa nepodarilo. Skúste to znova.'}).waitFor();
  check(await page.locator('.article-image-field img').getAttribute('src') === previous, 'Non-JSON service failure has a friendly error and keeps original image');
  await page.unroute('**/api/admin/images');
  await file.setInputFiles(png);
  await page.getByRole('status').filter({hasText: 'Obrázok je nahratý'}).waitFor();
  const preview = page.locator('.article-image-field img');
  await preview.evaluate(img => img.decode());
  check(await preview.evaluate(img => img.naturalWidth === 1600 && img.naturalHeight === 800), 'Large image automatically resized with correct proportions');
  const newImage = await preview.getAttribute('src');
  const uploadedImage = await api.get(newImage);
  check(uploadedImage.headers()['content-type'] === 'image/webp' && (await uploadedImage.body()).length <= 768000, 'Image compressed for web');
  await page.getByRole('button', {name: 'Uložiť článok', exact: true}).click();
  await page.getByRole('status').filter({hasText: 'Koncept je uložený.'}).waitFor();
  await openEditor();
  check(await preview.getAttribute('src') === newImage, 'Uploaded image and article persist after reload');
  fs.mkdirSync('outputs', {recursive: true});
  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 1000});
    await page.locator('.article-image-field').scrollIntoViewIfNeeded();
    check(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `No overflow at ${width}px`);
    await page.screenshot({path: `outputs/article-upload-${width}.png`});
  }
  // Holding a request proves Save is disabled and switching articles cancels safely.
  let heldRoute;
  const held = new Promise(resolve => heldRoute = resolve);
  await page.route('**/api/admin/images', async route => {heldRoute(); await new Promise(resolve => setTimeout(resolve, 1500)); await route.abort().catch(()=>{})});
  await file.setInputFiles(png); await held;
  check(await page.getByRole('button', {name: 'Uložiť článok', exact: true}).isDisabled(), 'Save disabled during upload');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', {name: 'Nový článok', exact: true}).click();
  await page.getByRole('heading', {name: 'Nový článok', exact: true}).waitFor();
  await page.unrouteAll({behavior: 'wait'});
  check(await page.getByLabel('Titulný obrázok', {exact: true}).inputValue() === '/images/forest.webp', 'Cancelled upload cannot overwrite another article');
  check(await page.getByRole('button', {name: 'Nahrať z počítača', exact: true}).isEnabled(), 'Upload recovers after cancellation');
  await file.setInputFiles('public/images/autoservis.jpg');
  await page.getByRole('status').filter({hasText: 'Obrázok je nahratý'}).waitFor();
  const title = 'Nový článok s fotografiou ' + Date.now();
  await page.getByLabel('Názov článku', {exact: true}).fill(title);
  await page.getByLabel(/Krátky úvod a SEO popis/).fill('Nový koncept vytvorený cez formulár s vlastnou fotografiou.');
  await page.getByLabel('Obsah článku').fill('Overenie vloženia novej fotografie pri vytváraní nového článku v administrácii.');
  await page.getByRole('button', {name: 'Uložiť článok', exact: true}).click();
  await page.getByRole('status').filter({hasText: 'Koncept je uložený.'}).waitFor();
  newArticle = (await (await api.get('/api/admin/posts')).json()).find(p => p.title === title);
  check(newArticle?.image.startsWith('/media/'), 'New article with JPG upload saves through the actual form');
  check(await page.locator('.article-image-field [role=status]').count() === 0, 'Saved article no longer asks to save the image again');
  await preview.evaluate(img => img.decode());
  await page.locator('.article-image-field').scrollIntoViewIfNeeded();
  await page.screenshot({path: 'outputs/article-upload-photo-390.png'});
  // Refresh the server timestamp after UI updates before the finally cleanup.
  saved = (await (await api.get('/api/admin/posts')).json()).find(p => p.id === saved.id);
  await context.close();
  console.log(`PASS: ${checks} image upload, privacy, persistence, validation, race and responsive checks.`);
} finally {
  for (const post of [saved, newArticle].filter(Boolean)) {
    const latest = (await (await api.get('/api/admin/posts')).json()).find(p => p.id === post.id);
    const {id, createdAt, publishedAt, ...data} = latest;
    await api.put('/api/admin/posts/'+id, {data: {...data, status: 'archived'}});
  }
  await browser.close(); await api.dispose(); await anonymous.dispose();
}
