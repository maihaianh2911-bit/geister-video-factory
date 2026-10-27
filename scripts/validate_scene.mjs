// Validate a generated scene module before rendering: runs scene(t) over the whole timeline.
// Usage: node scripts/validate_scene.mjs <slug>   -> writes jobs/<slug>/validate.json, exit 1 on errors
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const slug = process.argv[2];
const dir = path.resolve('src/videos', slug);
const report = { slug, errors: [], warnings: [], frames_checked: 0, max_ms: 0, max_kb: 0 };
const VALID = new Set(['hit', 'thud', 'ting', 'pop', 'plop', 'whoosh', 'riser', 'slide', 'click', 'tick', 'switch', 'rustle', 'heart', 'drip', 'creak', 'shimmer', 'static', 'bonk', 'crash', 'crack', 'clank', 'air', 'tweet', 'womp', 'stamp', 'steps']);

let mod;
try {
  mod = await import(pathToFileURL(path.join(dir, 'scene.js')).href);
} catch (e) {
  report.errors.push(`Không nạp được scene.js: ${String(e.stack || e).split('\n').slice(0, 4).join(' | ')}`);
}
const tm = JSON.parse(fs.readFileSync(path.join(dir, 'timing.json'), 'utf8'));
const dur = tm.duration;
if (mod) {
  const fn = mod.__scene || mod.renderSvg;
  let prev = null, sameRun = 0, worstStatic = 0, worstAt = 0;
  for (let t = 0; t < dur; t += 0.2) {
    const t0 = performance.now();
    let s;
    try {
      s = fn(t);
    } catch (e) {
      if (report.errors.length < 8) report.errors.push(`t=${t.toFixed(1)}s: ${String(e.stack || e).split('\n').slice(0, 3).join(' | ')}`);
      continue;
    }
    const ms = performance.now() - t0;
    report.frames_checked++;
    report.max_ms = Math.max(report.max_ms, Math.round(ms));
    if (typeof s !== 'string' || s.length < 200) { if (report.errors.length < 8) report.errors.push(`t=${t.toFixed(1)}s: scene(t) trả về rỗng hoặc quá ngắn`); continue; }
    report.max_kb = Math.max(report.max_kb, Math.round(s.length / 1024));
    const bad = s.match(/="[^"]*(NaN|undefined|Infinity)[^"]*"/);
    if (bad && report.errors.length < 8) report.errors.push(`t=${t.toFixed(1)}s: thuộc tính SVG chứa ${bad[1]} (${bad[0].slice(0, 80)})`);
    if (/<script|<foreignObject|<image|https?:\/\//i.test(s.replace(/xmlns(:\w+)?="http:\/\/www\.w3\.org[^"]*"/g, ''))) {
      if (!report.errors.some(e => e.includes('cấm'))) report.errors.push(`t=${t.toFixed(1)}s: dùng thẻ/URL bị cấm (script, image, foreignObject, URL ngoài)`);
    }
    if (s === prev) { sameRun++; if (sameRun > worstStatic) { worstStatic = sameRun; worstAt = t; } } else sameRun = 0;
    prev = s;
  }
  if (worstStatic * 0.2 >= 1.6) report.warnings.push(`Hình đứng yên ~${(worstStatic * 0.2).toFixed(1)} s quanh t=${worstAt.toFixed(1)}s`);
  if (report.max_ms > 200) report.warnings.push(`Có khung tốn ${report.max_ms} ms để vẽ (chậm)`);
  if (report.max_kb > 400) report.errors.push(`Có khung SVG nặng ${report.max_kb} KB (quá lớn)`);
}
try {
  const ev = JSON.parse(fs.readFileSync(path.join(dir, 'events.json'), 'utf8'));
  // your own recordings in assets/sfx/<type>/ add new event types (door_slam, ambience, ...)
  const subdirs = d => fs.existsSync(d) ? fs.readdirSync(d).filter(x => fs.statSync(path.join(d, x)).isDirectory()) : [];
  const own = [...subdirs('assets/sfx'), ...subdirs('sound/extra/sfx')];
  own.forEach(d => VALID.add(d));
  const unknown = [...new Set((ev.events || []).filter(e => !e.sound && !VALID.has(e.type)).map(e => e.type))];
  if (typeof ev.music === 'string' && ev.music) {
    const p = path.resolve(ev.music);
    const has = d => fs.existsSync(d) && fs.readdirSync(d).some(f => /\.(wav|mp3|ogg|flac|m4a)$/i.test(f));
    const ok = (fs.existsSync(p) && fs.statSync(p).isFile()) || has(path.resolve('assets/music', ev.music)) || has(path.resolve('sound/extra/music', ev.music));
    if (!ok) report.warnings.push(`Không có nhạc "${ev.music}" (sẽ dùng lớp nền tổng hợp)`);
  }
  if (unknown.length) report.warnings.push(`Loại âm thanh không có: ${unknown.join(', ')} (sẽ bị bỏ qua)`);
  const out = (ev.events || []).filter(e => !(e.t >= 0 && e.t <= dur + 1)).length;
  if (out) report.warnings.push(`${out} sự kiện âm thanh nằm ngoài thời lượng video`);
  report.sfx_events = (ev.events || []).length;
} catch (e) {
  report.warnings.push('events.json không đọc được');
}
fs.mkdirSync(path.resolve('jobs', slug), { recursive: true });
fs.writeFileSync(path.resolve('jobs', slug, 'validate.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
process.exit(report.errors.length ? 1 : 0);
