import { PageHero, CheckList } from '../components';
import { brand } from '../content';
import { ContactForm } from './form';
import { pageMetadata } from '../seo';
export const metadata=pageMetadata('Kontakt – napíšte nám','ENVI set, s.r.o. · enviset@enviset.sk · +421 902 469 908 · Na pažiti 811/19, Trenčín. Napíšte nám alebo si vyžiadajte individuálnu ponuku.','/kontakt');
export default async function Contact({searchParams}:{searchParams:Promise<{sluzba?:string;odvetvie?:string;ponuka?:string}>}){const q=await searchParams;return <main id="main">
 <PageHero label="Kontakt" title="Napíšte nám" text="Napíšte, čo potrebujete vyriešiť. Navrhneme ďalší postup a rozsah spolupráce."/>
 <section className="container contact-layout"><aside className="contact-aside"><h2>Vy poznáte svoju firmu.<br/>My rozumieme odpadom.</h2><address className="company-contact"><a className="contact-phone" href="tel:+421902469908">{brand.contacts.phone}</a><a href={`mailto:${brand.contacts.email}`}>{brand.contacts.email}</a><strong>{brand.contacts.legalName}</strong><span>{brand.contacts.address}</span><span>IČO: {brand.contacts.companyId}<br/>DIČ: {brand.contacts.taxId}</span></address><section className="office-hours"><h3>Pracovné hodiny</h3><dl>{['Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota','Nedeľa'].map((day,i)=><div key={day}><dt>{day}</dt><dd>{i<5?'08:00–17:00':'Zatvorené'}</dd></div>)}</dl></section><CheckList items={['Prejdeme si činnosť a potreby Vašej prevádzky.','Pomôžeme Vám zorientovať sa v povinnostiach.','Navrhneme vhodné riešenie a rozsah spolupráce.']}/><p className="form-note">Vaše kontaktné údaje použijeme na vybavenie tejto požiadavky.</p></aside><ContactForm service={q.sluzba||''} industry={q.odvetvie||''} quote={q.ponuka==='1'}/></section>

 </main>}
