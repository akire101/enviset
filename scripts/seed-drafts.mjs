import {writeFileSync} from 'node:fs';
import {seedPosts} from '../app/content.ts';
const quote=s=>"'"+s.replaceAll("'","''")+"'";
const now=Date.now();
writeFileSync(new URL('../drafts.sql',import.meta.url),seedPosts.map((p,i)=>`INSERT OR IGNORE INTO posts (id,slug,title,excerpt,content,category,image,status,created_at,updated_at) VALUES (${["initial-draft-"+i,p.slug,p.title,p.excerpt,p.content,p.category,p.image,'draft'].map(quote).join(',')},${now},${now});`).join('\n'));
console.log('Tri koncepty pripravené v drafts.sql; verejne sa nezverejňujú.');
