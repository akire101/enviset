'use client';

import { CalendarDays } from 'lucide-react';
import { brand } from './content';

export function MeetingCallButton(){return <a className="button secondary meeting-form-link" href={`tel:${brand.contacts.phone.replace(/\s/g,'')}`} aria-controls="meeting-phone" onClick={event=>{if(window.matchMedia('(min-width: 761px)').matches){const panel=document.getElementById('meeting-phone');if(panel){event.preventDefault();panel.showPopover();}}}}><CalendarDays size={19} aria-hidden="true"/>Dohodnúť osobné stretnutie</a>}
