import { pageMetadata } from '../seo';
import { ServiceOffers } from './service-offers';

export const metadata=pageMetadata('Služby pre firmy','Tri kľúčové oblasti v jednej dlhodobej spolupráci: legislatívne zabezpečenie, administratívne prevzatie a osobný dohľad a podpora.','/sluzby');
export default function Services(){return <main id="main">
 <div className="services-redesign"><section className="services-banner"><div className="container"><h1>Tri kľúčové oblasti v jednej dlhodobej spolupráci</h1></div></section>
 <ServiceOffers/></div>

 </main>}
