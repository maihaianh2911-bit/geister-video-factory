// L12 55.78–58.76: living room in daylight; the girlfriend (bun, purple sweater) raises her hand and explains: a picture bubble shows her phone lying on the table at home (57.2); "Ist sie sauer auf mich?" dissolves on "vergessen" (57.88); du sighs with relief.
import { K, frame, cam, prog, eio, pop, person, shadow, f1 } from './lib.js';
import { room } from './sets.js';
import { cloud } from './clouds.js';
import { fgTable } from './fg.js';
const INK = K.ink;
function picBubble(x, y, tx, ty, p, t) {
  if (p <= 0) return '';
  const w = 380, h = 260;
  let inner = `<rect x="${-w / 2 + 10}" y="${-h / 2 + 10}" width="${w - 20}" height="${h - 20}" rx="36" fill="#f3e3c3"/><rect x="${-w / 2 + 10}" y="10" width="${w - 20}" height="${h / 2 - 20}" fill="#a8744a"/><rect x="${-w / 2 + 10}" y="4" width="${w - 20}" height="14" fill="#c9a26b"/>`;
  inner += `<rect x="-150" y="-100" width="90" height="80" fill="#bfe3f5" stroke="#fff" stroke-width="6"/><rect x="40" y="-90" width="40" height="70" rx="6" fill="#e0b04a"/>`;
  inner += `<g transform="translate(0 6) rotate(-8)"><rect x="-66" y="-16" width="132" height="30" rx="10" fill="#2e3440" stroke="${INK}" stroke-width="4"/><rect x="-56" y="-18" width="112" height="8" rx="4" fill="#4a5262"/></g>`;
  inner += `<text x="120" y="-40" font-family="Inter" font-weight="900" font-size="54" fill="#d9493f" text-anchor="middle" style="font-family:'Inter';font-weight:900">!</text>`;
  const c1 = [x + (tx - x) * .55, y + h / 2 + (ty - y - h / 2) * .45], c2 = [x + (tx - x) * .82, y + h / 2 + (ty - y - h / 2) * .8];
  const k = Math.max(.01, p);
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(k * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})"><circle cx="${f1(c2[0])}" cy="${f1(c2[1])}" r="12" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1[0])}" cy="${f1(c1[1])}" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="46" fill="#fff" stroke="${INK}" stroke-width="6"/>${inner}</g></g>`;
}
export default function renderShot(t) {
  let s = room(t, { mood: 'day', hh: 18, mm: 0, light: 1 });
  const gone = eio(prog(t, 57.9, 58.7)), raise = eio(prog(t, 55.9, 56.4)), rel = eio(prog(t, 58.0, 58.5));
  s += shadow(300, 1640) + shadow(760, 1640);
  s += person('gf', 300, 1640, 1, { t, seed: 4, look: [14, 0], brows: 'up', mouth: t > 56.0 && t < 58.2 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', armR: [lerp2(150, 230, raise), lerp2(-330, -640, raise)], elbowR: [260, -470] });
  s += person('du', 760, 1640, 1, { t, seed: 1, look: [-14, 0], brows: rel > .5 ? 'calm' : 'worried', mouth: rel > .5 ? 'smile' : 'small', eyes: rel > .5 ? 'happy' : 'n', headDy: -10 * rel });
  s += cloud(780, 520, 400, { t, seed: 21, dark: .6, lines: ['Ist sie sauer', 'auf mich?'], size: 38, gone });
  s += cloud(980, 280, 240, { t, seed: 31, dark: .5, q: true });
  s += picBubble(330, 470, 300, 760, pop(t, 57.16, .4), t);
  s += fgTable(t, { mugX: 880, steam: true });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 55.78, 58.76))));
}
const lerp2 = (a, b, p) => a + (b - a) * p;
