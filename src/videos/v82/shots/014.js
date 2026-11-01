// 48.38–52.98 school all over again: wall clock races on "Schultage", exam stack grows on "Prüfungen", the same red ✕ on "Fehler"
import { K, kid, paper, chip, T, fade, pop, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#3a4470"/><rect x="0" y="1330" width="1080" height="590" fill="#2c3560"/>`;
  // chalkboard
  s += `<rect x="90" y="200" width="560" height="340" rx="14" fill="#2f5d4a" stroke="#6d4429" stroke-width="14"/>` + T(370, 330, '1 + 1 = 2', 64, { fill: '#e8f1ea' }) + T(370, 430, 'A B C', 64, { fill: '#e8f1ea' });
  // clock racing
  const sp = t < 48.82 ? 0 : (t - 48.82);
  const hA = sp * 260, mA = sp * 3100;
  s += `<g transform="translate(850 360)"><circle r="130" fill="#fff" stroke="${K.ol}" stroke-width="10"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<path d="M 0 -110 L 0 -94" stroke="${K.ol}" stroke-width="6" transform="rotate(${i * 30})"/>`).join('')}
    <path d="M 0 0 L 0 -60" stroke="${K.ol}" stroke-width="12" stroke-linecap="round" transform="rotate(${f1(hA % 360)})"/><path d="M 0 0 L 0 -96" stroke="${K.red}" stroke-width="8" stroke-linecap="round" transform="rotate(${f1(mA % 360)})"/><circle r="10" fill="${K.ol}"/></g>`;
  // desk + stack of tests
  s += `<rect x="160" y="1130" width="760" height="36" rx="8" fill="${K.wood}" stroke="${K.ol}" stroke-width="6"/><rect x="200" y="1166" width="30" height="164" fill="${K.woodSh}"/><rect x="850" y="1166" width="30" height="164" fill="${K.woodSh}"/>`;
  const n = Math.floor(Math.min(9, Math.max(0, (t - 49.8) * 12)));
  for (let i = 0; i < n; i++) s += `<rect x="${700 + (i % 2) * 8}" y="${1110 - i * 16}" width="190" height="16" fill="#fffaf0" stroke="${K.ol}" stroke-width="4"/>`;
  if (n > 0) s += chip(795, 1110 - n * 16 - 50, 'PRÜFUNG', { size: 34, bg: K.red, a: fade(t, 49.9) });
  // the same mistake again
  const inner = `<path d="M -40 -30 l 80 60 m 0 -60 l -80 60" stroke="${K.red}" stroke-width="14" stroke-linecap="round" opacity="${f1(fade(t, 51.18, .15) * 100) / 100}"/>`
    + `<path d="M -40 70 l 80 60 m 0 -60 l -80 60" stroke="${K.red}" stroke-width="14" stroke-linecap="round" opacity="${f1(fade(t, 51.5, .15) * 100) / 100}"/>`;
  s += paper(470, 1050, 260, 200, { lines: 0, rot: -4, inner: `<g transform="scale(.6) translate(-80 -60)">${inner}</g>` + `<g transform="scale(.6) translate(90 -60)">${inner.replace(/51.18/g, '51.4')}</g>` });
  s += chip(540, 660, 'DIESELBEN FEHLER', { a: fade(t, 51.4), sc: pop(t, 51.4), bg: K.red, size: 46 });
  s += kid(300, 1330, .78, { aL: [40, 110], aR: [12, 6], mouth: t > 51.2 ? 'sad' : 'flat', brows: 'worried', tilt: -10 + Math.sin(t * 2) * 2, blink: (t % 2.4) < .12 ? 1 : 0 });
  return s;
}
