import React from 'react';
import { Composition } from 'remotion';
import { SvgVideo, SvgVideoProps, timingFor } from './SvgVideo';

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
        durationInFrames={Math.ceil(timingFor('geister').duration * FPS)}
        defaultProps={{ video: 'geister', audio: null } satisfies SvgVideoProps}
      />
    </>
  );
};
