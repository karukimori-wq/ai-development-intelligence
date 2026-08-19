import { cp, mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root=process.cwd();
const tests=[];
const run=(cwd,script)=>spawnSync(process.execPath,[script],{cwd,encoding:'utf8'});
async function sandbox(){const d=await mkdtemp(path.join(tmpdir(),'adi-test-'));await cp(root,d,{recursive:true,filter:(src)=>!src.includes(`${path.sep}.git`)&&!src.includes(`${path.sep}node_modules`)});return d;}
async function json(p){return JSON.parse(await readFile(p,'utf8'));}
async function test(name,mutate,script='scripts/validate-intelligence.mjs'){const d=await sandbox();try{await mutate(d);const r=run(d,script);if(r.status===0)throw new Error(`validator unexpectedly passed\n${r.stdout}\n${r.stderr}`);tests.push({name,pass:true});}finally{await rm(d,{recursive:true,force:true});}}

await test('duplicate knowledge id',async d=>{const p=path.join(d,'index/knowledge-manifest.json');const m=await json(p);m.entries.push({...m.entries[0],path:m.entries[1].path});await writeFile(p,JSON.stringify(m,null,2));});
await test('unresolved evidence',async d=>{const p=path.join(d,'index/knowledge-manifest.json');const m=await json(p);m.entries[0].evidenceIds.push('EVID-does-not-exist');await writeFile(p,JSON.stringify(m,null,2));});
await test('missing knowledge path',async d=>{const p=path.join(d,'index/knowledge-manifest.json');const m=await json(p);m.entries[0].path='knowledge/rules/DOES-NOT-EXIST.json';await writeFile(p,JSON.stringify(m,null,2));});
await test('knowledge schema violation',async d=>{const p=path.join(d,'knowledge/failures/FAIL-webhook-identity-precedence.json');const x=await json(p);x.confidence=2;await writeFile(p,JSON.stringify(x,null,2));},'scripts/validate-schemas.mjs');
await test('usage filename mismatch',async d=>{const dir=path.join(d,'usage/2026/08/events');await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'wrong.json'),JSON.stringify({eventId:'INT-EVT-fixture-name',eventType:'retrieval',occurredAt:'2026-08-20T00:00:00Z',project:'fixture',taskClass:'test'}));},'scripts/validate-usage-events.mjs');
await test('usage partition mismatch',async d=>{const dir=path.join(d,'usage/2026/08/events');await mkdir(dir,{recursive:true});const id='INT-EVT-fixture-partition';await writeFile(path.join(dir,`${id}.json`),JSON.stringify({eventId:id,eventType:'retrieval',occurredAt:'2026-09-20T00:00:00Z',project:'fixture',taskClass:'test'}));},'scripts/validate-usage-events.mjs');

for(const t of tests)console.log(`PASS negative test: ${t.name}`);
console.log(`Integrity self-test passed: ${tests.length} expected failures detected.`);
