// 54.86–56.6: at the open window, seen from outside: the father waves, mother and child call out — the child stays at her side.
import { K, DEFS, FG, prog, eio, person, bear, talkAt } from './lib.js';
export default function renderShot(t) {
  const w = Math.sin((t - 55.3) * 9);
  const waveOn = t > 55.3 ? 1 : 0;
  const call = talkAt(t, 54.86, 56.6);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#2B3943"/>
    <rect x="80" y="380" width="920" height="900" fill="#FFC46B" stroke="#0B0F12" stroke-width="10"/>
    <rect x="80" y="380" width="920" height="900" fill="#3A2E24" opacity=".35"/>
    ${person('v', 330, 700, 1.0, { aR: waveOn ? [160 + 14 * w, 150 + 20 * w] : [60, 120], aL: [10, 6], brow: 'up', talk: call, mouth: 'o', eyeS: 1.1, lookY: 10 })}
    ${person('m', 760, 760, .92, { aL: [-10, -70], aR: [150 + 10 * w, 160], brow: 'up', talk: call, mouth: 'o', eyeS: 1.1, lookY: 10 })}
    ${person('k', 560, 950, .8, { aL: [-10, -70], aR: [-10, -70], brow: 'worry', mouth: 'o', eyeS: 1.2, lookY: 10, front: bear(0, 140, .6, -10) })}
    <rect x="40" y="1180" width="1000" height="80" rx="10" fill="#D9D2C5" stroke="#0B0F12" stroke-width="8"/>
    <rect x="-60" y="1260" width="1200" height="800" fill="#2B3943"/>
    <rect x="-60" y="-60" width="1200" height="440" fill="#2B3943"/>
    <rect x="-60" y="-60" width="140" height="2040" fill="#2B3943"/><rect x="1000" y="-60" width="200" height="2040" fill="#2B3943"/>
    <rect x="80" y="380" width="920" height="880" fill="none" stroke="#0B0F12" stroke-width="12"/>
    ${FG(1430)}`;
}
