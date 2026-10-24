// Render the review package for a video: one still per storyboard shot + the first 10 s with sound.
// Usage: node scripts/preview.mjs <slug> <compositionId> [audioPathInPublic]
import fs from 'fs';
import path from 'path';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';

const [slug, compId, audio] = process.argv.slice(2);
const out = path.resolve('out/preview', slug);
fs.mkdirSync(out, { recursive: true });
const inputProps = { video: slug, audio: audio || null };
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: compId, inputProps });
const fps = composition.fps, last = composition.durationInFrames - 1;

let sb = [];
try { sb = JSON.parse(fs.readFileSync(path.resolve('src/videos', slug, 'storyboard.json'), 'utf8')); } catch {}
let frames = sb.map(s => Math.round(((s.t0 + (s.t1 ?? s.t0 + 2)) / 2) * fps));
if (!frames.length) for (let f = Math.round(fps * 2); f < last; f += fps * 6) frames.push(f);
frames = frames.map(f => Math.max(0, Math.min(last, f)));

for (let i = 0; i < frames.length; i++) {
  await renderStill({ composition, serveUrl, inputProps, frame: frames[i], output: path.join(out, `sb_${String(i + 1).padStart(2, '0')}.png`), imageFormat: 'png' });
  console.log(`still ${i + 1}/${frames.length} @ frame ${frames[i]}`);
}
await renderMedia({
  composition, serveUrl, inputProps, codec: 'h264', concurrency: 2,
  frameRange: [0, Math.min(10 * fps - 1, last)],
  outputLocation: path.join(out, 'first10.mp4'),
});
fs.writeFileSync(path.join(out, 'frames.json'), JSON.stringify(frames));
console.log('preview done');
