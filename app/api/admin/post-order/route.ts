import {api,adminBody,isAdmin,json} from '../../../server';
import {postOrderSchema} from '../../../post-order';
import {postOrderDb,readPostOrder} from '../../../post-order-server';
export const dynamic='force-dynamic';
export async function GET(){return api(async()=>{if(!await isAdmin())return json({error:'Prihlásenie je potrebné.'},401);return json(await readPostOrder())})}
export async function PUT(request:Request){return api(async()=>{
 const parsed=postOrderSchema.safeParse(await adminBody(request));if(!parsed.success)return json({error:'Neplatné poradie článkov.'},400);
 const db=await postOrderDb();const {order,pinned,revision}=parsed.data;const rows=await db.prepare('SELECT id FROM posts').all<{id:string}>();const ids=new Set(rows.results.map(p=>p.id));
 if(order.some(id=>!ids.has(id)))return json({error:'Zoznam článkov sa zmenil. Obnovte stránku.'},409);
 const result=await db.prepare('UPDATE post_order SET value=?,revision=revision+1 WHERE id=1 AND revision=? RETURNING revision').bind(JSON.stringify({order,pinned}),revision).first<{revision:number}>();
 if(!result)return json({error:'Poradie zmenil iný editor. Obnovte stránku.'},409);
 return json({...parsed.data,revision:result.revision});
})}
