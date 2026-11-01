'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { brand } from '../content';

export function MeetingInvitation() {
 const [revealed,setRevealed]=useState(false);
 const phoneHref=`tel:${brand.contacts.phone.replace(/\s/g,'')}`;
 return <section className="container cta services-meeting" aria-labelledby="services-meeting-title">
  <h2 id="services-meeting-title">Neviete, ktoré služby sú pre Vás potrebné sa týkajú práve Vašej firmy?</h2>
  <p>Žiadny problém! Jednoducho si dohodnite BEZPLATNÉ nezáväzné stretnutie s naším špecialistom na odpady, ktorý Vás navštívi priamo vo Vašej firme, zhodnotí aktuálny stav a poradí Vám najlepšie riešenie s nezáväznou cenovou ponukou.</p>
  <a className="button" href={phoneHref} onClick={event=>{if(window.matchMedia('(min-width: 761px)').matches&&!revealed){event.preventDefault();setRevealed(true);}}}><Phone size={19} aria-hidden="true"/>{revealed?brand.contacts.phone:'Dohodnúť termín osobného stretnutia'}</a>
  <span className="sr-only" role="status">{revealed?`Zavolajte nám na ${brand.contacts.phone}`:''}</span>
 </section>;
}
