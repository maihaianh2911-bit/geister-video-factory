// L12a 50.62–53.46: research room: a researcher (glasses, white coat) with a clipboard in front of a whiteboard chart. "USA" pops on "USA" (51.34); a green check on the clipboard on "untersucht" (52.4).
import { frame, cam, shadow, person, pop, prog, eio, label, lab, check, K, T } from './all.js';
export default function renderShot(t) {
  let s = lab(t);
  s += shadow(620, 1660);
  const cp = prog(t, 52.4, 52.8);
  const clip = `<g transform="translate(-170 -360) rotate(8)"><rect x="-100" y="-130" width="200" height="260" rx="10" fill="#a8744a" stroke="${K.ink}" stroke-width="5"/><rect x="-82" y="-110" width="164" height="224" fill="#fbf8ef"/><rect x="-36" y="-142" width="72" height="30" rx="8" fill="#b8bcc4" stroke="${K.ink}" stroke-width="4"/>${[-70, -30, 10, 50].map(y => `<path d="M -60 ${y} H 50" stroke="#b9cde6" stroke-width="6"/>`).join('')}${check(20, 70, 1.3, K.green, cp)}</g>`;
  s += person('doc', 620, 1660, .98, { t, seed: 11, look: t > 52.2 ? [-14, 10] : [-8, -4], brows: 'calm', mouth: 'small', armL: [-170, -300], armR: [-60, -320], front: clip });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 50.62, 53.46)), 20 * prog(t, 50.62, 53.46));
  s += label('USA', 300, 360, 150, { p: pop(t, 51.34, .45), fill: '#ffffff' });
  s += label('STUDIE', 300, 480, 70, { p: pop(t, 52.4, .45) });
  return frame(s);
}
