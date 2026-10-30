// Cover 0–1.3: Lea at the ice-cream counter, three-scoop cone beside her face, headline EIS ZU SCHNELL?
import { K, DEFS, parlour, counterFront, lea, cam, HL, prog, eout, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const z = lerp(1.1, 1, eout(prog(t, 0, .6)));
  const lift = eio(prog(t, .4, 1.3));
  const cone = { x: lerp(790, 760, lift), y: lerp(1010, 975, lift), rot: lerp(4, -8, lift) };
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'a', cone, look: 12, lookY: -2, eyes: 'open', eyeS: lerp(1, 1.15, lift), mouth: 'smile', brow: 'up', blink: blinkAt(t, 2) }) + counterFront(1236);
  const h = 1, hs = lerp(1.06, 1, eout(prog(t, 0, .4)));
  return `${DEFS}${cam(scene, z, 540, 800)}
    <g opacity="${h}" transform="translate(540 380) scale(${hs}) translate(-540 -380)">${HL('EIS ZU', 540, 300, 150, K.white, 18)}${HL('SCHNELL?', 540, 450, 150, K.pink, 18)}</g>`;
}
