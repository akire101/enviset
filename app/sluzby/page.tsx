import { pageMetadata } from '../seo';
import { ServiceOffers, OneOffServices } from './service-offers';
import { Button } from '../components';

export const metadata=pageMetadata('Služby pre firmy','Tri oblasti dlhodobej spolupráce a jednorazové služby podľa potrieb Vašej firmy: dokumentácia, evidencia, ohlasovanie, odborná podpora a školenie.','/sluzby');
export default function Services(){return <main id="main">
 <div className="services-redesign"><div className="services-annual-section"><section className="services-banner"><div className="container"><h1>Tri kľúčové oblasti v jednej spolupráci</h1><p>Všetky tri oblasti sú súčasťou servisu, ktorý zabezpečujeme pravidelne, počas celej doby spolupráce v rámci jedného ročného paušálu.</p></div></section>
 <ServiceOffers/><section id="ceny-sluzieb" className="container services-pricing" aria-labelledby="services-pricing-title"><h2 id="services-pricing-title">Aké sú ceny našich služieb?</h2><div><p><strong>Naše služby nemusia zaťažiť Váš firemný rozpočet.</strong> Prvý kontakt s nami je nezáväzný a bezplatný. Radi osobne preberieme Vaše požiadavky a možnosti spolupráce bez akýchkoľvek vstupných poplatkov.</p><p>Svoje odborné znalosti, skúsenosti a čas si však vážime, preto cena našich služieb zodpovedá rozsahu a náročnosti vykonanej práce.</p><Button href="/kontakt?ponuka=1#formular">Získať cenu</Button></div></section></div>
 <section id="vyhody-spoluprace" className="container services-benefits services-tailored-benefits" aria-labelledby="services-benefits-title"><div className="services-benefits-intro"><h2 id="services-benefits-title">Čo získate</h2><img src="/images/services-question-mark.webp" alt="" width="580" height="922" loading="lazy" decoding="async"/></div><ul><li><h3>Prehľad vo Vašich povinnostiach</h3><p>Budete vedieť, aké povinnosti sa vzťahujú na Vašu spoločnosť a čo je potrebné zabezpečiť.</p></li><li><h3>Dokumentáciu prispôsobenú Vašej prevádzke</h3><p>Získate odborné podklady zohľadňujúce charakter a konkrétne potreby Vašej firmy.</p></li><li><h3>Odborného partnera počas celého roka</h3><p>Pri otázkach a situáciách súvisiacich s odpadmi sa budete mať na koho obrátiť.</p></li></ul></section>
 <div className="services-one-off-surface"><OneOffServices/></div></div>

 </main>}
