# ENVI set – funkcie webu, bezpečnosť a SEO

**Posledná aktualizácia: 28. 10. 2026. Verzia v18.** Zoznámte sa s možnosťami webu ENVI set, správou jeho obsahu a ochranou údajov. Pri funkciách, ktoré ešte vyžadujú nastavenie, uvádzame, čo treba dokončiť pred ich používaním.

- [Otvoriť web ENVI set](https://envi-set-public.akire101.workers.dev)
- [Administrácia](https://envi-set-public.akire101.workers.dev/admin) – vyžaduje prihlásenie.
- [GitHub repozitár](https://github.com/akire101/enviset)
- [Technický návod na aktualizáciu, nasadenie a obnovu](NASADENIE.md)
- Aktuálne vydanie: **v18 – 28. 10. 2026**. História zdrojov je uložená v Git-e; identifikácia verzie je dostupná v `/version.json`.

## Celkový prehľad

Slovenský firemný web ENVI set predstavuje poradenstvo a manažment odpadového hospodárstva, vysvetľuje spoluprácu, publikuje praktické články a prijíma dopyty na bezplatnú úvodnú konzultáciu. Administrátor spravuje články a správy cez prehliadač.

| Oblasť | Možnosti | Stav |
|---|---|---|
| Firemná prezentácia | Domov, O nás, služby, odvetvia, spolupráca, časté otázky, kontakt | Súčasť webu |
| Služby | Deväť detailov služieb, osem položiek celoročného servisu a osem jednorazových služieb | Súčasť webu |
| Blog / poradňa | Kategórie, vyhľadávanie, stránkovanie, detail a súvisiace články | Súčasť webu; import obsahuje tri pôvodné a päť nových článkov; existujúce úpravy sa neprepisujú |
| Administrácia | Editor, koncepty, publikovanie, archív a stiahnutie zálohy článkov | Prihlásenie a úpravy konceptu na verejnom webe overené 13. 10. 2026 |
| Štatistiky | Denné, 7-dňové, 30-dňové a 365-dňové prehľady, čas v sekciách, kliknutia a mapy pohybu myši | Vlastné meranie po súhlase; dostupné iba administrátorovi |
| Dopyty | Formulár a súkromná schránka administrátora | Ukladajú sa do databázy |
| E-mailové oznámenia | Pripravené prepojenie s e-mailovou službou | Zatiaľ nenastavené; web neposiela e-maily |
| Sprievodca | Pomocník pre časté otázky s odkazmi na služby | Odpovedá priamo v prehliadači, bez externého AI modelu |
| Mobilné zobrazenie | Rozloženie a navigácia prispôsobené mobilu | Súčasť webu |
| SEO | Údaje pre vyhľadávače, mapa stránok a náhľady pri zdieľaní | Pripravené; zaradenie do vyhľadávačov zatiaľ vypnuté |
| Aktualizácie | Automatické nasadenie zmien z GitHubu cez Cloudflare | Postup je opísaný v návode na nasadenie |

## Štatistiky v administrácii

V menu administrácie zvoľte **Štatistiky**. Obdobia: dnes (hodiny), posledných 7 alebo 30 dní (dni), posledných 365 dní alebo Všetko (mesiace), v časovom pásme Bratislava. Možno filtrovať stránku a mobil/počítač. Prehľad rozlišuje unikátne identifikátory prehliadačov, návštevy (relácie karty), zobrazenia, aktívny čas, kliknutia na prvky a dosah rolovania. Nulové dni sa zobrazujú tiež. Nová návšteva vzniká po 30 minútach neaktivity pri ďalšom načítaní stránky.

Tabuľky ukazujú najnavštevovanejšie stránky, čas v sekciách a najviac/najmenej klikané viditeľné odkazy či tlačidlá, vrátane nuly. Čas sa odhaduje po 5 sekundách pri viditeľnej aktívnej karte a aktivite v poslednej minúte. Hlásenia odchádzajú približne každých 15 sekúnd a pri odchode zo stránky.

Teplotné mapy kliknutí a vzoriek pohybu myši sú **schematické**, podľa relatívnej šírky a výšky dokumentu; nie sú snímkou stránky ani sledovaním očí. Pre mapu treba vybrať jednu stránku a zariadenie. Myš sa vzorkuje najviac približne raz za 750 ms, najviac 400 buniek na zobrazenie; dotykový mobil neposkytuje pohyb myši. Detail správania používa najviac posledných 1 000 zobrazení vo výbere, celkové počty celé obdobie.

Údaje vznikajú až od zavedenia funkcie a iba po súhlase, preto nepredstavujú celkový počet všetkých návštevníkov. Reklamné blokovanie, odmietnutie, DNT/GPC a prihlásení administrátori sa do merania nezapočítajú. Nezbierame obsah polí, sprievodcu, snímky obrazovky ani presné IP adresy do analytických záznamov. Dáta sú prístupné len po overení administrátorskej relácie. Merania staršie než 400 dní sa čistia pri ďalšom zápise alebo čítaní štatistík. Prevádzkovateľ má stále dokončiť celkové informačné oznámenie o súkromí.

## Čo vie verejná stránka

### Firma, služby a spolupráca

- Úvodná stránka vysvetľuje zameranie firmy, predstavuje služby a vedie ku konzultácii.
- **O nás** opisuje vznik spoločnosti, skúsenosti a prístup k zákazníkom.
- Štyri kroky spolupráce na súvislej zvislej časovej osi: osobné stretnutie, vstupná odborná analýza, dodanie a vysvetlenie dokumentácie, celoročný odborný servis.
- Hodnoty: odbornosť, osobný prístup, zrozumiteľnosť, pripravenosť na kontrolu a dlhodobé partnerstvo.
- Osem odvetví: výroba, autoservisy, stavebníctvo, obchod, kancelárie, gastro, sklady a logistika, remeselné prevádzky.
- Obrázky aj názvy odvetví na úvode vedú na prehľad jednorazových a paušálnych služieb. Odkazy z detailov služieb predvyplnia príslušnú tému kontaktného formulára.
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
- Kompaktné menu všetkých deviatich služieb pod sebou, iba s názvami.
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

- Zobrazuje názov firmy (pri starších dopytoch meno), e-mail, správu a prípadnú spoločnosť, telefón, službu a odvetvie.
- Uvádza čas prijatia a počet nových správ.
- Umožňuje označiť správu ako vybavenú alebo opäť novú.
- E-mailový odkaz otvorí e-mailovú aplikáciu na ručné odpovedanie.

**Rozsah administrácie:** články a prijaté správy možno spravovať bez zásahu programátora. Texty úvodnej stránky, služieb, stránky O nás, firemné kontakty a informácie o súkromí upravuje správca v zdrojových súboroch a následne zverejní novú verziu webu.

Administrácia používa jeden účet. Neobsahuje samostatné používateľské roly, dvojfaktorové overenie, históriu všetkých úprav, nahrávanie vlastných obrázkov ani mazanie kontaktných správ cez rozhranie.

Články sa ukladajú tlačidlom „Uložiť článok“; priebežné automatické ukladanie a plánované publikovanie na určený čas nie sú k dispozícii. Zmena dátumu pôvodného publikovania nemá samostatné ovládanie.

## Kontaktný formulár

Formulár má štyri viditeľné polia: názov firmy, e-mail, telefón a text správy. Služba z odkazu sa doplní priamo do správy. Tlačidlá na dopyt smerujú na formulár cez kotvu. Informácie o súkromí sú uvedené pri odoslaní.

- Kontrola údajov v prehliadači aj na serveri; správa má 15 až 1 000 znakov.
- Skryté pole pre robotov a serverový limit požiadaviek zostávajú zapnuté.
- Počas odosielania sa tlačidlo zablokuje; chyba sa zobrazí pri formulári.
- Úspešné uloženie zobrazí referenciu dopytu. Opakovanie rovnakej požiadavky nevytvorí duplicitu.
- Staršie uložené firemné a cenové údaje zostávajú dostupné administrátorovi.

Kontakt uvádza firemné údaje a pracovné hodiny od pondelka do piatka 08:00–17:00; sobota a nedeľa sú zatvorené. Stav dostupnosti a farebné body sa pri telefóne nezobrazujú. Orientačný čas odpovede sa nezobrazuje. Oblasť pôsobenia sa nezobrazuje. Google mapa bola odstránená.

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

Firemné údaje sú doplnené. Pred povolením vyhľadávačov treba dokončiť informácie o súkromí, potvrdiť finálnu HTTPS adresu a práva k fotografiám. Správca potom nastaví SITE_URL a skontroluje údaje pre vyhľadávače, robots a mapu stránok. Google Search Console zatiaľ nie je zapojená. Vlastné meranie návštevnosti je dostupné v záložke Štatistiky po prihlásení. Zaradenie do Google a merania rýchlosti Lighthouse/Core Web Vitals neboli v rámci tejto kontroly overované. Doplnkové schémy Organization, LocalBusiness a FAQPage web zatiaľ nepoužíva.

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

**Prepojenia, ktoré web zatiaľ nemá:** platby, rezervácie termínov, systém správy zákazníkov (CRM), účtovníctvo, elektronické podania úradom, newsletter a externé reklamné nástroje. Vlastné meranie návštevnosti je súčasťou administrácie. Pomocné súbory pôvodného vývojového prostredia nepridávajú tieto služby do zákazníckeho webu; neaktivujú ani prihlásenie cez ChatGPT.

Analytika je predvolene vypnutá; návštevník ju môže povoliť, odmietnuť alebo vypnúť v pätičke. Voľba sa ukladá lokálne na 180 dní, náhodný identifikátor prehliadača najviac na 400 dní. Reklamné cookies ani Google mapa sa nepoužívajú. Admin používa nevyhnutnú prihlasovaciu cookie. Chat sa neposiela na server. Kontaktné údaje sú dostupné prihlásenému administrátorovi. Informácie o ochrane súkromia sú pracovné; technické opatrenia samy osebe nepotvrdzujú úplný súlad s GDPR.

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

### 28. 10. 2026 – v18, názov firmy vo formulári

Pole „Meno a priezvisko“ je nahradené označením „Názov firmy“ vrátane vzorového textu, automatického dopĺňania a chybovej správy. Údaj sa ukladá existujúcou cestou; staršie dopyty zostávajú zachované. Opis údajov v ochrane súkromia zodpovedá formuláru.

### 28. 10. 2026 – v17, telefónne tlačidlá

Na počítači je v hlavičke text „Zavolaj mi“, na mobile horná kontaktná lišta zobrazuje „+421 902 469 908“. Oba odkazy vytáčajú rovnaké číslo. Uložený zákaznícky bod návratu v3 zostáva nezmenený.

### 28. 10. 2026 – v16, prehľad podpory a upozornenia do odpovede

**Upozornenia:** štandardne každých 30 sekúnd, kým niektorá pracovníčka neodpovie alebo konverzáciu neukončí. Prečítanie správy ich nezastaví. Administrátor mení spoločný interval v Štatistiky podpory → Upozornenia pracovníčkam (15, 30, 60 alebo 120 sekúnd). Panel pulzuje a titulok karty upozorňuje na čakajúce odpovede. Zvuk musí pracovníčka zapnúť tlačidlom; dostupný slovenský/český hlas prečíta oznámenie, inak zaznie tón. Uspatý prehliadač či zariadenie môže upozornenie zdržať.

**Prehľady:** administrátor začína na karte Prehľad s čakajúcimi rozhovormi, novými kontaktnými dopytmi, článkami a dnešnou aktivitou tímu. Pracovníčky vidia vlastný dnešný online čas, odpovede a rozhovory; zoznam má filtre Čakajúce, Neprečítané, Otvorené a Všetky. Shift + Enter vždy vloží nový riadok; vysvetlenie je pri poli na odpoveď.

**Štatistiky:** priemerná prvá odpoveď znamená priemer od prvej správy návštevníka po prvú odpoveď podpory, bez nezodpovedaných rozhovorov. Dopĺňa ju medián, 90. percentil, podiel do jednej minúty, aktuálna fronta a najdlhšie čakanie. Pri pracovníčke sa prvé odpovede počítajú len tam, kde odpovedala prvá. Počíta sa skutočný čas aj mimo pracovných hodín; rýchlosť podľa rozhovorov začatých v období, počet odoslaných správ podľa odoslania. Všetko označuje všetky zachované údaje (konverzácie 90 dní, online čas 400 dní).

**Obrázky:** dodané odpad-obr1 až odpad-obr4 nahrádzajú štyri generované prírodné obrázky v poradni a zodpovedajúce fotografie O nás. Nebezpečný odpad patrí k nebezpečným odpadom, triedenie k praxi, kalendár k príprave konzultácie a krajina k úvodu do témy. Každý obrázok sa v danom výpise/stránke zobrazuje najviac raz. Viditeľný vodoznak Adobe Stock na dodanej krajine zostáva zachovaný. Historické generované súbory ostávajú kvôli starším odkazom; aktuálne rozloženie ich nepoužíva.

**Overenie:** výsledky vydania sú zaznamenané v [kontrole v16](docs/v16-verification.md). Fyzický telefón, reproduktor a konkrétny hlas operačného systému neboli testované.

### 28. 10. 2026 – v15, spoločný chat a prírodná poradňa

**Pridané:** jedno okno návštevníckeho chatu. Pri dostupnej podpore správa smeruje pracovníčke; mimo dostupnosti odpovedá automatický sprievodca a ponúka e-mailový kontakt. Odpovede pracovníčky obsahujú klikateľné webové odkazy. Na pracovisku podpory možno zapnúť alebo vypnúť odosielanie Enterom; voľba sa pamätá pre každý účet v danom prehliadači. Vysvetlenie Shift + Enter na nový riadok je vždy viditeľné. Pri vypnutej voľbe sa správa odosiela tlačidlom.

**Vylepšené:** opravené načítanie identity Podpora 1/Podpora 2; odstránená požadovaná veta nad pracoviskom. Informácia o kontrole kvality zostáva v ochrane súkromia. Správy majú čitateľnejší kontrast. Väčší odkaz Mám inú otázku a tlačidlo Odoslať v kontakte. O nás strieda plnohodnotné textové bloky s prírodnými zábermi bez prázdneho ľavého stĺpca. Prihlasovací formulár je pred pripravenosťou aplikácie zablokovaný a neposiela heslo v adrese.

**Obrázky:** štyri nové generované prírodné ilustrácie dopĺňajú články, ktorým sa skryl opakovaný obrázok. Všetkých osem publikovaných článkov má vlastný záber. Obrázky sú dostupné aj v editore; jednorazová aktualizácia zachová texty článkov a neskoršie redakčné úpravy. Zadania a súbory: [Prírodné ilustrácie](docs/v15-image-prompts.md).

**Overenie:** 20 automatických testov a typová kontrola. Lokálny test v prehliadači overil identitu Podpora 2, odosielanie Enterom aj jeho vypnutie, Shift + Enter, zachovanie voľby, doručenie klikateľného odkazu, offline odpoveď sprievodcu a rozloženie O nás pri šírkach 1440, 768 a 390 px bez vodorovného pretekania. Všetkých osem článkov má načítateľný obrázok.

**Stav a limity:** Podpora 2 bola používateľom aktivovaná a jej pripravenosť overená v produkcii. Automatické odpovede sa vykonávajú v prehliadači a nie sú odosielané podpore; online pracovníčka vidí správy odoslané počas živej podpory. Štyri nové obrázky sú generované ilustrácie. Fyzické mobilné zariadenia neboli skúšané.

### 28. 10. 2026 – v14, tím podpory a mobilné zobrazenie

**Pridané:** účty Podpora 1 (podpora) a Podpora 2 (podpora2), mená pri odpovediach, samostatné hodnotenia a porovnanie odpovedí, konverzácií, prvej reakcie a online času. Obdobie Všetko je aj v návštevnosti. Administrátor môže chat mimo pracovnej doby dočasne povoliť na 30, 60 alebo 120 minút; stále musí byť dostupná prihlásená pracovníčka. Pri dostupnej podpore je pri Poradíme vám viditeľný stav Online.

**Vylepšené:** hlavný obrázok je úplne statický. Mobilné cookies sú v malej spodnej lište s prijatím, odmietnutím a odkazom na podmienky. Kroky spolupráce majú rovnaké odstupy. Upravená pätička a slovná hračka ENVI pre prírodu. SET riešení pre firmy. Favicon tvorí zelený znak loga bez textu na priehľadnom pozadí. Krátka poznámka o dohľade je odstránená z chatu; informácia ostáva v ochrane súkromia a na pracovisku podpory.

**Celkový stav:** existujúce heslo podpora sa nemení; Podpora 2 sa aktivuje nastavením hesla v administrácii. Online čas sa zbiera až od v14 z potvrdených spojení pri zapnutom prijímaní chatu a povolenej prevádzke. Súbežné karty rovnakého účtu sa nezdvojujú; výpadky nad 75 sekúnd sa nezapočítajú. Konverzácie zostávajú 90 dní, denné online časy 400 dní; Všetko znamená všetky zachované údaje.

**Overenie:** 19 automatických testov a lokálna integrácia dvoch pracovníčok, súbežných kariet, oddelených hodnotení, oprávnení a časového otvorenia chatu. Mobilná lišta pri 320 px má približne 137 px a obidve voľby fungujú. Rovnomerné kroky a statický obrázok overené v prehliadači. Fyzické telefóny neboli skúšané; upozornenia potrebujú otvorené pracovisko podpory.

### 28. 10. 2026 – v13, živá podpora a meranie

**Pridané:** samostatná rola podpora bez článkov, kontaktných správ a analytiky. Viac súbežných konverzácií, rozpracované odpovede, neprečítané správy, zvuk a systémové notifikácie po povolení. Správa čakajúca viac ako päť minút sa zvýrazní a upozornenie sa opakuje raz za minútu. Panel musí zostať otvorený; uspatie zariadenia alebo obmedzenia prehliadača môžu upozornenia zdržať.

**Admin:** karty Dohľad podpory a Štatistiky podpory, čítanie bez zmeny neprečítaných správ, hodnotenie 1–5 a interné poznámky, počty rozhovorov, časy prvej odpovede/prečítania a odpovede operátora. Podpora aj návštevník sú informovaní o kontrole kvality. V karte štatistík je bezpečné vytvorenie/obnovenie účtu podpora; heslo sa ukladá iba ako odvodený hash so soľou.

**Dostupnosť a súkromie:** živý chat vyžaduje aktívny panel prihlásenej podpory a Po–Pi 08:00–17:00 v Bratislave. Dostupnosť sa overuje krátkym pravidelným spojením; po výpadku zaniká do 75 sekúnd. Mimo dostupnosti sa zobrazí e-mail. Návštevník má náhodný prístupový token iba k svojmu rozhovoru. Správy sa uchovávajú 90 dní od poslednej aktivity a staršie sa odstraňujú pri používaní funkcie. Nejde o automatické personálne hodnotenie.

**Vylepšené:** silnejší, lokálny vietor sleduje označenú rastlinku aj pri mobilnom orezaní fotografie. Analytika sa v administrácii obnovuje každých 30 sekúnd. Súhlas sa pamätá pri navigácii, ale obnovenie stránky (bežné aj Ctrl+F5) ho vyžiada znova; prehliadač tieto druhy obnovenia spoľahlivo nerozlišuje. Prihlásený admin/podpora a odmietnuté meranie sa nezapočítavajú.

**Overenie:** 16 automatických testov; lokálna integrácia rolí, CSRF, dvoch návštevníkov, oddelenia rozhovorov, opakovaných požiadaviek, odpovedí, prečítania, hodnotenia, ukončenia a dostupnosti. Obojsmerný rozhovor v oddelených prehliadačoch, mobil bez vodorovného pretekania, zvuk a opakovanie po piatich minútach s riadeným časom. Prijatie analytiky aj zaznamenané návštevy overené v ostrej administrácii. Účet podpora bol aktivovaný používateľom; produkčné prihlásenie a zamietnutie prístupu k článkom, kontaktným správam a administrátorským štatistikám boli overené. Overovacia relácia bola odhlásená.

**Otvorené:** Fyzický telefón, uspatie zariadenia a právny audit neboli overené. Retencia nebeží samostatným plánovačom. Zmluvné a pracovnoprávne podmienky monitorovania má potvrdiť prevádzkovateľ.

### 27. 10. 2026 – v12, rastlinka a informácie o meraní

**Vylepšené:** vietor je sústredený na zeleň vpravo dole. Na želanie zákazníka bolo odstránené tlačidlo pauzy; nastavenie obmedzeného pohybu a zastavenie mimo obrazovky zostávajú.

**Pridané:** schválené texty lišty a samostatná stránka Cookies vrátane pohybu myši, úložiska, lehôt a odvolania súhlasu cez Nastavenia súkromia. Meranie naďalej vyžaduje súhlas.

**Overenie:** kontrola typov a produkčné zostavenie prešli. Prehliadač overil mobil a počítač bez tlačidla pauzy, vypnutie efektu pri obmedzenom pohybe, nové texty a nulové analytické požiadavky pred súhlasom aj po odmietnutí.

**Obmedzenia:** nejde o právny audit; zmluvné nastavenie Cloudflare a úplné oznámenie pre kontaktný formulár musí overiť prevádzkovateľ. Fyzický telefón nebol testovaný.

### 27. 10. 2026 – v11, odkazy odvetví na služby

**Upravené:** všetkých osem obrázkov a názvov v Pre koho sú naše služby určené vedie na /sluzby s jednorazovými aj paušálnymi službami.

**Overenie:** všetky odkazy kontrolované, obrázok aj názov sú v jednom odkaze. Ostatné funkcie a obmedzenia sa nemenia.

### 27. 10. 2026 – v10, animácie služieb a mobilné detaily

**Opravené:** plynulé otvorenie aj zatvorenie FAQ je spoločné pre úvod a všetkých deväť detailov služieb vrátane Odbornej dokumentácie. Mobilná horná lišta má poradie Bezplatná konzultácia | Zavolaj, presne polovicu šírky pre každé tlačidlo. Mám inú otázku je na mobile pod odpoveďami; na počítači ostáva pri nadpise.

**Vylepšené:** prechod myšou cez ktorýkoľvek krok spolupráce zvýrazní číslo, nadpis aj text. Jemný vietor deformuje len spodnú zeleň hlavnej fotografie, bez zdvojenia obrázka. Dá sa pozastaviť tlačidlom, automaticky stojí mimo obrazovky alebo na neaktívnej karte a pri obmedzenom pohybe sa nezobrazuje. Opravená medzera v mobilnom hlavnom nadpise.

**Overenie:** všetkých deväť služieb má tri animované FAQ; priebežná výška overená pri otvorení aj zatvorení. Šírky tlačidiel 194,5/194,5 px pri 390 px a 159,5/159,5 pri 320 px; bez vodorovného presahu. Overené poradie FAQ odkazu, zvýraznenie kroku vrátane textu, pozastavenie/reduced-motion a pixelové porovnanie vetra: horná časť stabilná, spodná sa mení. Fyzický telefón nebol testovaný. Ostatné funkcie a otvorené obmedzenia zostávajú bez zmeny.

### 27. 10. 2026 – v9, súkromná analytika návštevnosti

**Pridané:** záložka Štatistiky, štyri obdobia, počty návštevníkov/návštev/zobrazení, graf, prehľad stránok, čas v sekciách, najviac aj najmenej klikané prvky a relatívne mapy kliknutí a myši. Dobrovoľný súhlas, odmietnutie a vypnutie v pätičke. Aktualizované informácie o súkromí.

**Spresnenie merania:** viditeľnosť zahŕňa aj pevnú hlavičku a mobilnú kontaktnú lištu; mapa pohybu reaguje iba na skutočný ukazovateľ myši, nie na dotyky.

**Ochrana a nasadenie:** API štatistík vyžaduje prihlásenie, vstupy sú obmedzené a validované; opakované hlásenia nenavyšujú počty. Nová tabuľka sa vytvorí idempotentne pri prvom oprávnenom čítaní alebo platnom meraní. Existujúce články, správy a účty sa nemenia.

**Overenie:** 13 testov, kontrola typov, zostavenie, lokálne integračné testy súhlasu, pôvodu požiadaviek, ochrany API, štyroch období, duplicitných a starších hlásení a vytvorenia tabuľky. Prehliadač: pred súhlasom/po odmietnutí/po vypnutí bez merania, obsah polí sa neposiela, aktívny čas/kliknutia/myš fungujú; mobil 390 px bez presahu a desktop 1440 px. Prihlásený admin sa nemeria ani na verejnej stránke.

**Limity:** testovacie údaje sú iba lokálne. Reálnu návštevnosť nemožno spätne doplniť; fyzický telefón nebol testovaný. E-mailové oznámenia, dokončenie celkového oznámenia o súkromí a indexovanie zostávajú otvorené.

### 27. 10. 2026 – v8, plynulé rozbalenie FAQ

**Vylepšené:** odpovede v Čo vás zaujíma sa plynulo rozbalia aj zbalia, ikona plus sa otáča. Zachované rolovacie efekty. Ovládanie podporuje klávesnicu, stav pre čítačky obrazovky a nastavenie obmedzeného pohybu.

**Overenie:** meranie priebežnej výšky pri otvorení aj zatvorení, rýchle opakované kliknutia, klávesnica a vypnutie animácií overené v mobilnom prehliadači. Kontrola typov a 10 testov prešli. Fyzický telefón nebol testovaný. Ostatné funkcie a otvorené obmedzenia zostávajú bez zmeny.

### 27. 10. 2026 – v7, rolovacie efekty FAQ

**Vylepšené:** nadpis a jednotlivé otázky sekcie Čo vás zaujíma používajú rovnaké jemné objavenie pri rolovaní ako ostatný obsah. Nastavenie obmedzeného pohybu efekty vypína; nepodporované prehliadače zobrazujú obsah bez animácie.

**Overenie:** vizuálna kontrola FAQ, rozbalenie odpovede a režim obmedzeného pohybu v mobilnom prehliadači. Fyzický telefón nebol testovaný. Ostatné funkcie a otvorené obmedzenia zostávajú bez zmeny.

### 27. 10. 2026 – v6, kompaktné mobilné menu a plynulé rolovanie

**Opravené:** zbalené Služby v mobilnom menu už nezaberajú prázdnu plochu. Rozbalenie aj opätovné zbalenie zachováva kompaktné menu.

**Vylepšené:** šípky medzi sekciami posúvajú stránku plynulo. Karty odvetví a pomoci, nadpisy sekcií a kontakt sa pri vstupe do zobrazenia jemne objavujú. Efekty rešpektujú nastavenie obmedzeného pohybu; nepodporované prehliadače zobrazia obsah bez efektu.

**Overenie:** mobilné menu otvorené/zbalené, plynulý prechod so správnym cieľom, vypnutie efektov pri obmedzenom pohybe a desktopové menu overené v prehliadači. Kontrola typov a 10 testov prešli. Fyzický telefón nebol testovaný. Existujúce obmedzenia e-mailov, ochrany súkromia a indexovania sa nemenia.

### 27. 10. 2026 – v5, mobilná navigácia a priehľadné logo

**Upravené:** mobilná kontaktná lišta je natrvalo hore: Zavolaj a Bezplatná konzultácia. Konzultácia vedie priamo na formulár. Logo má priehľadné pozadie. Z kontaktu bol odstránený orientačný čas odpovede.

**Vylepšené:** pevné šípky vľavo dole preskakujú na začiatky celých sekcií úvodu oboma smermi. Sprievodca zostáva vpravo dole; hlavička neprekrýva cieľové nadpisy. Priebežné lokálne odkazy Vyššie/Nižšie boli odstránené.

**Overenie:** kontrola typov a 10 testov prešli; v mobilnom prehliadači overené všetky prechody medzi sekciami, návrat nahor, horná lišta a odkaz na formulár. Logo vizuálne skontrolované na pozadí stránky. Fyzický telefón nebol testovaný.

**Celkový stav a obmedzenia:** existujúce funkcie ostávajú zachované. E-mailové oznámenia, finálne údaje ochrany súkromia a indexovanie vyhľadávačmi zostávajú otvorené podľa prehľadu vyššie.

### 27. 10. 2026 – v4, doladenie menu a fotografií

**Upravené:** ponuka je ukotvená priamo pod tlačidlom Služby. Odstránený slovný aj farebný indikátor telefónu; pracovné hodiny a odpoveď do 2 hodín zostávajú v kontakte. Riešenia majú jednotné dva stĺpce a zarovnané ikony, názvy a šípky; na mobile jeden stĺpec. Väčšie rozostupy pri formulári a odoslaní.

**Fotografie:** vymenená stavba, kancelária, gastro, remeslo a kontrola prevádzky za reálne fotografie z Pexels. Z výrobnej fotografie bola na žiadosť majiteľa odstránená postava pomocou obrazovej retuše. Sekcia systému má vlastnú fotografiu kontajnerov. Logo je obrazovo iba v hlavičke; päta používa textový názov. Opakovaný obrázok článku sa v jednom zozname zobrazí iba raz, všetky články ostávajú prístupné.

**Overenie:** lokálne šírky 1440, 768 a 390 px bez vodorovného presahu, úvod aj blog bez opakovaných obrázkov; menu pod tlačidlom; odstup nad odoslaním 36 px na mobile. Kontrola typov, testy a zostavenie sú súčasťou vydania. Formulár ani databázová schéma sa nemenili. Historické informácie nižšie opisujú staršie verzie.


### 27. 10. 2026 – v3, fotografie a jednoduchší kontakt

**Pridané:** dodané firemné logo, hlavný obrázok a obrázok dokumentácie; deväť skutočných ilustračných fotografií z Pexels so zdrojmi v PHOTO-CREDITS.md. Pracovné hodiny, farebný aj slovný stav linky a orientačná odpoveď do 2 hodín.

**Vylepšené:** poradie úvodu je hlavný obrázok → pre koho sú služby → s čím pomôžeme. Texty sú kratšie a väčšie, rozostupy kompaktnejšie. Služby majú dva stĺpce: osem individuálnych tlačidiel pri jednorazových položkách a jedno pod paušálom. FAQ obsahuje štyri dodané otázky a cenu; odstránené otázky sa nezobrazujú. Menu a stručný prehľad služieb majú iba názvy. Mobil má šípky Vyššie/Nižšie a sprievodcu nad kontaktnou lištou.

**Overenie:** kontrola typov, deväť testov a produkčné zostavenie úspešné. Prehliadač overil šírky 1440, 768 a 390 px bez vodorovného presahu, načítanie všetkých fotografií, rozbalenie FAQ, 8 + 1 tlačidiel služieb, štyri polia a priamy odkaz na formulár, odstránenie mapy a neprekrývanie sprievodcu. Lokálny dopyt bol uložený (HTTP 201) a zobrazil potvrdenie. Produkčný formulár sa pri tejto kontrole neodosielal.

**Otvorené:** e-mailové oznámenia zostávajú nenastavené, súkromie a indexácia vyžadujú dokončenie ako v predošlej verzii. Fyzický telefón a sviatočné výnimky neboli overené. FAQ zodpovedá dodanému zneniu; neprebehol právny audit.


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


