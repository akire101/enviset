import { ArrowUpRight, Factory, Store, CarFront, Laptop, ConciergeBell, ClipboardCheck, ShieldCheck, SearchCheck, CalendarCheck, GraduationCap, FileWarning, PackageCheck, ArrowRight, MessagesSquare, BadgeEuro, UsersRound, CircleCheck, FileText } from 'lucide-react';
import { Button, SectionHead } from './components';
import {HeroWind} from './hero-wind';
import {SectionControls} from './section-controls';
import { ProcessSteps } from './process-steps';
import { BlogCards } from './blog/components';
import { publicPosts } from './server';
import { pageMetadata } from './seo';

export const metadata = pageMetadata('Odpadové hospodárstvo pre firmy', 'Dokumentácia, evidencia odpadov a odborné poradenstvo pre Vašu firmu. ENVI set – viac podnikania, menej starostí.', '/');
export const dynamic = 'force-dynamic';
function ConstructionCrane(){return <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22V3l5 3v16M4 22h9M2 6h20v3H2zM6 3l16 3M6 10l5 4-5 4 5 4M20 9v6M18 15h4v4h-4z"/></svg>}
export default async function Home(){const posts=await publicPosts();return <main id="main" className="home-page">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Administratívne služby a odborné poradenstvo v oblasti odpadového hospodárstva.</h1><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="home-expertise"><div className="container section"><h2>Odbornosť v každodennom fungovaní Vašej firmy</h2><p className="home-expertise-intro">Sme spoločnosť zameraná na pomoc firmám pri povinnostiach v odpadovom hospodárstve. Využívame odborné znalosti, praktické skúsenosti a individuálny prístup, aby mali naši klienti vo svojich povinnostiach jasno a potrebnú podporu.</p><ul className="home-service-benefits">
  <li><ClipboardCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimum</strong> administratívnej záťaže</p></li>
  <li><ShieldCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Istota</strong> pri plnení zákonných povinností</p></li>
  <li><SearchCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimalizácia rizika</strong> pokút pri kontrolách od SIŽP</p></li>
 </ul></div></section>
 <div className="home-image-divider"><img src="/images/recycling-bins-divider-v9.webp" alt="Modrý, žltý a zelený kôš na triedený odpad pri budove" width="2030" height="484" loading="lazy" decoding="async"/></div>
 <section id="servis" className="home-service-options"><div className="container section"><h2>Naše služby v oblasti odpadového hospodárstva</h2><div className="home-options-grid">{[
  {icon:CalendarCheck,title:'Ročný paušálny servis',text:'Komplexné odborné a administratívne zabezpečenie povinností v oblasti odpadov počas celého roka.',href:'/sluzby#celorocny-servis',link:'Viac o paušálnom servise'},
  {icon:GraduationCap,title:'Školenie v oblasti odpadov',text:'Praktické školenie pre zamestnancov o pravidlách, povinnostiach a správnom nakladaní s odpadmi.',href:'/sluzby#one-off-question-6',link:'Viac o školení'},
  {icon:FileWarning,title:'Nebezpečné odpady',text:'Identifikačné listy, opatrenia pre prípad havárie, prevádzkové poriadky.',href:'/sluzby/nebezpecne-odpady',link:'Viac o nebezpečných odpadoch'},
  {icon:PackageCheck,title:'Obaly a neobalové výrobky',text:'Registrácie, ohlásenia a administratívne povinnosti pre obaly a obalové výrobky.',href:'/sluzby#one-off-question-0',link:'Viac o obaloch'},
 ].map(({icon:ServiceIcon,...option})=><article key={option.title} className="home-option"><div className="home-option-heading"><ServiceIcon size={46} strokeWidth={1.6} aria-hidden="true"/><h3>{option.title}</h3></div><p className="home-option-description">{option.text}</p><a className="home-option-link" href={option.href}>{option.link}<ArrowRight size={22} aria-hidden="true"/></a></article>)}</div></div></section>
 <section id="preco-my" className="home-why"><div className="container section"><h2>Prečo spolupráca s nami</h2><div className="home-why-reasons">{[
  {icon:MessagesSquare,badge:null,title:'Zrozumiteľne a bez zbytočných komplikácií',text:'Legislatíva nemusí byť španielska dedina. Všetko vysvetľujeme zrozumiteľne, odpovedáme na Vaše otázky a odporúčame najlepšie riešenia.'},
  {icon:FileText,badge:BadgeEuro,title:'Férové podmienky a transparentné ceny',text:'Ponuku prispôsobujeme skutočným potrebám a veľkosti Vašej firmy. Vopred viete, za čo platíte a čo môžete očakávať.'},
  {icon:ClipboardCheck,badge:ShieldCheck,title:'Povinnosti pod neustálym odborným dohľadom',text:'Sledujeme legislatívne zmeny, upozorňujeme na dôležité povinnosti a pomáhame dodržiavať stanovené termíny.'},
  {icon:UsersRound,badge:CircleCheck,title:'Osobný prístup a podpora',text:'V prípade nejasností a riešenia špecifických vecí sa máte na koho obrátiť a vždy komunikujete priamo s Vaším špecialistom na odpady.'},
 ].map(({icon:ReasonIcon,badge:Badge,...reason})=><div key={reason.title} className="home-why-reason"><span className="home-why-icon" aria-hidden="true"><ReasonIcon size={76} strokeWidth={1.5}/>{Badge&&<Badge className="home-why-icon-badge" size={36} strokeWidth={1.7}/>}</span><div><h3>{reason.title}</h3><p>{reason.text}</p></div></div>)}</div></div></section>
 <div className="home-illustration-divider"><img src="/images/environment-services-divider.webp" alt="Ilustrácia firmy, triediacich nádob, dokumentácie a zelene" width="2774" height="354" loading="lazy" decoding="async"/></div>
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha cesta k spolupráci?"/><ProcessSteps/></section>
 <section id="pre-koho" className="home-audience"><div className="container section"><h2>Pre aké firmy je spolupráca s nami určená?</h2><ul className="home-industry-list">{[
  {icon:Factory,title:'Výroba a priemysel',text:'Výrobné podniky, priemyselné prevádzky, spracovateľské spoločnosti.'},
  {icon:Store,title:'Obchod a distribúcia',text:'Maloobchod, veľkoobchod, predajne, sklady a distribučné centrá.'},
  {icon:ConstructionCrane,title:'Stavebníctvo a remeslá',text:'Stavebné firmy, montážne spoločnosti, remeselné a realizačné prevádzky.'},
  {icon:CarFront,title:'Doprava a služby',text:'Autoservisy, dopravcovia, servisné firmy a technické prevádzky.'},
  {icon:Laptop,title:'Administratíva a kancelárie',text:'Kancelárie, sídla spoločností, poradenské a administratívne firmy.'},
  {icon:ConciergeBell,title:'Gastro a ostatné prevádzky',text:'Reštaurácie, hotely, ubytovacie zariadenia a ďalšie podnikateľské prevádzky.'},
 ].map(s=><li key={s.title}><s.icon size={52} strokeWidth={1.6} aria-hidden="true"/><h3>{s.title}</h3><p>{s.text}</p></li>)}</ul><p className="home-audience-note">Máte iné odvetvie? <a href="/kontakt#formular">Neváhajte nás kontaktovať</a>, radi Vám poradíme.</p></div></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
