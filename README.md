# ENVI SET – funkcie webu, bezpečnosť a SEO

**Posledná aktualizácia: 14. 10. 2026.** Prehľad pre zákazníka opisuje implementáciu tohto webu. Pri pripravených funkciách uvádza podmienky aktivácie a odlišuje aktuálny kód od historického overenia prevádzky.

- [Otvoriť web ENVI SET](https://envi-set-public.akire101.workers.dev)
- [Administrácia](https://envi-set-public.akire101.workers.dev/admin) – vyžaduje prihlásenie.
- [GitHub repozitár](https://github.com/akire101/enviset)
- [Technický návod na aktualizáciu, nasadenie a obnovu](NASADENIE.md)
- [Overenie pôvodného exportu](OVERENIE-EXPORTU.md) a [manifest exportu](EXPORT-MANIFEST.json) – historické podklady, nie overenie každej neskoršej zmeny.

## Celkový prehľad

Slovenský firemný web ENVI SET predstavuje poradenstvo a manažment odpadového hospodárstva, vysvetľuje spoluprácu, publikuje praktické články a prijíma dopyty na bezplatnú úvodnú konzultáciu. Administrátor spravuje články a správy cez prehliadač.

| Oblasť | Možnosti | Stav |
|---|---|---|
| Firemná prezentácia | Domov, O nás, služby, odvetvia, spolupráca, FAQ, kontakt | Implementované |
| Služby | Šesť samostatných detailov | Implementované |
| Blog / poradňa | Kategórie, vyhľadávanie, stránkovanie, detail a súvisiace články | Implementované; export obsahuje tri publikované články |
| Administrácia | Editor, koncepty, publikovanie, archív a JSON záloha článkov | Implementované; produkčný login a úpravy konceptu overené 13. 10. 2026 |
| Dopyty | Formulár a súkromná schránka administrátora | Ukladajú sa do databázy |
| E-mailové oznámenia | Adaptér na externú notifikačnú službu | Nenastavené; web neposiela e-maily |
| Sprievodca | FAQ pomocník s odkazmi na služby | Lokálne, bez externého AI modelu |
| Mobilné zobrazenie | Responzívne rozloženie a mobilná navigácia | Implementované |
| SEO | Metaúdaje, canonical, sitemap, robots a štruktúrované údaje | Pripravené; produkčná indexácia zatiaľ vypnutá |
| Aktualizácie | GitHub → Cloudflare Workers Builds → web a D1 | Zapojenie zaznamenané v návode nasadenia |

## Čo vie verejná stránka

### Firma, služby a spolupráca

- Úvodná stránka vysvetľuje zameranie firmy, predstavuje služby a vedie ku konzultácii.
- **O nás** opisuje vznik spoločnosti, skúsenosti a prístup k zákazníkom.
- Štyri kroky spolupráce: úvodné stretnutie, vstupná analýza, nastavenie systému a priebežná podpora.
- Hodnoty: odbornosť, osobný prístup, zrozumiteľnosť, pripravenosť na kontrolu a dlhodobé partnerstvo.
- Osem odvetví: výroba, autoservisy, stavebníctvo, obchod, kancelárie, gastro, sklady a logistika, remeselné prevádzky.
- Odkazy z odvetví a detailov služieb predvyplnia príslušnú tému kontaktného formulára.
- Päť rozbaľovacích FAQ o službách, cene, konzultácii, nebezpečných odpadoch a fyzickom odvoze.
- Výzvy na konzultáciu prepájajú služby, blog a kontakt.

| Služba | Obsah samostatnej stránky |
|---|---|
| Odborná dokumentácia | Posúdenie a príprava dokumentov, ILNO, havarijné opatrenia a prevádzkové poriadky |
| Evidencia odpadov | Zmapovanie a zaradenie odpadov, zber podkladov a vedenie evidencie |
| Ohlasovacie povinnosti | Posúdenie povinností, kontrola podkladov, príprava a spôsob podania ohlásení |
| Kontrola a poradenstvo | Posúdenie prevádzky, nedostatky, odporúčania a priebežné konzultácie |
| Nebezpečné odpady | Identifikácia, označovanie, zhromažďovanie, evidencia a dokumentácia |
| Riešenia pre firmy | Nastavenie systému podľa činnosti konkrétnej prevádzky |

Každý detail obsahuje vlastný opis, činnosti, vhodného zákazníka, podklady na konzultáciu, postup spolupráce, FAQ, súvisiace služby a kontakt. Pri nebezpečných odpadoch uvádza aj príklady. Odkazy na Slov-Lex vedú na zákon o odpadoch a Katalóg odpadov; web zároveň vysvetľuje potrebu individuálneho posúdenia. Ide o prezentáciu služieb firmy: samotný web automaticky nevedie zákonnú evidenciu ani nepodáva ohlásenia úradom.

### Vzhľad, navigácia a prístupnosť

- Navigácia Domov, O nás, Služby, Blog / Poradňa a Kontakt, s označením aktuálnej stránky.
- Rozšírené menu všetkých šiestich služieb, konzultácie a sekcií úvodnej stránky.
- Na počítači otvorenie služieb myšou; dostupné sú aj kliknutie, dotyk a klávesnica.
- Zatvorenie kliknutím mimo, odchodom fokusu alebo Escape; šípka nadol otvorí odkazy služieb.
- Mobilné menu a prispôsobenie kariet, formulárov, rozloženia a textov menším obrazovkám.
- Lokálne WebP fotografie, lokálne písmo Manrope, ikony, jemné prechody a efekty pri prejdení myšou.
- Odkaz „Preskočiť na obsah“, viditeľný fokus, popisky formulárov a prístupné stavové či chybové hlásenia.
- Rešpektovanie systémového obmedzenia animácií (`prefers-reduced-motion`).
- Vlastná stránka nenájdeného obsahu a chybový stav aplikácie.

Tento repozitár obsahuje slovenský web. Prepínač jazykov, tmavá téma a 3D scény z iných pracovných variantov tu nie sú implementované. Uvedené prvky prístupnosti nepredstavujú certifikáciu WCAG.

## Blog a poradňa

- Verejne zobrazuje iba publikované články, od najnovšieho publikovania.
- Filtruje podľa kategórie a vyhľadáva v názve a perexe bez ohľadu na diakritiku či veľkosť písmen.
- Stránkuje po deviatich článkoch; pri prázdnom výsledku umožní zrušiť filtre.
- Detail obsahuje titulok, perex, kategóriu, obrázok, dátum a odhad času čítania.
- Text člení na nadpisy a odseky, pripája súvisiace články, návrat na blog a konzultáciu.
- Úvodná stránka zobrazuje najviac tri najnovšie články.
- Zmena adresy už publikovaného článku vytvorí trvalé presmerovanie starej adresy (HTTP 308).
- Koncept, archív a stiahnutý článok vracajú verejne 404; neodhalí ich ani staré presmerovanie.

Blog nemá komentáre, newsletter ani verejné používateľské účty. Vyhľadávanie neprehľadáva celý text článku.

## Čo vie administrátor

### Správa článkov

1. Prihlási sa na `/admin` menom a heslom.
2. Vytvorí článok alebo vyberie existujúci zo zoznamu.
3. Vyplní názov, adresu, krátky úvod, obsah, kategóriu a pripravený obrázok.
4. Voliteľne doplní alternatívny text obrázka, vlastný SEO titulok a popis.
5. Uloží koncept, zverejní článok alebo ho presunie do obnoviteľného archívu.

Editor navrhuje adresu nového článku z názvu bez diakritiky. Ponúka štyri kategórie a štyri lokálne obrázky, počítadlo dĺžky perexu, náhľad textu, stav neuložených zmien a hlásenie výsledku uloženia. Obsah je obyčajný text; HTML sa nevykonáva. Náhľad textu je orientačný: verejný detail navyše člení viacriadkové bloky na nadpis a odsek.

Pri prepnutí článku, odhlásení a opustení stránky upozorňuje na neuložené zmeny. Archiváciu treba potvrdiť. Zastarané uloženie po súbežnej úprave iným editorom server odmietne; používateľ má obnoviť článok. Rovnakú adresu nemožno použiť pre dva články ani pre adresu rezervovanú presmerovaním.

Administrátor môže stiahnuť **JSON zálohu všetkých článkov**, vrátane konceptov a archívu. Nie je to záloha celej databázy ani správ. Automatický import tejto zálohy cez editor nie je implementovaný. Súbor môže obsahovať neverejné texty a patrí do súkromného úložiska.

### Schránka dopytov

- Zobrazuje meno, e-mail, správu a prípadnú spoločnosť, telefón, službu a odvetvie.
- Uvádza čas prijatia a počet nových správ.
- Umožňuje označiť správu ako vybavenú alebo opäť novú.
- E-mailový odkaz otvorí e-mailovú aplikáciu na ručné odpovedanie.

Administrácia používa jeden nakonfigurovaný účet. Samostatné roly, 2FA, história všetkých úprav, nahrávanie obrázkov a mazanie kontaktných správ cez rozhranie nie sú implementované.

## Kontaktný formulár

- Povinné meno, platný e-mail, správa a potvrdenie oboznámenia sa s informáciami o spracúvaní údajov.
- Nepovinná spoločnosť a telefón; výber služby a odvetvia.
- Kontrola údajov v prehliadači aj na serveri; správa má 15 až 5 000 znakov, ostatné polia vlastné limity.
- Počas odosielania zablokuje tlačidlo; pri chybe zobrazí vysvetlenie.
- Po uložení zobrazí potvrdenie, skrátenú referenciu dopytu a možnosť napísať ďalšiu správu.
- Jedinečný identifikátor chráni opakované odoslanie toho istého formulára pred druhou správou.
- Skryté pole pre robotov (honeypot) a serverový limit požiadaviek obmedzujú zneužitie.

Potvrdenie znamená uloženie do databázy, nie doručenie e-mailu. Odoslaním nevzniká objednávka platených služieb.

## Sprievodca na webe

Lokálny FAQ pomocník rozpoznáva témy služieb, dokumentácie, evidencie, nebezpečných odpadov, konzultácie, ceny a kontaktu a ponúka príslušné odkazy. Má návrhy otázok, reset konverzácie, ovládanie Escape a návrat fokusu na otváracie tlačidlo.

- Nepoužíva externý AI model a neposiela konverzáciu externej službe.
- Nemá prístup ku konceptom, administrátorským údajom ani správam zákazníkov.
- Pri neistote odkáže na odborníka; nevymýšľa individuálnu cenu alebo konkrétne zákonné povinnosti.
- Otázka má najviac 500 znakov; rozhranie povoľuje najviac 15 otázok za minútu a priebežne skracuje históriu.
- Konverzácia zostáva v pamäti prehliadača a po obnovení stránky sa vymaže.
- Na stránke administrácie sa nezobrazuje.

Limit chatu je v prehliadači, nie serverová ochrana. Sprievodca nenahrádza odborné posúdenie ani živého operátora.

## Bezpečnostné ochrany a ošetrenia

Opatrenia uvedené nižšie sú implementované v aplikácii. Znižujú konkrétne riziká; nejde o záruku absolútnej bezpečnosti ani nezávislý penetračný audit.

| Ochrana | Ako funguje |
|---|---|
| Serverové oprávnenia | Čítanie konceptov a správ aj zmeny v administrácii vyžadujú platnú reláciu; anonymné API vracia 401 |
| Hashovanie hesla | PBKDF2 SHA-256 so soľou a 100 000 iteráciami; porovnávanie hashu bez predčasného ukončenia pri prvom odlišnom znaku pre rovnako dlhé hodnoty |
| Cloudflare Secrets | Produkčné meno, soľ a hash patria do serverových Secrets; pri chýbajúcom nastavení sa login odmietne |
| Náhodná relácia | Token z 32 kryptograficky náhodných bajtov; databáza ukladá iba jeho SHA-256 hash |
| Cookie relácie | `HttpOnly`, `SameSite=Strict`, pri HTTPS `Secure`; platnosť najviac 8 hodín; logout ruší reláciu na serveri |
| Login limit | Najviac 8 pokusov za 15 minút na odvodený identifikátor IP; prekročenie vracia 429 |
| Kontaktný limit | Najviac 5 požiadaviek za hodinu na odvodený identifikátor IP, vrátane neplatných a opakovaných odoslaní |
| Kontrola pôvodu / CSRF | Zapisujúce požiadavky musia mať Origin zhodný s adresou servera; cudzí či chýbajúci Origin sa odmietne |
| Formát a veľkosť | Vyžaduje JSON; telo nad 70 000 bajtov a neplatné JSON odmietne riadenou chybou |
| Serverová validácia | Dĺžky, e-mail, súhlas, kategórie a stavy; články a kontakt odmietajú neznáme polia |
| Bezpečné adresy a obrázky | Slug povoľuje malé písmená bez diakritiky, čísla a spojovníky; článok používa iba štyri povolené lokálne obrázky |
| Ošetrenie HTML / XSS | Používateľské texty sa vykresľujú ako text cez React; znak `<` sa v JSON-LD escapuje |
| Databázové príkazy | Drizzle a viazané parametre D1 oddeľujú hodnoty používateľa od SQL |
| Ochrana súbežných úprav | Verzia článku podľa času úpravy; konflikt 409; zmena a presmerovanie používajú databázový batch |
| Ochrana konceptov | Verejný blog a presmerovania povoľujú iba publikované články; ostatné vracajú 404 |
| Bez cache citlivých odpovedí | API a administrácia: Cache-Control no-store a X-Robots-Tag noindex, nofollow |
| Bezpečnostné hlavičky | nosniff, strict-origin-when-cross-origin a Permissions-Policy zakazujúca kameru, mikrofón a geolokáciu na trasách middleware |
| Riadené chyby | Neočakávaná chyba API nevracia klientovi interný detail; server zapisuje všeobecné hlásenie |
| Bezpečný export | .gitignore vylučuje lokálne heslá, databázy, runtime súbory, relácie, logy a privátne konfigurácie |

Middleware vylučuje niektoré statické trasy, preto na nich tieto hlavičky negarantuje. Limity používajú produkčnú IP hlavičku Cloudflare; spoločná IP môže ovplyvniť viac ľudí. Robots a noindex riadia vyhľadávače; súkromné údaje chráni serverové prihlásenie.

V aplikácii nie je vlastná Content Security Policy, ochrana proti vloženiu stránky do rámca ani vlastná HSTS hlavička. CAPTCHA, 2FA, viac rolí a auditný denník všetkých zmien nie sú zavedené. Automatické zálohovanie celej D1 a pravidlá uchovávania či výmazu údajov treba prevádzkovo doriešiť.

## Ako je web pripravený na SEO

### Obsah a štruktúra

- Samostatné čitateľné adresy služieb a článkov, slovenský jazyk dokumentu (`lang="sk"`).
- Vlastné titulky a popisy verejných stránok, značka ENVI SET v titulkoch, nadpisy, odseky a interné odkazy.
- SEO titulok a popis v editore; pri nevyplnení sa použije názov a perex článku.
- Trvalé presmerovania pôvodných adries článkov a skutočné 404 pre nedostupný obsah.
- Dátum publikovania, súvisiace čítanie a prepojenie článkov na konzultáciu.

### Technické SEO

| Prvok | Implementácia |
|---|---|
| Canonical | Preferovaná HTTPS adresa každej stránky po nastavení platného SITE_URL |
| Sitemap | Dynamický /sitemap.xml: hlavné stránky, šesť služieb a publikované články; články majú dátum poslednej úpravy |
| Robots | Po aktivácii povoľuje verejný web, uvádza sitemap a vylučuje admin, API a ochranu súkromia; bez SITE_URL zakazuje prehľadávanie |
| Sociálne náhľady | Open Graph titulok, popis, typ a slovenská lokalizácia; s platnou adresou aj URL a obrázok; Twitter titulok, popis a veľký náhľad |
| WebSite | JSON-LD údaje o webe pri platnom SITE_URL |
| BlogPosting | JSON-LD titulok, popis, obrázok, dátumy a adresa článku pri platnom SITE_URL |
| BreadcrumbList | JSON-LD hierarchia Domov → Služby → konkrétna služba pri platnom SITE_URL |
| Súkromné časti | Vylúčenie administrácie, API a ochrany súkromia z indexácie |

### Výkon a používateľský zážitok

WebP obrázky majú rozmery a alternatívne texty podľa účelu. Viaceré obrázky mimo úvodu sa načítavajú odložene; úvodný obrázok má vysokú prioritu. Fonty sú lokálne, rozloženie responzívne a verejný obsah sa generuje na serveri. Filtrovanie blogu a interaktívne ovládanie fungujú v prehliadači.

**Aktuálny stav:** produkčná konfigurácia má prázdne `SITE_URL`. Web preto zostáva zámerne noindex, bez canonical adries, s prázdnou sitemap a bez JSON-LD viazaného na doménu. Je dostupný priamym odkazom. Pripravené SEO neznamená indexáciu alebo garantovanú pozíciu v Google.

Pred aktiváciou treba dokončiť firemné údaje a ochranu súkromia, potvrdiť finálnu HTTPS adresu a práva k fotografiám, nastaviť SITE_URL a overiť výsledné metadata, robots a sitemap. Google Search Console, meranie návštevnosti, overenie indexácie, Lighthouse/Core Web Vitals a schémy Organization, LocalBusiness či FAQPage nie sú deklarované ako zavedené alebo overené.

## Všetky prepojenia a údaje

| Prepojenie | Úloha a stav |
|---|---|
| GitHub → Cloudflare Workers Builds | Push na main spúšťa kontrolu typov, testy, zostavenie, migrácie a nasadenie; zapojenie zaznamenané 13. 10. 2026 |
| Cloudflare Workers → D1 | Články, presmerovania, správy, hashované relácie a dočasné limity; binding DB je v produkčnej konfigurácii |
| Cloudflare Secrets → admin | Serverové nastavenie prihlasovania; produkčný login overený 13. 10. 2026 |
| Formulár → schránka | Ukladanie dopytov a označovanie vybavenia |
| Služba / odvetvie → kontakt | URL parametre predvyplnia známe hodnoty vo formulári |
| Sprievodca → služby / kontakt | Lokálne FAQ pravidlá s verejnými odkazmi |
| Schránka → e-mailová aplikácia | mailto odkaz pre ručné odpovedanie |
| Detail služby → Slov-Lex | Verejné odkazy na zákon o odpadoch a Katalóg odpadov, bez odosielania evidencie |
| Voliteľná notifikačná služba | Nenastavený HTTPS webhook s Bearer tokenom; odosiela iba udalosť a ID dopytu, timeout 5 sekúnd; 2xx nepotvrdzuje doručenie e-mailu |

Pomocné súbory pôvodného Sites/connector prostredia nie sú dôkazom aktívnych zákazníckych integrácií. Verejné funkcie a admin ich nepoužívajú ako CRM, e-mail ani AI službu. Platby, rezervácie termínov, CRM, účtovníctvo, napojenie na úrady, newsletter, analytické a reklamné nástroje nie sú zapojené.

Aplikácia nezapína analytické ani reklamné cookies. Admin používa nevyhnutnú prihlasovaciu cookie. Chat sa neposiela na server. Kontaktné údaje sú dostupné prihlásenému administrátorovi. Informácie o ochrane súkromia sú pracovné; technické opatrenia samy osebe nepotvrdzujú úplný súlad s GDPR.

## Prevádzka a aktualizácie

Web používa React, TypeScript, Vinext, Cloudflare Workers, D1, Drizzle a serverovú validáciu Zod. GitHub uchováva zdrojové súbory; GitHub Pages samotné tento serverový web nespustí. Existujúca D1 databáza a Secrets sa pri aktualizácii zachovávajú. Seed troch verejných článkov používa INSERT OR IGNORE a neprepisuje neskoršie úpravy.

Návrat k staršiemu kódu je možný cez Git; databázové zmeny vyžadujú samostatný plán obnovy. Pôvodný export neobsahuje súkromné správy, relácie, heslá ani pracovnú databázu. Podrobnosti sú v [NASADENIE.md](NASADENIE.md). Vinext je vo fixovanom lockfile beta a závislosti treba priebežne udržiavať.

Existujú automatizované kontroly validácie, adries, pôvodu požiadaviek, FAQ a notifikačného adaptéra. Samostatný integračný test kontroluje stránky, admin, koncepty, kontakt, duplicity, HTML text, presmerovania a odhlásenie. Zapisuje údaje a povoľuje iba samostatný lokálny server; nesmie sa používať na zákazníckej databáze. Existencia testu nie je tvrdením, že sa spustil pri každej aktualizácii.

## Čo ešte treba dokončiť

1. Skutočný telefón, e-mail, adresa, obchodné meno a IČO v app/content.ts.
2. Informácie o prevádzkovateľovi, právnom základe, príjemcoch a dobe uchovávania údajov.
3. Ak sú požadované e-maily: poskytovateľ, príjemca, notifikačná služba a test skutočného doručenia.
4. Finálna doména a práva k fotografiám; aktivácia a overenie indexácie cez SITE_URL.
5. Zálohovanie a obnova D1, správa prístupov a uchovávanie či výmaz kontaktných správ.

## Datovaný prehľad zmien

### 14. 10. 2026 – zákaznícky prehľad a údržba dokumentácie

**Pridané:** podrobný prehľad funkcií, administrácie, prepojení, ochrany údajov, bezpečnosti, SEO a otvorených nastavení; datovaná história a pravidlo aktualizovať README po každej úprave.

**Vylepšené:** pôvodný opis exportu nahradený zákazníckym prehľadom. SEO a integrácie rozlišujú implementáciu, aktiváciu a overenie.

**Celkový stav:** opis vychádza z prečítaného kódu. Táto zmena upravuje dokumentáciu, nepridáva funkcie aplikácie. Kontrola dokumentácie: porovnanie s implementáciou a git diff --check. Produkčné výsledky z 13. 10. sú historické, v tejto dokumentačnej úprave sa neopakovali.

### 13. 10. 2026 – GitHub, verejné nasadenie a administrácia

**Pridané:** úplný zdrojový export zákazníckej verzie 1, produkčná konfigurácia Cloudflare Workers s D1, verejná adresa a návod; následne nastavené produkčné prihlasovanie.

**Vylepšené:** GitHub main prepojený s Cloudflare Workers Builds; doplnený návod na aktualizáciu a správu článkov.

**Celkový stav a historické overenie:** zaznamenané prihlásenie, vytvorenie a úprava neverejného konceptu, zachovanie po obnovení, archivácia a odhlásenie. Verejná adresa testovacieho článku vracala 404, anonymné admin API 401. E-maily a indexácia zostali vypnuté. Presný dátum vzniku každej pôvodnej funkcie sa spätne netvrdí.

## Pravidlo aktualizácie tohto README

Pri každej aktualizácii repozitára sa aktualizuje **dátum, čo bolo pridané, čo bolo vylepšené, celkový prehľad, overenie a zostávajúce obmedzenia**. Najnovší záznam patrí navrch; história zostáva zachovaná. Zmena funkcie, bezpečnosti, prepojenia alebo SEO sa premietne aj do príslušnej kapitoly.

Pravidlo je uložené v AGENTS.md. Nie je to automatický generátor: publikovanie článku v administrácii samo neprepisuje GitHub README. Dokumentácia nesmie označovať pripravenú funkciu ako aktívnu bez overenia ani obsahovať heslá, tokeny a osobné správy.
