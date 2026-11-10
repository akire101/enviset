import { pageMetadata } from '../seo';
import { ServiceOffers, OneOffServices } from './service-offers';
import { Button } from '../components';

export const metadata=pageMetadata('Služby pre firmy','Tri oblasti dlhodobej spolupráce a jednorazové služby podľa potrieb Vašej firmy: dokumentácia, evidencia, ohlasovanie, odborná podpora a školenie.','/sluzby');
export default function Services(){return <main id="main">
 <div className="services-redesign"><div className="services-annual-section"><section className="services-banner"><div className="container"><h1>Tri kľúčové oblasti v jednej spolupráci</h1><p>Všetky tri oblasti sú súčasťou servisu, ktorý zabezpečujeme pravidelne, počas celej doby spolupráce v rámci jedného ročného paušálu.</p></div></section>
 <ServiceOffers/><div className="container services-price"><Button href="/kontakt?ponuka=1#formular">Získať cenu</Button></div></div>
 <section id="vyhody-spoluprace" className="container services-benefits services-tailored-benefits" aria-labelledby="services-benefits-title"><div className="services-benefits-intro"><h2 id="services-benefits-title">Čo získate</h2><img src="/images/services-question-mark.webp" alt="" width="580" height="922" loading="lazy" decoding="async"/></div><ul><li><h3>Rozsah podľa Vašej činnosti</h3><p>Zohľadňujeme druh podnikania, charakter prevádzky a druhy vznikajúcich odpadov.</p></li><li><h3>Riešenia podľa skutočných potrieb</h3><p>Rozsah zabezpečovaných činností prispôsobujeme konkrétnej situácii Vašej spoločnosti.</p></li><li><h3>Spolupráca bez univerzálnych šablón</h3><p>Každú spoločnosť posudzujeme individuálne a hľadáme vhodný spôsob zabezpečenia jej povinností.</p></li></ul></section>
 <div className="services-one-off-surface"><OneOffServices/></div></div>

 </main>}
