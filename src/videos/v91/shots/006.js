// L5 18.34–21.5 "Er war trocken." bursts out; mum's face falls, she lowers the cake; on "still" the call goes grey and silent ("…"); du cringes.
import { K, frame, bg, shadow, person, phone, callFrame, plateCake, lie, speech, cam, prog, eio, pop, lockAt, lockAlpha } from './lib.js';
export default function renderShot(t) {
  let s = bg('living', { sc: 1.06 });
  s += shadow(300, 1380, 100);
  const lk = lockAt(t, 18.0, 18.5);
  const cringe = eio(prog(t, 20.2, 20.6));
  s += person('du', 300, 1380, 1, { t, seed: 1, look: [12, -4], eyes: cringe > .5 ? 'closed' : 'wide', brows: 'sad', mouth: lk > 0 ? 'none' : 'o', lock: lk, lockA: lockAlpha(t, 18.5),
    armR: [92, -440], armL: cringe > 0 ? [-90, -330 - 120 * cringe] : null, headDy: 8 * cringe });
  s += phone(392, 920, .45, { rot: 10, screen: `<rect x="-60" y="-114" width="120" height="228" rx="12" fill="#7fc49a"/>` });
  const fall = eio(prog(t, 19.3, 19.8)), grey = eio(prog(t, 20.5, 21.0));
  let inner = `<g filter="url(#blur8)"><rect width="440" height="600" fill="#f1e2c8"/><rect x="20" y="40" width="160" height="160" fill="#d8c09a"/><rect x="230" y="40" width="190" height="160" fill="#d8c09a"/><rect y="440" width="440" height="160" fill="#e2cfae"/></g>`;
  inner += person('mama', 220, 900, .95, { t, seed: 3, eyes: fall > .5 ? 'sad' : 'happy', mouth: fall > .5 ? 'sad' : 'smile', headDy: 10 * fall, armR: [100 - 40 * fall, -310 + 90 * fall], armL: [-60, -250] });
  inner += plateCake(270 - 50 * fall, 900 - .95 * (310 - 90 * fall) + 20, .8, { cut: true });
  s += callFrame(560, 380, 440, 600, inner, { label: 'MAMA', grey, id: 'v91cf6' });
  s += lie(330, 660, 'Total lecker!', 320, 860, { strike: 1, size: 46, a: 1 - eio(prog(t, 18.34, 18.7)) });
  s += speech(380, 640, 'Er war trocken.', 330, 860, { p: pop(t, 18.4, .4), size: 54, a: t > 20.6 ? 1 - .5 * eio(prog(t, 20.6, 21)) : undefined });
  s += speech(780, 1110, '…', 760, 980, { p: pop(t, 20.75, .35), size: 60 });
  return frame(cam(s, 540, 1000, 1.04 + .04 * eio(prog(t, 18.34, 21.5))));
}
