import { pageMetadata } from '../seo';
import { ServiceOffers } from './service-offers';
import { Button } from '../components';

export const metadata=pageMetadata('Služby pre firmy','Tri kľúčové oblasti v jednej spolupráci: legislatívne zabezpečenie, administratívne prevzatie a osobný dohľad a podpora v rámci jedného ročného paušálu.','/sluzby');
export default function Services(){return <main id="main">
 <div className="services-redesign"><section className="services-banner"><div className="container"><h1>Tri kľúčové oblasti v jednej spolupráci</h1><p>Všetky tri oblasti sú súčasťou servisu, ktorý zabezpečujeme pravidelne, počas celej doby spolupráce v rámci jedného ročného paušálu.</p></div></section>
 <ServiceOffers/><div className="container services-price"><Button href="/kontakt?ponuka=1#formular">Získať cenu</Button></div></div>

 </main>}
