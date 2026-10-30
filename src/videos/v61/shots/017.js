// 28.72–30.8: the signal reaches the brain — the brain registers the pain (Dein Gehirn spürt …)
import { K, DEFS, BG, headProfile, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const run = eio(prog(t, 28.75, 29.4)), lit = eout(prog(t, 29.3, 29.7));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'q', ice: 1, cold: .8, nerve: 1, branches: 1, pulse: lerp(.6, 1, run) + (run >= 1 ? 1 : 0), brain: lit * (.75 + .25 * Math.sin(t * 9)) })}</g>`;
  const z = lerp(1.12, 1.35, eio(prog(t, 28.72, 30.2)));
  return `${DEFS}${BG(K.bg)}${cam(head, z, 470, 640)}`;
}
