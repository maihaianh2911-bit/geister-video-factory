// Reuse reviewed posters for the storyboard; render only an explicitly requested clip.
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';

const [slug, compId, audio] = process.argv.slice(2);
if (!slug || !/^[A-Za-z0-9_-]+$/.test(slug)) throw new Error('Invalid video slug');
const out = path.resolve('out/preview', slug);
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (/^(sb_|tile_).*\.(png|jpg)$/.test(f) || f === 'first10.mp4') fs.unlinkSync(path.join(out, f));
const reviewed = spawnSync('python3', ['scripts/review_scenes.py', 'check', slug], { encoding: 'utf8' }).status === 0;
const inputProps = { video: slug, audio: audio || null };
let serveUrl, composition, frames = [];
async function prepareRenderer() {
  if (composition) return;
  serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
  composition = await selectComposition({ serveUrl, id: compId, inputProps });
}
if (reviewed) {
  const dir = path.resolve('jobs', slug, 'review');
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const posters = manifest.plan.groups.filter(g => /^poster-\d+\.jpg$/.test(g.file));
  posters.forEach((g, i) => {
    fs.copyFileSync(path.join(dir, g.file), path.join(out, `sb_${String(i + 1).padStart(3, '0')}.jpg`));
    frames.push(g.frames[0]);
  });
  console.log(`reused ${posters.length} reviewed storyboard posters; no still render`);
} else {
  // Legacy/mock preview remains available; production has its own mandatory review gate.
  await prepareRenderer();
  const fps = composition.fps, last = composition.durationInFrames - 1;
  let sb = [];
  try { sb = JSON.parse(fs.readFileSync(path.resolve('src/videos', slug, 'storyboard.json'), 'utf8')); } catch {}
  frames = sb.map(s => Math.round(((s.t0 + (s.t1 ?? s.t0 + 2)) / 2) * fps));
  if (!frames.length) for (let f = Math.round(fps * 2); f < last; f += fps * 6) frames.push(f);
  frames = frames.map(f => Math.max(0, Math.min(last, f)));
  for (let i = 0; i < frames.length; i++) {
    await renderStill({ composition, serveUrl, inputProps, frame: frames[i], output: path.join(out, `sb_${String(i + 1).padStart(3, '0')}.png`), imageFormat: 'png' });
  }
}
if (!process.env.SKIP_CLIP) {
  await prepareRenderer();
  await renderMedia({ composition, serveUrl, inputProps, codec: 'h264', concurrency: 2,
    frameRange: [0, Math.min(10 * composition.fps - 1, composition.durationInFrames - 1)],
    outputLocation: path.join(out, 'first10.mp4') });
}
fs.writeFileSync(path.join(out, 'frames.json'), JSON.stringify(frames));
console.log('preview done');
