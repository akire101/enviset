import { PageHero, CTA, Button } from '../components';
import { annualServices, oneOffServices } from '../client-content';
import { pageMetadata } from '../seo';
export const metadata=pageMetadata('Služby pre firmy','Jednorazové služby a paušálna spolupráca v odpadovom hospodárstve.','/sluzby');
export default function Services(){return <main id="main">
 <PageHero label="Naše služby" title="Služby podľa Vašich potrieb" text="Vyriešime konkrétnu požiadavku alebo sa postaráme o Vaše odpadové hospodárstvo počas celého roka."/>
 <div className="container service-columns"><section id="jednorazove-sluzby"><h2>Jednorazové služby</h2><p>Keď potrebujete vyriešiť konkrétnu vec.</p><ul className="offer-list">{oneOffServices.map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p><Button href={`/kontakt?sluzba=${encodeURIComponent(title)}#formular`} secondary>Mám záujem</Button></li>)}</ul></section>
 <section id="celorocny-servis"><h2>Paušálna spolupráca</h2><p>Celoročný odborný servis v dohodnutom rozsahu.</p><ul className="offer-list">{annualServices.map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul><Button href="/kontakt?sluzba=Pau%C5%A1%C3%A1lna%20spolupr%C3%A1ca#formular">Mám záujem</Button></section></div><CTA/>
 </main>}
