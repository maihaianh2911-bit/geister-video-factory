import { cobbles, fig, rathaus, rifle, sky, frame, tag, prog, eio, eout, back, lerp } from './lib.js';
// 31.3–34.18 Wide: the column arrives at the red-brick Köpenick Rathaus; it halts and the main door opens on "Rathaus".
export default function renderShot(t) {
  const s = .82, gy = 1250, cx = 540;
  const arr = eout(prog(t, 31.3, 33.0));
  const walking = t < 33.0;
  const open = eout(prog(t, 33.1, 33.6));
  let g = '';
  for (let i = 4; i >= 1; i--) g += fig(lerp(-420, 330, arr) - i * 70, 1520 + (i % 2) * 10, .55, { kind: 'soldier', walk: walking ? t * 8 + i : undefined, backR: rifle, aR: -6, look: 10 });
  return frame(t, `${sky()}<g transform="translate(540 1100) scale(${1 + .05 * eio(prog(t, 31.3, 34.18))}) translate(-540 -1100)">${rathaus(cx, gy, s, { flag: t, open })}${cobbles(gy + 5, 1920)}
    ${g}${fig(lerp(-300, 450, arr), 1530, .6, { kind: 'voigt', walk: walking ? t * 8 : undefined, aR: t > 33.2 ? -60 : -8, look: 10, lookY: -6, brow: 'angry' })}</g>
    ${tag(540, 230, 'RATHAUS KÖPENICK', back(prog(t, 32.42, 32.65)), { sz: 54, rot: -2 })}`);
}
