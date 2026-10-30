// 37.28–39.04: a Boston hospital — domed building at dusk, the camera moves in; tags BOSTON (37.94) then KRANKENHAUS (38.4).
import { K, DEFS, BG, tag, cam, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const z = 1 + .12 * eio(prog(t, 37.28, 39.04)), b = eout(prog(t, 37.9, 38.15)), k = eout(prog(t, 38.4, 38.65));
  const win = (x, y, lit) => `<rect x="${x}" y="${y}" width="56" height="110" rx="26" fill="${lit ? K.lamp : '#2B3766'}" stroke="${K.ink}" stroke-width="4"/>`;
  const bld = `<rect x="140" y="800" width="800" height="560" fill="#C9C1AE" stroke="${K.ink}" stroke-width="6"/><path d="M 320 800 L 540 640 L 760 800 Z" fill="#D8D0BC" stroke="${K.ink}" stroke-width="6"/>
    <rect x="460" y="540" width="160" height="110" fill="#D8D0BC" stroke="${K.ink}" stroke-width="5"/><path d="M 440 545 Q 540 380 640 545 Z" fill="#8FA3B8" stroke="${K.ink}" stroke-width="6"/>
    ${[360, 450, 630, 720].map(x => `<rect x="${x - 18}" y="840" width="36" height="420" fill="#E8E2D2" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    ${[190, 260, 820, 890].map((x, i) => win(x - 28, 900, (i + Math.floor(t * 2)) % 3 !== 0) + win(x - 28, 1100, true)).join('')}
    <rect x="500" y="1150" width="80" height="210" fill="${K.woodD}" stroke="${K.ink}" stroke-width="5"/><rect x="100" y="1360" width="880" height="40" fill="#A79F8C" stroke="${K.ink}" stroke-width="5"/>`;
  const sky = `${BG()}${[...Array(30)].map((_, i) => `<circle cx="${f1((i * 137) % 1080)}" cy="${f1((i * 89) % 600 + 40)}" r="${2 + i % 3}" fill="${K.white}" opacity=".5"/>`).join('')}<ellipse cx="540" cy="1100" rx="700" ry="500" fill="url(#nLamp)" opacity=".5"/>`;
  return `${DEFS}${cam(sky + bld, z, 540, 1000)}${tag(540, 250, 'BOSTON', b, 90, K.lamp, k > 0 ? 'KRANKENHAUS' : '')}`;
}
