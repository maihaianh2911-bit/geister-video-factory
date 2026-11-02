// L13a 70.10–72.90: insert: du's phone in hand; chat with the new colleague; the message types in ("Danke" 71.88) and is sent.
import { frame, cam, prog, eio, f1, K, T, head } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'day', clock: false, strong: true, hh: 14, mm: 0 });
  // hand + sleeve holding the phone
  s += `<path d="M 1180 1900 Q 820 1600 640 1290" stroke="#1d1d1d" stroke-width="150" fill="none" stroke-linecap="round"/><path d="M 1180 1900 Q 820 1600 640 1290" stroke="#2fa59a" stroke-width="124" fill="none" stroke-linecap="round"/>`;
  let p = `<rect x="-230" y="-430" width="460" height="860" rx="64" fill="#1d1d1d"/><rect x="-206" y="-400" width="412" height="800" rx="40" fill="#f2f4f7"/>`;
  p += `<rect x="-206" y="-400" width="412" height="120" rx="40" fill="#e4e9f0"/><rect x="-206" y="-320" width="412" height="40" fill="#e4e9f0"/>`;
  p += head('neu', -130, -330, .2, { t, mouth: 'smile', blink: false }) + `<rect x="-70" y="-350" width="170" height="20" rx="10" fill="#9aa6b4"/>`;
  // earlier messages (greyed)
  p += `<rect x="-180" y="-240" width="240" height="60" rx="26" fill="#dfe3e8"/><rect x="-60" y="-160" width="230" height="60" rx="26" fill="#bfe8df"/>`;
  const msg = ['Danke für gestern,', 'du hast mir sehr', 'geholfen.'];
  const full = msg.join(' ');
  const n = Math.round(full.length * eio(prog(t, 71.85, 72.55)));
  const sent = t >= 72.6;
  if (sent) {
    p += `<rect x="-186" y="-70" width="372" height="190" rx="30" fill="#2fa59a" stroke="#1d1d1d" stroke-width="4"/>` + msg.map((l, i) => T(0, -14 + i * 54, l, 36, { fill: '#fff', w: 800 })).join('');
    p += `<path d="M 130 136 l 14 14 l 26 -30 M 150 136 l 14 14 l 26 -30" stroke="#2fa59a" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
  // input field
  p += `<rect x="-190" y="250" width="300" height="110" rx="26" fill="#fff" stroke="#c4ccd6" stroke-width="4"/>`;
  if (!sent && n > 0) {
    const typed = full.slice(0, n), lines = [], words = typed.split(' ');
    let cur = '';
    for (const w of words) { if ((cur + ' ' + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
    lines.push(cur.trim());
    p += lines.slice(-2).map((l, i) => T(-170, 295 + i * 44, l, 34, { anchor: 'start', w: 700 })).join('');
  }
  p += `<circle cx="160" cy="305" r="44" fill="${sent ? '#9aa6b4' : '#2fa59a'}"/><path d="M 140 305 L 182 305 M 166 287 L 184 305 L 166 323" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  const sh = eio(prog(t, 70.1, 72.9));
  s += `<g transform="translate(560 ${f1(820 - 20 * sh)}) rotate(-4)">${p}</g><circle cx="620" cy="${f1(1250 - 20 * sh)}" r="70" fill="#1d1d1d"/>`;
  return frame(cam(s, 540, 900, 1 + .05 * sh));
}
