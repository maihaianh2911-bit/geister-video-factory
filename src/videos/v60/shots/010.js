// Green starts to walk off to the left; red grabs his sleeve and pulls him back; the four close up into one group.
import { K, DEFS60, forest, fig, reach, FG, prog, eio, eout, back, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const go = eio(prog(t, 13.3, 13.6)), pull = eio(prog(t, 13.62, 14.2));
  const gx = lerp(lerp(300, 150, go), 330, pull);
  const others = eio(prog(t, 13.9, 14.5));
  const [a1, a2] = reach(470, 1560, 1.05, -1, gx + 70, 1050);
  const grab = prog(t, 13.45, 13.62);
  return DEFS60 + `${forest(t, { hz: 1000, px: -30 })}
  <rect x="0" y="1180" width="1080" height="200" fill="#3A3A32" opacity=".6"/>
  <ellipse cx="480" cy="900" rx="520" ry="560" fill="url(#fAmb)" opacity=".4"/>
  ${fig('green', gx, 1560, 1.0, { walk: go < 1 && pull < .05 ? t * 10 : undefined, back: go > .2 && pull < .5, look: -12, brow: pull > .5 ? 'worry' : 'calm', lean: pull > 0 && pull < 1 ? 6 : 0 })}
  ${fig('red', 470, 1560, 1.05, { aL: grab > 0 ? [lerp(10, a1, eout(grab)), lerp(6, a2, eout(grab))] : [10, 6], look: -14, brow: 'focus', mouth: t > 13.45 && t < 14.2 ? 'o' : 'flat', blink: blinkAt(t) })}
  ${fig('blue', lerp(760, 680, others), 1580, 1.05, { hug: true, cold: true, brow: 'worry', shiver: .5, t, look: -8 })}
  ${fig('yellow', lerp(960, 870, others), 1560, 1.0, { look: -10, brow: 'worry', walk: others > 0 && others < 1 ? t * 9 : undefined })}
  ${FG(1400)}`;
}
