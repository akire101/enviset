import { ArrowUpRight, Check, Plus, Minus } from 'lucide-react';
import { annualServices, oneOffServices } from '../client-content';

export function ServiceOffers() {
 return <div id="popis-sluzieb" className="container service-offers" aria-label="Možnosti spolupráce">
  <Offer annual label="Dlhodobá spolupráca" title="Ročný paušálny servis" intro="Komplexná starostlivosť o odpadové hospodárstvo vašej firmy počas celého roka." listTitle="Čo získate?" items={annualServices} href={`/kontakt?sluzba=${encodeURIComponent('Ročný servis')}&ponuka=1#zaujem`} action="Získať cenovú ponuku"/>
  <Offer label="Bez dlhodobej spolupráce" title="Chýba Vám len konkrétna vec?" intro="Vyberte si to, čo vaša firma aktuálne potrebuje." listTitle="S čím vám pomôžeme?" items={oneOffServices} href={`/kontakt?sluzba=${encodeURIComponent('Jednorazové služby')}&ponuka=1#zaujem`} action="Získať cenovú ponuku"/>
 </div>;
}

function Offer({annual=false,label,title,intro,listTitle,items,href,action}:{annual?:boolean;label:string;title:string;intro:string;listTitle:string;items:string[][];href:string;action:string}) {
 const group=annual?'annual-offer':'one-off-offer';
 return <section className={`service-offer${annual?' service-offer-annual':''}`} aria-labelledby={`${group}-title`}>
  <header className="offer-heading"><span className="offer-label">{label}</span><h2 id={`${group}-title`}>{title}</h2><p>{intro}</p></header>
  <h3 className="offer-list-title">{listTitle}</h3>
  <div id={annual?'celorocny-servis':'jednorazove-sluzby'} className="offer-accordions">{items.map(([name,description])=><details name={group} key={name} className="offer-item">
   <summary><Check className="offer-check" size={21} aria-hidden="true"/><span>{name}</span><span className="offer-toggle" aria-hidden="true"><Plus className="offer-plus" size={18}/><Minus className="offer-minus" size={18}/></span></summary>
   <p>{description}</p>
  </details>)}</div>
  <a className="offer-action" href={href}>{action}<ArrowUpRight size={20} aria-hidden="true"/></a>
 </section>;
}
