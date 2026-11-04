import {z} from 'zod';
const postId=z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/);
export const postOrderSchema=z.object({order:z.array(postId).max(2000),pinned:z.array(postId).max(2000),revision:z.number().int().nonnegative()}).strict().superRefine((value,ctx)=>{
 if(new Set(value.order).size!==value.order.length||new Set(value.pinned).size!==value.pinned.length||value.pinned.some(id=>!value.order.includes(id)))ctx.addIssue({code:'custom',message:'Neplatné poradie článkov.'});
});
export type PostOrder=z.infer<typeof postOrderSchema>;
export function orderPosts<T extends {id:string;status:string;publishedAt:number|null}>(posts:T[],settings:PostOrder){
 const rank=new Map(settings.order.map((id,index)=>[id,index]));const pinned=new Set(settings.pinned);
 return [...posts].sort((a,b)=>Number(pinned.has(b.id))-Number(pinned.has(a.id))||(rank.get(a.id)??Infinity)-(rank.get(b.id)??Infinity)||(b.publishedAt??0)-(a.publishedAt??0)||a.id.localeCompare(b.id));
}
export function homepagePosts<T extends {id:string;status:string;publishedAt:number|null}>(posts:T[],settings:PostOrder){return orderPosts(posts.filter(p=>p.status==='published'),settings).slice(0,3)}
