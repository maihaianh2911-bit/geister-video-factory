// 40.26–43.28: as long as someone is still trapped in the car: Ben is still in the back seat behind the window — he is ringed, your arm reaches in for him ("eingeschlossen")
import { K, DEFS, BG, carSide, arm, headOf, water, rain, label, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 41.0, 42.2)), rg = eout(prog(t, 41.7, 42.0));
  const s = 1.25, cx = 640, cy = 1560;
  // Ben's head in the rear window: car coords (-170, -292) -> screen
  const bx = cx + -170 * s, by = cy + -292 * s;
  const over = `<circle cx="-170" cy="-292" r="${f1(70 * rg + 1)}" fill="none" stroke="${K.amber}" stroke-width="8" opacity="${f1(rg)}"/>`;
  const faces = { kidB: { look: .6, lookY: -.3, brow: 1, mouth: 'cry', tears: 1 } };
  const sc = `${BG('url(#eSky)')}
    ${carSide(t, cx, cy, s, { tilt: 3, lights: 0, inner: .9, winF: 1, winR: 1, id: 's17c', faces, over, only: ['kidB'] })}
    ${headOf_you(t, reach, bx, by)}
    ${water(t, 1330, { amp: 10, alpha: .93 })}${rain(t, .9, 60)}`;
  return `${DEFS}${sc}`;
}
// you, outside the car beside the rear window, reaching in for Ben
function headOf_you(t, reach, bx, by) {
  const hx = 110, hy = 1190 + 4 * Math.sin(t * 3);
  return `${arm([hx + 80, hy + 110], [lerp(hx + 170, hx + 210, reach), lerp(hy + 60, hy - 10, reach)], [lerp(hx + 200, bx - 40, reach), lerp(hy + 30, by + 60, reach)], 1.1, K.you)}${headOf('you', hx, hy, 1.1, { look: 1, lookY: -.2, brow: .8, mouth: 'flat' })}`;
}
