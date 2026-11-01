import { PageHero, CTA } from '../components';
import { pageMetadata } from '../seo';
import { ServiceOffers } from './service-offers';
export const metadata=pageMetadata('Služby pre firmy','Jednorazové služby a paušálna spolupráca v odpadovom hospodárstve.','/sluzby');
export default function Services(){return <main id="main">
 <PageHero label="Naše služby" title="Od jednorazových služieb až po celoročnú starostlivosť." text="Vyberte si riešenie podľa potrieb vašej firmy. Pomôžeme vám s konkrétnymi povinnosťami alebo prevezmeme starostlivosť o celé odpadové hospodárstvo."/>
 <ServiceOffers/>
 <CTA/>
 </main>}
