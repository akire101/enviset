import { pageMetadata } from '../seo';
import { ServiceOffers, OneOffServices } from './service-offers';
import { Button } from '../components';

export const metadata=pageMetadata('Služby pre firmy','Tri oblasti dlhodobej spolupráce a jednorazové služby podľa potrieb Vašej firmy: dokumentácia, evidencia, ohlasovanie, odborná podpora a školenie.','/sluzby');
export default function Services(){return <main id="main">
 <div className="services-redesign"><section className="services-banner"><div className="container"><h1>Tri kľúčové oblasti v jednej spolupráci</h1><p>Všetky tri oblasti sú súčasťou servisu, ktorý zabezpečujeme pravidelne, počas celej doby spolupráce v rámci jedného ročného paušálu.</p></div></section>
 <ServiceOffers/><div className="container services-price"><Button href="/kontakt?ponuka=1#formular">Získať cenu</Button></div>
 <section id="vyhody-spoluprace" className="container services-benefits" aria-labelledby="services-benefits-title"><h2 id="services-benefits-title">Čo získate?</h2><ul><li><strong>Minimum</strong> administratívnej záťaže</li><li><strong>Istotu</strong> pri plnení zákonných povinností</li><li><strong>Minimalizáciu rizika</strong> pokút pri kontrolách od SIŽP</li></ul></section>
 <div className="services-one-off-surface"><OneOffServices/></div></div>

 </main>}
