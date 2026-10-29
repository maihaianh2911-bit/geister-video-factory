// Actual Remotion frames, including subtitle style and the voice time warp.
// node scripts/local_stills.cjs <slug> [t1,t2,...]
// node scripts/local_stills.cjs <slug> --review  -> per-scene evidence in jobs/<slug>/review
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { bundle } = require('@remotion/bundler');
const { openBrowser, renderStill, selectComposition } = require('@remotion/renderer');

(async () => {
  const slug = process.argv[2];
  if (!slug || !/^[A-Za-z0-9_-]+$/.test(slug)) throw new Error('Invalid video slug');
  const root = path.resolve(__dirname, '..');
  const dir = path.join(root, 'src/videos', slug);
  const tm = JSON.parse(fs.readFileSync(path.join(dir, 'timing.json'), 'utf8'));
  const review = process.argv.includes('--review');
  let plan, groups;
  if (review) {
    plan = JSON.parse(execFileSync('python3', [path.join(root, 'scripts/review_scenes.py'), 'plan', slug], { cwd: root, encoding: 'utf8' }));
    groups = plan.groups;
  } else {
    let times = process.argv[3] ? process.argv[3].split(',').map(Number) : [];
    if (!times.length) {
      try { times = JSON.parse(fs.readFileSync(path.join(dir, 'storyboard.json'), 'utf8')).map(s => (s.t0 + s.t1) / 2); } catch {}
      for (let t = 1; t < tm.duration; t += 4) times.push(t);
      times = [...new Set(times)].sort((a, b) => a - b).slice(0, 24);
    }
    if (!times.length || times.some(t => !Number.isFinite(t) || t < 0 || t >= tm.duration)) throw new Error('Invalid frame times');
    groups = [{ file: 'grid.jpg', frames: times.map(t => Math.min(Math.ceil(tm.duration * 30) - 1, Math.round(t * 30))) }];
  }
  const out = path.join(root, 'out/local', slug);
  const dest = review ? path.join(root, 'jobs', slug, 'review') : out;
  fs.mkdirSync(out, { recursive: true });
  fs.mkdirSync(dest, { recursive: true });
  let previous = {};
  if (review) {
    try { previous = JSON.parse(fs.readFileSync(path.join(dest, 'manifest.json'), 'utf8')); } catch {}
    // Incomplete rerenders cannot leave a current manifest behind.
    fs.rmSync(path.join(dest, 'manifest.json'), { force: true });
  }
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  const cached = group => {
    const old = previous.plan?.groups?.find(g => g.file === group.file);
    const file = path.join(dest, group.file);
    return review && old?.fingerprint === group.fingerprint && JSON.stringify(old.frames) === JSON.stringify(group.frames)
      && fs.existsSync(file) && previous.files?.[group.file] === hash(file);
  };
  const reused = groups.filter(cached), dirty = groups.filter(group => !reused.includes(group));
  const registry = path.join(root, 'src/videos/registry.ts');
  const oldRegistry = fs.existsSync(registry) ? fs.readFileSync(registry) : null;
  let browser;
  try {
    execFileSync('python3', [path.join(root, 'scripts/gen_registry.py'), '--only', slug], { cwd: root });
    const frames = [...new Set(dirty.flatMap(g => g.frames))].sort((a, b) => a - b);
    const rawManifest = path.join(out, 'frame-cache.json');
    let rawOld = {};
    try { rawOld = JSON.parse(fs.readFileSync(rawManifest, 'utf8')); } catch {}
    const rendered = new Map(), rawNext = {}, freshFrames = [];
    for (const frame of frames) {
      const file = path.join(out, `f_${String(frame).padStart(6, '0')}.png`);
      const shot = review && plan.shots.find(s => s.t0 <= frame / 30 && frame / 30 < s.t1);
      const key = shot ? `${shot.render_key}:${frame}` : null;
      const old = rawOld[frame];
      if (key && old?.key === key && fs.existsSync(file) && old.sha === hash(file)) {
        rendered.set(frame, file); rawNext[frame] = old;
      } else freshFrames.push({ frame, file, key });
    }
    let serveUrl, composition;
    const inputProps = { video: slug, audio: null };
    if (freshFrames.length) {
      serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
      browser = await openBrowser('chrome');
      composition = await selectComposition({ serveUrl, id: slug === 'geister' ? 'Geister' : slug.replace(/[^A-Za-z0-9-]/g, '-'), inputProps, puppeteerInstance: browser });
    }
    for (const { frame, file, key } of freshFrames) {
      await renderStill({ composition, serveUrl, inputProps, frame, output: file, imageFormat: 'png', scale: 1 / 3, puppeteerInstance: browser });
      rendered.set(frame, file); rawNext[frame] = { key, sha: hash(file) };
    }
    // Keep valid older raw samples for the next small edit in the same working checkout.
    if (review) fs.writeFileSync(rawManifest, JSON.stringify({ ...rawOld, ...rawNext }));
    const files = Object.fromEntries(reused.map(group => [group.file, previous.files[group.file]]));
    for (const group of dirty) {
      const sheet = path.join(out, 'sheets', group.file.replace('.jpg', ''));
      fs.rmSync(sheet, { recursive: true, force: true });
      fs.mkdirSync(sheet, { recursive: true });
      group.frames.forEach((frame, i) => fs.copyFileSync(rendered.get(frame), path.join(sheet, `${String(i).padStart(3, '0')}.png`)));
      const cols = Math.min(4, group.frames.length), rows = Math.ceil(group.frames.length / cols);
      const labels = group.frames.map((frame, i) => `drawtext=text='${(frame / 30).toFixed(2)}s':x=${i % cols * 366 + 6}:y=${Math.floor(i / cols) * 646 + 6}:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.8`);
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '1', '-i', path.join(sheet, '%03d.png'), '-vf',
        [`tile=${cols}x${rows}:padding=6:color=0x222222`, ...labels].join(','), '-frames:v', '1', '-q:v', '3', path.join(dest, group.file)]);
      files[group.file] = hash(path.join(dest, group.file));
    }
    if (review) {
      // Refuse to attach evidence to sources that changed during rendering.
      const fresh = JSON.parse(execFileSync('python3', [path.join(root, 'scripts/review_scenes.py'), 'plan', slug], { cwd: root, encoding: 'utf8' }));
      if (JSON.stringify(fresh) !== JSON.stringify(plan)) throw new Error('Sources changed during review rendering; rerun');
      fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify({ plan, files }, null, 2) + '\n');
      for (const file of fs.readdirSync(dest)) {
        if (/^(scene-|poster-|cuts-|hook|overview).*\.jpg$/.test(file) && !files[file]) fs.unlinkSync(path.join(dest, file));
      }
    }
    console.log(JSON.stringify({ slug, frames: freshFrames.length, reused_frames: frames.length - freshFrames.length, reused_sheets: reused.length, rendered_sheets: dirty.length, sheets: Object.keys(files).map(f => path.join(dest, f)), errors: [] }, null, 2));
  } finally {
    if (oldRegistry) fs.writeFileSync(registry, oldRegistry);
    else fs.rmSync(registry, { force: true });
    if (browser) await browser.close({ silent: true });
  }
})().catch(error => { console.error(error); process.exit(1); });

