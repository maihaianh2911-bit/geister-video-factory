// Night: asleep on the bed with the head lying on the arm — white arrows press on the arm on "auf dem Arm eingeschlafen".
import { K, room, bed, person, POSE, cam, prog, eout } from './lib.js';
export default function renderShot(t) {
  const ap = eout(prog(t, 44.1, 44.5));
  let arrows = '';
  for (let i = 0; i < 2; i++) { const x = 170 + i * 90, y = 700 + 50 * ap; arrows += `<g opacity="${ap.toFixed(2)}"><path d="M ${x} ${y} V ${y + 90}" stroke="${K.white}" stroke-width="18" stroke-linecap="round"/><path d="M ${x - 28} ${y + 62} L ${x} ${y + 96} L ${x + 28} ${y + 62}" stroke="${K.white}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  const sleeper = `<g transform="translate(520 935) rotate(-90)">${person(0, 0, 1, { ...POSE.stand, eye: 'closed', mouth: 'flat', armN: { u: 186, f: 200 }, armF: { u: 180, f: 196 } }).replace(/^<g transform="translate\(0 0\) scale\(1\)">/, '<g>')}</g>`;
  const world = room({ lamp: false, night: true }) + `<rect x="0" y="0" width="1080" height="1920" fill="#16324F" opacity=".18"/>` + bed() + `<rect x="100" y="950" width="220" height="60" rx="28" fill="${K.white}" stroke="${K.ol}" stroke-width="4"/>` + sleeper + `<g>${arrows}</g>`;
  return cam(380, 900, 1.5, world, 760);
}
