import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const suite=JSON.parse(await readFile('benchmarks/retrieval-cases.json','utf8'));
let failed=0;const results=[];
for(const c of suite.cases){const args=['scripts/rank-knowledge.mjs',`--project=${c.project}`,`--domains=${c.domains.join(',')}`,`--keywords=${c.keywords.join(',')}`,'--now=2026-08-20T00:30:00.000Z'];const r=spawnSync(process.execPath,args,{encoding:'utf8'});if(r.status!==0){failed++;results.push({id:c.id,pass:false,error:r.stderr||r.stdout});continue;}const out=JSON.parse(r.stdout);const ids=out.results.map(x=>x.id);const topOk=c.expectedTop.every(id=>ids[0]===id);const top5Ok=c.expectedWithinTop5.every(id=>ids.slice(0,5).includes(id));const pass=topOk&&top5Ok;if(!pass)failed++;results.push({id:c.id,pass,top5:ids.slice(0,5),expectedTop:c.expectedTop,expectedWithinTop5:c.expectedWithinTop5});}
for(const x of results)console.log(`${x.pass?'PASS':'FAIL'} ${x.id}: ${JSON.stringify(x.top5??x.error)}`);
console.log(`Retrieval benchmark: ${results.length-failed}/${results.length} passed.`);
if(failed)process.exit(1);
