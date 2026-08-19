import { readFile, writeFile, mkdir } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('index/knowledge-manifest.json', 'utf8'));
const defaultStatuses = new Set(['active', 'candidate']);
const entries = manifest.entries
  .filter((e) => defaultStatuses.has(e.status))
  .map((e) => ({ id:e.id, type:e.type, status:e.status, path:e.path, domains:e.domains, projects:e.projects }))
  .sort((a,b) => a.type.localeCompare(b.type) || a.id.localeCompare(b.id));

const compact = {
  version: 4,
  generatedFrom: 'index/knowledge-manifest.json',
  generatedAt: manifest.generatedAt,
  entries,
  retrievalProtocol: 'core/task-retrieval-protocol.md',
  notes: 'Generated retrieval index. Subsumed/superseded/stale/rejected entries are excluded from default retrieval.'
};
await writeFile('index/knowledge-index.json', JSON.stringify(compact, null, 2) + '\n');

const reverse = {};
for (const e of manifest.entries) {
  for (const evidenceId of e.evidenceIds ?? []) {
    (reverse[evidenceId] ??= []).push(e.id);
  }
}
for (const key of Object.keys(reverse)) reverse[key].sort();
await mkdir('index', {recursive:true});
await writeFile('index/evidence-reverse-index.json', JSON.stringify({version:1, generatedFrom:'index/knowledge-manifest.json', generatedAt:manifest.generatedAt, evidence:reverse}, null, 2) + '\n');

console.log(`Generated ${entries.length} default retrieval entries and ${Object.keys(reverse).length} evidence reverse mappings.`);
