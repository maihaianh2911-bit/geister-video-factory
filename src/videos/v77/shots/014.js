import { K, OL, card, antSide, bread, breadSide, yardSide, prog, eout, lerp } from './lib.js';
// 29.4–31.2 Macro side: at the bread an ant bites off a crumb and lifts it ("Nahrung").
export default function renderShot(t) {
  const bite = prog(t, 30.2, 30.56), lift = eout(prog(t, 30.56, 30.9));
  const turn = t > 30.9;
  return `${yardSide(1150)}${breadSide(760, 1150, 2.2)}
    ${t < 30.56 ? `<rect x="480" y="1120" width="44" height="30" rx="8" fill="${K.crumb}" ${OL(5)}/>` : ''}
    ${antSide(turn ? lerp(440, 300, prog(t, 30.9, 31.2)) : 420, 1150, 3.4, turn ? t * 14 : 0, { dir: turn ? -1 : 1, carry: t >= 30.56, ant: 12 * bite })}
    ${card(540, 380, 'NAHRUNG', 80, prog(t, 30.56, 30.8))}`;
}
