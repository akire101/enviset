import { ArrowUpRight, Factory, Store, CarFront, Laptop, ConciergeBell, ClipboardCheck, ShieldCheck, SearchCheck, Files, FolderOpen, ListChecks, Check } from 'lucide-react';
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
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="home-service-overview"><div className="container section home-service-layout"><div className="home-service-copy"><h2>Celoročný servis<br/>odpadového hospodárstva</h2><p className="home-service-intro">Prevezmeme starostlivosť o odpadové hospodárstvo Vašej spoločnosti počas celého roka. Zabezpečíme potrebnú administratívu, dohliadneme na zákonné povinnosti a poskytneme odbornú podporu podľa potrieb Vašej spoločnosti.</p><ul className="home-service-benefits">
  <li><ClipboardCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimum</strong> administratívnej záťaže</p></li>
  <li><ShieldCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Istota</strong> pri plnení zákonných povinností</p></li>
  <li><SearchCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimalizácia rizika</strong> pokút pri kontrolách od SIŽP</p></li>
 </ul><Button href="/sluzby#celorocny-servis">Viac o celoročnom servise</Button></div><ul className="home-service-tiles">{[{icon:Files,title:'Evidencia odpadov'},{icon:Factory,title:'Osobné kontroly prevádzok'},{icon:FolderOpen,title:'Odborná dokumentácia'},{icon:ListChecks,title:'Ohlasovacie povinnosti'}].map(({icon:ServiceIcon,title})=><li key={title}><ServiceIcon size={54} strokeWidth={1.7} aria-hidden="true"/><h3>{title}</h3></li>)}</ul></div></section>
 <div className="home-image-divider"><img src="/images/recycling-bins-divider-v9.webp" alt="Modrý, žltý a zelený kôš na triedený odpad pri budove" width="2030" height="484" loading="lazy" decoding="async"/></div>
 <section id="zodpovedny-pristup" className="home-responsibility"><div className="container section"><div><h2><span>Zodpovedný prístup k odpadom, </span><span>kľúč k lepšiemu životnému prostrediu</span></h2><p>Odpadové hospodárstvo je neoddeliteľnou súčasťou podnikania každej spoločnosti bez ohľadu na jej veľkosť a zameranie. Zmeníme povinnosti na zrozumiteľný systém, ktorý Vás zbaví starostí.</p></div><svg className="home-care-symbol" viewBox="0 0 220 220" fill="currentColor" aria-hidden="true"><path d="M110 114C105 76 121 34 190 27c-1 47-25 74-64 65 13-18 26-29 43-40-24 9-42 29-48 55z"/><path d="M109 94C70 99 52 75 46 53c38 0 61 12 65 33-15-13-29-19-45-23 19 10 33 24 39 38z" fill="#388c35"/><path d="M91 115c18-15 37-15 55 2" fill="none" stroke="#388c35" strokeWidth="11" strokeLinecap="round"/><path d="m19 168 40-39c8-8 15-10 27-10h47c16 0 18 20 1 24h-27c-9 0-9 12 0 12h38l42-39c14-13 30 1 18 15l-57 61c-5 5-10 7-18 7H77l-26 22z"/></svg></div></section>
 <section id="pre-koho" className="home-audience"><div className="container section"><h2>Pre aké firmy je spolupráca s nami určená?</h2><ul className="home-industry-list">{[
  {icon:Factory,title:'Výroba a priemysel',text:'Výrobné podniky, priemyselné prevádzky, spracovateľské spoločnosti.'},
  {icon:Store,title:'Obchod a distribúcia',text:'Maloobchod, veľkoobchod, predajne, sklady a distribučné centrá.'},
  {icon:ConstructionCrane,title:'Stavebníctvo a remeslá',text:'Stavebné firmy, montážne spoločnosti, remeselné a realizačné prevádzky.'},
  {icon:CarFront,title:'Doprava a služby',text:'Autoservisy, dopravcovia, servisné firmy a technické prevádzky.'},
  {icon:Laptop,title:'Administratíva a kancelárie',text:'Kancelárie, sídla spoločností, poradenské a administratívne firmy.'},
  {icon:ConciergeBell,title:'Gastro a ostatné prevádzky',text:'Reštaurácie, hotely, ubytovacie zariadenia a ďalšie podnikateľské prevádzky.'},
 ].map(s=><li key={s.title}><s.icon size={52} strokeWidth={1.6} aria-hidden="true"/><h3>{s.title}</h3><p>{s.text}</p></li>)}</ul><p className="home-audience-note">Máte iné odvetvie? <a href="/kontakt#formular">Neváhajte nás kontaktovať</a>, radi Vám poradíme.</p></div></section>
 <section id="odborne-ukony" className="home-specific-services"><div className="container section home-specific-layout"><div className="home-specific-copy"><p className="home-specific-label">Jednorazové služby</p><h2>Potrebujete vyriešiť konkrétnu povinnosť?</h2><p>Zabezpečíme potrebné dokumenty, registrácie a ďalšie úkony vyplývajúce z konkrétnej činnosti a potrieb firmy.</p><Button href="/sluzby#jednorazove-sluzby" secondary>Pozrieť všetky služby</Button></div><ul>{['Identifikačné listy nebezpečných odpadov','Plány opatrení pre prípad havárie','Prevádzkové poriadky','Školenia v oblasti odpadov'].map(title=><li key={title}><Check size={26} strokeWidth={3} aria-hidden="true"/><h3>{title}</h3></li>)}</ul></div></section>
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha cesta k spolupráci?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
