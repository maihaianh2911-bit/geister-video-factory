import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// layers: shirt, sweater, fleece, then the parka slide onto Jonas one after another
export default function renderShot(t) {
  const L = [['#BFC7CC', 49.45], ['#3E6FB0', 49.76], ['#B5523B', 50.05], [K.park, 50.35]];
  let s = '';
  L.forEach(([c, t0], i) => {
    const p = eout(prog(t, t0, t0 + .22));
    if (p <= 0) return;
    const y = lerp(-500, 0, p), w = 150 + i * 14;
    s += `<g transform="translate(540 ${f1(860 + y)})"><path d="M ${-w} 44 Q ${-w - 2} -8 -90 -20 L 90 -20 Q ${w + 2} -8 ${w} 44 L ${w + 24} 640 L ${-w - 24} 640 Z" fill="${c}" ${OL(6)}/>
      <path d="M -70 -20 Q 0 ${50 - i * 12} 70 -20" fill="none" stroke="${K.ol}" stroke-width="6"/></g>`;
  });
  const done = t > 50.55;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <ellipse cx="540" cy="900" rx="520" ry="600" fill="url(#kAmb)" opacity=".45"/>
  ${s}
  ${done ? '' : `<g transform="translate(540 ${f1(748 - 6 * Math.sin(t * 3))}) scale(1.05)">${jHead({ mouth: 'flat', blink: blinkAt(t), hatDown: 1 })}</g>`}
  ${done ? jonas(540, 860, 1.0, { aL: [8, 4], aR: [8, 4], hatDown: 1, mouth: 'smile', blink: blinkAt(t) }) : ''}
  ${FG(1420)}`;
}
