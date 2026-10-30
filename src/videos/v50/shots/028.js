// "kurz aufhören zu essen": the cone goes into a stand, an open palm says stop.
import { P, prog, eio, back, lerp, punch, parlour, bust, cone } from './lib.js';
const T0 = 50.82;
export default function renderShot(t) {
  const S = 1.25, ox = 500, oy = 1060;
  const down = eio(prog(t, 51.9, 52.3));
  const away = eio(prog(t, 52.4, 52.7));
  const released = t >= 52.4;
  const H = released ? [lerp(180, 240, away), lerp(230, 380, away)] : [lerp(200, 180, down), lerp(120, 230, down)];
  const palm = back(prog(t, 52.3, 52.6));
  const stand = `<path d="M ${ox + 180 * S - 62} ${oy + 230 * S + 150} h 124 l -20 100 h -84 z" fill="${P.teal}" stroke="${P.ink}" stroke-width="6"/>`;
  const placed = released ? `<g transform="translate(${ox + 180 * S} ${oy + 230 * S}) scale(${.9 * S})">${cone(1, { id: 's28p', bite: 1 })}</g>` : '';
  const palmSvg = `<g transform="rotate(10)"><rect x="-44" y="-120" width="88" height="110" rx="34" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/>${[-30, -10, 10, 30].map((x, i) => `<rect x="${x - 9}" y="${-170 + Math.abs(i - 1.5) * 10}" width="18" height="70" rx="9" fill="${P.skin}" stroke="${P.ink}" stroke-width="4"/>`).join('')}</g>`;
  return punch(t, T0, `${parlour(t, { dx: 30 })}
    <g transform="translate(${ox} ${oy}) scale(${S})">${bust({ id: 's28', hand: H, holdR: released ? '' : undefined, handL: palm > 0 ? [lerp(-200, -290, palm), lerp(400, 100, palm)] : null, holdL: palm > .5 ? palmSvg : '', head: { mouth: 'flat', eyes: 'open', brow: .2, look: 10, lookY: 12 }, coneO: { bite: 1 } })}</g>
    ${stand}${placed}`);
}
