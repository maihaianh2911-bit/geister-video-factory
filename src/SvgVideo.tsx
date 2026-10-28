import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { REGISTRY } from './videos/registry';

// Inter is bundled at render time, so the look does not depend on fonts installed on the runner.
const { fontFamily } = loadFont('normal', { weights: ['700', '800', '900'], subsets: ['latin', 'latin-ext'] });

type SceneModule = { renderSvg: (t: number) => string; subtitleAt: (t: number) => string; subtitleStyle?: string };

// Subtitle looks, chosen per video in src/videos/<slug>/style.json ("subtitle").
const THEMES: Record<string, { box: React.CSSProperties; now: string; done: string; todo: string }> = {
  default: { box: { background: 'rgba(8,11,20,.88)', boxShadow: '0 8px 30px rgba(0,0,0,.45)', borderRadius: 20 }, now: '#ffd27a', done: '#ffffff', todo: 'rgba(255,255,255,.55)' },
  horror: { box: { background: 'rgba(0,0,0,.82)', borderRadius: 6, textShadow: '0 3px 0 #000', letterSpacing: 1.5 }, now: '#ff3b3b', done: '#f2f2f2', todo: 'rgba(242,242,242,.5)' },
  clean: { box: { background: 'transparent', textShadow: '0 0 6px #000, 0 0 2px #000, 0 4px 10px rgba(0,0,0,.8)' }, now: '#ffe14d', done: '#ffffff', todo: 'rgba(255,255,255,.7)' },
};
type Chunk = { s: number; e: number; w: [string, number, number][] };
export type Timing = { duration: number; precision: string; orig: number[][]; new: number[][]; chunks: Chunk[] };

const VIDEOS = REGISTRY as unknown as Record<string, { id: string; mod: SceneModule; timing: Timing }>;

export const timingFor = (video: string): Timing => VIDEOS[video].timing;
export const videoList = () => Object.entries(VIDEOS).map(([slug, v]) => ({ slug, id: v.id }));

// Piecewise-linear time warp: each script line's visuals (authored on the prototype timeline)
// are stretched onto the span where that line is actually spoken in the real voice.
const toOrig = (t: number, tm: Timing) => {
  for (let i = 0; i < tm.new.length; i++) {
    const [A, B] = tm.new[i];
    if (t >= A && t < B) {
      const [a, b] = tm.orig[i];
      return a + ((t - A) * (b - a)) / Math.max(B - A, 1e-6);
    }
  }
  const i = tm.new.length - 1;
  const [A, B] = tm.new[i];
  const [a, b] = tm.orig[i];
  return Math.min(b - 0.001, a + ((t - A) * (b - a)) / Math.max(B - A, 1e-6));
};

const Subtitle: React.FC<{ t: number; chunks: Chunk[]; theme?: string }> = ({ t, chunks, theme }) => {
  const th = THEMES[theme || 'default'] || THEMES.default;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) if (chunks[i].s <= t) idx = i;
  if (idx < 0) return null;
  const c = chunks[idx];
  const next = chunks[idx + 1];
  // keep the phrase on screen until the next phrase starts (max 1.2 s after its last word)
  if (!next && t > c.e + 1.2) return null;
  if (next && t >= next.s) return null;
  const pop = Math.min(1, (t - c.s) / 0.12);
  // German compounds and spelled-out years ("neunzehnhundertdreiundsechzig") can be wider than the
  // frame at 66 px and get cut off: shrink the phrase so its longest word fits the 920 px text area.
  const spacing = (th.box.letterSpacing as number) ?? 0.5;
  const longest = Math.max(...c.w.map(([w]) => w.length));
  const fontSize = Math.min(66, Math.floor(920 / (longest * (0.64 + spacing / 66))));
  return (
    <div style={{ position: 'absolute', top: 1440, left: 50, right: 50, textAlign: 'center' }}>
      <span
        style={{
          display: 'inline-block',
          padding: '18px 30px',
          ...th.box,
          transform: `scale(${0.94 + 0.06 * pop})`,
          fontWeight: 900,
          fontSize,
          lineHeight: 1.18,
          letterSpacing: spacing,
          overflowWrap: 'anywhere',
        }}
      >
        {c.w.map(([w, s], i) => {
          const spoken = t >= s;
          const current = spoken && (i === c.w.length - 1 || t < c.w[i + 1][1]);
          return (
            <span key={i} style={{ color: current ? th.now : spoken ? th.done : th.todo }}>
              {w}
              {i < c.w.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export type SvgVideoProps = { video: string; audio: string | null };

export const SvgVideo: React.FC<SvgVideoProps> = ({ video, audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const entry = VIDEOS[video];
  if (!entry) throw new Error(`Unknown video module: ${video}`);
  const { mod, timing } = entry;
  const tOrig = toOrig(t, timing);
  return (
    <AbsoluteFill style={{ backgroundColor: '#070b14', fontFamily }}>
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', left: 0, top: 0, fontFamily }}
        dangerouslySetInnerHTML={{ __html: mod.renderSvg(tOrig) }}
      />
      {timing.chunks?.length ? (
        <Subtitle t={t} chunks={timing.chunks} theme={mod.subtitleStyle} />
      ) : (
        <div style={{ position: 'absolute', top: 1500, left: 60, right: 60, textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 46 }}>
          {mod.subtitleAt(tOrig)}
        </div>
      )}
      {audio ? <Audio src={staticFile(audio)} /> : null}
    </AbsoluteFill>
  );
};
