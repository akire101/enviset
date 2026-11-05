'use client';
import { useState } from 'react';
import { Check, Plus, Minus } from 'lucide-react';
import { oneOffServices } from '../client-content';

const groups = [
 {id:'legislativa',title:['Legislatívne','zabezpečenie'],items:[
  ['Analýzy spoločnosti','Pravidelne analyzujeme fungovanie odpadového hospodárstva v spoločnosti a prípadné zmeny spracujeme.'],
  ['Odborné dokumentácie','Vypracujeme potrebnú dokumentáciu odpadového hospodárstva pre Vašu firmu, v ktorej dávame presné postupy, návody a riešenia v súlade s platnou legislatívou. Dokumentáciu priebežne aktualizujeme.'],
  ['Podpora pri používaní dokumentácií','Pri novej spolupráci vypracovanú dokumentáciu odovzdáme, vysvetlíme a ukážeme jej používanie v praxi. Pri aktualizácii zmeny vysvetlíme.'],
 ]},
 {id:'administrativa',title:['Administratívne','prevzatie'],items:[
  ['Vedenie evidencie odpadov','Spracovávame doklady o odovzdávaní odpadov a priebežne zaznamenávame všetky potrebné údaje do evidencie. Zabezpečujeme jej aktuálnosť a správnosť podľa aktuálnych požiadaviek.'],
  ['Ohlasovacie povinnosti','Pripravujeme včasné podanie potrebných ohlásení o odpadoch za Vašu firmu. Dohliadneme na dodržanie zákonných termínov a správnosť podaných údajov.'],
 ]},
 {id:'podpora',title:['Osobný dohľad','a podpora'],items:[
  ['Osobné kontroly prevádzok','Osobne kontrolujeme nastavený systém v prevádzke, plnenie povinností, fyzický stav priestorov a navrhneme odporúčania v prípade nedostatkov, ktoré zistíme.'],
  ['Monitoring legislatívnych zmien','Sledujeme legislatívne zmeny v oblasti odpadového hospodárstva a o všetkom dôležitom Vás informujeme.'],
  ['Individuálna odborná podpora','Sme k dispozícii pri riešení otázok a situácií súvisiacich s odpadovým hospodárstvom a poskytujeme odbornú podporu pri špecifických záležitostiach.'],
 ]},
];

export function ServiceOffers() {
 return <div id="popis-sluzieb" className="container service-pillars" aria-label="Tri oblasti dlhodobej spolupráce">
  <span id="celorocny-servis" className="service-anchor" aria-hidden="true"/>
  {groups.map(group=><ServiceGroup key={group.id} {...group}/>)}
 </div>;
}

function ServiceGroup({id,title,items}:{id:string;title:string[];items:string[][]}) {
 return <section className="service-pillar" aria-labelledby={`${id}-title`}>
  <h2 id={`${id}-title`}>{title.map((line,index)=><span key={line}>{index>0?' ':''}{line}</span>)}</h2>
  <ServiceItems id={id} items={items}/>
 </section>;
}

export function OneOffServices() {
 const items=oneOffServices.map(([name,description],index)=>[
  index===3?'Identifikačné listy nebezpečných odpadov (ILNO)':index===5?'Prevádzkový poriadok miesta zhromažďovania nebezpečného odpadu':name,
  description,
 ]);
 return <section id="jednorazove-sluzby" className="container services-one-off" aria-labelledby="one-off-title">
  <header><h2 id="one-off-title">Riešenia pre konkrétne potreby Vašej firmy</h2><p>Chýba Vám už len konkrétna vec? Zvoľte si to, čo aktuálne potrebujete.</p></header>
  <div className="one-off-list"><ServiceItems id="one-off" items={items}/></div>
 </section>;
}

function ServiceItems({id,items}:{id:string;items:string[][]}) {
 const [openItem,setOpenItem]=useState<number|null>(null);
 return <>{items.map(([name,description],index)=><div key={name} className="offer-item" data-open={openItem===index}>
   <button type="button" className="offer-question" id={`${id}-question-${index}`} aria-expanded={openItem===index} aria-controls={`${id}-answer-${index}`} onClick={()=>setOpenItem(openItem===index?null:index)}><Check className="offer-check" size={21} aria-hidden="true"/><span>{name}</span><span className="offer-toggle" aria-hidden="true"><Plus className="offer-plus" size={18}/><Minus className="offer-minus" size={18}/></span></button>
   <div className="offer-answer" id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={openItem!==index} inert={openItem!==index}><div><p>{description}</p></div></div>
  </div>)}</>;
}
