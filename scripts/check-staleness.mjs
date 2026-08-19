import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('index/knowledge-manifest.json','utf8'));
const policy = JSON.parse(await readFile('config/staleness-policy.json','utf8'));
const now = new Date(process.env.INTELLIGENCE_NOW ?? Date.now());
const report = [];

for (const e of manifest.entries) {
  if (['superseded','rejected'].includes(e.status)) continue;
  const horizons = (e.domains ?? []).map(d => policy.domainMaxAgeDays[d]).filter(Number.isFinite);
  const maxAgeDays = horizons.length ? Math.min(...horizons) : policy.defaultMaxAgeDays;
  if (!e.lastVerifiedAt) {
    report.push({id:e.id, state:'unverified', maxAgeDays, daysSinceVerified:null, action:'verify-before-important-use'});
    continue;
  }
  const verified = new Date(e.lastVerifiedAt);
  const days = Math.floor((now - verified) / 86400000);
  if (days > maxAgeDays) report.push({id:e.id, state:'stale', maxAgeDays, daysSinceVerified:days, action:'revalidate'});
}

for (const item of report) {
  const prefix = item.state === 'stale' ? 'STALE' : 'UNVERIFIED';
  console.warn(`${prefix}: ${item.id} (horizon=${item.maxAgeDays}d${item.daysSinceVerified == null ? '' : `, age=${item.daysSinceVerified}d`})`);
}

const stale = report.filter(x => x.state === 'stale').length;
const unverified = report.filter(x => x.state === 'unverified').length;
console.log(`Staleness check: ${stale} stale, ${unverified} unverified, ${manifest.entries.length} total.`);

if (process.env.FAIL_ON_STALE === '1' && stale > 0) process.exit(1);
if (process.env.FAIL_ON_UNVERIFIED === '1' && unverified > 0) process.exit(1);
