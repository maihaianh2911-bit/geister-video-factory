// 74.48–79.164: you get up again ("stehst wieder auf" 74.62–75.1), pull off the covers ("Bezüge ab" 75.94–76.32) and take them to the wash ("Wäsche" 77.44).
// Wide: stand → right hand grips the pillowcase and pulls it off the pillow → left hand pulls the sheet up → both are gathered into one bundle held in both hands → walk to the washer.
// Close-up (cut at 77.40, you look down at the washer): right hand pulls the door open by its handle and lets it swing → both hands push the bundle into the drum and let go →
// left hand pushes the door back and it swings shut. Nothing passes through a closed door.
import { K, OL, f1, stick, walkFeet, joint, cam, prog, eio, ein, lerp, cl } from './lib.js';
import { bedroom, pillow, washer, FY, FS } from './sets.js';

const CUT = 77.4;
const bundleSvg = (x, y, s = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(s).toFixed(3)})"><path d="M -90 -50 Q 0 -90 90 -50 Q 120 0 90 50 Q 0 80 -90 50 Q -120 0 -90 -50 Z" fill="${K.sheet}" ${OL(6)}/><path d="M -50 -20 q 50 30 100 0" stroke="${K.white}" stroke-width="8" fill="none"/><path d="M -70 20 q 30 -16 60 6" stroke="${K.pillow}" stroke-width="14" fill="none" stroke-linecap="round"/></g>`;

function wide(t) {
  const up = eio(prog(t, 74.6, 75.2));
  const reach = eio(prog(t, 75.25, 75.62)), pull = eio(prog(t, 75.62, 76.1));
  const sp = eio(prog(t, 75.95, 76.4)), gather = eio(prog(t, 76.4, 76.7));
  const w = prog(t, 76.7, 77.4), walking = t > 76.7;
  const x = walking ? lerp(420, 560, eio(w)) : 420;
  const [fL, fR] = walking && w < 1 ? walkFeet(x, FY, w * 3, 70, FS) : [[x - 34 * FS, FY], [x + 34 * FS, FY]];
  // pillowcase: slides off the pillow to the right, its right edge in the right hand
  const caseX = 250 + 200 * pull, caseEdge = [caseX + 130, 975];
  const caseSvg = gather < 1 ? `<g opacity="${f1(1 - gather)}"><g transform="translate(${f1(caseX)} 980) scale(${f1(1.1 - .35 * pull)} 1.1)"><path d="M -120 -40 Q -130 -60 -100 -62 H 100 Q 130 -60 120 -40 V 40 Q 130 60 100 62 H -100 Q -130 60 -120 40 Z" fill="${K.pillow}" ${OL()}/></g></g>` : '';
  // fitted sheet: peels off the mattress towards the left hand
  const sheetHand = [lerp(330, x + 40, sp), lerp(1040, 1000, sp)];
  const xl = lerp(110, sheetHand[0] - 90, sp), xr = lerp(990, sheetHand[0] + 90, sp);
  const sheetSvg = sp > 0 && gather < 1 ? `<path d="M ${f1(xl)} 1110 Q ${f1(xl)} ${f1(lerp(1020, 990, sp))} ${f1(sheetHand[0] - 40)} ${f1(sheetHand[1] - 30)} L ${f1(sheetHand[0] + 40)} ${f1(sheetHand[1] - 30)} Q ${f1(xr)} ${f1(lerp(1020, 990, sp))} ${f1(xr)} 1110 Z" fill="${K.sheet}" opacity="${f1(1 - gather)}" ${OL()}/>` : '';
  const bx = x + 110, by = 1000;
  const bundle = gather > 0 ? bundleSvg(lerp(lerp(caseEdge[0], sheetHand[0], .5), bx, gather), by, .6 + .4 * gather) : '';
  let hL, hR;
  if (gather > 0) { hL = [lerp(sheetHand[0], bx - 60, gather), by]; hR = [lerp(caseEdge[0], bx + 60, gather), by]; }
  else if (t > 75.95) { hL = sheetHand; hR = caseEdge; }
  else if (t > 75.25) { hL = [lerp(260, x - 80, up), lerp(980, 1100, up)]; hR = [lerp(x + 80, caseEdge[0], reach), lerp(1110, caseEdge[1], reach)]; }
  else { hL = [lerp(260, x - 80, up), lerp(980, 1100, up)]; hR = [x + 80, 1110]; }
  const fig = stick(x, FY, FS, { shirt: K.white, look: walking ? 1 : -1, lookY: .5, mouth: 'flat', brow: 'calm', fL, fR, hL, hR });
  const bedSheet = sp <= 0;
  return cam(`${bedroom({ stripped: !bedSheet })}${pillow(250, 980, 1.1, false)}${caseSvg}${sheetSvg}${washer(900, FY, { full: false })}${fig}${bundle}`, 1, 560, 1000);
}

const SL = [300, 1980], SR = [780, 1980], AL = 470;
const armPOV = (sh, h, bend) => {
  const [ex, ey, hx, hy] = joint(sh[0], sh[1], h[0], h[1], AL, AL, bend);
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="86" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${K.white}" stroke-width="70" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="44" fill="${K.skin || '#F2C9A0'}" ${OL(6)}/>`;
};
function close(t) {
  const DC = [540, 860], R = 220;
  // door: hinge on the left; open 0 (shut) .. 1 (swung wide to the left)
  const pullOpen = eio(prog(t, 77.7, 77.92)) * .6, swingOpen = eio(prog(t, 77.92, 78.1)) * .4;
  const pushShut = eio(prog(t, 78.72, 78.92)) * .6, swingShut = eio(prog(t, 78.92, 79.06)) * .4;
  const open = cl(pullOpen + swingOpen - pushShut - swingShut);
  const cx = lerp(DC[0], 330, open), rx = lerp(R, 40, open);
  const handle = [cx + rx - 26, DC[1]];
  // bundle: held low in both hands, pushed into the drum, released at 78.45
  const push = eio(prog(t, 78.08, 78.45)), inDrum = t >= 78.45;
  const bpos = [DC[0], lerp(1240, DC[1], push)], bs = lerp(1.6, .9, push);
  let hR, hL;
  if (t < 77.7) { const r = eio(prog(t, 77.45, 77.7)); hR = [lerp(bpos[0] + 110, handle[0], r), lerp(bpos[1], handle[1], r)]; hL = [bpos[0] - 110, bpos[1]]; }
  else if (t < 77.92) { hR = handle; hL = [bpos[0] - 110, bpos[1]]; }
  else if (t < 78.45) { const back = eio(prog(t, 77.92, 78.08)); hR = [lerp(handle[0], bpos[0] + 100, back), lerp(handle[1], bpos[1], back)]; hL = [bpos[0] - 100, bpos[1]]; }
  else {
    const wd = eio(prog(t, 78.45, 78.6)), toDoor = eio(prog(t, 78.55, 78.72));
    hR = [lerp(DC[0] + 100, 760, wd), lerp(DC[1], 1500, wd)];
    const edge = [cx + rx - 10, DC[1] + 40];
    hL = t < 78.92 ? [lerp(lerp(DC[0] - 100, 420, wd), edge[0], toDoor), lerp(lerp(DC[1], 1400, wd), edge[1], toDoor)] : [lerp(edge[0], 380, eio(prog(t, 78.92, 79.1))), lerp(edge[1], 1450, eio(prog(t, 78.92, 79.1)))];
  }
  const body = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.bg}"/><rect x="130" y="380" width="820" height="1600" rx="40" fill="${K.white}" ${OL(8)}/><rect x="130" y="380" width="820" height="150" rx="36" fill="${K.paper}" ${OL(7)}/><circle cx="800" cy="455" r="34" fill="${K.grey}" ${OL(5)}/><rect x="220" y="430" width="300" height="50" rx="12" fill="#BFE1F2" ${OL(5)}/>
    <circle cx="${DC[0]}" cy="${DC[1]}" r="${R + 30}" fill="#DDE3EA" ${OL(7)}/><circle cx="${DC[0]}" cy="${DC[1]}" r="${R - 30}" fill="#2B3A4A" ${OL(6)}/>
    ${inDrum ? `<circle cx="${DC[0]}" cy="${DC[1] + 20}" r="${R - 50}" fill="${K.sheet}" ${OL(5)}/><path d="M ${DC[0] - 90} ${DC[1] + 10} q 60 40 150 -10" stroke="${K.pillow}" stroke-width="18" fill="none"/>` : ''}`;
  const door = `<ellipse cx="${f1(cx)}" cy="${DC[1]}" rx="${f1(rx)}" ry="${R}" fill="${K.water}" ${OL(7)}/><ellipse cx="${f1(cx)}" cy="${DC[1]}" rx="${f1(rx * .74)}" ry="${R * .74}" fill="${inDrum && open < .2 ? K.sheet : '#BFE1F2'}" opacity=".9" ${OL(5)}/><rect x="${f1(handle[0] - 12)}" y="${DC[1] - 50}" width="24" height="100" rx="10" fill="${K.grey}" ${OL(4)}/>`;
  const bundle = !inDrum ? bundleSvg(bpos[0], bpos[1], bs) : '';
  // while being pushed in, the bundle is in front of the open door; before that it is low, below the door
  return `${body}${door}${armPOV(SL, hL, -1)}${armPOV(SR, hR, 1)}${bundle}`;
}

export default function renderShot(t) { return t < CUT ? wide(t) : close(t); }
