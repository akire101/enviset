import { ArrowUpRight, Factory, Store, CarFront, Laptop, ConciergeBell } from 'lucide-react';
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
 <section id="pomoc" className="home-retainer"><div className="container section">
  <div className="home-retainer-intro"><div><p className="home-service-label">Paušálny servis</p><h2><span>Odborné poradenstvo </span><span>v oblasti životného </span><span>prostredia</span></h2></div><p className="home-retainer-copy"><span>Prevezmeme starostlivosť o plnenie povinností </span><span>Vašej firmy v oblasti odpadového hospodárstva. </span><span>Počas celej doby spolupráce zabezpečujeme </span><span>odbornú, administratívnu a legislatívnu </span><span>podporu.</span></p></div>
  <div className="home-retainer-services">{[
   ['Vedenie evidencie odpadov','Spracujeme doklady o odovzdávaní odpadov a priebežne ich zaznamenávame do evidencie, pričom zabezpečujeme jej aktuálnosť a správnosť podľa aktuálnych požiadaviek.'],
   ['Ohlásenia o vzniku odpadu','Pripravujeme včasné podanie potrebných ohlásení o vzniknutých odpadoch a dohliadame na správnosť údajov.'],
   ['Osobné kontroly prevádzok','Vykonávame kontroly fyzických povinností v prevádzke a navrhneme odporúčania v prípade nedostatkov, ktoré zistíme.'],
  ].map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  <div className="home-service-action"><Button href="/sluzby#celorocny-servis">Zobraziť celý paušálny servis</Button></div>
 </div></section>
 <section id="odborne-ukony" className="home-one-off"><div className="container section"><p className="home-service-label">Jednorazové odborné úkony</p><h2>Špecifické povinnosti, ktoré si vyžadujú individuálne riešenia</h2><p className="home-one-off-intro">Zabezpečujeme odborné dokumenty, registrácie a ďalšie úkony vyplývajúce z konkrétnej činnosti a potrieb firmy.</p>
  <div className="home-one-off-cards">{[
   ['Identifikačné listy nebezpečných odpadov','Vypracujeme identifikačné listy pre jednotlivé nebezpečné odpady, obsahujúce povinné informácie.'],
   ['Plány opatrení pre prípad havárie','Vypracujeme plán opatrení pre prípad havárie, na predchádzanie kritických situácií. S konkrétnymi krokmi a opatreniami na zvládnutie mimoriadnych situácií.'],
   ['Prevádzkové poriadky','Vypracujeme prevádzkový poriadok pre dané miesto zhromažďovania nebezpečného odpadu pred jeho odovzdaním.'],
   ['Školenie v oblasti odpadov','Zabezpečíme odborné školenie zamestnancov podľa potrieb Vašej firmy a platnej legislatívy v odpadovom hospodárstve.'],
  ].map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  <div className="home-service-action"><Button href="/sluzby#jednorazove-sluzby">Pozrieť všetky odborné úkony</Button></div>
 </div></section>

 <section id="spolupraca" className="meeting-intro"><div className="container meeting-layout"><div className="meeting-copy"><h2>Neviete, aké povinnosti sa týkajú Vašej firmy?</h2><p>Dohodnite si bezplatné stretnutie s naším špecialistom na odpadové hospodárstvo.</p></div><img src="/images/meeting-office.png" alt="Pracovný stôl s dokumentáciou, notebookom a zeleným zakladačom" width={854} height={577} loading="lazy"/></div></section>
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
