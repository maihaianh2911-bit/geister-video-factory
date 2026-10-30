// 11.1–15.04: one big shop for the whole week — a full bag on Monday; the summer sun rises over the week on "Sommer", a "?" on "schwieriger"
import { K, DEFS, BG, cal, bag, milk, meat, yog, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];
  const b = back(prog(t, 11.3, 11.7));
  const sun = eio(prog(t, 12.0, 14.1)); // the summer sun climbs across the week and is fully up on "Sommer"
  const q = back(prog(t, 14.6, 14.9));
  let heat = '';
  for (let i = 1; i < 7; i++) heat += `<path d="M ${f1(60 + i * 137)} 1080 q 14 -20 0 -40 q -14 -20 0 -40" fill="none" stroke="${K.sun}" stroke-width="6" stroke-linecap="round" opacity="${f1(sun * .8)}"/>`;
  const inner = `<g transform="translate(128 1090) scale(${f1(.55 * b)})">${bag(0, 0, 1, `${milk(-50, -150)}${meat(40, -120, .9)}${yog(60, -160)}`)}</g>${heat}`;
  return `${DEFS}${BG('url(#kSun)')}
    <circle cx="${f1(lerp(980, 820, sun))}" cy="${f1(lerp(760, 380, sun))}" r="120" fill="#FFD25A" stroke="${K.sun}" stroke-width="6"/><circle cx="${f1(lerp(980, 820, sun))}" cy="${f1(lerp(760, 380, sun))}" r="220" fill="url(#kGlowW)" opacity="${f1(sun)}"/>
    ${cal(60, 860, 960, days, inner)}
    ${q > 0 ? `<g transform="translate(540 1300) scale(${f1(q)})"><circle r="60" fill="${K.n0}" stroke="${K.sun}" stroke-width="5"/><text y="30" text-anchor="middle" fill="${K.sun}" style="font-family:'Inter';font-weight:900;font-size:84px">?</text></g>` : ''}`;
}
