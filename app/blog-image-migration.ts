import {env} from 'cloudflare:workers';
let ready:Promise<unknown>|undefined;
const replacements=[
 ['odpadove-hospodarstvo-v-praxi','nature-river','Lesný potok medzi kameňmi a prirodzenými brehmi'],
 ['nebezpecny-odpad-v-prevadzke','nature-beech','Chodník v bukovom lese na začiatku jesene'],
 ['ako-sa-pripravit-na-konzultaciu','nature-wetland','Pokojná mokraď s trstinou a brehovou vegetáciou'],
 ['odpadove-hospodarstvo-kde-zacat','nature-leaves','Detail mladých bukových listov']
];
// One-time content update: subsequent editorial image choices remain untouched.
export async function ensureBlogImages(){
 if(!ready){const db=env.DB!;ready=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS site_updates (name TEXT PRIMARY KEY)'),
 ...replacements.map(([slug,image,alt])=>db.prepare("UPDATE posts SET image=?,image_alt=?,updated_at=? WHERE slug=? AND image IN ('/images/forest.webp','/images/meadow.webp','/images/valley.webp','/images/hills.webp') AND NOT EXISTS(SELECT 1 FROM site_updates WHERE name='v15-blog-images')").bind('/images/'+image+'.webp',alt,Date.now(),slug)),
 db.prepare("INSERT OR IGNORE INTO site_updates(name) VALUES('v15-blog-images')")
 ]).catch(e=>{ready=undefined;throw e})}await ready;
}
