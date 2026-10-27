'use client';
import {useEffect,useState} from 'react';
import {isOfficeOpen} from './business-hours';
export function PhoneStatus(){
 const [open,setOpen]=useState<boolean|null>(null);
 useEffect(()=>{const update=()=>setOpen(isOfficeOpen(new Date()));update();const timer=setInterval(update,30000);document.addEventListener('visibilitychange',update);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',update)}},[]);
 return <span className={`phone-status ${open===null?'pending':open?'available':'closed'}`}><span className="status-dot" aria-hidden="true"/>{open===null?'Po–Pi 08:00–17:00':open?'Linka dostupná':'Mimo pracovných hodín'}</span>;
}
