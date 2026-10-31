# GitHub → Cloudflare Workers + D1

## Zákaznícka v6 – 31. 10. 2026

Aktualizácia 1 (interné v36): mobilný chat iba na ručné otvorenie, kontaktná lišta naspodku a nadväzujúce polohy hlavičky a ovládania. Nasadenie aj uloženie schválené vlastníkom. Aktualizovaný bod obnovy je `v6-zakaznicka-2026-10-31-aktualizacia1`, záloha `backups/ENVISET_v6_2026-10-31_aktualizacia1`; pôvodný bod v6 sa neprepisuje.

Vlastník schválil nasadenie všetkých lokálnych zmien v6. Interné označenie je v35.
Bod obnovy: tag `v6-zakaznicka-2026-10-31`, záloha `backups/ENVISET_v6_2026-10-31` v nadradenom projektovom priečinku, so zdrojovým ZIP, Git bundle, kontrolnými súčtami a návodom OBNOVA-v6.txt rovnako ako v5.
Obnova zdrojov neobnovuje živú databázu D1, správy, chaty, analytiku, redakčné dáta uložené iba v D1, účty ani Secrets. Obnovu vykonajte do nového priečinka; push na main spúšťa online nasadenie.

## Aktualizácia v2 (18. 10. 2026)

Zdrojová verzia v2 je uložená v Git-e pod označením `v2-2026-10-18`; toto označenie sa vytvorí pri nahraní vydania. Základom je uložený zákaznícky stav z 18. 10. 2026. Nasledujúce nastavenie Workera, databázy a Secrets sa pri aktualizácii zachováva. Súbor `/version.json` umožňuje overiť vydanie na verejnom webe. Nahrávanie ďalších verzií vykonávajte iba na výslovný pokyn vlastníka.

Do GitHubu patria zdroje, verejné médiá, závislosti opísané v package-lock.json a bezpečné importy verejných článkov. Nepatria tam node_modules, dist, .wrangler, heslá, lokálne prihlasovacie údaje, súkromná databáza, zákaznícke dopyty, zálohy ani dodané pracovné DOCX súbory. Lokálny obsah databázy sa nikdy nenahráva ako produkčný export.

## Existujúce nasadenie (nastavené 13. 10. 2026)

- Verejný web: https://envi-set-public.akire101.workers.dev
- Repozitár: https://github.com/akire101/enviset, produkčná vetva `main`.
- Cloudflare Worker aj D1: `envi-set-public`. Existujúca databáza je v jurisdikcii EU; jej ID je už v produkčnej konfigurácii. Nevytvárajte ďalšiu databázu pri každej aktualizácii.
- Workers Builds je pripojený ku GitHubu. Push na `main` automaticky spúšťa kontrolu typov, testy, zostavenie, nové migrácie, import ôsmich verejných článkov cez `INSERT OR IGNORE` a nasadenie. Existujúce články ani kontaktné správy sa pri aktualizácii neprepisujú.
- Build používa `NODE_VERSION=24`, koreň `/`, vypnuté preview builds a token `enviset-builds-cloudflare` obmedzený na Workers Scripts:Edit a D1:Edit pre jediný účet. Token je uložený v Cloudflare, nie v repozitári.

### Rýchla aktualizácia

1. Upravte súbory v pracovnom klone tohto repozitára, nie v uloženej zákazníckej zálohe.
2. Aktualizujte zákaznícky prehľad v `README.md`: dátum, pridané a vylepšené funkcie, celkový stav, overenie a otvorené obmedzenia. Zachovajte staršie datované záznamy a rešpektujte `AGENTS.md`. Potom spustite `npm ci`, `npm run typecheck`, `npm test` a `npm run build`.
3. Skontrolujte `git diff`; pridajte len zamýšľané súbory, vytvorte commit a vykonajte `git push origin main`.
4. V Cloudflare otvorte Worker `envi-set-public` → Deployments a počkajte na úspešný build nového commitu. Lokálne prihlasovanie cez Wrangler pri tomto postupe netreba.
5. Overte verejnú stránku, `/blog` a detail článku. D1 sa zachováva medzi nasadeniami.

Na návrat k staršiemu kódu použite `git revert` príslušného commitu a push. Návrat kódu automaticky nevracia databázové migrácie; pred zmenou existujúcich dát urobte samostatnú zálohu D1.

### Ešte nedokončené prevádzkové nastavenia

Verejný web, databáza aj produkčné prihlásenie do `/admin` fungujú. Administrátorské údaje sú uložené ako šifrované Cloudflare Secrets. Dňa 13. 10. 2026 bolo cez produkčné rozhranie overené prihlásenie, vytvorenie a úprava neverejného konceptu aj zachovanie úpravy po obnovení stránky. Verejná adresa konceptu vracia 404 a administrátorské API bez prihlásenia vracia 401. Pri bežnom nasadení existujúce Secrets znovu nevytvárajte a nikdy ich nepridávajte do GitHubu.

Kontakt ukladá dopyty do D1, e-mail sa neodosiela. Firemné kontakty sú doplnené vo v2 z 18. 10. 2026; ešte treba dokončiť informácie o ochrane súkromia. `SITE_URL` zostáva prázdne a indexácia vypnutá do dokončenia týchto údajov; web je napriek tomu dostupný priamym odkazom. Potom nastavte `SITE_URL` na verejný HTTPS origin a overte canonical, sitemap a robots.txt.

### Pridanie a úprava článku

Otvorte `/admin` a prihláste sa. Cez **Nový článok** vyplňte názov, úvod a obsah; ponechajte **Koncept – iba administrátor** a kliknite na **Uložiť článok**. Na zverejnenie vyberte **Zverejnený – viditeľný na blogu** a znovu uložte. Existujúci článok vyberte zo zoznamu vľavo. Možnosť archívu článok skryje a umožňuje neskoršie obnovenie.

### Vlastné titulné obrázky (v32, 29. 10. 2026)

Pred nasadením kódu aplikujte novú migráciu `drizzle/0006_article_images.sql` v rámci existujúceho postupu migrácií D1. Vlastník schválil nasadenie 29. 10. 2026. Nie je potrebná nová služba, účet ani tajomstvo.

`POST /api/admin/images` vyžaduje administrátorskú reláciu a rovnaký Origin; limituje 60 pokusov za hodinu a priebežne čítané telo na 750 KiB. Kontroluje signatúru JPEG/PNG/WebP aj zhodu s Content-Type, SVG/HTML nepovoľuje. Prehliadač prijíma originál do 10 MiB, prekreslí ho bez metadát, zmenší dlhšiu stranu najviac na 1600 px a odošle komprimovaný obrázok. Dáta sa ukladajú do D1 ako BLOB, adresa `/media/<sha256>` sa pri opakovanom nahratí rovnakých dát nemení.

`GET /media/[id]` sprístupní obrázok anonymne iba vtedy, keď ho používa zverejnený článok; administrátor ho vidí aj pred uložením konceptu. Odpoveď má `no-store`, `nosniff` a reštriktívne CSP. Obrázok zdieľaný s iným zverejneným článkom zostáva verejný. Ukladanie článku overí existenciu nahratého obrázka. Prepnutie článku ruší rozbehnutý upload v editore; serverom už prijaté, ale nepriradené obrázky zostávajú v úložisku. Automatické mazanie nie je implementované.

Záloha musí zahŕňať tabuľku `article_images`. JSON export redakcie obsahuje iba odkazy; zdrojová Git záloha neobsahuje uploady. Toto jednoduché úložisko je určené pre jednotlivé komprimované titulné fotografie; pri väčšej knižnici médií presuňte súbory do objektového úložiska. Limit riadka D1 je 2 MB, súčasný limit 750 KiB zostáva pod ním ([Cloudflare D1 limits](https://developers.cloudflare.com/d1/platform/limits/)).

Lokálne overenie: `ENVI_TEST_URL=http://127.0.0.1:6010`, potom `node tests/article-images.mjs`. Playwright musí byť dostupný cez nainštalovaný modul alebo premennú `PLAYWRIGHT_MODULE`. Test používa len lokálny účet z ignorovaného `.local-admin.json`; vytvorí testovací článok a na konci ho archivuje. V staršej lokálnej databáze inicializovanej mimo záznamov migrácií stačí vykonať výhradne novú migráciu cez `wrangler d1 execute DB --local --config wrangler.local.json --persist-to .wrangler/state --file drizzle/0006_article_images.sql`. Neopakujte na nej prvotné vytvorenie existujúcich tabuliek.

Nasledujúce časti opisujú aj ručnú obnovu v novom účte. Kroky vytvorenia databázy neopakujte pre existujúce nasadenie.

GitHub uchováva zdrojové súbory. GitHub Pages spúšťa statické stránky; serverové API, administrácia a D1 tohto projektu vyžadujú Cloudflare Workers. Samostatný SQL súbor v repozitári nie je bežiaca databáza.

## 1. Zostavenie

Po naklonovaní repozitára:

```sh
npm ci
npm run typecheck
npm test
npm run build
npx wrangler login
```

Použite pribalený lockfile; samotný priečinok `dist/client` nestačí na celý web. Produkčný server vzniká v `dist/server/index.js` a statické súbory v `dist/client`.

## 2. Nová produkčná databáza

```sh
npx wrangler d1 create envi-set-public
```

V `deploy/wrangler.production.json` nahraďte zástupné `database_id` skutočným ID vytvorenej databázy. Skontrolujte názov Workera a `database_name`. ID databázy nie je heslo, prístup riadi Cloudflare účet. Zachovajte `binding: "DB"`.

Do `vars.SITE_URL` uveďte finálny HTTPS origin bez podstránky, napríklad vlastnú doménu alebo pridelenú `workers.dev` adresu. Nie je potrebné kupovať doménu, ak na prvé spustenie stačí adresa poskytovateľa. Potom aplikujte migrácie a verejné články do NOVO vytvorenej databázy:

```sh
npx wrangler d1 migrations apply DB --remote --config deploy/wrangler.production.json
npx wrangler d1 execute DB --remote --config deploy/wrangler.production.json --file data/public-posts.sql
```

Migrácie vytvoria tabuľky posts, post_redirects, messages, sessions a rate_limits. Import obsahuje tri pôvodné a päť dodaných publikovaných článkov; INSERT OR IGNORE zachová existujúce záznamy. Nekopírujte `.wrangler`, `database.sql`, súkromné kontaktné správy ani existujúce prihlasovacie relácie. D1 je hostovaná SQLite databáza; MySQL/PostgreSQL nie sú pri tomto kóde priamou náhradou.

## 3. Produkčná administrácia

Nasledujúci postup slúži pre nové nasadenie alebo vedomú zmenu prihlasovania. V aktuálnej produkcii sú Secrets už nastavené. Pre nové nasadenie vytvorte silné heslo a nastavte samostatné serverové Secrets:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_SALT`
- `ADMIN_PASSWORD_HASH`

Hash musí zodpovedať PBKDF2 SHA-256, 100 000 iterácií, 32 bajtov, hex — implementácia je v `scripts/setup-admin.mjs`. Tento skript načíta vlastné heslo z dočasnej premennej `ENVI_ADMIN_PASSWORD` (aspoň 14 znakov) a meno interaktívne. Vytvorí iba ignorovanú lokálnu `.dev.vars` a odmietne prepísať existujúcu. Na prípravu produkčných údajov ho použite v samostatnom súkromnom klone; po použití vyčistite dočasnú premennú. Nepoužite prezentačné heslo ani lokálny testovací účet.

Hodnoty zo súkromnej konfigurácie vložte cez Cloudflare dashboard alebo interaktívne príkazy (nezadávajte ich ako argument príkazu ani do repozitára):

```sh
npx wrangler secret put ADMIN_USERNAME --config deploy/wrangler.production.json
npx wrangler secret put ADMIN_PASSWORD_SALT --config deploy/wrangler.production.json
npx wrangler secret put ADMIN_PASSWORD_HASH --config deploy/wrangler.production.json
```

Wrangler môže pri prvom nastavení tajomstiev ponúknuť vytvorenie Workera. Tieto príkazy menia vzdialený účet; v rámci exportu sa nespustili. Bez hodnôt aplikácia administrátorské prihlásenie odmietne.

## 4. Nasadenie

Po doplnení kontaktov, domény, databázy a Secrets:

```sh
npm run build
npx wrangler deploy --config deploy/wrangler.production.json
```

Použite túto explicitnú produkčnú konfiguráciu. Automaticky generovaná `dist/server/wrangler.json` je určená pre lokálny náhľad a obsahuje zástupnú databázu. Nevykonávajte produkčné nasadenie s jej zástupným ID.

Tento repozitár je už pripojený k Cloudflare Workers Builds podľa nastavení vyššie. Pri bežnej aktualizácii stačí push na `main`.

## 5. Kontakt a kontrola po spustení

Formulár uloží dopyt do `messages`. Voliteľné `CONTACT_NOTIFICATION_URL` a `CONTACT_NOTIFICATION_TOKEN` patria do Secrets. Adaptér odošle HTTPS službe iba ID dopytu, nie celý obsah. Pre skutočné e-maily treba doplniť príjemcu, poskytovateľa a funkčné spracovanie notifikácie; odpoveď adaptéra 2xx sama nepotvrdzuje doručenie e-mailu.

Na finálnej doméne skontrolujte články, služby, kontaktný formulár, prihlásenie/odhlásenie, anonymné odmietnutie `/api/admin/posts`, HTTPS, `robots.txt`, sitemap a canonical URL. Overte, že nový dopyt vidí iba administrátor, a nastavte zálohovanie D1. Verejné cloudové nasadenie ani doručenie e-mailov pri lokálnom exporte nebolo overené.

Oficiálne zdroje: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [D1 príkazy](https://developers.cloudflare.com/workers/wrangler/commands/d1/), [Wrangler konfigurácia](https://developers.cloudflare.com/workers/wrangler/configuration/), [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

## Analytika od v9

Nová tabuľka analytics_views a indexy majú idempotentné vytvorenie v app/analytics-db.ts pri prvom autorizovanom čítaní alebo validnom meraní; netreba pridávať tajomstvá ani externú službu. SQL je aj v drizzle/0002_analytics.sql pre samostatné zriadenie. Bootstrap nemení existujúce tabuľky. Pri databáze bez migračného denníka nespúšťajte naslepo staré migrácie nad už existujúcimi tabuľkami.

Štatistiky používajú rovnakú D1 väzbu DB a administrátorskú reláciu. Mazanie starších dát sa vykonáva pri ďalšom prístupe (400 dní); nie samostatným plánovačom. Detaily sú obmedzené na 1 000 posledných zobrazení, počty agregované za celé zvolené obdobie.

Lokálny test: node tests/analytics-integration.mjs používa výhradne http://127.0.0.1:6010 a lokálne testovacie prihlásenie. Vytvára syntetické návštevy len lokálne. Súbory .dev.vars, .local-admin.json a outputs musia zostať ignorované.


## Živá podpora (v13, 28. 10. 2026)
Tabuľky support_users, support_sessions, support_rooms a support_messages sa bezpečne vytvoria pri prvom použití. Zodpovedajú drizzle/0003_support.sql; existujúce dáta sa nemenia. V administrácii → Štatistiky podpory → Prihlasovací účet podpory vytvorte účet podpora. Heslo ani jeho hash nepatria do Git-u. Zmena hesla ruší existujúce relácie podpory. Pracovník sa prihlasuje cez /admin a uvidí iba pracovisko podpory.
Lokálne: tests/support-integration.mjs používa výlučne 127.0.0.1:6010 a lokálny testovací účet; --offline testuje zatvorené hodiny. Kompletný online test vyžaduje pracovný čas alebo dočasný lokálny hodinový fixture, ktorý sa nesmie nasadiť. Unit testy kontrolujú aj letný čas a víkend.

## Tím podpory (v14, 28. 10. 2026)
Nové tabuľky z drizzle/0004_support_team.sql sa idempotentne vytvoria pri použití. Existujúce účty a správy sa zachovajú. V Štatistikách podpory sú dva formuláre: podpora (Podpora 1) a podpora2 (Podpora 2). Druhý účet aktivujte heslom zadaným priamo v administrácii; heslá ani odvodené hodnoty neukladajte do repozitára. Zmena hesla ruší iba relácie daného účtu a resetuje základ online merania.
Dočasné otvorenie chatu má serverom kontrolovaný koniec (maximálne 120 minút). Neobchádza požiadavku na prihlásenú dostupnú podporu. Online čas je súčet potvrdených intervalov do 75 sekúnd, delený podľa kalendárneho dňa v Bratislave a bez zdvojenia súbežných kariet. Nemeria sa spätne. Denné súčty sa uchovávajú 400 dní, konverzácie a ich hodnotenia 90 dní.

## Jednotný chat a obrázky (v15, 28. 10. 2026)
LiveChat je jediný návštevnícky formulár. Po potvrdení dostupnosti posiela správy živej podpore; pri offline stave používa lokálne pravidlá sprievodcu bez zápisu do chatu. Pri výpadku počas odosielania zostáva text a identifikátor správy na opakovanie; zlyhanie sa nezamlčí. Webové odkazy sa vykresľujú ako React text a overené HTTP/HTTPS odkazy, bez vykonávania vloženého HTML.
Voľba Enteru je v localStorage pod envi_enter_[účet]. Predvolená hodnota je vypnutá, Shift + Enter vkladá nový riadok.
Pri prvom čítaní článkov app/blog-image-migration.ts v jednej databázovej dávke vytvorí site_updates, nahradí iba staré spoločné obrázky štyroch určených článkov a uloží značku v15-blog-images. Obsah ani publikovanie nemení; aktualizuje image, image_alt a updated_at. Nové WebP sa nasadia spolu s kódom. Neskoršie zmeny redaktora sa už neprepisujú.

## Upozornenia a prehľady (v16, 28. 10. 2026)
Tabuľka support_preferences vzniká idempotentne cez supportDb aj migráciu 0005_support_reminders.sql. Predvolený interval 30 sekúnd sa existujúcemu nastaveniu neprepíše. POST /api/admin/support-settings vyžaduje administrátora a pôvod požiadavky; povoľuje len 15/30/60/120 sekúnd. Pracoviská načítajú zmenu pri ďalšom päťsekundovom obnovení. Čakanie znamená návštevnícku správu za poslednou odpoveďou podpory v otvorenom rozhovore, nezávisle od read_at. Fronta je spoločná obom pracovníčkam; odpoveď ktorejkoľvek ju vyrieši. Zatvorenie rozhovoru tiež zastaví pripomienku.

Jednorazová migrácia obrázkov používa značku v16-supplied-images a štyri dodané WebP. Nahrádza len určené staré predvolené alebo v15 generované obrázky štyroch konkrétnych článkov. Iné redakčné výbery a neskoršie úpravy sa neprepisujú. Vodoznak dodaného odpad-obr4 sa neupravoval.

Lokálny test tests/support-alerts.mjs používa izolovanú databázu a náhodné testovacie heslo; nemení produkčné účty. PLAYWRIGHT_MODULE smeruje na nainštalovaný Playwright. Opakované spúšťanie môže vyčerpať lokálny prihlasovací limit; čistiť možno výhradne lokálnu tabuľku rate_limits.
