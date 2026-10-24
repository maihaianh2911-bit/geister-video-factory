import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
// @ts-ignore - plain JS scene modules
import * as geister from './videos/geister/scene.js';

// Inter is bundled at render time, so the look does not depend on fonts installed on the runner.
const { fontFamily } = loadFont('normal', { weights: ['700', '800', '900'], subsets: ['latin', 'latin-ext'] });

type SceneModule = { renderSvg: (t: number) => string; subtitleAt: (t: number) => string };
const VIDEOS: Record<string, SceneModule> = { geister: geister as unknown as SceneModule };

export type SvgVideoProps = { video: string; audio: string | null };

export const SvgVideo: React.FC<SvgVideoProps> = ({ video, audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const mod = VIDEOS[video];
  if (!mod) throw new Error(`Unknown video module: ${video}`);
  return (
    <AbsoluteFill style={{ backgroundColor: '#070b14', fontFamily }}>
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', left: 0, top: 0, fontFamily }}
        dangerouslySetInnerHTML={{ __html: mod.renderSvg(t) }}
      />
      <div style={{ position: 'absolute', top: 1500, left: 60, right: 60, textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(8,11,20,.86)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 1.3,
            padding: '20px 32px',
            borderRadius: 18,
            boxShadow: '0 8px 30px rgba(0,0,0,.4)',
          }}
        >
          {mod.subtitleAt(t)}
        </span>
      </div>
      {audio ? <Audio src={staticFile(audio)} /> : null}
    </AbsoluteFill>
  );
};
