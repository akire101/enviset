import { siteUrl } from './seo';
export default function robots(){const base=siteUrl();return {rules:base?{userAgent:'*',allow:'/',disallow:['/admin','/api/','/ochrana-sukromia']}:{userAgent:'*',disallow:'/'},...(base?{sitemap:base+'/sitemap.xml'}:{})};}
