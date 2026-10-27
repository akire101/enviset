export function currentSection(tops:number[],position:number){
 let current=0;
 for(let i=0;i<tops.length;i++){if(tops[i]<=position+12)current=i;else break;}
 return current;
}
