import {about} from '../content';
import {pageMetadata} from '../seo';
export const metadata=pageMetadata('O nás – náš príbeh','ENVI set vznikla v roku 2024. Odborné poradenstvo, osobný prístup a zodpovedné odpadové hospodárstvo pre firmy.','/o-nas');
export default function About(){return <main id="main" className="container about-text about-with-portrait"><h1>O nás</h1><div className="about-story"><div className="about-story-copy">{about.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div><figure className="about-portrait"><img src="/images/about-portrait.webp" alt="Portrét predstaviteľa ENVI set" width="900" height="1128"/></figure></div></main>}
