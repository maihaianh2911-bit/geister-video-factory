import { OL, P, R, ST, fig, shk, voigtBack, frame, cashBox, prog, eio, eout, lerp } from './lib.js';
// 38.2–41.24 Over Voigt's shoulder: he holds out his hand and demands; the clerk pushes the city strongbox across the counter; it opens on "Geldes".
export default function renderShot(t) {
  const reach = eout(prog(t, 38.3, 38.9));
  const push = eio(prog(t, 39.1, 39.8));
  const bx = lerp(700, 470, push);
  const land = shk(t, 39.8, 10, 9);
  const open = eout(prog(t, 40.05, 40.35));
  const tremble = 4 * Math.sin(t * 60);
  const handX = lerp(330, 400, reach), handY = lerp(1500, 1230, reach);
  return frame(t, `${R(0, 0, 1080, 1920, '#D9C49A')}${Array.from({ length: 9 }, (_, i) => `<path d="M 0 ${200 + i * 120} H 1080" stroke="#C7AF83" stroke-width="5"/>`).join('')}
    <rect x="300" y="420" width="560" height="760" fill="#BFAE8C" ${ST(7)}/>
    ${fig(640 + tremble, 1560, 1.35, { kind: 'cashier', aR: -15, aL: 8, bendR: -30, look: -14, eyeS: 1.6, brow: 'worried', mouth: t > 39.8 ? 'o' : 'frown', sweat: 1 })}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${320 + i * 74}" y="420" width="12" height="620" fill="${P.gold}" ${ST(3)}/>`).join('')}
    <rect x="280" y="1040" width="600" height="40" fill="${P.gold}" ${ST(5)}/>
    <rect x="-20" y="1160" width="1120" height="800" fill="${P.wood}" ${ST(7)}/><rect x="-20" y="1160" width="1120" height="36" fill="${P.woodHi}" ${ST(6)}/>
    ${cashBox(bx, 1080 + land, 1, open)}
    <path d="M 560 965 Q ${bx + 260} 960 ${bx + 150} 1060" stroke="${OL}" stroke-width="62" fill="none" stroke-linecap="round"/><path d="M 560 965 Q ${bx + 260} 960 ${bx + 150} 1060" stroke="${P.white}" stroke-width="50" fill="none" stroke-linecap="round"/><rect x="${bx + 132}" y="990" width="52" height="60" rx="10" fill="${P.black}" ${ST(4)}/><ellipse cx="${bx + 146}" cy="1070" rx="26" ry="30" fill="${P.skin}" ${ST(5)}/>
    <circle cx="${bx}" cy="1020" r="${260 * open}" fill="url(#kgold)" opacity="${.8 * open}"/>
    ${voigtBack(150, 1080, 1.05, -reach * 10)}
    <path d="M 290 1270 L ${handX} ${handY}" stroke="${OL}" stroke-width="72" stroke-linecap="round"/><path d="M 290 1270 L ${handX} ${handY}" stroke="${P.blue}" stroke-width="58" stroke-linecap="round"/>
    <rect x="${handX - 26}" y="${handY - 10}" width="52" height="28" fill="${P.red}" ${ST(4)} transform="rotate(-50 ${handX} ${handY})"/>
    <ellipse cx="${handX + 24}" cy="${handY - 18}" rx="36" ry="20" fill="${P.skin}" ${ST(5)}/>`);
}
