'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {flushSync} from 'react-dom';
import {Menu,X,ChevronDown,ArrowUpRight,ArrowRight} from 'lucide-react';
import {Logo,Icon} from './components';
import {PhoneStatus} from './phone-status';
import {services} from './content';

export function Header(){
 const [mobileOpen,setMobileOpen]=useState(false);
 const [servicesOpen,setServicesOpen]=useState(false);
 const hoverTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const desktopMouse=(type:string)=>type==='mouse'&&window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches;
 const clearHover=()=>{if(hoverTimer.current)clearTimeout(hoverTimer.current)};
 useEffect(()=>()=>clearHover(),[]);
 const path=usePathname();
 const root=useRef<HTMLElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const toggle=useRef<HTMLButtonElement>(null);
 const panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!servicesOpen&&!mobileOpen)return;
  const outside=(event:Event)=>{if(root.current&&!root.current.contains(event.target as Node)){setServicesOpen(false);setMobileOpen(false)}};
  document.addEventListener('pointerdown',outside,true);
  document.addEventListener('click',outside,true);
  return()=>{document.removeEventListener('pointerdown',outside,true);document.removeEventListener('click',outside,true)};
 },[servicesOpen,mobileOpen]);
 function escape(event:React.KeyboardEvent){
  if(event.key!=='Escape')return;
  event.preventDefault();event.stopPropagation();
  if(servicesOpen){setServicesOpen(false);trigger.current?.focus({preventScroll:true})}
  else if(mobileOpen){setMobileOpen(false);toggle.current?.focus({preventScroll:true})}
 }
 const active=(href:string)=>path===href||(href!=='/'&&path.startsWith(href+'/'));
 const close=()=>{setServicesOpen(false);setMobileOpen(false)};
 return <header ref={root} className="site-header container modern-header" onKeyDown={escape} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))close()}}>
  <Logo/>
  <nav id="navigation" className={`nav ${mobileOpen?'open':''}`} aria-label="Hlavná navigácia">
   <a href="/" className={active('/')?'active':''} aria-current={active('/')?'page':undefined}>Domov</a>
   <a href="/o-nas" className={active('/o-nas')?'active':''} aria-current={active('/o-nas')?'page':undefined}>O nás</a>
   <div className="services-disclosure" onPointerEnter={event=>{if(desktopMouse(event.pointerType)){clearHover();setServicesOpen(true)}}} onPointerLeave={event=>{if(desktopMouse(event.pointerType)){clearHover();hoverTimer.current=setTimeout(()=>{if(!panel.current?.contains(document.activeElement))setServicesOpen(false)},180)}}}>
    <button ref={trigger} type="button" className={`services-trigger ${active('/sluzby')?'active':''}`} aria-expanded={servicesOpen} aria-controls="services-dropdown" onClick={event=>{clearHover();setServicesOpen(event.detail>0&&desktopMouse('mouse')?true:!servicesOpen)}} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();flushSync(()=>setServicesOpen(true));panel.current?.querySelector<HTMLAnchorElement>('a')?.focus({preventScroll:true})}}}>Služby<ChevronDown size={15} aria-hidden="true"/></button>
    <div ref={panel} id="services-dropdown" className={`services-panel ${servicesOpen?'is-open':''}`} aria-hidden={!servicesOpen} inert={!servicesOpen}>
     <div className="dropdown-main"><div className="dropdown-heading"><a href="/sluzby" onClick={close}>Všetky služby<ArrowUpRight size={16}/></a></div>
      <div className="dropdown-grid">{services.map(service=><a key={service.slug} href={`/sluzby/${service.slug}`} className="dropdown-service" onClick={close} aria-current={path===`/sluzby/${service.slug}`?'page':undefined}><span className="dropdown-icon"><Icon name={service.icon} size={23}/></span><span><strong>{service.title}</strong></span><ArrowUpRight className="dropdown-arrow" size={16}/></a>)}</div>
     </div>

    </div>
   </div>
   <a href="/blog" className={active('/blog')?'active':''} aria-current={active('/blog')?'page':undefined}>Blog / Poradňa</a>
   <a href="/kontakt" className={active('/kontakt')?'active':''} aria-current={active('/kontakt')?'page':undefined}>Kontakt</a>
  </nav>
  <a className="button header-cta" href="tel:+421902469908">+421 902 469 908<PhoneStatus/></a>
  <button ref={toggle} className="mobile-toggle" aria-label={mobileOpen?'Zavrieť menu':'Otvoriť menu'} aria-controls="navigation" aria-expanded={mobileOpen} onClick={()=>{setMobileOpen(!mobileOpen);setServicesOpen(false)}}>{mobileOpen?<X size={22}/>:<Menu size={22}/>}</button>
 </header>;
}
