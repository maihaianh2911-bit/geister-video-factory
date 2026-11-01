// 8.04–10.9 mother calls from downstairs (bubble from the stairwell on "ruft"), school bag on "Schule"
import { K, kid, room, bubble, T, glow, fade, pop, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  let s = room();
  // open door at right with staircase going down
  s += `<rect x="560" y="560" width="400" height="760" fill="#5b4636" stroke="${K.ol}" stroke-width="8"/>`;
  s += `<rect x="580" y="580" width="360" height="740" fill="#f0c98e"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${600 + i * 18}" y="${1060 + i * 44}" width="${320 - i * 36}" height="44" fill="${i % 2 ? '#c98f5a' : '#b47a48'}" stroke="${K.ol}" stroke-width="4"/>`;
  s += `<path d="M 600 900 L 900 1300" stroke="${K.woodSh}" stroke-width="14"/>`;
  s += glow(760, 1200, 200, K.goldL, .55);
  s += `<path d="M 560 560 L 470 600 L 470 1360 L 560 1320 Z" fill="#c98f5a" stroke="${K.ol}" stroke-width="7"/><circle cx="490" cy="960" r="12" fill="${K.gold}" stroke="${K.ol}" stroke-width="4"/>`;
  // kid turns towards the door
  const turn = eio(prog(t, 8.48, 8.9));
  s += kid(250, 1320, .95, { aL: [10, 6], aR: [20, 8], mouth: t > 8.6 ? 'o' : 'flat', brows: t > 8.6 ? 'up' : 'calm', look: [14 * turn, 0], tilt: 6 * turn });
  // mother's call from below
  const b = fade(t, 8.48, .3);
  s += bubble(250, 300, 700, 230, [760, 1000], T(600, 395, '„Schatz, gleich', 58) + T(600, 470, 'musst du zur Schule!“', 58), { a: b, sc: .85 + .15 * pop(t, 8.48) });
  // school bag on the floor next to the kid
  const sb = pop(t, 10.12);
  s += `<g opacity="${f1(fade(t, 10.12, .25) * 100) / 100}" transform="translate(420 1290) scale(${f1(sb * 100) / 100})">
    <rect x="-70" y="-150" width="140" height="150" rx="26" fill="${K.red}" stroke="${K.ol}" stroke-width="6"/>
    <rect x="-70" y="-150" width="140" height="70" rx="26" fill="#b83a31" stroke="${K.ol}" stroke-width="6"/>
    <rect x="-16" y="-98" width="32" height="26" rx="6" fill="${K.gold}" stroke="${K.ol}" stroke-width="4"/>
    <rect x="-50" y="-50" width="100" height="22" rx="6" fill="#fff" opacity=".7"/></g>`;
  return s;
}
