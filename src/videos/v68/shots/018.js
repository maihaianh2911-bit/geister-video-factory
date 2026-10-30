// 44.52–48.32: a lamp behind the egg switches on ("Lampe") — the membrane glows and the darker yolk shows through ("Dotter")
import { K, OL, f1, prog, eio, eout, lerp } from './lib.js';
import { C, egg } from './sets.js';
export default function renderShot(t) {
  const on = eout(prog(t, 45.2, 45.6)), see = eio(prog(t, 46.4, 47.2));
  const bg = `<rect x="-60" y="-60" width="1200" height="2040" fill="${C.wall}"/><rect x="-60" y="-60" width="1200" height="2040" fill="#2B2A3A" opacity="${f1(.55 * on)}"/>`;
  const lamp = `<g transform="translate(860 640)"><path d="M -70 -60 L 70 -60 L 100 40 L -100 40 Z" fill="${K.blue}" ${OL(7)}/><path d="M 0 40 V 380 M -80 380 H 80" ${OL(12)}/>
    <ellipse cx="0" cy="44" rx="60" ry="14" fill="${on > 0 ? '#FFE9A8' : '#F4EFE6'}" ${OL(5)}/></g>`;
  const beam = on > 0 ? `<path d="M 800 690 L 260 620 L 260 1380 L 920 700 Z" fill="#FFE9A8" opacity="${f1(.35 * on)}"/>` : '';
  return `${bg}${beam}${lamp}${egg(470, 980, 3.6, { id: 'e18', shell: 0, w: 7, glow: on * lerp(.3, 1, see) })}`;
}
