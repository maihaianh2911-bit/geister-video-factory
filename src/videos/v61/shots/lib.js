// v61 "Eis zu schnell" — shared drawing kit for this video only (style: jobs/v61/style.md).
// Lea: ~20, pale-yellow T-shirt, brown hair tied back in a ponytail, three-scoop waffle cone (strawberry, vanilla, pistachio).
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#EAF6F4', bg2: '#D5EEEA', teal: '#2EC4B6', tealD: '#1E9C90', tealL: '#9FE3DB', ink: '#16324F', white: '#FFFFFF',
  pink: '#FF8FA3', pinkD: '#E5637C', pinkL: '#FFC4CF', skin: '#F1C6A5', skinSh: '#DDA580', skinD: '#C98A66',
  hair: '#7A4A2E', hairSh: '#5C3520', hairHi: '#9C6643', shirt: '#FBE7A1', shirtSh: '#EBCB72', shirtHi: '#FFF4CC',
  waffle: '#E3A857', waffleSh: '#B97F37', straw: '#FF8FA3', vanilla: '#FFF3D6', vanillaSh: '#F0D9A8', pist: '#B9DE8C', pistSh: '#8DBB5C',
  cold: '#5BB8FF', coldL: '#BFE3FF', coldD: '#2F7FD0', hot: '#FF5A5F', hotL: '#FFB3A7', nerve: '#FFD23F', nerveD: '#E0A800',
  brain: '#FFB8C6', brainSh: '#F08DA3', bone: '#F7EEE3', boneSh: '#E3D3BF', mouth: '#B2455A', mouthD: '#7E2A3C', tongue: '#F27C93', tongueSh: '#D45B74',
  blood: '#E8475F', bloodD: '#B8293F', vessel: '#F6A3B0', counter: '#F7F1E6', counterSh: '#E2D6C2', wall: '#EAF6F4', wallSh: '#D2ECE8',
  good: '#3CC48A', water: '#9FD8F5', glass: '#E8F7FF',
};
export const OL = (w = 4) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
// outlined headline text
export const HL = (s, x, y, sz, f = K.white, sw = 14, a = 'middle') => TX(s, x, y, sz, f, a, `stroke="${K.ink}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke"`);
export const BG = (c = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${cx + dx} ${cy + dy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
export function shk(t, t0, a, d = 6) { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; }
export const blinkAt = (t, off = 0) => { const k = (t + off) % 3.3; return k > 3.15 ? Math.sin((k - 3.15) / .15 * Math.PI) : 0; };
export const f1 = v => (+v).toFixed(1);

export const DEFS = `<defs>
<radialGradient id="eHot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF3B4E" stop-opacity=".85"/><stop offset=".45" stop-color="#FF5A5F" stop-opacity=".4"/><stop offset="1" stop-color="#FF5A5F" stop-opacity="0"/></radialGradient>
<radialGradient id="eCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5BB8FF" stop-opacity=".8"/><stop offset=".5" stop-color="#8CCBFF" stop-opacity=".3"/><stop offset="1" stop-color="#8CCBFF" stop-opacity="0"/></radialGradient>
<radialGradient id="eWarm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB25B" stop-opacity=".75"/><stop offset="1" stop-color="#FFB25B" stop-opacity="0"/></radialGradient>
<radialGradient id="eNerve" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE680" stop-opacity=".95"/><stop offset="1" stop-color="#FFD23F" stop-opacity="0"/></radialGradient>
<radialGradient id="eSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF6C9" stop-opacity=".95"/><stop offset=".5" stop-color="#FFE9A0" stop-opacity=".35"/><stop offset="1" stop-color="#FFE9A0" stop-opacity="0"/></radialGradient>
<linearGradient id="eLens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".55"/><stop offset=".4" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
<linearGradient id="eGlassW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".7"/><stop offset=".3" stop-color="#FFFFFF" stop-opacity=".1"/><stop offset="1" stop-color="#FFFFFF" stop-opacity=".35"/></linearGradient>
</defs>`;

// ---------------- set: ice-cream parlour (light pastel) ----------------
export function parlour(t, o = {}) {
  const sun = 1 + .03 * Math.sin(t * 2);
  let aw = '';
  for (let i = 0; i < 9; i++) aw += `<rect x="${-60 + i * 140}" y="-60" width="70" height="250" fill="${K.teal}"/>`;
  let sc = '';
  for (let i = 0; i < 18; i++) sc += `<path d="M ${-60 + i * 70} 190 a 35 35 0 0 0 70 0" fill="${i % 2 ? K.white : K.teal}" ${OL(4)}/>`;
  let tiles = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) tiles += `<rect x="${c * 130 - 20 + (r % 2) * 65}" y="${1040 + r * 60}" width="126" height="56" rx="6" fill="${(r + c) % 3 ? K.wallSh : '#C6E6E1'}"/>`;
  const tubs = [K.pink, K.vanilla, K.pist, '#C78A5B', K.pinkL, K.tealL].map((c, i) => `<g transform="translate(${80 + i * 185} 1300)"><rect x="-70" y="-22" width="140" height="70" rx="10" fill="#C9D7D8" ${OL(4)}/><path d="M -62 -18 Q -40 -62 -6 -40 Q 22 -70 46 -38 Q 64 -46 62 -18 Z" fill="${c}" ${OL(4)}/></g>`).join('');
  return `${BG(K.wall)}
    <rect x="-60" y="190" width="1200" height="850" fill="${K.wall}"/>${tiles}
    <g transform="translate(${o.winX || 170} 520)"><rect x="-130" y="-190" width="260" height="380" rx="20" fill="#CFF1FF" ${OL(5)}/>
      <circle cx="40" cy="-90" r="${110 * sun}" fill="url(#eSun)"/><circle cx="40" cy="-90" r="46" fill="#FFE27A"/>
      <path d="M -130 120 Q -60 70 0 110 Q 60 80 130 110 L 130 190 L -130 190 Z" fill="#9EDC9A"/>
      <path d="M 0 -190 V 190 M -130 0 H 130" stroke="${K.ink}" stroke-width="5"/></g>
    <g transform="translate(${o.boardX || 880} 470)"><rect x="-130" y="-150" width="260" height="300" rx="18" fill="${K.ink}" ${OL(5)}/>
      ${[0, 1, 2].map(i => `<g transform="translate(${-70 + i * 70} ${-40 + (i % 2) * 70})"><path d="M -18 0 L 0 50 L 18 0 Z" fill="${K.waffle}" ${OL(3)}/><circle cx="0" cy="-8" r="22" fill="${[K.pink, K.pist, K.vanilla][i]}" ${OL(3)}/></g>`).join('')}
      <circle cx="70" cy="80" r="16" fill="${K.pink}"/><circle cx="-70" cy="88" r="12" fill="${K.teal}"/></g>
    ${aw}${sc}
    <rect x="-60" y="1240" width="1200" height="760" fill="${K.counterSh}"/>
    <rect x="-60" y="1250" width="1200" height="110" fill="#E6F4F6" opacity=".9"/>${tubs}
    <rect x="-60" y="1236" width="1200" height="30" fill="${K.counter}" ${OL(4)}/>
    <rect x="-60" y="1360" width="1200" height="640" fill="${K.teal}"/><path d="M -60 1360 H 1140" ${OL(5)}/>`;
}
// counter top strip only (in front of the girl), y = top edge
export const counterFront = (y = 1236) => `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" fill="${K.counterSh}"/><rect x="-60" y="${y}" width="1200" height="30" fill="${K.counter}" ${OL(4)}/><rect x="-60" y="${y + 124}" width="1200" height="${2000 - y}" fill="${K.teal}"/><path d="M -60 ${y + 124} H 1140" ${OL(5)}/>`;

// ---------------- ice cream ----------------
function scoop(cx, cy, r, col, sh, id, bite = 0, nib = 0) {
  const shape = `<path d="M ${cx - r} ${cy + r * .25} A ${r} ${r} 0 1 1 ${cx + r} ${cy + r * .25} Q ${cx + r * .85} ${cy + r * .6} ${cx + r * .6} ${cy + r * .42} Q ${cx + r * .35} ${cy + r * .7} ${cx + r * .05} ${cy + r * .45} Q ${cx - r * .2} ${cy + r * .75} ${cx - r * .45} ${cy + r * .4} Q ${cx - r * .7} ${cy + r * .62} ${cx - r} ${cy + r * .25} Z"`;
  if (!bite && !nib) return `${shape} fill="${col}" ${OL(4)}/><path d="M ${cx + r * .35} ${cy - r * .55} Q ${cx + r * .75} ${cy - r * .2} ${cx + r * .7} ${cy + r * .15}" fill="none" stroke="${sh}" stroke-width="${r * .16}" stroke-linecap="round"/><ellipse cx="${cx - r * .38}" cy="${cy - r * .45}" rx="${r * .2}" ry="${r * .12}" fill="#fff" opacity=".7"/>`;
  // bite = 0..1 size of the bite taken from the upper-left rim
  const br = r * (.3 + .2 * bite) * (bite ? 1 : 0), bx = cx - r * .55, by = cy - r * .62;
  const nb = nib ? `<circle cx="${f1(cx + r * .62)}" cy="${f1(cy - r * .72)}" r="${f1(r * .22 * nib)}"/><circle cx="${f1(cx + r * .82)}" cy="${f1(cy - r * .45)}" r="${f1(r * .16 * nib)}"/>` : '';
  const holes = nb + `<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(br)}"/><circle cx="${f1(bx + br * .9)}" cy="${f1(by - br * .55)}" r="${f1(br * .7)}"/><circle cx="${f1(bx - br * .6)}" cy="${f1(by + br * .85)}" r="${f1(br * .7)}"/>`;
  return `<mask id="${id}"><rect x="${cx - r * 2}" y="${cy - r * 2}" width="${r * 4}" height="${r * 4}" fill="#fff"/><g fill="#000">${holes}</g></mask><clipPath id="${id}x">${shape}/></clipPath>
    <g mask="url(#${id})">${shape} fill="${col}" ${OL(4)}/><path d="M ${cx + r * .35} ${cy - r * .55} Q ${cx + r * .75} ${cy - r * .2} ${cx + r * .7} ${cy + r * .15}" fill="none" stroke="${sh}" stroke-width="${r * .16}" stroke-linecap="round"/>
    <g clip-path="url(#${id}x)" fill="none" ${OL(4)}>${holes}</g></g>`;
}
// cone with grip point at (x,y); rot deg (0 = upright); o.bite 0..1 bite in top scoop, o.small 0..n small nibbles instead, o.hand draw gripping hand (side 1 = right hand)
export function cone(x, y, rot = 0, s = 1, o = {}) {
  const id = o.id || 'c';
  let lat = '';
  for (let i = -3; i <= 4; i++) lat += `<path d="M ${i * 26 - 60} -20 L ${i * 26 + 40} 150" stroke="${K.waffleSh}" stroke-width="4"/><path d="M ${i * 26 + 60} -20 L ${i * 26 - 40} 150" stroke="${K.waffleSh}" stroke-width="4"/>`;
  const conePath = 'M -66 -24 L 66 -24 L 4 168 Q 0 176 -4 168 Z';
  const top = scoop(0, -206, 56, K.pink, K.pinkD, id + 'b', o.bite || 0, o.small || 0);
  const hand = o.hand === false ? '' : gripHand(0, 26, o.side || 1);
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})">
    <clipPath id="${id}k"><path d="${conePath}"/></clipPath>
    <path d="${conePath}" fill="${K.waffle}"/><g clip-path="url(#${id}k)">${lat}</g><path d="${conePath}" fill="none" ${OL(4)}/>
    ${scoop(0, -48, 72, K.pist, K.pistSh, id + 'p')}
    ${scoop(0, -126, 64, K.vanilla, K.vanillaSh, id + 'v')}
    ${top}
    <rect x="-70" y="-34" width="140" height="22" rx="10" fill="${K.waffle}" ${OL(4)}/>
    ${hand}</g>`;
}
// fist wrapped around a vertical handle at (x,y) in local coords; side = 1 right hand (thumb to screen-left)
export function gripHand(x, y, side = 1, col = K.skin, s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${side * s} ${s})">
    <path d="M 30 -34 Q 62 -30 62 0 Q 62 34 30 40 L -30 40 Q -56 36 -56 10 Q -56 -20 -40 -30 Z" fill="${col}" ${OL(4)}/>
    <path d="M -50 -6 H 40 M -50 14 H 40" stroke="${K.skinD}" stroke-width="4" stroke-linecap="round"/>
    <path d="M -40 -30 Q -22 -48 4 -36 Q 14 -26 2 -18 Q -18 -20 -36 -12" fill="${col}" ${OL(4)}/></g>`;
}

// ---------------- character: Lea, front view ----------------
// IK: elbow for shoulder (sx,sy) -> hand (tx,ty); bend = +1/-1 picks the elbow side
export function ik(sx, sy, tx, ty, L1, L2, bend) {
  const dx = tx - sx, dy = ty - sy, d = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const a0 = Math.atan2(dy, dx), a = Math.acos(cl((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const ex = sx + Math.cos(a0 + bend * a) * L1, ey = sy + Math.sin(a0 + bend * a) * L1;
  const k = Math.hypot(dx, dy) > L1 + L2 - 1 ? (L1 + L2 - 1) / Math.hypot(dx, dy) : 1;
  return { ex, ey, hx: sx + dx * k, hy: sy + dy * k };
}
function armSvg(sx, sy, ex, ey, hx, hy) {
  const mx = lerp(sx, ex, .5), my = lerp(sy, ey, .5);
  return `<path d="M ${f1(sx)} ${f1(sy)} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${K.ink}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${f1(sx)} ${f1(sy)} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${K.skin}" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${f1(sx)} ${f1(sy)} L ${f1(mx)} ${f1(my)}" fill="none" stroke="${K.ink}" stroke-width="74" stroke-linecap="round"/>
    <path d="M ${f1(sx)} ${f1(sy)} L ${f1(mx)} ${f1(my)}" fill="none" stroke="${K.shirt}" stroke-width="66" stroke-linecap="round"/>`;
}
function eyesSvg(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -10, 10), bl = o.blink || 0, ey = -10;
  return [-48, 48].map(ex => {
    if (o.eyes === 'squeeze') { const d = ex < 0 ? 1 : -1; return `<path d="M ${ex - 22 * d} ${ey - 16} L ${ex + 16 * d} ${ey} L ${ex - 22 * d} ${ey + 14}" fill="none" ${OL(7)}/>`; }
    if (o.eyes === 'happy') return `<path d="M ${ex - 20} ${ey + 6} Q ${ex} ${ey - 16} ${ex + 20} ${ey + 6}" fill="none" ${OL(7)}/>`;
    if (o.eyes === 'closed' || bl > .85) return `<path d="M ${ex - 20} ${ey} Q ${ex} ${ey + 12} ${ex + 20} ${ey}" fill="none" ${OL(6)}/>`;
    const es = o.eyeS || 1;
    return `<ellipse cx="${ex}" cy="${ey}" rx="${18 * es}" ry="${Math.max(3, 23 * es * (1 - bl))}" fill="#fff" ${OL(4)}/>` +
      (bl < .6 ? `<circle cx="${ex + lx * .7}" cy="${ey + 2 + ly * .7}" r="${11 * Math.min(es, 1.1)}" fill="${K.ink}"/><circle cx="${ex + lx * .7 + 4}" cy="${ey - 3 + ly * .7}" r="3.5" fill="#fff"/>` : '');
  }).join('');
}
function browsSvg(type) {
  const B = { calm: [[-26, -50, 22, -54], [-22, -54, 26, -50]], pain: [[-28, -44, 20, -60], [-20, -60, 28, -44]], up: [[-26, -60, 22, -66], [-22, -66, 26, -60]], frown: [[-28, -60, 20, -48], [-20, -48, 28, -60]] }[type || 'calm'];
  return [[-48, B[0]], [48, B[1]]].map(([c, b]) => `<path d="M ${c + b[0]} ${b[1]} L ${c + b[2]} ${b[3]}" stroke="${K.hairSh}" stroke-width="10" stroke-linecap="round"/>`).join('');
}
function mouthSvg(m, o) {
  const y = 78, ch = o.chew || 0;
  if (m === 'open') return `<path d="M -40 ${y - 10} Q 0 ${y - 22} 40 ${y - 10} Q 36 ${y + 52} 0 ${y + 54} Q -36 ${y + 52} -40 ${y - 10} Z" fill="${K.mouthD}" ${OL(5)}/><path d="M -30 ${y - 12} Q 0 ${y - 4} 30 ${y - 12}" fill="#fff" stroke="none"/><path d="M -22 ${y + 40} Q 0 ${y + 26} 22 ${y + 40} Q 0 ${y + 52} -22 ${y + 40}" fill="${K.tongue}"/>`;
  if (m === 'o') return `<ellipse cx="0" cy="${y + 6}" rx="16" ry="20" fill="${K.mouthD}" ${OL(5)}/>`;
  if (m === 'chew') return `<path d="M -26 ${y + 2 + ch * 4} Q -10 ${y - 6} 0 ${y + 2} Q 12 ${y + 10 - ch * 6} 26 ${y}" fill="none" ${OL(6)}/>`;
  if (m === 'grit') return `<path d="M -36 ${y - 4} Q 0 ${y - 12} 36 ${y - 4} L 32 ${y + 18} Q 0 ${y + 12} -32 ${y + 18} Z" fill="#fff" ${OL(5)}/><path d="M -20 ${y - 7} V ${y + 15} M 0 ${y - 9} V ${y + 13} M 20 ${y - 7} V ${y + 15}" stroke="${K.ink}" stroke-width="3"/>`;
  if (m === 'sip') return `<ellipse cx="0" cy="${y + 4}" rx="12" ry="10" fill="${K.mouthD}" ${OL(5)}/>`;
  if (m === 'smile') return `<path d="M -32 ${y - 4} Q 0 ${y + 26} 32 ${y - 4} Q 0 ${y + 8} -32 ${y - 4} Z" fill="${K.mouthD}" ${OL(5)}/>`;
  if (m === 'soft') return `<path d="M -24 ${y} Q 0 ${y + 14} 24 ${y}" fill="none" ${OL(6)}/>`;
  return `<path d="M -22 ${y + 4} L 22 ${y + 4}" fill="none" ${OL(6)}/>`;
}
// head at origin (r≈130x150). o: eyes, blink, look, lookY, brow, mouth, chew, puff 0..1, tilt, pain 0..1 (forehead glow), temple 0..1
export function leaHead(o = {}) {
  const pf = o.puff || 0, w = 128 + 10 * pf;
  const cheeks = pf > .02 ? `<ellipse cx="-92" cy="52" rx="${24 + 16 * pf}" ry="${20 + 12 * pf}" fill="${K.skin}"/><ellipse cx="92" cy="52" rx="${24 + 16 * pf}" ry="${20 + 12 * pf}" fill="${K.skin}"/>` : '';
  return `<g transform="rotate(${f1(o.tilt || 0)})">
    <path d="M -150 -40 Q -170 -170 0 -178 Q 170 -170 150 -40 Q 150 40 120 60 L -120 60 Q -150 40 -150 -40 Z" fill="${K.hair}" ${OL(5)}/>
    <path d="M 128 -110 Q 214 -110 206 0 Q 200 70 168 110 Q 178 40 150 -10 Z" fill="${K.hair}" ${OL(5)}/>
    <circle cx="146" cy="-92" r="13" fill="${K.teal}" ${OL(4)}/>
    <ellipse cx="-${w}" cy="10" rx="20" ry="28" fill="${K.skinSh}" ${OL(4)}/><ellipse cx="${w}" cy="10" rx="20" ry="28" fill="${K.skinSh}" ${OL(4)}/>
    <path d="M -${w} -30 Q -${w + 6} 108 0 ${150 + 4 * pf} Q ${w + 6} 108 ${w} -30 Q ${w} -150 0 -152 Q -${w} -150 -${w} -30 Z" fill="${K.skin}" ${OL(5)}/>
    ${cheeks}
    <ellipse cx="-74" cy="44" rx="20" ry="11" fill="${K.pink}" opacity=".45"/><ellipse cx="74" cy="44" rx="20" ry="11" fill="${K.pink}" opacity=".45"/>
    ${o.pain ? `<ellipse cx="0" cy="-92" rx="${100 + 30 * o.pain}" ry="${60 + 20 * o.pain}" fill="url(#eHot)" opacity="${cl(o.pain)}"/>` : ''}
    ${o.temple ? `<ellipse cx="-112" cy="-48" rx="58" ry="58" fill="url(#eHot)" opacity="${cl(o.temple)}"/><ellipse cx="112" cy="-48" rx="58" ry="58" fill="url(#eHot)" opacity="${cl(o.temple)}"/>` : ''}
    ${eyesSvg(o)}${browsSvg(o.brow)}
    <path d="M -6 10 Q -14 36 0 40 Q 8 41 12 36" fill="none" stroke="${K.skinD}" stroke-width="6" stroke-linecap="round"/>
    ${mouthSvg(o.mouth || 'soft', o)}
    <path d="M -132 -36 Q -140 -150 0 -158 Q 140 -150 132 -36 Q 120 -90 70 -104 Q 30 -84 -10 -110 Q -60 -86 -100 -96 Q -126 -76 -132 -36 Z" fill="${K.hair}" ${OL(5)}/>
    <path d="M -60 -138 Q 0 -150 60 -136" fill="none" stroke="${K.hairHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
// pain lightning mark (zigzag burst) centred at (x,y)
export function zap(x, y, s = 1, a = 1, col = K.hot) {
  if (a <= 0.01) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" opacity="${cl(a)}">
    <path d="M -10 -70 L 22 -14 L -4 -10 L 26 60 L -30 -2 L -4 -6 L -34 -64 Z" fill="${col}" ${OL(5)}/>
    <path d="M -70 -30 L -48 -22 M 70 -30 L 48 -22 M -64 34 L -44 24 M 66 34 L 46 24" ${OL(7)} stroke="${col}"/></g>`;
}
// Lea upper body. (x,y) = head centre, s scale. o: head opts + cone {x,y,rot,bite,small} (world, right hand)
//   handL: {x,y,kind:'palm'|'rest'|'glass'} world target for the left hand; tremble px
export function lea(t, x, y, s, o = {}) {
  const P = (px, py) => [x + px * s, y + py * s];
  const shY = 250, shX = 158;
  const [rsx, rsy] = P(shX, shY), [lsx, lsy] = P(-shX, shY);
  const L1 = 205 * s, L2 = 190 * s;
  let back = '', front = '';
  // right arm (screen right) holds the cone
  const cr = o.cone;
  const rt = cr ? [cr.x - Math.sin((cr.rot || 0) * Math.PI / 180) * 26 * s * (cr.s || 1), cr.y + Math.cos((cr.rot || 0) * Math.PI / 180) * 26 * s * (cr.s || 1)] : o.handR ? [o.handR.x, o.handR.y] : P(shX + 40, shY + 420);
  let ra = ik(rsx, rsy, rt[0], rt[1], L1, L2, -1);
  // hand close to the shoulder (eating): upper arm hangs down the side, forearm comes toward the viewer
  if (Math.hypot(rt[0] - rsx, rt[1] - rsy) < 300 * s) ra = { ex: rsx + 40 * s, ey: rsy + 170 * s, hx: rt[0], hy: rt[1] };
  const rArm = armSvg(rsx, rsy, ra.ex, ra.ey, ra.hx, ra.hy);
  const coneSvg = cr ? cone(cr.x, cr.y, cr.rot || 0, (cr.s || 1) * s, { id: (o.id || 'L') + 'c', bite: cr.bite || 0, small: cr.small || 0 }) : `<circle cx="${f1(ra.hx)}" cy="${f1(ra.hy)}" r="${30 * s}" fill="${K.skin}" ${OL(4)}/>`;
  // left arm
  const hl = o.handL || { kind: 'rest' };
  const lt = hl.kind === 'rest' ? P(-shX - 30, shY + 420) : [hl.x, hl.y];
  let la = ik(lsx, lsy, lt[0], lt[1], L1, L2, 1);
  if (hl.kind === 'glass' && Math.hypot(lt[0] - lsx, lt[1] - lsy) < 300 * s) la = { ex: lsx - 40 * s, ey: lsy + 170 * s, hx: lt[0], hy: lt[1] };
  const lArm = armSvg(lsx, lsy, la.ex, la.ey, la.hx, la.hy);
  let lHand;
  if (hl.kind === 'palm') {
    const ang = Math.atan2(la.hy - la.ey, la.hx - la.ex) * 180 / Math.PI;
    lHand = `<g transform="translate(${f1(la.hx)} ${f1(la.hy)}) rotate(${f1(hl.ang ?? ang - 90)}) scale(${s})"><path d="M -34 -10 Q -40 40 -26 70 L -16 92 Q -8 100 0 92 L 4 70 L 12 96 Q 22 102 28 92 L 24 66 Q 38 40 34 -10 Z" fill="${K.skin}" ${OL(4)}/><path d="M -34 0 Q -60 20 -52 44" fill="none" ${OL(4)}/></g>`;
  } else if (hl.kind === 'glass') {
    lHand = `<g transform="rotate(${f1(hl.rot || 0)} ${f1(la.hx)} ${f1(la.hy)})">` + glass(la.hx, la.hy + 10 * s, s * (hl.gs || 1), { level: hl.level ?? .8, straw: hl.straw, suck: hl.suck || 0, ice: hl.ice ?? true, id: (o.id || 'L') + 'g', warm: hl.warm, tilt: hl.rot || 0 }) + gripHand(la.hx, la.hy + 10 * s, -1, K.skin, s) + '</g>';
  } else lHand = `<circle cx="${f1(la.hx)}" cy="${f1(la.hy)}" r="${30 * s}" fill="${K.skin}" ${OL(4)}/>`;
  const tr = o.tremble ? [o.tremble * Math.sin(t * 70), o.tremble * .5 * Math.cos(t * 53)] : [0, 0];
  const body = `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M -60 110 L -60 230 L 60 230 L 60 110 Z" fill="${K.skinSh}" ${OL(5)}/>
     <path d="M -${shX + 30} ${shY + 20} Q -${shX + 10} ${shY - 40} -60 ${shY - 50} Q 0 ${shY - 20} 60 ${shY - 50} Q ${shX + 10} ${shY - 40} ${shX + 30} ${shY + 20} L ${shX + 10} 1100 L -${shX + 10} 1100 Z" fill="${K.shirt}" ${OL(5)}/>
     <path d="M -56 ${shY - 48} Q 0 ${shY + 4} 56 ${shY - 48}" fill="none" ${OL(5)}/>
     <path d="M ${shX - 30} ${shY + 60} Q ${shX - 10} ${shY + 300} ${shX - 20} 1100" fill="none" stroke="${K.shirtSh}" stroke-width="22"/>
   </g>`;
  const head = `<g transform="translate(${f1(x + tr[0])} ${f1(y + tr[1])}) scale(${s})">${leaHead(o)}</g>`;
  // order: body, arms behind hands? arms in front of torso; hand with cone above
  const lFirst = hl.kind === 'palm';
  return body + (lFirst ? '' : lArm + lHand) + rArm + head + (lFirst ? lArm + lHand : '') + coneSvg;
}
// glass of drink centred at (x,y) = grip point; o.level 0..1, o.straw true, o.suck 0..1 liquid in straw
export function glass(x, y, s = 1, o = {}) {
  const id = o.id || 'g', lv = cl(o.level ?? .8);
  const top = -150, bot = 120, ly = lerp(bot, top + 20, lv);
  const liq = o.warm ? '#CDEBFA' : '#FF9FB2';
  const ice = o.ice === false ? '' : [[-30, -20, 18], [22, 0, -12], [-6, 30, 30]].map(([ix, iy, r]) => iy > ly - 30 ? `<rect x="${ix - 24}" y="${Math.max(iy, ly - 10) - 24}" width="48" height="44" rx="8" fill="#F4FCFF" opacity=".9" ${OL(3)} transform="rotate(${r} ${ix} ${iy})"/>` : '').join('');
  const straw = o.straw ? `<path d="M 30 ${bot - 40} L 52 -250 L 110 -300" fill="none" stroke="${K.ink}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/><path d="M 30 ${bot - 40} L 52 -250 L 110 -300" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M 30 ${bot - 40} L 52 -250 L 110 -300" fill="none" stroke="${liq}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${f1(lerp(0, 520, cl(o.suck || 0)))} 900"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <clipPath id="${id}q"><path d="M -78 ${top} L 78 ${top} L 64 ${bot} Q 0 ${bot + 16} -64 ${bot} Z"/></clipPath>
    <path d="M -78 ${top} L 78 ${top} L 64 ${bot} Q 0 ${bot + 16} -64 ${bot} Z" fill="${K.glass}" opacity=".8"/>
    <g clip-path="url(#${id}q)"><rect x="-200" y="${f1(ly)}" width="400" height="400" fill="${liq}" transform="rotate(${f1(-(o.tilt || 0))} 0 ${f1(ly)})"/>${ice}</g>
    ${straw}
    <path d="M -78 ${top} L 78 ${top} L 64 ${bot} Q 0 ${bot + 16} -64 ${bot} Z" fill="url(#eGlassW)" ${OL(5)}/>
    <ellipse cx="0" cy="${top}" rx="78" ry="12" fill="none" ${OL(4)}/></g>`;
}

// ---------------- cutaway: head in profile (facing right) ----------------
// origin = head centre, size ≈ 520 wide. o: ice 0..1 (ice on tongue), cold 0..1 (palate blue), warm 0..1, tongue 0..1 (pressed up),
//   nerve 0..1 (signal travel), branches 0..1, brain 0..1, fore 0..1 (forehead pain), temple 0..1, t
export const HP = { palate: [150, 70], ice: [150, 96], node: [40, 10], brain: [-40, -130], fore: [165, -120], temple: [70, -80], cheek: [170, 40], jaw: [140, 190] };
export const nervePath = 'M 150 70 Q 110 66 84 48 Q 56 30 40 10 Q 10 -40 -30 -100';
const branchF = 'M 40 10 Q 110 -40 190 -150', branchT = 'M 40 10 Q 70 -40 72 -84', branchC = 'M 40 10 Q 110 20 172 40', branchJ = 'M 40 10 Q 80 100 140 186';
export function headProfile(t, o = {}) {
  const id = o.id || 'H';
  const skull = 'M 205 -60 Q 215 -200 60 -250 Q -120 -290 -220 -170 Q -280 -60 -240 60 Q -210 150 -150 190 Q -80 240 -70 380 L 120 380 Q 110 300 130 270 Q 180 266 206 248 Q 226 226 212 206 Q 236 196 226 176 Q 212 168 222 150 L 236 136 Q 242 128 230 122 Q 238 100 236 90 Q 250 74 232 62 L 268 34 Q 282 16 262 4 Q 236 -16 226 -36 Q 214 -46 205 -60 Z';
  const coldA = cl(o.cold || 0), warmA = cl(o.warm || 0);
  const palCol = warmA > 0 ? `rgb(${Math.round(lerp(140, 255, warmA))},${Math.round(lerp(196, 150, warmA))},${Math.round(lerp(255, 140, warmA))})` : coldA > 0 ? `rgb(${Math.round(lerp(242, 120, coldA))},${Math.round(lerp(124, 190, coldA))},${Math.round(lerp(147, 255, coldA))})` : K.tongue;
  const tg = cl(o.tongue || 0);
  const tonguePath = `M 72 ${150 - 20 * tg} Q 90 ${108 - 34 * tg} 140 ${110 - 32 * tg} Q 190 ${108 - 30 * tg} 208 ${126 - 18 * tg} Q 210 150 180 156 L 80 160 Z`;
  const ice = o.ice ? `<g opacity="${cl(o.ice * 3)}" transform="translate(${180 - 20 * cl(o.ice)} ${112}) scale(${lerp(.6, 1, cl(o.ice))})"><path d="M -34 0 Q -40 -26 -12 -30 Q 4 -44 22 -30 Q 44 -26 36 2 Q 20 14 0 10 Q -20 14 -34 0 Z" fill="${K.pinkL}" ${OL(4)}/><circle cx="-8" cy="-14" r="5" fill="#fff"/></g>` : '';
  const waves = coldA > .02 ? [0, 1, 2].map(i => { const k = ((t * .9 + i / 3) % 1); return `<path d="M ${150 - 70 * k} ${76 - 40 * k} Q 150 ${50 - 60 * k} ${150 + 70 * k} ${76 - 40 * k}" fill="none" stroke="${K.cold}" stroke-width="7" stroke-linecap="round" opacity="${(1 - k) * coldA}"/>`; }).join('') : '';
  const nv = cl(o.nerve || 0), br = cl(o.branches || 0);
  const nerveSvg = (o.showNerve || nv > 0 || br > 0) ? `
    <path d="${nervePath}" fill="none" stroke="${K.nerveD}" stroke-width="9" stroke-linecap="round" opacity=".45"/>
    ${[branchF, branchT, branchC, branchJ].map(d => `<path d="${d}" fill="none" stroke="${K.nerveD}" stroke-width="7" stroke-linecap="round" opacity=".35"/>`).join('')}
    <path d="${nervePath}" fill="none" stroke="${K.nerve}" stroke-width="13" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(nv)} 2" filter="url(#blur8)" opacity="${nv > 0 ? .9 : 0}"/>
    <path d="${nervePath}" fill="none" stroke="${K.nerve}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(nv)} 2" opacity="${nv > 0 ? 1 : 0}"/>
    ${[branchF, branchT, branchC, branchJ].map((d, i) => { const p = cl(br * 1.6 - i * .2); return `<path d="${d}" fill="none" stroke="${K.nerve}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(p)} 2" opacity="${p > 0 ? 1 : 0}"/>`; }).join('')}
    <circle cx="40" cy="10" r="${14 + 6 * Math.max(nv > .5 ? 1 : 0, br)}" fill="${nv > .5 || br > 0 ? K.nerve : K.nerveD}" ${OL(3)}/>` : '';
  const pulse = o.pulse != null ? (() => { const p = cl(o.pulse); const pts = [[150, 70], [84, 48], [40, 10], [10, -40], [-30, -100]]; const seg = p * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(seg)), f = seg - i; const px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f); return p > 0 && p < 1 ? `<circle cx="${f1(px)}" cy="${f1(py)}" r="34" fill="url(#eNerve)"/><circle cx="${f1(px)}" cy="${f1(py)}" r="12" fill="#fff"/>` : ''; })() : '';
  const bA = cl(o.brain || 0);
  return `<g>
    <clipPath id="${id}s"><path d="${skull}"/></clipPath>
    <path d="M -230 -180 Q -300 -120 -300 0 Q -320 160 -250 260 Q -230 140 -236 40 Z" fill="${K.hair}" ${OL(4)}/>
    <path d="${skull}" fill="${K.skin}" opacity=".55"/>
    <g clip-path="url(#${id}s)">
      <path d="M -170 -160 Q -150 -250 -30 -246 Q 100 -246 130 -150 Q 150 -70 80 -40 Q -20 -10 -110 -40 Q -190 -70 -170 -160 Z" fill="${K.brain}" ${OL(4)}/>
      <path d="M -120 -150 Q -90 -190 -50 -160 Q -20 -210 20 -170 Q 60 -200 90 -150 M -130 -90 Q -90 -110 -60 -80 Q -20 -120 20 -84 Q 60 -110 100 -80" fill="none" stroke="${K.brainSh}" stroke-width="6" stroke-linecap="round"/>
      ${bA > 0 ? `<path d="M -170 -160 Q -150 -250 -30 -246 Q 100 -246 130 -150 Q 150 -70 80 -40 Q -20 -10 -110 -40 Q -190 -70 -170 -160 Z" fill="${K.nerve}" opacity="${.45 * bA}"/>` : ''}
      <path d="M 60 60 Q 120 54 232 64 L 238 92 Q 236 160 200 170 L 70 172 Q 40 120 60 60 Z" fill="${K.mouth}" ${OL(4)}/>
      <path d="M 66 66 Q 140 56 232 66 L 232 78 Q 150 70 70 82 Z" fill="${palCol}" ${OL(3)}/>
      ${warmA > .02 ? `<ellipse cx="150" cy="70" rx="90" ry="40" fill="url(#eWarm)" opacity="${warmA}"/>` : ''}
      ${coldA > .02 ? `<ellipse cx="150" cy="70" rx="90" ry="40" fill="url(#eCold)" opacity="${coldA}"/>` : ''}
      <path d="${tonguePath}" fill="${K.tongue}" ${OL(4)}/>
      <path d="M 200 60 L 214 60 L 212 80 L 202 80 Z M 202 152 L 216 152 L 214 168 L 202 168 Z" fill="#fff" ${OL(2)}/>
      ${ice}${waves}
      ${o.fore ? `<ellipse cx="160" cy="-120" rx="${70 + 20 * o.fore}" ry="${70 + 20 * o.fore}" fill="url(#eHot)" opacity="${cl(o.fore)}"/>` : ''}
      ${o.temple ? `<ellipse cx="72" cy="-84" rx="66" ry="66" fill="url(#eHot)" opacity="${cl(o.temple)}"/>` : ''}
      ${nerveSvg}${pulse}
    </g>
    <path d="${skull}" fill="none" ${OL(6)}/>
    <path d="M -30 -10 Q -60 -20 -66 20 Q -70 60 -36 64 Q -20 50 -24 30" fill="${K.skinSh}" ${OL(4)}/>
    <path d="M 186 -40 Q 200 -54 214 -46" fill="none" ${OL(5)}/>
    <path d="M -220 -170 Q -130 -270 40 -256 Q 150 -246 200 -150 Q 120 -210 20 -214 Q -120 -220 -200 -110 Z" fill="${K.hair}" ${OL(4)}/>
  </g>`;
}
// magnifier lens frame of radius r at (x,y), showing `inner` (already positioned in world coords)
export function lens(x, y, r, inner, id = 'lz', a = 1) {
  return `<g opacity="${cl(a)}"><clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><g clip-path="url(#${id})">${inner}</g>
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#eLens)"/>
    <path d="M ${f1(x + r * .72)} ${f1(y + r * .72)} L ${f1(x + r * 1.12)} ${f1(y + r * 1.12)}" stroke="${K.ink}" stroke-width="44" stroke-linecap="round"/>
    <path d="M ${f1(x + r * .76)} ${f1(y + r * .76)} L ${f1(x + r * 1.1)} ${f1(y + r * 1.1)}" stroke="${K.teal}" stroke-width="30" stroke-linecap="round"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.ink}" stroke-width="22"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.teal}" stroke-width="12"/></g>`;
}
// blood vessel segment, horizontal, centred at (cx,cy); w = half-width factor (1 normal), col mix cold 0..1 / hot 0..1
export function vessel(t, cx, cy, len, w, o = {}) {
  const id = o.id || 'vs', h = 70 * w, c = cl(o.cold || 0), hot = cl(o.hot || 0);
  const wall = c > 0 ? `rgb(${Math.round(lerp(246, 150, c))},${Math.round(lerp(163, 205, c))},${Math.round(lerp(176, 255, c))})` : hot > 0 ? `rgb(255,${Math.round(lerp(163, 120, hot))},${Math.round(lerp(176, 120, hot))})` : K.vessel;
  const speed = o.speed ?? 1;
  let cells = '';
  for (let i = 0; i < 9; i++) {
    const k = ((i / 9 + t * .22 * speed) % 1), x = cx - len / 2 + k * len, y = cy + (hash(i + 3) - .5) * h * .9;
    cells += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(cl(w, .45, 1.4))})"><ellipse rx="26" ry="17" fill="${K.blood}" ${OL(3)}/><ellipse rx="11" ry="6" fill="${K.bloodD}"/></g>`;
  }
  return `<clipPath id="${id}"><rect x="${cx - len / 2}" y="${f1(cy - h)}" width="${len}" height="${f1(2 * h)}"/></clipPath>
    <rect x="${cx - len / 2}" y="${f1(cy - h - 26)}" width="${len}" height="${f1(2 * h + 52)}" fill="${wall}" ${OL(5)}/>
    <rect x="${cx - len / 2}" y="${f1(cy - h)}" width="${len}" height="${f1(2 * h)}" fill="#FCE3E7" ${OL(4)}/>
    <g clip-path="url(#${id})">${cells}</g>`;
}
// rounded label card with text
export function card(x, y, txt, sz, a = 1, o = {}) {
  if (a <= 0.01) return '';
  const w = o.w || txt.length * sz * .68 + 70, h = sz * 1.5;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(o.sc || 1)})" opacity="${cl(a)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .3}" fill="${o.bg || K.white}" ${OL(6)}/>${TX(txt, 0, sz * .36, sz, o.col || K.ink)}</g>`;
}
// simple thermometer (no numbers): level 0..1
export function thermo(x, y, s, level, col) {
  const h = 300, ly = lerp(h / 2 - 20, -h / 2 + 20, cl(level));
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-30" y="${-h / 2 - 20}" width="60" height="${h + 40}" rx="30" fill="#fff" ${OL(5)}/>
    <rect x="-14" y="${f1(ly)}" width="28" height="${f1(h / 2 + 30 - ly)}" fill="${col}"/><circle cx="0" cy="${h / 2 + 40}" r="48" fill="${col}" ${OL(5)}/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M 14 ${-h / 2 + 20 + i * 60} H 30" ${OL(4)}/>`).join('')}</g>`;
}

// metal cone stand on the counter: ring top at (x,y)
export function holder(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -10 20 L -10 110 M 10 20 L 10 110" ${OL(4)}/><rect x="-14" y="16" width="28" height="96" fill="#C9D3DA" ${OL(4)}/>
    <ellipse cx="0" cy="116" rx="70" ry="16" fill="#C9D3DA" ${OL(4)}/><ellipse cx="0" cy="0" rx="58" ry="18" fill="none" stroke="${K.ink}" stroke-width="16"/><ellipse cx="0" cy="0" rx="58" ry="18" fill="none" stroke="#C9D3DA" stroke-width="8"/></g>`;
}
// front half of the stand ring (drawn over the cone)
export const holderFront = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -58 0 A 58 18 0 0 0 58 0" fill="none" stroke="${K.ink}" stroke-width="16"/><path d="M -58 0 A 58 18 0 0 0 58 0" fill="none" stroke="#C9D3DA" stroke-width="8"/></g>`;
// check badge
export function check(x, y, s, a = 1) { if (a <= .01) return ''; return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" opacity="${cl(a)}"><circle r="90" fill="${K.good}" ${OL(6)}/><path d="M -42 2 L -12 34 L 46 -32" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
// snowflake icon
export function flake(x, y, s, a = 1, col = K.cold) { if (a <= .01) return ''; let d = ''; for (let i = 0; i < 6; i++) { const r = i * 60; d += `<g transform="rotate(${r})"><path d="M 0 0 V -60 M 0 -36 L -16 -50 M 0 -36 L 16 -50" fill="none" stroke="${K.ink}" stroke-width="16" stroke-linecap="round"/><path d="M 0 0 V -60 M 0 -36 L -16 -50 M 0 -36 L 16 -50" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"/></g>`; } return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" opacity="${cl(a)}">${d}</g>`; }
