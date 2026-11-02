// L4b+c 19.28–22.3: living room 18:10 — du lowers the phone and thinks „Die Praxis hat jetzt bestimmt schon zu.“;
// then the stone ZAHNARZT drops into his backpack (lands 21.48) and he sags; counter 2.
import { K, frame, cam, home, person, shadow, thought, stone, impact, tableEdge, mug, phone, bigText, prog, eio, eout, ein, lerp, cl, pop, f1, packTop } from './lib.js';
export default function renderShot(t) {
  let s = home({ mood: 'evening', dx: 14 * eio(prog(t, 19.28, 22.3)), clock: [18, 10] });
  const X = 360, Y = 1600, S = 1.55, land = 21.48, load = .3;
  s += shadow(X, Y + 4, 190);
  const top = packTop(load);
  let packIn = '';
  if (t >= land - .5 && t < land + .05) { const p = prog(t, land - .5, land); packIn = stone(60, lerp(-1000, top + 30, ein(p)), .62, 'ZAHNARZT', { rot: lerp(-20, 8, p), size: 24 }); }
  const landed = t >= land;
  const dip = landed ? Math.sin(cl((t - land) / .45) * Math.PI) * .3 + .2 * cl((t - land) / .3) : 0;
  const lower = eio(prog(t, 19.3, 19.9));
  const ph = `<g transform="translate(${f1(lerp(150, 120, lower))} ${f1(lerp(-330, -200, lower))}) rotate(${f1(lerp(-10, 20, lower))}) scale(.42)"><rect x="-80" y="-150" width="160" height="300" rx="26" fill="${K.ink}"/><rect x="-68" y="-132" width="136" height="264" rx="14" fill="#2b2f36"/></g>`;
  s += person('du', X, Y, S, {
    t, seed: 1, load, nStones: landed ? 2 : 1, packIn, hunch: .1 + dip,
    eyes: landed && t < land + .5 ? 'wide' : 'n', brows: 'worried', mouth: landed ? 'sad' : 'flat',
    look: [lerp(10, -10, lower), lerp(-4, 10, lower)], armR: [lerp(150, 120, lower), lerp(-330, -200, lower)], hold: ph,
  });
  s += impact(t, land, X + 60 * S, Y + (top + 20) * S, 150);
  s += thought(720, 560, ['„Die Praxis hat jetzt', 'bestimmt schon zu.“'], 470, 820, { p: pop(t, 19.4, .45), a: 1 - eio(prog(t, 21.1, 21.4)), size: 44 });
  let fg = tableEdge(1730) + mug(860, 1730, 1.1, '#c25b4e', { t }) + `<rect x="420" y="1700" width="200" height="30" rx="6" fill="#e8dcc8" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s + fg, 500, 1000, 1.03 + .05 * eio(prog(t, 19.28, 22.3)));
  s += bigText(880, 330, '2', 190, { fill: K.yellow, p: pop(t, 21.22, .45), sw: 22 });
  return frame(s);
}
