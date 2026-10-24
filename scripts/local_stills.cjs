// Render frames of a scene module to PNGs + one grid image for visual self-review (no Remotion needed).
// Usage: node scripts/local_stills.cjs <slug> [t1,t2,...]   (default: storyboard midpoints + every 4 s)
// Output: out/local/<slug>/t_<sec>.png and out/local/<slug>/grid.jpg (also prints the paths)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
(async () => {
  const slug = process.argv[2];
  const root = path.resolve(__dirname, '..');
  const dir = path.join(root, 'src/videos', slug);
  const tm = JSON.parse(fs.readFileSync(path.join(dir, 'timing.json'), 'utf8'));
  let times = process.argv[3] ? process.argv[3].split(',').map(Number) : [];
  if (!times.length) {
    try { times = JSON.parse(fs.readFileSync(path.join(dir, 'storyboard.json'), 'utf8')).map(s => +(((s.t0 + s.t1) / 2).toFixed(2))); } catch {}
    for (let t = 1; t < tm.duration; t += 4) times.push(t);
    times = [...new Set(times)].sort((a, b) => a - b).slice(0, 24);
  }
  const out = path.join(root, 'out/local', slug); fs.mkdirSync(out, { recursive: true });
  const html = path.join(out, 'h.html');
  const chunks = JSON.stringify(tm.chunks || []);
  fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#070b14;font-family:Inter,sans-serif}svg{position:absolute;left:0;top:0}#s{position:absolute;top:1440px;left:50px;right:50px;text-align:center}#s span{display:inline-block;background:rgba(8,11,20,.88);padding:18px 30px;border-radius:20px;color:#fff;font-weight:900;font-size:66px;line-height:1.18}</style></head><body>
<svg id="a" width="1080" height="1920" viewBox="0 0 1080 1920"></svg><div id="s"><span></span></div>
<script type="module">import {renderSvg} from '${pathToUrl(path.join(dir, 'scene.js'))}'; const C=${chunks};
window.R=t=>{document.getElementById('a').innerHTML=renderSvg(t);let c=null;for(const x of C) if(x.s<=t) c=x; document.querySelector('#s span').textContent=c?c.w.map(w=>w[0]).join(' '):''; document.getElementById('s').style.display=c?'block':'none';}; window.ready=1;</script></body></html>`);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + html); await p.waitForFunction(() => window.ready, null, { timeout: 15000 });
  const files = [];
  for (const t of times) { await p.evaluate(t => R(t), t); const f = path.join(out, `t_${String(t.toFixed(2)).padStart(6, '0')}.png`); await p.screenshot({ path: f }); files.push(f); }
  await b.close();
  const cols = 6, rows = Math.ceil(files.length / cols);
  execSync(`ffmpeg -v error -y -pattern_type glob -i '${out}/t_*.png' -vf "scale=270:-1,tile=${cols}x${rows}:padding=6:color=0x222222" -frames:v 1 -q:v 3 '${out}/grid.jpg'`);
  console.log(JSON.stringify({ times, grid: path.join(out, 'grid.jpg'), frames: files.length, errors: errs.slice(0, 5) }, null, 1));
})();
function pathToUrl(p) { return 'file://' + p; }
