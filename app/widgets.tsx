'use client';
import {LiveChat} from './live-chat';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {X,MessageCircle} from 'lucide-react';
export function Chatbot(){
 const [supportOnline,setSupportOnline]=useState(false),[open,setOpen]=useState(false),[autoOpened,setAutoOpened]=useState(false);const launch=useRef<HTMLButtonElement>(null),path=usePathname();
 const greeted=useRef(false),soundPending=useRef(false);
 useEffect(()=>{
  if(path.startsWith('/admin')||greeted.current)return;
  const key='envi_chat_greeted';
  try{if(sessionStorage.getItem(key))return}catch{}
  let audio:AudioContext|undefined,notified=false;
  const sound=()=>{
   if(!audio||audio.state!=='running'||notified||!soundPending.current)return;
   notified=true;soundPending.current=false;
   const oscillator=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
   oscillator.type='sine';oscillator.frequency.setValueAtTime(660,now);oscillator.frequency.setValueAtTime(880,now+.14);
   gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.07,now+.02);gain.gain.exponentialRampToValueAtTime(.001,now+.4);
   oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(now);oscillator.stop(now+.42);
  };
  const unlock=()=>{
   try{audio??=new AudioContext();void audio.resume().then(()=>{if(greeted.current)sound()}).catch(()=>{})}catch{}
  };
  const greet=()=>{
   if(greeted.current){clearInterval(timer);return;}
   if(document.visibilityState!=='visible'||document.querySelector('[role="dialog"],.analytics-consent,input:focus,textarea:focus,select:focus'))return;
   greeted.current=true;try{sessionStorage.setItem(key,'1')}catch{}
   soundPending.current=true;setAutoOpened(true);setOpen(true);sound();clearInterval(timer);
  };
  document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);
  const timer=setInterval(greet,8000);
  return()=>{clearInterval(timer);document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock);if(audio)void audio.close().catch(()=>{})};
 },[path]);
 useEffect(()=>{if(path.startsWith('/admin'))return;let stop=false;const refresh=()=>fetch('/api/chat').then(r=>r.ok?r.json() as Promise<{online?:boolean}>:null).then((d:{online?:boolean}|null)=>{if(!stop)setSupportOnline(d?.online===true)}).catch(()=>{if(!stop)setSupportOnline(false)});void refresh();const timer=setInterval(refresh,15000);return()=>{stop=true;clearInterval(timer)}},[path]);
 function close(){soundPending.current=false;setOpen(false);launch.current?.focus()}
 function openManually(){greeted.current=true;soundPending.current=false;try{sessionStorage.setItem('envi_chat_greeted','1')}catch{}setAutoOpened(false);setOpen(true)}
 if(path.startsWith('/admin'))return null;
 return <>{open&&<section className="chat-window" role="dialog" aria-label="Sprievodca ENVI set" onKeyDown={e=>{if(e.key==='Escape')close()}}><div className="chat-head"><img className="chat-brand-mark" src="/favicon.svg?v=14" width="32" height="32" alt="" aria-hidden="true"/><div><strong>Poradíme vám</strong><small>ENVI set · sprievodca a podpora</small></div><button aria-label="Zavrieť chat" onClick={close}><X size={19}/></button></div><LiveChat onAvailability={setSupportOnline} autoFocus={!autoOpened}/></section>}<button ref={launch} className={`chat-launch ${path==='/kontakt'?'contact-chat':''}`} aria-expanded={open} aria-label={open?'Zavrieť sprievodcu':'Otvoriť sprievodcu ENVI set'} onClick={()=>open?close():openManually()}><MessageCircle size={20}/><span>Poradíme vám</span>{supportOnline&&<span className="chat-online"><i aria-hidden="true"/>Online</span>}</button></>;
}
