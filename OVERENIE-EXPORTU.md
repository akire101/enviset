# Overenie exportu — 13. 10. 2026

Zdroj: používateľom potvrdená `ENVISET_verzia1zakaznik`. Uložená verzia a pracovné weby sa nemenili. Export obsahuje rozbalené zdroje pripravené na GitHub, nie iba statický výstup.

Overenie sa vykonalo v samostatnej testovacej kópii, aby v tomto verejnom priečinku nezostali testovacie dáta ani účty:

- Čistá inštalácia závislostí z lockfile: úspešná, 682 balíkov.
- 6 automatizovaných testov: úspešné.
- TypeScript a produkčný build: úspešné.
- Obe migrácie do prázdnej lokálnej D1 a import troch verejných článkov: úspešné; integrita SQLite `ok`.
- `wrangler deploy --dry-run` s pribalenou produkčnou šablónou: úspešný, bez publikovania. Skutočné ID databázy a finálna doména zostávajú na doplnenie.
- 37 integračných kontrol na izolovanom lokálnom serveri: stránky, články, odmietnutie anonymného admina, CSRF, validácia formulára, uloženie dopytu bez duplikácie, prihlásenie, tvorba a publikovanie článku, presmerovanie, stiahnutie článku, odhlásenie a zneplatnenie relácie.
- Kontrola súborov oproti zdroju zachováva aplikačný kód, dizajn, médiá a databázové schéma. Export je preverovaný na neprítomnosť pôvodného hesla, hash/salt, notifikačného tokenu a súkromných runtime súborov. Žiadna z týchto hodnôt sa neukladá do reportu.

Úpravy sú iba na prípravu exportu: nový README/návod, produkčná konfiguračná šablóna, čistý verejný seed, gitignore, cesta k lokálnym migráciám, explicitná závislosť testov `tsx` a integračný test zodpovedajúci trom už publikovaným článkom. Integračný test teraz vyžaduje explicitný lokálny testovací URL, aby omylom nemenil prezentačný web.

Neoverené: skutočný Cloudflare účet, vzdialená D1, finálna doména, doručenie e-mailov, kompletný bezpečnostný/licenčný audit a nový prehliadačový vizuálny audit. Build upozorňuje na staršiu konvenciu `middleware`; Vinext je vo fixovanej beta verzii. Na verejný GitHub ani hosting sa zatiaľ nič nenahralo.

Kontrolné súčty verejného exportu sú v `EXPORT-MANIFEST.json`. Manuálne nahrávaný GitHub obsah musí zahrnúť aj súbory začínajúce bodkou.
