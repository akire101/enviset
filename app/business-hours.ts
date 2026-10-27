export function isOfficeOpen(date:Date){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bratislava',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
 const part=(name:string)=>parts.find(p=>p.type===name)!.value;
 const minutes=Number(part('hour'))*60+Number(part('minute'));
 // shortcut: regular weekly hours; add dated exceptions when the company supplies holiday closures.
 return !['Sat','Sun'].includes(part('weekday'))&&minutes>=480&&minutes<1020;
}
