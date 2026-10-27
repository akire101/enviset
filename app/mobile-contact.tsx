'use client';
import {usePathname} from 'next/navigation';
import {PhoneStatus} from './phone-status';
import {Phone, Mail} from 'lucide-react';
export function MobileContact(){const path=usePathname();if(path.startsWith('/admin'))return null;return <nav className="mobile-contact" aria-label="Rýchly kontakt"><a href="tel:+421902469908"><Phone size={19}/>Zavolať<PhoneStatus/></a><a href="/kontakt#formular"><Mail size={19}/>Poslať dopyt</a></nav>}
