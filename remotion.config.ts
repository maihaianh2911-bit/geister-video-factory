import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
// Software WebGL so 3D layers (src/Layers.tsx) render on GPU-less GitHub runners.
Config.setChromiumOpenGlRenderer('swangle');
