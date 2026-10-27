'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import type {AnalyticsPayload} from './analytics-model';
let reloadChecked=false;
const consentKey='envi_analytics_consent';
const blocked=()=>navigator.doNotTrack==='1'||Boolean((navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl);
function readChoice(){try{const saved=JSON.parse(localStorage.getItem(consentKey)||'null');return saved?.expires>Date.now()?saved.value as 'yes'|'no':null}catch{return null}}
function startTracking(path:string){
 const now=Date.now();let visitor:string,session:string;
 try{
  const v=JSON.parse(localStorage.getItem('envi_analytics_visitor')||'null');visitor=v?.expires>now?v.id:crypto.randomUUID();localStorage.setItem('envi_analytics_visitor',JSON.stringify({id:visitor,expires:v?.expires>now?v.expires:now+400*86400000}));
  const s=JSON.parse(sessionStorage.getItem('envi_analytics_session')||'null');session=s?.time>now-1800000?s.id:crypto.randomUUID();sessionStorage.setItem('envi_analytics_session',JSON.stringify({id:session,time:now}));
 }catch{return ()=>{}}
 const data:AnalyticsPayload={consent:true,id:crypto.randomUUID(),visitor,session,path,device:innerWidth<=760?'mobile':'desktop',sequence:0,seconds:0,depth:0,sections:[],targets:[],points:[]};
 const privateArea=(el:Element)=>!!el.closest('form,input,textarea,select,[contenteditable],.chat-window,.analytics-consent,.analytics-settings');
 const targets=[...document.querySelectorAll<HTMLElement>('a,button,summary')].filter(e=>!privateArea(e)&&!e.closest('.section-controls')).slice(0,100);
 data.targets=targets.map((el,i)=>({key:'target-'+i,label:(el.getAttribute('aria-label')||el.textContent||el.tagName).trim().replace(/\s+/g,' ').slice(0,100)||'Odkaz',clicks:0,seen:false}));
 const sections=[...document.querySelectorAll<HTMLElement>('main section,main article,main .page-hero')].filter(e=>!e.parentElement?.closest('main section,main article')).slice(0,40);
 data.sections=sections.map((el,i)=>({key:el.id||'section-'+i,label:(el.querySelector('h1,h2')?.textContent||el.id||'Obsah '+(i+1)).trim().slice(0,100),seconds:0}));
 let lastActivity=Date.now(),lastTick=Date.now(),lastMove=0,stopped=false;
 const visible=(el:HTMLElement)=>{const r=el.getBoundingClientRect();return r.height>0&&r.width>0&&r.bottom>(el.closest('.site-header,.mobile-contact')?0:140)&&r.top<innerHeight&&getComputedStyle(el).visibility!=='hidden'};
 function measure(){data.depth=Math.max(data.depth,Math.min(100,Math.round((scrollY+innerHeight)/Math.max(document.documentElement.scrollHeight,1)*100)));targets.forEach((el,i)=>{if(visible(el))data.targets[i].seen=true})}
 function point(e:MouseEvent,kind:'clicks'|'moves'){
  if(!(e.target instanceof Element)||privateArea(e.target))return;
  const x=Math.min(19,Math.max(0,Math.floor(e.pageX/Math.max(document.documentElement.scrollWidth,1)*20))),y=Math.min(99,Math.max(0,Math.floor(e.pageY/Math.max(document.documentElement.scrollHeight,1)*100)));
  let p=data.points.find(p=>p.x===x&&p.y===y);if(!p&&data.points.length<400){p={x,y,clicks:0,moves:0};data.points.push(p)}if(p)p[kind]++;
 }
 function click(e:MouseEvent){lastActivity=Date.now();point(e,'clicks');const i=targets.findIndex(el=>el===e.target||el.contains(e.target as Node));if(i>=0){data.targets[i].clicks++;data.targets[i].seen=true}}
 function move(e:PointerEvent){if(e.pointerType!=='mouse')return;lastActivity=Date.now();if(Date.now()-lastMove>750){lastMove=Date.now();point(e,'moves')}}
 const activity=()=>{lastActivity=Date.now()};
 function tick(){const now=Date.now();const seconds=Math.min(5,Math.floor((now-lastTick)/1000));lastTick=now;if(document.visibilityState!=='visible'||!document.hasFocus()||now-lastActivity>60000)return;
 data.seconds=Math.min(14400,data.seconds+seconds);measure();
 let best=-1,area=0;sections.forEach((el,i)=>{const r=el.getBoundingClientRect();const a=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(140,r.top));if(a>area){area=a;best=i}});if(best>=0)data.sections[best].seconds+=seconds;
 try{sessionStorage.setItem('envi_analytics_session',JSON.stringify({id:session,time:now}))}catch{}
 }
 function flush(){if(stopped||readChoice()!=='yes'||blocked())return;data.sequence++;measure();const payload=JSON.stringify(data);if(!navigator.sendBeacon('/api/analytics',new Blob([payload],{type:'application/json'})))void fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true}).catch(()=>{})}
 const hide=()=>{if(document.visibilityState==='hidden'){tick();flush()}};
 measure();flush();const timer=setInterval(tick,5000),send=setInterval(flush,15000);
 document.addEventListener('click',click);document.addEventListener('pointermove',move,{passive:true});document.addEventListener('touchstart',activity,{passive:true});document.addEventListener('keydown',activity);window.addEventListener('scroll',activity,{passive:true});document.addEventListener('visibilitychange',hide);window.addEventListener('pagehide',flush);
 return ()=>{flush();stopped=true;clearInterval(timer);clearInterval(send);document.removeEventListener('click',click);document.removeEventListener('pointermove',move);document.removeEventListener('touchstart',activity);document.removeEventListener('keydown',activity);window.removeEventListener('scroll',activity);document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',flush)};
}
export function AnalyticsConsent({admin=false}:{admin?:boolean}){
 const path=usePathname();const [choice,setChoice]=useState<'yes'|'no'|null>(null),[ready,setReady]=useState(false),[settings,setSettings]=useState(false),[privacy,setPrivacy]=useState(false);
 useEffect(()=>{if(!reloadChecked){reloadChecked=true;if((performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type==='reload'){try{localStorage.removeItem(consentKey)}catch{}}}setChoice(readChoice());setPrivacy(blocked());setReady(true);const sync=()=>setChoice(readChoice());window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[]);
 useEffect(()=>{if(!ready||admin||path.startsWith('/admin')||choice!=='yes'||privacy)return;return startTracking(path)},[path,choice,ready,admin,privacy]);
 function choose(value:'yes'|'no'){try{localStorage.setItem(consentKey,JSON.stringify({value,version:'2026-10-27',chosenAt:Date.now(),expires:Date.now()+180*86400000}));if(value==='no'){localStorage.removeItem('envi_analytics_visitor');sessionStorage.removeItem('envi_analytics_session')}}catch{}setChoice(value);setSettings(false)}
 if(!ready||admin||path.startsWith('/admin'))return null;
 return <><div className="analytics-settings container"><button type="button" className="text-link" onClick={()=>setSettings(!settings)}>Nastavenia súkromia</button>{choice==='yes'&&<button type="button" className="text-link" onClick={()=>choose('no')}>Vypnúť meranie</button>}</div>{(settings||!choice)&&<aside className="analytics-consent" aria-label="Meranie návštevnosti"><h2>Cookies a meranie návštevnosti</h2><p>ENVI set používa nevyhnutné technológie na fungovanie webu. S vaším súhlasom používame aj analytické úložisko a meriame navštívené stránky, kliknutia, pohyb myši, rolovanie a čas v sekciách, aby sme web zlepšovali.</p><p>Analytika nezaznamenáva obsah formulárov ani chatov. Odmietnutie neobmedzí používanie webu. Súhlas môžete kedykoľvek odvolať cez „Nastavenia súkromia“ v pätičke. <a href="/cookies">Podrobnosti o cookies a meraní</a></p>{privacy?<p>Váš prehliadač žiada nesledovanie. Meranie je vypnuté.</p>:<div><button className="button secondary" onClick={()=>choose('no')}>Odmietnuť voliteľné meranie</button><button className="button" onClick={()=>choose('yes')}>Povoliť analytiku a sledovanie myši</button></div>}{settings&&<button className="text-link" onClick={()=>setSettings(false)}>Zavrieť nastavenia</button>}</aside>}</>;
}
