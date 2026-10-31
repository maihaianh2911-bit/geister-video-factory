// 55.72–59.8: but not every device stops at the same time ("nicht jedes Gerät" 56.34–56.88, "gleichzeitig" 57.7) — a 2×2 row of devices that all keep power:
// router lights and laptop screen (local document) stay on, only their Internet link (wifi arcs / cloud badge) goes grey and is struck; fridge and lamp glow with a tick
import { K, DEFS, BG, glow, tick, crossOut, wifi, cloud, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 56.3, 56.9)), b = eio(prog(t, 57.6, 58.2)), off = b > .5 ? 0 : 1;
  const led = (x, c) => `<circle cx="${x}" cy="0" r="9" fill="${c}"/>`;
  const router = `<rect x="-110" y="-40" width="220" height="80" rx="16" fill="${K.ind3}" stroke="${K.ink}" stroke-width="4"/><path d="M -60 -40 V -100 M 60 -40 V -100" stroke="${K.greyL}" stroke-width="10" stroke-linecap="round"/>${led(-60, K.green)}${led(-25, K.green)}${led(10, off ? K.data : K.sun)}`;
  const doc = `<rect x="-70" y="-78" width="140" height="140" rx="6" fill="${K.white}"/>${[0, 1, 2, 3, 4].map(i => `<rect x="-52" y="${-58 + i * 24}" width="${i % 2 ? 80 : 104}" height="10" rx="5" fill="${K.grey}"/>`).join('')}`;
  const laptop = `<rect x="-130" y="-90" width="260" height="160" rx="10" fill="${K.screen}" stroke="${K.ink}" stroke-width="4"/><rect x="-124" y="-84" width="248" height="148" rx="6" fill="#26407E"/>${doc}<rect x="-150" y="70" width="300" height="24" rx="8" fill="${K.grey}"/>`;
  const fridge = `<rect x="-90" y="-160" width="180" height="320" rx="20" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M -90 -40 H 90 M 60 -130 V -70 M 60 -10 V 60" stroke="${K.ink}" stroke-width="6"/>`;
  const lamp = `<path d="M -70 -60 L 70 -60 L 40 -140 L -40 -140 Z" fill="${K.sun}" stroke="${K.ink}" stroke-width="4"/><path d="M 0 -60 V 120 M -60 120 H 60" stroke="${K.greyL}" stroke-width="12"/>`;
  // devices: everything keeps its power glow; online links only on the top row
  const top = `${glow(270, 600, 200, .35 + .35 * a, 'iGlow')}<g transform="translate(270 600)">${router}</g>${wifi(270, 470, .55, off, {})}
    ${glow(810, 600, 220, .35 + .35 * a, 'iGlow')}<g transform="translate(810 600)">${laptop}</g><g opacity="${f1(off ? 1 : .55)}">${cloud(930, 440, .45, off ? K.data : K.grey)}</g>${crossOut(930, 432, 62, b)}
    ${label(270, 800, 'ONLINE', b, K.red, 40)}${label(810, 800, 'ONLINE', b, K.red, 40)}`;
  const bottom = [[270, 1080, fridge], [810, 1080, lamp]].map(([x, y, svg]) => `${glow(x, y, 240, a, 'iWarm')}<g transform="translate(${x} ${y})">${svg}</g>${tick(x + 130, y - 140, 1.1, b)}`).join('');
  // strike line through the ONLINE labels so the label itself reads "online lost", not "device dead"
  const strike = b > .01 ? [270, 810].map(x => `<path d="M ${x - 110} 788 L ${f1(x - 110 + 220 * b)} 788" stroke="${K.red}" stroke-width="8" stroke-linecap="round"/>`).join('') : '';
  return `${DEFS}${BG()}${cam(`${top}${strike}${bottom}`, 1 + .04 * eio(prog(t, 55.72, 59.8)), 540, 850)}`;
}
