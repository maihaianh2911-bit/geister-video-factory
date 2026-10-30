// Shared wide operating-room set before anaesthesia (shots 1, 4, 6–8, 12, 31): table across the frame, du lying with head left,
// surgeon behind the table on the right, two helpers who walk in from the left. Fixed positions keep continuity between cuts.
import { room, lamp, table, lying, figure, saw, lerp, eio, cl } from './lib.js';

export const TOP = 1080;          // table top
export const HEAD = [241, 990];   // du's head centre (no lift)
// o.lift, o.face, o.jerk, o.armUp · o.saw: 'hand' | undefined, o.sawUp 0..1 (hand from tray to raised) · o.inA / o.inB 0..1 walk-in, o.gripA / o.gripB 0..1
// o.surg {face opts}, o.surgStep, o.over (svg over everything), o.sw lamp swing, o.armsA {aL, aR, heldR} overrides helper A's arms and draws them over du (shot 31)
export function orScene(t, o = {}) {
  const sw = o.sw ?? 2 * Math.sin(t * 1.1);
  // surgeon (behind the table)
  const su = cl(o.sawUp ?? 0), sx = 790, sy = 1330;
  const handR = [lerp(905, 925, su), lerp(1040, 790, su)], elbR = [lerp(900, 965, su), lerp(930, 935, su)];
  const sawSvg = o.saw === 'hand' ? saw(handR[0], handR[1], .72, lerp(100, 250, su)) : '';
  const surg = figure('surg', sx, sy, 1, { look: -.8, lookY: .5, brow: .2, ...(o.surg || {}), aR: [elbR, handR], heldR: sawSvg, aL: [[700, 900], [680, 1030]] });
  // helpers
  const ia = eio(cl(o.inA ?? 0)), ib = eio(cl(o.inB ?? 0)), ga = eio(cl(o.gripA ?? 0)), gb = eio(cl(o.gripB ?? 0));
  const j = o.jerk || 0;
  const ax = lerp(-260, 190, ia), bx = lerp(-200, 520, ib);
  const aA = o.armsA ? { ...o.armsA } : { aL: [[ax + lerp(-80, 120, ga), lerp(950, 890, ga)], [ax + lerp(-70, 175, ga), lerp(1060, 985 + j * .5, ga)]], aR: [[ax + lerp(110, 200, ga), lerp(950, 900, ga)], [ax + lerp(100, 260, ga), lerp(1070, 1000 + j * .5, ga)]], heldR: '' };
  const aB = { aL: [[bx + lerp(-110, -60, gb), lerp(950, 920, gb)], [bx + lerp(-100, 40, gb), lerp(1070, 1012 + j * .2, gb)]], aR: [[bx + lerp(110, 130, gb), lerp(950, 920, gb)], [bx + lerp(100, 170, gb), lerp(1070, 1012 + j * .2, gb)]] };
  const A = o.inA > 0 ? figure('helpA', ax, 1330, .95, { step: ia < 1 ? ia * 14 : 0, look: .7, lookY: .6, brow: .3 * ga, mouth: ga > .5 ? 'grit' : 'flat', noL: ga > .3 || !!o.armsA, noR: ga > .3 || !!o.armsA, ...aA }) : '';
  const B = o.inB > 0 ? figure('helpB', bx, 1330, .95, { step: ib < 1 ? ib * 16 : 0, look: .2, lookY: .7, brow: .3 * gb, mouth: gb > .5 ? 'grit' : 'flat', noL: gb > .3, noR: gb > .3, ...aB }) : '';
  const pat = lying(250, 1020.6, .9, { lift: o.lift || 0, jerk: j, face: { t, ...(o.face || {}) }, armUp: o.armUp || 0 });
  // once the hands reach the patient, the helpers' arms are drawn over the patient (hands resting on shoulder / sheet)
  const overA = o.inA > 0 && (ga > .3 || o.armsA) ? figure('helpA', ax, 1330, .95, { armsOnly: true, ...aA }) : '';
  const overB = o.inB > 0 && gb > .3 ? figure('helpB', bx, 1330, .95, { armsOnly: true, ...aB }) : '';
  return `${room(1400, 420, 600)}${lamp(380, 600, 1, sw)}${A}${B}${surg}${table(110, 970, TOP)}${pat}${overA}${overB}${o.over || ''}`;
}
