import { ArrowUpRight, Factory, Store, CarFront, Laptop, ConciergeBell, ClipboardCheck, ShieldCheck, SearchCheck, CalendarCheck, Check } from 'lucide-react';
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
export default async function Home(){const posts=await publicPosts();return <main id="main">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="home-service-overview"><div className="container section home-service-layout"><div className="home-service-copy"><h2>Komplexné administratívne a odborné zabezpečenie odpadového hospodárstva Vašej spoločnosti</h2><ul className="home-service-benefits">
  <li><ClipboardCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimum</strong> administratívnej záťaže</p></li>
  <li><ShieldCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Istota</strong> pri plnení zákonných povinností</p></li>
  <li><SearchCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimalizácia rizika</strong> pokút pri kontrolách od SIŽP</p></li>
 </ul><Button href="/sluzby#celorocny-servis">Viac o celoročnom servise</Button></div><div className="home-year-visual" role="img" aria-label="Celoročná starostlivosť v jednom servise"><div className="home-year-card"><CalendarCheck size={82} strokeWidth={1.6} aria-hidden="true"/><p><strong>Celoročná<br/>starostlivosť</strong><span>v jednom servise</span></p></div></div></div></section>
 <section id="zodpovedny-pristup" className="home-responsibility"><div className="container section"><h2><span>Zodpovedný prístup k odpadom, </span><span>kľúč k lepšiemu životnému prostrediu</span></h2><p><span>Odpadové hospodárstvo je neoddeliteľnou súčasťou podnikania každej spoločnosti </span><span>bez ohľadu na jej veľkosť a zameranie. Zmeníme povinnosti na zrozumiteľný systém, </span><span>ktorý Vás zbaví starostí.</span></p></div></section>
 <section id="pre-koho" className="home-audience"><div className="container section"><h2>Pre aké firmy je spolupráca s nami určená?</h2><ul className="home-industry-list">{[
  {icon:Factory,title:'Výroba a priemysel',text:'Výrobné podniky, priemyselné prevádzky, spracovateľské spoločnosti.'},
  {icon:Store,title:'Obchod a distribúcia',text:'Maloobchod, veľkoobchod, predajne, sklady a distribučné centrá.'},
  {icon:ConstructionCrane,title:'Stavebníctvo a remeslá',text:'Stavebné firmy, montážne spoločnosti, remeselné a realizačné prevádzky.'},
  {icon:CarFront,title:'Doprava a služby',text:'Autoservisy, dopravcovia, servisné firmy a technické prevádzky.'},
  {icon:Laptop,title:'Administratíva a kancelárie',text:'Kancelárie, sídla spoločností, poradenské a administratívne firmy.'},
  {icon:ConciergeBell,title:'Gastro a ostatné prevádzky',text:'Reštaurácie, hotely, ubytovacie zariadenia a ďalšie podnikateľské prevádzky.'},
 ].map(s=><li key={s.title}><s.icon size={52} strokeWidth={1.6} aria-hidden="true"/><h3>{s.title}</h3><p>{s.text}</p></li>)}</ul><p className="home-audience-note">Máte iné odvetvie? <a href="/kontakt#formular">Neváhajte nás kontaktovať</a>, radi Vám poradíme.</p></div></section>
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha cesta k spolupráci?"/><ProcessSteps/></section>
 <section id="odborne-ukony" className="home-specific-services"><div className="container section home-specific-layout"><div className="home-specific-copy"><p className="home-specific-label">Jednorazové služby</p><h2>Potrebujete vyriešiť konkrétnu povinnosť?</h2><p>Zabezpečíme potrebné dokumenty, registrácie a ďalšie úkony vyplývajúce z konkrétnej činnosti a potrieb firmy.</p><Button href="/sluzby#jednorazove-sluzby" secondary>Pozrieť všetky služby</Button></div><ul>{['Identifikačné listy nebezpečných odpadov','Plány opatrení pre prípad havárie','Prevádzkové poriadky','Školenia v oblasti odpadov'].map(title=><li key={title}><Check size={26} strokeWidth={3} aria-hidden="true"/><h3>{title}</h3></li>)}</ul></div></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
