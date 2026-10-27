'use client';
import {useEffect,useRef} from 'react';
const mask='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="g" cx="61%" cy="80%" r="14%"><stop offset="0%" stop-color="white"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>');
export function HeroWind(){
 const svg=useRef<SVGSVGElement>(null),image=useRef<HTMLImageElement>(null),plantMask=useRef<SVGFEImageElement>(null);
 useEffect(()=>{
  const positionPlant=()=>{const el=image.current;if(!el)return;const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const scale=Math.max(w/1848,h/806),x=1130*scale-(1848*scale-w)/2,y=650*scale-(806*scale-h)/2;
  // Follow the supplied plant through object-fit: cover crops on mobile and desktop.
  const markup='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><defs><radialGradient id="p" gradientUnits="userSpaceOnUse" cx="'+x+'" cy="'+y+'" r="'+(175*scale)+'"><stop offset="0%" stop-color="white"/><stop offset="35%" stop-color="white" stop-opacity=".9"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>';plantMask.current?.setAttribute('href','data:image/svg+xml,'+encodeURIComponent(markup))};
  const resize=new ResizeObserver(positionPlant);if(image.current)resize.observe(image.current);positionPlant();
  const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;
  const update=()=>{if(media.matches||!visible||document.hidden)svg.current?.pauseAnimations();else svg.current?.unpauseAnimations()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});if(image.current)observer.observe(image.current);
  media.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
  return()=>{resize.disconnect();observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
 },[]);
 return <><svg ref={svg} className="wind-filter" aria-hidden="true"><defs><filter id="hero-breeze" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".008 .025" numOctaves="1" seed="8" result="noise"><animate attributeName="baseFrequency" values=".008 .025;.009 .022;.008 .025" dur="7s" repeatCount="indefinite"/></feTurbulence>
  <feImage ref={plantMask} href={mask} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mask"/>
  <feComposite in="noise" in2="mask" operator="in" result="masked"/>
  <feFlood floodColor="#808080" result="neutral"/>
  <feComposite in="masked" in2="neutral" operator="over" result="field"/>
  <feDisplacementMap in="SourceGraphic" in2="field" scale="22" xChannelSelector="R" yChannelSelector="G"/>
 </filter></defs></svg><img ref={image} className="hero-image hero-breeze" src="/images/front_picture.webp" width="1848" height="806" alt="Ranné slnko nad zeleným lesom a horským jazerom" fetchPriority="high"/></>;
}
