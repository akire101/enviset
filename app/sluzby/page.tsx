import { PageHero, ServiceCards, CTA } from '../components';
import { pageMetadata } from '../seo';
export const metadata=pageMetadata('Služby pre firmy','Dokumentácia, evidencia odpadov, ohlásenia, odborné poradenstvo a nebezpečné odpady. Vyberte si služby ENVI SET podľa potrieb prevádzky.','/sluzby');
export default function Services(){return <main id="main"><PageHero label="Naše služby" title="Jeden partner pre celý systém." text="Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením povinností. Začneme tam, kde to potrebujete."/><section className="container section compact"><ServiceCards all/></section><CTA/></main>}
