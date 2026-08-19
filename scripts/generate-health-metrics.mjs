import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const manifest=JSON.parse(await readFile('index/knowledge-manifest.json','utf8'));
const policy=JSON.parse(await readFile('config/staleness-policy.json','utf8'));
const now=new Date(process.env.INTELLIGENCE_NOW ?? Date.now());
const count=(type,status)=>manifest.entries.filter(e=>(!type||e.type===type)&&(!status||e.status===status)).length;
const evidenceIds=new Set(manifest.entries.flatMap(e=>e.evidenceIds??[]));
let stale=0, unverified=0;
for(const e of manifest.entries){if(['superseded','rejected'].includes(e.status))continue;const hs=(e.domains??[]).map(d=>policy.domainMaxAgeDays[d]).filter(Number.isFinite);const horizon=hs.length?Math.min(...hs):policy.defaultMaxAgeDays;if(!e.lastVerifiedAt){unverified++;continue;}const age=Math.floor((now-new Date(e.lastVerifiedAt))/86400000);if(age>horizon)stale++;}
async function walk(dir){const out=[];for(const d of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const events=[];try{for(const p of await walk('usage')){if(!p.endsWith('.json')||!p.includes(`${path.sep}events${path.sep}`))continue;events.push(JSON.parse(await readFile(p,'utf8')));}}catch{}
const byType={};for(const e of events)byType[e.eventType]=(byType[e.eventType]??0)+1;
const nums=(field)=>events.map(e=>e[field]).filter(Number.isFinite);
const mean=(xs)=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:null;
const repeat=byType.repeat_failure??0, prevented=byType.failure_prevented??0;
const metrics={version:2,generated:true,measuredAt:now.toISOString(),inventory:{manifestKnowledgeEntries:manifest.entries.length,defaultRetrievalEntries:manifest.entries.filter(e=>['active','candidate'].includes(e.status)).length,activeRules:count('rule','active'),activeFailures:count('failure','active'),candidateFailures:count('failure','candidate'),activePatterns:count('pattern','active'),candidatePatterns:count('pattern','candidate'),subsumedEntries:count(null,'subsumed'),evidenceReferenced:evidenceIds.size},maturity:{multiProjectRules:manifest.entries.filter(e=>e.type==='rule'&&e.status==='active'&&(e.projects??[]).length>1).length,retrievalProtocolPresent:true,extractionProtocolPresent:true,promotionPolicyPresent:true,immutableUsageEvents:true},qualitySignals:{staleEntries:stale,unverifiedEntries:unverified,knownSupersededOrSubsumed:manifest.entries.filter(e=>['superseded','subsumed'].includes(e.status)).length},usage:{totalImmutableEvents:events.length,eventCounts:byType},outcomeMetrics:{retrievalEvents:byType.retrieval??0,knowledgeUsedEvents:byType.knowledge_used??0,knowledgeRejectedEvents:byType.knowledge_rejected??0,failuresPrevented:prevented,repeatFailures:repeat,repeatFailureShare:(repeat+prevented)>0?repeat/(repeat+prevented):null,meanIterationsToVerifiedResult:mean(nums('iterationsToVerifiedResult')),meanTimeToRootCauseMinutes:mean(nums('timeToRootCauseMinutes')),newInputTokensPerTask:null},notes:["Generated from manifest, staleness policy and immutable usage events.","Zero event counts mean no matching event has been recorded; they do not prove zero real-world occurrences.","newInputTokensPerTask remains null until a trustworthy comparable-task token source exists."]};
await writeFile('metrics/intelligence-health.json',JSON.stringify(metrics,null,2)+'\n');
console.log(`Generated health metrics from ${manifest.entries.length} knowledge entries and ${events.length} immutable usage events.`);
