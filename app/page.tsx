import { ArrowUpRight, Check } from 'lucide-react';
import { Button, SectionHead } from './components';
import {HeroWind} from './hero-wind';
import {SectionControls} from './section-controls';
import { ProcessSteps } from './process-steps';
import { BlogCards } from './blog/components';
import { publicPosts } from './server';
import { pageMetadata } from './seo';
export const metadata = pageMetadata('Odpadové hospodárstvo pre firmy', 'Dokumentácia, evidencia odpadov a odborné poradenstvo pre Vašu firmu. ENVI set – viac podnikania, menej starostí.', '/');
export const dynamic = 'force-dynamic';
export default async function Home(){const posts=await publicPosts();return <main id="main">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button></div></div></section>
 <section id="pomoc" className="help-section"><div className="container section"><h2>Riešenia, ktoré Vás <strong className="help-highlight">zbavia</strong> starostí s odpadovým hospodárstvom</h2><div className="help-icons">{[
  {slug:'odborna-dokumentacia',title:'Dokumentácia v oblasti odpadového hospodárstva'},
  {slug:'evidencia-odpadov',title:'Evidencia odpadov'},
  {slug:'nebezpecne-odpady',title:'Nebezpečné odpady'},
 ].map(s=><a href={`/sluzby/${s.slug}`} key={s.slug}><img className="help-service-image" src={`/images/services/${s.slug}.png?v=transparent` } alt="" width={800} height={570} loading="lazy"/><h3>{s.title}</h3></a>)}</div><div className="section-bottom"><Button href="/sluzby">Všetky riešenia</Button></div></div></section>

 <section id="spolupraca" className="meeting-intro"><div className="container meeting-layout"><div className="meeting-copy"><h2>Neviete, aké povinnosti sa týkajú Vašej firmy?</h2><p>Dohodnite si bezplatné stretnutie s naším špecialistom na odpadové hospodárstvo.</p></div><img src="/images/meeting-office.png" alt="Pracovný stôl s dokumentáciou, notebookom a zeleným zakladačom" width={854} height={577} loading="lazy"/></div></section>
 <section id="vyhody" className="container section meeting-benefits"><h2>Čo získate?</h2><ul>{[
  [ 'Podporu skúsených odborníkov', 's dlhoročnými znalosťami v oblasti odpadového hospodárstva.' ],
  [ 'Praktické a komplexné poradenstvo', 'prispôsobené potrebám Vašej firmy.' ],
  [ 'Úsporu času', 'a minimum administratívnej záťaže.' ],
  [ 'Vyššiu istotu a bezpečnosť', 'pri plnení zákonných povinností v oblasti životného prostredia.' ],
  [ 'Prevenciu problémov a zníženie rizika pokút', 'pri kontrolách zo strany štátnych orgánov.' ],
 ].map(([title,text])=><li key={title}><Check size={24} strokeWidth={2.5} aria-hidden="true"/><p><strong>{title}</strong> {text}</p></li>)}</ul></section>
 <section id="postup" className="container section process-section"><SectionHead label="" title="Ako prebieha spolupráca?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <SectionControls/></main>}
