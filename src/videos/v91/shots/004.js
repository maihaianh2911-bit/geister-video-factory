// L3 10.56–14.54 du wants to say "Super!" (thought) — on "Heraus" the X locks his mouth, the lie is struck, "Zu viele Folien." bursts out; her smile drops.
import { K, frame, bg, shadow, person, lie, speech, easel, cam, prog, eio, pop, lockAt, lockAlpha } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { sc: 1.1 });
  s += `<g opacity=".9">${easel(150, 760, .7, { label: '' })}</g>`;
  s += shadow(330, 1350, 100) + shadow(760, 1350, 100);
  const drop = eio(prog(t, 13.7, 14.0));
  s += person('kol', 330, 1350, 1, { t, seed: 2, eyes: drop > .5 ? 'sad' : 'happy', mouth: drop > .5 ? 'sad' : 'grin', look: [10, 0], armR: drop > .5 ? null : [110, -260], headDy: 10 * drop });
  const lk = lockAt(t, 12.5, 13.3);
  const out = t > 13.38;
  s += person('du', 760, 1350, 1, { t, seed: 1, eyes: lk > 0 || out ? 'wide' : 'n', brows: out ? 'up' : null, mouth: lk > 0 ? 'none' : (out ? 'o' : 'smile'), lock: lk, lockA: lockAlpha(t, 13.3), look: [-12, 0] });
  s += lie(820, 640, 'Super!', 790, 800, { p: pop(t, 11.16, .4), strike: eio(prog(t, 12.6, 12.95)), size: 60, a: t > 13.38 ? .45 : undefined });
  s += speech(560, 470, 'Zu viele Folien.', 720, 870, { p: pop(t, 13.38, .4), size: 56 });
  return frame(cam(s, 560, 1000, 1 + .05 * eio(prog(t, 10.56, 14.54))));
}
