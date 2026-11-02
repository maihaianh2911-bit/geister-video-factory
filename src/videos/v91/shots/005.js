// L4 14.54–18.34 DIENSTAG: phone rings; mum (short hair, apron) shows her cake on a video call and asks whether it tasted good; du already thinks "Total lecker!" — X locks.
import { K, frame, bg, shadow, person, phone, callFrame, plateCake, lie, speech, dayCard, cam, prog, eio, eout, pop, lockAt } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(300, 1380, 100);
  const pick = eio(prog(t, 15.4, 15.8));
  const lk = lockAt(t, 18.05, 99);
  s += person('du', 300, 1380, 1, { t, seed: 1, look: [12, -6], eyes: lk > 0 ? 'wide' : 'n', mouth: lk > 0 ? 'none' : 'smile', lock: lk, armR: [lerpN(130, 92, pick), lerpN(-260, -440, pick)] });
  // phone in du's hand (buzzing before pick-up)
  const bz = t < 15.4 && t > 15.0 ? Math.sin(t * 90) * 4 : 0;
  const px = 300 + lerpN(130, 92, pick) + bz, py = 1380 + lerpN(-260, -440, pick) - 20;
  s += phone(px, py, .45, { rot: -10 + 20 * pick, screen: `<rect x="-60" y="-114" width="120" height="228" rx="12" fill="#7fc49a"/>` });
  // mum on the call (frame-local 0..440, 0..600)
  const raise = eout(prog(t, 17.02, 17.4));
  let inner = `<g filter="url(#blur8)"><rect width="440" height="600" fill="#f1e2c8"/><rect x="20" y="40" width="160" height="160" fill="#d8c09a"/><rect x="230" y="40" width="190" height="160" fill="#d8c09a"/><rect y="440" width="440" height="160" fill="#e2cfae"/></g>`;
  inner += person('mama', 220, 690, .95, { t, seed: 3, eyes: 'happy', mouth: 'smile', armR: [60 + 40 * raise, -250 - 60 * raise], armL: [-60, -250] });
  inner += plateCake(220 + 50 * raise, 690 - .95 * (260 + 60 * raise) + 20, .8);
  s += callFrame(560, 440, 440, 600, inner, { p: pop(t, 15.5, .45), label: 'MAMA', id: 'v91cf5' });
  s += speech(780, 1150, 'Hat’s geschmeckt?', 760, 1040, { p: pop(t, 17.3, .35), size: 46 });
  s += lie(330, 660, 'Total lecker!', 320, 860, { p: pop(t, 17.75, .35), strike: eio(prog(t, 18.1, 18.34)), size: 46 });
  s = cam(s, 540, 1000, 1 + .04 * eio(prog(t, 14.54, 18.34)));
  s += dayCard(t, 14.54, 'DIENSTAG');
  return frame(s);
}
function lerpN(a, b, p) { return a + (b - a) * p; }
