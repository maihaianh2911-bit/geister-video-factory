// 0–4.92 hook: the grown-up "you" shrinks into a 6-year-old on "sechs"; golden memories bloom on "Erinnerungen"
import { K, kid, adult, headline, chip, glow, sparks, cloudPath, icon, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const sh = eio(prog(t, 1.52, 2.3));           // grown-up -> kid
  const mem = eout(prog(t, 3.82, 4.4));          // memories appear
  let s = `<rect width="1080" height="1920" fill="#f6dcc0"/><circle cx="540" cy="900" r="620" fill="#fbe9d2"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#e7bf95"/><rect x="0" y="1310" width="1080" height="24" fill="#fff4e2" stroke="${K.ol}" stroke-width="4"/>`;
  s += headline(t, 250, ['WIEDER 6 JAHRE ALT …'], 84, { mark: { word: '6', t: 1.52 } });
  s += headline(t, 360, ['… MIT ALLEN ERINNERUNGEN?'], 62, { t0: 3.82 });
  // height marks on the wall: grown-up vs. kid
  s += `<path d="M 170 1310 L 170 560" stroke="${K.ol}" stroke-width="5" opacity=".25"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M 150 ${1310 - i * 100} L 190 ${1310 - i * 100}" stroke="${K.ol}" stroke-width="5" opacity=".25"/>`;
  if (sh < 1) s += adult(540, 1310, .86 * lerp(1, .7, sh), { kind: 'man', top: K.shirt, hairC: K.hair, a: f1((1 - sh) * 100) / 100, mouth: 'smile' });
  if (sh > 0) {
    const sc = lerp(.6, 1, eout(prog(t, 1.6, 2.4)));
    s += `<g opacity="${f1(sh * 100) / 100}">${kid(540, 1310, sc, { aL: [14, 6], aR: [14, 6], mouth: t > 3.82 ? 'wow' : 'o', brows: 'up', look: [0, t > 3.82 ? -8 : 0] })}</g>`;
  }
  s += chip(800, 1080, '6 JAHRE', { a: fade(t, 1.8), sc: pop(t, 1.8), bg: K.red, size: 46 });
  if (mem > 0) {
    s += glow(540, 600, 300 * mem, K.gold, .55);
    s += `<g opacity="${f1(mem * 100) / 100}"><path d="${cloudPath(540, 600, 300 * mem, 170 * mem, 10)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="6"/>
      <circle cx="${540}" cy="${790}" r="${18 * mem}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="5"/><circle cx="${530}" cy="${830}" r="${10 * mem}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="4"/></g>`;
    const ic = [['cap', 400, 580], ['car', 540, 540], ['laptop', 680, 590], ['heart', 470, 670], ['plane', 620, 680]];
    ic.forEach(([n, x, y], i) => { s += icon(n, x, y, .8 * pop(t, 3.95 + i * .08), fade(t, 3.95 + i * .08, .2)); });
    s += sparks(t, 540, 600, 360, 10, 3, mem);
  }
  return s;
}
