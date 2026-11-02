// v102 kit (from the v98 kit, adapted from the v95 kit, same style) — "đầu tròn đen" at the reference2 quality bar.
// Glows, light pools and ground shadows are radialGradients (no blur filters); only the far background group is blurred.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff',
  du: '#2fa59a', duSh: '#268b82', duStr: '#e9f7f4',
  bag: '#8a5a36', bagSh: '#6e4527', bagHi: '#a8744a',
  stone: '#9a9a9c', stoneSh: '#77777a', stoneHi: '#b9b9bb',
  cap: '#e8742f', capSh: '#c95f22', capHat: '#f2c14e',   // friend 1: yellow cap, orange top
  bun: '#8a5bb5', bunSh: '#704596',                     // friend 2: bun, purple top
  red: '#d9493f', green: '#3c9a5f',
};
const INK = K.ink;
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
export const op = a => f1(cl(a) * 100) / 100;
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .3) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .38) => t < t0 ? 0 : back(prog(t, t0, t0 + d), 1.7);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += .28; else if ('.,:;!?„“"\'’|·'.includes(ch)) w += .3;
    else if ('il'.includes(ch)) w += .3; else if ('mwMW'.includes(ch)) w += .9;
    else if (ch >= 'A' && ch <= 'Z' || 'ÄÖÜ'.includes(ch)) w += .74; else if (ch >= '0' && ch <= '9') w += .62; else w += .6;
  }
  return w * size;
}
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || K.txt}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${op(o.op)}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 12}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.rot ? ` transform="rotate(${f1(o.rot)} ${f1(x)} ${f1(y)})"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}">${esc(s)}</text>`;

// ---------- frame + camera ----------
// filters/gradients shared by every shot (ids prefixed v102)
const DEFS96 = `<defs>
<filter id="v102bg" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="3.5"/></filter>
<filter id="v102bg2" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="4"/></filter>
<radialGradient id="v102vig" cx="50%" cy="46%" r="74%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>
<radialGradient id="v102sh" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".9"/><stop offset=".6" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>`;
export function frame(body, o = {}) {
  return `${DEFS96}<rect width="1080" height="1920" fill="${o.base || '#2a2630'}"/>${body}<rect width="1080" height="1920" fill="url(#v102vig)"/>`;
}
// camera: zoom sc around (cx,cy), then shift by dx,dy
export const cam = (body, cx, cy, sc, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
// light pool: coloured soft radial light (screen-like add)
export const pool = (x, y, rx, ry, col, a = .45) => { const id = 'v102p' + String(col).replace(/[^0-9a-z]/gi, '') + Math.round(x) + '_' + Math.round(y) + '_' + Math.round(rx); return `<radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="1"/><stop offset=".45" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#${id})" opacity="${op(a)}"/>`; };
export const shadow = (x, y, rx = 190, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y + 4)}" rx="${f1(rx * 1.15)}" ry="${f1(rx * .18)}" fill="url(#v102sh)" opacity="${op(.4 * a)}"/>`;
export const blur = (s, strong) => `<g filter="url(#${strong ? 'v102bg2' : 'v102bg'})">${s}</g>`;

// ---------- blinking ----------
export function blinking(t, seed = 1) {
  const period = 3.1 + hash(seed) * 1.6, ph = (t + hash(seed + 7) * period) % period;
  return ph < .13;
}

// ---------- face parts (head-local coords, head r = 165) ----------
function eyesSvg(o) {
  const e = o.eyes || 'n', lk = o.look || [0, 0];
  const lx = cl(lk[0], -16, 16), ly = cl(lk[1], -14, 14);
  if (e === 'closed') return `<path d="M -85 10 Q -55 26 -25 10 M 25 10 Q 55 26 85 10" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  if (e === 'happy') return `<path d="M -85 18 Q -55 -14 -25 18 M 25 18 Q 55 -14 85 18" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  const ry = e === 'wide' ? 40 : e === 'half' ? 20 : e === 'tired' ? 24 : 34, rx = e === 'wide' ? 34 : 30;
  const pr = e === 'blank' ? 9 : e === 'wide' ? 12 : 14;
  let s = `<ellipse cx="-55" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="50" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  s += `<circle cx="${f1(-55 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f1(50 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/>`;
  if (e !== 'blank') s += `<circle cx="${f1(-50 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/><circle cx="${f1(55 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/>`;
  if (e === 'half' || e === 'tired') s += `<path d="M -90 ${10 - ry + 6} H -20 M 15 ${10 - ry + 6} H 85" stroke="${INK}" stroke-width="14"/>`;
  if (o.glasses) s += `<g fill="none" stroke="#fff" stroke-width="6"><circle cx="-55" cy="10" r="46"/><circle cx="50" cy="10" r="46"/><path d="M -9 6 Q -2 -2 4 6"/></g>`;
  return s;
}
function browsSvg(b) {
  if (!b || b === 'none') return '';
  const d = {
    calm: 'M -92 -50 Q -60 -60 -28 -52 M 22 -52 Q 54 -60 86 -50',
    worried: 'M -90 -45 L -30 -57 M 22 -57 L 82 -45',
    up: 'M -92 -66 Q -60 -80 -28 -68 M 22 -68 Q 54 -80 86 -66',
    angry: 'M -90 -62 L -30 -44 M 22 -44 L 82 -62',
    sad: 'M -92 -42 L -32 -62 M 24 -62 L 84 -42',
    strain: 'M -92 -40 L -30 -58 M 22 -58 L 84 -40',
  }[b] || '';
  return `<path d="${d}" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
}
function mouthSvg(m) {
  const d = {
    flat: '<path d="M -28 105 H 28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>',
    frown: '<path d="M -30 112 C -12 98 12 98 30 112" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    smile: '<path d="M -36 98 C -14 120 14 120 36 98" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    grin: '<path d="M -44 92 C -20 132 20 132 44 92 Z" fill="#fff"/>',
    o: '<ellipse cx="0" cy="106" rx="16" ry="20" fill="#fff"/>',
    small: '<path d="M -14 104 Q 0 110 14 104" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    wavy: '<path d="M -36 108 Q -24 98 -12 108 Q 0 118 12 108 Q 24 98 36 108" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    talk: '<path d="M -26 98 C -10 124 10 124 26 98 Z" fill="#fff"/>',
  }[m || 'flat'];
  return d || '';
}

// ---------- people ----------
export const WHO = {
  chef: { top: '#80838b', sh: '#686b72', mus: true, vest: true },            // boss: moustache, grey vest over white shirt
  cave: { top: '#a8744a', sh: '#8a5a36', knit: true },                     // early human: fur tunic
  sis: { top: '#f2c14e', sh: '#d6a532', acc: 'braids' },                   // sister: two braids, yellow top
  kol2: { top: K.bun, sh: K.bunSh, acc: 'bun' },                           // colleague: bun, purple top
  kun: { top: '#c25b4e', sh: '#a2473c', acc: 'clip' },                     // customer: hair clip, red top
  kid: { top: '#5f8fb5', sh: '#4a7396', acc: 'curly' },                    // child at the checkout
  sel: { top: '#5a6270', sh: '#454c58', acc: 'glasses', collar: true },    // psychologist Martin Seligman: glasses, dark jacket
  du: { top: K.du, sh: K.duSh, str: K.duStr },
  cap: { top: K.cap, sh: K.capSh, acc: 'cap' },
  bun: { top: K.bun, sh: K.bunSh, acc: 'bun' },
  zeig: { top: '#4f6b58', sh: '#3e5646', acc: 'bun2', collar: true },
  doc1: { top: '#f2f2ee', sh: '#d6d6cf', acc: 'glasses', coat: true },
  duw: { top: K.du, sh: K.duSh, str: K.duStr, acc: 'clip' },              // "du" (woman): teal hoodie + small yellow hair clip
  mate: { top: '#d9a62e', sh: '#b8871c', acc: 'curly', knit: true },       // roommate: curly hair, mustard sweater
  coll: { top: '#4a7fc0', sh: '#3a669e', acc: 'glasses', collar: true, shirt: true }, // colleague: glasses, blue shirt
  bff: { top: K.bun, sh: K.bunSh, acc: 'bun' },                            // best friend: bun, purple top
  res1: { top: '#4f6b58', sh: '#3e5646', acc: 'bun2', collar: true },
  res2: { top: '#f2f2ee', sh: '#d6d6cf', acc: 'glasses', coat: true },
  stu1: { top: '#c25b4e', sh: '#a2473c', acc: 'cap' },
  stu2: { top: '#7aa27a', sh: '#5e865e' },
  kolg: { top: '#a9cbe6', sh: '#8bb0cf', acc: 'bun', glasses: true, collar: true },   // v102 colleague: glasses, bun, light blue blouse
  doc2: { top: '#f2f2ee', sh: '#d6d6cf', acc: 'curly', coat: true },
  sis: { top: K.bun, sh: K.bunSh, acc: 'bun', knit: true },
  room: { top: '#8d9096', sh: '#73767c', acc: 'curly', knit: true },       // roommate: curly hair, grey knit sweater
  kol: { top: K.bun, sh: K.bunSh, acc: 'bun' },                            // colleague: bun, purple top
  papa: { top: '#8a5a3c', sh: '#6e452c', acc: 'glasses', mus: true, knit: true }, // father: glasses, moustache, brown knit
  dat1: { top: '#c25b4e', sh: '#a2473c', acc: 'clip' },
  dat2: { top: '#5f8fb5', sh: '#4a7396' },                // sister: bun, purple knit sweater
  stu3: { top: '#5f8fb5', sh: '#4a7396', acc: 'curly' },
  stu4: { top: '#e0b04a', sh: '#c0922f', acc: 'bun2' },
};
const BODY = 'M -150 -368 C -150 -518 -90 -578 0 -578 C 90 -578 150 -518 150 -368 L 170 -158 C 170 -123 -170 -123 -170 -158 Z';
const SHOULDER = { L: [-118, -520], R: [118, -520] };
function arm(side, h, sleeve, elbow) {
  const [sx, sy] = side < 0 ? SHOULDER.L : SHOULDER.R;
  const mx = elbow ? elbow[0] : (sx + h[0]) / 2 + side * 60, my = elbow ? elbow[1] : (sy + h[1]) / 2 + 30;
  const d = `M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="23" fill="${INK}"/>`;
}

function headSvg(W, t, o) {
  // head
  const eyes = (o.blink !== false && blinking(t, (o.seed || 0) + 3) && !['closed', 'happy'].includes(o.eyes || 'n')) ? 'closed' : (o.eyes || 'n');
  let head = '';
  if (W.acc === 'bun') head += `<circle cx="20" cy="-170" r="58" fill="${INK}"/><rect x="-26" y="-140" width="70" height="16" rx="8" fill="${K.yellow}" stroke="${INK}" stroke-width="3" transform="rotate(-12 9 -132)"/>`;
  if (W.acc === 'braids') head += `<g fill="${INK}"><circle cx="-150" cy="40" r="40"/><circle cx="-168" cy="110" r="34"/><circle cx="-176" cy="170" r="28"/><circle cx="150" cy="40" r="40"/><circle cx="168" cy="110" r="34"/><circle cx="176" cy="170" r="28"/></g><rect x="-196" y="190" width="40" height="16" rx="6" fill="#d9493f"/><rect x="156" y="190" width="40" height="16" rx="6" fill="#d9493f"/>`;
  if (W.acc === 'bun2') head += `<circle cx="0" cy="-175" r="52" fill="${INK}"/>`;
  if (W.acc === 'curly') head += `<g fill="${INK}">${[[-120, -80], [-90, -128], [-40, -158], [20, -160], [76, -136], [116, -92], [136, -36], [-138, -24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="48"/>`).join('')}</g>`;
  head += `<circle cx="0" cy="0" r="165" fill="${INK}"/>`;
  head += `<ellipse cx="-65" cy="-75" rx="50" ry="24" fill="#fff" opacity=".16"/>`;
  if (o.rim) head += `<path d="M 110 -110 C 160 -60 170 50 125 110" fill="none" stroke="${o.rim}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  if (o.rimL) head += `<path d="M -110 -110 C -160 -60 -170 50 -125 110" fill="none" stroke="${o.rimL}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  head += eyesSvg({ eyes, look: o.look, glasses: W.acc === 'glasses' || W.glasses }) + browsSvg(o.brows) + (o.zip > 0 ? '' : mouthSvg(o.mouth || 'flat'));
  if (W.mus) head += `<path d="M -62 82 C -40 58 -10 62 0 76 C 10 62 40 58 62 82 C 40 80 14 84 0 90 C -14 84 -40 80 -62 82 Z" fill="#fff"/>`;
  if (o.zip > 0) { const zw = 110 * Math.min(1, o.zip); head += `<g><rect x="-58" y="94" width="${f1(zw + 6)}" height="24" rx="6" fill="#b8bcc4" stroke="#fff" stroke-width="4"/>${Array.from({ length: Math.floor(zw / 12) }, (_, i) => `<path d="M ${-52 + i * 12} 96 v 20" stroke="#5a5e66" stroke-width="4"/>`).join('')}<rect x="${f1(-58 + zw)}" y="88" width="22" height="40" rx="6" fill="${K.yellow}" stroke="${INK}" stroke-width="4"/></g>`; }
  if (W.acc === 'clip') head += `<g transform="translate(-118 -96) rotate(-38)"><rect x="-34" y="-11" width="68" height="22" rx="8" fill="${K.yellow}" stroke="${INK}" stroke-width="4"/><circle cx="-18" cy="0" r="4" fill="${INK}"/></g>`;
  if (W.acc === 'cap') head += `<path d="M -158 -40 C -150 -150 -70 -180 10 -178 C 100 -174 160 -120 160 -40 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="6"/><path d="M -158 -40 C -210 -40 -250 -26 -262 -12 C -210 -4 -150 -14 -100 -26 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-176" r="12" fill="${K.capSh}" stroke="${INK}" stroke-width="4"/>`;
  if (o.sweat) {
    const p = (t * .9) % 1;
    head += `<path d="M 150 ${f1(-60 + p * 60)} q 14 22 0 30 q -14 -8 0 -30 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="3" opacity="${op(o.sweat * (1 - p))}"/>`;
  }
  return head;
}
// a single head (r = 165·s) centred at (x,y)
export function head(who, x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.headTilt || 0)}) scale(${f1(s * 1000) / 1000})">${headSvg(WHO[who], o.t || 0, o)}</g>`;
}
// person: origin at the feet centre. s=1 → head r 165 (reference2 medium shot).
// o: t, seed, look, eyes, brows, mouth, armL/armR [x,y] hand target (local), elbowL/elbowR,
//    hunch 0..1, pack: {n, labels} (backpack behind, straps in front), walk phase, rim (light colour),
//    headTilt, headDy, lean, sweat 0..1, flip, a, legs:false
export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0, hunch = cl(o.hunch || 0);
  let bob = o.still ? 0 : Math.sin(t * 2.1 + (o.seed || 0)) * 4;
  for (const d of (o.drops || [])) if (t >= d) bob += 22 * Math.exp(-(t - d) * 7) * Math.cos((t - d) * 22);
  const top = o.top || W.top, sh = W.sh;
  const wk = o.walk;
  let legs = '';
  if (o.legs !== false) {
    const sw = wk === undefined ? 0 : Math.sin(wk * Math.PI * 2) * 34;
    const l1 = wk === undefined ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 14, l2 = wk === undefined ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 14;
    const kn = hunch * 26; // knees bend outward under weight
    legs += `<path d="M -40 -150 Q ${f1(-40 - kn + sw / 2)} -75 ${f1(-40 + sw)} ${f1(-10 - l1)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<path d="M 40 -150 Q ${f1(40 + kn - sw / 2)} -75 ${f1(40 - sw)} ${f1(-10 - l2)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<ellipse cx="${f1(-50 + sw)}" cy="${f1(-l1)}" rx="36" ry="14" fill="${INK}"/><ellipse cx="${f1(50 - sw)}" cy="${f1(-l2)}" rx="36" ry="14" fill="${INK}"/>`;
  }
  // body
  const sqY = 1 - hunch * .1;
  let body = `<path d="${BODY}" fill="${top}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  if (W.vest) {
    body += `<path d="M -64 -566 L 0 -440 L 64 -566 Z" fill="#f2f2ee" stroke="${INK}" stroke-width="4"/><path d="M -12 -540 L 12 -540 L 18 -460 L 0 -430 L -18 -460 Z" fill="#b5443c" stroke="${INK}" stroke-width="3"/><g fill="${sh}"><circle cx="0" cy="-400" r="8"/><circle cx="0" cy="-340" r="8"/><circle cx="0" cy="-280" r="8"/></g><rect x="60" y="-470" width="56" height="10" rx="4" fill="${sh}"/>`;
  } else if (W.coat) {
    body += `<path d="M 0 -560 V -140" stroke="${sh}" stroke-width="6"/><path d="M -60 -566 L 0 -470 L 60 -566" stroke="${INK}" stroke-width="5" fill="#9fc3df"/><g fill="${sh}"><rect x="-120" y="-300" width="70" height="60" rx="8"/><rect x="50" y="-300" width="70" height="60" rx="8"/></g><rect x="56" y="-420" width="44" height="10" rx="4" fill="#3a6fb5"/>`;
  } else if (W.shirt) {
    body += `<path d="M -60 -566 L 0 -506 L 60 -566 L 40 -580 L 0 -540 L -40 -580 Z" fill="#e9f0f8" stroke="${INK}" stroke-width="4"/><path d="M 0 -506 V -140" stroke="${sh}" stroke-width="5"/><g fill="#e9f0f8">${[-450, -380, -310, -240].map(y => `<circle cx="0" cy="${y}" r="6"/>`).join('')}</g><rect x="50" y="-440" width="60" height="50" rx="6" fill="${sh}"/>`;
  } else if (W.collar) {
    body += `<path d="M -60 -566 L 0 -500 L 60 -566 Z" fill="#f4eee0" stroke="${INK}" stroke-width="4"/><g fill="${sh}"><circle cx="0" cy="-450" r="7"/><circle cx="0" cy="-390" r="7"/><circle cx="0" cy="-330" r="7"/></g>`;
  } else {
    body += `<path d="M -130 -518 C -100 -578 100 -578 130 -518 C 100 -488 -100 -488 -130 -518 Z" fill="${sh}" stroke="${INK}" stroke-width="5"/>`;
    if (W.knit) body += `<g stroke="${sh}" stroke-width="5" fill="none">${[-430, -360, -290].map(y => `<path d="M -120 ${y} q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0"/>`).join('')}</g>`;
    if (W.str) body += `<path d="M -12 -498 L -26 -423 M 12 -498 L 26 -423" stroke="${W.str}" stroke-width="7" stroke-linecap="round"/><circle cx="-26" cy="-416" r="7" fill="${W.str}"/><circle cx="26" cy="-416" r="7" fill="${W.str}"/>`;
    body += `<path d="M -100 -278 C -60 -258 60 -258 100 -278 L 95 -218 C 55 -198 -55 -198 -95 -218 Z" fill="${sh}" stroke="${INK}" stroke-width="4"/>`;
  }
  let packBack = '', straps = '';
  if (false) {
    const n = o.pack.n || 0, labels = o.pack.labels || [];
    
    const sw = 26 + Math.min(n, 7) * 2;
    straps = `<path d="M -112 -548 C -126 -470 -128 -400 -118 -330 M 112 -548 C 126 -470 128 -400 118 -330" stroke="${INK}" stroke-width="${sw + 10}" fill="none" stroke-linecap="round"/><path d="M -112 -548 C -126 -470 -128 -400 -118 -330 M 112 -548 C 126 -470 128 -400 118 -330" stroke="${K.bag}" stroke-width="${sw}" fill="none" stroke-linecap="round"/><rect x="-136" y="-420" width="36" height="24" rx="5" fill="#d8b46a" stroke="${INK}" stroke-width="4"/><rect x="100" y="-420" width="36" height="24" rx="5" fill="#d8b46a" stroke="${INK}" stroke-width="4"/>`;
  }
  // arms
  let armsF = '';
  if (o.armL) armsF += arm(-1, o.armL, top, o.elbowL);
  if (o.armR) armsF += arm(1, o.armR, top, o.elbowR);
  const head = headSvg(W, t, o);
  const hy = -713 + hunch * 95 + (o.headDy || 0) + bob * .5;
  const hx = hunch * 18;
  const up = bob * .5;
  const g = `${legs}<g transform="translate(0 ${f1(up)})">${packBack}<g transform="translate(0 -150) scale(1 ${f1(sqY * 1000) / 1000}) translate(0 150)">${body}${straps}</g>${o.behindHead || ''}<g transform="translate(${f1(hx)} ${f1(hy)}) rotate(${f1((o.headTilt || 0) + hunch * 7)})">${head}${o.face || ''}</g>${armsF}${o.front || ''}</g>`;
  const sx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.lean || 0)}) scale(${f1(s * sx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}

// world position of a person's head centre
export const headAt = (x, y, s, o = {}) => [x + s * (cl(o.hunch || 0) * 18), y + s * (-713 + cl(o.hunch || 0) * 95 + (o.headDy || 0))];

// ---------- bubbles / labels ----------
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 90, h = L.length * lh + 56;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .35), c1y = lerp(ey, ty, .35), c2x = lerp(ex, tx, .7), c2y = lerp(ey, ty, .7);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="11" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 70))}" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  L.forEach((l, i) => { s += T(x, by + 28 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
// big outlined label (day cards, hook title)
export function label(txt, x, y, size, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const s = T(x, y, txt, size, { fill: o.fill || K.yellow, stroke: INK, sw: o.sw || Math.round(size * .19), ls: o.ls, w: 900 });
  return `<g transform="translate(${f1(x)} ${f1(y - size * .35)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-x)} ${f1(-(y - size * .35))})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export const dayCard = (t, t0, word, o = {}) => label(word, 540, o.y || 250, o.size || 104, { p: pop(t, t0, .45), a: o.a });
// rounded chip with text
export function chip(x, y, txt, o = {}) {
  const size = o.size || 40, w = textW(txt, size) + 60, h = size + 34;
  return `<g opacity="${op(o.a === undefined ? 1 : o.a)}"><rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="5"/>${T(x, y + size * .36, txt, size, { fill: o.fill || K.txt, w: 800 })}</g>`;
}

// ---------- props ----------
export function mug(x, y, s = 1, col = '#f2efe8', t = 0, steam = true) {
  let g = `<path d="M -40 -90 L 40 -90 L 32 0 L -32 0 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M 38 -70 C 72 -70 72 -20 35 -20" fill="none" stroke="${INK}" stroke-width="6"/>`;
  if (steam) for (let i = 0; i < 2; i++) { const p = (t * .5 + i * .5) % 1; g += `<path d="M ${-14 + i * 26} ${f1(-100 - p * 40)} c -8 -14 8 -22 0 -40" stroke="#fff" stroke-width="5" fill="none" opacity="${op(.6 * Math.sin(p * Math.PI))}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}
export function phone(x, y, s = 1, rot = 0, screen = '#2b3a55', inner = '') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><rect x="-70" y="-130" width="140" height="260" rx="22" fill="${INK}"/><rect x="-58" y="-112" width="116" height="222" rx="10" fill="${screen}"/>${inner}</g>`;
}
export function plant(x, y, s = 1, pot = '#b9714f') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -10 -60 C -60 -120 -90 -150 -100 -200 C -50 -180 -20 -140 -4 -70 Z M 6 -60 C 30 -150 60 -190 110 -210 C 90 -150 60 -110 14 -60 Z M 0 -60 C -10 -150 0 -200 20 -250 C 34 -190 26 -130 8 -60 Z" fill="#4f8a5b" stroke="${INK}" stroke-width="4"/><path d="M -50 -60 H 50 L 40 0 H -40 Z" fill="${pot}" stroke="${INK}" stroke-width="5"/></g>`;
}
export function clock(x, y, r, hh, mm, o = {}) {
  const ha = (hh % 12 + mm / 60) * 30 - 90, ma = mm * 6 - 90, rad = a => a * Math.PI / 180;
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${o.face || '#f6f1e6'}" stroke="${INK}" stroke-width="${Math.max(4, r * .08)}"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<circle cx="${f1(x + Math.cos(rad(i * 30)) * r * .8)}" cy="${f1(y + Math.sin(rad(i * 30)) * r * .8)}" r="${f1(r * (i % 3 ? .03 : .06))}" fill="${INK}"/>`).join('')}<path d="M ${x} ${y} L ${f1(x + Math.cos(rad(ha)) * r * .5)} ${f1(y + Math.sin(rad(ha)) * r * .5)}" stroke="${INK}" stroke-width="${f1(r * .09)}" stroke-linecap="round"/><path d="M ${x} ${y} L ${f1(x + Math.cos(rad(ma)) * r * .72)} ${f1(y + Math.sin(rad(ma)) * r * .72)}" stroke="${o.hand || INK}" stroke-width="${f1(r * .055)}" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${f1(r * .07)}" fill="${INK}"/></g>`;
}
// laptop seen from the front-ish (screen faces viewer when face='front', else back of lid)
export function laptop(x, y, s = 1, o = {}) {
  const open = o.open === undefined ? 1 : o.open;
  const lidH = 300 * open;
  let g = `<rect x="-260" y="-14" width="520" height="28" rx="10" fill="#9aa3ad" stroke="${INK}" stroke-width="5"/>`;
  if (o.back) g = `<path d="M -230 0 L -230 ${f1(-lidH)} L 230 ${f1(-lidH)} L 230 0 Z" fill="#b8c0c8" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="${f1(-lidH / 2)}" r="${f1(22 * open)}" fill="#e8edf2"/>` + g;
  else g = `<path d="M -230 0 L -230 ${f1(-lidH)} L 230 ${f1(-lidH)} L 230 0 Z" fill="#2a2f36" stroke="${INK}" stroke-width="5"/><rect x="-212" y="${f1(-lidH + 16)}" width="424" height="${f1(Math.max(0, lidH - 32))}" fill="${o.screen || '#e9eef5'}"/>${open > .95 ? (o.inner || '') : ''}` + g;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// paper sheet (local, centred)
export function paper(x, y, w, h, rot = 0, inner = '', o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><rect x="${f1(-w / 2 + 8)}" y="${f1(-h / 2 + 10)}" width="${w}" height="${h}" rx="6" fill="#000" opacity=".22"/><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${w}" height="${h}" rx="6" fill="${o.fill || '#fbf8ef'}" stroke="${INK}" stroke-width="4"/>${o.lines !== false ? Array.from({ length: Math.floor((h - 60) / 50) }, (_, i) => `<path d="M ${f1(-w / 2 + 24)} ${f1(-h / 2 + 70 + i * 50)} H ${f1(w / 2 - 24)}" stroke="#b9cde6" stroke-width="3"/>`).join('') : ''}${inner}</g>`;
}
export function pen(x, y, s = 1, rot = 30) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})"><rect x="-10" y="-150" width="20" height="130" rx="6" fill="#2f5fb5" stroke="${INK}" stroke-width="4"/><path d="M -10 -20 L 0 6 L 10 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/><rect x="-10" y="-150" width="20" height="20" fill="${INK}"/></g>`;
}
// clipped handwriting: reveal text left→right with progress p
export function hand(txt, x, y, size, p, col = '#22324d', id = 'hw') {
  if (p <= 0) return '';
  const w = textW(txt, size) * 1.05;
  return `<defs><clipPath id="v102${id}"><rect x="${f1(x - 4)}" y="${f1(y - size)}" width="${f1(w * cl(p) + 4)}" height="${f1(size * 1.4)}"/></clipPath></defs>${T(x, y, txt, size, { anchor: 'start', fill: col, w: 700 }).replace('<text ', `<text clip-path="url(#v102${id})" `)}`;
}
export function check(x, y, s = 1, col = K.green, p = 1) {
  if (p <= 0) return '';
  return `<path d="M ${x - 30 * s} ${y} L ${x - 8 * s} ${y + 24 * s} L ${x + 34 * s} ${y - 26 * s}" stroke="${col}" stroke-width="${12 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(110 * s)}" stroke-dashoffset="${f1(110 * s * (1 - cl(p)))}"/>`;
}

// white speech bubble with a pointed tail
export function speech(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 80, h = L.length * lh + 50;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2, fill = o.fill || '#fff';
  const ex = cl(tx, bx + 70, bx + w - 70), ey = ty > y ? by + h - 4 : by + 4;
  let s = `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 50))}" fill="${fill}" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M ${f1(ex - 30)} ${f1(ey)} L ${f1(tx)} ${f1(ty)} L ${f1(ex + 30)} ${f1(ey)} Z" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M ${f1(ex - 26)} ${f1(ey)} L ${f1(ex + 26)} ${f1(ey)}" stroke="${fill}" stroke-width="10"/>`;
  L.forEach((l, i) => { s += T(x, by + 24 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(cl(p * 2))}">${s}</g>`;
}
