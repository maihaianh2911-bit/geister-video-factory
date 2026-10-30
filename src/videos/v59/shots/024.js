// 39.24–40.8: the dispatch screen of the fire brigade: a pin drops on the building, the reported facts light up beside it.
import { K, DEFS, FG, prog, back, eio, pin, icon, rings, TX } from './lib.js';
export default function renderShot(t) {
  const p = back(prog(t, 39.7, 39.95));
  const drop = 1 - eio(prog(t, 39.6, 39.9));
  const ic = [40.0, 40.12, 40.24, 40.36].map(x => back(prog(t, x, x + .18)));
  let grid = '';
  for (let i = 0; i < 12; i++) grid += `<path d="M ${120 + i * 70} 280 V 1100 M 120 ${280 + i * 70} H 960" stroke="#1B3B46" stroke-width="3"/>`;
  let blocks = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) blocks += `<rect x="${150 + c * 200}" y="${310 + r * 200}" width="150" height="140" rx="10" fill="${r === 1 && c === 2 ? '#2F5160' : '#173540'}" stroke="#2A5563" stroke-width="4"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#0B1015"/>
    <rect x="80" y="200" width="920" height="1160" rx="30" fill="#101C24" stroke="#2E3B44" stroke-width="14"/>
    <rect x="120" y="240" width="840" height="900" fill="#0F2730"/>${grid}${blocks}
    <path d="M 120 760 H 960 M 560 240 V 1140" stroke="#355E6C" stroke-width="22"/>
    ${rings(t, 39.9, 625, 580, K.red, 3, 200, 10)}
    ${pin(625, 580 - 400 * drop, 1.1 * (p || .01), K.red)}
    <g>${[icon.house, icon.floors, icon.people, icon.stairsSmoke].map((f, i) => ic[i] > 0 ? `<g transform="translate(${220 + i * 210} 1240) scale(${ic[i]})"><rect x="-80" y="-80" width="160" height="160" rx="20" fill="#16303A" stroke="${K.amb}" stroke-width="5"/>${f(0, 0, .9, '#fff')}</g>` : '').join('')}</g>
    ${FG(1430)}`;
}
