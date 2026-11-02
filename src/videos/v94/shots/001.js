// L0 0–5.64 hook: evening living room. A yellow task note floats beside du ("Aufgabe"), he pushes it away ("aufschiebst"),
// it turns into a grey stone ("Stein") and drops into his backpack ("Rucksack") — he dips under the weight.
import { K, frame, cam, home, person, shadow, stone, dropStone, impact, tableEdge, mug, phone, bigText, T, prog, eio, eout, ein, lerp, cl, pop, f1, op } from './lib.js';
export default function renderShot(t) {
  const X = 400, Y = 1600, S = 1.55;
  let s = home({ mood: 'evening', dx: -10 * eio(prog(t, 0, 5.64)), clock: [20, 5] });
  s += shadow(X, Y + 4, 190);
  // the task note: appears 1.38, pushed 2.2, becomes stone 3.3, drops into pack, lands 4.5
  const push = eio(prog(t, 2.2, 2.9));
  const nx = lerp(780, 720, push), ny = 760 + Math.sin(t * 2) * 8;
  const morph = eio(prog(t, 3.25, 3.55));
  const land = 4.5;
  const local = (sx, sy) => [(sx - X) / S, (sy - Y) / S];
  let packIn = '';
  // stone travels from the note position over du's shoulder into the pack (drawn inside pack layer)
  if (t >= 3.9) {
    const [lx0, ly0] = local(nx, ny), lx1 = 112, ly1 = -404 + 30;
    const p = prog(t, 3.9, land);
    const lx = lerp(lx0, lx1, eio(p)), ly = lerp(ly0, ly1, ein(p)) - Math.sin(p * Math.PI) * 120;
    packIn = stone(lx, ly, .62, 'AUFGABE', { rot: lerp(0, 14, p), size: 24 });
  }
  const dip = t > land ? Math.max(0, Math.sin(cl((t - land) / .5) * Math.PI)) * .35 + .12 * cl((t - land) / .3) : 0;
  const pushing = t > 2.0 && t < 3.3;
  s += person('du', X, Y, S, {
    t, seed: 1, load: .1, nStones: 0, packIn, hunch: dip,
    eyes: t > land && t < land + .6 ? 'wide' : 'n', brows: t > land ? 'worried' : (t > 2.2 ? 'calm' : 'up'),
    mouth: t > land ? 'o' : (t > 2.2 && t < 3.3 ? 'flat' : 'smile'),
    look: t < 2.2 ? [12, -6] : (t < land ? [14, -10] : [10, -14]),
    armR: pushing ? [lerp(130, 230, push), lerp(-320, -360, push)] : null, rim: '#ffd98a',
  });
  if (t >= 1.38 && t < 3.9) {
    const p = pop(t, 1.38, .45), rot = lerp(-6, 18, push) + Math.sin(t * 3) * 3;
    if (morph < 1) s += `<g transform="translate(${f1(nx)} ${f1(ny)}) rotate(${f1(rot)}) scale(${f1(p * (1 - morph * .3) * 1000) / 1000})" opacity="${op(1 - morph)}"><rect x="-120" y="-90" width="240" height="180" rx="8" fill="${K.yellow}" stroke="${K.ink}" stroke-width="5"/><rect x="-120" y="-90" width="240" height="30" fill="#e8b92a" stroke="${K.ink}" stroke-width="5"/>${T(0, 18, 'AUFGABE', 40, { fill: K.ink })}<path d="M -80 52 H 80" stroke="${K.ink}" stroke-width="5" stroke-linecap="round" opacity=".5"/></g>`;
    if (morph > 0) s += stone(nx, ny, 1.0 * (0.8 + .2 * morph), 'AUFGABE', { rot: rot * .3, a: morph }) + impact(t, 3.3, nx, ny, 150);
  }
  s += impact(t, land, X + 112 * S, Y - 380 * S, 140);
  // sharp foreground: coffee table with mug, phone, keys
  let fg = tableEdge(1720) + mug(200, 1720, 1.1, '#f2efe8', { t }) + phone(560, 1702, .5, { rot: 84, lit: false }) + `<g transform="translate(860 1712)"><circle cx="0" cy="0" r="16" fill="none" stroke="#c9ccd2" stroke-width="6"/><rect x="10" y="-6" width="50" height="12" rx="4" fill="#d9b44a" stroke="${K.ink}" stroke-width="3"/></g>`;
  s = cam(s + fg, 520, 1000, 1 + .07 * eio(prog(t, 0, 5.64)));
  s += bigText(540, 215, 'JEDE AUFGABE', 92, { fill: '#fff', p: 1 }) + bigText(540, 325, '= EIN STEIN?', 92, { fill: K.yellow, p: pop(t, 0.2, .4) });
  return frame(s);
}
