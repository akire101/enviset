'use client';
import {useEffect,useRef} from 'react';
const mask='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="g" cx="92%" cy="83%" r="30%"><stop offset="0%" stop-color="white"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>');
export function HeroWind(){
 const svg=useRef<SVGSVGElement>(null),image=useRef<HTMLImageElement>(null);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;
  const update=()=>{if(media.matches||!visible||document.hidden)svg.current?.pauseAnimations();else svg.current?.unpauseAnimations()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});if(image.current)observer.observe(image.current);
  media.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
  return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
 },[]);
 return <><svg ref={svg} className="wind-filter" aria-hidden="true"><defs><filter id="hero-breeze" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".008 .025" numOctaves="1" seed="8" result="noise"><animate attributeName="baseFrequency" values=".008 .025;.009 .022;.008 .025" dur="12s" repeatCount="indefinite"/></feTurbulence>
  <feImage href={mask} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mask"/>
  <feComposite in="noise" in2="mask" operator="in" result="masked"/>
  <feFlood floodColor="#808080" result="neutral"/>
  <feComposite in="masked" in2="neutral" operator="over" result="field"/>
  <feDisplacementMap in="SourceGraphic" in2="field" scale="7" xChannelSelector="R" yChannelSelector="G"/>
 </filter></defs></svg><img ref={image} className="hero-image hero-breeze" src="/images/front_picture.webp" width="1848" height="806" alt="Ranné slnko nad zeleným lesom a horským jazerom" fetchPriority="high"/></>;
}
