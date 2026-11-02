import { ArrowUpRight, Check, FileText, ClipboardList, ShieldCheck } from 'lucide-react';
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
export default async function Home(){const posts=await publicPosts();return <main id="main">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="help-section"><div className="container section"><h2>Kľúčové oblasti na ktoré sa zameriavame</h2><div className="help-icons">{[
  {slug:'odborna-dokumentacia',icon:FileText,title:'Nastavenie odpadového hospodárstva',description:'Systém nakladania s odpadmi vo firmách, súvisiace procesy, dokumentácia a plnenie zákonných povinností'},
  {slug:'evidencia-odpadov',icon:ClipboardList,title:'Evidencia odpadov',description:'Priebežné zaznamenávanie vzniku a nakladania s odpadmi, evidencia odovzdaných odpadov a súvisiace ohlasovacie povinnosti'},
  {slug:'nebezpecne-odpady',icon:ShieldCheck,title:'Nebezpečné odpady',description:'Identifikácia, označovanie, zhromažďovanie, skladovanie a bezpečné nakladanie s nebezpečnými odpadmi'},
 ].map(s=><article key={s.slug}><s.icon className="help-service-icon" size={40} strokeWidth={1.7} aria-hidden="true"/><h3>{s.title}</h3><p>{s.description}</p></article>)}</div><div className="section-bottom"><Button href="/sluzby">ukázať služby</Button></div></div></section>

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
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha naša spolupráca?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
