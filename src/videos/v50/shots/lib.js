// v50 shared drawing helpers: character, ice cream, cross-section, sets, cards.
import { cl, prog, eio, eout, back, lerp, hash } from '../../../engine/core.js';

export { cl, prog, eio, eout, back, lerp, hash };

export const P = {
  ink: '#16324F', teal: '#2EC4B6', tealD: '#1E9E93', white: '#FFFFFF', pink: '#FF8FA3', pinkD: '#E86F87',
  bg: '#EAF6F4', skin: '#F1C6A5', skinSh: '#DDA583', hair: '#7A4B2C', hairHi: '#9A6340',
  tee: '#FFE8A3', teeSh: '#F2CF73', cold: '#4FA3E8', ice: '#BFE3FF', red: '#E5484D', nerve: '#FFC93C',
  cone: '#E3A857', coneD: '#B97C35', straw: '#FF9EB5', strawD: '#E97C98', van: '#FFF3D6', vanD: '#EBD9AE',
  pist: '#A8D98A', pistD: '#84BD66', wall: '#FFF6E0', sky: '#BFE8F5', brain: '#F7A8BC', brainD: '#E07F9B',
};

const F = `font-family:'Inter';font-weight:900`;

// Zoom punch on a cut: scale 1.07 → 1 in 0.28 s around the frame centre.
export function punch(t, t0, body, amt = 0.07, cx = 540, cy = 760) {
  const s = 1 + amt * (1 - eout(prog(t, t0, t0 + 0.28)));
  return `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${body}</g>`;
}

export function shake(t, t0, amp = 14, decay = 7) {
  if (t < t0) return [0, 0];
  const k = Math.exp(-(t - t0) * decay) * amp;
  return [k * Math.sin((t - t0) * 83), k * Math.cos((t - t0) * 67)];
}

// ---------- backgrounds ----------
export function bgPlain(col = P.bg) {
  let dots = '';
  for (let i = 0; i < 18; i++) dots += `<circle cx="${(hash(i) * 1080).toFixed(0)}" cy="${(hash(i + 40) * 1400).toFixed(0)}" r="${(18 + hash(i + 9) * 50).toFixed(0)}" fill="#fff" opacity=".45"/>`;
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${col}"/>${dots}`;
}

// Summer ice cream parlour: sky, cream wall, striped awning, counter with tubs.
export function parlour(t, o = {}) {
  const dx = o.dx || 0, blur = o.blur ? ` filter="url(#blur8)"` : '';
  let stripes = '';
  for (let i = -1; i < 14; i++) stripes += `<rect x="${i * 90}" y="250" width="45" height="170" fill="${P.teal}"/>`;
  let scal = '';
  for (let i = 0; i < 13; i++) scal += `<path d="M ${i * 90 - 10} 418 q 45 60 90 0" fill="${i % 2 ? '#fff' : P.teal}" stroke="${P.ink}" stroke-width="5"/>`;
  const tubs = [P.straw, P.van, P.pist, '#8B5A3C', '#FFD36E', P.straw, P.pist];
  let tub = '';
  tubs.forEach((c, i) => {
    const x = 70 + i * 140;
    tub += `<rect x="${x}" y="1040" width="120" height="70" rx="10" fill="#dfeef0" stroke="${P.ink}" stroke-width="4"/><path d="M ${x + 8} 1046 q 52 -46 104 0 z" fill="${c}" stroke="${P.ink}" stroke-width="4"/>`;
  });
  return `<g transform="translate(${dx} 0)"${blur}>
    <rect x="-80" y="-60" width="1240" height="420" fill="${P.sky}"/>
    <circle cx="900" cy="120" r="70" fill="#FFF3B0"/><circle cx="900" cy="120" r="120" fill="#FFF3B0" opacity=".35"/>
    <rect x="-80" y="200" width="1240" height="1800" fill="${P.wall}"/>
    <rect x="-80" y="235" width="1240" height="20" fill="${P.ink}"/>
    ${stripes}<rect x="-80" y="250" width="1240" height="170" fill="none" stroke="${P.ink}" stroke-width="5"/>${scal}
    <rect x="60" y="560" width="960" height="460" rx="16" fill="#D8F1F4" stroke="${P.ink}" stroke-width="5"/>
    <path d="M 120 600 L 300 600 L 140 980 Z" fill="#fff" opacity=".45"/>
    <rect x="-80" y="1010" width="1240" height="40" fill="${P.ink}"/>
    ${tub}
    <rect x="-80" y="1110" width="1240" height="900" fill="#BCE6E1"/>
    <rect x="-80" y="1110" width="1240" height="16" fill="${P.ink}" opacity=".85"/>
  </g>`;
}

// ---------- ice cream ----------
// Cone with three scoops; origin = point where the hand grips (upper cone). bite 0..1 removes top-right of top scoop.
export function cone(s = 1, o = {}) {
  const bite = o.bite || 0, rot = o.rot || 0, id = o.id || 'cn', small = o.small || 0;
  let lat = '';
  for (let i = -3; i <= 3; i++) lat += `<path d="M ${i * 26 - 40} -40 L ${i * 26 + 60} 140" stroke="${P.coneD}" stroke-width="4"/><path d="M ${i * 26 + 40} -40 L ${i * 26 - 60} 140" stroke="${P.coneD}" stroke-width="4"/>`;
  const conePath = 'M -78 -40 L 78 -40 L 0 230 Z';
  const scoop = (cx, cy, r, c, d) => `<path d="M ${cx - r} ${cy + r * .25} a ${r} ${r * .95} 0 1 1 ${2 * r} 0 q ${-r * .25} ${r * .28} ${-r * .5} 0 q ${-r * .25} ${r * .28} ${-r * .5} 0 q ${-r * .25} ${r * .28} ${-r * .5} 0 q ${-r * .25} ${r * .28} ${-r * .5} 0 z" fill="${c}" stroke="${P.ink}" stroke-width="5"/><path d="M ${cx - r * .55} ${cy - r * .35} q ${r * .2} ${-r * .35} ${r * .55} ${-r * .45}" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".7"/><path d="M ${cx + r * .2} ${cy + r * .32} q ${r * .3} ${-r * .05} ${r * .55} ${-r * .3}" stroke="${d}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  // bite: a scalloped notch of background-free cut via clipPath
  const bx = 20 + 60 * (1 - bite), br = 70 * bite;
  const top = bite > 0
    ? `<clipPath id="${id}b"><path d="M -200 -400 H 200 V 200 H -200 Z M ${bx + br} -177 a ${br} ${br} 0 1 0 0.1 0 z" clip-rule="evenodd"/></clipPath><g clip-path="url(#${id}b)">${scoop(0, -172, 78, P.straw, P.strawD)}</g>${bite > .2 ? `<path d="M ${bx - br * .7} ${-177 - br * .7} a ${br} ${br} 0 0 0 ${br * .1} ${br * 1.4}" fill="none" stroke="${P.strawD}" stroke-width="5" opacity=".8"/>` : ''}`
    : scoop(0, -172, 78, P.straw, P.strawD);
  return `<g transform="scale(${s}) rotate(${rot})">
    <clipPath id="${id}c"><path d="${conePath}"/></clipPath>
    <path d="${conePath}" fill="${P.cone}"/><g clip-path="url(#${id}c)">${lat}</g>
    <path d="${conePath}" fill="none" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
    ${scoop(-38, -70, 82, P.pist, P.pistD)}${scoop(42, -80, 80, P.van, P.vanD)}${top}
    ${small ? `<rect x="-6" y="-200" width="12" height="0" fill="none"/>` : ''}
  </g>`;
}

// ---------- character (front) ----------
// head(): origin = centre of the face. o.eyes: open|happy|squeeze|wide|closed, o.mouth: smile|open|bite|chew|ouch|flat|sip|o
export function head(o = {}) {
  const eyes = o.eyes || 'open', mouth = o.mouth || 'smile', look = o.look || 0, lookY = o.lookY || 0;
  const browU = o.brow || 0; // -1 frown/pain .. 1 raised
  const blush = o.blush ?? .5, cheek = o.cheek || 0, id = o.id || 'hd';
  const eye = (x, side) => {
    if (eyes === 'happy' || eyes === 'closed') return `<path d="M ${x - 26} ${eyes === 'happy' ? 6 : 0} q 26 ${eyes === 'happy' ? -26 : 14} 52 0" stroke="${P.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    if (eyes === 'squeeze') return `<path d="M ${x - 30 * side} -14 L ${x + 18 * side} 2 L ${x - 30 * side} 16" stroke="${P.ink}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${x - 4 * side} -26 l ${-14 * side} -10 M ${x + 4 * side} 26 l ${-12 * side} 10" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" opacity=".6"/>`;
    const r = eyes === 'wide' ? 30 : 25, pr = eyes === 'wide' ? 12 : 14;
    return `<ellipse cx="${x}" cy="0" rx="${r}" ry="${r * 1.12}" fill="#fff" stroke="${P.ink}" stroke-width="5"/><circle cx="${x + look}" cy="${lookY + 2}" r="${pr}" fill="#5A3A22"/><circle cx="${x + look}" cy="${lookY + 2}" r="${pr * .5}" fill="${P.ink}"/><circle cx="${x + look + 5}" cy="${lookY - 4}" r="4.5" fill="#fff"/>`;
  };
  const by = -58 - browU * 14;
  const brow = side => {
    const x = 62 * side, tilt = browU < 0 ? -browU * 16 : 0;
    return `<path d="M ${x - 30 * side} ${by + tilt} q ${30 * side} ${-14} ${60 * side} ${-tilt * .6 - 2}" stroke="${P.hair}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  };
  let m = '';
  if (mouth === 'smile') m = `<path d="M -38 88 q 38 34 76 0" stroke="${P.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (mouth === 'flat') m = `<path d="M -30 96 h 60" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`;
  else if (mouth === 'o') m = `<ellipse cx="0" cy="96" rx="20" ry="24" fill="#7A2E3A" stroke="${P.ink}" stroke-width="5"/>`;
  else if (mouth === 'open' || mouth === 'bite') { const h = mouth === 'bite' ? 62 : 44; m = `<path d="M -48 78 q 48 -10 96 0 q -6 ${h} -48 ${h} q -42 0 -48 ${-h} z" fill="#7A2E3A" stroke="${P.ink}" stroke-width="6"/><path d="M -40 80 q 40 -6 80 0 v 12 q -40 6 -80 0 z" fill="#fff"/><ellipse cx="0" cy="${78 + h * .8}" rx="26" ry="10" fill="${P.pink}"/>`; }
  else if (mouth === 'chew') m = `<path d="M -26 96 q 26 12 52 -4" stroke="${P.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (mouth === 'ouch') m = `<path d="M -50 84 q 50 -14 100 0 l -6 30 q -44 12 -88 0 z" fill="#fff" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M -46 99 q 46 -6 92 0 M -22 86 v 28 M 0 84 v 31 M 22 86 v 28" stroke="${P.ink}" stroke-width="3" fill="none"/>`;
  else if (mouth === 'sip') m = `<ellipse cx="0" cy="96" rx="16" ry="12" fill="#7A2E3A" stroke="${P.ink}" stroke-width="5"/>`;
  return `<g>
    <circle cx="0" cy="-200" r="72" fill="${P.hair}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -40 -205 q 30 -40 70 -24" stroke="${P.hairHi}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <rect x="-36" y="-150" width="72" height="22" rx="10" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/>
    <ellipse cx="-158" cy="20" rx="26" ry="38" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/>
    <ellipse cx="158" cy="20" rx="26" ry="38" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/>
    <path d="M ${-150 - cheek * 14} 0 C -150 -150 150 -150 ${150 + cheek * 14} 0 C ${150 + cheek * 18} 130 80 190 0 190 C -80 190 ${-150 - cheek * 18} 130 ${-150 - cheek * 14} 0 Z" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -152 -10 C -160 -150 -60 -175 0 -170 C 70 -175 160 -150 152 -10 C 140 -70 110 -100 40 -112 C 10 -90 -60 -80 -110 -90 C -130 -70 -145 -40 -152 -10 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M -90 -128 q 50 -30 110 -26" stroke="${P.hairHi}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${brow(-1)}${brow(1)}${eye(-62, -1)}${eye(62, 1)}
    <path d="M 0 20 q -14 34 -2 46 q 10 4 18 -2" stroke="${P.skinSh}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="-92" cy="62" rx="28" ry="16" fill="${P.pink}" opacity="${blush}"/><ellipse cx="92" cy="62" rx="28" ry="16" fill="${P.pink}" opacity="${blush}"/>
    ${m}
  </g>`;
}

// Two-bone IK: returns elbow point for shoulder S, hand H, lengths a, b, bend sign.
function elbow(S, H, a, b, sign) {
  const dx = H[0] - S[0], dy = H[1] - S[1];
  const d = Math.min(Math.hypot(dx, dy), a + b - 1), base = Math.atan2(dy, dx);
  const ang = Math.acos(cl((a * a + d * d - b * b) / (2 * a * d || 1), -1, 1));
  return [S[0] + a * Math.cos(base + sign * ang), S[1] + a * Math.sin(base + sign * ang)];
}

function arm(S, H, sign, holdSvg = '', handRot = 0) {
  const E = elbow(S, H, 210, 200, sign);
  return `<path d="M ${S[0]} ${S[1]} L ${E[0]} ${E[1]} L ${H[0]} ${H[1]}" stroke="${P.ink}" stroke-width="64" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${S[0]} ${S[1]} L ${E[0]} ${E[1]} L ${H[0]} ${H[1]}" stroke="${P.skin}" stroke-width="52" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${S[0]} ${S[1]} L ${lerp(S[0], E[0], .55)} ${lerp(S[1], E[1], .55)}" stroke="${P.ink}" stroke-width="84" stroke-linecap="round"/>
    <path d="M ${S[0]} ${S[1]} L ${lerp(S[0], E[0], .55)} ${lerp(S[1], E[1], .55)}" stroke="${P.tee}" stroke-width="72" stroke-linecap="round"/>
    <g transform="translate(${H[0]} ${H[1]}) rotate(${handRot})">${holdSvg}<ellipse cx="0" cy="0" rx="40" ry="34" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/><path d="M -30 -6 h 52 M -30 10 h 50" stroke="${P.skinSh}" stroke-width="5" stroke-linecap="round"/></g>`;
}

// bust(): torso + head + arms. Origin = neck base. o.hand = [x,y] for screen-right hand (holds cone),
// o.handL = [x,y] for screen-left hand (null = resting low), o.head = head() options, o.coneO = cone() options.
export function bust(o = {}) {
  const H = o.hand || [230, 260], L = o.handL, tilt = o.tilt || 0;
  const coneSvg = o.noCone ? '' : `<g transform="translate(0 -6)">${cone(o.coneS || .9, { ...(o.coneO || {}), id: (o.id || 'b') + 'cone' })}</g>`;
  const right = arm([150, 60], H, -1, o.holdR !== undefined ? o.holdR : coneSvg, o.handRotR || 0);
  const left = L ? arm([-150, 60], L, 1, o.holdL || '', o.handRotL || 0) : '';
  return `<g>
    <path d="M -200 560 C -210 200 -190 40 -110 20 L 110 20 C 190 40 210 200 200 560 Z" fill="${P.tee}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -60 22 q 60 50 120 0" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -150 200 q 20 160 0 340 M 150 200 q -20 160 0 340" stroke="${P.teeSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <rect x="-44" y="-70" width="88" height="96" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/>
    <g transform="translate(0 -230) rotate(${tilt})">${head({ id: (o.id || 'b') + 'h', ...(o.head || {}) })}</g>
    ${left}${right}
  </g>`;
}

// ---------- cold / pain overlays ----------
export function painBurst(x, y, r, a, col = P.red) {
  if (a <= 0) return '';
  let spikes = '';
  for (let i = 0; i < 10; i++) {
    const an = i / 10 * Math.PI * 2 + .2, r0 = r * .55, r1 = r * (i % 2 ? .95 : 1.25);
    spikes += `<path d="M ${x + Math.cos(an - .12) * r0} ${y + Math.sin(an - .12) * r0} L ${x + Math.cos(an) * r1} ${y + Math.sin(an) * r1} L ${x + Math.cos(an + .12) * r0} ${y + Math.sin(an + .12) * r0} Z" fill="${col}"/>`;
  }
  return `<g opacity="${cl(a)}"><circle cx="${x}" cy="${y}" r="${r * .9}" fill="${col}" opacity=".25" filter="url(#blur20)"/>${spikes}<circle cx="${x}" cy="${y}" r="${r * .5}" fill="#fff" stroke="${col}" stroke-width="6"/></g>`;
}

export function frostCrystal(x, y, r, rot = 0, col = P.cold) {
  if (r <= 1) return '';
  let s = '';
  for (let i = 0; i < 6; i++) {
    const a = i * 60;
    s += `<g transform="rotate(${a})"><path d="M 0 0 V ${-r} M 0 ${-r * .55} l ${-r * .22} ${-r * .2} M 0 ${-r * .55} l ${r * .22} ${-r * .2} M 0 ${-r * .82} l ${-r * .14} ${-r * .12} M 0 ${-r * .82} l ${r * .14} ${-r * .12}" stroke="${col}" stroke-width="${Math.max(2, r * .09)}" stroke-linecap="round" fill="none"/></g>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})">${s}</g>`;
}

// ---------- profile cross-section (facing right) ----------
export const HEAD_D = 'M -150 440 C -170 360 -280 260 -290 80 C -300 -120 -230 -330 -40 -380 C 120 -410 250 -320 275 -160 C 285 -100 282 -60 272 -30 C 268 0 290 40 335 92 C 342 104 330 116 300 118 C 290 124 292 140 300 150 C 304 160 296 170 290 176 C 300 186 300 200 292 208 C 282 222 284 238 286 252 C 288 290 260 312 200 312 C 175 330 165 380 160 440 Z';
export const NERVE_MAIN = 'M 170 128 C 120 70 70 30 40 -20';
export const NERVE_FORE = 'M 40 -20 C 100 -90 170 -150 250 -190';
export const NERVE_TEMP = 'M 40 -20 C 60 -60 90 -90 120 -110';
export const NERVE_BRAIN = 'M 40 -20 C 10 -60 -30 -90 -60 -120';

export function profileInside(o = {}) {
  const palCol = o.palCol || P.pink, ice = o.ice ?? 1, iceX = o.iceX ?? 175, tongueUp = o.tongueUp || 0;
  const tY = -tongueUp * 30;
  return `<g>
    <path d="M -230 -150 C -240 -320 -40 -360 100 -330 C 230 -300 260 -180 220 -110 C 190 -60 120 -70 60 -60 C -20 -50 -60 -40 -120 -30 C -200 -20 -225 -80 -230 -150 Z" fill="${o.brainCol || P.brain}" stroke="${P.ink}" stroke-width="5" opacity="${o.brainA ?? .9}"/>
    <path d="M -180 -160 q 40 -60 100 -30 q 50 -60 120 -10 q 50 -30 100 20 M -170 -90 q 60 -30 110 10 q 60 -40 120 0" stroke="${P.brainD}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${o.brainA ?? .9}"/>
    <ellipse cx="225" cy="-5" rx="22" ry="18" fill="#fff" stroke="${P.ink}" stroke-width="4"/><circle cx="236" cy="-4" r="9" fill="#5A3A22"/>
    <path d="M 30 140 C 60 80 160 70 270 140 L 270 162 C 170 104 80 112 30 168 Z" fill="${palCol}" stroke="${P.ink}" stroke-width="5"/>
    <g transform="translate(0 ${tY})"><path d="M 30 250 C 40 190 120 170 200 178 C 240 182 268 192 276 202 C 250 220 200 228 130 240 C 90 246 50 256 30 250 Z" fill="${P.pink}" stroke="${P.ink}" stroke-width="5"/>
    <path d="M 80 214 q 70 -20 150 -16" stroke="${P.pinkD}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    ${ice > 0 ? `<g transform="translate(${iceX} 156) scale(${ice})"><path d="M -40 -6 q 0 -26 40 -26 q 40 0 40 26 q -20 20 -40 18 q -20 2 -40 -18 z" fill="${P.straw}" stroke="${P.ink}" stroke-width="5"/><path d="M -22 -16 q 10 -8 22 -8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>` : ''}
  </g>`;
}

// Full transparent profile head. o: skinA (0..1 skin opacity), inside opts, nerve 0..1 draw, signal pos, glow targets.
export function profileHead(o = {}) {
  const skinA = o.skinA ?? .45, id = o.id || 'pf';
  return `<g>
    <path d="M -150 440 L -170 760 L 190 760 L 160 440 Z" fill="${P.tee}" stroke="${P.ink}" stroke-width="6"/>
    <clipPath id="${id}clip"><path d="${HEAD_D}"/></clipPath>
    <path d="${HEAD_D}" fill="${P.skin}"/>
    <g clip-path="url(#${id}clip)">
      <rect x="-320" y="-420" width="680" height="900" fill="#fff" opacity="${(1 - skinA) * .85}"/>
      ${profileInside(o)}
      ${o.extra || ''}
    </g>
    <path d="M -290 80 C -300 -120 -230 -330 -40 -380 C 60 -400 140 -380 200 -330 C 120 -350 40 -330 -30 -300 C -120 -320 -200 -240 -230 -120 C -250 -40 -270 20 -290 80 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="5" opacity=".95"/>
    <circle cx="-250" cy="-200" r="66" fill="${P.hair}" stroke="${P.ink}" stroke-width="6"/>
    <rect x="-210" y="-250" width="26" height="70" rx="10" fill="${P.teal}" stroke="${P.ink}" stroke-width="5" transform="rotate(-28 -197 -215)"/>
    <ellipse cx="-60" cy="40" rx="34" ry="52" fill="${P.skin}" stroke="${P.ink}" stroke-width="5" opacity="${.4 + skinA * .6}"/>
    <path d="${HEAD_D}" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
  </g>`;
}

// Glowing nerve stroke with draw progress p (0..1). len ≈ path length.
export function nerve(d, p, len = 260, w = 12, col = P.nerve) {
  if (p <= 0) return '';
  return `<path d="${d}" stroke="${col}" stroke-width="${w * 2.6}" fill="none" stroke-linecap="round" opacity=".35" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - cl(p))}" filter="url(#blur8)"/>
    <path d="${d}" stroke="${P.ink}" stroke-width="${w + 6}" fill="none" stroke-linecap="round" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - cl(p))}"/>
    <path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - cl(p))}"/>`;
}

// Point along a cubic path given as [p0,c1,c2,p1].
export function bez(pts, u) {
  const [a, b, c, d] = pts, v = 1 - u;
  return [v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0],
    v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1]];
}
export const NM = [[170, 128], [120, 70], [70, 30], [40, -20]];
export const NF = [[40, -20], [100, -90], [170, -150], [250, -190]];
export const NT = [[40, -20], [60, -60], [90, -90], [120, -110]];
export const NB = [[40, -20], [10, -60], [-30, -90], [-60, -120]];

export function spark(x, y, r = 22) {
  return `<circle cx="${x}" cy="${y}" r="${r * 2}" fill="${P.nerve}" opacity=".45" filter="url(#blur8)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${P.nerve}" stroke-width="7"/>`;
}

// Magnifier lens: draws `inner` (in lens-local coords centred at 0,0) clipped to a circle at (x,y), radius r.
export function lens(x, y, r, inner, id = 'ln', handle = true) {
  return `<g transform="translate(${x} ${y})">
    <circle cx="8" cy="16" r="${r + 18}" fill="#000" opacity=".15" filter="url(#blur8)"/>
    ${handle ? `<path d="M ${r * .72} ${r * .72} L ${r * 1.25} ${r * 1.25}" stroke="${P.ink}" stroke-width="58" stroke-linecap="round"/><path d="M ${r * .74} ${r * .74} L ${r * 1.23} ${r * 1.23}" stroke="${P.tealD}" stroke-width="42" stroke-linecap="round"/>` : ''}
    <clipPath id="${id}"><circle cx="0" cy="0" r="${r}"/></clipPath>
    <circle cx="0" cy="0" r="${r}" fill="#fff"/>
    <g clip-path="url(#${id})">${inner}</g>
    <circle cx="0" cy="0" r="${r}" fill="none" stroke="${P.ink}" stroke-width="26"/><circle cx="0" cy="0" r="${r}" fill="none" stroke="${P.teal}" stroke-width="14"/>
    <path d="M ${-r * .62} ${-r * .3} a ${r * .7} ${r * .7} 0 0 1 ${r * .35} ${-r * .38}" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/>
  </g>`;
}

// ---------- text ----------
export function label(x, y, txt, size, o = {}) {
  const col = o.col || P.ink, card = o.card !== false, sc = o.s ?? 1, rot = o.rot || 0;
  const w = txt.length * size * .66 + size * .9, h = size * 1.45;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">
    ${card ? `<rect x="${-w / 2 + 8}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="${size * .3}" fill="${P.ink}" opacity=".9"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${size * .3}" fill="${o.bg || '#fff'}" stroke="${P.ink}" stroke-width="6"/>` : ''}
    <text x="0" y="${size * .36}" text-anchor="middle" font-size="${size}" fill="${col}" ${card ? '' : `stroke="${P.ink}" stroke-width="${size * .12}" paint-order="stroke"`} style="${F}">${txt}</text>
  </g>`;
}

export function thermo(x, y, level, col, s = 1) {
  const h = 420 * cl(level);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-34" y="-470" width="68" height="470" rx="34" fill="#fff" stroke="${P.ink}" stroke-width="7"/>
    <circle cx="0" cy="20" r="58" fill="${col}" stroke="${P.ink}" stroke-width="7"/>
    <rect x="-16" y="${-h}" width="32" height="${h + 20}" rx="16" fill="${col}"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M 34 ${-80 - i * 84} h -22" stroke="${P.ink}" stroke-width="5"/>`).join('')}
  </g>`;
}

export function glass(o = {}) {
  const level = o.level ?? 1, frost = o.frost || 0, warm = o.warm || 0, id = o.id || 'gl';
  const liquid = warm ? '#E9F6FF' : '#FFB86B';
  const top = 330 - 300 * level;
  let cubes = '';
  if (!warm) for (let i = 0; i < 4; i++) cubes += `<rect x="${-95 + i * 48}" y="${Math.max(top - 20, 60 + (i % 2) * 70)}" width="62" height="62" rx="10" fill="#fff" opacity=".75" stroke="${P.ink}" stroke-width="4" transform="rotate(${-12 + i * 9} ${-64 + i * 48} ${Math.max(top + 10, 90 + (i % 2) * 70)})"/>`;
  let fr = '';
  if (frost > 0) for (let i = 0; i < 7; i++) fr += frostCrystal(-90 + hash(i + 3) * 180, 40 + hash(i + 7) * 280, 26 * frost * (.6 + hash(i) * .6), i * 20, '#fff');
  return `<g>
    <clipPath id="${id}"><path d="M -130 0 L 130 0 L 108 360 Q 104 380 84 380 L -84 380 Q -104 380 -108 360 Z"/></clipPath>
    <path d="M -130 0 L 130 0 L 108 360 Q 104 380 84 380 L -84 380 Q -104 380 -108 360 Z" fill="#EAF7FF" opacity=".8"/>
    <g clip-path="url(#${id})"><rect x="-140" y="${top}" width="280" height="420" fill="${liquid}"/>${cubes}<rect x="-140" y="0" width="280" height="400" fill="${P.ice}" opacity="${frost * .35}"/>${fr}</g>
    <path d="M -130 0 L 130 0 L 108 360 Q 104 380 84 380 L -84 380 Q -104 380 -108 360 Z" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M -100 30 L -84 330" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".7"/>
  </g>`;
}

// Blood-vessel network inside palate tissue (local coords ~ ±320). wf = width factor, cold 0..1 tints blue.
export function vessels(wf, cold, pulse = 0) {
  const col = mix(P.red, P.cold, cold), w = 26 * wf * (1 + .08 * pulse);
  const ds = ['M -320 -40 C -200 -80 -120 20 0 -10 C 120 -40 200 40 320 0',
    'M -120 0 C -100 -100 -60 -160 -40 -260', 'M 60 -20 C 90 80 140 150 120 260', 'M 180 10 C 220 -80 260 -140 300 -220',
    'M -220 -60 C -240 40 -260 120 -300 200', 'M -40 -10 C -10 60 -60 140 -40 240'];
  return ds.map((d, i) => { const k = i ? .62 : 1; return `<path d="${d}" stroke="${P.ink}" stroke-width="${w * k + 10}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="${w * k}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#fff" stroke-width="${Math.max(2, w * k * .22)}" fill="none" stroke-linecap="round" opacity=".45" transform="translate(${-w * k * .18} ${-w * k * .18})"/>`; }).join('');
}

export function mix(a, b, p) {
  const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const x = h(a), y = h(b), q = cl(p);
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * q).toString(16).padStart(2, '0')).join('');
}

// Back view of the character (for walking away). Origin = neck base.
export function backView() {
  return `<g>
    <path d="M -200 560 C -210 200 -190 40 -110 20 L 110 20 C 190 40 210 200 200 560 Z" fill="${P.tee}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -150 200 q 20 160 0 340 M 150 200 q -20 160 0 340" stroke="${P.teeSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <rect x="-44" y="-70" width="88" height="96" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/>
    <ellipse cx="-158" cy="-210" rx="26" ry="38" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/><ellipse cx="158" cy="-210" rx="26" ry="38" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/>
    <path d="M -152 -230 C -160 -400 160 -400 152 -230 C 150 -110 80 -60 0 -60 C -80 -60 -150 -110 -152 -230 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -80 -330 q 40 -30 90 -20 M -100 -230 q 0 -60 30 -90" stroke="${P.hairHi}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <rect x="-36" y="-370" width="72" height="22" rx="10" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/>
    <circle cx="0" cy="-300" r="70" fill="${P.hair}" stroke="${P.ink}" stroke-width="6"/>
  </g>`;
}

// Simple front pictogram of a head (for the clipboard / icons).
export function headIcon(x, y, s, col = P.ink) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-30" r="70" fill="#fff" stroke="${col}" stroke-width="10"/><path d="M -90 110 q 90 -90 180 0" fill="#fff" stroke="${col}" stroke-width="10"/></g>`;
}
