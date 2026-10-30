// 69.22–73.38: in cheese-making, selected mould cultures are used on purpose ("ausgewählte Pilzkulturen" 70.96–71.7) — a dropper adds the culture, a white rind grows over the fresh cheese ("eingesetzt" 72.54)
import { K, DEFS, BG, label, cam, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 70.6, 71.4)), drop = ein(prog(t, 71.4, 71.9)), g = eio(prog(t, 72.0, 73.2));
  const cheese = `<ellipse cx="540" cy="1140" rx="300" ry="100" fill="${K.cheese}" stroke="${K.ink}" stroke-width="5"/><rect x="240" y="1040" width="600" height="100" fill="${K.cheese}"/><ellipse cx="540" cy="1040" rx="300" ry="100" fill="${K.cheese}" stroke="${K.ink}" stroke-width="5"/><path d="M 240 1040 V 1140 M 840 1040 V 1140" stroke="${K.ink}" stroke-width="5"/>
    <g opacity="${f1(g)}"><ellipse cx="540" cy="1040" rx="${f1(300 * g)}" ry="${f1(100 * g)}" fill="${K.rind}" stroke="${K.ink}" stroke-width="4"/></g>`;
  const dropper = `<g transform="translate(540 ${f1(lerp(300, 620, d))})"><rect x="-26" y="-200" width="52" height="210" rx="16" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="-22" y="-80" width="44" height="86" rx="10" fill="#E8F4E0"/><path d="M -10 10 L 0 60 L 10 10 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><rect x="-36" y="-260" width="72" height="70" rx="24" fill="${K.teal}" stroke="${K.ink}" stroke-width="5"/></g>`;
  const dr = drop > 0 && drop < 1 ? `<circle cx="540" cy="${f1(lerp(690, 1030, drop))}" r="14" fill="#E8F4E0" stroke="${K.ink}" stroke-width="3"/>` : '';
  const sc = `${BG(K.room)}<rect x="-60" y="1200" width="1200" height="800" fill="${K.room2}"/>${cheese}${dr}${dropper}`;
  return `${DEFS}${cam(sc, 1.0, 540, 900)}${label(540, 230, 'PILZKULTUR', eio(prog(t, 71.6, 71.9)), K.tealD)}`;
}
