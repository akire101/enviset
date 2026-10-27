'use client';
import {usePathname} from 'next/navigation';
import {Phone, Mail} from 'lucide-react';
export function MobileContact(){const path=usePathname();if(path.startsWith('/admin'))return null;return <nav className="mobile-contact" aria-label="Rýchly kontakt"><a href="/kontakt#formular"><Mail size={19}/><span>Bezplatná konzultácia</span></a><a href="tel:+421902469908"><Phone size={19}/><span>Zavolaj</span></a></nav>}
