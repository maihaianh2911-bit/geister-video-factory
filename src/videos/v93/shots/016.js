// L10 39.5–42.02 Evening, rain, wet road with red/yellow reflections. From du's driver seat: dashboard + steering wheel with du's hands
// (sharp foreground); an orange car with an "Anfänger" sticker cuts from the left lane into du's lane on "drängelt … Auto" (40.0–41.2), brake lights flash.
import { K, frame, cam, setStreet, T, prog, eio, lerp, f1, pool } from './lib.js';
import { push } from './base.js';
function carBack(x, y, s, brake) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">
  <ellipse cx="0" cy="96" rx="250" ry="26" fill="#000" opacity=".4"/>
  <path d="M -180 -120 Q -170 -200 -110 -210 H 110 Q 170 -200 180 -120 Z" fill="#c86a2a" stroke="${K.ink}" stroke-width="7"/>
  <path d="M -150 -125 Q -140 -185 -95 -192 H 95 Q 140 -185 150 -125 Z" fill="#2a3350" stroke="${K.ink}" stroke-width="5"/>
  <circle cx="-10" cy="-150" r="30" fill="${K.ink}"/><path d="M -40 -165 Q -10 -195 26 -165 Z" fill="#f2c14e"/>
  <rect x="-240" y="-125" width="480" height="200" rx="34" fill="#e8803a" stroke="${K.ink}" stroke-width="7"/>
  <rect x="-220" y="-90" width="90" height="44" rx="10" fill="${brake ? '#ff3b2f' : '#8a2620'}" stroke="${K.ink}" stroke-width="5"/><rect x="130" y="-90" width="90" height="44" rx="10" fill="${brake ? '#ff3b2f' : '#8a2620'}" stroke="${K.ink}" stroke-width="5"/>
  <rect x="-70" y="-20" width="140" height="44" rx="6" fill="#f2f2ea" stroke="${K.ink}" stroke-width="4"/>
  <rect x="-130" y="-100" width="260" height="60" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="4"/>
  <text x="0" y="-55" font-family="Inter" font-size="40" font-weight="900" fill="${K.ink}" text-anchor="middle" style="font-family:'Inter';font-weight:900">Anfänger</text>
  <rect x="-230" y="75" width="70" height="30" rx="8" fill="${K.ink}"/><rect x="160" y="75" width="70" height="30" rx="8" fill="${K.ink}"/></g>`;
}
export default function renderShot(t) {
  let s = setStreet(t);
  const m = eio(prog(t, 40.0, 41.3));
  const brake = t > 41.0 && (Math.floor(t * 6) % 2 === 0 || t > 41.6);
  const cx = lerp(150, 540, m), cy = lerp(1000, 1060, m), sc = lerp(.75, 1.15, m);
  s += carBack(cx, cy, sc, brake);
  if (brake) s += pool(cx, cy + 40, 420 * sc, 220 * sc, 'v93red', .8);
  // windscreen frame + dashboard (sharp)
  s += `<path d="M -80 -80 H 1160 V 260 Q 540 180 -80 260 Z" fill="#141826"/><path d="M -80 260 Q 540 180 1160 260" stroke="#2a2f40" stroke-width="16" fill="none"/>`;
  s += `<path d="M -80 1300 Q 540 1220 1160 1300 V 2000 H -80 Z" fill="#232838" stroke="${K.ink}" stroke-width="6"/><rect x="650" y="1320" width="220" height="70" rx="10" fill="#0e1220"/>${T(760, 1372, '50', 46, { fill: '#7fd8ff' })}`;
  // steering wheel with du's black hands and teal sleeves
  const tw = Math.sin(t * 3) * 2 + (t > 40.6 && t < 41.4 ? -6 : 0);
  s += `<g transform="translate(320 1500) rotate(${f1(tw)})"><circle r="250" fill="none" stroke="${K.ink}" stroke-width="54"/><circle r="250" fill="none" stroke="#3a4055" stroke-width="34"/><path d="M -240 0 H 240 M 0 0 V 240" stroke="#3a4055" stroke-width="40"/><circle r="70" fill="#3a4055" stroke="${K.ink}" stroke-width="6"/>
    <path d="M -360 420 Q -330 120 -236 -40" stroke="${K.ink}" stroke-width="84" fill="none" stroke-linecap="round"/><path d="M -360 420 Q -330 120 -236 -40" stroke="${K.du}" stroke-width="70" fill="none" stroke-linecap="round"/><circle cx="-236" cy="-40" r="44" fill="${K.ink}"/>
    <path d="M 360 420 Q 330 120 236 -40" stroke="${K.ink}" stroke-width="84" fill="none" stroke-linecap="round"/><path d="M 360 420 Q 330 120 236 -40" stroke="${K.du}" stroke-width="70" fill="none" stroke-linecap="round"/><circle cx="236" cy="-40" r="44" fill="${K.ink}"/></g>`;
  // rain drops on the glass
  for (let i = 0; i < 18; i++) s += `<circle cx="${f1(hash2(i) * 1080)}" cy="${f1(300 + hash2(i + 40) * 900)}" r="${f1(4 + hash2(i + 9) * 6)}" fill="#cfe0ff" opacity=".35"/>`;
  return frame(cam(s, 540, 1000, push(t, 39.5, 42.02, 1.0, 1.05)) + T(540, 380, 'ABENDS', 96, { fill: K.yellow, stroke: K.ink, sw: 20, op: 1 - prog(t, 41.2, 41.7) }), { tint: ['#20305a', .12] });
}
function hash2(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
