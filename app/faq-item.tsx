'use client';
import {useId,useState} from 'react';
export function FaqItem({question,answer}:{question:string;answer:string}){
 const [open,setOpen]=useState(false);
 const id=useId();
 return <div className="faq-item" data-open={open}>
  <button type="button" className="faq-question" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}>{question}<span aria-hidden="true">+</span></button>
  <div id={id} className="faq-answer" inert={!open} aria-hidden={!open}><div><p>{answer}</p></div></div>
 </div>;
}
