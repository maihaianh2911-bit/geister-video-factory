// L15b 68.6–72.36: the notebook SORGEN-TAGEBUCH on the desk under the warm lamp; it opens (69.3); the page shows a date and the worry "Ich verliere meinen Job." with a little cloud drawing; on "Vermutung" (71.5) a blue stamp VERMUTUNG lands over the crossed-out word TATSACHE.
import { K, frame, cam, prog, eio, pop, T, pool, f1 } from './lib.js';
import { notebook, stamp, write, cross } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = `<defs><linearGradient id="v99dk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a36"/><stop offset="1" stop-color="#3e2a20"/></linearGradient></defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v99dk)"/>`;
  s += `<g opacity=".5"><rect x="-200" y="1200" width="1480" height="30" fill="#2a1c14"/></g>`;
  s += pool(380, 620, 620, 640, '#ffc46b', .5);
  // props on the desk: mug, pen tray, plant
  s += `<g transform="translate(900 300)"><path d="M -60 -90 L 60 -90 L 50 40 L -50 40 Z" fill="#f2efe8" stroke="${INK}" stroke-width="6"/><path d="M 58 -60 C 110 -60 110 10 54 10" fill="none" stroke="${INK}" stroke-width="8"/></g>`;
  s += `<g transform="translate(150 290)"><circle r="80" fill="#4f8a5b" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="-30" r="50" fill="#5e9a6a"/></g>`;
  const open = eio(prog(t, 69.3, 70.0));
  let left = T(200, 80, '03.11.', 44, { fill: '#2f5fb5', w: 800 });
  left += `<g transform="translate(200 230)" fill="#8d939e" stroke="${INK}" stroke-width="4"><circle cx="-50" cy="0" r="40"/><circle cx="10" cy="-20" r="50"/><circle cx="60" cy="4" r="36"/><rect x="-80" y="0" width="170" height="40" rx="20"/></g>`;
  let page = write('Sorge:', 30, 80, 34, eio(prog(t, 70.0, 70.3)), 'a26', '#7a838c');
  page += write('Ich verliere', 30, 140, 40, eio(prog(t, 70.2, 70.7)), 'b26') + write('meinen Job.', 30, 195, 40, eio(prog(t, 70.5, 71.0)), 'c26');
  page += T(30, 290, 'TATSACHE?', 40, { anchor: 'start', fill: '#d9493f', op: eio(prog(t, 70.8, 71.1)) });
  s += notebook(540, 820, 1.2, { open, left, page });
  // cross over TATSACHE? then VERMUTUNG stamp
  const tx = 540 + 1.2 * 120, ty = 820 + 1.2 * (-250 + 276);
  if (t > 71.1) s += `<path d="M ${f1(tx - 120)} ${f1(ty)} L ${f1(tx - 120 + 260 * eio(prog(t, 71.1, 71.4)))} ${f1(ty)}" stroke="#d9493f" stroke-width="10" stroke-linecap="round"/>`;
  s += stamp(540 + 1.2 * 200, 820 + 1.2 * 150, 'VERMUTUNG', 54, prog(t, 71.45, 71.7), { col: '#2f6fd6', rot: -7 });
  return frame(cam(s, 540, 820, 1.0 + .06 * eio(prog(t, 68.6, 72.36))));
}
