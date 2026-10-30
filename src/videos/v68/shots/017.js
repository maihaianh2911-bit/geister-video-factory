// 41.9–44.52: a fingertip presses gently on the egg — it gives a little ("leicht eindrücken") and springs back
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { closeBG, egg } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 42.8, 43.5)) * (1 - eio(prog(t, 43.9, 44.4)));
  const fx = lerp(lerp(1000, 672, eio(prog(t, 41.9, 42.6))), 648, p);
  const finger = `<path d="M 1180 ${940 - 40} L ${f1(fx + 40)} 940" fill="none" ${OL(54)}/><circle cx="${f1(fx + 22)}" cy="940" r="30" fill="${K.ink}"/>`;
  const plate = `<ellipse cx="540" cy="1150" rx="330" ry="60" fill="#FFFFFF" ${OL(7)}/>`;
  return `${closeBG({ gy: 1175 })}${plate}${egg(540, 960, 3.2, { id: 'e17', shell: 0, w: 7, dent: p })}${finger}`;
}
