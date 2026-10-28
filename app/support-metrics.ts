export function responseSummary(values:number[]){
 const sorted=values.filter(v=>Number.isFinite(v)&&v>=0).sort((a,b)=>a-b),n=sorted.length;
 return {answered:n,mean:n?sorted.reduce((s,v)=>s+v,0)/n:null,median:n?(sorted[Math.floor((n-1)/2)]+sorted[Math.ceil((n-1)/2)])/2:null,p90:n?sorted[Math.ceil(n*.9)-1]:null,withinMinute:n?100*sorted.filter(v=>v<=60).length/n:null};
}
export function reminderDue(waiting:boolean,last:number,seconds:number,now=Date.now()){return waiting&&(last===0||now-last>=seconds*1000)}
export function supportDuration(seconds:number|null){if(seconds===null)return '—';const n=Math.max(0,Math.round(seconds));return n<60?n+' s':n<3600?Math.floor(n/60)+' min '+n%60+' s':n<86400?Math.floor(n/3600)+' h '+Math.floor(n%3600/60)+' min':Math.floor(n/86400)+' d '+Math.floor(n%86400/3600)+' h'}
export type SupportQueue={open:number;waiting:number;overdue:number;oldest:number|null;unread:number};
export type PersonalSupport={replies:number;conversations:number;response_seconds:number|null;online_ms:number};
