// L9 49.86–53.9: a long calendar strip of days, each ticked; one day stays empty on "verpasster Tag" (51.6–52.2, marked with a dashed outline);
// the green habit curve above runs on over the gap without dropping ("kaum einen Unterschied", 52.84). Label 1 TAG VERPASST.
import { K, frame, cam, prog, eio, pop, label, T, f1, op, check } from './lib.js';
import { voidRoom2 } from './sets3.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#2c3346', bot: '#3d4258' });
  const n = 9, cw = 104, x0 = 70, cy = 1060, miss = 5;
  const run = prog(t, 50.0, 53.4);
  s += `<rect x="40" y="960" width="1000" height="200" rx="20" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/>`;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * cw, shown = run * n > i;
    const m = i === miss;
    s += `<rect x="${x + 6}" y="${cy - 60}" width="${cw - 12}" height="120" rx="10" fill="${m ? '#fbf8ef' : '#eef0f2'}" stroke="${m && t > 51.6 ? '#d9493f' : '#b9b2a4'}" stroke-width="${m ? 5 : 3}"${m ? ' stroke-dasharray="12 8"' : ''}/>` + T(x + cw / 2, cy - 72, `${60 + i}`, 24, { fill: '#9aa3ad', w: 700 });
    if (shown && !m) s += check(x + cw / 2, cy + 4, 1, K.green, 1);
  }
  // curve above: high and flat, keeps going over the gap
  const yC = x => 760 - 12 * Math.sin(x / 140);
  let d = ''; const xe = x0 + run * n * cw;
  for (let x = x0; x <= xe; x += 14) d += (d ? ' L ' : 'M ') + f1(x) + ' ' + f1(yC(x));
  if (d) s += `<path d="${d}" stroke="#3c9a5f" stroke-width="16" fill="none" stroke-linecap="round"/><circle cx="${f1(xe)}" cy="${f1(yC(xe))}" r="16" fill="#3c9a5f" stroke="${INK}" stroke-width="5"/>`;
  s += T(260, 680, 'AUTOMATISCH', 32, { anchor: 'start', fill: '#cfd6e0' });
  const pan = eio(prog(t, 49.86, 53.9));
  s = cam(s, 420 + 220 * pan, 900, 1.25);
  s += label('1 TAG VERPASST', 540, 260, 92, { p: pop(t, 51.6, .45) });
  return frame(s);
}
