import {Fragment} from 'react';

export function MessageText({text}:{text:string}){
 const parts:React.ReactNode[]=[];let offset=0;
 for(const match of text.matchAll(/\b(?:https?:\/\/|www\.)[^\s<>"']+/gi)){
  const start=match.index!,label=match[0].replace(/[.,;:!?\)\]\}]+$/,'');
  let href='';try{const url=new URL(/^www\./i.test(label)?'https://'+label:label);if(['http:','https:'].includes(url.protocol))href=url.href}catch{}
  parts.push(text.slice(offset,start));
  parts.push(href?<a href={href} target="_blank" rel="noopener noreferrer" key={start}>{label}</a>:label);
  offset=start+label.length;
 }
 parts.push(text.slice(offset));return <>{parts.map((part,i)=><Fragment key={i}>{part}</Fragment>)}</>;
}
