'use client';
import {usePathname} from 'next/navigation';
import {Phone, Mail} from 'lucide-react';
export function MobileContact(){const path=usePathname();if(path.startsWith('/admin'))return null;return <nav className="mobile-contact" aria-label="Rýchly kontakt"><a href={path==='/'?'tel:+421902469908':'/kontakt#formular'}>{path==='/'?<Phone size={19}/>:<Mail size={19}/>}<span>{path==='/'?'Bezplatné stretnutie':'Bezplatná konzultácia'}</span></a><a href="tel:+421902469908"><Phone size={19}/><span>+421 902 469 908</span></a></nav>}
