// 9.26–11.5 · "Die plötzliche Kälte" — magnifier slides over the mouth; inside, cold waves spread from the ice
import { P, pastel, profileHead, lens, snowflake, prog, eio, eout, back, lerp } from '../lib.js';

const HX = 400, HY = 860, HS = 1.5;
const MX = HX + 130 * HS, MY = HY + 92 * HS;   // mouth point
export default function renderShot(t) {
  const sc = back(prog(t, 9.3, 9.62));
  const lx = lerp(760, 640, eio(prog(t, 9.3, 9.7))), ly = 1000;
  const cold = prog(t, 9.96, 10.9);
  let waves = '';
  for (let k = 0; k < 3; k++) {
    const p = (t - 9.96 - k * .25) * 1.2 % 1;
    if (t > 9.96 + k * .25) waves += `<circle cx="${HX + 120 * HS}" cy="${HY + 88 * HS}" r="${20 + 70 * p}" fill="none" stroke="${P.cold}" stroke-width="${7 * (1 - p)}" opacity="${1 - p}"/>`;
  }
  const inner = `<rect x="0" y="0" width="1080" height="1920" fill="${P.bg}"/>
    <g transform="translate(${lx} ${ly}) scale(2.1) translate(${-MX} ${-MY})">
      ${profileHead(HX, HY, HS, { t, id: 's7i', xray: 1, eye: 'shut', ice: 1, palCold: cold, frost: cold })}${waves}
      ${cold > 0 ? snowflake(HX + 80 * HS, HY + 40 * HS, .22 * eout(cold), t, P.coldL) : ''}
    </g>`;
  return `${pastel(t, { color: '#E3F2F7' })}
    ${profileHead(HX, HY, HS, { t, id: 's7', eye: 'shut', brow: 1 })}
    ${lens(lx, ly, 270, inner, 's7l', sc)}
    ${snowflake(860, 420, .9 * back(prog(t, 9.96, 10.25)), t * .8, P.coldL)}`;
}
