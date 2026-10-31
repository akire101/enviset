'use client';
import {useEffect,useState} from 'react';
import {ArrowUp,ArrowDown} from 'lucide-react';
import {currentSection} from './section-navigation';
const sections=['uvod','pomoc','spolupraca','vyhody','postup','poradna'];
const topOffset=()=>Math.max(0,document.querySelector('.site-header')?.getBoundingClientRect().bottom??0)+12;
const positions=()=>sections.flatMap(id=>{const section=document.getElementById(id);return section?[section.getBoundingClientRect().top+window.scrollY]:[]});
export function SectionControls(){
 const [active,setActive]=useState(0);
 useEffect(()=>{const update=()=>setActive(currentSection(positions(),window.scrollY+topOffset()));update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[]);
 function move(direction:number){
  const tops=positions();const index=Math.max(0,Math.min(sections.length-1,currentSection(tops,window.scrollY+topOffset())+direction));
  window.scrollTo({top:Math.max(0,tops[index]-topOffset()),behavior:'auto'});
  setActive(index);
 }
 return <nav className="section-controls" aria-label="Rýchly prechod medzi sekciami"><button type="button" onClick={()=>move(-1)} disabled={active===0} aria-label="Predchádzajúca sekcia" title="Predchádzajúca sekcia"><ArrowUp size={23}/></button><button type="button" onClick={()=>move(1)} disabled={active===sections.length-1} aria-label="Nasledujúca sekcia" title="Nasledujúca sekcia"><ArrowDown size={23}/></button></nav>;
}
