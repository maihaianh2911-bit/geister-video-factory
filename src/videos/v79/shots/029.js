// 132.24–138.28 close on him: lowered gaze, hesitation, a different answer — then the stamp "NERVOSITÄT IST KEIN BEWEIS"
import { K, TEXT, twoShot, cam, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const down = eio(prog(t, 133.65, 134.0)) * (1 - eio(prog(t, 134.6, 134.9))), hes = eio(prog(t, 134.9, 135.2)) * (1 - eio(prog(t, 135.5, 135.7)));
  const M = { look: -1 + down * .6, lookY: down, lid: .45 * down, dy: 14 * down, brow: .6, mouth: hes > .3 ? 'wavy' : 'tight', talk: talk(t, 135.6, 136.5, 9), blink: down > 0 ? 0 : blink(t, 2) };
  const W = { look: 1 };
  const base = cam(twoShot(t, W, M), 1.9, 780, 840);
  const items = [['BLICK SENKEN', 133.7], ['ZÖGERN', 134.94], ['ANDERS ANTWORTEN', 135.6]];
  let list = '';
  items.forEach(([w, tt], i) => { const a = pop(t, tt, .3); if (a > 0) list += `<g transform="translate(70 ${300 + i * 100}) scale(${a})"><rect x="0" y="-50" width="${w.length * 30 + 40}" height="80" rx="40" fill="${K.cream}" stroke="${K.ol}" stroke-width="5"/><text x="20" y="5" ${TEXT(42, K.ink, 'start')}>${w}</text></g>`; });
  const hesB = hes > 0 ? `<g opacity="${hes}"><text x="760" y="560" ${TEXT(90)}>…</text></g>` : '';
  const st = eout(prog(t, 136.62, 136.85));
  const stamp = st > 0 ? `<g transform="translate(540 1220) rotate(-4) scale(${lerp(1.6, 1, st)})" opacity="${st}"><rect x="-450" y="-150" width="900" height="270" rx="30" fill="${K.cream}" stroke="${K.red}" stroke-width="12"/><text y="-30" ${TEXT(80, K.red)}>NERVOSITÄT IST</text><text y="70" ${TEXT(80, K.red)}>KEIN BEWEIS</text></g>` : '';
  return base + list + hesB + stamp;
}
