'use client';
import {LiveChat} from './live-chat';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {X,MessageCircle,Leaf} from 'lucide-react';
export function Chatbot(){
 const [supportOnline,setSupportOnline]=useState(false),[open,setOpen]=useState(false);const launch=useRef<HTMLButtonElement>(null),path=usePathname();
 useEffect(()=>{if(path.startsWith('/admin'))return;let stop=false;const refresh=()=>fetch('/api/chat').then(r=>r.ok?r.json() as Promise<{online?:boolean}>:null).then((d:{online?:boolean}|null)=>{if(!stop)setSupportOnline(d?.online===true)}).catch(()=>{if(!stop)setSupportOnline(false)});void refresh();const timer=setInterval(refresh,15000);return()=>{stop=true;clearInterval(timer)}},[path]);
 function close(){setOpen(false);launch.current?.focus()}
 if(path.startsWith('/admin'))return null;
 return <>{open&&<section className="chat-window" role="dialog" aria-label="Sprievodca ENVI set" onKeyDown={e=>{if(e.key==='Escape')close()}}><div className="chat-head"><Leaf size={25}/><div><strong>Poradíme vám</strong><small>ENVI set · sprievodca a podpora</small></div><button aria-label="Zavrieť chat" onClick={close}><X size={19}/></button></div><LiveChat onAvailability={setSupportOnline}/></section>}<button ref={launch} className={`chat-launch ${path==='/kontakt'?'contact-chat':''}`} aria-expanded={open} aria-label={open?'Zavrieť sprievodcu':'Otvoriť sprievodcu ENVI set'} onClick={()=>open?close():setOpen(true)}><MessageCircle size={20}/><span>Poradíme vám</span>{supportOnline&&<span className="chat-online"><i aria-hidden="true"/>Online</span>}</button></>;
}
