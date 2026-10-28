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
 <section id="uvod" className="hero container"><HeroWind/><div className="hero-shade"/><div className="hero-content"><h1>Viac podnikania.<br/> Menej starostí s odpadmi.</h1><p>Dokumentácia, evidencia a poradenstvo pre Vašu firmu. Od prvého posúdenia po celoročnú podporu.</p><div className="hero-actions"><Button>Bezplatná konzultácia</Button><a href="/sluzby" className="hero-link">Naše služby <ArrowUpRight size={20}/></a></div></div><a className="hero-next" href="#pre-koho">Pre koho sú naše služby <ArrowDown size={20}/></a></section>
 <section id="pre-koho" className="container section audience-section"><h2>Pre koho sú naše služby určené?</h2><p className="audience-summary"><a href="/sluzby">Pomáhame firmám vo výrobe, obchode aj službách. Či máte dielňu, reštauráciu alebo kanceláriu, pomôžeme aj Vám. Stačí, že pri Vašej činnosti vzniká odpad.</a></p></section>
 <section id="pomoc" className="help-section"><div className="container section"><h2>S čím Vám vieme pomôcť?</h2><div className="help-icons">{services.filter(s=>!['riesenia-pre-firmy','dlhodoba-spolupraca'].includes(s.slug)).map(s=><a href={`/sluzby/${s.slug}`} key={s.slug}><Icon name={s.icon} size={64}/><h3>{s.slug==='nebezpecne-odpady'?'Nebezpečné odpady':s.title}</h3></a>)}</div></div></section>
 <section id="sluzby" className="container section"><SectionHead label="" title="Komplexné riešenia odpadového hospodárstva"/><ServiceCards/></section>
 <section id="spolupraca" className="container section process-section"><SectionHead label="" title="Ako prebieha spolupráca?"/><ProcessSteps/></section>
 <section id="poradna" className="container section"><SectionHead label="" title="Prakticky o odpadoch"/><BlogCards posts={posts.slice(0,3)}/><div className="section-bottom"><a href="/blog" className="text-link">Všetky články <ArrowUpRight size={18}/></a></div></section>
 <section id="faq" className="container section faq-layout"><h2 className="faq-title">Čo vás zaujíma?</h2><div className="faq">{clientFaqs.map(([q,a])=><FaqItem key={q} question={q} answer={a}/>)}</div><a href="/kontakt#formular" className="text-link faq-contact">Mám inú otázku <ArrowUpRight size={18}/></a></section><div id="kontakt"><CTA/></div>
 <SectionControls/></main>}
