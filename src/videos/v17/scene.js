// @ts-nocheck
// AUTO-GENERATED scene for v17. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const SPANS = [[0.0, 2.16], [2.16, 5.935]];

function shotA(t, a, b, i) {           // person reacts, ghost pops up behind
  const p = prog(t, a, a + 0.5), g = back(prog(t, a + 0.6, a + 1.0));
  return `<rect width="1080" height="1920" fill="url(#gWall)"/><rect y="1300" width="1080" height="700" fill="url(#gFloor)"/>`
    + (g > 0 ? ghostX(lerp(900, 780, g), 820 - 10 * Math.sin(t * 3), 0.9 * g, { t, mouth: 'grin', brows: 'mean', aL: 120 }) : '')
    + personF(lerp(-200, 420, eout(p)), 1360, 0.95, { look: g > 0 ? 14 : 0, brow: g, mouth: g > 0 ? 'o' : 'flat', aR: g > 0 ? -150 : -12, lean: g > 0 ? -6 : 0 });
}
function shotB(t, a, b, i) {           // number of ghosts pops in, counted
  let s = '<rect width="1080" height="1920" fill="#0b1124"/>' + stars(50, i + 3);
  const n = 1 + (i % 5) * 2;
  for (let k = 0; k < n; k++) { const p = back(prog(t, a + 0.15 * k, a + 0.15 * k + 0.3)); if (p <= 0) continue;
    const an = -Math.PI + (k / Math.max(1, n - 1)) * Math.PI; s += ghostX(540 + 330 * Math.cos(an), 860 + 330 * Math.sin(an), 0.45 * p, { t: t + k }); }
  return s + earth(t, 540, 900, 160);
}
function shotC(t, a, b, i) {           // hallway, door shakes, vase wobbles
  return hallway(t, { vaseRot: 8 * ring(t, a + 0.3, 3, 2), bulge: Math.abs(ring(t, a + 0.3, 4, 3)) * 2 });
}
function scene(t) {
  let i = SPANS.findIndex(([a, b]) => t >= a && t < b); if (i < 0) i = SPANS.length - 1;
  const [a, b] = SPANS[i];
  return [shotA, shotB, shotC][i % 3](t, a, b, i);
}

const __style = {"dust": true, "vignette": true, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
