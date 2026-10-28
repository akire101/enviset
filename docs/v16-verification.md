# V16 – kontrola vydania, 28. 10. 2026

- 22 automatických testov prešlo; kontrola TypeScript prešla.
- Lokálna integrácia `tests/support-alerts.mjs` prešla: tón sa opakuje po 30 sekundách s riadeným časom, prečítanie ho nezastaví, potvrdená odpoveď ho zastaví. Skontrolované intervaly a odmietnutie nepovolených hodnôt/prístupu pracovníčky.
- Overené vlastné pracovisko Podpora 2, priemery a nové metriky, administrátorský prehľad, zmena intervalu v UI a mobilné šírky bez vodorovného presahu. Snímky oboch pracovísk a mobilných štatistík vizuálne skontrolované.
- Regresia `tests/support-ui.mjs` prešla: identita Podpora 2, jeden návštevnícky chat, živé doručenie, klikateľný bezpečný odkaz, Enter zapnutý/vypnutý, Shift + Enter, uložená voľba a offline sprievodca.
- O nás pri šírkach 1440/768/390: štyri načítané obrázky, bez presahu. Poradňa: osem článkov, osem rôznych obrázkov; všetky štyri dodané obrázky sú použité, v15 prírodné generované obrázky už v aktuálnych výpisoch nie sú.
- Pripomienka sa riadi celkovou čakajúcou frontou aj pri listovaní do starších rozhovorov. Vizuálny pulz rešpektuje znížený pohyb.
- Zvukové spúšťanie je overené náhradným AudioContext, nie fyzickým reproduktorom. Hlas závisí od hlasov OS; pri chýbajúcom slovenskom/českom hlase sa použije tón. Uspatý prehliadač môže interval zdržať. Fyzický telefón nebol testovaný.
- Dodaný obrázok krajiny má viditeľný vodoznak Adobe Stock; bol ponechaný. Historické v15 podklady zostávajú v repozitári, neskoršie vlastné výbery redaktora sa neprepisujú.
- Produkčné zostavenie prešlo; zostávajú existujúce informačné upozornenia frameworku o middleware a klasifikácii trás.
