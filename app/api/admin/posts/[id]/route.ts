import {requireArticleImage} from '../../../../article-image-server';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../../db';
import { posts } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { postSchema } from '../../../../validation';
import { api,adminBody,json } from '../../../../server';
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){return api(async()=>{
 const parsed=postSchema.safeParse(await adminBody(request));if(!parsed.success)return json({error:parsed.error.issues[0].message},400);
 const {id}=await params;const db=env.DB!;
 const old=await db.prepare('SELECT slug,updated_at,published_at FROM posts WHERE id = ?').bind(id).first<{slug:string;updated_at:number;published_at:number|null}>();
 if(!old)return json({error:'Článok sa nenašiel.'},404);
 if(parsed.data.updatedAt!==old.updated_at)return json({error:'Článok medzičasom upravil iný editor. Obnovte zoznam.'},409);
 const p=parsed.data;await requireArticleImage(p.image);const changed=p.slug!==old.slug;
 if(changed&&await db.prepare('SELECT slug FROM post_redirects WHERE slug = ?').bind(p.slug).first())return json({error:'Adresa je rezervovaná pre presmerovanie.'},409);
 const updated=Math.max(Date.now(),old.updated_at+1);const published=old.published_at||(p.status==='published'?updated:null);
 const update=db.prepare('UPDATE posts SET slug=?,title=?,excerpt=?,content=?,category=?,image=?,image_alt=?,seo_title=?,seo_description=?,status=?,updated_at=?,published_at=? WHERE id=? AND updated_at=? RETURNING id').bind(p.slug,p.title,p.excerpt,p.content,p.category,p.image,p.imageAlt,p.seoTitle,p.seoDescription,p.status,updated,published,id,old.updated_at);
 try{
  // D1 batch je transakčný; neúspešná úprava nezanechá presmerovanie.
  const statements=[update];if(changed&&old.published_at)statements.push(db.prepare('INSERT INTO post_redirects (slug,post_id) SELECT ?,id FROM posts WHERE id=? AND updated_at=? ON CONFLICT(slug) DO NOTHING').bind(old.slug,id,updated));
  const result=await db.batch(statements);if(!result[0].results.length)return json({error:'Súbežná úprava. Obnovte článok.'},409);
  return json((await getDb().select().from(posts).where(eq(posts.id,id)).limit(1))[0]);
 }catch(e){if(String(e).includes('UNIQUE'))return json({error:'Táto adresa už existuje.'},409);throw e;}
})}
