import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (p) => resolve(root, 'src', p);
const dist = resolve(root, 'dist');

function fail(msg) {
  console.error(`build failed: ${msg}`);
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const common = { bundle: true, target: 'chrome110', logLevel: 'warning', legalComments: 'none', sourcemap: false, minify: false };

try {
  await Promise.all([
    build({ ...common, entryPoints: [src('content/index.ts')], outfile: resolve(dist, 'content.js'), format: 'iife', platform: 'browser' }),
    build({ ...common, entryPoints: [src('background/index.ts')], outfile: resolve(dist, 'background.js'), format: 'esm', platform: 'browser' }),
    build({ ...common, entryPoints: [src('popup/popup.ts')], outfile: resolve(dist, 'popup.js'), format: 'iife', platform: 'browser' }),
  ]);
} catch (e) {
  fail(e instanceof Error ? e.message : String(e));
}

// Version of record is package.json; stamp it into the manifest.
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(src('manifest.json'), 'utf8'));
manifest.version = pkg.version;
writeFileSync(resolve(dist, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

for (const f of ['popup/popup.html', 'popup/popup.css']) cpSync(src(f), resolve(dist, f.split('/')[1]));
if (!existsSync(src('icons'))) fail('src/icons missing');
cpSync(src('icons'), resolve(dist, 'icons'), { recursive: true });

for (const f of ['manifest.json', 'content.js', 'background.js', 'popup.js', 'popup.html', 'popup.css', 'icons/icon16.png', 'icons/icon48.png', 'icons/icon128.png']) {
  if (!existsSync(resolve(dist, f))) fail(`missing output ${f}`);
}
console.log(`built dist/ (v${pkg.version})`);
