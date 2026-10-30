// 6.54–8.4: what happens in your stomach? a window in your body shows the stomach, the swallowed bite drops in ("Bauch" 7.68)
import { K, DEFS, kitchen, bust, stomach, bodyWindow, label, slice, cam, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = ein(prog(t, 7.0, 7.7)), w = eio(prog(t, 6.6, 7.0));
  const crumb = `<circle cx="540" cy="${f1(lerp(1120, 1300, d))}" r="18" fill="${K.crumbD}" stroke="${K.ink}" stroke-width="3" opacity="${f1(d < 1 ? 1 : 0)}"/>`;
  const win = w > 0 ? `<g opacity="${f1(w)}">${bodyWindow(540, 1290, 2.2, stomach(540, 1300, .95, { mood: 'calm', inner: d >= 1 ? `<circle cx="10" cy="60" r="16" fill="${K.crumbD}" stroke="${K.ink}" stroke-width="3"/>` : '' }))}</g>` : '';
  const du = bust('du', 540, 1000, 1.3, { look: 0, lookY: 1, brow: .6, mouth: 'flat', front: win + crumb, aR: [[760, 1240], [800, 1360]], heldR: slice(810, 1300, .45, { bite: .55, id: 's4', spot: 1, at: [-60, 40] }) });
  return `${DEFS}${cam(`${kitchen(1500)}${du}`, 1.0, 540, 1000)}${label(540, 260, 'DEIN BAUCH?', eio(prog(t, 7.4, 7.7)))}`;
}
