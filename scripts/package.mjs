import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const LIMIT = 150 * 1024;

function fail(msg) {
  console.error(`package failed: ${msg}`);
  process.exit(1);
}

if (!existsSync(join(dist, 'manifest.json'))) fail('dist/ missing; run `npm run build` first');
try {
  execFileSync(process.execPath, [join(root, 'scripts/validate-manifest.mjs'), dist], { stdio: 'inherit' });
} catch {
  fail('manifest validation');
}

const version = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8')).version;
const out = resolve(root, `closeguard-${version}.zip`);
rmSync(out, { force: true });
try {
  execFileSync('zip', ['-r', '-X', '-q', out, '.'], { cwd: dist, stdio: 'inherit' });
} catch (e) {
  fail(`the \`zip\` CLI is required (${e.message})`);
}
const size = statSync(out).size;
if (size >= LIMIT) fail(`${out} is ${size} bytes; limit is ${LIMIT}`);
const n = (function count(d) { return readdirSync(d, { withFileTypes: true }).reduce((a, e) => a + (e.isDirectory() ? count(join(d, e.name)) : 1), 0); })(dist);
console.log(`packaged ${out} (${size} bytes, ${n} files)`);
