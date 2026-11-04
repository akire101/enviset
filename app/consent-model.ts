export const consentVersion='2026-11-04';
export type ConsentChoice={value:'yes'|'no';version:string;chosenAt:number;expires:number};
export function parseConsent(raw:string|null,now=Date.now()):ConsentChoice|null{
 try{const value=JSON.parse(raw||'null');return value?.version===consentVersion&&['yes','no'].includes(value.value)&&Number.isFinite(value.chosenAt)&&value.chosenAt<=now&&value.expires>now&&value.expires<=value.chosenAt+180*86400000?value:null}catch{return null}
}
