// v102 bedroom window wall with trees outside (sharp), for Tuesday morning
import { K, f1, op, pool } from './lib.js';
import { tree } from './common.js';
const INK = K.ink;
export function windowWall(t, o = {}) {
  let s = `<defs><linearGradient id="v102ww" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8cbb8"/><stop offset="1" stop-color="#c2b49e"/></linearGradient><linearGradient id="v102wsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb6e8"/><stop offset="1" stop-color="#d6eef8"/></linearGradient></defs>`;
  s += `<rect x="-300" y="-300" width="1680" height="2520" fill="url(#v102ww)"/>`;
  const X = o.x || 420, Y = 300, W = 600, H = 860;
  s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="url(#v102wsk)"/>`;
  s += `<circle cx="${X + W - 120}" cy="${Y + 130}" r="60" fill="#fff6c8"/>` + pool(X + W - 120, Y + 130, 260, 260, '#fff3b0', .5);
  s += `<rect x="${X}" y="${Y + H - 200}" width="${W}" height="200" fill="#7fc46a"/>`;
  s += tree(X + 120, Y + H - 120, 1.1) + tree(X + 360, Y + H - 90, 1.3, '#3f9e45', '#62c25d') + tree(X + 560, Y + H - 140, .9);
  s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="none" stroke="#f6f1e6" stroke-width="26"/><path d="M ${X + W / 2} ${Y} V ${Y + H} M ${X} ${Y + H / 2} H ${X + W}" stroke="#f6f1e6" stroke-width="16"/>`;
  s += `<rect x="${X - 40}" y="${Y + H}" width="${W + 80}" height="34" fill="#f6f1e6" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M ${X - 90} ${Y - 40} C ${X - 50} ${Y + 300} ${X - 110} ${Y + 600} ${X - 70} ${Y + H + 120} L ${X - 10} ${Y + H + 120} C ${X - 30} ${Y + 600} ${X + 10} ${Y + 300} ${X - 20} ${Y - 40} Z" fill="#c25b4e"/>`;
  s += `<path d="M ${X + 190} ${Y + H} m 0 0 h 60 l -8 -70 h -44 z" fill="#b9714f" stroke="${INK}" stroke-width="4"/><circle cx="${X + 220}" cy="${Y + H - 100}" r="40" fill="#4f8a5b"/>`;
  s += `<rect x="-300" y="1260" width="1680" height="900" fill="#9a7a5a"/>`;
  s += pool(X + W / 2, Y + H / 2, 700, 700, '#fff3b0', .25);
  return s;
}
