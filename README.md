# ENVI SET — zákaznícka verzia 1

Verejný náhľad: **https://envi-set-public.akire101.workers.dev**. GitHub je pripojený ku Cloudflare Workers Builds; aktualizácie vetvy `main` sa nasadzujú automaticky. Produkčné prihlásenie a správa článkov na `/admin` sú funkčné. Aktuálny stav, návod pre administrátora, zostávajúce nastavenia e-mailov a postup aktualizácie sú v [NASADENIE.md](NASADENIE.md). Nasledujúci opis pôvodného exportu zostáva ako podklad na obnovu.

Čistý zdrojový export `ENVISET_verzia1zakaznik` z 13. 10. 2026. Dizajn a obsah zostali zachované. Číslo zákazníckej verzie označuje uloženú prezentáciu; pôvodné interné číslo balíka je 0.1.0.

Tento priečinok je pripravený na nahratie do GitHub repozitára. Je to React/Vinext aplikácia s backendom Cloudflare Workers a databázou D1, nie statická stránka pre GitHub Pages. Samotný GitHub repozitár stránku verejne nespustí.

## Čo nahrať na GitHub

Nahrajte celý obsah tohto priečinka vrátane `.gitignore`, `.npmrc`, `.openai/hosting.json` a `.dev.vars.example`. Použite Git alebo GitHub Desktop, aby sa nestratili súbory začínajúce bodkou. `.openai/hosting.json` obsahuje iba názov databázovej väzby, nie účet ani tajomstvá.

- `app`, `components`, `hooks`, `lib`, `public`: web, texty, obrázky a fonty.
- `db`, `drizzle`: databázový model a migrácie, ktoré vytvoria prázdne tabuľky.
- `data/public-posts.sql`: tri zverejnené články, bez kontaktných správ, konceptov, relácií a hesiel.
- `build`, `scripts`, `vendor`, konfiguračné súbory a lockfile: zostavenie a spustenie aplikácie.
- `tests`: automatizované kontroly. Integračný test používajte iba na samostatnej lokálnej testovacej databáze.

Export neobsahuje pôvodnú databázu, `.dev.vars`, `.local-admin.json`, `node_modules`, hotový `dist`, logy, osobné dopyty ani prezentačné archívy. Po lokálnom spustení sa časť týchto súborov vytvorí; `.gitignore` ich vylučuje. Nenahrávajte ich ručne cez webové tlačidlo Upload files.

## Lokálne spustenie z čistého klonu

Vyžaduje sa Node.js 22.13+ (overovanie exportu používa Node 24) a npm. V koreňovom priečinku:

```sh
npm ci
npm run build
npx wrangler d1 migrations apply DB --local --config wrangler.local.json --persist-to .wrangler/state
npx wrangler d1 execute DB --local --config wrangler.local.json --persist-to .wrangler/state --file data/public-posts.sql
node scripts/setup-local.mjs
npm start -- --port 5187
```

`setup-local.mjs` vytvorí nový náhodný lokálny účet; prístup je v ignorovanom `.local-admin.json`. Pôvodné prezentačné heslo sa neprenieslo. Otvorte `http://127.0.0.1:5187/` a `/admin`. Port môžete zmeniť. Migrácie evidujú vykonané zmeny; seed používa `INSERT OR IGNORE` a neprepisuje neskoršie úpravy článkov.

Kontroly: `npm run typecheck`, `npm test`, `npm run build`. Integračný test vyžaduje explicitné `ENVI_TEST_URL` smerujúce na izolovaný loopback server a lokálny účet; zapisuje testovacie dáta, preto ho nepoužívajte na prezentačnej databáze.

## Čo ešte treba na verejný web

1. Hosting s Cloudflare Workers a vlastnou D1 databázou — detaily v [NASADENIE.md](NASADENIE.md).
2. Nové produkčné prihlasovacie údaje v serverových Secrets; nie v GitHub súboroch.
3. Finálnu HTTPS adresu v `SITE_URL`, aby sa zapli canonical odkazy, sitemap a indexácia. Bez nej web zámerne zostáva `noindex`.
4. Doplniť skutočný kontakt, obchodné meno, adresu a IČO v `app/content.ts` (`brand.contacts`) a tomu prispôsobiť stránku ochrany súkromia.
5. Ak sa majú posielať e-maily, nakonfigurovať a otestovať notifikačnú službu. Teraz sa dopyty ukladajú iba do administrácie. FAQ chatbot nepoužíva externý AI model.
6. Potvrdiť práva na verejné použitie fotografií dodaných v pôvodnom dokumente; ich licencie tento export neoveruje.

Export nemení uloženú zákaznícku verziu ani ostatné pracovné weby. Verejný GitHub repozitár a cloudové nasadenie neboli týmto exportom vytvorené. Použitý Vinext je vo fixovanom lockfile beta; pred ostrým spustením overte prevádzku na zvolenom účte a doméne.
