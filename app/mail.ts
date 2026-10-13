export async function notifyContact(config:{url?:string;token?:string},id:string){
 if(!config.url||!config.token)return 'not_configured' as const;
 try{const url=new URL(config.url);if(url.protocol!=='https:')return 'failed' as const;const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${config.token}`},body:JSON.stringify({event:'contact_received',id}),signal:AbortSignal.timeout(5000)});return response.ok?'accepted' as const:'failed' as const;}catch{return 'failed' as const;}
}
