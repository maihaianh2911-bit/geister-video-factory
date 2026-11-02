// L5b 27.26–31.66: "Überall heißt es …": three cards (magazine, phone, poster) pop up one after another, each promising "21 TAGE!";
// the big question 21 TAGE? appears on "einundzwanzig Tagen" (29.07) and is struck out with a red cross on "fertig" (30.88).
import { K, frame, cam, prog, eio, pop, label, T, f1, phone } from './lib.js';
import { room } from './sets.js';
const INK = K.ink;
function card(kind, p) {
  if (p <= 0) return '';
  let g = '';
  if (kind === 'mag') g = `<rect x="-150" y="-200" width="300" height="400" rx="10" fill="#f2c14e" stroke="${INK}" stroke-width="6"/>${T(0, -120, 'MAGAZIN', 36, { fill: K.txt })}${T(0, 10, '21 TAGE!', 58, { fill: '#d9493f' })}<rect x="-110" y="60" width="220" height="12" rx="6" fill="#c9a03a"/><rect x="-110" y="90" width="160" height="12" rx="6" fill="#c9a03a"/>`;
  if (kind === 'phone') g = phone(0, 0, 1.3, 0, '#eef2f6', `${T(0, -40, 'NEUE', 26, { fill: K.txt })}${T(0, 0, 'GEWOHNHEIT', 22, { fill: K.txt })}${T(0, 50, '21 TAGE!', 32, { fill: '#d9493f' })}`);
  if (kind === 'poster') g = `<rect x="-170" y="-130" width="340" height="260" rx="10" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/>${T(0, -50, 'IN NUR', 34, { fill: K.txt })}${T(0, 30, '21 TAGEN', 60, { fill: '#2f7fb5' })}${T(0, 90, 'ZUR GEWOHNHEIT', 26, { fill: K.txt })}`;
  return `<g transform="scale(${f1(Math.max(.01, p) * 1000) / 1000})" opacity="${Math.min(1, p * 2).toFixed(2)}">${g}</g>`;
}
export default function renderShot(t) {
  let s = room(t, { mood: 'day', strong: true, hh: 8, mm: 0 }) + `<rect x="-200" y="-200" width="1480" height="2320" fill="#1d1a20" opacity=".35"/>`;
  const dim = eio(prog(t, 29.0, 29.4));
  s += `<g opacity="${(1 - .55 * dim).toFixed(2)}"><g transform="translate(260 760) rotate(-8)">${card('mag', pop(t, 27.3, .4))}</g><g transform="translate(800 700) rotate(7)">${card('phone', pop(t, 27.75, .4))}</g><g transform="translate(560 1160) rotate(-3)">${card('poster', pop(t, 28.2, .4))}</g></g>`;
  s = cam(s, 540, 960, 1.0 + .05 * eio(prog(t, 27.26, 31.66)));
  const bp = pop(t, 29.07, .45);
  s += label('21 TAGE?', 540, 560, 150, { p: bp });
  const x = eio(prog(t, 30.88, 31.25));
  if (x > 0) s += `<path d="M 230 400 L ${f1(230 + 620 * Math.min(1, x * 2))} ${f1(400 + 230 * Math.min(1, x * 2))}" stroke="#d9493f" stroke-width="30" stroke-linecap="round"/>` + (x > .5 ? `<path d="M 850 400 L ${f1(850 - 620 * (x - .5) * 2)} ${f1(400 + 230 * (x - .5) * 2)}" stroke="#d9493f" stroke-width="30" stroke-linecap="round"/>` : '');
  return frame(s);
}
