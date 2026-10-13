import { siteUrl } from './seo';
import { publicPosts } from './server';
import { services } from './content';
export const dynamic='force-dynamic';
export default async function sitemap(){const base=siteUrl();if(!base)return [];return [...['/','/o-nas','/sluzby','/blog','/kontakt',...services.map(s=>'/sluzby/'+s.slug)].map(p=>({url:base+p})),...(await publicPosts()).map(p=>({url:base+'/blog/'+p.slug,lastModified:new Date(p.updatedAt)}))];}
