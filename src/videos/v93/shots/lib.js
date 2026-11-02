// v93 kit — style "đầu tròn đen" at the reference2 quality bar (prompts/styles/dau-tron-den/reference2.svg):
// big characters (medium r≈155, close-up r≈280), three layers (blurred detailed set / sharp people / sharp foreground),
// one light source per set, vignette, camera always moving.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff', red: '#d9493f', blue: '#3f8fd8',
  du: '#2fa59a', duSh: '#268b82', duStr: '#e9f7f4',
};
const INK = K.ink;
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
export const op = a => f1(cl(a) * 100) / 100;
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .3) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .38) => t < t0 ? 0 : back(prog(t, t0, t0 + d), 1.7);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += .28; else if ('.,:;!?„“"\'’|'.includes(ch)) w += .3;
    else if ('ilIjf'.includes(ch)) w += .3; else if ('mwMW'.includes(ch)) w += .9;
    else if (ch >= 'A' && ch <= 'Z' || 'ÄÖÜ'.includes(ch)) w += .74; else w += .6;
  }
  return w * size;
}
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || K.txt}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${op(o.op)}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 12}" paint-order="stroke" stroke-linejoin="round"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}">${esc(s)}</text>`;

// ---------- frame: shared defs + vignette ----------
const LG = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c ? `<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>` : `<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;
const RG = (id, col, a = .5) => `<radialGradient id="${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${col}" stop-opacity="${a}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`;
const DEFS93 = `<defs><filter id="v93bg" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="3.5"/></filter>` +
  `<filter id="v93bgx" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="7"/></filter>` +
  `<filter id="v93soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>` +
  `<filter id="v93glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>` +
  LG('v93wPlat', '#5d6f86', '#8796a8', '#9aa3ad') + LG('v93wTrain', '#9fb3c8', '#c6d3df', '#aebdcc') + LG('v93wOff', '#e9e1d2', '#f1eadf', '#d8cdbb') +
  LG('v93wSup', '#e8ecef', '#dfe5e8', '#c8d0d6') + LG('v93wStr', '#0d1226', '#1a2140', '#232a4a') + LG('v93wBed', '#1f2140', '#2c2b4c', '#3a3350') +
  LG('v93fWood', '#9a6a48', '#6e4a34') + LG('v93fTile', '#b9bec4', '#8e959d') + LG('v93fRoad', '#1c2236', '#0b0f1c') + LG('v93fBed', '#4a3a48', '#2b2230') +
  LG('v93skyDay', '#8fc4ec', '#d8ecf8') + LG('v93skyMorn', '#f6c27a', '#ffe6b8') + LG('v93skyNight', '#0f1433', '#2a3366') + LG('v93skyCold', '#7f97b5', '#c3d2e2') +
  RG('v93warm', '#ffd98a', .55) + RG('v93cool', '#cfe6ff', .5) + RG('v93white', '#ffffff', .55) + RG('v93orange', '#ff9a3c', .6) + RG('v93red', '#ff4a3a', .6) + RG('v93sun', '#ffcf7a', .65) +
  `<radialGradient id="v93vig" cx="50%" cy="46%" r="74%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>`;
export function frame(body, o = {}) {
  return `${DEFS93}${body}${o.tint ? `<rect width="1080" height="1920" fill="${o.tint[0]}" opacity="${op(o.tint[1])}"/>` : ''}<rect width="1080" height="1920" fill="url(#v93vig)"/>`;
}
export const cam = (body, cx, cy, sc, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
export const pool = (x, y, rx, ry, g = 'v93warm', a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#${g})" opacity="${op(a)}"/>`;
export const shadow = (x, y, rx = 170, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y + 6)}" rx="${f1(rx)}" ry="${f1(rx * .15)}" fill="#000" opacity="${op(.3 * a)}" filter="url(#v93soft)"/>`;
const blurG = (s, heavy) => `<g filter="url(#${heavy ? 'v93bgx' : 'v93bg'})">${s}</g>`;

// ---------- detailed sets (far layer, blurred) ----------
// every set: >= 8 recognisable props, gradient wall + floor, one light source
export function setPlatform(t, o = {}) {
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wPlat)"/>`;
  // canopy roof + beams
  s += `<path d="M -80 120 L 1160 120 L 1160 230 L -80 300 Z" fill="#3f4a5c"/><g stroke="#2e3747" stroke-width="18">${[60, 330, 600, 870].map(x => `<line x1="${x}" y1="120" x2="${x + 40}" y2="300"/>`).join('')}</g>`;
  // skylight band
  s += `<rect x="-80" y="140" width="1240" height="50" fill="#d9e8f5" opacity=".7"/>`;
  // pillars
  s += `<g fill="#4c586b">${[150, 900].map(x => `<rect x="${x - 26}" y="240" width="52" height="900"/>`).join('')}</g>`;
  // departure board on the left pillar
  s += `<rect x="40" y="380" width="230" height="150" rx="8" fill="#16213a" stroke="#0c1222" stroke-width="6"/><g fill="#ffd24a">${[0, 1, 2].map(i => `<rect x="58" y="${402 + i * 42}" width="${60 + (i * 37) % 60}" height="16" rx="3"/><rect x="${150 + (i * 23) % 20}" y="${402 + i * 42}" width="90" height="16" rx="3" fill="#fff"/>`).join('')}</g>`;
  // station clock
  s += `<circle cx="900" cy="330" r="52" fill="#f4f4f0" stroke="#2a2a2a" stroke-width="8"/><path d="M 900 330 L 900 296 M 900 330 L 926 340" stroke="#222" stroke-width="7" stroke-linecap="round"/><line x1="900" y1="240" x2="900" y2="278" stroke="#2e3747" stroke-width="8"/>`;
  // train waiting at the back (red regional train)
  s += `<rect x="260" y="520" width="900" height="420" rx="40" fill="#c8483f"/><rect x="260" y="560" width="900" height="40" fill="#e6e6e6"/><g fill="#24324a">${[300, 470, 640, 810, 980].map(x => `<rect x="${x}" y="640" width="130" height="120" rx="14"/>`).join('')}</g><rect x="560" y="620" width="70" height="290" rx="8" fill="#9b342d"/><rect x="260" y="880" width="900" height="30" fill="#7c2a24"/>`;
  // posters + bench + bin + sign
  s += `<rect x="40" y="620" width="200" height="270" rx="6" fill="#f2efe6"/><rect x="56" y="636" width="168" height="150" fill="#f0a75b"/><rect x="56" y="800" width="120" height="16" fill="#555"/><rect x="56" y="828" width="90" height="12" fill="#888"/>`;
  s += `<rect x="70" y="1000" width="260" height="22" rx="8" fill="#6e7d91"/><rect x="70" y="940" width="260" height="20" rx="8" fill="#6e7d91"/><g fill="#3d4757"><rect x="90" y="1020" width="14" height="80"/><rect x="296" y="1020" width="14" height="80"/></g>`;
  s += `<rect x="960" y="960" width="70" height="120" rx="12" fill="#3c6b4f"/><rect x="955" y="952" width="80" height="18" rx="6" fill="#2d523c"/>`;
  s += `<rect x="760" y="420" width="96" height="60" rx="8" fill="#1f5fae"/><text x="808" y="465" font-family="Inter" font-size="44" font-weight="900" fill="#fff" text-anchor="middle" style="font-family:'Inter';font-weight:900">S</text>`;
  // platform floor
  s += `<rect x="-80" y="1080" width="1240" height="900" fill="url(#v93fTile)"/><g stroke="#a3a9b0" stroke-width="3">${[1160, 1270, 1400, 1560].map(y => `<line x1="-80" y1="${y}" x2="1160" y2="${y}"/>`).join('')}</g>`;
  s = blurG(s, o.heavy);
  s += pool(540, 200, 760, 520, 'v93cool', .9);
  return s;
}

export function setTrain(t, o = {}) {
  const morning = !!o.morning, scroll = (o.scroll === undefined ? t * 260 : o.scroll);
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wTrain)"/>`;
  if (morning) s += `<rect x="-80" y="-80" width="1240" height="2080" fill="#f4c27a" opacity=".22"/>`;
  // ceiling + light strip
  s += `<rect x="-80" y="-80" width="1240" height="260" fill="#d5dde6"/><rect x="-80" y="150" width="1240" height="26" fill="#f6fbff"/>`;
  // ads above windows
  s += `<g>${[0, 1, 2, 3].map(i => `<rect x="${-30 + i * 290}" y="200" width="250" height="110" rx="8" fill="${['#f0b45c', '#7fb3d9', '#e88a7d', '#9cc79a'][i]}"/><rect x="${-10 + i * 290}" y="225" width="${120 + i * 15}" height="18" rx="4" fill="#fff" opacity=".85"/><rect x="${-10 + i * 290}" y="255" width="90" height="14" rx="4" fill="#fff" opacity=".6"/>`).join('')}</g>`;
  // windows with moving city
  const sky = morning ? 'url(#v93skyMorn)' : 'url(#v93skyCold)';
  let city = '';
  for (let i = 0; i < 14; i++) {
    const w = 90 + hash(i * 3.1) * 90, h = 160 + hash(i * 7.7) * 230;
    let x = ((i * 150 - scroll) % 2100 + 2100) % 2100 - 300;
    city += `<rect x="${f1(x)}" y="${f1(720 - h)}" width="${f1(w)}" height="${f1(h)}" fill="${morning ? '#c98d63' : '#5d7190'}"/>`;
    for (let k = 0; k < 3; k++) city += `<rect x="${f1(x + 16 + k * 26)}" y="${f1(740 - h + 20)}" width="14" height="18" fill="${morning ? '#ffe2a8' : '#c7d6e6'}"/>`;
  }
  // poles flying by outside
  for (let i = 0; i < 4; i++) { const x = ((i * 560 - scroll * 2.4) % 2240 + 2240) % 2240 - 300; city += `<rect x="${f1(x)}" y="340" width="22" height="420" fill="${morning ? '#7a5038' : '#3c4a60'}"/>`; }
  s += `<clipPath id="v93win"><rect x="-40" y="360" width="460" height="380" rx="30"/><rect x="520" y="360" width="460" height="380" rx="30"/></clipPath>`;
  s += `<g clip-path="url(#v93win)"><rect x="-80" y="340" width="1240" height="420" fill="${sky}"/>${morning ? `<circle cx="880" cy="440" r="60" fill="#fff3cf"/>` : ''}${city}</g>`;
  s += `<g fill="none" stroke="#e4e9ef" stroke-width="22"><rect x="-40" y="360" width="460" height="380" rx="30"/><rect x="520" y="360" width="460" height="380" rx="30"/></g>`;
  // seats under windows
  s += `<g>${[-20, 230, 540, 790].map(x => `<rect x="${x}" y="800" width="230" height="230" rx="34" fill="#2f5d8f"/><rect x="${x + 10}" y="980" width="210" height="90" rx="20" fill="#244c78"/><g fill="#3d6ea3">${[0, 1, 2].map(k => `<circle cx="${x + 50 + k * 60}" cy="${860 + (k % 2) * 40}" r="8"/>`).join('')}</g>`).join('')}</g>`;
  // overhead luggage rack + hanging straps (far)
  s += `<rect x="-80" y="330" width="1240" height="14" fill="#9aa6b2"/><g stroke="#8995a2" stroke-width="6">${[60, 200, 340, 620, 760, 900].map(x => `<line x1="${x}" y1="176" x2="${x}" y2="260"/>`).join('')}</g><g fill="none" stroke="#e7c34a" stroke-width="9">${[60, 200, 340, 620, 760, 900].map(x => `<circle cx="${x}" cy="280" r="20"/>`).join('')}</g>`;
  // route map strip + door
  s += `<rect x="440" y="360" width="60" height="700" rx="8" fill="#b9c4cf"/><rect x="450" y="400" width="40" height="200" rx="4" fill="#26303e"/><g fill="#ffd24a">${[0, 1, 2, 3].map(k => `<circle cx="470" cy="${420 + k * 50}" r="7"/>`).join('')}</g>`;
  // yellow vertical poles (far)
  s += `<g fill="#e5be3b">${[300, 700].map(x => `<rect x="${x - 9}" y="176" width="18" height="1000"/>`).join('')}</g>`;
  // floor
  s += `<rect x="-80" y="1080" width="1240" height="900" fill="${morning ? '#8c7a6a' : '#6d7887'}"/><rect x="-80" y="1080" width="1240" height="24" fill="${morning ? '#a39080' : '#7f8a98'}"/><g stroke="#000" stroke-opacity=".08" stroke-width="4">${[1180, 1320, 1500].map(y => `<line x1="-80" y1="${y}" x2="1160" y2="${y}"/>`).join('')}</g>`;
  s = blurG(s, o.heavy);
  s += morning ? pool(880, 520, 760, 820, 'v93sun', 1) : pool(540, 160, 820, 520, 'v93cool', .9);
  return s;
}
// sharp foreground in the train: a pole at screen edge and a strap at top
export function trainFG(x = 1010, o = {}) {
  return `<rect x="${x - 22}" y="-40" width="44" height="2000" fill="#e8c23e" stroke="${INK}" stroke-width="5"/><rect x="${x - 10}" y="-40" width="10" height="2000" fill="#fff3b0" opacity=".6"/>` +
    (o.strap === false ? '' : strap(o.hand || [o.sx || 120, 160]));
}
// hanging strap whose handle sits around the hand point [hx, hy] (the strap swings with the hand)
export function strap([hx, hy], top = -40) {
  const tx = hx * .85 + 80;
  return `<line x1="${f1(tx)}" y1="${top}" x2="${f1(hx)}" y2="${f1(hy - 40)}" stroke="#6c7480" stroke-width="10"/><path d="M ${f1(hx - 40)} ${f1(hy - 40)} h 80 l -12 70 h -56 z" fill="none" stroke="#e8c23e" stroke-width="14" stroke-linejoin="round"/><path d="M ${f1(hx - 40)} ${f1(hy - 40)} h 80 l -12 70 h -56 z" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round" opacity=".6"/>`;
}

export function setOffice(t, o = {}) {
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wOff)"/>`;
  // big window with daytime city
  s += `<rect x="520" y="260" width="520" height="620" rx="8" fill="url(#v93skyDay)"/><g fill="#9fb6c8">${[[540, 620, 110, 260], [660, 560, 90, 320], [760, 640, 130, 240], [900, 580, 110, 300]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g><g fill="#e3eef6">${[560, 600, 680, 720, 790, 840, 920, 960].map((x, i) => `<rect x="${x}" y="${660 + (i % 3) * 60}" width="16" height="22"/>`).join('')}</g>`;
  s += `<g fill="none" stroke="#f8f5ee" stroke-width="18"><rect x="520" y="260" width="520" height="620" rx="8"/></g><line x1="780" y1="260" x2="780" y2="880" stroke="#f8f5ee" stroke-width="12"/>`;
  // shelves with folders + plant
  s += `<rect x="40" y="300" width="380" height="520" fill="#c9a77f"/><g fill="#a8865f"><rect x="40" y="440" width="380" height="14"/><rect x="40" y="590" width="380" height="14"/></g>`;
  s += `<g>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${62 + i * 40}" y="${340 + (i % 2) * 10}" width="32" height="${100 - (i % 2) * 10}" fill="${['#d9493f', '#3f8fd8', '#f0b45c', '#3c9a5f', '#8e6bb8', '#3f8fd8'][i]}"/>`).join('')}<rect x="320" y="370" width="70" height="70" rx="6" fill="#efe6d4"/>${[0, 1, 2, 3].map(i => `<rect x="${70 + i * 46}" y="${490 + (i % 2) * 8}" width="36" height="${100 - (i % 2) * 8}" fill="${['#efe6d4', '#f0b45c', '#d9493f', '#efe6d4'][i]}"/>`).join('')}<circle cx="340" cy="540" r="46" fill="#4f8a5b"/><rect x="315" y="550" width="50" height="40" fill="#b9714f"/></g>`;
  // whiteboard + clock
  s += `<rect x="60" y="860" width="0" height="0"/><circle cx="700" cy="170" r="50" fill="#fff" stroke="#3a3a3a" stroke-width="8"/><path d="M 700 170 V 136 M 700 170 L 728 182" stroke="#222" stroke-width="6" stroke-linecap="round"/>`;
  s += `<rect x="70" y="120" width="360" height="150" rx="6" fill="#fbfbfa" stroke="#9aa0a6" stroke-width="8"/><path d="M 100 170 h 160 M 100 205 h 220 M 100 240 h 120" stroke="#3f8fd8" stroke-width="7" stroke-linecap="round"/><path d="M 300 160 l 30 40 l 40 -60" stroke="#d9493f" stroke-width="7" fill="none"/>`;
  // back desks with monitors + printer + coffee machine
  s += `<rect x="-60" y="900" width="560" height="40" fill="#b88f68"/><g>${[60, 300].map(x => `<rect x="${x}" y="780" width="150" height="110" rx="8" fill="#2b2f36"/><rect x="${x + 10}" y="790" width="130" height="86" rx="4" fill="#9fc2dd"/><rect x="${x + 66}" y="890" width="18" height="12" fill="#2b2f36"/>`).join('')}</g>`;
  s += `<rect x="880" y="900" width="160" height="130" rx="10" fill="#d4d6d8"/><rect x="900" y="880" width="120" height="30" rx="6" fill="#c2c4c6"/><rect x="560" y="910" width="120" height="150" rx="10" fill="#3a3a3e"/><rect x="590" y="980" width="60" height="40" fill="#e8e1d4"/>`;
  // floor
  s += `<rect x="-80" y="1080" width="1240" height="900" fill="#a9a196"/><rect x="-80" y="1080" width="1240" height="22" fill="#968e83"/>`;
  s += `<rect x="960" y="980" width="70" height="140" rx="10" fill="#7b6a58"/><circle cx="995" cy="930" r="80" fill="#4f8a5b"/><circle cx="960" cy="880" r="50" fill="#5c9a68"/>`;
  s = blurG(s, o.heavy);
  s += pool(800, 560, 720, 760, 'v93white', .9);
  return s;
}
export function officeDesk(y = 1560, o = {}) {
  let s = `<rect x="-40" y="${y}" width="1160" height="420" fill="#c49a6c" stroke="${INK}" stroke-width="5"/><rect x="-40" y="${y}" width="1160" height="24" fill="#d7b285"/>`;
  if (o.keyboard !== false) s += `<rect x="${o.kx || 360}" y="${y - 30}" width="300" height="40" rx="8" fill="#e7e9ec" stroke="${INK}" stroke-width="4"/><g fill="#c7cbd0">${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${(o.kx || 360) + 18 + i * 38}" y="${y - 22}" width="28" height="10" rx="3"/>`).join('')}</g>`;
  if (o.mug !== false) s += `<path d="M ${o.mx || 140} ${y - 90} h 80 l -8 90 h -64 z" fill="#f2efe8" stroke="${INK}" stroke-width="5"/><path d="M ${(o.mx || 140) + 78} ${y - 70} q 34 4 4 46" fill="none" stroke="${INK}" stroke-width="5"/>`;
  if (o.papers !== false) s += `<g transform="rotate(-5 860 ${y})"><rect x="780" y="${y - 22}" width="200" height="30" fill="#fbfaf6" stroke="${INK}" stroke-width="4"/><rect x="790" y="${y - 40}" width="190" height="22" fill="#f3f0e8" stroke="${INK}" stroke-width="4"/></g>`;
  return s;
}

export function setMarket(t, o = {}) {
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wSup)"/>`;
  // ceiling tube lights
  s += `<g fill="#ffffff">${[120, 480, 840].map(x => `<rect x="${x}" y="70" width="240" height="22" rx="8"/>`).join('')}</g><g fill="#b9c2c9">${[120, 480, 840].map(x => `<rect x="${x + 110}" y="-80" width="8" height="150"/>`).join('')}</g>`;
  // "KASSE 2" sign
  s += `<rect x="640" y="150" width="210" height="80" rx="10" fill="#2f6fd6"/><text x="745" y="205" font-family="Inter" font-size="42" font-weight="900" fill="#fff" text-anchor="middle" style="font-family:'Inter';font-weight:900">KASSE 2</text>`;
  // shelves full of products
  const cols = ['#d9493f', '#f0b45c', '#3f8fd8', '#3c9a5f', '#f2d03a', '#e88a7d', '#8e6bb8', '#f6f1e6'];
  s += `<rect x="-60" y="300" width="1200" height="760" fill="#e9ecee"/>`;
  for (let r = 0; r < 4; r++) {
    const y = 330 + r * 180;
    s += `<rect x="-60" y="${y + 140}" width="1200" height="20" fill="#a9b3bb"/>`;
    for (let i = 0; i < 18; i++) { const w = 46 + hash(r * 31 + i) * 20, h = 70 + hash(r * 17 + i * 3) * 60; s += `<rect x="${f1(-50 + i * 68)}" y="${f1(y + 140 - h)}" width="${f1(w)}" height="${f1(h)}" rx="5" fill="${cols[(i * 3 + r) % cols.length]}"/>`; }
    s += `<g fill="#fff36b">${[100, 420, 760].map(x => `<rect x="${x}" y="${y + 144}" width="40" height="14"/>`).join('')}</g>`;
  }
  // shopping trolley + floor
  s += `<rect x="-80" y="1080" width="1240" height="900" fill="#c8ccd0"/><g stroke="#b5bac0" stroke-width="3">${[1150, 1260, 1400].map(y => `<line x1="-80" y1="${y}" x2="1160" y2="${y}"/>`).join('')}</g>`;
  s += `<g fill="none" stroke="#8a929a" stroke-width="7"><path d="M 900 900 h 160 l -20 120 h -120 z"/><path d="M 880 880 l 20 20"/></g><circle cx="935" cy="1040" r="12" fill="#555"/><circle cx="1030" cy="1040" r="12" fill="#555"/>`;
  s = blurG(s, o.heavy);
  s += pool(540, 120, 860, 520, 'v93white', 1);
  return s;
}
// checkout counter (sharp): belt with groceries, divider bar, card terminal, register display
export function checkout(y = 1250, o = {}) {
  const belt = o.belt || 0;
  let s = `<rect x="-60" y="${y}" width="1200" height="700" fill="#5b6a78" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y}" width="1200" height="60" fill="#2b2f36" stroke="${INK}" stroke-width="5"/>`;
  s += `<g stroke="#3c434c" stroke-width="4">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const x = ((i * 130 - belt) % 1300 + 1300) % 1300 - 80; return `<line x1="${f1(x)}" y1="${y + 6}" x2="${f1(x)}" y2="${y + 54}"/>`; }).join('')}</g>`;
  if (o.items !== false) s += `<g><rect x="640" y="${y - 70}" width="70" height="80" rx="8" fill="#f6f1e6" stroke="${INK}" stroke-width="4"/><rect x="650" y="${y - 50}" width="50" height="22" fill="#3f8fd8"/><rect x="730" y="${y - 40}" width="110" height="50" rx="10" fill="#f0b45c" stroke="${INK}" stroke-width="4"/><circle cx="890" cy="${y - 20}" r="30" fill="#d9493f" stroke="${INK}" stroke-width="4"/><rect x="560" y="${y - 22}" width="60" height="28" rx="6" fill="#9aa3ad" stroke="${INK}" stroke-width="4"/></g>`;
  if (o.terminal !== false) s += `<g transform="translate(${o.tx || 150} ${y - 40})"><rect x="-50" y="-60" width="100" height="120" rx="12" fill="#2b2f36" stroke="${INK}" stroke-width="4"/><rect x="-38" y="-48" width="76" height="40" rx="4" fill="#9fe0b0"/><g fill="#777">${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${-30 + c * 22}" y="${4 + r * 16}" width="16" height="10" rx="2"/>`).join('')).join('')}</g></g>`;
  return s;
}

export function setStreet(t, o = {}) {
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wStr)"/>`;
  // buildings with lit windows
  const B = [[-60, 260, 300], [230, 180, 260], [480, 300, 240], [700, 220, 260], [950, 280, 220]];
  B.forEach(([x, y, w], i) => {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${880 - y}" fill="${['#20284a', '#2a2f52', '#1c2242', '#262c4e', '#20264a'][i]}"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) if (hash(i * 50 + r * 7 + c) > .45) s += `<rect x="${x + 22 + c * (w / 4.4)}" y="${y + 30 + r * 90}" width="30" height="40" fill="${hash(r + c + i) > .5 ? '#ffd27a' : '#f5a85a'}" opacity=".85"/>`;
  });
  // shop sign, traffic light, street lamps
  s += `<rect x="60" y="760" width="200" height="60" rx="8" fill="#d9493f"/><rect x="80" y="780" width="160" height="20" rx="4" fill="#ffd9c8" opacity=".8"/>`;
  s += `<rect x="880" y="560" width="12" height="400" fill="#141826"/><rect x="858" y="500" width="56" height="140" rx="12" fill="#141826"/><circle cx="886" cy="530" r="16" fill="#ff4a3a"/><circle cx="886" cy="570" r="16" fill="#3a3f2a"/><circle cx="886" cy="610" r="16" fill="#1f3a2a"/>`;
  s += `<g>${[180, 640].map(x => `<rect x="${x}" y="380" width="12" height="560" fill="#141826"/><path d="M ${x + 6} 380 q 50 -40 100 0" stroke="#141826" stroke-width="10" fill="none"/><ellipse cx="${x + 106}" cy="392" rx="30" ry="12" fill="#ffe2a0"/>`).join('')}</g>`;
  // road (wet) with reflections
  s += `<rect x="-80" y="880" width="1240" height="1100" fill="url(#v93fRoad)"/><rect x="-80" y="880" width="1240" height="40" fill="#3a3f55"/>`;
  s += `<g fill="#fff" opacity=".5">${[0, 1, 2, 3, 4].map(i => `<path d="M ${f1(530 - 6 - i * 4)} ${980 + i * 190} L ${f1(530 + 6 + i * 4)} ${980 + i * 190} L ${f1(530 + 10 + i * 6)} ${1080 + i * 220} L ${f1(530 - 10 - i * 6)} ${1080 + i * 220} Z"/>`).join('')}</g>`;
  s += `<g opacity=".45">${[[286, '#ffe2a0'], [746, '#ffe2a0'], [886, '#ff4a3a'], [160, '#d9493f']].map(([x, c]) => `<rect x="${x - 14}" y="930" width="28" height="520" fill="${c}"/>`).join('')}</g>`;
  s = blurG(s, o.heavy);
  s += pool(o.lx || 300, 420, 460, 420, 'v93warm', .55);
  // rain streaks (sharp, subtle)
  if (o.rain !== false) { let r = ''; for (let i = 0; i < 40; i++) { const x = hash(i * 1.3) * 1100, y = ((hash(i * 2.9) * 1900 + t * 1400) % 1900); r += `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x - 8)}" y2="${f1(y + 46)}"/>`; } s += `<g stroke="#cfe0ff" stroke-width="3" opacity=".35">${r}</g>`; }
  return s;
}

export function setBedroom(t, o = {}) {
  const lamp = o.lamp === undefined ? 1 : o.lamp;
  let s = `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v93wBed)"/>`;
  // window with moon + curtains
  s += `<rect x="600" y="220" width="380" height="460" rx="8" fill="url(#v93skyNight)"/><circle cx="880" cy="320" r="40" fill="#f4eccd"/><g fill="#1b1f3f"><rect x="610" y="520" width="80" height="160"/><rect x="700" y="480" width="70" height="200"/><rect x="780" y="540" width="90" height="140"/><rect x="880" y="500" width="90" height="180"/></g><g fill="#ffd36b">${[[630, 550], [720, 510], [800, 570], [900, 530], [930, 600]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="12"/>`).join('')}</g>`;
  s += `<rect x="600" y="220" width="380" height="460" rx="8" fill="none" stroke="#c9bfae" stroke-width="14"/><line x1="790" y1="220" x2="790" y2="680" stroke="#c9bfae" stroke-width="10"/>`;
  s += `<path d="M 560 190 C 590 330 550 560 580 730 L 630 730 C 610 560 640 330 620 190 Z" fill="#6b3f5a"/><path d="M 960 190 C 990 330 950 560 980 730 L 1030 730 C 1010 560 1040 330 1020 190 Z" fill="#6b3f5a"/>`;
  // shelf with books, plant, frames, wardrobe
  s += `<rect x="60" y="300" width="300" height="16" fill="#5a4038"/><g>${[0, 1, 2, 3, 4].map(i => `<rect x="${80 + i * 34}" y="${220 + (i % 2) * 10}" width="26" height="${80 - (i % 2) * 10}" fill="${['#c25b4e', '#5f8fb5', '#e0b04a', '#7aa27a', '#d9cbb0'][i]}"/>`).join('')}<circle cx="300" cy="260" r="32" fill="#4f7a59"/><rect x="284" y="268" width="32" height="32" fill="#b9714f"/></g>`;
  s += `<rect x="90" y="400" width="120" height="150" fill="#d9cbb0"/><rect x="102" y="412" width="96" height="126" fill="#8fb3a8"/><rect x="250" y="420" width="100" height="100" fill="#d9cbb0"/><rect x="262" y="432" width="76" height="76" fill="#d98f6b"/>`;
  s += `<rect x="-60" y="560" width="200" height="560" fill="#3e2f36"/><line x1="40" y1="580" x2="40" y2="1100" stroke="#2c2128" stroke-width="6"/><circle cx="25" cy="840" r="7" fill="#c9a86a"/>`;
  // floor + rug
  s += `<rect x="-80" y="1100" width="1240" height="900" fill="url(#v93fBed)"/><ellipse cx="540" cy="1500" rx="560" ry="160" fill="#6b3f5a" opacity=".5"/>`;
  s = blurG(s, o.heavy);
  return s;
}
// the bed with du under the blanket (sharp). headX: pillow position. lying on back, looking at ceiling.
export function bed(x, y, o = {}) {
  let s = `<rect x="${x - 460}" y="${y - 180}" width="80" height="360" rx="20" fill="#5a4038" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${x - 420}" y="${y - 40}" width="900" height="200" rx="30" fill="#6e4f42" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${x - 400}" y="${y - 90}" width="860" height="120" rx="40" fill="#efe6d8" stroke="${INK}" stroke-width="5"/>`;
  s += `<ellipse cx="${x - 270}" cy="${y - 100}" rx="130" ry="56" fill="#f8f3ea" stroke="${INK}" stroke-width="5"/>`;
  return s;
}
export function blanket(x, y) {
  return `<path d="M ${x - 200} ${y - 70} C ${x - 120} ${y - 150} ${x + 260} ${y - 140} ${x + 460} ${y - 90} L ${x + 460} ${y + 40} L ${x - 200} ${y + 40} Z" fill="#3f6f8f" stroke="${INK}" stroke-width="5"/><path d="M ${x - 200} ${y - 70} C ${x - 120} ${y - 110} ${x - 40} ${y - 112} ${x + 20} ${y - 100}" stroke="#5f8fb5" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M ${x + 60} ${y - 40} q 100 -30 200 0 M ${x + 120} ${y} q 100 -30 200 0" stroke="#2d5470" stroke-width="5" fill="none"/>`;
}
export function nightstand(x, y, lampOn = 1, t = 0) {
  const fl = 1 + Math.sin(t * 7) * .02;
  let s = `<rect x="${x - 120}" y="${y}" width="240" height="400" fill="#5a4038" stroke="${INK}" stroke-width="5"/><rect x="${x - 120}" y="${y}" width="240" height="22" fill="#6e4f42"/>`;
  s += `<rect x="${x - 8}" y="${y - 150}" width="16" height="150" fill="#3a2a22" stroke="${INK}" stroke-width="3"/><path d="M ${x - 80} ${y - 150} L ${x + 80} ${y - 150} L ${x + 50} ${y - 250} L ${x - 50} ${y - 250} Z" fill="${lampOn > .5 ? '#ffcf7a' : '#c99a5a'}" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${x + 40}" y="${y - 22}" width="70" height="22" rx="6" fill="${INK}"/>`;
  s += pool(x, y - 180, 520 * fl, 480 * fl, 'v93orange', lampOn);
  return s;
}

// ---------- blinking ----------
export function blinking(t, seed = 1) {
  const per = 3.1 + hash(seed) * 1.6, ph = hash(seed + 7) * per;
  const u = ((t + ph) % per + per) % per;
  return u < .13;
}

// ---------- face (head-local, head centre 0,0, r 100) ----------
function eyesSvg(o) {
  const lx = o.look ? o.look[0] : 0, ly = o.look ? o.look[1] : 0;
  const e = o.eyes || 'n', ex = 33, ey = -6;
  let s = '';
  if (e === 'happy') return `<path d="M ${-ex - 18} ${ey + 6} Q ${-ex} ${ey - 16} ${-ex + 18} ${ey + 6} M ${ex - 18} ${ey + 6} Q ${ex} ${ey - 16} ${ex + 18} ${ey + 6}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (e === 'closed') return `<path d="M ${-ex - 18} ${ey} Q ${-ex} ${ey + 14} ${-ex + 18} ${ey} M ${ex - 18} ${ey} Q ${ex} ${ey + 14} ${ex + 18} ${ey}" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const rx = e === 'wide' ? 22 : 19, ry = e === 'wide' ? 25 : 21, pr = e === 'wide' ? 9 : 10;
  s += `<ellipse cx="${-ex}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="${ex}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  const px = cl(lx, -9, 9), py = cl(ly, -10, 10);
  s += `<circle cx="${f1(-ex + px)}" cy="${f1(ey + 2 + py)}" r="${pr}" fill="${INK}"/><circle cx="${f1(ex + px)}" cy="${f1(ey + 2 + py)}" r="${pr}" fill="${INK}"/>`;
  s += `<circle cx="${f1(-ex + px + 3)}" cy="${f1(ey - 2 + py)}" r="3" fill="#fff"/><circle cx="${f1(ex + px + 3)}" cy="${f1(ey - 2 + py)}" r="3" fill="#fff"/>`;
  if (e === 'tired' || e === 'half') {
    const lid = e === 'tired' ? 10 : 4;
    s += `<path d="M ${-ex - 24} ${ey - 26} H ${-ex + 24} V ${ey - lid} Q ${-ex} ${ey - lid + 4} ${-ex - 24} ${ey - lid} Z M ${ex - 24} ${ey - 26} H ${ex + 24} V ${ey - lid} Q ${ex} ${ey - lid + 4} ${ex - 24} ${ey - lid} Z" fill="${INK}"/>`;
    if (e === 'tired') s += `<path d="M ${-ex - 16} ${ey + 28} Q ${-ex} ${ey + 34} ${-ex + 16} ${ey + 28} M ${ex - 16} ${ey + 28} Q ${ex} ${ey + 34} ${ex + 16} ${ey + 28}" stroke="#8a8a8a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  if (e === 'mean') s += `<path d="M ${-ex - 24} ${ey - 26} H ${-ex + 24} V ${ey - 4} L ${-ex - 24} ${ey - 14} Z M ${ex - 24} ${ey - 26} H ${ex + 24} V ${ey - 14} L ${ex - 24} ${ey - 4} Z" fill="${INK}"/>`;
  if (o.glasses) s += `<g fill="none" stroke="#fff" stroke-width="6"><rect x="${-ex - 28}" y="${ey - 26}" width="56" height="50" rx="16"/><rect x="${ex - 28}" y="${ey - 26}" width="56" height="50" rx="16"/></g><line x1="${-ex + 28}" y1="${ey - 4}" x2="${ex - 28}" y2="${ey - 4}" stroke="#fff" stroke-width="5"/>`;
  return s;
}
function browsSvg(b) {
  if (!b) return '';
  const p = { worried: 'M -60 -46 L -18 -58 M 18 -58 L 60 -46', sad: 'M -60 -40 L -18 -54 M 18 -54 L 60 -40', angry: 'M -60 -60 L -16 -44 M 16 -44 L 60 -60', flat: 'M -58 -52 L -18 -52 M 18 -52 L 58 -52', soft: 'M -58 -54 Q -38 -62 -18 -56 M 18 -56 Q 38 -62 58 -54', up: 'M -58 -62 Q -38 -72 -18 -64 M 18 -64 Q 38 -72 58 -62' }[b];
  return p ? `<path d="${p}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/>` : '';
}
function mouthSvg(m) {
  switch (m) {
    case 'smile': return `<path d="M -22 44 Q 0 60 22 44" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'soft': return `<path d="M -16 48 Q 0 56 16 48" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'o': return `<ellipse cx="0" cy="50" rx="11" ry="15" fill="#fff"/>`;
    case 'sad': return `<path d="M -22 58 Q 0 42 22 58" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'tight': return `<path d="M -18 50 L 18 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'wavy': return `<path d="M -24 52 q 8 -8 16 0 q 8 8 16 0 q 8 -8 16 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    case 'grim': return `<path d="M -24 54 Q 0 46 24 54" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'talk': return `<ellipse cx="0" cy="50" rx="14" ry="8" fill="#fff"/>`;
    case 'none': return '';
    default: return `<rect x="-20" y="46" width="40" height="8" rx="4" fill="#fff"/>`;
  }
}

// ---------- cast (fixed identities, see jobs/v93/style.md) ----------
export const WHO = {
  du: { top: K.du, sh: K.duSh, acc: 'none', hood: true },
  mann: { top: '#8a5a3c', sh: '#6e4630', acc: 'beanie', coat: true },
  kol: { top: '#a9d0e6', sh: '#8bb6cf', acc: 'bunGlasses' },
  oma: { top: '#7d6f8f', sh: '#665a77', acc: 'silverBun', scarf: '#d9493f' },
  fahrer: { top: '#e8803a', sh: '#c86a2a', acc: 'cap' },
  p1: { top: '#c9a03f', sh: '#a8852f', acc: 'curly' },
  p2: { top: '#6f8fb8', sh: '#5a789d', acc: 'none' },
  p3: { top: '#b56b8a', sh: '#985673', acc: 'bun' },
  p4: { top: '#5f8a5f', sh: '#4c724c', acc: 'headphones' },
};
const BODY = 'M -60 -240 C -60 -315 -40 -345 0 -345 C 40 -345 60 -315 60 -240 L 66 -130 C 66 -116 -66 -116 -66 -130 Z';

export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0;
  const bob = o.still ? 0 : Math.sin(t * 2.2 + (o.seed || 0)) * 3;
  const top = W.top;
  let legs = '';
  const wk = o.walk !== undefined ? o.walk : null;
  const sw = wk === null ? 0 : Math.sin(wk * Math.PI * 2) * 22, lift = wk === null ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 10, lift2 = wk === null ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 10;
  if (!o.noLegs) legs = `<line x1="-22" y1="-122" x2="${f1(-22 + sw)}" y2="${f1(-4 - lift)}" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><line x1="22" y1="-122" x2="${f1(22 - sw)}" y2="${f1(-4 - lift2)}" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>` +
    `<ellipse cx="${f1(-30 + sw)}" cy="${f1(-lift)}" rx="21" ry="9" fill="${INK}"/><ellipse cx="${f1(30 - sw)}" cy="${f1(-lift2)}" rx="21" ry="9" fill="${INK}"/>`;
  const up = -(wk === null ? 0 : Math.abs(Math.sin(wk * Math.PI * 2)) * 6);
  let body = `<path d="${BODY}" fill="${top}" stroke="${INK}" stroke-width="5"/>`;
  if (W.hood) {
    body += `<path d="M -46 -330 C -30 -356 30 -356 46 -330 C 30 -312 -30 -312 -46 -330 Z" fill="${W.sh}" stroke="${INK}" stroke-width="4"/>`;
    if (!o.back) body += `<path d="M -8 -318 L -14 -272 M 8 -318 L 14 -272" stroke="${K.duStr}" stroke-width="5" stroke-linecap="round"/><circle cx="-14" cy="-268" r="4.5" fill="${K.duStr}"/><circle cx="14" cy="-268" r="4.5" fill="${K.duStr}"/><path d="M -40 -200 Q 0 -190 40 -200 L 38 -166 Q 0 -158 -38 -166 Z" fill="${W.sh}" stroke="${INK}" stroke-width="3"/>`;
  } else if (W.coat) {
    body += `<path d="M -26 -342 L -40 -300 L -10 -290 L 0 -330 L 10 -290 L 40 -300 L 26 -342" fill="${W.sh}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    if (!o.back) body += `<path d="M 0 -318 V -126" stroke="${W.sh}" stroke-width="5"/><g fill="${INK}"><circle cx="10" cy="-270" r="5"/><circle cx="10" cy="-220" r="5"/><circle cx="10" cy="-170" r="5"/></g><path d="M -52 -190 h 26 M 26 -190 h 26" stroke="${W.sh}" stroke-width="6" stroke-linecap="round"/>`;
  } else if (who === 'kol') {
    body += `<path d="M -24 -340 L 0 -318 L 24 -340" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="M -64 -150 H 64" stroke="${W.sh}" stroke-width="6"/>`;
  } else if (who === 'fahrer') {
    body += `<path d="M -26 -338 Q 0 -316 26 -338" stroke="${W.sh}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  } else {
    body += `<path d="M -26 -338 Q 0 -318 26 -338" stroke="${W.sh}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M -64 -140 H 64" stroke="${W.sh}" stroke-width="6"/>`;
  }
  if (W.scarf) body += `<path d="M -44 -346 Q 0 -324 44 -346 L 44 -322 Q 0 -300 -44 -322 Z" fill="${W.scarf}" stroke="${INK}" stroke-width="4"/><path d="M 18 -320 L 30 -250 L 6 -246 L 2 -318 Z" fill="${W.scarf}" stroke="${INK}" stroke-width="4"/>`;
  if (o.tote) body += `<path d="M -40 -330 Q -70 -250 -64 -190" stroke="#c9b48a" stroke-width="8" fill="none"/><rect x="-104" y="-200" width="76" height="90" rx="10" fill="#e6d6b0" stroke="${INK}" stroke-width="4"/><path d="M -90 -160 h 46" stroke="#b39a6a" stroke-width="5"/>`;
  // arms: hand target in person-local coords
  const arm = (side, h) => {
    const sx = side * 50, sy = -300;
    const mx = (sx + h[0]) / 2 + side * 26, my = (sy + h[1]) / 2 + 12;
    return `<path d="M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}" stroke="${INK}" stroke-width="38" fill="none" stroke-linecap="round"/><path d="M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}" stroke="${top}" stroke-width="28" fill="none" stroke-linecap="round"/><circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="15" fill="${INK}"/>`;
  };
  let armsBack = '', armsFront = '';
  if (o.armL) armsFront += arm(-1, o.armL); else armsBack += `<circle cx="-78" cy="-206" r="14" fill="${INK}"/>`;
  if (o.armR) armsFront += arm(1, o.armR); else armsBack += `<circle cx="78" cy="-206" r="14" fill="${INK}"/>`;
  if (o.crossed) armsFront = `<rect x="-72" y="-262" width="144" height="40" rx="20" fill="${top}" stroke="${INK}" stroke-width="5" transform="rotate(7 0 -242)"/><rect x="-72" y="-240" width="144" height="40" rx="20" fill="${top}" stroke="${INK}" stroke-width="5" transform="rotate(-7 0 -220)"/><circle cx="66" cy="-254" r="12" fill="${INK}"/><circle cx="-66" cy="-212" r="12" fill="${INK}"/>`;
  // head
  const hy = -420 + (o.headDy || 0);
  const e0 = o.eyes || 'n';
  const eyes = blinking(t, (o.seed || 0) + 3) && !o.noBlink && !['happy', 'closed'].includes(e0) ? 'closed' : e0;
  let head = '';
  if (W.acc === 'bun' || W.acc === 'bunGlasses') head += `<circle cx="0" cy="-104" r="38" fill="${INK}"/>`;
  if (W.acc === 'silverBun') head += `<circle cx="0" cy="-104" r="38" fill="#c9c9c9" stroke="${INK}" stroke-width="5"/>`;
  if (W.acc === 'curly') head += `<g fill="${INK}">${[[-74, -62], [-48, -90], [-14, -104], [22, -104], [56, -90], [80, -62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30"/>`).join('')}</g>`;
  head += `<circle cx="0" cy="0" r="100" fill="${INK}"/>`;
  if (W.acc === 'silverBun') head += `<path d="M -96 -20 C -90 -96 90 -96 96 -20 C 70 -64 -70 -64 -96 -20 Z" fill="#c9c9c9" stroke="${INK}" stroke-width="4"/>`;
  head += `<ellipse cx="-36" cy="-52" rx="30" ry="15" fill="#fff" opacity=".16"/>`;
  if (o.rim) head += `<path d="M 66 -76 C 100 -40 104 30 76 68" fill="none" stroke="${o.rim}" stroke-width="7" stroke-linecap="round" opacity=".75"/>`;
  if (o.rimL) head += `<path d="M -66 -76 C -100 -40 -104 30 -76 68" fill="none" stroke="${o.rimL}" stroke-width="7" stroke-linecap="round" opacity=".75"/>`;
  if (!o.back) head += eyesSvg({ eyes, look: o.look, glasses: W.acc === 'bunGlasses' }) + browsSvg(o.brows) + mouthSvg(o.mouth || 'flat');
  if (o.sweat) head += `<path d="M 84 -40 q 10 18 0 28 q -10 -10 0 -28 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="2"/>`;
  if (W.acc === 'beanie') head += `<path d="M -98 -18 C -98 -110 98 -110 98 -18 Z" fill="#8f949b" stroke="${INK}" stroke-width="5"/><rect x="-102" y="-34" width="204" height="30" rx="12" fill="#7a7f86" stroke="${INK}" stroke-width="5"/><g stroke="#6f747b" stroke-width="5">${[-60, -30, 0, 30, 60].map(x => `<line x1="${x}" y1="-40" x2="${x * .8}" y2="-86"/>`).join('')}</g>`;
  if (W.acc === 'cap') head += `<path d="M -94 -25 C -90 -105 -40 -135 10 -133 C 70 -129 100 -85 98 -25 Z" fill="#f2c14e" stroke="${INK}" stroke-width="5"/><path d="M 98 -25 C 134 -25 158 -15 166 -5 C 134 -1 94 -7 64 -15 Z" fill="#f2c14e" stroke="${INK}" stroke-width="5"/>`;
  if (W.acc === 'headphones') head += `<path d="M -92 -10 C -92 -130 92 -130 92 -10" stroke="#e8e8e8" stroke-width="12" fill="none"/><rect x="-112" y="-30" width="30" height="60" rx="12" fill="#e8e8e8" stroke="${INK}" stroke-width="4"/><rect x="82" y="-30" width="30" height="60" rx="12" fill="#e8e8e8" stroke="${INK}" stroke-width="4"/>`;
  const g = `${legs}<g transform="translate(0 ${f1(up + bob * .4)})">${armsBack}${o.behindBody || ''}${body}${o.overBody || ''}<g transform="translate(${f1(o.headDx || 0)} ${f1(hy + bob * .6)}) rotate(${f1(o.headTilt || 0)})">${head}${o.face || ''}</g>${armsFront}${o.front || ''}</g>`;
  const sx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s * sx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// screen position of a person's head centre / top
export const headAt = (x, y, s, dy = 0) => [x, y + (-420 + dy) * s];

// ---------- bubbles ----------
export function speech(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 70, h = L.length * lh + 44;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ax = cl(tx, bx + 44, bx + w - 44), base = ty > y ? by + h - 2 : by + 2;
  let s = `<path d="M ${f1(ax - 24)} ${f1(base)} L ${f1(tx)} ${f1(ty)} L ${f1(ax + 24)} ${f1(base)} Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(44, h / 2))}" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M ${f1(ax - 21)} ${f1(base - (ty > y ? 4 : -4))} L ${f1(ax + 21)} ${f1(base - (ty > y ? 4 : -4))}" stroke="#fff" stroke-width="8"/>`;
  L.forEach((l, i) => { s += T(x, by + 22 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
// thought bubble: pill + two trailing circles toward (tx,ty). o.text 0..1 reveals the lines; o.dashed = imagined
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = o.w || (Math.max(...L.map(l => textW(l, size))) + 80), h = o.h || (L.length * lh + 48);
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const fill = o.fill || '#fff', stroke = o.stroke || INK, dash = o.dashed ? ` stroke-dasharray="18 14"` : '';
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .36), c1y = lerp(ey, ty, .36), c2x = lerp(ex, tx, .74), c2y = lerp(ey, ty, .74);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="11" fill="${fill}" stroke="${stroke}" stroke-width="5"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="19" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 70))}" fill="${fill}" stroke="${stroke}" stroke-width="5"${dash}/>`;
  const tr = o.text === undefined ? 1 : o.text;
  if (o.inner) s += o.inner;
  L.forEach((l, i) => { const a = cl(tr * L.length - i); if (a > 0) s += T(x, y - (L.length - 1) * lh / 2 + size * .36 + i * lh, l, size, { w: 800, fill: o.col || K.txt, op: a }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}

// ---------- labels ----------
export function dayCard(t, t0, word, o = {}) {
  const p = pop(t, t0, .45); if (p <= 0) return '';
  const y = o.y || 260, size = o.size || 110;
  return `<g transform="translate(540 ${y - size * .35}) scale(${f1(p * 1000) / 1000}) translate(-540 ${-(y - size * .35)})" opacity="${op(o.a === undefined ? 1 : o.a)}">${T(540, y, word, size, { fill: o.fill || K.yellow, stroke: INK, sw: 22 })}</g>`;
}
export function chip(x, y, txt, o = {}) {
  const size = o.size || 44, w = textW(txt, size) + 60, h = size + 36, p = o.p === undefined ? 1 : o.p;
  if (p <= 0) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(p * 1000) / 1000}) rotate(${f1(o.rot || 0)})" opacity="${op(o.a === undefined ? 1 : o.a)}"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(o.sq ? 14 : h / 2)}" fill="${o.bg || K.yellow}" stroke="${INK}" stroke-width="6"/>${T(0, size * .36, txt, size, { fill: o.fill || INK })}</g>`;
}

// ---------- props ----------
export function phone(x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})"><rect x="-34" y="-62" width="68" height="124" rx="12" fill="${INK}"/><rect x="-28" y="-54" width="56" height="106" rx="6" fill="${o.lit === false ? '#2b2f36' : '#dff1ff'}"/>${o.screen || ''}</g>`;
}
export function coin(x, y, r = 22, col = '#d8b04a') {
  return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${r}" ry="${f1(r * .55)}" fill="${col}" stroke="${INK}" stroke-width="4"/><ellipse cx="${f1(x)}" cy="${f1(y - 2)}" rx="${f1(r * .55)}" ry="${f1(r * .28)}" fill="none" stroke="#a8842a" stroke-width="3"/>`;
}
// icons for small bubbles
export const icon = {
  cross: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-34" y="-34" width="68" height="68" rx="10" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M -8 -24 h 16 v 16 h 16 v 16 h -16 v 16 h -16 v -16 h -16 v -16 h 16 z" fill="${K.red}"/></g>`,
  coin: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${coin(-12, 8, 24)}${coin(14, -6, 24)}</g>`,
  thermo: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-40" width="20" height="62" rx="10" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="28" r="16" fill="${K.red}" stroke="${INK}" stroke-width="5"/><rect x="-4" y="-16" width="8" height="38" fill="${K.red}"/></g>`,
  clock: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="32" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M 0 0 V -20 M 0 0 L 14 8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`,
  cloud: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -36 12 a 18 18 0 0 1 6 -34 a 24 24 0 0 1 44 -4 a 18 18 0 0 1 22 38 z" fill="#9aa6b8" stroke="${INK}" stroke-width="5"/><path d="M -18 22 l -6 14 M 2 22 l -6 14 M 22 22 l -6 14" stroke="#3f8fd8" stroke-width="5" stroke-linecap="round"/></g>`,
  battery: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-38" y="-20" width="70" height="40" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="32" y="-8" width="8" height="16" fill="${INK}"/><rect x="-32" y="-14" width="14" height="28" rx="3" fill="${K.red}"/></g>`,
  weight: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -30 30 L -22 -10 H 22 L 30 30 Z" fill="#6b7480" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="0" cy="-18" r="10" fill="none" stroke="${INK}" stroke-width="5"/></g>`,
  heart: (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M 0 22 C -44 -8 -38 -42 -14 -42 C 0 -42 0 -32 0 -28 C 0 -32 0 -42 14 -42 C 38 -42 44 -8 0 22 Z" fill="#e8677a" stroke="${INK}" stroke-width="5"/>`,
  car: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 10 L -30 -12 H 26 L 40 10 Z" fill="#e8803a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="-46" y="6" width="92" height="22" rx="8" fill="#e8803a" stroke="${INK}" stroke-width="5"/><circle cx="-24" cy="30" r="9" fill="${INK}"/><circle cx="24" cy="30" r="9" fill="${INK}"/></g>`,
  child: (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-12" r="22" fill="${INK}"/><path d="M -22 34 C -22 8 22 8 22 34 Z" fill="#f2d03a" stroke="${INK}" stroke-width="4"/><circle cx="-7" cy="-14" r="4" fill="#fff"/><circle cx="7" cy="-14" r="4" fill="#fff"/></g>`,
};
// visual horn: yellow sound arcs from a point, growing with p (0..1)
export function soundWaves(x, y, p, dir = 1, col = K.yellow) {
  if (p <= 0) return '';
  let s = '';
  for (let i = 0; i < 3; i++) { const q = cl(p * 1.6 - i * .3); if (q <= 0) continue; const r = 40 + i * 50 + q * 30; s += `<path d="M ${f1(x + dir * r * Math.cos(.7))} ${f1(y - r * Math.sin(.7))} A ${f1(r)} ${f1(r)} 0 0 ${dir > 0 ? 1 : 0} ${f1(x + dir * r * Math.cos(.7))} ${f1(y + r * Math.sin(.7))}" stroke="${col}" stroke-width="${12 - i * 2}" fill="none" stroke-linecap="round" opacity="${op(1 - q * .5)}"/>`; }
  return s;
}
// motion streaks (impact / movement)
export function streaks(x, y, a, dir = 1) {
  if (a <= 0) return '';
  return `<g stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${op(a)}">${[-40, 0, 40].map((dy, i) => `<line x1="${f1(x)}" y1="${f1(y + dy)}" x2="${f1(x - dir * (70 + i * 20))}" y2="${f1(y + dy)}"/>`).join('')}</g>`;
}
export function impact(x, y, p) {
  if (p <= 0 || p >= 1) return '';
  const r1 = 30 + p * 60, r2 = 60 + p * 80;
  let d = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + .2; d += `M ${f1(x + Math.cos(a) * r1)} ${f1(y + Math.sin(a) * r1)} L ${f1(x + Math.cos(a) * r2)} ${f1(y + Math.sin(a) * r2)} `; }
  return `<path d="${d}" stroke="${K.yellow}" stroke-width="9" stroke-linecap="round" opacity="${op(1 - p)}"/>`;
}
