import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.argv[2] ? resolve(process.argv[2]) : resolve(root, 'dist');
const errors = [];
const check = (c, m) => { if (!c) errors.push(m); };

let m;
try {
  m = JSON.parse(readFileSync(resolve(dir, 'manifest.json'), 'utf8'));
} catch (e) {
  console.error(`cannot read manifest: ${e.message}`);
  process.exit(1);
}
check(m.manifest_version === 3, 'manifest_version must be 3');
check(/^\d+(\.\d+){0,3}$/.test(m.version ?? ''), 'version must be dotted numeric');
check(JSON.stringify(m.permissions) === '["storage"]', 'permissions must be exactly ["storage"]');
check(!m.host_permissions && !m.optional_permissions && !m.optional_host_permissions, 'no host/optional permissions');
check(!m.content_security_policy, 'no custom CSP');
check(!m.web_accessible_resources, 'no web_accessible_resources');
check(!m.externally_connectable, 'no externally_connectable');
check(m.action?.default_popup === 'popup.html', 'action.default_popup must be popup.html');
check(m.background?.service_worker === 'background.js', 'background.service_worker must be background.js');
const cs = m.content_scripts;
check(Array.isArray(cs) && cs.length === 1, 'exactly one content_scripts entry');
const c = cs?.[0] ?? {};
check(JSON.stringify(c.matches) === '["<all_urls>"]', 'content matches must be ["<all_urls>"]');
check(c.all_frames === true, 'all_frames must be true');
check(c.match_about_blank === true, 'match_about_blank must be true');
check(c.run_at === 'document_idle', 'run_at must be document_idle');
check(JSON.stringify(c.js) === '["content.js"]', 'content js must be ["content.js"]');

const files = [m.action?.default_popup, m.background?.service_worker, ...(c.js ?? []), ...Object.values(m.icons ?? {}), ...Object.values(m.action?.default_icon ?? {})];
for (const f of files) if (f) check(existsSync(resolve(dir, f)), `referenced file missing: ${f}`);
for (const s of ['16', '48', '128']) check(m.icons?.[s], `icons.${s} missing`);

// No remote code in bundles/html.
for (const f of ['content.js', 'background.js', 'popup.js', 'popup.html']) {
  const p = resolve(dir, f);
  if (!existsSync(p)) continue;
  const t = readFileSync(p, 'utf8');
  check(!/<script[^>]+src=["']https?:/i.test(t), `${f}: remote script`);
  check(!/\beval\s*\(|new Function\s*\(/.test(t), `${f}: eval/new Function`);
  check(!/import\(\s*["']https?:/.test(t), `${f}: remote import`);
}

if (errors.length) {
  console.error('manifest validation failed:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('manifest OK');
