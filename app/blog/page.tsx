import { PageHero, CTA } from '../components';
import { publicPosts } from '../server';
import { BlogBrowser } from './browser';
import { pageMetadata } from '../seo';
export const dynamic='force-dynamic';
export const metadata=pageMetadata('Blog – užitočné čítanie','Praktické články o odpadovom hospodárstve pre firmy. Evidencia, nebezpečné odpady a príprava na odbornú konzultáciu.','/blog');
export default async function Blog(){return <main id="main"><PageHero label="Blog" title="Témy, o ktorých sa oplatí diskutovať." text="Prinášame aktuálne informácie, praktické rady a témy z každodennej praxe."/><section className="container section compact"><BlogBrowser posts={await publicPosts()}/></section><CTA/></main>}
