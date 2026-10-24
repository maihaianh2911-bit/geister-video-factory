import React from 'react';
import { Composition } from 'remotion';
import { SvgVideo, SvgVideoProps } from './SvgVideo';
// @ts-ignore - plain JS scene module
import * as geister from './videos/geister/scene.js';

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Geister"
        component={SvgVideo as unknown as React.FC<Record<string, unknown>>}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={Math.round(geister.DURATION_S * FPS)}
        defaultProps={{ video: 'geister', audio: null } satisfies SvgVideoProps}
      />
    </>
  );
};
