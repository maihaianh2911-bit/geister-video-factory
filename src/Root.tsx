import React from 'react';
import { Composition } from 'remotion';
import { SvgVideo, SvgVideoProps, timingFor, videoList } from './SvgVideo';

const FPS = 30;

// One composition per folder in src/videos (see scripts/gen_registry.py).
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {videoList().map(({ slug, id }) => (
        <Composition
          key={slug}
          id={id}
          component={SvgVideo as unknown as React.FC<Record<string, unknown>>}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={Math.ceil(timingFor(slug).duration * FPS)}
          defaultProps={{ video: slug, audio: null } satisfies SvgVideoProps}
        />
      ))}
    </>
  );
};
