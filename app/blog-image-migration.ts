import {env} from 'cloudflare:workers';
let ready:Promise<unknown>|undefined;
const replacements=[
 ['odpadove-hospodarstvo-v-praxi','odpad-obr2','Triedenie plastových a kovových odpadov v prevádzke'],
 ['nebezpecny-odpad-v-prevadzke','odpad-obr1','Obaly, akumulátory a ďalšie odpady v sklade'],
 ['ako-sa-pripravit-na-konzultaciu','odpad-obr3','Doklady a kalendár pripravené na pracovnom stole'],
 ['odpadove-hospodarstvo-kde-zacat','odpad-obr4','Zelená horská krajina']
];
// One-time content update: subsequent editorial image choices remain untouched.
export async function ensureBlogImages(){
 if(!ready){const db=env.DB!;ready=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS site_updates (name TEXT PRIMARY KEY)'),
 ...replacements.map(([slug,image,alt])=>db.prepare("UPDATE posts SET image=?,image_alt=?,updated_at=? WHERE slug=? AND image IN ('/images/forest.webp','/images/meadow.webp','/images/valley.webp','/images/hills.webp','/images/nature-river.webp','/images/nature-beech.webp','/images/nature-wetland.webp','/images/nature-leaves.webp') AND NOT EXISTS(SELECT 1 FROM site_updates WHERE name='v16-supplied-images')").bind('/images/'+image+'.webp',alt,Date.now(),slug)),
 db.prepare("INSERT OR IGNORE INTO site_updates(name) VALUES('v16-supplied-images')")
 ]).catch(e=>{ready=undefined;throw e})}await ready;
}
