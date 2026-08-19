import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ajv = new Ajv2020({allErrors:true, strict:false});
addFormats(ajv);
const load = async p => JSON.parse(await readFile(p,'utf8'));
const manifestSchema = await load('schemas/knowledge-manifest.schema.json');
const entrySchema = await load('schemas/knowledge-entry.schema.json');
const eventSchema = await load('schemas/intelligence-event.schema.json');
const validateManifest = ajv.compile(manifestSchema);
const validateEntry = ajv.compile(entrySchema);
const validateEvent = ajv.compile(eventSchema);
let failed = false;

function report(label, validate, data) {
  if (validate(data)) return;
  failed = true;
  console.error(`SCHEMA ERROR: ${label}`);
  for (const e of validate.errors ?? []) console.error(`  ${e.instancePath || '/'} ${e.message}`);
}

const manifest = await load('index/knowledge-manifest.json');
report('index/knowledge-manifest.json', validateManifest, manifest);

for (const e of manifest.entries) {
  if (!e.path.endsWith('.json')) continue;
  const data = await load(e.path);
  report(e.path, validateEntry, data);
  if (data.id !== e.id) { failed = true; console.error(`SCHEMA ERROR: manifest id ${e.id} != entry id ${data.id} at ${e.path}`); }
  if (data.type !== e.type) { failed = true; console.error(`SCHEMA ERROR: manifest type ${e.type} != entry type ${data.type} at ${e.path}`); }
}

async function walk(dir) {
  const out=[];
  for (const d of await readdir(dir,{withFileTypes:true})) {
    const p=path.join(dir,d.name);
    if (d.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}
try {
  for (const p of await walk('usage')) {
    if (!p.endsWith('.json')) continue;
    report(p, validateEvent, await load(p));
  }
} catch {}

if (failed) process.exit(1);
console.log('JSON Schema validation passed.');
