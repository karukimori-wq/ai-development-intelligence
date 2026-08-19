import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = 'usage';
const errors=[];
const ids=new Map();
async function walk(dir){const out=[];for(const d of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}

for (const file of await walk(root)) {
  if (!file.endsWith('.json') || !file.includes(`${path.sep}events${path.sep}`)) continue;
  let event;
  try { event=JSON.parse(await readFile(file,'utf8')); } catch(e) { errors.push(`invalid event JSON ${file}: ${e.message}`); continue; }
  const expected=`${event.eventId}.json`;
  if (path.basename(file)!==expected) errors.push(`event filename mismatch: ${file} expected ${expected}`);
  if (ids.has(event.eventId)) errors.push(`duplicate eventId ${event.eventId}: ${ids.get(event.eventId)} and ${file}`);
  else ids.set(event.eventId,file);
  const parts=file.split(path.sep);
  const usageIndex=parts.indexOf('usage');
  const year=parts[usageIndex+1], month=parts[usageIndex+2];
  const date=new Date(event.occurredAt);
  if (!Number.isNaN(date.valueOf())) {
    const y=String(date.getUTCFullYear());
    const m=String(date.getUTCMonth()+1).padStart(2,'0');
    if (year!==y || month!==m) errors.push(`event partition mismatch: ${file} occurredAt=${event.occurredAt}`);
  }
}

if(errors.length){for(const e of errors)console.error(`ERROR: ${e}`);process.exit(1);}
console.log(`Immutable usage validation passed: ${ids.size} event(s).`);
