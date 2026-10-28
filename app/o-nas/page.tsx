import {about} from '../content';
import {pageMetadata} from '../seo';
export const metadata=pageMetadata('O nás – náš príbeh','ENVI set vznikla v roku 2024. Odborné poradenstvo, osobný prístup a zodpovedné odpadové hospodárstvo pre firmy.','/o-nas');
export default function About(){return <main id="main" className="container about-text"><h1>O nás</h1><div>{about.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div><img src="/images/valley.webp" alt="Zelené údolie pod horským hrebeňom" width="838" height="407" loading="lazy"/></main>}
