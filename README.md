# ENVI set – funkcie webu, bezpečnosť a SEO

**Posledná aktualizácia: 18. 10. 2026. Verzia v2.** Zoznámte sa s možnosťami webu ENVI set, správou jeho obsahu a ochranou údajov. Pri funkciách, ktoré ešte vyžadujú nastavenie, uvádzame, čo treba dokončiť pred ich používaním.

- [Otvoriť web ENVI set](https://envi-set-public.akire101.workers.dev)
- [Administrácia](https://envi-set-public.akire101.workers.dev/admin) – vyžaduje prihlásenie.
- [GitHub repozitár](https://github.com/akire101/enviset)
- [Technický návod na aktualizáciu, nasadenie a obnovu](NASADENIE.md)
- Aktuálne vydanie: **v2 – 18. 10. 2026**. História zdrojov je uložená v Git-e; identifikácia verzie je dostupná v `/version.json`.

## Celkový prehľad

Slovenský firemný web ENVI set predstavuje poradenstvo a manažment odpadového hospodárstva, vysvetľuje spoluprácu, publikuje praktické články a prijíma dopyty na bezplatnú úvodnú konzultáciu. Administrátor spravuje články a správy cez prehliadač.

| Oblasť | Možnosti | Stav |
|---|---|---|
| Firemná prezentácia | Domov, O nás, služby, odvetvia, spolupráca, časté otázky, kontakt | Súčasť webu |
| Služby | Deväť detailov služieb, osem položiek celoročného servisu a osem jednorazových služieb | Súčasť webu |
| Blog / poradňa | Kategórie, vyhľadávanie, stránkovanie, detail a súvisiace články | Súčasť webu; import obsahuje tri pôvodné a päť nových článkov; existujúce úpravy sa neprepisujú |
| Administrácia | Editor, koncepty, publikovanie, archív a stiahnutie zálohy článkov | Prihlásenie a úpravy konceptu na verejnom webe overené 13. 10. 2026 |
| Dopyty | Formulár a súkromná schránka administrátora | Ukladajú sa do databázy |
| E-mailové oznámenia | Pripravené prepojenie s e-mailovou službou | Zatiaľ nenastavené; web neposiela e-maily |
| Sprievodca | Pomocník pre časté otázky s odkazmi na služby | Odpovedá priamo v prehliadači, bez externého AI modelu |
| Mobilné zobrazenie | Rozloženie a navigácia prispôsobené mobilu | Súčasť webu |
| SEO | Údaje pre vyhľadávače, mapa stránok a náhľady pri zdieľaní | Pripravené; zaradenie do vyhľadávačov zatiaľ vypnuté |
| Aktualizácie | Automatické nasadenie zmien z GitHubu cez Cloudflare | Postup je opísaný v návode na nasadenie |

## Čo vie verejná stránka

### Firma, služby a spolupráca

- Úvodná stránka vysvetľuje zameranie firmy, predstavuje služby a vedie ku konzultácii.
- **O nás** opisuje vznik spoločnosti, skúsenosti a prístup k zákazníkom.
- Štyri kroky spolupráce na súvislej zvislej časovej osi: osobné stretnutie, vstupná odborná analýza, dodanie a vysvetlenie dokumentácie, celoročný odborný servis.
- Hodnoty: odbornosť, osobný prístup, zrozumiteľnosť, pripravenosť na kontrolu a dlhodobé partnerstvo.
- Osem odvetví: výroba, autoservisy, stavebníctvo, obchod, kancelárie, gastro, sklady a logistika, remeselné prevádzky.
- Odkazy z odvetví a detailov služieb predvyplnia príslušnú tému kontaktného formulára.
- Deväť rozbaľovacích odpovedí z dodaných podkladov: evidencia, zberová spoločnosť, malé množstvá odpadov, existujúca dokumentácia, identifikácia odpadov, menšie firmy, cena, priebežné povinnosti a začiatok spolupráce.
- Výzvy na konzultáciu prepájajú služby, blog a kontakt.

| Služba | Obsah samostatnej stránky |
|---|---|
| Odborná dokumentácia | Posúdenie a príprava dokumentov, identifikačné listy nebezpečných odpadov (ILNO), havarijné opatrenia a prevádzkové poriadky |
| Evidencia odpadov | Zmapovanie a zaradenie odpadov, zber podkladov a vedenie evidencie |
| Ohlasovacie povinnosti | Posúdenie povinností, kontrola podkladov, príprava a spôsob podania ohlásení |
| Kontrola prevádzok | Posúdenie prevádzky, nedostatky, odporúčania a priebežné konzultácie |
| Ostatné a nebezpečné odpady | Identifikácia, označovanie, zhromažďovanie, evidencia a dokumentácia |
| Riešenia pre firmy | Nastavenie systému podľa činnosti konkrétnej prevádzky |
| Odborné poradenstvo | Praktické otázky, zaradenie odpadu, evidencia, doklady a zmeny činnosti |
| Legislatívny servis | Sledovanie dôležitých zmien a ich vplyvu na firmu |
| Dlhodobá spolupráca | Vstupná analýza, nastavenie systému a podpora počas roka |

Na každej stránke služby sa návštevník dozvie, čo služba zahŕňa, komu je určená a čo si pripraviť na konzultáciu. Nájde tu postup spolupráce, odpovede na tri časté otázky, súvisiace služby a odkaz na kontakt. Pri nebezpečných odpadoch sú uvedené aj príklady. Odkazy na Slov-Lex vedú na zákon o odpadoch a Katalóg odpadov. Konkrétne povinnosti firmy sa posudzujú individuálne; web sám nevedie zákonnú evidenciu ani nepodáva ohlásenia úradom.

### Prehľad stránok

| Stránka | Adresa |
|---|---|
| Domov | `/` |
| O nás | `/o-nas` |
| Prehľad služieb | `/sluzby` |
| Jednotlivé služby | `/sluzby/odborna-dokumentacia`, `/sluzby/evidencia-odpadov`, `/sluzby/ohlasovacie-povinnosti`, `/sluzby/kontrola-a-poradenstvo`, `/sluzby/nebezpecne-odpady`, `/sluzby/riesenia-pre-firmy`, `/sluzby/odborne-poradenstvo`, `/sluzby/legislativny-servis`, `/sluzby/dlhodoba-spolupraca` |
| Blog / poradňa a články | `/blog` a `/blog/adresa-clanku` |
| Kontakt | `/kontakt` |
| Informácie o spracúvaní osobných údajov | `/ochrana-sukromia` |
| Administrácia | `/admin` |

Úvodná stránka ponúka sedem oblastí služieb. V menu a na stránke Služby je deväť samostatných detailov. Prehľad služieb navyše obsahuje osem položiek celoročného servisu a osem jednorazových služieb. Na sekcie odvetví, spolupráce a častých otázok možno prejsť priamo odkazom.

### Vzhľad, navigácia a prístupnosť

- Navigácia Domov, O nás, Služby, Blog / Poradňa a Kontakt, s označením aktuálnej stránky.
- Horné menu zostáva dostupné aj pri posúvaní stránky.
- Rozšírené menu všetkých deviatich služieb, konzultácie a sekcií úvodnej stránky.
- Na počítači otvorenie služieb myšou; dostupné sú aj kliknutie, dotyk a klávesnica.
- Zatvorenie kliknutím mimo menu, presunom klávesnicového výberu mimo navigácie alebo klávesom Escape; šípka nadol otvorí odkazy služieb.
- Mobilné menu a prispôsobenie kariet, formulárov, rozloženia a textov menším obrazovkám. Pevné tlačidlá Zavolať a Poslať dopyt sú na mobile dostupné v dolnej lište.
- Lokálne WebP fotografie, lokálne písmo Manrope, ikony, jemné prechody a efekty pri prejdení myšou.
- Odkaz „Preskočiť na obsah“, viditeľné označenie prvku vybraného klávesnicou, popisky formulárov a hlásenia použiteľné aj s čítačkou obrazovky.
- Rešpektovanie systémového obmedzenia animácií (`prefers-reduced-motion`).
- Logo vedie na úvodnú stránku; podstránky majú odkaz Domov v úvodnom navigačnom riadku.
- Pätička obsahuje odkazy na hlavné stránky, vybrané služby, ochranu súkromia a administráciu. Rok pri označení autorských práv sa mení automaticky.
- Pri neexistujúcej stránke sa zobrazí vysvetlenie a návrat na úvod. Pri chybe načítania možno načítanie zopakovať tlačidlom „Skúsiť znova“.
- Web má vlastnú ikonu zobrazenú na karte prehliadača.

Web je v slovenčine. Prepínanie jazykov, tmavý režim a 3D scény táto verzia neobsahuje. Uvedené úpravy uľahčujú používanie webu; nezávislé posúdenie podľa pravidiel prístupnosti WCAG zatiaľ neprebehlo.

## Blog a poradňa

- Verejne zobrazuje iba publikované články, od najnovšieho publikovania.
- Filtruje podľa kategórie a vyhľadáva v názve a krátkom úvode článku (perexe) bez ohľadu na diakritiku či veľkosť písmen.
- Stránkuje po deviatich článkoch; pri prázdnom výsledku umožní zrušiť filtre.
- Pri zmene kategórie alebo hľadaného výrazu sa výpis vráti na prvú stranu. Kategórie vo filtri zodpovedajú zverejneným článkom.
- Karty článkov zobrazujú obrázok, kategóriu, názov, krátky úvod a odhad času čítania. Detail navyše obsahuje dátum publikovania a celý text.
- Text člení na nadpisy a odseky, pripája súvisiace články, návrat na blog a konzultáciu.
- Úvodná stránka zobrazuje najviac tri najnovšie články.
- Zmena adresy už publikovaného článku vytvorí trvalé presmerovanie starej adresy (HTTP 308).
- Rozpracované a archivované články návštevník neuvidí. Ak otvorí ich adresu, zobrazí sa stránka „nenájdené“; platí to aj pre pôvodnú adresu článku.
- Ak ešte nie je zverejnený žiadny článok, blog zobrazí oznam o pripravovanej poradni.

Blog nemá komentáre, newsletter ani verejné používateľské účty. Vyhľadávanie neprehľadáva celý text článku.

## Čo vie administrátor

### Správa článkov

1. Prihlási sa na `/admin` menom a heslom.
2. Vytvorí článok alebo vyberie existujúci zo zoznamu.
3. Vyplní názov, adresu, krátky úvod, obsah, kategóriu a pripravený obrázok.
4. Voliteľne doplní alternatívny text obrázka, vlastný SEO titulok a popis.
5. Uloží koncept, zverejní článok alebo ho presunie do obnoviteľného archívu.

Editor navrhuje adresu nového článku z názvu bez diakritiky. Na výber sú kategórie **Pre firmy, Nebezpečné odpady, Praktické tipy a Novinky** a štyri obrázky: horský les, rozkvitnutá lúka, horské údolie a zelené kopce. Pri úvode zobrazuje počet znakov. Pred uložením možno skontrolovať obrázok a náhľad textu; po uložení sa zobrazí potvrdenie.

Text sa zadáva bez programovania. Odseky sa oddeľujú prázdnym riadkom; prvý riadok viacriadkového odseku sa na webe zobrazí ako nadpis. Vložené HTML príkazy sa nevykonávajú. Náhľad v editore slúži na kontrolu textu; výsledné členenie možno pozrieť otvorením publikovaného článku z editora v novej karte.

Zoznam článkov uvádza ich stav a dátum poslednej úpravy; pri načítaní je zoradený podľa najnovších úprav. Editor upozorní na neuložené zmeny pri prepnutí článku, odhlásení alebo opustení stránky. Tlačidlo „Zahodiť úpravy“ po potvrdení vráti posledný uložený obsah. Počas ukladania bráni ďalšiemu kliknutiu na uloženie.

Archiváciu treba potvrdiť. Článok sa tým nevymaže: neskôr ho možno vrátiť medzi koncepty alebo znova publikovať. Publikovaný článok možno tiež stiahnuť z webu zmenou na koncept. Ak rovnaký článok medzitým upraví ďalší človek, staršie úpravy sa neuložia cez novšie; editor vyžiada opätovné načítanie. Adresa článku musí byť jedinečná.

Administrátor môže stiahnuť **zálohu všetkých článkov do súboru JSON**, vrátane konceptov a archívu. Záloha nezahŕňa kontaktné správy ani ostatné údaje databázy. Jej obnovenie zabezpečí správca webu; editor nemá tlačidlo na import. Súbor môže obsahovať neverejné texty a patrí do súkromného úložiska.

### Schránka dopytov

- Zobrazuje meno, e-mail, správu a prípadnú spoločnosť, telefón, službu a odvetvie.
- Uvádza čas prijatia a počet nových správ.
- Umožňuje označiť správu ako vybavenú alebo opäť novú.
- E-mailový odkaz otvorí e-mailovú aplikáciu na ručné odpovedanie.

**Rozsah administrácie:** články a prijaté správy možno spravovať bez zásahu programátora. Texty úvodnej stránky, služieb, stránky O nás, firemné kontakty a informácie o súkromí upravuje správca v zdrojových súboroch a následne zverejní novú verziu webu.

Administrácia používa jeden účet. Neobsahuje samostatné používateľské roly, dvojfaktorové overenie, históriu všetkých úprav, nahrávanie vlastných obrázkov ani mazanie kontaktných správ cez rozhranie.

Články sa ukladajú tlačidlom „Uložiť článok“; priebežné automatické ukladanie a plánované publikovanie na určený čas nie sú k dispozícii. Zmena dátumu pôvodného publikovania nemá samostatné ovládanie.

## Kontaktný formulár

V2 pridáva nepovinné IČO (osem číslic, ak bolo pridelené) a rozbaľovací dopyt na individuálnu cenovú ponuku: počet prevádzok, približný počet dokladov za rok a požadované služby. Číselná kalkulácia sa nezobrazuje, pretože cenník nebol dodaný. Údaje sa kontrolujú na serveri a ukladajú do textu dopytu, takže zostávajú dostupné v existujúcej schránke administrátora bez zmeny databázovej schémy.


- V prehliadači povinná kontaktná osoba, platný e-mail, firma, telefón, správa a potvrdenie oboznámenia sa s informáciami o spracúvaní údajov. Server zachováva kompatibilitu so staršími dopytmi, v ktorých firma a telefón mohli byť prázdne.
- Výber služby a odvetvia, nepovinné IČO a podklady k individuálnej cenovej ponuke.
- Kontrola údajov v prehliadači aj na serveri; správa má 15 až 5 000 znakov, ostatné polia vlastné limity.
- Počas odosielania zablokuje tlačidlo; pri chybe zobrazí vysvetlenie.
- Po uložení zobrazí potvrdenie, skrátenú referenciu dopytu a možnosť napísať ďalšiu správu.
- Pri opakovanom pokuse o odoslanie používa rovnakú referenciu, aby sa dopyt neuložil dvakrát.
- Skryté pole pre robotov (honeypot) a serverový limit požiadaviek obmedzujú zneužitie.

Kontaktná stránka zobrazuje ENVI set, s.r.o., adresu Na pažiti 811/19, 911 05 Trenčín, IČO 56 090 552 a DIČ 2122206801. Telefón +421 902 469 908 je klikateľný na volanie, enviset@enviset.sk otvára e-mailovú aplikáciu. Vložená Google mapa a odkaz na Mapy používajú dodanú adresu. Vo výbere odvetví je aj možnosť „Iné odvetvie“; neznáma hodnota v odkaze sa nepredvyplní. Informácie o ochrane súkromia sa z formulára otvárajú v novej karte.

Potvrdenie odoslania znamená, že sa správa uložila do schránky administrátora. E-mailové oznámenie zatiaľ nie je nastavené. Odoslaním nevzniká objednávka platených služieb.

## Sprievodca na webe

Sprievodca ponúka pripravené odpovede na časté otázky o službách, dokumentácii, evidencii, nebezpečných odpadoch, konzultácii, cene a kontakte. K odpovedi pripája odkaz na príslušnú stránku. Návštevník môže napísať vlastnú otázku, vybrať jednu z navrhnutých alebo začať novú konverzáciu. Okno možno zavrieť tlačidlom aj klávesom Escape; klávesnicový výber sa potom vráti na tlačidlo sprievodcu.

- Nepoužíva externý AI model a neposiela konverzáciu externej službe.
- Nemá prístup ku konceptom, administrátorským údajom ani správam zákazníkov.
- Pri neistote odkáže na odborníka; nevymýšľa individuálnu cenu alebo konkrétne zákonné povinnosti.
- Otázka má najviac 500 znakov; rozhranie povoľuje najviac 15 otázok za minútu a priebežne skracuje históriu.
- Konverzácia zostáva v pamäti prehliadača a po obnovení stránky sa vymaže.
- Na stránke administrácie sa nezobrazuje.

Nové správy sa v okne automaticky posunú do zobrazenia. Pri nedostupnosti odpovedí sprievodca ponúkne kontaktný formulár. Počet otázok obmedzuje samotné rozhranie prehliadača. Sprievodca nenahrádza odborné posúdenie ani živého operátora.

## Bezpečnostné ochrany a ošetrenia

Prístup k neverejnému obsahu sa overuje na serveri. Formuláre kontrolujú prijaté údaje a obmedzujú počet požiadaviek. Heslo sa neukladá v čitateľnej podobe. Podrobnosti sú uvedené nižšie; nezávislý penetračný test zatiaľ nebol vykonaný.

| Ochrana | Ako funguje |
|---|---|
| Kontrola prístupu | Koncepty, správy a úpravy sú dostupné iba po platnom prihlásení; server odmietne neprihláseného používateľa aj pri priamom volaní rozhrania (HTTP 401) |
| Ochrana hesla | Heslo sa overuje cez odvodený odtlačok (hash), vytvorený postupom PBKDF2 SHA-256 so soľou a 100 000 iteráciami. Porovnanie rovnako dlhých hodnôt sa nezastaví pri prvom rozdielnom znaku |
| Súkromné prihlasovacie nastavenia | Meno, soľ a odtlačok hesla sú uložené v Cloudflare Secrets mimo verejných zdrojových súborov; bez potrebných hodnôt sa prihlásenie odmietne |
| Prihlasovacia relácia | Náhodný prihlasovací kľúč z 32 kryptograficky náhodných bajtov; databáza ukladá iba jeho SHA-256 odtlačok |
| Prihlasovacia cookie | Skripty stránky ju nemôžu čítať (HttpOnly); má SameSite=Strict a pri HTTPS aj Secure. Prihlásenie platí najviac 8 hodín; odhlásenie ho zruší aj na serveri |
| Login limit | Najviac 8 pokusov za 15 minút na odvodený identifikátor IP; prekročenie vracia 429 |
| Kontaktný limit | Najviac 5 požiadaviek za hodinu na odvodený identifikátor IP, vrátane neplatných a opakovaných odoslaní |
| Ochrana pred požiadavkami z cudzieho webu | Uloženie údajov vyžaduje zhodný pôvod požiadavky (Origin); cudzí alebo chýbajúci pôvod server odmietne. Ide o ochranu proti CSRF |
| Formát a veľkosť | Vyžaduje JSON; telo nad 70 000 bajtov a neplatné JSON odmietne riadenou chybou |
| Kontrola údajov na serveri | Overuje dĺžky textov, e-mail, potvrdenie súkromia, kategórie a stavy; formulár článku a kontakt odmietajú neznáme polia |
| Bezpečné adresy a obrázky | Adresa článku povoľuje malé písmená bez diakritiky, čísla a spojovníky; obrázok možno vybrať iba zo štyroch povolených súborov |
| Ochrana pred vloženými skriptmi | Texty sa zobrazujú ako text, nie ako spustiteľné HTML. Aj údaje pre vyhľadávače ošetrujú znak `<`, aby nemohol ukončiť ich zápis |
| Ochrana databázových príkazov | Hodnoty formulárov sa odovzdávajú oddelene od SQL príkazov cez Drizzle a viazané parametre D1 |
| Ochrana súbežných úprav | Server kontroluje čas poslednej úpravy článku; staršie uloženie odmietne (HTTP 409). Zmenu adresy a jej presmerovanie ukladá spolu |
| Ochrana konceptov | Verejný blog a presmerovania povoľujú iba publikované články; ostatné vracajú 404 |
| Súkromné odpovede bez ukladania do vyrovnávacej pamäte | Administrácia a serverové rozhrania žiadajú prehliadač, aby odpovede neukladal (Cache-Control: no-store), a vyhľadávače, aby ich neindexovali |
| Bezpečnostné hlavičky | Bránia odhadovaniu typu súboru (nosniff), obmedzujú odovzdávanie adresy navštívenej stránky iným webom a zakazujú použitie kamery, mikrofónu a polohy na stránkach pokrytých serverovým pravidlom |
| Riadené chyby | Neočakávaná chyba API nevracia klientovi interný detail; server zapisuje všeobecné hlásenie |
| Upratovanie dočasných údajov | Pri ďalších požiadavkách sa odstraňujú uplynulé limity; pri prihlásení aj relácie po skončení platnosti. Limity uchovávajú odvodený odtlačok IP adresy, nie jej priamy zápis |
| Oddelenie súkromných súborov | Pravidlá Git v .gitignore vylučujú lokálne heslá, databázy, pracovné súbory, relácie, logy a súkromné nastavenia zo štandardného pridávania do repozitára; pred odovzdaním treba skontrolovať obsah commitu |

Pravidlo pre bezpečnostné hlavičky nepokrýva všetky obrázky, fonty a ostatné statické súbory. Limit požiadaviek vychádza zo sieťovej adresy poskytnutej Cloudflare; používatelia v jednej firemnej sieti preto môžu zdieľať rovnaký limit. Zákaz indexácie nenahrádza prihlásenie – neverejné údaje chráni kontrola prístupu na serveri.

**Ďalšie opatrenia na posúdenie:** aplikácia nemá vlastné pravidlá Content Security Policy na obmedzenie zdrojov skriptov, pravidlo brániace vloženiu stránky do rámca iného webu ani vlastnú HSTS hlavičku na vynútenie HTTPS pri ďalších návštevách. CAPTCHA, dvojfaktorové overenie a denník všetkých úprav nie sú zavedené. Zálohovanie celej databázy a lehoty uchovávania či výmazu správ treba dohodnúť pri nastavení prevádzky.

## Ako je web pripravený na SEO

SEO znamená úpravy, ktoré pomáhajú vyhľadávačom pochopiť obsah webu a návštevníkom nájsť relevantné stránky. Web má pripravené potrebné údaje a odkazy; ich sprístupnenie vyhľadávačom čaká na dokončenie firemných a prevádzkových nastavení.

### Obsah a štruktúra

- Samostatné čitateľné adresy služieb a článkov, slovenský jazyk dokumentu (`lang="sk"`).
- Vlastné titulky a popisy verejných stránok, značka ENVI set v titulkoch, nadpisy, odseky a interné odkazy.
- SEO titulok a popis v editore; pri nevyplnení sa použije názov a perex článku.
- Trvalé presmerovania pôvodných adries článkov a skutočné 404 pre nedostupný obsah.
- Dátum publikovania, súvisiace čítanie a prepojenie článkov na konzultáciu.

### Technické SEO

| Prvok | Čo zabezpečuje |
|---|---|
| Hlavná adresa stránky (canonical) | Určuje, ktorú HTTPS adresu má vyhľadávač považovať za hlavnú; aktivuje sa nastavením adresy webu v SITE_URL |
| Mapa stránok (sitemap) | Súbor /sitemap.xml priebežne uvádza hlavné stránky, deväť služieb a publikované články; pri článkoch aj poslednú úpravu |
| Pravidlá pre vyhľadávače (robots.txt) | Po aktivácii povoľujú verejný obsah, odkazujú na mapu stránok a vylučujú admin, serverové rozhrania a ochranu súkromia |
| Náhľady pri zdieľaní | Open Graph obsahuje titulok, popis, typ a slovenský jazyk; s nastavenou adresou aj odkaz a obrázok. Údaje pre Twitter/X obsahujú titulok, popis a požiadavku na veľký náhľad |
| Údaje o webe (WebSite) | Strojovo čitateľný názov, adresa a opis webu pre vyhľadávače |
| Údaje o článku (BlogPosting) | Titulok, opis, obrázok, dátum publikovania a úpravy a adresa článku |
| Hierarchia služby (BreadcrumbList) | Vzťah Domov → Služby → konkrétna služba, ktorý pomáha vyhľadávaču zaradiť stránku |
| Súkromné časti | Vylúčenie administrácie, API a ochrany súkromia z indexácie |

### Výkon a používateľský zážitok

Obrázky vo formáte WebP majú uvedené rozmery a textový opis podľa účelu. Viaceré obrázky mimo úvodu sa načítajú až podľa potreby; úvodný obrázok sa načítava prednostne. Písmo je uložené spolu s webom a počas jeho načítania môže prehliadač zobraziť náhradné písmo. Rozloženie sa prispôsobuje obrazovke a verejný obsah pripravuje server. Filtrovanie blogu a ovládanie formulárov či menu potom prebiehajú v prehliadači.

**Aktuálny stav podľa nastavení v repozitári:** adresa webu v `SITE_URL` zatiaľ nie je vyplnená. Stránky preto žiadajú vyhľadávače, aby ich nezaradili do výsledkov (noindex). Hlavné adresy, mapa stránok a strojovo čitateľné údaje viazané na doménu sa aktivujú až po jej nastavení. Web možno otvoriť priamym odkazom. SEO nezaručuje konkrétnu pozíciu vo výsledkoch Google.

Údaje o webe, článkoch a hierarchii služieb sa zapisujú vo formáte JSON-LD. Všetky tri typy závisia od platného SITE_URL; nastavenie odmieta neplatnú adresu, adresu bez HTTPS a vybrané testovacie domény.

Firemné údaje sú doplnené. Pred povolením vyhľadávačov treba dokončiť informácie o súkromí, potvrdiť finálnu HTTPS adresu a práva k fotografiám. Správca potom nastaví SITE_URL a skontroluje údaje pre vyhľadávače, robots a mapu stránok. Google Search Console ani meranie návštevnosti zatiaľ nie sú zapojené. Zaradenie do Google a merania rýchlosti Lighthouse/Core Web Vitals neboli v rámci tejto kontroly overované. Doplnkové schémy Organization, LocalBusiness a FAQPage web zatiaľ nepoužíva.

## Všetky prepojenia a údaje

| Prepojenie | Úloha a stav |
|---|---|
| GitHub → Cloudflare Workers Builds | Odoslanie zmien do hlavnej vetvy main spúšťa kontroly, testy, zostavenie, potrebné databázové zmeny a zverejnenie webu; prepojenie nastavené 13. 10. 2026 |
| Cloudflare Workers → D1 | Server je pripojený k databáze článkov, presmerovaní, správ, prihlasovacích relácií a dočasných limitov |
| Cloudflare Secrets → administrácia | Súkromné nastavenie prihlasovania; prihlásenie na verejnom webe overené 13. 10. 2026 |
| Formulár → schránka | Ukladanie dopytov a označovanie vybavenia |
| Služba / odvetvie → kontakt | URL parametre predvyplnia známe hodnoty vo formulári |
| Sprievodca → služby / kontakt | Pripravené odpovede odkazujú na verejné stránky |
| Schránka → e-mailová aplikácia | Klikateľná e-mailová adresa pre ručné odpovedanie |
| Kontakt → telefón / e-mail | Umožňuje kliknutím zavolať alebo otvoriť e-mailovú aplikáciu |
| Detail služby → Slov-Lex | Verejné odkazy na zákon o odpadoch a Katalóg odpadov, bez odosielania evidencie |
| Voliteľné e-mailové oznámenie | Zatiaľ nenastavené prepojenie cez HTTPS s prístupovým kľúčom; službe odovzdáva iba oznámenie a ID dopytu. Po 5 sekundách čakanie ukončí; prijatie službou ešte nepotvrdzuje doručenie e-mailu |

**Prepojenia, ktoré web zatiaľ nemá:** platby, rezervácie termínov, systém správy zákazníkov (CRM), účtovníctvo, elektronické podania úradom, newsletter a analytické či reklamné nástroje. Pomocné súbory pôvodného vývojového prostredia nepridávajú tieto služby do zákazníckeho webu; neaktivujú ani prihlásenie cez ChatGPT.

Aplikácia nezapína vlastné analytické ani reklamné cookies. Na kontaktnej stránke sa načítava vložená Google mapa, ktorá vytvára spojenie s poskytovateľom mapy a môže spracúvať technické údaje pripojenia. Admin používa nevyhnutnú prihlasovaciu cookie. Chat sa neposiela na server. Kontaktné údaje sú dostupné prihlásenému administrátorovi. Informácie o ochrane súkromia sú pracovné; technické opatrenia samy osebe nepotvrdzujú úplný súlad s GDPR.

Ak bude e-mailové prepojenie neskôr zapnuté, správa sa najprv uloží do databázy. Prípadný výpadok oznamovacej služby už uložený dopyt neodstráni. Opakované odoslanie s rovnakou referenciou nevytvorí ďalší dopyt ani ďalšie oznámenie; automatické opakovanie neúspešného oznámenia zatiaľ nie je k dispozícii.

## Prevádzka a aktualizácie

Zdrojové súbory sú uložené na GitHube, web beží v Cloudflare Workers a údaje v databáze D1. Pri bežnej aktualizácii sa zachovajú články, správy aj prihlasovacie nastavenia. Import troch pôvodných a piatich nových verejných článkov používa INSERT OR IGNORE a neprepisuje existujúce články, správy ani prihlasovacie údaje. Samotná služba GitHub Pages na spustenie webu s touto administráciou a databázou nestačí.

Správca môže vrátiť staršiu verziu zdrojových súborov. Tento krok však sám neobnoví staršie údaje databázy; tie potrebujú samostatnú zálohu. Pôvodný odovzdaný balík neobsahuje súkromné správy, prihlasovacie relácie, heslá ani pracovnú databázu. Postupy sú v [NASADENIE.md](NASADENIE.md).

Technický základ tvorí React, TypeScript a Vinext, databázovú vrstvu Drizzle a kontrolu údajov Zod. Použitý Vinext je vo verzii beta; správca musí priebežne kontrolovať aktualizácie a kompatibilitu použitých knižníc.

Súčasťou projektu sú automatizované testy údajov formulárov, adries článkov, pôvodu požiadaviek, odpovedí sprievodcu a e-mailového prepojenia. Samostatný test celého procesu kontroluje stránky, prihlásenie, koncepty, formulár, duplicity, zobrazenie textu, presmerovania a odhlásenie. Pracuje iba v oddelenom lokálnom prostredí, pretože vytvára testovacie údaje. Výsledky vykonaných kontrol sa uvádzajú pri jednotlivých aktualizáciách.

## Čo ešte treba dokončiť

1. Referencie a logá skutočných zákazníkov po dodaní a schválení podkladov.
2. Dokončenie právneho základu, príjemcov a doby uchovávania osobných údajov; identifikačné a kontaktné údaje prevádzkovateľa sú doplnené.
3. Ak sú požadované e-maily: poskytovateľ, príjemca, notifikačná služba a test skutočného doručenia.
4. Finálna doména a práva k fotografiám; aktivácia a overenie indexácie cez SITE_URL.
5. Zálohovanie a obnova D1, správa prístupov a uchovávanie či výmaz kontaktných správ.

## Datovaný prehľad zmien

### 18. 10. 2026 – v2, zákaznícke texty a nový postup spolupráce

**Pridané:** kontaktné a identifikačné údaje, Google mapa, tri nové detaily služieb, celoročné a jednorazové služby, deväť FAQ, päť verejných článkov, IČO a podklady na individuálnu ponuku, mobilné tlačidlá Zavolať a Poslať dopyt.

**Vylepšené:** preferovaný úvodný text a značka ENVI set. Postup spolupráce má jednu zvislú os 01–04 s nadpisom vľavo; poradie zostáva rovnaké na počítači aj mobile. Odstránené sú nepotrebné pôvodné exportné manifesty a tri nepoužívané ukážkové obrázky. Ignorovanie súborov chráni lokálne zálohy a prílohy pred náhodným pridaním.

**Celkový stav a overenie:** zdroje vychádzajú z uloženej v2 z 18. 10. 2026. Lokálne boli overené typy, sedem automatizovaných testov, zostavenie a poradie krokov na počítači aj mobile. Existujúca produkčná databáza a konfigurácia prihlasovania zostávajú zachované; verejné články sa pridávajú bez prepisovania existujúcich záznamov. Výsledok nového verejného nasadenia sa kontroluje po nahraní na GitHub.

**Otvorené:** skutočné zákaznícke referencie, dokončenie informácií o súkromí, e-mailové doručovanie a aktivácia indexácie po dokončení prevádzkových nastavení.


### 14. 10. 2026 – kontrola úplnosti a jazyková úprava

**Pridané:** prehľad všetkých stránok; doplnený opis kontaktov, pätičky, chybových stránok, obnovy archivovaných článkov, zahodenia úprav a rozsahu administrácie.

**Vylepšené:** text prešiel redakčnou úpravou. Technické výrazy sú vysvetlené pri ich použití a jednotlivé funkcie sú opísané z pohľadu návštevníka alebo administrátora.

**Celkový stav a kontrola:** dokumentácia bola opätovne porovnaná so stránkami, navigáciou, editorom, formulárom, sprievodcom a serverovými pravidlami v aktuálnej verzii GitHub repozitára. Kontrola rozdielov prešla bez chýb. Zmenil sa iba opis webu; funkčné skúšky verejného nasadenia sa neopakovali.

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

Za aktualizáciu tohto prehľadu zodpovedá správca pri úpravách webu; pracovné pravidlo je uložené v AGENTS.md. Publikovanie článku v administrácii tento súbor automaticky nemení. Do verejnej dokumentácie nepatria heslá, prístupové kľúče ani osobné správy zákazníkov.
