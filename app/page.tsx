import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button, CTA, SectionHead, ServiceCards, Icon } from './components';
import {HeroWind} from './hero-wind';
import {FaqItem} from './faq-item';
import {SectionControls} from './section-controls';
import { services } from './content';
import { clientFaqs } from './client-content';
import { ProcessSteps } from './process-steps';
import { BlogCards } from './blog/components';
import { publicPosts } from './server';
import { pageMetadata } from './seo';
export const metadata = pageMetadata('Odpadové hospodárstvo pre firmy', 'Dokumentácia, evidencia odpadov a odborné poradenstvo pre Vašu firmu. ENVI set – viac podnikania, menej starostí.', '/');
export const dynamic = 'force-dynamic';
export default async function Home(){const posts=await publicPosts();return <main id="main">
 <section id="uvod" className="hero"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Odpady sú koncom<br/> jedného procesu, ale<br/> zodpovednosťou sa začína ten ďalší.</h1><p>Pomáhame firmám zbaviť sa administratívnej záťaže a starostí spojených s plnením zákonných povinností.</p><div className="hero-actions"><Button>Nezáväzný dopyt</Button><a href="/sluzby" className="hero-link">Naše služby <ArrowUpRight size={20}/></a></div></div><a className="hero-next" href="#pomoc">Riešenia pre Vašu firmu <ArrowDown size={20}/></a></section>
 <section id="pomoc" className="help-section"><div className="container section"><h2>Riešenia, ktoré Vás <strong className="help-highlight">zbavia</strong> starostí s odpadovým hospodárstvom</h2><div className="help-icons">{services.filter(s=>!['riesenia-pre-firmy','dlhodoba-spolupraca'].includes(s.slug)).map(s=><a href={`/sluzby/${s.slug}`} key={s.slug}><Icon name={s.icon} size={64}/><h3>{s.slug==='nebezpecne-odpady'?'Nebezpečné odpady':s.title}</h3></a>)}</div><div className="section-bottom"><Button href="/sluzby#popis-sluzieb">Získať viac</Button></div></div></section>
 <section id="sluzby" className="container section"><SectionHead label="" title="Komplexné riešenia odpadového hospodárstva"/><ServiceCards/></section>
 <section id="spolupraca" className="container section process-section"><SectionHead label="" title="Ako prebieha spolupráca?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <section id="faq" className="container section faq-layout"><h2 className="faq-title">Čo vás zaujíma?</h2><div className="faq">{clientFaqs.map(([q,a])=><FaqItem key={q} question={q} answer={a}/>)}</div><a href="/kontakt#formular" className="text-link faq-contact">Mám inú otázku <ArrowUpRight size={18}/></a></section><div id="kontakt"><CTA/></div>
 <SectionControls/></main>}
