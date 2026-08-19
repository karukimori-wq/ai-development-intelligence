import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const readJson = async (p) => JSON.parse(await readFile(path.join(root, p), 'utf8'));
const exists = async (p) => { try { await access(path.join(root, p)); return true; } catch { return false; } };

const manifest = await readJson('index/knowledge-manifest.json');
const ids = new Set();
const manifestPaths = new Set();

for (const entry of manifest.entries) {
  if (ids.has(entry.id)) errors.push(`duplicate knowledge id: ${entry.id}`);
  ids.add(entry.id);
  if (manifestPaths.has(entry.path)) errors.push(`duplicate manifest path: ${entry.path}`);
  manifestPaths.add(entry.path);
  if (!(await exists(entry.path))) errors.push(`missing knowledge path: ${entry.path}`);
  for (const evidenceId of entry.evidenceIds ?? []) {
    const evidencePath = `evidence/${evidenceId}.md`;
    if (!(await exists(evidencePath))) errors.push(`unresolved evidence ${evidenceId} referenced by ${entry.id}`);
  }
  if (['subsumed','superseded'].includes(entry.status) && !entry.supersededBy) {
    warnings.push(`${entry.id} is ${entry.status} without supersededBy`);
  }
  if (entry.supersededBy && !manifest.entries.some((x) => x.id === entry.supersededBy)) {
    errors.push(`${entry.id} points to missing superseding knowledge ${entry.supersededBy}`);
  }
}

for (const dir of ['knowledge/rules','knowledge/patterns','knowledge/failures']) {
  const files = await readdir(path.join(root, dir));
  for (const file of files) {
    if (file === 'README.md') continue;
    const p = `${dir}/${file}`;
    if (!manifestPaths.has(p)) errors.push(`knowledge file missing from manifest: ${p}`);
    if (file.endsWith('.json')) {
      try { await readJson(p); } catch (e) { errors.push(`invalid JSON ${p}: ${e.message}`); }
    }
  }
}

const index = await readJson('index/knowledge-index.json');
for (const entry of index.entries) {
  if (!ids.has(entry.id)) errors.push(`compact index entry missing from manifest: ${entry.id}`);
  if (!(await exists(entry.path))) errors.push(`compact index path missing: ${entry.path}`);
}

const usageRoot = path.join(root, 'usage');
async function walk(dir) {
  const out = [];
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}
try {
  for (const file of await walk(usageRoot)) {
    if (!file.endsWith('.json')) continue;
    try {
      const event = JSON.parse(await readFile(file, 'utf8'));
      for (const key of ['eventId','eventType','occurredAt','project','taskClass']) {
        if (!(key in event)) errors.push(`usage event missing ${key}: ${path.relative(root,file)}`);
      }
    } catch (e) { errors.push(`invalid usage JSON ${path.relative(root,file)}: ${e.message}`); }
  }
} catch {}

for (const w of warnings) console.warn(`WARN: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`);
  console.error(`Integrity validation failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`Integrity validation passed: ${manifest.entries.length} knowledge entries, ${warnings.length} warning(s).`);
