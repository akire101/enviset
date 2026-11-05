import { ArrowUpRight, Check, Recycle, Boxes, ClipboardCheck, Scale, Factory, Store, CarFront, Laptop, ConciergeBell } from 'lucide-react';
import { Button, SectionHead } from './components';
import {HeroWind} from './hero-wind';
import {SectionControls} from './section-controls';
import { ProcessSteps } from './process-steps';
import { BlogCards } from './blog/components';
import { publicPosts } from './server';
import { pageMetadata } from './seo';
import { MeetingCallButton } from './meeting-call-button';
export const metadata = pageMetadata('Odpadové hospodárstvo pre firmy', 'Dokumentácia, evidencia odpadov a odborné poradenstvo pre Vašu firmu. ENVI set – viac podnikania, menej starostí.', '/');
export const dynamic = 'force-dynamic';
function ConstructionCrane(){return <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22V3l5 3v16M4 22h9M2 6h20v3H2zM6 3l16 3M6 10l5 4-5 4 5 4M20 9v6M18 15h4v4h-4z"/></svg>}
export default async function Home(){const posts=await publicPosts();return <main id="main">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="help-section"><div className="container section"><h2>Kľúčové oblasti, ktoré Vám pokryjeme</h2><div className="help-icons">{[
  {slug:'druhy-a-triedenie',icon:Recycle,title:'Druhy a triedenie odpadov',description:'Identifikácia vznikajúcich odpadov, ich zaraďovanie podľa Katalógu odpadov a rozlišovanie nebezpečných a ostatných odpadov'},
  {slug:'zhromazdovanie-a-odovzdavanie',icon:Boxes,title:'Zhromažďovanie a odovzdávanie odpadov',description:'Triedenie, označovanie, zhromažďovanie, skladovanie a odovzdávanie odpadov oprávneným osobám'},
  {slug:'evidencia-a-ohlasovanie',icon:ClipboardCheck,title:'Evidencia a ohlasovanie odpadov',description:'Vedenie priebežnej evidencie, evidencia vzniku a nakladania s odpadmi a plnenie ohlasovacích povinností'},
  {slug:'legislativa-a-dokumentacia',icon:Scale,title:'Legislatíva a dokumentácia',description:'Zákonné povinnosti pôvodcov odpadov, odborná dokumentácia, nebezpečné odpady, obaly a ďalšie súvisiace požiadavky'},
 ].map(s=><article key={s.slug}><div className="help-card-heading"><s.icon className="help-service-icon" size={44} strokeWidth={1.7} aria-hidden="true"/><h3>{s.title}</h3></div><p>{s.description}</p></article>)}</div><div className="section-bottom"><Button href="/sluzby">ukázať služby</Button></div></div></section>

 <section id="spolupraca" className="meeting-intro"><div className="container meeting-layout"><div className="meeting-copy"><h2>Neviete, aké povinnosti sa týkajú Vašej firmy?</h2><p>Dohodnite si bezplatné stretnutie s naším špecialistom na odpadové hospodárstvo.</p><MeetingCallButton/></div><img src="/images/meeting-office.png" alt="Pracovný stôl s dokumentáciou, notebookom a zeleným zakladačom" width={854} height={577} loading="lazy"/></div></section>
 <div className="meeting-organic-divider" aria-hidden="true"/>
 <section id="vyhody" className="container section meeting-benefits"><h2>Čo získate?</h2><ul>{[
  [ 'Podporu skúsených odborníkov', 's dlhoročnými znalosťami v oblasti odpadového hospodárstva.' ],
  [ 'Praktické a komplexné poradenstvo', 'prispôsobené potrebám Vašej firmy.' ],
  [ 'Úsporu času', 'a minimum administratívnej záťaže.' ],
  [ 'Vyššiu istotu a bezpečnosť', 'pri plnení zákonných povinností v oblasti životného prostredia.' ],
  [ 'Prevenciu problémov a zníženie rizika pokút', 'pri kontrolách zo strany štátnych orgánov.' ],
  [ 'Individuálnu odbornú podporu', 'počas celej spolupráce.' ],
 ].map(([title,text])=><li key={title}><Check size={24} strokeWidth={2.5} aria-hidden="true"/><p><strong>{title}</strong> {text}</p></li>)}</ul></section>
 <section id="pre-koho" className="home-audience"><div className="container section"><h2>Pre aké firmy je spolupráca s nami určená?</h2><p className="home-audience-intro">Odpadové hospodárstvo sa týka každej firmy bez ohľadu na jej veľkosť či zameranie.</p><ul className="home-industry-list">{[
  {icon:Factory,title:'Výroba a priemysel',text:'Výrobné podniky, priemyselné prevádzky, spracovateľské spoločnosti.'},
  {icon:Store,title:'Obchod a distribúcia',text:'Maloobchod, veľkoobchod, predajne, sklady a distribučné centrá.'},
  {icon:ConstructionCrane,title:'Stavebníctvo a remeslá',text:'Stavebné firmy, montážne spoločnosti, remeselné a realizačné prevádzky.'},
  {icon:CarFront,title:'Doprava a služby',text:'Autoservisy, dopravcovia, servisné firmy a technické prevádzky.'},
  {icon:Laptop,title:'Administratíva a kancelárie',text:'Kancelárie, sídla spoločností, poradenské a administratívne firmy.'},
  {icon:ConciergeBell,title:'Gastro a ostatné prevádzky',text:'Reštaurácie, hotely, ubytovacie zariadenia a ďalšie podnikateľské prevádzky.'},
 ].map(s=><li key={s.title}><s.icon size={52} strokeWidth={1.6} aria-hidden="true"/><h3>{s.title}</h3><p>{s.text}</p></li>)}</ul><p className="home-audience-note">Máte iné odvetvie? <a href="/kontakt#formular">Neváhajte nás kontaktovať</a>, radi Vám poradíme.</p></div></section>
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha cesta k spolupráci?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
