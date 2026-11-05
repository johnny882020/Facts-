// Tiny static fixture server. Serves ./fixtures on two free ports (primary + second origin for cross-origin cases).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');

function listen(handler) {
  return new Promise((resolve) => {
    const s = http.createServer(handler);
    s.listen(0, '127.0.0.1', () => resolve(s));
  });
}

export async function startServers() {
  let port2 = 0;
  const handler = (req, res) => {
    const name = path.basename(new URL(req.url, 'http://x').pathname) || 'landing.html';
    const file = path.join(dir, name);
    if (!file.startsWith(dir) || !fs.existsSync(file)) {
      res.writeHead(name === 'submit' ? 200 : 404, { 'content-type': 'text/html' });
      return res.end(name === 'submit' ? '<p>submitted</p>' : 'not found');
    }
    const body = fs.readFileSync(file, 'utf8').replaceAll('__PORT2__', String(port2));
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(body);
  };
  const s1 = await listen(handler);
  const s2 = await listen(handler);
  port2 = s2.address().port;
  return {
    port: s1.address().port,
    port2,
    close: () => Promise.all([s1, s2].map((s) => new Promise((r) => s.close(r)))),
  };
}
