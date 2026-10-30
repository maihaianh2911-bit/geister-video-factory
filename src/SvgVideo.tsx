import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { fontFamily, useInterFont } from './fonts';
import { REGISTRY } from './videos/registry';
import { Layers, LayerDesc } from './Layers';

type SceneModule = { renderSvg: (t: number) => string; subtitleAt: (t: number) => string; subtitleStyle?: string; subtitleTop?: number; layers?: (t: number) => LayerDesc[] };

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

// "pop": TikTok-style captions — only the current 1–3 words, very large, centred, white with a heavy outline,
// the word being spoken in yellow. Words are grouped in pairs (a long word stands alone).
const PopSubtitle: React.FC<{ t: number; c: Chunk; top?: number }> = ({ t, c, top }) => {
  const groups: number[][] = [];
  for (let i = 0; i < c.w.length; i++) {
    const g = groups[groups.length - 1];
    if (g && g.length < 2 && c.w[g[0]][0].length + c.w[i][0].length < 16) g.push(i);
    else groups.push([i]);
  }
  let cur = 0;
  for (let i = 0; i < c.w.length; i++) if (c.w[i][1] <= t) cur = i;
  const g = groups.find((x) => x.includes(cur)) || groups[0];
  const gStart = c.w[g[0]][1];
  const pop = Math.min(1, Math.max(0, (t - gStart) / 0.1));
  const longest = Math.max(...g.map((i) => c.w[i][0].length + 1)) * (g.length > 1 ? 1.6 : 1);
  const fontSize = Math.min(104, Math.floor(960 / (longest * 0.62)));
  return (
    <div style={{ position: 'absolute', top: top ?? 1300, left: 40, right: 40, textAlign: 'center' }}>
      <span
        style={{
          display: 'inline-block',
          transform: `scale(${0.85 + 0.15 * pop})`,
          fontWeight: 900,
          fontSize,
          lineHeight: 1.1,
          letterSpacing: 0.5,
          color: '#ffffff',
          WebkitTextStroke: `${Math.round(fontSize / 9)}px #111111`,
          paintOrder: 'stroke fill',
          textShadow: '0 6px 0 rgba(0,0,0,.35)',
        }}
      >
        {g.map((i, k) => (
          <span key={i} style={{ color: t >= c.w[i][1] && i === cur ? '#ffd23f' : '#ffffff' }}>
            {c.w[i][0]}
            {k < g.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </div>
  );
};

const Subtitle: React.FC<{ t: number; chunks: Chunk[]; theme?: string; top?: number }> = ({ t, chunks, theme, top }) => {
  const th = THEMES[theme || 'default'] || THEMES.default;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) if (chunks[i].s <= t) idx = i;
  if (idx < 0) return null;
  const c = chunks[idx];
  const next = chunks[idx + 1];
  // keep the phrase on screen until the next phrase starts (max 1.2 s after its last word)
  if (!next && t > c.e + 1.2) return null;
  if (next && t >= next.s) return null;
  if (theme === 'pop') return <PopSubtitle t={t} c={c} top={top} />;
  const pop = Math.min(1, (t - c.s) / 0.12);
  // German compounds and spelled-out years ("neunzehnhundertdreiundsechzig") can be wider than the
  // frame at 66 px and get cut off: shrink the phrase so its longest word fits the 920 px text area.
  const spacing = (th.box.letterSpacing as number) ?? 0.5;
  const longest = Math.max(...c.w.map(([w]) => w.length));
  const fontSize = Math.min(66, Math.floor(920 / (longest * (0.64 + spacing / 66))));
  return (
    <div style={{ position: 'absolute', top: top ?? 1440, left: 50, right: 50, textAlign: 'center' }}>
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
  useInterFont();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const entry = VIDEOS[video];
  if (!entry) throw new Error(`Unknown video module: ${video}`);
  const { mod, timing } = entry;
  const tOrig = toOrig(t, timing);
  let layers: LayerDesc[] = [];
  try { layers = typeof mod.layers === 'function' ? mod.layers(tOrig) || [] : []; } catch (e) { layers = []; }
  return (
    <AbsoluteFill style={{ backgroundColor: '#070b14', fontFamily }}>
      {layers.length ? <Layers list={layers} z="under" /> : null}
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', left: 0, top: 0, fontFamily }}
        dangerouslySetInnerHTML={{ __html: mod.renderSvg(tOrig) }}
      />
      {layers.length ? <Layers list={layers} z="over" /> : null}
      {timing.chunks?.length ? (
        <Subtitle t={t} chunks={timing.chunks} theme={mod.subtitleStyle} top={mod.subtitleTop} />
      ) : (
        <div style={{ position: 'absolute', top: 1500, left: 60, right: 60, textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 46 }}>
          {mod.subtitleAt(tOrig)}
        </div>
      )}
      {audio ? <Audio src={staticFile(audio)} /> : null}
    </AbsoluteFill>
  );
};
