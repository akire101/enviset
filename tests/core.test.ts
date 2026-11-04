import assert from 'node:assert/strict';
import {test} from 'node:test';
import {postSchema,contactSchema,constantEqual,slugify,sameOrigin} from '../app/validation.ts';
import {orderPosts,homepagePosts,postOrderSchema} from '../app/post-order.ts';
import {parseConsent,consentVersion} from '../app/consent-model.ts';
test('Consent rejects expired, malformed and superseded choices',()=>{
 const now=1000000;const choice={value:'yes',version:consentVersion,chosenAt:now-1,expires:now+1000};
 assert.equal(parseConsent(JSON.stringify(choice),now)?.value,'yes');
 for(const change of [{expires:now},{value:'maybe'},{version:'old'},{chosenAt:now+1},{expires:now+181*86400000}])assert.equal(parseConsent(JSON.stringify({...choice,...change}),now),null);
 assert.equal(parseConsent('{'),null);
});

test('Article placement prioritizes pins, honors order and excludes private posts from homepage',()=>{
 const ids=[1,2,3,4,5].map(n=>`00000000-0000-4000-8000-${String(n).padStart(12,'0')}`);
 const posts=ids.map((id,index)=>({id,status:index===0?'draft':'published',publishedAt:index}));
 const settings={order:[ids[2],ids[4],ids[3],ids[1]],pinned:[ids[1],ids[0]],revision:0};
 assert.deepEqual(homepagePosts(posts,settings).map(p=>p.id),[ids[1],ids[2],ids[4]]);
 assert.equal(orderPosts(posts,settings).length,5);assert.equal(posts[0].id,ids[0]);
 assert.equal(postOrderSchema.safeParse({...settings,order:[ids[1],ids[1]]}).success,false);
 assert.equal(postOrderSchema.safeParse({...settings,order:[],pinned:[ids[1]]}).success,false);
 assert.equal(postOrderSchema.safeParse({...settings,revision:-1}).success,false);
 assert.equal(postOrderSchema.safeParse({order:['client-20261018-0'],pinned:['client-20261018-0'],revision:0}).success,true);
});
test('Article images accept only built-in or uploaded same-origin paths',()=>{
 const post={title:'Testovací článok',slug:'test-clanok',excerpt:'Dostatočne dlhý úvodný text pre test.',content:'Toto je dostatočne dlhý obsah článku určený iba na testovanie.',category:'Pre firmy',image:'/media/'+'a'.repeat(64),status:'draft'};
 assert.equal(postSchema.safeParse(post).success,true);
 for(const image of ['https://example.com/photo.jpg','//evil.test/image','data:image/png;base64,AA','/media/../admin','/media/'+'a'.repeat(64)+'?x=1','/images/missing.png'])assert.equal(postSchema.safeParse({...post,image}).success,false);
});
test('Inquiry requires company and email, optional fields may be empty',()=>{
 const payload={company:'Test firma',email:'qa@example.invalid',consent:true};
 const parsed=contactSchema.parse(payload);assert.equal(parsed.name,'');assert.equal(parsed.phone,'');assert.equal(parsed.message,'');
 assert.equal(contactSchema.safeParse({...payload,email:'bad'}).success,false);
 assert.equal(contactSchema.safeParse({...payload,company:' '}).success,false);
 assert.equal(contactSchema.safeParse({...payload,service:'Bezplatn? konzult?cia',message:'X'}).success,true);
});
test('Slovak slugs and malformed paths',()=>{assert.equal(slugify('Čo robiť s odpadmi?'),'co-robit-s-odpadmi');const p={title:'Testovací článok',slug:'test-clanok',excerpt:'Dostatočne dlhý úvodný text pre test.',content:'Toto je dostatočne dlhý obsah článku určený iba na testovanie.',category:'Pre firmy',image:'/images/forest.webp',status:'draft'};assert.equal(postSchema.safeParse(p).success,true);for(const slug of ['../admin','<script>','/foo','a--b'])assert.equal(postSchema.safeParse({...p,slug}).success,false);assert.equal(postSchema.safeParse({...p,image:'javascript:alert(1)'}).success,false);assert.equal(postSchema.safeParse({...p,status:'admin'}).success,false)});
test('Contact boundaries',()=>{const c={name:'Test',email:'test@example.com',company:'Test firma',phone:'',service:'',industry:'',message:'Správa testujúca validáciu.',consent:true,website:''};assert.equal(contactSchema.safeParse(c).success,true);for(const change of [{consent:false},{email:'bad'},{company:''},{message:'a'.repeat(5001)},{name:'x'.repeat(101)}])assert.equal(contactSchema.safeParse({...c,...change}).success,false)});
test('Same-origin enforcement and password comparison',()=>{assert.equal(sameOrigin(new Request('https://envi.test/api',{headers:{origin:'https://evil.test'}})),false);assert.equal(sameOrigin(new Request('https://envi.test/api')),false);assert.equal(sameOrigin(new Request('https://envi.test/api',{headers:{origin:'https://envi.test'}})),true);assert.ok(constantEqual('abcd','abcd'));assert.ok(!constantEqual('abcd','abce'));assert.ok(!constantEqual('ab','abcd'))});

test('Dopyt zachová IČO aj cenové podklady a odmietne chybné hodnoty',async()=>{const {contactMessage}=await import('../app/validation.ts');const base={name:'Test kontakt',email:'test@example.com',company:'Test firma',phone:'+421900000000',service:'',industry:'',message:'Testovacia požiadavka na cenovú ponuku.',consent:true,companyId:'56090552',locations:'2',documents:'0',requestedServices:['Evidencia odpadov','Školenie']};const result=contactSchema.safeParse(base);assert.equal(result.success,true);if(!result.success)return;const stored=contactMessage(result.data);for(const value of [base.message,'IČO: 56090552','Počet prevádzok: 2','Počet dokladov za rok: 0','Evidencia odpadov, Školenie'])assert.ok(stored.includes(value));for(const change of [{companyId:'123'},{locations:'0'},{locations:'1.5'},{documents:'-1'},{requestedServices:Array(9).fill('x')}])assert.equal(contactSchema.safeParse({...base,...change}).success,false)});
test('Blog cards show repeated photograph only once without losing articles',async()=>{
 const {createElement}=await import('react');const {renderToStaticMarkup}=await import('react-dom/server');const {BlogCards}=await import('../app/blog/components.tsx');
 const posts=['/images/forest.webp','/images/forest.webp','/images/meadow.webp'].map((image,i)=>({id:String(i),slug:'article-'+i,title:'Article '+i,excerpt:'Summary',content:'Text',category:'Pre firmy',image,imageAlt:''}));
 const html=renderToStaticMarkup(createElement(BlogCards,{posts:posts as Parameters<typeof BlogCards>[0]['posts']}));
 assert.equal((html.match(/<img /g)||[]).length,2);
 for(const p of posts)assert.ok(html.includes('/blog/'+p.slug));
});
test('Section navigation follows section starts, including manual scrolling',async()=>{
 const {currentSection}=await import('../app/section-navigation.ts');const tops=[150,800,1600,2300];
 assert.equal(currentSection(tops,0),0);assert.equal(currentSection(tops,150),0);
 assert.equal(currentSection(tops,790),1);assert.equal(currentSection(tops,1200),1);
 assert.equal(currentSection(tops,1600),2);assert.equal(currentSection(tops,9999),3);
});

test('Analytics rejects private routes, query strings, missing consent and oversized maps',async()=>{
 const {analyticsSchema}=await import('../app/analytics-model.ts');
 const p={consent:true,id:crypto.randomUUID(),visitor:crypto.randomUUID(),session:crypto.randomUUID(),path:'/',device:'mobile',sequence:1,seconds:5,depth:30,sections:[],targets:[],points:[]};
 assert.equal(analyticsSchema.safeParse(p).success,true);
 for(const path of ['/admin','/api/admin/messages','/kontakt?email=person@example.com','//evil.example'])assert.equal(analyticsSchema.safeParse({...p,path}).success,false);
 assert.equal(analyticsSchema.safeParse({...p,consent:false}).success,false);
 assert.equal(analyticsSchema.safeParse({...p,points:Array(401).fill({x:1,y:1,clicks:0,moves:1})}).success,false);
 assert.equal(analyticsSchema.safeParse({...p,seconds:-1}).success,false);
});
test('Analytics periods use Bratislava dates and aggregate zero-click exposed targets',async()=>{
 const {periodStart,localDay,aggregateDetails}=await import('../app/analytics-model.ts');
 assert.equal(localDay(new Date('2026-10-27T23:30:00Z')),'2026-10-28');
 assert.equal(periodStart('week','2026-01-03'),'2025-12-28');
 assert.equal(periodStart('year','2026-10-27'),'2025-10-28');
 const payload=JSON.stringify({sections:[{key:'faq',label:'FAQ',seconds:10}],targets:[{key:'contact',label:'Kontakt',clicks:0,seen:true}],points:[{x:1,y:2,clicks:2,moves:3}]});
 const result=aggregateDetails([{path:'/',payload},{path:'/',payload}]);
 assert.equal(result.sections[0].seconds,20);assert.equal(result.targets[0].views,2);assert.equal(result.targets[0].clicks,0);assert.equal(result.points[0].moves,6);
});
test('Analytics charts keep zero-visit days and all 24 hours',async()=>{
 const {fillSeries}=await import('../app/analytics-model.ts');
 const series=fillSeries([{bucket:'2026-10-27',visitors:2,views:3}],'week','2026-10-21','2026-10-27');
 assert.equal(series.length,7);assert.equal(series[0].views,0);assert.equal(series[6].visitors,2);
 assert.equal(fillSeries([],'day','2026-10-27','2026-10-27').length,24);
});
