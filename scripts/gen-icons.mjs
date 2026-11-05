import { Buffer } from 'node:buffer';
// Generates src/icons/icon{16,48,128}.png with node built-ins only (zlib). Run: node scripts/gen-icons.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../src/icons');
mkdirSync(out, { recursive: true });

const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const t = Buffer.from(type); const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, c]);
};

function icon(size) {
  const px = Buffer.alloc(size * size * 4);
  const r = size * 0.22, cx = (size - 1) / 2, a = size * 0.3, w = Math.max(1.2, size * 0.09);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    // rounded square
    const dx = Math.max(Math.abs(x - cx) - (size / 2 - r), 0), dy = Math.max(Math.abs(y - cx) - (size / 2 - r), 0);
    const inside = Math.hypot(dx, dy) <= r;
    if (!inside) continue;
    px.set([0x3b, 0x5b, 0xdb, 255], i);
    // white X
    const u = x - cx, v = y - cx;
    if (Math.abs(u) <= a && Math.abs(v) <= a && (Math.abs(u - v) <= w || Math.abs(u + v) <= w)) px.set([255, 255, 255, 255], i);
  }
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
for (const s of [16, 48, 128]) writeFileSync(resolve(out, `icon${s}.png`), icon(s));
console.log('icons written');
