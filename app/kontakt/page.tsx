import { PageHero } from '../components';
import { Phone, Mail, Clock3, MapPin } from 'lucide-react';
import { brand } from '../content';
import { ContactForm } from './form';
import { pageMetadata } from '../seo';
export const metadata=pageMetadata('Kontakt – napíšte nám','ENVI set, s.r.o. · enviset@enviset.sk · +421 902 469 908 · Na pažiti 811/19, Trenčín. Napíšte nám alebo si vyžiadajte individuálnu ponuku.','/kontakt');
export default async function Contact({searchParams}:{searchParams:Promise<{sluzba?:string;odvetvie?:string;ponuka?:string}>}){const q=await searchParams;return <main id="main" className="contact-page">
 <PageHero label="Kontakt" title="Napíšte nám, čo vaša firma potrebuje" text="Ozveme sa vám, preberieme možnosti spolupráce."/>
 <section className="container contact-layout"><aside className="contact-aside contact-overview">
 <div className="contact-company"><div className="contact-direct"><a href={`tel:${brand.contacts.phone.replace(/\s/g,'')}`}><Phone aria-hidden="true"/><span>{brand.contacts.phone}</span></a><a href={`mailto:${brand.contacts.email}`}><Mail aria-hidden="true"/><span>{brand.contacts.email}</span></a></div><address className="contact-registration"><strong>{brand.contacts.legalName}</strong><span>{brand.contacts.address}</span><span>IČO: {brand.contacts.companyId}<br/>DIČ: {brand.contacts.taxId}</span></address></div>
 <div className="contact-availability"><section className="contact-fact"><Clock3 aria-hidden="true"/><div><h2>Pracovné hodiny</h2><p>Pondelok – Piatok<br/>8:00 – 17:00</p></div></section><section className="contact-fact"><MapPin aria-hidden="true"/><div><h2>Pôsobnosť</h2><p>Trenčín a celé Slovensko</p></div></section><svg className="contact-coverage-map" viewBox="765 690 600 365" role="img" aria-label="Pôsobnosť z Trenčína na celom Slovensku"><image href="/images/contact-reference.webp" width="1390" height="1086"/></svg></div>
 </aside><ContactForm service={q.sluzba||''} industry={q.odvetvie||''} quote={q.ponuka==='1'}/></section>

 </main>}
