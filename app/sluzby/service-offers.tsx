'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Plus, Minus } from 'lucide-react';
import { annualServices, oneOffServices } from '../client-content';

const offers = [
 {id:'celorocny-servis', title:'Dlhodobé zabezpečenie odborného servisu', intro:'', items:annualServices, service:'Ročný servis'},
 {id:'jednorazove-sluzby', title:'Jednorázové služby', intro:'Chýba Vám len konkrétna vec? Vyberte si čo aktuálne potrebujete', items:oneOffServices, service:'Jednorazové služby'},
];

export function ServiceOffers() {
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const fromHash=()=>{
   const index=offers.findIndex(offer=>offer.id===window.location.hash.slice(1));
   if(index<0)return;
   setActive(index);
   document.getElementById('popis-sluzieb')?.scrollIntoView({block:'start',behavior:'instant'});
  };
  const frame=requestAnimationFrame(fromHash);
  window.addEventListener('hashchange',fromHash);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',fromHash)};
 },[]);
 return <div id="popis-sluzieb" className="container service-offers service-tabs" aria-label="Možnosti spolupráce">
  <div className="offer-tabs" role="tablist" aria-label="Typ služieb">{offers.map((offer,index)=><button key={offer.id} id={offer.id} type="button" role="tab" aria-selected={active===index} aria-controls={`${offer.id}-panel`} tabIndex={active===index?0:-1} className={`offer-tab${index===0?' offer-tab-annual':''}`} onClick={()=>setActive(index)} onKeyDown={event=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();
   const next=event.key==='Home'?0:event.key==='End'?1:1-active;
   setActive(next);document.getElementById(offers[next].id)?.focus();
  }}>{offer.title}</button>)}</div>
  {offers.map((offer,index)=><div key={offer.id} role="tabpanel" id={`${offer.id}-panel`} aria-labelledby={offer.id} hidden={active!==index}><Offer annual={index===0} {...offer}/></div>)}
 </div>;
}

function Offer({annual,intro,items,service,id}:{annual:boolean;intro:string;items:string[][];service:string;id:string}) {
 const [openItem,setOpenItem]=useState<number|null>(null);
 const split=Math.ceil(items.length/2);
 return <section className={`service-offer offer-wide${annual?' service-offer-annual':''}`}>
  <div className="offer-main">{intro&&<header className="offer-heading"><p>{intro}</p></header>}
   <div className="offer-service-columns">{[items.slice(0,split),items.slice(split)].map((column,col)=><div className="offer-accordions" key={col}>{column.map(([name,description],row)=>{
    const index=col*split+row;
    return <div key={name} className="offer-item" data-open={openItem===index}>
     <button type="button" className="offer-question" id={`${id}-question-${index}`} aria-expanded={openItem===index} aria-controls={`${id}-answer-${index}`} onClick={()=>setOpenItem(openItem===index?null:index)}><Check className="offer-check" size={21} aria-hidden="true"/><span>{name}</span><span className="offer-toggle" aria-hidden="true"><Plus className="offer-plus" size={18}/><Minus className="offer-minus" size={18}/></span></button>
     <div className="offer-answer" id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={openItem!==index} inert={openItem!==index}><div><p>{description}</p></div></div>
    </div>;
   })}</div>)}</div>
  </div>
  <a className="offer-action" href={`/kontakt?sluzba=${encodeURIComponent(service)}&ponuka=1#zaujem`}>Získať nezáväznú cenovú ponuku<ArrowUpRight size={22} aria-hidden="true"/></a>
 </section>;
}
