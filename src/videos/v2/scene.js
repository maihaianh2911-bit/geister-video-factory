// @ts-nocheck
// AUTO-GENERATED scene for v2. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const hexC = c => c[0] === '#' ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : (c.match(/\d+/g) || [0, 0, 0]).slice(0, 3).map(Number);
const mixC = (a, b, p) => { const A = hexC(a), B = hexC(b), q = cl(p); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * q)).join(',')})`; };
const SKY_T = ['#c9d6e8', '#1c4fba', '#3d2a74', '#070b1e'];
const SKY_B = ['#eef2f7', '#74b8f6', '#ff9a4c', '#1b2550'];
const skyCol = (arr, m) => { const i = Math.max(0, Math.min(2, Math.floor(m))); return mixC(arr[i], arr[i + 1], m - i); };
const RAYC = ['#ff4b5c', '#ff9a3c', '#ffe14d', '#5fdc6a', '#3fa9ff', '#5b5cff', '#b35cff'];
const TXT = `style="font-family:'Inter';font-weight:900"`;

function qmark(x, y, s, rot, col) {
  if (s <= 0) return '';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><text x="0" y="70" text-anchor="middle" ${TXT} font-size="200" fill="${col || C.warm}" stroke="${C.ol}" stroke-width="9" paint-order="stroke">?</text></g>`;
}

function cloud(x, y, s, col, sh) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="10" rx="120" ry="38" fill="${sh}"/><ellipse cx="-50" cy="-10" rx="60" ry="44" fill="${col}"/><ellipse cx="25" cy="-28" rx="62" ry="52" fill="${col}"/><ellipse cx="80" cy="0" rx="48" ry="34" fill="${col}"/><ellipse cx="0" cy="8" rx="116" ry="30" fill="${col}"/></g>`;
}

function hillSet(t, o) {
  const m = o.m ?? 1, id = o.id || 'hs';
  const top = skyCol(SKY_T, m), bot = skyCol(SKY_B, m);
  const [sx, sy] = o.sun || [840, 300];
  const sr = o.sunR || 90;
  const sunCol = mixC('#fff6d6', '#ff7a3a', cl((m - 1.1) / .9));
  const night = cl(m - 2);
  const gBack = mixC(mixC('#5cbf72', '#9a5a5e', cl(m - 1)), '#15223a', night);
  const gFront = mixC(mixC('#3f9a5a', '#6e3f52', cl(m - 1)), '#0e1828', night);
  const gTuft = mixC(mixC('#2c7a44', '#4e2a3c', cl(m - 1)), '#0a1220', night);
  const cc = mixC(mixC('#ffffff', '#ffc2a0', cl(m - 1)), '#2a3560', night), cs = mixC(mixC('#cfe3ff', '#d0708a', cl(m - 1)), '#1a2448', night);
  let rays = '';
  if (m < 1.6 && (o.rays ?? 1) > 0) for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2 + t * .25, L = sr * (1.6 + .25 * Math.sin(t * 3 + i));
    rays += `<path d="M ${sx + Math.cos(a - .09) * sr * 1.1} ${sy + Math.sin(a - .09) * sr * 1.1} L ${sx + Math.cos(a) * L} ${sy + Math.sin(a) * L} L ${sx + Math.cos(a + .09) * sr * 1.1} ${sy + Math.sin(a + .09) * sr * 1.1} Z" fill="${sunCol}" opacity="${.55 * (o.rays ?? 1) * cl(1.6 - m)}"/>`;
  }
  let tufts = '';
  for (let i = 0; i < 16; i++) {
    const x = 30 + i * 68 + 20 * hash(i), y = 1290 + 40 * Math.sin(i * 1.3) + 380 * hash(i + 4);
    const w = 3 * Math.sin(t * 2 + i);
    tufts += `<path d="M ${x - 14} ${y} q ${-4 + w} -26 ${-8 + w} -38 M ${x} ${y} q ${w} -30 ${2 + w} -48 M ${x + 14} ${y} q ${6 + w} -24 ${12 + w} -34" stroke="${gTuft}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
  const cx1 = ((t * 22 + 120) % 1500) - 250, cx2 = ((t * 14 + 760) % 1500) - 250;
  return `<defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".75" stop-color="${bot}"/></linearGradient></defs>
    <rect x="-40" y="-40" width="1160" height="2000" fill="url(#${id}g)"/>
    ${night > 0 ? `<g opacity="${night}">${stars(70, 21)}</g>` : ''}
    ${rays}
    <circle cx="${sx}" cy="${sy}" r="${sr * 2.2}" fill="${sunCol}" opacity=".28" filter="url(#blur40)"/>
    <circle cx="${sx}" cy="${sy}" r="${sr}" fill="${sunCol}" stroke="${mixC('#ffd27a', '#c2452e', cl(m - 1))}" stroke-width="6"/>
    ${cloud(cx1, 470, .9, cc, cs)}${cloud(cx2, 250, .7, cc, cs)}
    ${o.extraSky || ''}
    <path d="M -40 1180 Q 260 990 560 1090 Q 820 1170 1120 1030 L 1120 1960 L -40 1960 Z" fill="${gBack}" stroke="${C.ol}" stroke-width="6"/>
    <g><rect x="148" y="1010" width="28" height="160" rx="8" fill="${mixC(C.woodSh, '#0b0f1c', night)}" stroke="${C.ol}" stroke-width="5"/>
      <circle cx="162" cy="${960 + 3 * Math.sin(t * 1.5)}" r="100" fill="${gFront}" stroke="${C.ol}" stroke-width="6"/>
      <circle cx="${140 + (sx > 540 ? 30 : -30)}" cy="${935}" r="58" fill="${gBack}" opacity=".7"/></g>
    <path d="M -40 1300 Q 300 1180 600 1262 Q 860 1325 1120 1235 L 1120 1960 L -40 1960 Z" fill="${gFront}" stroke="${C.ol}" stroke-width="7"/>
    <path d="M 40 1290 Q 300 1200 560 1268" stroke="${mixC(mixC('#7fd88f', '#ffb07a', cl(m - 1)), '#1d2a44', night)}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
    ${tufts}`;
}

function mol(x, y, s, o = {}) {
  const rot = o.rot || 0, sq = o.sq || 0, lx = o.look || 0, ly = o.lookY || 0;
  const col = o.col || '#bfe0ff', sh = o.sh || '#86b4ea';
  let E;
  if (o.eyes === 'closed') E = `<path d="M -52 -14 q 15 12 30 0 M 22 -14 q 15 12 30 0" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  else if (o.eyes === 'squeeze') E = `<path d="M -52 -30 L -24 -14 L -52 2 M 52 -30 L 24 -14 L 52 2" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  else E = `<ellipse cx="${-36 + lx}" cy="${-14 + ly}" rx="14" ry="20" fill="${C.ol}"/><ellipse cx="${36 + lx}" cy="${-14 + ly}" rx="14" ry="20" fill="${C.ol}"/><circle cx="${-31 + lx}" cy="${-22 + ly}" r="5" fill="#fff"/><circle cx="${41 + lx}" cy="${-22 + ly}" r="5" fill="#fff"/>`;
  const M = {
    smile: `<path d="M -18 26 Q 0 42 18 26" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="0" cy="32" rx="16" ry="20" fill="${C.ol}"/><ellipse cx="0" cy="42" rx="9" ry="6" fill="#ff8fa8"/>`,
    flat: `<path d="M -14 30 L 14 30" stroke="${C.ol}" stroke-width="7" stroke-linecap="round"/>`,
    grin: `<path d="M -24 22 Q 0 52 24 22 Z" fill="${C.ol}"/>`,
  }[o.mouth || 'smile'];
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + sq)} ${s * (1 - sq)})">
    ${o.noGlow ? '' : `<ellipse cx="0" cy="0" rx="200" ry="120" fill="#7fc4ff" opacity=".35" filter="url(#blur20)"/>`}
    <circle cx="-78" cy="0" r="104" fill="${C.ol}" stroke="${C.ol}" stroke-width="14"/><circle cx="78" cy="0" r="104" fill="${C.ol}" stroke="${C.ol}" stroke-width="14"/>
    <circle cx="-78" cy="0" r="104" fill="${col}"/><circle cx="78" cy="0" r="104" fill="${col}"/>
    <path d="M -168 40 A 100 100 0 0 0 -40 92 M 168 40 A 100 100 0 0 1 40 92" stroke="${sh}" stroke-width="20" fill="none" stroke-linecap="round" opacity=".85"/>
    <ellipse cx="-118" cy="-52" rx="24" ry="14" transform="rotate(-30 -118 -52)" fill="#fff" opacity=".8"/><ellipse cx="40" cy="-60" rx="20" ry="11" transform="rotate(-20 40 -60)" fill="#fff" opacity=".7"/>
    ${E}<ellipse cx="-66" cy="16" rx="14" ry="8" fill="#ff9fb4" opacity=".6"/><ellipse cx="66" cy="16" rx="14" ry="8" fill="#ff9fb4" opacity=".6"/>${M}
  </g>`;
}

function mini(x, y, r, rot, col) {
  const dx = Math.cos(rot) * r * .75, dy = Math.sin(rot) * r * .75;
  return `<circle cx="${x - dx}" cy="${y - dy}" r="${r}" fill="${col}" stroke="${C.ol}" stroke-width="3"/><circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="${col}" stroke="${C.ol}" stroke-width="3"/>`;
}

function waveD(x0, y0, ang, len, wl, amp, ph) {
  if (len <= 2) return '';
  const c = Math.cos(ang), s = Math.sin(ang);
  let d = '';
  const n = Math.max(2, Math.ceil(len / 8));
  for (let k = 0; k <= n; k++) {
    const u = len * k / n, w = amp * Math.sin(2 * Math.PI * u / wl + ph);
    d += `${k ? 'L' : 'M'} ${(x0 + c * u - s * w).toFixed(1)} ${(y0 + s * u + c * w).toFixed(1)} `;
  }
  return d;
}

/* ---------- S1: Warum ist der Himmel blau? ---------- */
function s1(t) {
  const up = eout(prog(t, .8, 1.15));
  const think = back(prog(t, 1.18, 1.45));
  const toSun = eio(prog(t, 2.1, 2.35));
  const flash = ein(prog(t, 2.3, 2.74));
  const look = lerp(lerp(-12, 0, up), 15, toSun), lookY = lerp(lerp(8, -16, up), -14, toSun);
  const q = back(prog(t, 1.44, 1.72)) * (1 - eio(prog(t, 2.1, 2.3)));
  const gy = 1090 - 10 * Math.sin(t * 2.6);
  return `${hillSet(t, { id: 'h1', m: 1, sun: [850, 300], sunR: 90 + 30 * toSun })}
    <ellipse cx="540" cy="1292" rx="${150 - 6 * Math.sin(t * 2.6)}" ry="22" fill="#000" opacity=".22"/>
    ${ghostX(540, gy, 1.25, { t, look, lookY, tilt: 12 * think * (1 - toSun) - 6 * toSun, aL: 28 + 50 * think * (1 - toSun), aR: -28, mouth: t > 1.44 ? (flash > .2 ? 'flat' : 'small') : 'smile', brows: t > 1.18 ? 'up' : 'calm', eyes: flash > .35 ? 'closed' : 'n' })}
    ${qmark(790, 690 - 8 * Math.sin(t * 4), q, 12)}
    <circle cx="850" cy="300" r="${200 + 1400 * flash}" fill="#fffbe8" opacity="${.5 * toSun + .5 * flash}" filter="url(#blur40)"/>
    <rect x="0" y="0" width="1080" height="1920" fill="#fffbe8" opacity="${flash}"/>`;
}

/* ---------- S2: white sunlight contains all colours ---------- */
function s2(t) {
  const S = [150, 380], P = [540, 862];
  const d = [.6306, .7761];
  const beam = eout(prog(t, 2.92, 3.32));
  const lift = back(prog(t, 4.92, 5.3));
  const placed = t >= 5.3;
  const hitFace = !placed ? 713 : 0;
  const L = placed ? 618 : hitFace * beam;
  const bx = S[0] + d[0] * L, by = S[1] + d[1] * L;
  const squint = t > 3.3 && t < 5.25;
  const flick = t > 3.3 && t < 3.9 ? ring(t, 3.3, 5, 6) : 0;
  let rays = '';
  if (placed) RAYC.forEach((c, i) => {
    const t0 = 5.32 + i * .09, p = eout(prog(t, t0, t0 + .35));
    if (p <= 0) return;
    const ex = 1110, ey = 600 + i * 62;
    const x1 = lerp(568, ex, p), y1 = lerp(866, ey, p);
    rays += `<line x1="568" y1="866" x2="${x1}" y2="${y1}" stroke="${c}" stroke-width="40" opacity=".35" filter="url(#blur8)"/><line x1="568" y1="866" x2="${x1}" y2="${y1}" stroke="${c}" stroke-width="18" stroke-linecap="round"/>`;
    const pp = prog(t, 7.2 + i * .03, 7.62);
    if (pp > 0 && pp < 1) rays += `<circle cx="${lerp(568, ex, pp)}" cy="${lerp(866, ey, pp)}" r="16" fill="#fff"/>`;
  });
  let arcs = '';
  const ad = eio(prog(t, 6.45, 7.05));
  if (ad > 0) RAYC.forEach((c, i) => {
    const r = 820 - i * 38;
    arcs += `<path d="M ${540 - r} 1500 A ${r} ${r} 0 0 1 ${540 + r} 1500" stroke="${c}" stroke-width="40" fill="none" opacity=".5" pathLength="1" stroke-dasharray="${ad} 1"/>`;
  });
  const prX = lerp(780, P[0], lift), prY = lerp(1150, P[1], lift), prS = lerp(.45, 1, cl(lift, 0, 1.2)), prR = lerp(-50, 0, cl(lift));
  const prism = t >= 4.92 ? `<g transform="translate(${prX} ${prY}) rotate(${prR}) scale(${prS})">
      <polygon points="0,-92 96,72 -96,72" fill="#cfefff" fill-opacity=".45" stroke="${C.ol}" stroke-width="8" stroke-linejoin="round"/>
      <polygon points="0,-92 96,72 30,72" fill="#ffffff" fill-opacity=".35"/><path d="M -60 50 L -10 -50" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/></g>` : '';
  const splash = !placed && beam >= 1 ? `<circle cx="${bx}" cy="${by}" r="${50 + 10 * Math.sin(t * 30)}" fill="#fffbe0" opacity=".8" filter="url(#blur8)"/>` : '';
  const fl = 1 - eout(prog(t, 2.74, 2.98));
  const happy = t > 6.45;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#070b16"/>${stars(80, 7)}
    ${arcs}
    <circle cx="${S[0]}" cy="${S[1]}" r="260" fill="#fff3c4" opacity=".3" filter="url(#blur40)"/>
    <circle cx="${S[0]}" cy="${S[1]}" r="120" fill="#fff6d6" stroke="${C.warm}" stroke-width="8"/>
    ${beam > 0 ? `<line x1="${S[0]}" y1="${S[1]}" x2="${bx}" y2="${by}" stroke="#fff" stroke-width="70" opacity=".25" filter="url(#blur8)"/><line x1="${S[0]}" y1="${S[1]}" x2="${bx}" y2="${by}" stroke="#ffffff" stroke-width="30" stroke-linecap="round"/>` : ''}
    ${rays}
    ${ghostX(540 + 6 * flick, 1080 - 8 * Math.sin(t * 2.6), .95, { t, aL: lerp(28, 150, cl(lift)), aR: lerp(-28, -150, cl(lift)), eyes: squint ? 'closed' : 'n', mouth: squint ? 'wavy' : happy ? 'grin' : placed ? 'o' : 'smile', brows: squint ? 'sad' : 'up', look: placed ? 14 : 0, lookY: placed ? -10 : -6, tilt: squint ? -8 : 0 })}
    ${prism}${splash}
    <rect x="0" y="0" width="1080" height="1920" fill="#fffbe8" opacity="${fl}"/>`;
}

/* ---------- S3: light travels and hits tiny air particles ---------- */
const S3M = (() => { const a = []; for (let i = 0; i < 46; i++) { const x = 40 + hash(i + 2) * 1000; const yt = 2700 - Math.sqrt(1960 * 1960 - (x - 540) ** 2), yb = 2700 - Math.sqrt(1600 * 1600 - (x - 540) ** 2); a.push([x, lerp(yt + 30, yb - 30, hash(i + 40)), hash(i + 9) * 6]); } return a; })();
function s3(t) {
  const I = [400, 930];
  const tr = eio(prog(t, 7.66, 8.68));
  const A = [-60, -40];
  const hx = lerp(A[0], I[0], tr), hy = lerp(A[1], I[1], tr);
  const ang = Math.atan2(I[1] - A[1], I[0] - A[0]);
  const hit = t >= 8.68;
  const lens = back(prog(t, 9.46, 9.78));
  const zoom = ein(prog(t, 10.75, 11.28));
  const LC = [640, 860];
  let ms = '';
  S3M.forEach(([x, y, r], i) => {
    const dist = Math.hypot(x - I[0], y - I[1]);
    const j = hit ? 14 * ring(t, 8.68 + dist / 1800, 4, 4) : 0;
    ms += mini(x + j, y + 2 * Math.sin(t * 3 + i), 14, r + t * .5, '#cfe3ff');
  });
  let bundle = '';
  if (!hit || t < 8.8) {
    const tl = 300 * cl(tr * 3);
    for (let k = -3; k <= 3; k++) {
      const ox = -Math.sin(ang) * k * 11, oy = Math.cos(ang) * k * 11;
      bundle += `<line x1="${hx - Math.cos(ang) * tl + ox}" y1="${hy - Math.sin(ang) * tl + oy}" x2="${hx + ox}" y2="${hy + oy}" stroke="${RAYC[k + 3]}" stroke-width="11" stroke-linecap="round" opacity=".9"/>`;
    }
    bundle = `<line x1="${hx - Math.cos(ang) * tl}" y1="${hy - Math.sin(ang) * tl}" x2="${hx}" y2="${hy}" stroke="#fff" stroke-width="60" opacity=".3" filter="url(#blur8)" stroke-linecap="round"/>${bundle}<circle cx="${hx}" cy="${hy}" r="22" fill="#fff"/>`;
  }
  let spark = '';
  if (hit) {
    const p = prog(t, 8.68, 9.1);
    if (p < 1) spark += `<circle cx="${I[0]}" cy="${I[1]}" r="${30 + 160 * p}" fill="none" stroke="#fff" stroke-width="${10 * (1 - p)}"/>`;
    for (let k = 0; k < 9; k++) {
      const a = k / 9 * Math.PI * 2 + .3, dd = 40 + 520 * eout(prog(t, 8.7, 9.9));
      const op = 1 - prog(t, 9.6, 10.2);
      if (op > 0) spark += `<circle cx="${I[0] + Math.cos(a) * dd}" cy="${I[1] + Math.sin(a) * dd * .8}" r="11" fill="#5fb8ff" opacity="${op}"/>`;
    }
  }
  let lensG = '';
  if (lens > 0) {
    const bounce = t > 9.88 ? 1 + .1 * ring(t, 9.88, 3, 5) : 1;
    lensG = `<g transform="translate(${LC[0]} ${LC[1]}) scale(${lens * (1 + 7 * zoom)}) rotate(${-10 * (1 - lens)})">
      <line x1="150" y1="150" x2="270" y2="270" stroke="#2b2f3d" stroke-width="44" stroke-linecap="round"/><line x1="150" y1="150" x2="270" y2="270" stroke="#4b5266" stroke-width="20" stroke-linecap="round"/>
      <clipPath id="s3ln"><circle cx="0" cy="0" r="200"/></clipPath><circle cx="0" cy="0" r="200" fill="#2a5aa8"/>
      <g clip-path="url(#s3ln)"><rect x="-200" y="-200" width="400" height="400" fill="#3f7fe0" opacity=".5"/>${mol(0, 10 * Math.sin(t * 3), .72 * bounce, { t, look: 6 * Math.sin(t * 2), mouth: t > 9.88 ? 'grin' : 'smile', rot: 6 * Math.sin(t * 1.7) })}</g>
      <circle cx="0" cy="0" r="200" fill="none" stroke="#c9d2e6" stroke-width="22"/><circle cx="0" cy="0" r="211" fill="none" stroke="${C.ol}" stroke-width="6"/>
      <path d="M -130 -110 Q -90 -160 -30 -175" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".6"/></g>`;
  }
  return `<rect x="0" y="0" width="1080" height="1920" fill="#060a18"/>${stars(90, 13)}
    <circle cx="540" cy="2700" r="1990" fill="#5aa9ff" opacity=".18" filter="url(#blur20)"/>
    <circle cx="540" cy="2700" r="1960" fill="#3f7fe0" opacity=".32"/>
    <circle cx="540" cy="2700" r="1780" fill="#5aa9ff" opacity=".14"/>
    <circle cx="540" cy="2700" r="1600" fill="#2f6fd6"/>
    <clipPath id="s3e"><circle cx="540" cy="2700" r="1600"/></clipPath>
    <g clip-path="url(#s3e)"><path d="M 120 1080 Q 260 1150 420 1120 Q 520 1200 470 1320 Q 300 1400 150 1330 Q 40 1220 120 1080 Z" fill="#4caf7a" stroke="#2e7d55" stroke-width="7"/><path d="M 720 1090 Q 900 1060 1040 1150 Q 1000 1260 860 1250 Q 760 1300 700 1210 Z" fill="#4caf7a" stroke="#2e7d55" stroke-width="7"/>
      <ellipse cx="540" cy="1250" rx="700" ry="120" fill="#000" opacity="0"/></g>
    <circle cx="540" cy="2700" r="1600" fill="none" stroke="${C.ol}" stroke-width="8"/>
    <path d="M -100 1150 Q 540 1060 1180 1150" stroke="#9fd0ff" stroke-width="10" fill="none" opacity=".5"/>
    ${ms}${spark}${bundle}${lensG}`;
}

/* ---------- S4: blue scattered much more than red ---------- */
const BURSTS = [12.4, 12.92, 13.6, 13.78, 14.16];
function s4(t) {
  const M = [540, 800];
  const bh = lerp(-60, 300, eout(prog(t, 11.28, 11.98)));
  const bt = lerp(-60, 300, eio(prog(t, 14.25, 14.65)));
  const ph = -t * 14;
  let blue = '';
  if (t < 14.65) blue = `<path d="${waveD(bt, M[1], 0, bh - bt, 70, 36, ph)}" stroke="#3fa9ff" stroke-width="30" fill="none" opacity=".35" filter="url(#blur8)"/><path d="${waveD(bt, M[1], 0, bh - bt, 70, 36, ph)}" stroke="#4fb4ff" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  let scat = '', sq = 0;
  BURSTS.forEach((t0, b) => {
    if (t < t0) return;
    sq += .14 * ring(t, t0, 3.5, 6);
    for (let k = 0; k < 10; k++) {
      const a = k / 10 * Math.PI * 2 + b * .31;
      const dd = 250 + (t - t0) * 900;
      if (dd > 1300) continue;
      const len = Math.min(140, (t - t0) * 900);
      scat += `<path d="${waveD(M[0] + Math.cos(a) * (dd - len), M[1] + Math.sin(a) * (dd - len), a, len, 46, 16, ph)}" stroke="#4fb4ff" stroke-width="11" fill="none" stroke-linecap="round" opacity="${1 - cl((dd - 800) / 500)}"/>`;
    }
  });
  const hit = t >= 11.98 && t < 12.3;
  if (t >= 11.98) sq += .16 * ring(t, 11.98, 3, 5);
  const rh = lerp(-60, 1140, prog(t, 14.55, 15.45)), rt = lerp(-60, 1140, prog(t, 15.15, 15.8));
  let red = '';
  if (t > 14.55 && rh - rt > 2) red = `<path d="${waveD(rt, M[1] + 10, 0, rh - rt, 260, 46, -t * 7)}" stroke="#ff5468" stroke-width="30" fill="none" opacity=".3" filter="url(#blur8)"/><path d="${waveD(rt, M[1] + 10, 0, rh - rt, 260, 46, -t * 7)}" stroke="#ff6274" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  const sneeze = BURSTS.some(t0 => t >= t0 - .12 && t < t0 + .14);
  const redPhase = t > 14.6;
  const look = redPhase ? cl((rh - 540) / 25, -14, 14) : (t < 11.95 ? -12 : 0);
  let bg = '';
  for (let i = 0; i < 22; i++) bg += mini(hash(i + 30) * 1080, 140 + hash(i + 60) * 1200, 9, i + t * .3, '#2c4a86');
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0d1a3c"/>
    <circle cx="540" cy="800" r="700" fill="#2b5bb0" opacity=".25" filter="url(#blur40)"/>${bg}
    ${blue}${scat}
    ${mol(M[0], M[1] + 8 * Math.sin(t * 2.4), 1.5, { t, sq, eyes: hit || sneeze ? 'squeeze' : 'n', mouth: hit || sneeze ? 'o' : redPhase ? 'flat' : 'smile', look, lookY: redPhase ? 0 : 0, rot: redPhase ? 0 : 4 * Math.sin(t * 2) })}
    ${red}`;
}

/* ---------- S5: blue light from every direction into the eyes ---------- */
const S5M = [[130, 330], [330, 170], [560, 250], [760, 150], [960, 420], [250, 560], [470, 470], [700, 560], [900, 700], [100, 800], [380, 760], [640, 380], [820, 850], [220, 980]];
function s5(t) {
  const m = lerp(.25, 1, eio(prog(t, 16.0, 19.0)));
  const G = [540, 1100], gs = 1.2;
  const EY = G[1] - 24;
  let extra = '', ph = '';
  S5M.forEach(([x, y], i) => {
    const t0 = 16.2 + i * .17;
    const lit = prog(t, t0 - .25, t0);
    const fl = t > t0 ? Math.exp(-(t - t0) * 4) : 0;
    const col = t >= t0 ? '#8fd0ff' : '#e6eef8';
    extra += `<g opacity=".95">${t >= t0 - .25 ? `<circle cx="${x}" cy="${y}" r="${30 + 30 * fl}" fill="#5fb8ff" opacity="${.3 + .5 * fl}" filter="url(#blur8)"/>` : ''}${mini(x, y + 4 * Math.sin(t * 3 + i), 13 * (1 + .3 * fl), i + t * .4, col)}</g>`;
    if (lit > 0 && lit < 1) ph += `<line x1="880" y1="230" x2="${lerp(880, x, lit)}" y2="${lerp(230, y, lit)}" stroke="#fff6d6" stroke-width="6" opacity=".7" stroke-linecap="round"/>`;
    const p = eio(prog(t, t0, t0 + .55));
    if (p > 0 && p < 1) {
      const tx = 540 + (x < 540 ? -46 : 46);
      const px = lerp(x, tx, p), py = lerp(y, EY, p), qx = lerp(x, tx, Math.max(0, p - .18)), qy = lerp(y, EY, Math.max(0, p - .18));
      ph += `<line x1="${qx}" y1="${qy}" x2="${px}" y2="${py}" stroke="#3fa9ff" stroke-width="24" stroke-linecap="round" opacity=".6"/><circle cx="${px}" cy="${py}" r="19" fill="#bfe6ff" stroke="#2b7fe0" stroke-width="5"/>`;
    }
  });
  const arrivals = S5M.map((_, i) => 16.2 + i * .17 + .55);
  const lastHit = arrivals.reduce((mm, a) => t >= a ? a : mm, -9);
  const blink = t - lastHit < .12 ? 1 : 0;
  const joy = back(prog(t, 19.14, 19.42));
  let sparkle = '';
  if (t > 19.14) for (const ex of [-46, 46]) {
    const pp = back(prog(t, 19.14, 19.35));
    sparkle += `<path transform="translate(${540 + ex + 10} ${EY - 18}) scale(${pp * (1 + .15 * Math.sin(t * 14))}) rotate(${t * 90})" d="M 0 -24 L 6 -6 L 24 0 L 6 6 L 0 24 L -6 6 L -24 0 L -6 -6 Z" fill="#bfe6ff"/>`;
  }
  const curPh = S5M.findIndex((_, i) => t >= 16.2 + i * .17 && t < 16.75 + i * .17);
  const look = curPh >= 0 ? cl((S5M[curPh][0] - 540) / 25, -14, 14) : 0;
  return `${hillSet(t, { id: 'h5', m, sun: [880, 230], sunR: 90, extraSky: ph + extra, rays: cl(m) })}
    <ellipse cx="540" cy="1292" rx="150" ry="22" fill="#000" opacity=".22"/>
    ${ghostX(G[0], G[1] - 8 * Math.sin(t * 2.6), gs, { t, look: t > 19.14 ? 0 : look, lookY: -14, eyes: 'n', eyeS: blink && t < 19.1 ? 1.25 : 1, mouth: t > 19.14 ? 'grin' : 'small', brows: t > 19.14 ? 'calm' : 'up', aL: 28 + 122 * joy, aR: -28 - 122 * joy })}
    ${sparkle}
    <rect x="0" y="0" width="1080" height="1920" fill="#fff" opacity="${(1 - eout(prog(t, 15.8, 16.0))) * .6}"/>`;
}

/* ---------- S6a: sunset ---------- */
function s6a(t) {
  const p = eio(prog(t, 19.85, 21.4));
  const m = lerp(1, 2, p);
  const sx = lerp(880, 900, p), sy = lerp(230, 1060, p);
  const turn = eout(prog(t, 19.9, 20.25));
  const q = back(prog(t, 20.4, 20.68));
  return `${hillSet(t, { id: 'h6', m, sun: [sx, sy], sunR: lerp(90, 130, p) })}
    <ellipse cx="540" cy="1292" rx="150" ry="22" fill="#000" opacity=".22"/>
    ${ghostX(540, 1100 - 8 * Math.sin(t * 2.6), 1.2, { t, look: 15 * turn, lookY: lerp(-14, lerp(-14, 6, p), turn), tilt: -10 * q, mouth: t > 20.1 ? 'o' : 'grin', brows: 'up', aL: 28, aR: -28 })}
    <ellipse cx="560" cy="1060" rx="200" ry="240" fill="#ff8a4c" opacity="${.18 * p}"/>
    ${qmark(300, 720 - 8 * Math.sin(t * 4), q, -12)}`;
}

/* ---------- S6b: the long path at sunset ---------- */
const EC = [540, 2650], ER = 1700, AR = 2000;
const GS = [260, EC[1] - Math.sqrt(ER * ER - 280 * 280)];
const SUNP = [1040, 680];
const PATHM = [[860, 765, 0], [710, 805, 1], [560, 845, 2], [430, 875, 3]];
function s6b(t) {
  const nrm = [(GS[0] - EC[0]) / ER, (GS[1] - EC[1]) / ER];
  const tilt = Math.atan2(nrm[0], -nrm[1]) * 180 / Math.PI;
  const gx = GS[0] + nrm[0] * 85, gy = GS[1] + nrm[1] * 85;
  const noonA = [EC[0] + nrm[0] * (AR + 10), EC[1] + nrm[1] * (AR + 10)];
  const nd = back(prog(t, 21.6, 21.9));
  const ld = back(prog(t, 22.0, 22.5));
  const end = [gx + 50, gy - 20];
  const ruler = (A, B, p, col, w) => {
    if (p <= 0) return '';
    const x = lerp(A[0], B[0], p), y = lerp(A[1], B[1], p);
    const a = Math.atan2(B[1] - A[1], B[0] - A[0]), nx = -Math.sin(a) * 26, ny = Math.cos(a) * 26;
    return `<line x1="${A[0]}" y1="${A[1]}" x2="${x}" y2="${y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="26 18"/>
      <line x1="${A[0] - nx}" y1="${A[1] - ny}" x2="${A[0] + nx}" y2="${A[1] + ny}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
      <line x1="${x - nx}" y1="${y - ny}" x2="${x + nx}" y2="${y + ny}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  const u = eio(prog(t, 22.8, 24.3));
  const PK = [lerp(SUNP[0] - 60, end[0], u), lerp(SUNP[1] + 20, end[1], u)];
  const DOTS = [['#b35cff', 23.1], ['#3fa9ff', 23.5], ['#5fb8ff', 23.86], ['#ffe14d', 99], ['#ff9a3c', 99], ['#ff4b5c', 99]];
  let pk = '';
  if (t > 22.8) DOTS.forEach(([c, tl], i) => {
    const a = i / 6 * Math.PI * 2 + t * 6, r = 34;
    let x = PK[0] + Math.cos(a) * r, y = PK[1] + Math.sin(a) * r;
    if (t > tl) {
      const dt = t - tl, ang = -Math.PI / 2 + (i - 1) * .9;
      const ux = eio(prog(tl, 22.8, 24.3));
      const ox = lerp(SUNP[0] - 60, end[0], ux), oy = lerp(SUNP[1] + 20, end[1], ux);
      x = ox + Math.cos(ang) * 700 * dt; y = oy + Math.sin(ang) * 700 * dt + 200 * dt * dt;
      if (dt < .35) pk += `<circle cx="${ox}" cy="${oy}" r="${20 + 120 * dt / .35}" fill="none" stroke="#5fb8ff" stroke-width="${8 * (1 - dt / .35)}"/>`;
      pk += `<line x1="${x - Math.cos(ang) * 60}" y1="${y - Math.sin(ang) * 60}" x2="${x}" y2="${y}" stroke="${c}" stroke-width="10" opacity=".5" stroke-linecap="round"/>`;
    }
    pk += `<circle cx="${x}" cy="${y}" r="22" fill="${c}" stroke="${C.ol}" stroke-width="4"/>`;
  });
  if (t > 22.8 && u < 1) pk = `<circle cx="${PK[0]}" cy="${PK[1]}" r="60" fill="#ffd9a0" opacity=".35" filter="url(#blur8)"/>` + pk;
  let ms = '';
  PATHM.forEach(([x, y, k]) => {
    const tl = [23.1, 23.5, 23.86, 99][k];
    const j = t > tl ? 14 * ring(t, tl, 4, 5) : 0;
    ms += mini(x + j, y + 3 * Math.sin(t * 3 + k), 20, k + t * .5, '#cfe3ff');
  });
  for (let i = 0; i < 18; i++) {
    const x = 60 + hash(i + 70) * 960;
    const yb = EC[1] - Math.sqrt(Math.max(0, ER * ER - (x - 540) ** 2)), yt = EC[1] - Math.sqrt(Math.max(0, AR * AR - (x - 540) ** 2));
    ms += mini(x, lerp(yt + 25, yb - 25, hash(i + 90)), 11, i, '#8fb8e8');
  }
  const lit = eout(prog(t, 24.2, 24.5));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#070b16"/>${stars(80, 17)}
    <circle cx="${EC[0]}" cy="${EC[1]}" r="${AR}" fill="#3f7fe0" opacity=".3"/>
    <circle cx="${EC[0]}" cy="${EC[1]}" r="${AR}" fill="none" stroke="#7fc4ff" stroke-width="6" opacity=".6"/>
    <circle cx="${SUNP[0]}" cy="${SUNP[1]}" r="200" fill="#ff9a4c" opacity=".35" filter="url(#blur40)"/>
    <circle cx="${SUNP[0]}" cy="${SUNP[1]}" r="85" fill="#ffb15c" stroke="#c2452e" stroke-width="7"/>
    <circle cx="${EC[0]}" cy="${EC[1]}" r="${ER}" fill="#2f6fd6" stroke="${C.ol}" stroke-width="8"/>
    <clipPath id="s6e"><circle cx="${EC[0]}" cy="${EC[1]}" r="${ER}"/></clipPath><g clip-path="url(#s6e)"><path d="M 420 930 Q 620 900 820 950 Q 880 1070 720 1110 Q 540 1130 420 1050 Z" fill="#4caf7a" stroke="#2e7d55" stroke-width="7"/></g>
    ${nd > 0 ? `<g opacity="${.75 * cl(nd)}"><circle cx="${noonA[0] + nrm[0] * 300}" cy="${noonA[1] + nrm[1] * 300}" r="70" fill="none" stroke="#fff6d6" stroke-width="7" stroke-dasharray="18 12"/><circle cx="${noonA[0] + nrm[0] * 300}" cy="${noonA[1] + nrm[1] * 300}" r="46" fill="#ffe9a8" opacity=".8"/></g>` : ''}
    ${ms}
    ${ruler(noonA, [GS[0] + nrm[0] * 175, GS[1] + nrm[1] * 175], nd, '#e9f0ff', 9)}
    ${ruler([SUNP[0] - 60, SUNP[1] + 20], end, ld, C.warm, 10)}
    ${pk}
    ${lit > 0 ? `<circle cx="${gx}" cy="${gy}" r="${180 * lit}" fill="#ff8a4c" opacity=".35" filter="url(#blur20)"/>` : ''}
    ${ghostX(gx, gy - 5 * Math.sin(t * 3), .6, { t, tilt, look: 14, lookY: -4, mouth: lit > 0 ? 'grin' : 'small', brows: lit > 0 ? 'calm' : 'up', aL: 28 + 120 * lit, aR: -28 - 120 * lit })}`;
}

/* ---------- S7: ending ---------- */
function s7(t) {
  const p = eio(prog(t, 24.65, 25.55));
  const m = lerp(2, 2.85, p);
  const sy = lerp(1060, 1290, eio(prog(t, 24.6, 25.3)));
  const yawn = t > 24.85 && t < 25.3;
  const sleep = t >= 25.3;
  const tw = back(prog(t, 25.45, 25.65));
  return `${hillSet(t, { id: 'h7', m, sun: [900, sy], sunR: 130 })}
    <ellipse cx="540" cy="1292" rx="150" ry="22" fill="#000" opacity=".22"/>
    ${ghostX(540, 1100 - 8 * Math.sin(t * 2.6) + 10 * eio(prog(t, 25.3, 25.7)), 1.2, { t, look: sleep ? 0 : 10, lookY: 4, eyes: sleep || yawn ? 'closed' : 'n', mouth: yawn ? 'o' : 'smile', st: yawn ? 1.08 : 1, brows: 'calm', aL: yawn ? 150 : 28, aR: yawn ? -150 : -28, tilt: sleep ? 8 : 0 })}
    <ellipse cx="560" cy="1060" rx="200" ry="240" fill="#ff8a4c" opacity="${.18 * (1 - p)}"/>
    ${tw > 0 ? `<path transform="translate(800 330) scale(${tw * 1.6}) rotate(${t * 40})" d="M 0 -24 L 6 -6 L 24 0 L 6 6 L 0 24 L -6 6 L -24 0 L -6 -6 Z" fill="#fff6d6"/>` : ''}`;
}

const SHOTS = [[0, 2.74, s1], [2.74, 7.66, s2], [7.66, 11.28, s3], [11.28, 15.8, s4], [15.8, 19.78, s5], [19.78, 21.52, s6a], [21.52, 24.6, s6b], [24.6, 999, s7]];
function scene(t) {
  let f = SHOTS[SHOTS.length - 1][2];
  for (const [a, b, fn] of SHOTS) if (t >= a && t < b) { f = fn; break; }
  return f(t);
}

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
