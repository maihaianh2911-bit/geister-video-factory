// @ts-nocheck
// AUTO-GENERATED scene for v38. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v38 — Letzte Zigarette. Friendly clean health explainer: pastel room, teal, organ pink, navy outlines, organs with faces.
const P = { teal: '#2EC4B6', tealDk: '#1E9C90', pink: '#FF8FA3', pinkDk: '#E0607A', navy: '#16324F', room: '#EAF6F4', roomDk: '#CFE7E3', yellow: '#FFD166', orange: '#F4A259', smoke: '#A9B4BE', smokeDk: '#7D8994', paper: '#EADBC0', paperSh: '#D8C5A3', paperDk: '#C9B28A', ink: '#16324F', red: '#B23A2E', redHi: '#D0503F', olive: '#6B7B4B', oliveHi: '#8A9A63', brown: '#8A6E52', brownDk: '#6A523B',
  blue: '#24324F', blueHi: '#3A4C74', blueSol: '#33507F', blueSolHi: '#4C6C9F', brick: '#A8452F', brickSh: '#82341F', brickHi: '#C2603F', stone: '#E2CFAA', stoneSh: '#BFA77E',
  gold: '#D9A441', goldHi: '#F1CE78', silver: '#C9CED6', skin: '#F1C6A5', skinSh: '#D9A383', black: '#2A2421', white: '#FBF4E4', grey: '#9A968F', greyHi: '#C9C4BA',
  sky: '#F3E6C8', sky2: '#E6CFA0', grass: '#8E9C5C', grassSh: '#6F7D45', beer: '#E3A93A', foam: '#FFF8E6', bronze: '#8C6235', bronzeHi: '#C08B4F', bronzeSh: '#5E3F22',
  coat: '#7A5A3E', coatSh: '#5E432D', wood: '#9B6B43', woodHi: '#B8845A', woodSh: '#6E4A2E', steel: '#55606E', green: '#4E6B4A', greenHi: '#6C8C66' };
const OL = P.ink;
const FONT = `font-family:'Inter';font-weight:900`;
const ST = (w = 5) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pop = (t, t0, d = .25) => back(prog(t, t0, t0 + d));
const shk = (t, t0, a, dec = 8, f = 41) => t < t0 ? 0 : a * Math.exp(-(t - t0) * dec) * Math.sin((t - t0) * f);
const TX = (x, y, sz, txt, fill, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" style="${FONT};font-size:${sz}px;letter-spacing:${o.ls || 0}px" fill="${fill}"${o.sw ? ` stroke="${o.sc || OL}" stroke-width="${o.sw}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${txt}</text>`;
const G = (tr, inner) => `<g transform="${tr}">${inner}</g>`;
const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

// ---------- characters ----------
const KIND = {
  man: { coat: '#8E99A6', coatHi: '#A9B3BE', collar: '#8E99A6', pants: '#3D4F66', hoodie: 1, hat: 'none', hair: 'short', hairC: '#6B4A33', moust: 'stubble', hem: -250, sleeve: 205 },
  manRed: { coat: '#8E99A6', coatHi: '#A9B3BE', collar: '#8E99A6', pants: '#3D4F66', hoodie: 1, hat: 'none', hair: 'short', hairC: '#6B4A33', moust: 'stubble', hem: -250, sleeve: 205 },
  aerztin: { coat: '#FFFFFF', coatHi: '#FFFFFF', collar: '#2EC4B6', shirt: '#2EC4B6', pants: '#2E5A7A', steth: 1, hat: 'none', hair: 'bun', hairC: '#2E2420', moust: 'none', hem: -120, sleeve: 205 },
  arzt: { coat: '#FFFFFF', coatHi: '#FFFFFF', collar: '#7FB7E6', shirt: '#7FB7E6', pants: '#3D4F66', steth: 1, hat: 'none', hair: 'short', hairC: '#B9B4AA', moust: 'small', glasses: 1, hem: -130, sleeve: 205 },
  voigt: { coat: P.blue, coatHi: P.blueHi, collar: P.red, cuff: P.red, pants: P.black, stripe: P.red, buttons: P.gold, epaul: P.silver, sash: P.silver, sword: 1, hat: 'pickel', hair: '#B9B4AA', moust: 'walrus', thin: 1, hem: -200, sleeve: 226 },
  voigtCiv: { coat: '#6F6A5E', coatHi: '#86806F', collar: P.white, pants: '#4F4A42', hat: 'cap', capC: '#4F4A42', hair: '#B9B4AA', moust: 'walrus', thin: 1, hem: -215, patch: 1, sleeve: 210 },
  voigtShoe: { coat: '#D8CBB0', coatHi: '#E8DDC6', collar: '#D8CBB0', pants: '#4F4A42', apron: P.brown, hat: 'cap', capC: '#4F4A42', hair: '#B9B4AA', moust: 'walrus', thin: 1, hem: -225, sleeve: 210 },
  voigtLate: { coat: P.coat, coatHi: '#957154', collar: P.white, pants: '#4F4A42', buttons: P.coatSh, hat: 'bowler', hair: '#B9B4AA', moust: 'walrus', thin: 1, hem: -205, sleeve: 210 },
  soldier: { coat: P.blueSol, coatHi: P.blueSolHi, collar: P.red, cuff: P.red, pants: P.black, buttons: P.gold, belt: P.black, hat: 'pickel', hair: '#6A4A30', moust: 'none', hem: -228, sleeve: 205 },
  police: { coat: '#1F2B3E', coatHi: '#33435E', collar: '#1F2B3E', cuff: '#1F2B3E', pants: P.black, buttons: P.silver, belt: P.white, hat: 'pickel', spike: P.silver, hair: '#4A3524', moust: 'small', hem: -222, sleeve: 205 },
  mayor: { coat: '#2B2726', coatHi: '#45403C', collar: P.white, shirt: P.white, pants: '#2B2726', chain: 1, hat: 'none', hair: 'bald', hairC: '#E9E4DA', moust: 'whiskers', hem: -150, sleeve: 205, wide: 1 },
  secretary: { coat: '#6B6E6A', coatHi: '#858884', collar: P.white, shirt: P.white, pants: '#4A4C4A', hat: 'none', hair: 'part', hairC: '#3A2E26', moust: 'none', glasses: 1, thin: 1, hem: -220, sleeve: 205 },
  cashier: { coat: P.white, coatHi: '#FFFFFF', collar: P.white, vest: P.brown, guards: 1, pants: '#3E3832', hat: 'visor', hair: 'bald', hairC: '#7A5A3E', moust: 'small', hem: -250, sleeve: 205 },
  cellmate: { coat: '#5B5246', coatHi: '#726858', collar: '#5B5246', pants: '#3E3832', hat: 'cap', capC: '#3A3530', hair: '#2E2620', moust: 'stubble', patch: 1, hem: -225, sleeve: 205 },
  judge: { coat: P.black, coatHi: '#3D3530', collar: P.white, bands: 1, pants: P.black, hat: 'beret', hair: '#D8D3C8', moust: 'none', hem: -40, sleeve: 205, wide: 1 },
  buyerA: { coat: '#7B8F6A', coatHi: '#93A781', collar: P.white, pants: '#4A443C', hat: 'straw', hair: '#5A3E2A', moust: 'none', hem: -230, sleeve: 205 },
  buyerB: { coat: '#8E4E46', coatHi: '#A8665D', collar: P.white, pants: '#3E3832', hat: 'bowler', hair: '#2E2620', moust: 'small', hem: -228, sleeve: 205 },
  buyerC: { coat: '#4E6B8A', coatHi: '#6A87A6', collar: P.white, pants: '#3A3A44', hat: 'bonnet', hair: '#8A5A34', moust: 'none', skirt: 1, hem: -30, sleeve: 205 },
  dealer: { coat: '#6E7F5A', coatHi: '#879870', collar: P.white, vest: P.brownDk, pants: '#3E3832', hat: 'none', hair: 'bald', hairC: '#5A4A3A', moust: 'small', glasses: 1, hem: -230, sleeve: 205 },
  kaiser: { coat: '#566477', coatHi: '#6F7E93', collar: P.red, cuff: P.red, pants: P.black, buttons: P.gold, epaul: P.gold, sash: P.gold, hat: 'pickel', spike: P.silver, hair: '#5A4636', moust: 'kaiser', hem: -215, sleeve: 205 },
  tourist: { coat: '#D2643F', coatHi: '#E57E58', collar: '#D2643F', pants: '#3E5A7A', hat: 'none', hair: 'short', hairC: '#3A2A20', moust: 'none', hem: -250, sleeve: 205 },
};

function hat(type, k, s = {}) {
  const spk = k.spike || P.gold;
  switch (type) {
    case 'pickel': return `<path d="M -62 -566 Q -66 -650 0 -656 Q 66 -650 62 -566 Z" fill="${P.black}" ${ST()}/>
      <path d="M -66 -566 Q 0 -548 76 -560 L 70 -574 Q 0 -566 -60 -578 Z" fill="${P.black}" ${ST(5)}/>
      <path d="M -50 -620 Q -30 -645 -8 -648" stroke="#5a504a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M -10 -655 L -7 -706 Q 0 -716 7 -706 L 10 -655 Z" fill="${spk}" ${ST(4)}/><ellipse cx="0" cy="-656" rx="18" ry="7" fill="${spk}" ${ST(4)}/>
      <path d="M 0 -630 l 14 10 l -4 18 l 10 6 l -20 16 l -20 -16 l 10 -6 l -4 -18 Z" fill="${spk}" ${ST(3)}/>
      <path d="M -60 -566 Q -52 -520 -40 -505 M 60 -566 Q 52 -520 40 -505" stroke="${spk}" stroke-width="5" fill="none"/>`;
    case 'cap': return `<path d="M -58 -575 Q -60 -625 0 -628 Q 60 -625 62 -575 Z" fill="${k.capC || '#4F4A42'}" ${ST()}/><path d="M -10 -578 Q 40 -572 80 -566 Q 60 -584 30 -588 Z" fill="${k.capC || '#4F4A42'}" ${ST(5)}/>`;
    case 'bowler': return `<path d="M -48 -590 Q -50 -655 0 -658 Q 50 -655 48 -590 Z" fill="${P.black}" ${ST()}/><ellipse cx="0" cy="-588" rx="74" ry="14" fill="${P.black}" ${ST(5)}/><path d="M -47 -606 Q 0 -596 47 -606" stroke="#5a4a40" stroke-width="7" fill="none"/>`;
    case 'beret': return `<path d="M -60 -585 Q -70 -640 0 -645 Q 70 -640 60 -585 Q 0 -575 -60 -585 Z" fill="${P.black}" ${ST()}/>`;
    case 'visor': return `<path d="M -56 -590 Q 0 -606 56 -590 L 70 -566 Q 0 -578 -70 -566 Z" fill="#4F7A52" ${ST(5)} opacity=".95"/><path d="M -56 -590 Q 0 -600 56 -590" stroke="#2E4A30" stroke-width="10" fill="none"/>`;
    case 'straw': return `<ellipse cx="0" cy="-588" rx="84" ry="16" fill="#E2C27A" ${ST(5)}/><path d="M -46 -590 L -44 -632 Q 0 -642 44 -632 L 46 -590 Z" fill="#E2C27A" ${ST(5)}/><rect x="-45" y="-610" width="90" height="12" fill="${P.red}"/>`;
    case 'bonnet': return `<path d="M -66 -540 Q -78 -640 0 -650 Q 78 -640 66 -540 Q 56 -600 0 -606 Q -56 -600 -66 -540 Z" fill="#C9B0D6" ${ST(5)}/><circle cx="46" cy="-612" r="12" fill="${P.red}" ${ST(3)}/>`;
    default: return '';
  }
}

function fig(x, y, s, o = {}) {
  const k = KIND[o.kind || 'voigt'];
  const walking = o.walk !== undefined;
  const w = o.walk || 0, wa = walking ? (o.walkA ?? 24) : 0;
  const legA = wa * Math.sin(w), bob = walking ? -9 * Math.abs(Math.sin(w)) : 0;
  const th = k.thin ? .84 : k.wide ? 1.14 : 1;
  const sh = 74 * th, hem = k.hem;
  const aL = o.aL ?? 8, aR = o.aR ?? -8;
  const lk = o.look || 0, lky = o.lookY || 0;
  const leg = (sx, a) => `<g transform="rotate(${a} ${sx} -250)"><rect x="${sx - 21}" y="-262" width="42" height="240" rx="12" fill="${k.pants}" ${ST()}/>${k.stripe ? `<rect x="${sx - 3}" y="-250" width="6" height="222" fill="${k.stripe}"/>` : ''}<path d="M ${sx - 25} -36 L ${sx + 23} -36 Q ${sx + 40} -10 ${sx + 34} 0 L ${sx - 27} 0 Z" fill="${P.black}" ${ST(5)}/></g>`;
  const SL = k.sleeve || 205;
  const U = SL * .5, F = SL * .5;
  const arm = (side, ang, bend) => {
    const sx = side * (sh - 4);
    return `<g transform="rotate(${ang} ${sx} -452)"><rect x="${sx - 19}" y="-472" width="38" height="${U + 34}" rx="17" fill="${k.coat}" ${ST()}/>
      <g transform="rotate(${bend} ${sx} ${-452 + U})"><rect x="${sx - 19}" y="${-452 + U - 22}" width="38" height="${F + 28}" rx="17" fill="${k.coat}" ${ST()}/>
      ${k.cuff ? `<rect x="${sx - 19}" y="${-452 + U + F - 22}" width="38" height="26" rx="6" fill="${k.cuff}" ${ST(4)}/>` : ''}
      ${k.guards ? `<rect x="${sx - 20}" y="${-452 + U + F - 70}" width="40" height="72" rx="10" fill="${P.black}" ${ST(4)}/>` : ''}
      <circle cx="${sx}" cy="${-452 + U + F + 8}" r="${k.sleeve > 215 ? 17 : 20}" fill="${P.skin}" ${ST(5)}/></g></g>`;
  };
  const hp = (side, ang, bend) => { const r = ang * Math.PI / 180, r2 = (ang + bend) * Math.PI / 180, sx = side * (sh - 4); return [sx - U * Math.sin(r) - (F + 8) * Math.sin(r2), -452 + U * Math.cos(r) + (F + 8) * Math.cos(r2)]; };
  const bL = o.bendL || 0, bR = o.bendR || 0;
  const [lx, ly] = hp(-1, aL, bL), [rx, ry] = hp(1, aR, bR);
  // torso
  const coat = `<path d="M ${-sh} -470 Q ${-sh - 12} -468 ${-sh - 12} -436 L ${-sh * 1.06 - 6} ${hem} Q 0 ${hem + 10} ${sh * 1.06 + 6} ${hem} L ${sh + 12} -436 Q ${sh + 12} -468 ${sh} -470 Z" fill="${k.coat}" ${ST()}/>
    <path d="M ${sh - 6} -440 L ${sh * 1.04} ${hem + 10}" stroke="${k.coatHi}" stroke-width="12" opacity=".7"/>`;
  let det = '';
  if (k.hoodie) det += `<path d="M -50 -470 Q 0 -420 50 -470" fill="none" ${ST(5)}/><path d="M -14 -452 V -400 M 14 -452 V -400" stroke="${P.white}" stroke-width="5"/><path d="M -60 -330 L 60 -330 L 50 -268 L -50 -268 Z" fill="${k.coatHi}" ${ST(4)}/>`;
  if (k.steth) det += `<path d="M -30 -470 Q -44 -380 -6 -360 Q 30 -380 30 -470" fill="none" stroke="${P.navy}" stroke-width="6"/><circle cx="-6" cy="-352" r="12" fill="${P.silver}" ${ST(4)}/>`;
  if (k.apron) det += `<path d="M -48 -420 L 48 -420 L 64 -150 Q 0 -138 -64 -150 Z" fill="${k.apron}" ${ST(5)}/><path d="M -48 -420 L -60 -470 M 48 -420 L 60 -470" stroke="${P.brownDk}" stroke-width="8"/>`;
  if (k.vest) det += `<path d="M -54 -460 L 54 -460 L 60 -258 L -60 -258 Z" fill="${k.vest}" ${ST(5)}/><path d="M 0 -460 V -258" stroke="${P.brownDk}" stroke-width="4"/>`;
  if (k.shirt) det += `<path d="M -22 -470 L 22 -470 L 8 -330 L -8 -330 Z" fill="${k.shirt}" ${ST(4)}/>`;
  if (k.bands) det += `<path d="M -8 -470 L -12 -410 L -2 -410 Z M 8 -470 L 12 -410 L 2 -410 Z" fill="${P.white}" ${ST(3)}/>`;
  if (k.buttons) for (let i = 0; i < 6; i++) det += `<circle cx="${k.sash ? 6 : 0}" cy="${-445 + i * 34}" r="7" fill="${k.buttons}" stroke="${OL}" stroke-width="3"/>`;
  if (k.belt) det += `<rect x="${-sh * 1.03 - 4}" y="-312" width="${2 * sh * 1.03 + 8}" height="22" fill="${k.belt}" ${ST(4)}/><rect x="-16" y="-316" width="32" height="30" rx="4" fill="${k.buttons || P.silver}" ${ST(3)}/>`;
  if (k.sash) det += `<rect x="${-sh * 1.03 - 4}" y="-318" width="${2 * sh * 1.03 + 8}" height="20" fill="${k.sash}" ${ST(4)}/><path d="M -10 -298 L -14 -250 M 4 -298 L 6 -256" stroke="${k.sash}" stroke-width="8"/>`;
  if (k.chain) det += `<path d="M -48 -462 Q -40 -380 0 -360 Q 40 -380 48 -462" fill="none" stroke="${P.gold}" stroke-width="9" stroke-dasharray="10 5"/><circle cx="0" cy="-350" r="17" fill="${P.gold}" ${ST(4)}/>`;
  if (k.patch) det += `<rect x="${sh * .25}" y="-360" width="34" height="30" fill="${k.coatHi}" ${ST(3)} transform="rotate(8 ${sh * .3} -345)" stroke-dasharray="6 4"/>`;
  if (k.epaul) det += `<ellipse cx="${-sh + 4}" cy="-468" rx="28" ry="12" fill="${k.epaul}" ${ST(4)}/><ellipse cx="${sh - 4}" cy="-468" rx="28" ry="12" fill="${k.epaul}" ${ST(4)}/>`;
  if (k.skirt) det += `<path d="M ${-sh * 1.06 - 6} -230 L ${-sh * 1.4} -20 L ${sh * 1.4} -20 L ${sh * 1.06 + 6} -230 Z" fill="${k.coat}" ${ST()}/>`;
  const sword = k.sword && !o.noSword ? `<path d="M ${-sh * .7} -300 L ${-sh * 1.25} -40" stroke="${P.silver}" stroke-width="14" stroke-linecap="round"/><path d="M ${-sh * .7} -300 L ${-sh * 1.25} -40" stroke="${OL}" stroke-width="3" fill="none"/><path d="M ${-sh * .62} -330 l -16 -6 l -6 26 Z" fill="${P.gold}" ${ST(3)}/>` : '';
  // head
  const hd = o.headDy || 0, tilt = o.headTilt || 0;
  const fx = k.thin ? .9 : k.wide ? 1.08 : 1;
  let hair = '';
  if (k.hair === 'bald') hair = `<path d="M -50 -560 Q -58 -530 -48 -515 M 50 -560 Q 58 -530 48 -515" stroke="${k.hairC}" stroke-width="16" stroke-linecap="round" fill="none"/>`;
  else if (k.hair === 'part') hair = `<path d="M -50 -560 Q -52 -612 0 -612 Q 52 -612 50 -560 Q 20 -600 -6 -596 Q -30 -590 -50 -560 Z" fill="${k.hairC}" ${ST(4)}/>`;
  else if (k.hair === 'bun') hair = `<circle cx="0" cy="-622" r="30" fill="${k.hairC}" ${ST(4)}/><path d="M -54 -530 Q -60 -612 0 -614 Q 60 -612 54 -530 Q 46 -585 0 -588 Q -46 -585 -54 -530 Z" fill="${k.hairC}" ${ST(4)}/>`;
  else if (k.hair === 'short') hair = `<path d="M -50 -555 Q -56 -615 0 -614 Q 56 -615 50 -555 Q 40 -590 0 -592 Q -40 -590 -50 -555 Z" fill="${k.hairC}" ${ST(4)}/>`;
  else hair = `<path d="M -50 -560 Q -56 -520 -46 -512 M 50 -560 Q 56 -520 46 -512" stroke="${k.hair}" stroke-width="14" stroke-linecap="round" fill="none"/>`;
  const eyeS = o.eyeS || 1, blink = o.blink ? .15 : 1;
  const eyes = eyeS > 1.2
    ? `<ellipse cx="${-20 + lk}" cy="${-552 + lky}" rx="${11 * eyeS * .8}" ry="${13 * eyeS * .8 * blink}" fill="${P.white}" ${ST(3)}/><ellipse cx="${20 + lk}" cy="${-552 + lky}" rx="${11 * eyeS * .8}" ry="${13 * eyeS * .8 * blink}" fill="${P.white}" ${ST(3)}/><circle cx="${-20 + lk * 1.3}" cy="${-552 + lky}" r="5" fill="${OL}"/><circle cx="${20 + lk * 1.3}" cy="${-552 + lky}" r="5" fill="${OL}"/>`
    : `<ellipse cx="${-20 + lk}" cy="${-552 + lky}" rx="6" ry="${8 * blink}" fill="${OL}"/><ellipse cx="${20 + lk}" cy="${-552 + lky}" rx="6" ry="${8 * blink}" fill="${OL}"/>`;
  const br = o.brow || 'calm';
  const brows = br === 'up' ? `M ${-32 + lk} -578 Q ${-20 + lk} -588 ${-8 + lk} -580 M ${8 + lk} -580 Q ${20 + lk} -588 ${32 + lk} -578`
    : br === 'angry' ? `M ${-32 + lk} -578 L ${-8 + lk} -568 M ${8 + lk} -568 L ${32 + lk} -578`
      : br === 'worried' ? `M ${-32 + lk} -568 L ${-8 + lk} -578 M ${8 + lk} -578 L ${32 + lk} -568`
        : `M ${-32 + lk} -572 Q ${-20 + lk} -578 ${-8 + lk} -572 M ${8 + lk} -572 Q ${20 + lk} -578 ${32 + lk} -572`;
  const browC = k.hair === 'bald' ? k.hairC : (typeof k.hair === 'string' && k.hair[0] === '#' ? k.hair : k.hairC);
  const m = o.mouth || 'flat';
  const mx = lk * .6;
  const mouth = m === 'o' ? `<ellipse cx="${mx}" cy="-500" rx="11" ry="14" fill="${P.black}" ${ST(3)}/>`
    : m === 'smile' ? `<path d="M ${-16 + mx} -504 Q ${mx} -490 ${16 + mx} -504" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : m === 'grin' ? `<path d="M ${-20 + mx} -506 Q ${mx} -484 ${20 + mx} -506 Z" fill="${P.white}" ${ST(4)}/>`
        : m === 'frown' ? `<path d="M ${-15 + mx} -494 Q ${mx} -506 ${15 + mx} -494" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`
          : m === 'laugh' ? `<path d="M ${-22 + mx} -508 Q ${mx} -470 ${22 + mx} -508 Z" fill="${P.black}" ${ST(4)}/><path d="M ${-10 + mx} -488 Q ${mx} -482 ${10 + mx} -488" stroke="#d66" stroke-width="6"/>`
            : `<path d="M ${-12 + mx} -499 L ${12 + mx} -499" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`;
  let must = '';
  const mc = k.moust === 'whiskers' ? k.hairC : (k.hair && k.hair[0] === '#' ? k.hair : '#7A6A5A');
  if (k.moust === 'walrus') must = `<path d="M ${-44 + mx} -506 Q ${-30 + mx} -532 ${mx} -520 Q ${30 + mx} -532 ${44 + mx} -506 Q ${36 + mx} -498 ${26 + mx} -508 Q ${12 + mx} -512 ${mx} -508 Q ${-12 + mx} -512 ${-26 + mx} -508 Q ${-36 + mx} -498 ${-44 + mx} -506 Z" fill="${P.greyHi}" ${ST(4)}/>`;
  else if (k.moust === 'small') must = `<path d="M ${-22 + mx} -512 Q ${mx} -526 ${22 + mx} -512 Q ${mx} -508 ${-22 + mx} -512 Z" fill="${mc}" ${ST(3)}/>`;
  else if (k.moust === 'whiskers') must = `<path d="M -52 -545 Q -60 -500 -30 -492 Q -36 -520 -44 -548 Z M 52 -545 Q 60 -500 30 -492 Q 36 -520 44 -548 Z" fill="${mc}" ${ST(3)}/><path d="M ${-26 + mx} -512 Q ${mx} -528 ${26 + mx} -512 Q ${mx} -506 ${-26 + mx} -512 Z" fill="${mc}" ${ST(3)}/>`;
  else if (k.moust === 'kaiser') must = `<path d="M ${mx} -518 Q ${-28 + mx} -528 ${-48 + mx} -548 Q ${-36 + mx} -522 ${mx} -510 Q ${36 + mx} -522 ${48 + mx} -548 Q ${28 + mx} -528 ${mx} -518 Z" fill="#5A4636" ${ST(3)}/>`;
  else if (k.moust === 'stubble') { for (let i = 0; i < 14; i++) must += `<circle cx="${-30 + (i % 7) * 10 + mx}" cy="${-492 + Math.floor(i / 7) * 12}" r="2.2" fill="#5a4a3a"/>`; }
  const glasses = k.glasses ? `<circle cx="${-20 + lk}" cy="${-552 + lky}" r="15" fill="#fff" fill-opacity=".25" ${ST(4)}/><circle cx="${20 + lk}" cy="${-552 + lky}" r="15" fill="#fff" fill-opacity=".25" ${ST(4)}/><path d="M ${-5 + lk} -552 L ${5 + lk} -552" ${ST(4)}/>` : '';
  const cheek = k.thin ? `<path d="M -34 -530 Q -30 -516 -36 -506 M 34 -530 Q 30 -516 36 -506" stroke="${P.skinSh}" stroke-width="4" fill="none"/>` : '';
  const sweat = o.sweat ? `<path d="M 44 -580 q 8 14 0 20 q -8 -6 0 -20 Z" fill="#cfe6f2" ${ST(3)}/>` : '';
  const H = hat(o.hat ?? k.hat, k);
  const head = `<g transform="translate(0 ${hd}) rotate(${tilt} 0 -480)">${k.hoodie ? `<path d="M -70 -470 Q -90 -540 -60 -560 L 60 -560 Q 90 -540 70 -470 Z" fill="${k.coat}" ${ST(5)}/>` : ''}
    <rect x="-17" y="-512" width="34" height="46" fill="${P.skinSh}" ${ST(5)}/>
    <ellipse cx="${-48 * fx}" cy="-545" rx="11" ry="15" fill="${P.skin}" ${ST(4)}/><ellipse cx="${48 * fx}" cy="-545" rx="11" ry="15" fill="${P.skin}" ${ST(4)}/>
    <ellipse cx="0" cy="-548" rx="${50 * fx}" ry="${k.wide ? 64 : 61}" fill="${P.skin}" ${ST()}/>
    ${hair}${cheek}
    <path d="${brows}" stroke="${browC || '#6a5a4a'}" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${eyes}${glasses}
    <path d="M ${2 + lk * .7} -548 Q ${14 + lk * .8} -526 ${-2 + lk * .7} -522" stroke="${P.skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${mouth}${must}${sweat}${H}</g>`;
  const collar = `<rect x="-36" y="-484" width="72" height="22" rx="6" fill="${k.collar}" ${ST(4)}/>`;
  const legs = leg(-30 * th, legA) + leg(30 * th, -legA);
  const fl = o.flip ? -1 : 1;
  return `<g transform="translate(${x} ${y + bob * s}) scale(${s * fl} ${s})${o.rot ? ` rotate(${o.rot} 0 -300)` : ''}">
    ${o.shadow === false ? '' : `<ellipse cx="0" cy="2" rx="${110 * th}" ry="18" fill="${P.ink}" opacity=".18"/>`}
    ${legs}${o.backL ? o.backL(lx, ly) : ''}${o.backR ? o.backR(rx, ry) : ''}${coat}${det}${sword}${collar}
    ${arm(-1, aL, bL)}${arm(1, aR, bR)}${head}${o.propL ? o.propL(lx, ly) : ''}${o.propR ? o.propR(rx, ry) : ''}${o.extra || ''}</g>`;
}

// props in figure-local coordinates (always upright)
const rifle = (hx, hy) => `<g transform="translate(${hx} ${hy})"><rect x="-9" y="-360" width="16" height="300" rx="5" fill="${P.steel}" ${ST(4)}/><path d="M -12 -70 L 10 -70 L 16 70 L -16 70 Z" fill="${P.wood}" ${ST(4)}/><path d="M -3 -360 L 0 -460 L 3 -360 Z" fill="${P.silver}" ${ST(3)}/></g>`;
const mugP = (sz = 1, tiltD = 0, full = 1) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${tiltD}) scale(${sz})"><path d="M -28 -10 L 28 -10 L 24 70 L -24 70 Z" fill="${P.beer}" ${ST(5)}/><path d="M 28 5 Q 54 10 50 35 Q 46 55 26 52" fill="none" ${ST(7)}/>${full ? `<path d="M -34 -10 Q -30 -34 -10 -28 Q 0 -42 14 -30 Q 34 -36 34 -10 Z" fill="${P.foam}" ${ST(4)}/>` : ''}<path d="M -14 4 L -14 56" stroke="#F6CE74" stroke-width="7"/></g>`;
const paperP = (open = 1, w = 150) => (hx, hy) => `<g transform="translate(${hx} ${hy - 20})"><rect x="${-w * open / 2}" y="-120" width="${w * open + 8}" height="170" fill="${P.white}" ${ST(4)}/>${open > .6 ? `<path d="M ${-w * .35} -90 h ${w * .65} M ${-w * .35} -64 h ${w * .55} M ${-w * .35} -38 h ${w * .6}" stroke="${P.brown}" stroke-width="6"/><circle cx="${w * .22}" cy="10" r="20" fill="${P.red}" ${ST(4)}/>` : ''}</g>`;
const cigP = (lit = 1, len = 1) => (hx, hy) => `<g transform="translate(${hx + 6} ${hy - 12}) rotate(-20)"><rect x="0" y="-6" width="${70 * len}" height="12" rx="4" fill="${P.white}" ${ST(3)}/><rect x="0" y="-6" width="18" height="12" fill="${P.orange}" ${ST(3)}/>${lit ? `<circle cx="${70 * len}" cy="0" r="7" fill="#FF6B3D"/>` : ''}</g>`;
const cupP = (tiltD = 0) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${tiltD})"><path d="M -30 -40 L 30 -40 L 24 30 L -24 30 Z" fill="${P.teal}" ${ST(5)}/><path d="M 30 -26 Q 54 -20 48 0 Q 44 14 26 12" fill="none" ${ST(6)}/></g>`;
const hammerP = (rot) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${rot})"><rect x="-7" y="-10" width="14" height="80" rx="5" fill="${P.wood}" ${ST(4)}/><rect x="-28" y="58" width="56" height="26" rx="4" fill="${P.steel}" ${ST(4)}/></g>`;
const swordP = (rot) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${rot})"><path d="M -4 0 L -4 -300 L 0 -320 L 4 -300 L 4 0 Z" fill="${P.silver}" ${ST(4)}/><rect x="-22" y="-6" width="44" height="12" rx="4" fill="${P.gold}" ${ST(3)}/></g>`;

// ---------- defs, organ characters, sets ----------
const KDEFS = `<defs>
<linearGradient id="ksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE9F2"/><stop offset="1" stop-color="#F3FBFA"/></linearGradient>
<radialGradient id="kglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
<radialGradient id="kpinkglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF8FA3" stop-opacity=".55"/><stop offset="1" stop-color="#FF8FA3" stop-opacity="0"/></radialGradient>
<radialGradient id="ktealglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2EC4B6" stop-opacity=".5"/><stop offset="1" stop-color="#2EC4B6" stop-opacity="0"/></radialGradient>
<linearGradient id="kvessel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9475F"/><stop offset=".5" stop-color="#F07C92"/><stop offset="1" stop-color="#C9475F"/></linearGradient>
</defs>`;

// face for organ characters (local coords, centred)
function face(s, mood = 'happy', o = {}) {
  const lk = o.look || 0, bl = o.blink ? .15 : 1;
  const eyeR = mood === 'shock' ? 15 : 11;
  let eyes = `<ellipse cx="${-28 + lk}" cy="-6" rx="${eyeR}" ry="${eyeR * 1.25 * bl}" fill="${P.navy}"/><ellipse cx="${28 + lk}" cy="-6" rx="${eyeR}" ry="${eyeR * 1.25 * bl}" fill="${P.navy}"/>`;
  if (bl === 1) eyes += `<circle cx="${-24 + lk}" cy="-11" r="4" fill="#fff"/><circle cx="${32 + lk}" cy="-11" r="4" fill="#fff"/>`;
  if (mood === 'tired' || mood === 'sad') eyes += `<path d="M ${-42 + lk} -20 L ${-14 + lk} -14 M ${14 + lk} -14 L ${42 + lk} -20" stroke="${P.navy}" stroke-width="6" stroke-linecap="round"/>`;
  if (mood === 'angry') eyes += `<path d="M ${-44 + lk} -30 L ${-14 + lk} -18 M ${14 + lk} -18 L ${44 + lk} -30" stroke="${P.navy}" stroke-width="7" stroke-linecap="round"/>`;
  if (mood === 'strong') eyes += `<path d="M ${-44 + lk} -28 L ${-14 + lk} -22 M ${14 + lk} -22 L ${44 + lk} -28" stroke="${P.navy}" stroke-width="7" stroke-linecap="round"/>`;
  const m = { happy: `<path d="M -18 18 Q 0 36 18 18" stroke="${P.navy}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    strong: `<path d="M -22 16 Q 0 40 22 16 Z" fill="${P.white}" stroke="${P.navy}" stroke-width="5"/>`,
    tired: `<path d="M -16 26 Q 0 16 16 26" stroke="${P.navy}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    sad: `<path d="M -16 28 Q 0 14 16 28" stroke="${P.navy}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    angry: `<path d="M -16 24 L 16 24" stroke="${P.navy}" stroke-width="7" stroke-linecap="round"/>`,
    shock: `<ellipse cx="0" cy="24" rx="12" ry="15" fill="${P.navy}"/>` }[mood] || '';
  const cheeks = mood === 'happy' || mood === 'strong' ? `<ellipse cx="-46" cy="14" rx="12" ry="7" fill="${P.pinkDk}" opacity=".45"/><ellipse cx="46" cy="14" rx="12" ry="7" fill="${P.pinkDk}" opacity=".45"/>` : '';
  return `<g transform="scale(${s})">${eyes}${cheeks}${m}${o.sweat ? `<path d="M 50 -40 q 9 16 0 22 q -9 -6 0 -22 Z" fill="#BFE6F2" ${ST(3)}/>` : ''}</g>`;
}
const HEART = 'M 0 150 C -60 110 -170 40 -170 -50 C -170 -120 -110 -160 -60 -160 C -25 -160 0 -135 0 -110 C 0 -135 25 -160 60 -160 C 110 -160 170 -120 170 -50 C 170 40 60 110 0 150 Z';
function heart(x, y, s, beat, mood = 'happy', o = {}) {
  const b = 1 + .08 * beat;
  const col = o.grey ? '#B7A3A8' : P.pink;
  return `<g transform="translate(${x} ${y}) scale(${s * b})">
    <path d="M -40 -150 Q -50 -230 -10 -250 M 30 -150 Q 40 -220 90 -230" stroke="${o.grey ? '#9C8C90' : P.pinkDk}" stroke-width="34" fill="none" stroke-linecap="round"/>
    <path d="${HEART}" fill="${col}" ${ST(6)}/><path d="M -120 -90 Q -120 -130 -80 -138" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/>
    <g transform="translate(0 -10)">${face(1.1, mood, o)}</g></g>`;
}
function lungs(x, y, s, breath, mood = 'happy', o = {}) {
  const b = 1 + .1 * breath;
  const col = o.grey ? '#B9A9AC' : P.pink;
  const lobe = sx => `<path d="M ${sx * 30} -150 Q ${sx * 160} -170 ${sx * 180} 20 Q ${sx * 190} 170 ${sx * 60} 170 Q ${sx * 30} 160 ${sx * 30} 60 Z" fill="${col}" ${ST(6)}/><path d="M ${sx * 60} -60 Q ${sx * 110} -10 ${sx * 100} 80 M ${sx * 50} 0 Q ${sx * 80} 40 ${sx * 140} 50" stroke="${o.grey ? '#9C8C90' : P.pinkDk}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s * b} ${s * (1 + .06 * breath)})">
    <path d="M 0 -260 V -130 M 0 -130 L -40 -100 M 0 -130 L 40 -100" stroke="${P.white}" stroke-width="30" stroke-linecap="round"/><path d="M 0 -260 V -130" ${ST(5)} fill="none"/>
    <g transform="scale(${1})">${lobe(-1)}${lobe(1)}</g>
    <g transform="translate(-100 20)">${face(.8, mood, o)}</g><g transform="translate(100 20)">${face(.8, mood, o)}</g>
    ${o.arms ? `<path d="M -175 0 Q -250 -40 -240 -120" stroke="${col}" stroke-width="36" fill="none" stroke-linecap="round"/><circle cx="-240" cy="-130" r="30" fill="${col}" ${ST(5)}/><path d="M 175 0 Q 250 -40 240 -120" stroke="${col}" stroke-width="36" fill="none" stroke-linecap="round"/><circle cx="240" cy="-130" r="30" fill="${col}" ${ST(5)}/>` : ''}</g>`;
}
function rbc(x, y, s, mood = 'happy', o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <ellipse rx="110" ry="90" fill="#E5485F" ${ST(6)}/><ellipse rx="66" ry="46" fill="#C9354C" opacity=".55"/>
    <g transform="rotate(${-(o.rot || 0)})">${face(.9, mood, o)}</g></g>`;
}
function co(x, y, s, o = {}) { // grey carbon monoxide: C + O
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})" opacity="${o.op ?? 1}"><circle cx="-26" cy="0" r="34" fill="#5E6670" ${ST(5)}/><circle cx="28" cy="0" r="30" fill="${P.smoke}" ${ST(5)}/>
    ${TX(-26, 12, 34, 'C', '#fff')}${TX(28, 11, 30, 'O', P.navy)}
    ${o.mean ? `<path d="M -44 -22 L -14 -12 M 10 -14 L 42 -22" stroke="#fff" stroke-width="5"/>` : ''}</g>`;
}
function o2(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})" opacity="${o.op ?? 1}"><circle cx="-24" cy="0" r="28" fill="${P.teal}" ${ST(5)}/><circle cx="24" cy="0" r="28" fill="${P.teal}" ${ST(5)}/>${TX(-24, 10, 28, 'O', '#fff')}${TX(24, 10, 28, 'O', '#fff')}</g>`;
}
function nico(x, y, s, o = {}) {
  let d = ''; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; d += `${i ? 'L' : 'M'} ${Math.cos(a) * 40} ${Math.sin(a) * 40} `; }
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})" opacity="${o.op ?? 1}"><path d="${d}Z" fill="#C79A55" ${ST(5)}/><circle r="12" fill="#8C6A35"/></g>`;
}
function brain(x, y, s, mood = 'happy', o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -170 40 Q -200 -60 -140 -110 Q -120 -180 -40 -170 Q 0 -210 50 -175 Q 130 -190 150 -110 Q 210 -60 175 30 Q 180 110 100 120 Q 40 150 -20 125 Q -100 150 -140 100 Q -190 90 -170 40 Z" fill="${P.pink}" ${ST(6)}/>
    <path d="M -110 -110 Q -70 -80 -100 -40 M -30 -150 Q -10 -110 -40 -80 M 60 -150 Q 40 -110 70 -80 M 120 -90 Q 90 -60 130 -20 M 0 -170 V 110" stroke="${P.pinkDk}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g transform="translate(0 10)">${face(1, mood, o)}</g>
    ${o.flex ? `<path d="M 165 30 Q 250 40 250 -40" stroke="${P.pink}" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M 165 30 Q 250 40 250 -40" stroke="${P.navy}" stroke-width="5" fill="none"/><circle cx="215" cy="0" r="${30 + 8 * o.flex}" fill="${P.pink}" ${ST(5)}/><circle cx="252" cy="-60" r="26" fill="${P.pink}" ${ST(5)}/>` : ''}</g>`;
}
function badge(t, label, p) {
  if (!label) return '';
  const w = label.length * 34 + 110;
  return `<g transform="translate(60 120) scale(${.85 + .15 * p})"><rect x="0" y="0" width="${w}" height="96" rx="48" fill="${P.navy}"/><circle cx="48" cy="48" r="30" fill="${P.white}"/>
    <path d="M 48 30 V 48 L 62 56" stroke="${P.navy}" stroke-width="6" fill="none" stroke-linecap="round" transform="rotate(${t * 90} 48 48)"/>${TX(92, 64, 50, label, P.white, { anchor: 'start', ls: 2 })}</g>`;
}
function room() {
  return `${R(0, 0, 1080, 1920, P.room)}${Array.from({ length: 10 }, (_, i) => `<path d="M ${i * 120 + 30} 0 V 1920" stroke="${P.roomDk}" stroke-width="4"/>`).join('')}`;
}
function balcony(t) { // Altbau facade + sky behind the man
  let win = '';
  for (const [x, y] of [[60, 300], [820, 300], [60, 820], [820, 820]]) win += `<rect x="${x}" y="${y}" width="200" height="330" rx="12" fill="#9CC9D6" stroke="#F3E3C4" stroke-width="16"/><path d="M ${x + 100} ${y} V ${y + 330} M ${x} ${y + 140} H ${x + 200}" stroke="#F3E3C4" stroke-width="10"/>`;
  return `${R(0, 0, 1080, 1920, 'url(#ksky)')}<rect x="0" y="0" width="1080" height="1500" fill="#F6E6C8"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M 0 ${120 + i * 250} H 1080" stroke="#E8D3AE" stroke-width="10"/>`).join('')}${win}
    <rect x="330" y="200" width="420" height="1100" fill="#D9EFEF" ${ST(6)}/><path d="M 540 200 V 1300" ${ST(6)}/>`;
}
function railing(y) {
  let s = `<rect x="-20" y="${y}" width="1120" height="26" fill="${P.navy}"/>`;
  for (let x = 10; x < 1100; x += 70) s += `<rect x="${x}" y="${y}" width="12" height="400" fill="${P.navy}"/><circle cx="${x + 6}" cy="${y + 200}" r="18" fill="none" stroke="${P.navy}" stroke-width="7"/>`;
  return s + `<rect x="-20" y="${y + 400}" width="1120" height="600" fill="#C9D6D9" ${ST(5)}/>`;
}
function smoke(t, x, y, n = 6, k = 1) { let s = ''; for (let i = 0; i < n; i++) { const a = ((t * .8 + i / n) % 1); s += `<circle cx="${x + 30 * Math.sin(a * 6 + i) + a * 40}" cy="${y - a * 300 * k}" r="${12 + a * 46 * k}" fill="${P.smoke}" opacity="${.7 * (1 - a)}"/>`; } return s; }
function vessel(t, speed = 1, wide = 1, ox = 0) {
  return `${R(0, 0, 1080, 1920, '#7E2335')}${Array.from({ length: 10 }, (_, i) => `<circle cx="${((i * 260 - t * 300 * speed) % 1400 + 1400) % 1400 - 160}" cy="${300 + 1200 * hash(i)}" r="${60 + 40 * hash(i + 2)}" fill="#9A2F45" opacity=".6"/>`).join('')}
    <rect x="-20" y="${960 - 520 * wide}" width="1120" height="${1040 * wide}" fill="url(#kvessel)" ${ST(6)}/>`;
}
function check(x, y, s, col = '#2DBE6C') { return `<path transform="translate(${x} ${y}) scale(${s})" d="M -30 0 L -8 22 L 34 -26" stroke="${col}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
function cross(x, y, s, col = '#E5485F') { return `<path transform="translate(${x} ${y}) scale(${s})" d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="${col}" stroke-width="14" stroke-linecap="round"/>`; }
function card(x, y, w, h, inner, p = 1, rot = 0) { if (p <= 0) return ''; return `<g transform="translate(${x} ${y}) scale(${p}) rotate(${rot})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="${P.white}" ${ST(6)}/>${inner}</g>`; }
function riskBar(x, y, w, frac, col, label) { return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${w}" height="56" rx="28" fill="#E4ECEF" ${ST(5)}/><rect x="4" y="4" width="${Math.max(0, (w - 8) * frac)}" height="48" rx="24" fill="${col}"/></g>`; }
function lens(cx, cy, r, inner, p, id) {
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p})"><circle r="${r + 24}" fill="${P.navy}" opacity=".18" transform="translate(0 16)"/><clipPath id="${id}"><circle r="${r}"/></clipPath><g clip-path="url(#${id})">${R(-r, -r, 2 * r, 2 * r, '#FDEFF2')}${inner}</g>
    <circle r="${r}" fill="none" stroke="${P.white}" stroke-width="26"/><circle r="${r + 13}" fill="none" ${ST(6)}/><path d="M ${r * .72} ${r * .72} L ${r * 1.2} ${r * 1.2}" stroke="${P.navy}" stroke-width="44" stroke-linecap="round"/></g>`;
}

// ---------- shots ----------
const talk = (t, a, b) => t > a && t < b && hash(Math.floor(t * 9)) > .35 ? 'o' : 'smile';
const walkPh = (t, sp = 9) => t * sp;
function puff(x, y, t, t0, n = 9, r0 = 30, spread = 120, col = P.white) {
  const p = prog(t, t0, t0 + .55); if (p <= 0 || p >= 1) return '';
  let s = ''; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + hash(i) * .6, d = spread * eout(p); s += `<circle cx="${x + Math.cos(a) * d}" cy="${y + Math.sin(a) * d * .7}" r="${r0 * (1 - p * .7)}" fill="${col}" opacity="${.9 * (1 - p)}" ${ST(3)}/>`; }
  return s;
}
function sparkle(x, y, s, t) { const r = 1 + .3 * Math.sin(t * 12); return `<path transform="translate(${x} ${y}) scale(${s * r})" d="M 0 -30 Q 4 -4 30 0 Q 4 4 0 30 Q -4 4 -30 0 Q -4 -4 0 -30 Z" fill="${P.yellow}" ${ST(3)}/>`; }

function sBalcony(t) {
  const move = eio(prog(t, .55, 1.7));
  const stub = t > 1.76;
  const squash = stub ? 1 - .5 * eout(prog(t, 1.76, 1.95)) : 1;
  const ashX = 800, ashY = 1300;
  const look = t < .6 ? 6 : 14;
  return `${balcony(t)}
    ${fig(470, 2230, 2.0, { kind: 'man', aL: 30, bendL: -110, propL: cupP(0), aR: lerp(-30, -62, move), bendR: lerp(-80, -20, move), propR: stub ? null : cigP(1, 1), look, lookY: lerp(-4, 10, move), mouth: stub ? 'smile' : 'flat', brow: stub ? 'up' : 'calm' })}
    ${!stub ? smoke(t, lerp(640, 870, move), lerp(1180, 1260, move), 6, .8) : ''}
    ${railing(1330)}
    <g transform="translate(${ashX} ${ashY})"><ellipse cx="0" cy="0" rx="90" ry="26" fill="${P.smokeDk}" ${ST(5)}/><ellipse cx="0" cy="-6" rx="64" ry="14" fill="${P.navy}" opacity=".4"/>
      ${stub ? `<g transform="translate(10 -16) scale(${squash} 1)"><rect x="-40" y="-8" width="60" height="12" rx="4" fill="${P.white}" ${ST(3)}/><rect x="-40" y="-8" width="18" height="12" fill="${P.orange}" ${ST(3)}/></g>` : ''}</g>
    ${puff(ashX + 10, ashY - 20, t, 1.76, 8, 26, 110, P.smoke)}`;
}

function sCleanup(t) {
  const lp = back(prog(t, 2.72, 3.05));
  const sweep = Math.sin((t - 3.0) * 7);
  let dust = '';
  for (let i = 0; i < 12; i++) { const p = prog(t, 3.2 + i * .1, 4.6 + i * .05); dust += `<circle cx="${-220 + 440 * hash(i) + 400 * eout(p)}" cy="${-200 + 400 * hash(i + 5) - 60 * p}" r="${16 + 12 * hash(i + 1)}" fill="${P.smoke}" opacity="${1 - p}"/>`; }
  const inner = `${R(-400, -400, 800, 800, '#FDE7EC')}${lungs(0, 40, .95, Math.sin(t * 3), 'happy')}${heart(60, 60, .5, Math.max(0, Math.sin(t * 8)), 'happy')}${dust}
    <g transform="translate(${-60 + 80 * sweep} 200) rotate(${-20 + 30 * sweep})"><rect x="-8" y="-200" width="16" height="200" fill="${P.wood}" ${ST(4)}/><path d="M -50 0 L 50 0 L 40 60 L -40 60 Z" fill="${P.yellow}" ${ST(4)}/></g>
    ${t > 4.08 ? sparkle(140, -180, 1, t) + sparkle(-160, -120, .8, t + 1) : ''}`;
  return `${room()}${fig(540, 2700, 2.6, { kind: 'man', aL: 10, aR: -10, look: 0, lookY: 18, mouth: 'o', brow: 'up' })}
    ${lens(540, 1000, 360, inner, lp, 'klens1')}`;
}

function sHeart(t) {
  const calm = prog(t, 7.2, 7.7);
  const f = lerp(3.2, 1.2, calm);
  const ph = t < 7.2 ? t * f : 7.2 * 3.2 + (t - 7.2) * lerp(3.2, 1.2, calm * .5 + .5 * calm);
  const beat = Math.pow(Math.max(0, Math.sin(ph * 6.283)), 4);
  let ecg = 'M -40 1270 ';
  for (let x = -40; x < 1120; x += 8) { const tt = t - (1080 - x) / 600; const fr = tt < 7.2 ? 3.2 : 1.2; const pp = (tt * fr) % 1; const y = pp > .1 && pp < .14 ? -120 : pp > .14 && pp < .18 ? 60 : 0; ecg += `L ${x} ${1270 + y} `; }
  return `${R(0, 0, 1080, 1920, '#FDEFF2')}<circle cx="540" cy="760" r="${430 + 30 * beat}" fill="url(#kpinkglow)"/>
    ${heart(540, 800, 1.55, beat, calm > .5 ? 'happy' : 'tired', { sweat: calm < .5 })}
    <path d="${ecg}" fill="none" stroke="${P.teal}" stroke-width="10" stroke-linejoin="round"/>`;
}

function gauge(cx, cy, val, icon) {
  const a = lerp(-120, 120, val) * Math.PI / 180;
  return `<g transform="translate(${cx} ${cy})"><circle r="250" fill="${P.white}" ${ST(7)}/>
    <path d="M ${Math.sin(-2.094) * 200} ${-Math.cos(-2.094) * 200} A 200 200 0 0 1 ${Math.sin(-.6) * 200} ${-Math.cos(-.6) * 200}" stroke="#2DBE6C" stroke-width="34" fill="none"/>
    <path d="M ${Math.sin(-.6) * 200} ${-Math.cos(-.6) * 200} A 200 200 0 0 1 ${Math.sin(.8) * 200} ${-Math.cos(.8) * 200}" stroke="${P.yellow}" stroke-width="34" fill="none"/>
    <path d="M ${Math.sin(.8) * 200} ${-Math.cos(.8) * 200} A 200 200 0 0 1 ${Math.sin(2.094) * 200} ${-Math.cos(2.094) * 200}" stroke="#E5485F" stroke-width="34" fill="none"/>
    <path d="M 0 0 L ${Math.sin(a) * 180} ${-Math.cos(a) * 180}" stroke="${P.navy}" stroke-width="16" stroke-linecap="round"/><circle r="26" fill="${P.navy}"/>
    <g transform="translate(0 130)">${icon}</g></g>`;
}
function sGauges(t) {
  const drop = eout(prog(t, 9.4, 10.0));
  const jitter = (1 - drop) * 3 * Math.sin(t * 40);
  const v1 = lerp(.82, .25, drop) + jitter / 100, v2 = lerp(.78, .3, drop) - jitter / 100;
  const hIcon = `<path transform="scale(.28)" d="${HEART}" fill="${P.pink}" ${ST(14)}/>`;
  const cuff = `<g transform="scale(.9)"><rect x="-60" y="-30" width="120" height="60" rx="20" fill="${P.teal}" ${ST(5)}/><circle cx="90" cy="20" r="22" fill="${P.navy}"/><path d="M 60 0 Q 80 0 80 14" stroke="${P.navy}" stroke-width="6" fill="none"/></g>`;
  return `${R(0, 0, 1080, 1920, P.room)}${gauge(540, 520, v1, hIcon)}${gauge(540, 1110, v2, cuff)}
    ${drop > 0 ? `<g opacity="${drop}"><path d="M 900 480 V 640 M 860 600 L 900 650 L 940 600" stroke="#2DBE6C" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M 900 1070 V 1230 M 860 1190 L 900 1240 L 940 1190" stroke="#2DBE6C" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}`;
}

function flowCells(t, n, speed, mood, opts = {}) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = ((i * (1400 / n) + t * 260 * speed) % 1400) - 160, y = 960 + (hash(i) - .5) * 600 * (opts.wide || 1);
    s += rbc(x, y + 20 * Math.sin(t * 2 + i), .75 + .2 * hash(i + 3), typeof mood === 'function' ? mood(i) : mood, { rot: 15 * Math.sin(t + i), blink: (t * 3 + i) % 4 < .1 });
    if (opts.extra) s += opts.extra(x, y + 20 * Math.sin(t * 2 + i), i);
  }
  return s;
}
function sVessel1(t) {
  const sweep = prog(t, 11.9, 13.3);
  const sx = lerp(-300, 1400, sweep);
  return `${vessel(t)}${flowCells(t, 7, .6, 'happy', { extra: (x, y, i) => Math.abs(x - sx) < 260 ? co(x + 40, y - 60, .7, { op: .55 }) : '' })}
    ${sweep > 0 && sweep < 1 ? `<rect x="${sx - 160}" y="440" width="320" height="1040" fill="#FFFFFF" opacity=".22"/>${sparkle(sx, 700, 1.2, t)}${sparkle(sx + 60, 1250, .9, t + 2)}` : ''}`;
}

function sExhale(t) {
  const inh = eio(prog(t, 13.9, 14.6));
  const exh = prog(t, 14.6, 16.6);
  let cloud = '';
  if (exh > 0) for (let i = 0; i < 9; i++) { const p = cl(exh * 1.3 - i * .05); cloud += `<circle cx="${640 + 380 * p + 40 * Math.sin(i)}" cy="${930 - 120 * p + 60 * Math.cos(i * 2)}" r="${30 + 90 * p}" fill="${P.smoke}" opacity="${.85 * (1 - p * .6)}"/>`; }
  let mols = '';
  [15.1, 15.3, 15.5, 15.7].forEach((t0, i) => { const p = back(prog(t, t0, t0 + .25)); if (p > 0) mols += co(780 + (i % 2) * 150 + 10 * Math.sin(t * 3 + i), 760 + Math.floor(i / 2) * 200, 1.4 * p, { mean: 1, rot: 10 * Math.sin(t * 2 + i) }); });
  return `${room()}${fig(400, 2300, 2.0, { kind: 'man', aR: lerp(-20, -40, inh), bendR: lerp(-60, -150, inh) * (1 - eout(exh)) + -60 * eout(exh), propR: cigP(1, .8), aL: 10, mouth: exh > 0 && exh < .8 ? 'o' : 'flat', look: 14, blink: inh > .5 && exh <= 0 })}
    ${cloud}${mols}`;
}

function car(x, y, s, t) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -300 0 L -300 -150 Q -280 -260 -120 -270 L 120 -270 Q 260 -260 300 -150 L 300 0 Z" fill="${P.teal}" ${ST(6)}/>
    <rect x="-220" y="-250" width="440" height="110" rx="20" fill="#BFE6F2" ${ST(5)}/><rect x="-290" y="-110" width="80" height="40" rx="8" fill="#E5485F" ${ST(4)}/><rect x="210" y="-110" width="80" height="40" rx="8" fill="#E5485F" ${ST(4)}/>
    <rect x="-90" y="-90" width="180" height="50" rx="6" fill="${P.white}" ${ST(4)}/><rect x="-310" y="-30" width="620" height="40" rx="12" fill="${P.navy}"/>
    <rect x="190" y="0" width="90" height="34" rx="10" fill="${P.smokeDk}" ${ST(5)}/><circle cx="-200" cy="40" r="60" fill="${P.navy}"/><circle cx="200" cy="40" r="60" fill="${P.navy}"/></g>`;
}
function sExhaust(t) {
  const eq = back(prog(t, 17.2, 17.45));
  const ex = prog(t, 17.9, 19.1);
  let mols = '';
  for (let i = 0; i < 4; i++) { const p = prog(t, 17.95 + i * .15, 18.9 + i * .1); if (p > 0) mols += co(830 + 120 * p + 20 * i, 1260 - 200 * p - i * 60, 1.2 * cl(p * 3), { mean: 1, rot: 20 * p }); }
  return `${R(0, 0, 1080, 1920, P.room)}
    ${card(540, 470, 900, 520, `${co(-160, 0, 2, { mean: 1 })}<g transform="translate(140 40) rotate(-20)"><rect x="-90" y="-16" width="180" height="32" rx="8" fill="${P.white}" ${ST(5)}/><rect x="-90" y="-16" width="50" height="32" fill="${P.orange}" ${ST(5)}/><circle cx="90" cy="0" r="12" fill="#FF6B3D"/></g>${smoke(t, 240, 0, 5, .6)}`, 1)}
    <g transform="translate(540 870) scale(${eq})">${TX(0, 40, 160, '=', P.navy)}</g>
    <g>${car(470, 1330, .9, t)}${ex > 0 ? smoke(t * 1.5, 760, 1350, 7, .7) : ''}</g>${mols}`;
}

function sCOattack(t) {
  const docks = [19.3, 19.48, 19.66];
  const kick = prog(t, 21.6, 22.1);
  const spots = [[-110, -70], [110, -70], [0, 110]];
  let o2s = '', cos = '';
  spots.forEach(([dx, dy], i) => {
    const kp = eout(prog(t, 21.6 + i * .08, 22.3 + i * .08));
    o2s += o2(540 + dx * 1.9 + kp * dx * 6, 900 + dy * 1.9 + kp * dy * 5 - 300 * kp, 1.4, { rot: kp * 300, op: 1 - kp * .6 });
    const p = back(prog(t, docks[i] - .2, docks[i]));
    const fx = 540 + dx * 1.9 * (1 + 4 * (1 - p)), fy = 900 + dy * 1.9 * .7 + (1 - p) * -500;
    cos += co(fx + 60 * kp * (i - 1) * 0, fy + 40, 1.3, { mean: 1, rot: -10 + 10 * Math.sin(t * 3 + i) });
  });
  return `${vessel(t, .3)}${rbc(540, 960, 2.4, kick > 0 ? 'sad' : t > 19.6 ? 'shock' : 'happy', { rot: 6 * Math.sin(t * 2) })}${o2s}${t > 19.1 ? cos : ''}`;
}

function sClean(t) {
  const gone = t > 23.94;
  const back2 = prog(t, 24.8, 26.2);
  const glow = eout(prog(t, 26.82, 27.2));
  const spots = [[-110, -70], [110, -70], [0, 110]];
  let cos = '', o2s = '';
  spots.forEach(([dx, dy], i) => {
    if (!gone) cos += co(540 + dx * 1.9, 900 + dy * 1.9 * .7 + 40, 1.3, { mean: 1, rot: 8 * Math.sin(t * 6 + i) });
    const p = back(prog(t, 24.8 + i * .3, 25.15 + i * .3));
    if (p > 0) o2s += o2(lerp(540 + dx * 6, 540 + dx * 1.9, p), lerp(400, 900 + dy * 1.9, p), 1.4, { rot: 10 * Math.sin(t * 3 + i) });
  });
  const lbl = pop(t, 24.0, .3);
  const lab = lbl > 0 ? `<g transform="translate(540 300) scale(${lbl})"><rect x="-400" y="-90" width="800" height="180" rx="40" fill="${P.white}" ${ST(6)}/>${TX(-290, 30, 90, 'CO', P.smokeDk)}${cross(-170, 0, 1.4)}<path d="M -90 0 H 30 M 0 -26 L 34 0 L 0 26" stroke="${P.navy}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${TX(120, 30, 90, 'O', P.teal)}${TX(172, 52, 54, '2', P.teal)}${check(290, 0, 1.4)}</g>` : '';
  return `${vessel(t, .5)}<circle cx="540" cy="960" r="${300 + 260 * glow}" fill="url(#ktealglow)" opacity="${glow}"/>
    ${glow > 0 ? rbc(160, 520, .9 * glow, 'strong') + rbc(920, 1300, .9 * glow, 'strong') : ''}
    ${rbc(540, 960, 2.4, glow > .3 ? 'strong' : gone ? 'happy' : 'sad', { rot: 6 * Math.sin(t * 2) })}${cos}${o2s}
    ${spots.map(([dx, dy]) => puff(540 + dx * 1.9, 900 + dy * 1.9 * .7 + 40, t, 23.94, 7, 22, 90, P.smoke)).join('')}${lab}`;
}

function sNicotine(t) {
  const wave = prog(t, 30.3, 31.3);
  const wx = lerp(-400, 1500, eio(wave));
  let nic = '';
  for (let i = 0; i < 9; i++) { let x = 120 + i * 110 + 40 * Math.sin(t + i), y = 600 + 700 * hash(i + 11); if (wx > x - 150) x = Math.max(x, wx + 120 + i * 30); nic += nico(x, y + 20 * Math.sin(t * 2 + i), 1.1, { rot: t * 40 + i * 20 }); }
  return `${vessel(t, .5)}${flowCells(t, 5, .5, i => wave >= 1 ? 'happy' : 'tired')}${nic}
    ${wave > 0 && wave < 1 ? `<path d="M ${wx} 440 Q ${wx + 120} 960 ${wx} 1480 L ${wx - 400} 1480 L ${wx - 400} 440 Z" fill="#BFE9F2" opacity=".55"/>${puff(wx, 960, t, 30.3 + wave * .9, 6, 30, 140, '#E6F7FB')}` : ''}
    ${t > 31.44 ? sparkle(300, 600, 1, t) + sparkle(800, 1300, 1.2, t + 1) : ''}`;
}

function cloudD(x, y, s, t, dark = 1) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="${scallop(0, 0, 230, 90, 9)}" fill="${dark ? '#5D6B7A' : P.white}" ${ST(6)}/>${dark && t > 33.44 && t < 33.8 ? `<path d="M -20 80 L -60 200 L 0 180 L -30 300" stroke="${P.yellow}" stroke-width="18" fill="none" stroke-linejoin="round"/>` : ''}</g>`; }
function sHard(t) {
  const dark = eout(prog(t, 32.5, 33.4));
  const grip = back(prog(t, 33.3, 33.6));
  const flash = t > 33.44 && t < 33.56;
  return `${room()}<rect x="0" y="0" width="1080" height="1920" fill="${P.navy}" opacity="${.45 * dark}"/>
    ${fig(540, 2150, 1.9, { kind: 'man', aL: lerp(10, 150, grip), bendL: lerp(0, 70, grip), aR: lerp(-10, -150, grip), bendR: lerp(0, -70, grip), mouth: grip > .5 ? 'frown' : 'flat', brow: 'worried', eyeS: grip > .5 ? 1.5 : 1, sweat: grip > .5 })}
    ${cloudD(540, lerp(-200, 260, eout(prog(t, 32.3, 32.9))), 1.1, t)}
    ${flash ? R(0, 0, 1080, 1920, '#FFFFFF', 'opacity=".4"') : ''}`;
}

function sCraving(t) {
  const draw = prog(t, 34.45, 37.0);
  const pts = []; for (let i = 0; i <= 60; i++) { const d = i / 60 * 6; const y = Math.exp(-Math.pow(d - 1.6, 2) / 1.4) * .9 + .08; pts.push([180 + i / 60 * 720, 1100 - y * 520]); }
  const n = Math.max(1, Math.floor(draw * 60));
  const path = pts.slice(0, n + 1).map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const peak = pts[16];
  const pk = pop(t, 37.28, .25);
  const hl = prog(t, 34.8, 35.4);
  return `${R(0, 0, 1080, 1920, P.room)}${card(540, 860, 940, 900, '', 1)}
    <rect x="${180 + 720 / 6 * 1}" y="460" width="${720 / 6 * 2 * hl}" height="660" fill="${P.pink}" opacity=".25"/>
    <path d="M 180 460 V 1120 H 920" stroke="${P.navy}" stroke-width="7" fill="none"/>
    ${[1, 2, 3, 4, 5, 6, 7].map((d, i) => TX(180 + i * 120, 1180, 46, d, P.navy)).join('')}
    <path d="${path}" stroke="#E5485F" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${pk > 0 ? `<g transform="translate(${peak[0]} ${peak[1]}) scale(${pk})"><circle r="30" fill="#E5485F" ${ST(5)}/><circle r="${50 + 20 * Math.sin(t * 10)}" fill="none" stroke="#E5485F" stroke-width="6" opacity=".6"/></g><g transform="translate(${peak[0] + 160} ${peak[1] - 60}) rotate(-15) scale(${pk})"><rect x="-90" y="-18" width="180" height="36" rx="8" fill="${P.white}" ${ST(5)}/><rect x="-90" y="-18" width="50" height="36" fill="${P.orange}" ${ST(5)}/></g>` : ''}`;
}

function sIrritated(t) {
  const red = prog(t, 38.3, 38.7) * (1 - prog(t, 39.1, 39.4));
  const jit = t > 39.18 && t < 40.1 ? 10 * Math.sin(t * 50) : 0;
  const tap = t > 39.18 ? Math.abs(Math.sin(t * 16)) * 10 : 0;
  let cigs = '';
  [40.02, 40.38, 40.74, 41.1].forEach((t0, i) => { const p = back(prog(t, t0, t0 + .2)); if (p > 0) { const [x, y] = [[220, 420], [860, 520], [180, 980], [880, 1050]][i]; cigs += `<g transform="translate(${x} ${y}) scale(${p})"><path d="${scallop(0, 0, 130, 90, 8)}" fill="${P.white}" ${ST(5)}/><g transform="rotate(-15)"><rect x="-80" y="-14" width="160" height="28" rx="6" fill="${P.white}" ${ST(4)}/><rect x="-80" y="-14" width="44" height="28" fill="${P.orange}" ${ST(4)}/></g></g>`; } });
  let steam = ''; if (red > 0) for (let i = 0; i < 2; i++) { const p = (t * 2 + i * .5) % 1; steam += `<circle cx="${400 + i * 280}" cy="${760 - p * 200}" r="${20 + 20 * p}" fill="${P.white}" opacity="${(1 - p) * red}" ${ST(3)}/>`; }
  return `${room()}<rect x="0" y="1400" width="1080" height="520" fill="${P.roomDk}"/>
    <g transform="translate(${jit} ${-tap})">${fig(540, 2000, 1.9, { kind: 'man', aL: 20, aR: -20, bendL: -30, bendR: 30, mouth: red > .3 ? 'frown' : t > 40 ? 'o' : 'flat', brow: red > .3 ? 'angry' : 'worried', look: t > 40 ? 12 * Math.sin(t * 4) : 0, eyeS: t > 40 ? 1.4 : 1 })}</g>
    <circle cx="540" cy="${2000 - 548 * 1.9}" r="${120}" fill="#E5485F" opacity="${.35 * red}"/>${steam}${cigs}`;
}

function sBrain(t) {
  const plug = prog(t, 42.6, 43.6);
  const flex = back(prog(t, 44.3, 44.6));
  let wires = '';
  for (let i = 0; i < 4; i++) { const p = eout(prog(t, 42.6 + i * .2, 42.9 + i * .2)); const x0 = 200 + i * 220, y0 = 1350; wires += `<path d="M ${x0} ${y0} Q ${x0} ${1200 - 100 * i % 2} ${lerp(x0, 380 + i * 110, p)} ${lerp(y0 - 100, 1100, p)}" stroke="${[P.teal, P.yellow, P.pinkDk, P.navy][i]}" stroke-width="16" fill="none" stroke-linecap="round"/>${p >= 1 && t < 43.9 + i * .1 ? sparkle(380 + i * 110, 1100, .7, t + i) : ''}`; }
  const sw = t > 43.62;
  return `${R(0, 0, 1080, 1920, '#FDEFF2')}${wires}
    ${brain(540, 820, 1.75, flex > .3 ? 'strong' : plug > 0 ? 'happy' : 'tired', { flex: flex > 0 ? flex : 0 })}
    <g transform="translate(540 ${820 - 1.75 * 170})"><path d="M -150 0 Q -150 -110 0 -110 Q 150 -110 150 0 Z" fill="${P.yellow}" ${ST(6)}/><rect x="-180" y="-10" width="360" height="30" rx="14" fill="${P.yellow}" ${ST(6)}/></g>
    <g transform="translate(860 1230)"><rect x="-60" y="-90" width="120" height="180" rx="16" fill="${P.white}" ${ST(5)}/><rect x="-18" y="${sw ? -60 : 10}" width="36" height="50" rx="10" fill="${sw ? '#2DBE6C' : '#E5485F'}" ${ST(4)}/></g>`;
}

function brezel(x, y, s, bite = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -120 40 Q -170 -100 -40 -110 Q 60 -110 30 0 Q 0 80 -60 40 Q -110 0 0 -40 Q 110 0 60 40 Q 0 80 -30 0 Q -60 -110 40 -110 Q 170 -100 120 40 Q 80 110 0 60 Q -80 110 -120 40 Z" fill="#C8833E" ${ST(6)}/>
    ${[[-90, -50], [60, -80], [100, 20], [-30, 40]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="6" fill="#fff"/>`).join('')}${bite ? `<circle cx="120" cy="-60" r="50" fill="#FDEFF2"/>` : ''}</g>`;
}
function sTaste(t) {
  const lift = eout(prog(t, 47.6, 48.2));
  const bite = t > 48.3;
  const lp = back(prog(t, 48.9, 49.2));
  let buds = ''; for (let i = 0; i < 16; i++) { const on = t > 49.06 + i * .03; buds += `<circle cx="${-170 + (i % 6) * 68}" cy="${-30 + Math.floor(i / 6) * 70}" r="${16 + (on ? 6 * Math.sin(t * 10 + i) : 0)}" fill="${on ? [P.yellow, P.teal, P.orange, '#B784F0'][i % 4] : '#F4A7B5'}" ${ST(3)}/>`; }
  const tongue = `${R(-300, -300, 600, 600, '#FDE7EC')}<path d="M -220 -180 Q 0 -230 220 -180 Q 260 120 0 220 Q -260 120 -220 -180 Z" fill="${P.pink}" ${ST(6)}/><path d="M 0 -170 V 120" stroke="${P.pinkDk}" stroke-width="8"/>${buds}${t > 49.1 ? sparkle(-180, -200, .9, t) + sparkle(170, 160, .8, t + 2) : ''}`;
  return `${room()}${fig(400, 2250, 2.0, { kind: 'man', aR: lerp(-20, -50, lift), bendR: lerp(-40, -130, lift), propR: (hx, hy) => brezel(hx + 20, hy - 60, .7, bite), aL: 10, mouth: bite ? 'smile' : talk(t, 46.1, 47.5) === 'o' ? 'o' : 'flat', brow: t > 46.8 ? 'up' : 'calm', blink: bite && t < 48.8, look: 10 })}
    ${puff(560, 1000, t, 48.3, 7, 10, 90, '#E2A766')}${lens(760, 560, 270, tongue, lp, 'klens2')}`;
}

function sSmell(t) {
  const sniff = prog(t, 50.0, 51.5);
  let aroma = '';
  for (let i = 0; i < 3; i++) { const off = ((t * .9 + i / 3) % 1); aroma += `<path d="M ${700 - off * 260} ${1400 - off * 520} q -60 -40 0 -80 q 60 -40 0 -80" stroke="${P.orange}" stroke-width="12" fill="none" stroke-linecap="round" opacity="${1 - off}"/>`; }
  return `${R(0, 0, 1080, 1920, '#FFF4E3')}
    <g transform="translate(380 0)"><ellipse cx="0" cy="760" rx="420" ry="520" fill="${P.skin}" ${ST(7)}/><path d="M 40 620 Q 150 820 60 900 Q 20 920 -10 890" fill="${P.skin}" ${ST(7)}/>
      <path d="M -150 560 Q -110 ${540 - 10 * sniff} -60 560 M 120 560 Q 160 ${540 - 10 * sniff} 210 560" stroke="${P.navy}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M -40 1020 Q 40 1060 120 1020" stroke="${P.navy}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M -260 360 Q 0 160 280 340 Q 120 260 0 280 Q -160 290 -260 360 Z" fill="#6B4A33"/></g>
    ${aroma}<g transform="translate(760 1300)">${cupP(0)(0, 0).replace('translate(0 0)', 'translate(0 0) scale(2.2)')}</g>
    ${t > 51.0 ? sparkle(300, 400, 1, t) : ''}`;
}

function sFlow(t) {
  const wide = lerp(.55, 1, eio(prog(t, 52.6, 53.6)));
  const sp = lerp(.4, 1.6, eio(prog(t, 53.2, 53.9)));
  return `${vessel(t * sp, 1, wide)}${flowCells(t * sp, 7, 1, 'happy', { wide })}
    ${t > 53.6 ? `<path d="M 120 380 H 420 M 360 330 L 420 380 L 360 430" stroke="${P.white}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M 620 1560 H 920 M 860 1510 L 920 1560 L 860 1610" stroke="${P.white}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
}
function sLungs(t) {
  const br = eio(prog(t, 54.6, 55.3)) * (1 - eio(prog(t, 56.2, 56.8)));
  const flex = t > 55.8;
  return `${R(0, 0, 1080, 1920, '#E9F8F6')}<circle cx="540" cy="860" r="${420 + 80 * br}" fill="url(#ktealglow)"/>
    ${lungs(540, 900, 1.6, br, flex ? 'strong' : 'happy', { arms: flex })}
    ${br > .2 ? [0, 1, 2].map(i => o2(540 + (i - 1) * 140, 300 - 120 * ((t * 1.5 + i / 3) % 1) * -1, .9, { op: br })).join('') : ''}`;
}

function stairs(t) {
  let s = R(0, 0, 1080, 1920, '#F2E3C6');
  for (let i = 0; i < 14; i++) s += `<path d="M ${-40 + i * 90} ${1700 - i * 90} H ${50 + i * 90} V ${1610 - i * 90}" fill="none" stroke="${P.navy}" stroke-width="7"/>`;
  s += `<path d="M -40 1700 L 1220 440" stroke="${P.wood}" stroke-width="22"/><path d="M -40 1500 L 1220 240" stroke="${P.wood}" stroke-width="16"/>`;
  for (let i = 0; i < 14; i++) s += `<path d="M ${-40 + i * 90 + 45} ${1500 - i * 90 - 45} V ${1700 - i * 90 - 45}" stroke="${P.wood}" stroke-width="6"/>`;
  return s + `<rect x="760" y="300" width="200" height="300" rx="12" fill="#9CC9D6" stroke="#FFF" stroke-width="14"/>`;
}
function sStairs(t) {
  const p = eio(prog(t, 56.95, 60.7));
  const x = lerp(150, 760, p), y = lerp(1640, 1030, p);
  const cough1 = prog(t, 57.9, 58.4), cough2 = prog(t, 58.7, 59.0);
  const top = t > 60.7;
  return `${stairs(t)}${fig(x, y, .95, { kind: 'man', walk: top ? undefined : walkPh(t, 10), aL: top ? 150 : 20 * Math.sin(walkPh(t, 10)), bendL: top ? 30 : 0, aR: -20 * Math.sin(walkPh(t, 10)), mouth: top ? 'smile' : cough1 > 0 && cough1 < 1 ? 'o' : 'flat', brow: top ? 'up' : 'calm', look: 10 })}
    ${cough1 > 0 && cough1 < 1 ? `<path transform="translate(${x + 90} ${y - 500}) scale(${1.2 * eout(cough1)})" d="${scallop(0, 0, 70, 40, 7)}" fill="${P.smoke}" opacity="${1 - cough1}" ${ST(3)}/>` : ''}
    ${cough2 > 0 && cough2 < 1 ? `<path transform="translate(${x + 80} ${y - 500}) scale(${.4 * eout(cough2)})" d="${scallop(0, 0, 70, 40, 7)}" fill="${P.smoke}" opacity="${1 - cough2}" ${ST(3)}/>` : ''}
    ${top ? sparkle(x + 140, y - 700, 1, t) : ''}`;
}

function riskCard(t, t0) { const p = pop(t, t0, .3); if (p <= 0) return ''; return `<g transform="translate(540 300) scale(${p})"><rect x="-330" y="-90" width="660" height="180" rx="40" fill="${P.navy}"/>${TX(-60, 34, 96, 'RISIKO', P.white, { ls: 4 })}<g transform="translate(220 0)">${TX(-24, -6, 64, '1', P.yellow)}<path d="M -40 30 L 40 -50" stroke="${P.yellow}" stroke-width="9" stroke-linecap="round"/>${TX(26, 64, 64, '2', P.yellow)}</g></g>`; }
function sHeartRisk(t) {
  const h = eio(prog(t, 64.9, 65.6));
  const beat = Math.pow(Math.max(0, Math.sin(t * 7)), 4);
  return `${R(0, 0, 1080, 1920, P.room)}
    ${heart(290, 820, .95, beat * .5, 'tired', { grey: 1 })}${heart(800, 820, .95, beat, 'happy')}
    <g transform="translate(140 600) rotate(-15)"><rect x="-80" y="-14" width="160" height="28" rx="6" fill="${P.white}" ${ST(4)}/><rect x="-80" y="-14" width="44" height="28" fill="${P.orange}" ${ST(4)}/></g>${smoke(t, 220, 560, 4, .5)}
    ${riskBar(130, 1120, 320, 1, '#E5485F')}${riskBar(640, 1120, 320, lerp(1, .5, h), '#E5485F')}
    ${riskCard(t, 65.5)}`;
}
function sLungRisk(t) {
  const h = eio(prog(t, 70.2, 70.9));
  return `${R(0, 0, 1080, 1920, '#E9F8F6')}${lungs(540, 820, 1.3, Math.sin(t * 2.5), h > .5 ? 'strong' : 'happy')}
    ${riskBar(190, 1170, 700, lerp(1, .5, h), '#E5485F')}${riskCard(t, 70.84)}`;
}

const MILES = ['20 MIN', '12 STD.', 'TAG 3', '12 WOCHEN', '1 JAHR', '10 JAHRE'];
function timeline(t, greyFrom = 99, storm = 0) {
  let s = `<path d="M 160 300 Q 900 400 760 760 Q 600 1100 300 1150 Q 100 1200 300 1380" stroke="${P.navy}" stroke-width="14" fill="none" stroke-dasharray="1 0"/>`;
  const pos = [[160, 300], [520, 360], [840, 560], [640, 960], [300, 1150], [300, 1380]];
  pos.forEach(([x, y], i) => {
    const g = i >= 1 && t > greyFrom + i * .15;
    const fade = g ? prog(t, greyFrom + i * .15, greyFrom + i * .15 + .4) : 0;
    const w = MILES[i].length * 30 + 60;
    s += `<g transform="translate(${x} ${y - 70 * fade}) rotate(${fade * 20})" opacity="${1 - .7 * fade}"><rect x="${-w / 2}" y="-40" width="${w}" height="80" rx="40" fill="${g ? '#9AA6B2' : P.teal}" ${ST(5)}/>${TX(0, 16, 44, MILES[i], P.white)}</g>`;
  });
  if (storm > 0) s += cloudD(220, 160, .7 * storm, t > 73.3 && t < 73.5 ? 33.5 : 0) + `<circle cx="160" cy="300" r="${110 + 10 * Math.sin(t * 8)}" fill="none" stroke="#E5485F" stroke-width="10" opacity="${storm}"/>`;
  return s;
}
function sWarning(t) {
  const w = back(prog(t, 71.9, 72.15));
  const storm = eout(prog(t, 72.7, 73.3));
  return `${R(0, 0, 1080, 1920, P.room)}${timeline(t, 99, storm)}
    ${w > 0 ? `<g transform="translate(800 1250) scale(${w * (1 - .3 * prog(t, 72.6, 73.0))})"><path d="M 0 -170 L 170 130 L -170 130 Z" fill="${P.yellow}" ${ST(8)} stroke-linejoin="round"/><rect x="-14" y="-80" width="28" height="130" rx="12" fill="${P.navy}"/><circle cx="0" cy="90" r="18" fill="${P.navy}"/></g>` : ''}`;
}
function sGiveUp(t) {
  const reach = eout(prog(t, 75.3, 75.7));
  return `${R(0, 0, 1080, 1920, P.room)}${timeline(t, 76.3, 1)}
    ${fig(330, 1880, 1.0, { kind: 'man', aR: lerp(-10, -60, reach), bendR: -20, look: -10, mouth: 'frown', brow: 'worried' })}
    <g transform="translate(${130} 1450) rotate(-8)"><rect x="-60" y="-80" width="120" height="160" rx="10" fill="#E5485F" ${ST(5)}/><rect x="-40" y="-110" width="20" height="40" fill="${P.white}" ${ST(3)}/><rect x="-10" y="-120" width="20" height="50" fill="${P.white}" ${ST(3)}/></g>`;
}

function sDoctor(t) {
  const enter = eout(prog(t, 78.4, 79.0));
  const clip = back(prog(t, 79.3, 79.6));
  const arzt = eout(prog(t, 81.5, 81.95));
  const go = t > 82.9 ? (t - 82.9) * 120 : 0;
  const walking = t > 82.9;
  const clipboard = (hx, hy) => clip > 0 ? `<g transform="translate(${hx - 20} ${hy - 90}) scale(${clip})"><rect x="-80" y="-110" width="160" height="210" rx="12" fill="${P.white}" ${ST(5)}/><rect x="-30" y="-122" width="60" height="26" rx="8" fill="${P.navy}"/>${check(-30, -50, .7)}${check(-30, 10, .7)}${check(-30, 70, .7)}<path d="M 10 -50 H 60 M 10 10 H 60 M 10 70 H 60" stroke="${P.smoke}" stroke-width="8"/></g>` : '';
  return `${room()}<rect x="0" y="1400" width="1080" height="520" fill="${P.roomDk}"/>
    <g filter="url(#drop)"><rect x="740" y="300" width="230" height="290" rx="16" fill="${P.white}" ${ST(5)}/><path d="M 855 360 V 530 M 770 445 H 940" stroke="#E5485F" stroke-width="30"/></g>
    ${fig(330 + go, 1700, 1.2, { kind: 'man', walk: walking ? walkPh(t) : undefined, aL: 10, aR: -10, look: 12, mouth: t > 79.6 ? 'smile' : 'flat', brow: t > 79.6 ? 'up' : 'worried' })}
    ${fig(lerp(-200, 650, enter) + go, 1710, 1.2, { kind: 'aerztin', walk: (enter < 1 || walking) ? walkPh(t) + 1 : undefined, aL: enter >= 1 && t < 79.3 ? 60 : 15, bendL: -20, aR: t > 80.4 && t < 81.2 ? -150 : -30, bendR: -60, propL: clipboard, look: -12, mouth: talk(t, 79.0, 82.8), brow: 'up' })}
    ${arzt > 0 ? fig(lerp(1300, 870, arzt) + go, 1730, 1.15, { kind: 'arzt', walk: (arzt < 1 || walking) ? walkPh(t) + 2 : undefined, aR: t > 81.9 && t < 82.6 ? -150 : -15, bendR: -40, look: -14, mouth: 'smile', brow: 'up' }) : ''}`;
}

function phoneP(hx, hy) { return `<g transform="translate(${hx} ${hy - 70})"><rect x="-50" y="-90" width="100" height="180" rx="16" fill="${P.navy}"/><rect x="-40" y="-76" width="80" height="140" rx="8" fill="#BFE9F2"/></g>`; }
function sShare(t) {
  const items = [84.3, 84.6, 84.9, 85.2, 85.5, 85.8];
  const send = prog(t, 86.4, 87.4);
  let list = '';
  MILES.forEach((m, i) => { const p = eout(prog(t, items[i] - .15, items[i] + .1)); if (p <= 0) return; list += `<g transform="translate(${-300 + 40 * (1 - p)} ${-250 + i * 92})" opacity="${p}">${check(0, 0, .8)}${TX(60, 18, 50, m, P.navy, { anchor: 'start' })}</g>`; });
  const cardS = send > 0 ? 1 - .8 * eio(send) : back(prog(t, 83.95, 84.25));
  const cardX = 540 + 300 * eio(send), cardY = 640 - 500 * eio(send);
  const plane = send > .3 ? `<g transform="translate(${cardX} ${cardY}) rotate(-30) scale(${1 + send})"><path d="M -60 0 L 80 -40 L -20 50 L -10 10 Z" fill="${P.white}" ${ST(5)}/></g>` : '';
  return `${balcony(t)}
    ${fig(470, 2230, 2.0, { kind: 'man', aL: 30, bendL: -110, propL: cupP(0), aR: -40, bendR: -90, propR: phoneP, look: send > 0 ? 6 : 10, lookY: send > 0 ? -10 : 8, mouth: 'smile', brow: 'up' })}
    ${railing(1330)}
    ${send < .3 && cardS > 0 ? `<g transform="translate(${cardX} ${cardY}) scale(${cardS})"><rect x="-360" y="-330" width="720" height="640" rx="36" fill="${P.white}" ${ST(6)}/>${list}</g>` : plane}`;
}

const SHOTS = [[0, 2.7, sBalcony], [2.7, 5.32, sCleanup], [5.32, 8.44, sHeart], [8.44, 10.38, sGauges], [10.38, 13.88, sVessel1], [13.88, 16.7, sExhale], [16.7, 19.12, sExhaust],
  [19.12, 23.16, sCOattack], [23.16, 28.04, sClean], [28.04, 32.14, sNicotine], [32.14, 34.32, sHard], [34.32, 38.08, sCraving], [38.08, 42.0, sIrritated], [42.0, 46.06, sBrain],
  [46.06, 49.9, sTaste], [49.9, 51.5, sSmell], [51.5, 54.5, sFlow], [54.5, 56.9, sLungs], [56.9, 61.86, sStairs], [61.86, 67.5, sHeartRisk], [67.5, 71.78, sLungRisk],
  [71.78, 75.22, sWarning], [75.22, 78.38, sGiveUp], [78.38, 83.88, sDoctor], [83.88, 999, sShare]];
const BADGES = [[5.32, '20 MIN'], [10.38, '12 STD.'], [28.04, 'TAG 3'], [51.5, '12 WOCHEN'], [61.86, '1 JAHR'], [67.5, '10 JAHRE'], [71.78, '']];

function scene(t) {
  let f = SHOTS[0][2];
  for (const s of SHOTS) if (t >= s[0]) f = s[2];
  let body = '';
  try { body = f(t); } catch (e) { body = R(0, 0, 1080, 1920, P.room); }
  let lab = '', t0 = 0;
  for (const [bt, l] of BADGES) if (t >= bt) { lab = l; t0 = bt; }
  return `${KDEFS}${body}${badge(t, lab, back(prog(t, t0, t0 + .3)))}`;
}

const __style = {"dust": false, "vignette": false, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
