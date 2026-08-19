import { readFile } from 'node:fs/promises';

const manifest=JSON.parse(await readFile('index/knowledge-manifest.json','utf8'));
const cfg=JSON.parse(await readFile('config/retrieval-ranking.json','utf8'));
const staleCfg=JSON.parse(await readFile('config/staleness-policy.json','utf8'));
const args=Object.fromEntries(process.argv.slice(2).map(x=>{const i=x.indexOf('=');return i<0?[x.replace(/^--/,''),'']:[x.slice(0,i).replace(/^--/,''),x.slice(i+1)];}));
const project=args.project??'';
const domains=(args.domains??'').split(',').map(x=>x.trim()).filter(Boolean);
const keywords=(args.keywords??'').toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
const now=new Date(args.now??Date.now());
const norm=s=>String(s??'').toLowerCase();

function staleInfo(e){const hs=(e.domains??[]).map(d=>staleCfg.domainMaxAgeDays[d]).filter(Number.isFinite);const horizon=hs.length?Math.min(...hs):staleCfg.defaultMaxAgeDays;if(!e.lastVerifiedAt)return {unverified:true,stale:false};const age=(now-new Date(e.lastVerifiedAt))/86400000;return {unverified:false,stale:age>horizon};}
function score(e){let s=0;const reasons=[];const add=(n,r)=>{s+=n;if(n)reasons.push(`${n>0?'+':''}${n} ${r}`);};add(cfg.weights.type[e.type]??0,`type:${e.type}`);add(cfg.weights.status[e.status]??0,`status:${e.status}`);if(project&&(e.projects??[]).some(p=>norm(p)===norm(project)))add(cfg.weights.projectExact,'project');for(const d of domains)if((e.domains??[]).some(x=>norm(x)===norm(d)))add(cfg.weights.domainExactEach,`domain:${d}`);const hay=norm([e.id,e.path,...(e.domains??[]),...(e.projects??[])].join(' '));for(const k of keywords)if(hay.includes(k))add(cfg.weights.keywordEach,`keyword:${k}`);if((e.projects??[]).length>1)add(cfg.weights.multiProject,'multi-project');if((e.evidenceIds??[]).length)add(cfg.weights.hasEvidence,'evidence');const st=staleInfo(e);if(st.unverified)add(cfg.weights.unverified,'unverified');else add(cfg.weights.verified,'verified');if(st.stale)add(cfg.weights.stalePenalty,'stale');return {id:e.id,type:e.type,status:e.status,path:e.path,score:s,reasons};}
const ranked=manifest.entries.map(score).filter(x=>x.status!=='rejected'&&x.status!=='superseded'&&x.status!=='subsumed').sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
const limits=cfg.limits;const used={rule:0,failure:0,pattern:0,other:0};const out=[];for(const r of ranked){const bucket=['rule','failure','pattern'].includes(r.type)?r.type:'other';if(used[bucket]>=(limits[bucket+'s']??limits[bucket]??limits.other))continue;if(out.length>=limits.total)break;used[bucket]++;out.push(r);}
console.log(JSON.stringify({task:{project,domains,keywords},results:out},null,2));
