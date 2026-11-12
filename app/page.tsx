import { ArrowUpRight, Factory, Store, CarFront, Laptop, ConciergeBell, ClipboardCheck, ShieldCheck, SearchCheck, Check, ArrowRight } from 'lucide-react';
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
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Administratívne služby a odborné poradenstvo v oblasti odpadového hospodárstva.</h1><p>Prevezmeme administratívne povinnosti Vašej firmy a zabezpečíme odborné poradenstvo.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="home-expertise"><div className="container section"><h2>Odbornosť v každodennom fungovaní Vašej firmy</h2><p className="home-expertise-intro">Sme spoločnosť zameraná na pomoc firmám pri povinnostiach v odpadovom hospodárstve. Využívame odborné znalosti, praktické skúsenosti a individuálny prístup, aby mali naši klienti vo svojich povinnostiach jasno a potrebnú podporu.</p><ul className="home-service-benefits">
  <li><ClipboardCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimum</strong> administratívnej záťaže</p></li>
  <li><ShieldCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Istota</strong> pri plnení zákonných povinností</p></li>
  <li><SearchCheck size={54} strokeWidth={1.7} aria-hidden="true"/><p><strong>Minimalizácia rizika</strong> pokút pri kontrolách od SIŽP</p></li>
 </ul></div></section>
 <div className="home-image-divider"><img src="/images/recycling-bins-divider-v9.webp" alt="Modrý, žltý a zelený kôš na triedený odpad pri budove" width="2030" height="484" loading="lazy" decoding="async"/></div>
 <section id="servis" className="home-service-options"><div className="container section"><h2>Náš komplexný servis a odborné služby</h2><p className="home-options-intro">Hľadáte niekoho kto Vašej firme zabezpečí odpadové hospodárstvo dlhodobo alebo len potrebujete konkrétnu vec? Máme riešenia v oboch prípadoch.</p><div className="home-options-grid">{[
  {label:'Dlhodobá spolupráca',title:'Celoročný servis odpadového hospodárstva',text:'Pravidelné odborné a administratívne zabezpečenie počas celého roka.',listTitle:'Čo servis zahŕňa?',items:['Evidencia odpadov','Ohlasovacie povinnosti','Odborná dokumentácia','Osobné kontroly prevádzok'],href:'/sluzby#celorocny-servis',link:'Detail celoročného servisu'},
  {label:'Samostatné objednanie',title:'Jednorazové odborné služby',text:'Riešenie konkrétnych legislatívnych, dokumentačných a administratívnych požiadaviek.',listTitle:'Vybrané služby',items:['Registrácia v registri výrobcov','Podklady pre zmluvu s OZV','Ohlásenie za obaly','Identifikačný list nebezpečného odpadu'],href:'/sluzby#jednorazove-sluzby',link:'Všetky jednorazové služby'},
 ].map(option=><article key={option.title} className="home-option"><p className="home-option-label">{option.label}</p><h3>{option.title}</h3><p className="home-option-description">{option.text}</p><div className="home-option-details"><h4>{option.listTitle}</h4><ul>{option.items.map(item=><li key={item}><Check size={22} aria-hidden="true"/><span>{item}</span></li>)}</ul></div><a className="home-option-link" href={option.href}>{option.link}<ArrowRight size={22} aria-hidden="true"/></a></article>)}</div></div></section>
 <section id="preco-my" className="home-why"><div className="container section"><h2>Prečo spolupracovať s nami?</h2><div className="home-why-reasons">{[
  {title:'Zrozumiteľne a bez zbytočných komplikácií',text:'Legislatíva nemusí byť pre Vás španielska dedina. Zložité požiadavky vysvetľujeme zrozumiteľne, odpovedáme na Vaše otázky a odporúčame riešenia, ktoré fungujú v praxi.'},
  {title:'Férové podmienky a transparentné ceny',text:'Za našimi službami stojí jasne stanovený rozsah a cena. Ponuku prispôsobujeme skutočným potrebám a veľkosti Vašej firmy. Vopred viete, za čo platíte a čo môžete očakávať.'},
  {title:'Povinnosti pod neustálym odborným dohľadom',text:'Sledujeme legislatívne zmeny, upozorňujeme na dôležité povinnosti a pomáhame Vám dodržiavať stanovené termíny. Vaše odpadové hospodárstvo tak nezostáva bez pozornosti ani po odovzdaní dokumentácie.'},
  {title:'Osobný prístup a dostupná podpora',text:'Poznáme Vašu firmu, jej fungovanie a konkrétne potreby. Keď potrebujete poradiť alebo vyriešiť nečakanú situáciu, máte sa na koho obrátiť. Komunikujete priamo s odborníkom, ktorý pozná Vašu spoluprácu.'},
 ].map(reason=><div key={reason.title}><h3>{reason.title}</h3><p>{reason.text}</p></div>)}</div></div></section>
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
