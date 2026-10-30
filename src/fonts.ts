import { useEffect, useState } from 'react';
import { cancelRender, continueRender, delayRender, staticFile } from 'remotion';

// Inter (variable, SIL Open Font License) ships in public/fonts, so renders never fetch fonts.gstatic.com:
// a proxy whose certificate the render browser does not trust would otherwise fail every frame.
export const fontFamily = 'Inter';

const FACES = [
  {
    file: 'fonts/inter-latin.woff2',
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  },
  {
    file: 'fonts/inter-latin-ext.woff2',
    unicodeRange: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  },
];

let loading: Promise<void> | null = null;
const loadInter = () =>
  (loading ??= Promise.all(
    FACES.map(({ file, unicodeRange }) =>
      new FontFace(fontFamily, `url(${staticFile(file)}) format('woff2')`, { weight: '100 900', style: 'normal', unicodeRange })
        .load()
        .then((face) => { document.fonts.add(face); }),
    ),
  ).then(() => undefined));

// Holds the frame until Inter is ready. This must run inside a component: a delayRender() made while the bundle
// is still evaluating loses its timeout record when Remotion initialises, so its 28 s timer fires mid-render.
export const useInterFont = () => {
  const [handle] = useState(() => delayRender('Inter font'));
  useEffect(() => {
    loadInter().then(() => continueRender(handle)).catch((e) => cancelRender(new Error(`Inter font: ${e}`)));
  }, [handle]);
};
