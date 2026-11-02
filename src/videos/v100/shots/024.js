// L12b 53.46–57.8: two study participants. The inviter (left, bun, blue) holds an invitation; the one who must say no (right, hair clip, green) imagines an angry reaction – picture thought of the inviter's angry face on "schätzten" (53.82). On "absagen" (56.82) she gently shakes her head.
import { frame, cam, shadow, person, head, pop, prog, eio, lab, invite, picThought, label } from './all.js';
export default function renderShot(t) {
  let s = lab(t, { strong: true });
  s += shadow(300, 1660) + shadow(780, 1660);
  s += person('p2', 300, 1660, .95, { t, seed: 13, look: [14, 0], brows: 'up', mouth: 'smile', armR: [190, -400], front: invite(220, -470, .8, 6) });
  const shake = t > 56.82 && t < 57.6 ? Math.sin((t - 56.82) * 16) * 10 : 0;
  s += person('p1', 780, 1660, .95, { t, seed: 15, flip: true, look: [12, -6], brows: 'worried', mouth: 'wavy', headTilt: shake, armR: t > 56.9 ? [200, -440] : null });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 53.46, 57.8)), -25 * prog(t, 53.46, 57.8));
  const angry = head('p2', 0, 10, .55, { t, seed: 13, eyes: 'n', brows: 'angry', mouth: 'frown', blink: false, look: [0, 4] });
  s += picThought(740, 420, 300, 260, 780, 690, angry, pop(t, 53.82));
  s += label('SCHÄTZUNG', 300, 330, 70, { p: pop(t, 53.9, .45), fill: '#ffffff' });
  return frame(s);
}
