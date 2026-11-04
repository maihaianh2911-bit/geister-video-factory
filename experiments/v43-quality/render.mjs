import fs from 'fs';
import path from 'path';
import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderMedia, renderStill } from '@remotion/renderer';
const config = JSON.parse(fs.readFileSync('experiments/v43-quality/segments.json', 'utf8'));
const out = path.resolve('out/v43-quality');fs.mkdirSync(out,{recursive:true});
const serveUrl = await bundle({entryPoint:path.resolve('src/index.ts')});
const browser = await openBrowser('chrome');
try {
  const props={video:config.video,audio:null};
  const composition=await selectComposition({serveUrl,id:'v43-trial',inputProps:props,puppeteerInstance:browser});
  for(const segment of config.segments){
    await renderMedia({serveUrl,composition,inputProps:props,codec:'h264',concurrency:3,frameRange:segment.frames,
      outputLocation:path.join(out,`${segment.slug}-silent.mp4`),puppeteerInstance:browser});
    await renderStill({serveUrl,composition,inputProps:props,frame:Math.round(segment.poster_time*30),
      output:path.join(out,`${segment.slug}-after.png`),imageFormat:'png',puppeteerInstance:browser});
    // Short motion contact sheets for internal art-direction review, without a second video draft.
    const chosen=segment.review_times;
    for(let i=0;i<chosen.length;i++)await renderStill({serveUrl,composition,inputProps:props,frame:Math.round(chosen[i]*30),
      output:path.join(out,`${segment.slug}-motion-${i}.png`),imageFormat:'png',scale:.25,puppeteerInstance:browser});
    console.log('rendered excerpt',segment.slug,segment.frames);
  }
} finally {await browser.close({silent:true});}
