// @ts-nocheck
// AUTO-GENERATED scene for v36. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v36 — Der Hauptmann von Köpenick. Archive picture-book look: aged paper, brown-black ink, red-brick Rathaus, stamp red.
const P = { paper: '#EADBC0', paperSh: '#D8C5A3', paperDk: '#C9B28A', ink: '#3B2F2A', red: '#B23A2E', redHi: '#D0503F', olive: '#6B7B4B', oliveHi: '#8A9A63', brown: '#8A6E52', brownDk: '#6A523B',
  blue: '#24324F', blueHi: '#3A4C74', blueSol: '#33507F', blueSolHi: '#4C6C9F', brick: '#A8452F', brickSh: '#82341F', brickHi: '#C2603F', stone: '#E2CFAA', stoneSh: '#BFA77E',
  gold: '#D9A441', goldHi: '#F1CE78', silver: '#C9CED6', skin: '#EBC29C', skinSh: '#CF9D76', black: '#2A2421', white: '#FBF4E4', grey: '#9A968F', greyHi: '#C9C4BA',
  sky: '#F3E6C8', sky2: '#E6CFA0', grass: '#8E9C5C', grassSh: '#6F7D45', beer: '#E3A93A', foam: '#FFF8E6', bronze: '#8C6235', bronzeHi: '#C08B4F', bronzeSh: '#5E3F22',
  coat: '#7A5A3E', coatSh: '#5E432D', wood: '#9B6B43', woodHi: '#B8845A', woodSh: '#6E4A2E', steel: '#55606E', green: '#4E6B4A', greenHi: '#6C8C66' };
const OL = P.ink;
const FONT = `font-family:'Inter';font-weight:900`;
const ST = (w = 6) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pop = (t, t0, d = .25) => back(prog(t, t0, t0 + d));
const shk = (t, t0, a, dec = 8, f = 41) => t < t0 ? 0 : a * Math.exp(-(t - t0) * dec) * Math.sin((t - t0) * f);
const TX = (x, y, sz, txt, fill, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" style="${FONT};font-size:${sz}px;letter-spacing:${o.ls || 0}px" fill="${fill}"${o.sw ? ` stroke="${o.sc || OL}" stroke-width="${o.sw}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${txt}</text>`;
const G = (tr, inner) => `<g transform="${tr}">${inner}</g>`;
const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

// ---------- characters ----------
const KIND = {
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
  const head = `<g transform="translate(0 ${hd}) rotate(${tilt} 0 -480)">
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
const hammerP = (rot) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${rot})"><rect x="-7" y="-10" width="14" height="80" rx="5" fill="${P.wood}" ${ST(4)}/><rect x="-28" y="58" width="56" height="26" rx="4" fill="${P.steel}" ${ST(4)}/></g>`;
const swordP = (rot) => (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(${rot})"><path d="M -4 0 L -4 -300 L 0 -320 L 4 -300 L 4 0 Z" fill="${P.silver}" ${ST(4)}/><rect x="-22" y="-6" width="44" height="12" rx="4" fill="${P.gold}" ${ST(3)}/></g>`;

// ---------- texture, stamps, sets ----------
let GRAIN = '';
for (let i = 0; i < 70; i++) {
  const x = hash(i * 3.1) * 180, y = hash(i * 7.7) * 180;
  GRAIN += i % 5 === 0 ? `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} l ${(6 + hash(i) * 10).toFixed(1)} ${(hash(i + 2) * 4 - 2).toFixed(1)}" stroke="#5a4630" stroke-width="1.4" opacity=".16"/>`
    : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + hash(i + 1) * 1.6).toFixed(2)}" fill="${i % 3 ? '#5a4630' : '#fff8e8'}" opacity="${i % 3 ? .14 : .22}"/>`;
}
const KDEFS = `<defs><pattern id="kgr" width="180" height="180" patternUnits="userSpaceOnUse">${GRAIN}</pattern>
<radialGradient id="kvig" cx=".5" cy=".42" r=".78"><stop offset=".6" stop-color="#3B2F2A" stop-opacity="0"/><stop offset="1" stop-color="#3B2F2A" stop-opacity=".5"/></radialGradient>
<linearGradient id="ksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1DDB2"/><stop offset="1" stop-color="#F6ECD4"/></linearGradient>
<linearGradient id="ksky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFD6DA"/><stop offset="1" stop-color="#F3E9D2"/></linearGradient>
<linearGradient id="kbeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF4D6" stop-opacity=".75"/><stop offset="1" stop-color="#FFF4D6" stop-opacity="0"/></linearGradient>
<radialGradient id="kspot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C9" stop-opacity=".9"/><stop offset="1" stop-color="#FFF1C9" stop-opacity="0"/></radialGradient>
<radialGradient id="kgold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE7A6" stop-opacity="1"/><stop offset=".5" stop-color="#F1CE78" stop-opacity=".5"/><stop offset="1" stop-color="#F1CE78" stop-opacity="0"/></radialGradient>
<filter id="kbronze"><feColorMatrix type="matrix" values=".42 .62 .12 0 .06  .26 .42 .08 0 .02  .12 .2 .04 0 0  0 0 0 1 0"/></filter>
</defs>`;

function stamp(x, y, rot, txt, p, o = {}) {
  if (p <= 0) return '';
  const sz = o.sz || 70, col = o.col || P.red;
  const w = txt.length * sz * .66 + 60, h = sz * 1.45;
  const sc = 1 + 1.4 * (1 - cl(p));
  const op = cl(p * 3) * (o.op ?? .92);
  let spl = '';
  if (p < 1.2) for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + 0.4; spl += `<circle cx="${Math.cos(a) * (w * .5 + 18 * p)}" cy="${Math.sin(a) * (h * .5 + 14 * p)}" r="${4 + 3 * hash(i)}" fill="${col}" opacity="${.6 * cl(p)}"/>`; }
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" opacity="${op}">${o.bg ? `<rect x="${-w / 2 - 10}" y="${-h / 2 - 10}" width="${w + 20}" height="${h + 20}" rx="18" fill="${o.bg}" opacity=".92"/>` : ''}${spl}
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="9"/>
    <rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="8" fill="none" stroke="${col}" stroke-width="4"/>
    ${TX(0, sz * .36, sz, txt, col, { ls: 4 })}</g>`;
}

const sky = (id = 'ksky') => R(-40, -40, 1160, 2000, `url(#${id})`);
function cobbles(y0, y1, off = 0) {
  let s = R(-40, y0, 1160, y1 - y0 + 40, '#B9A07A');
  for (let r = 0, y = y0 + 14; y < y1 + 40; r++, y += 18 + r * 2.4) {
    const h = 14 + r * 2.4, w = 40 + r * 9;
    for (let x = -60 + ((r % 2) * w / 2) - (off % w); x < 1140; x += w) s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(w - 6).toFixed(1)}" height="${(h - 5).toFixed(1)}" rx="${h * .4}" fill="#A88F69" stroke="#8C7452" stroke-width="2"/>`;
  }
  return s;
}

// Rathaus Köpenick-like red-brick facade with central tower. cx, ground y, scale. doors at local x -300, 0, 300 (+ side door 430)
const RH_DOORS = [-330, -110, 110, 330];
function rathaus(cx, gy, s, o = {}) {
  const open = o.open || 0;
  let win = '';
  const arch = (x, y, w, h, lit) => `<path d="M ${x} ${y + h} V ${y + w / 2} Q ${x} ${y} ${x + w / 2} ${y} Q ${x + w} ${y} ${x + w} ${y + w / 2} V ${y + h} Z" fill="${lit ? '#F3D98C' : '#3E3A44'}" stroke="${P.stone}" stroke-width="10"/><path d="M ${x + w / 2} ${y + 6} V ${y + h}" stroke="${P.stone}" stroke-width="5"/>`;
  for (const row of [-520, -360]) for (const x of [-470, -350, -230, 170, 290, 410]) win += arch(x, row, 70, 110, o.lit && hash(x + row) > .6);
  let mortar = '';
  for (let y = -650; y < 0; y += 22) mortar += `<path d="M -520 ${y} H 520" stroke="${P.brickSh}" stroke-width="2.4" opacity=".55"/>`;
  for (let i = 0; i < 60; i++) mortar += `<rect x="${-510 + hash(i * 5.3) * 1000}" y="${-640 + hash(i * 2.1) * 620}" width="30" height="12" fill="${P.brickHi}" opacity=".5"/>`;
  let doors = '';
  RH_DOORS.forEach((dx, i) => {
    const big = i === 1 || i === 2;
    const w = big ? 120 : 100, h = big ? 200 : 170;
    doors += `<path d="M ${dx - w / 2 - 14} 0 V ${-h + w / 2} Q ${dx - w / 2 - 14} ${-h - 14} ${dx} ${-h - 14} Q ${dx + w / 2 + 14} ${-h - 14} ${dx + w / 2 + 14} ${-h + w / 2} V 0 Z" fill="${P.stone}" ${ST(5)}/>
      <path d="M ${dx - w / 2} 0 V ${-h + w / 2} Q ${dx - w / 2} ${-h} ${dx} ${-h} Q ${dx + w / 2} ${-h} ${dx + w / 2} ${-h + w / 2} V 0 Z" fill="#2A221E"/>
      <g transform="translate(${dx - w / 2} 0) scale(${1 - .8 * open} 1)"><path d="M 0 0 V ${-h + w / 2} Q 0 ${-h} ${w / 2} ${-h} V 0 Z" fill="${P.woodSh}" ${ST(4)}/></g>
      <g transform="translate(${dx + w / 2} 0) scale(${1 - .8 * open} 1)"><path d="M 0 0 V ${-h + w / 2} Q 0 ${-h} ${-w / 2} ${-h} V 0 Z" fill="${P.wood}" ${ST(4)}/></g>`;
  });
  const cm = o.clockMin ?? 0, ch = o.clockHour ?? 12;
  const clock = `<g transform="translate(0 -900)"><circle r="62" fill="${P.white}" ${ST(6)}/>${Array.from({ length: 12 }, (_, i) => `<path d="M ${Math.sin(i * .5236) * 50} ${-Math.cos(i * .5236) * 50} L ${Math.sin(i * .5236) * 58} ${-Math.cos(i * .5236) * 58}" ${ST(4)}/>`).join('')}
    <path d="M 0 0 L ${Math.sin((ch % 12 + cm / 60) * .5236) * 30} ${-Math.cos((ch % 12 + cm / 60) * .5236) * 30}" ${ST(8)}/><path d="M 0 0 L ${Math.sin(cm * .10472) * 46} ${-Math.cos(cm * .10472) * 46}" ${ST(5)}/><circle r="6" fill="${OL}"/></g>`;
  const flag = o.flag !== undefined ? `<path d="M 0 -1180 V -1290" ${ST(5)}/><path d="M 0 -1290 Q ${40} ${-1300 + 8 * Math.sin(o.flag * 6)} 80 -1286 Q 120 ${-1272 + 8 * Math.sin(o.flag * 6 + 1)} 140 -1282 L 140 -1236 Q 100 ${-1226 + 6 * Math.sin(o.flag * 6 + 2)} 70 -1240 Q 40 -1250 0 -1240 Z" fill="${o.flagC || P.red}" ${ST(4)}/>` : '';
  return `<g transform="translate(${cx} ${gy}) scale(${s})">
    <path d="M -540 -660 L -540 -760 L -500 -760 L -500 -800 L -460 -800 L -460 -760 L -400 -760 L -400 -660 Z M 400 -660 L 400 -760 L 460 -760 L 460 -800 L 500 -800 L 500 -760 L 540 -760 L 540 -660 Z" fill="${P.brick}" ${ST(6)}/>
    <path d="M -540 0 V -680 L -400 -700 L 400 -700 L 540 -680 V 0 Z" fill="${P.brick}" ${ST(7)}/>
    ${mortar}
    <path d="M -540 -680 L 540 -680 M -540 -440 L 540 -440" stroke="${P.stone}" stroke-width="16"/>
    <!-- tower -->
    <path d="M -130 -700 V -1020 L -150 -1020 L -150 -1060 L 150 -1060 L 150 -1020 L 130 -1020 V -700 Z" fill="${P.brick}" ${ST(7)}/>
    <path d="M -100 -1060 L -60 -1160 L 0 -1190 L 60 -1160 L 100 -1060 Z" fill="${P.green}" ${ST(6)}/><path d="M -30 -1100 L 0 -1180" stroke="${P.greenHi}" stroke-width="10"/>
    ${arch(-60, -800, 46, 90, 0)}${arch(14, -800, 46, 90, 0)}
    ${clock}${flag}
    <path d="M -560 0 H 560 V 30 H -560 Z" fill="${P.stoneSh}" ${ST(5)}/>
    ${win}${doors}${o.extra || ''}</g>`;
}

// steam suburban train (local origin = rail level center of first carriage). dir: travels right
function train(x, y, s, t, o = {}) {
  const wheel = (cx, r) => `<g transform="translate(${cx} 0) rotate(${(t * 420) % 360})"><circle r="${r}" fill="${P.black}" ${ST(5)}/><path d="M ${-r + 8} 0 H ${r - 8} M 0 ${-r + 8} V ${r - 8}" stroke="${P.steel}" stroke-width="6"/></g>`;
  let cars = '';
  for (let c = 0; c < 2; c++) {
    const ox = -560 - c * 470;
    let wins = '';
    for (let j = 0; j < 4; j++) {
      const wx = ox + 30 + j * 100;
      const pass = o.pass ? o.pass(c, j, wx) : '';
      wins += `<rect x="${wx}" y="-250" width="70" height="80" rx="8" fill="#F3E2B0" ${ST(4)}/>${pass}`;
    }
    cars += `<g><rect x="${ox}" y="-290" width="440" height="230" rx="18" fill="${P.green}" ${ST(6)}/><path d="M ${ox - 10} -290 Q ${ox + 220} -340 ${ox + 450} -290 Z" fill="${P.olive}" ${ST(5)}/>${wins}<rect x="${ox}" y="-110" width="440" height="16" fill="${P.goldHi}" opacity=".8"/>${wheel(ox + 80, 34)}${wheel(ox + 360, 34)}</g>`;
  }
  const loco = `<g><rect x="-100" y="-230" width="320" height="160" rx="20" fill="${P.black}" ${ST(6)}/><rect x="-120" y="-330" width="140" height="260" rx="12" fill="${P.green}" ${ST(6)}/><rect x="-100" y="-310" width="80" height="70" rx="8" fill="#F3E2B0" ${ST(4)}/>
    <rect x="150" y="-330" width="44" height="100" fill="${P.black}" ${ST(5)}/><path d="M 140 -330 h 64 v -20 h -64 Z" fill="${P.black}" ${ST(5)}/><circle cx="214" cy="-150" r="22" fill="${P.goldHi}" ${ST(4)}/>
    <path d="M 220 -70 L 270 -40 L 220 -40 Z" fill="${P.red}" ${ST(4)}/>${wheel(-40, 44)}${wheel(70, 44)}${wheel(170, 36)}</g>`;
  let steam = '';
  for (let i = 0; i < 7; i++) {
    const age = ((t * 1.6 + i / 7) % 1);
    steam += `<circle cx="${172 - age * 260 + 20 * Math.sin(i)}" cy="${-360 - age * 230}" r="${26 + age * 60}" fill="${P.white}" opacity="${.85 * (1 - age)}" ${ST(3)}/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${cars}${loco}${steam}</g>`;
}

function cellSet(t, light = 1) {
  let stones = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 6; c++) stones += `<rect x="${c * 190 - (r % 2) * 95 - 20}" y="${r * 80}" width="186" height="76" rx="10" fill="${hash(r * 9 + c) > .5 ? '#8E8270' : '#837865'}" stroke="#655B4C" stroke-width="4"/>`;
  return `${R(0, 0, 1080, 1920, '#7C7160')}${stones}
    <rect x="620" y="260" width="240" height="200" fill="#F6EBC6" ${ST(7)}/>${[680, 740, 800].map(x => `<rect x="${x - 6}" y="260" width="12" height="200" fill="${P.ink}"/>`).join('')}
    <polygon points="620,460 860,460 ${600 + 120 * Math.sin(t * .2)},1380 ${250 + 120 * Math.sin(t * .2)},1380" fill="url(#kbeam)" opacity="${.55 * light}"/>
    ${R(0, 1380, 1080, 560, '#5E5446')}`;
}

function newspaper(x, y, rot, s, kind = 0) {
  let lines = '';
  for (let i = 0; i < 9; i++) lines += `<path d="M ${-150} ${70 + i * 22} h ${120 + 20 * hash(i + kind)}" stroke="#9A8A72" stroke-width="7"/><path d="M ${20} ${70 + i * 22} h ${110 + 20 * hash(i + kind + 3)}" stroke="#9A8A72" stroke-width="7"/>`;
  const pic = kind % 2 === 0
    ? `<g transform="translate(-60 -20) scale(.16)">${fig(0, 0, 1, { kind: 'voigt', aR: -90 })}</g><g transform="translate(60 -20) scale(.16)">${fig(0, 0, 1, { kind: 'soldier', aR: -150, mouth: 'laugh' })}</g>`
    : `<g transform="translate(0 -20) scale(.17)">${fig(0, 0, 1, { kind: 'voigt', aL: 40, aR: -40, mouth: 'smile' })}</g>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#drop)">
    <rect x="-180" y="-260" width="360" height="500" fill="#F2E7CF" ${ST(5)}/>
    <path d="M -150 -215 h 300" stroke="${P.ink}" stroke-width="22"/><path d="M -150 -185 h 300 M -150 -176 h 300" stroke="${P.ink}" stroke-width="3"/>
    <path d="M -150 -150 h ${240 - kind * 30}" stroke="${P.ink}" stroke-width="14"/>
    <rect x="-150" y="-130" width="300" height="180" fill="#E5D6B4" ${ST(3)}/>
    <g>${pic}</g>${lines}</g>`;
}

// ---------- helpers for shots ----------
const talk = (t, a, b) => t > a && t < b && hash(Math.floor(t * 9)) > .35 ? 'o' : 'flat';
const walkPh = (t, sp = 9) => t * sp;
const strikeAt = (t, hits, up = .16, down = .22) => { let v = 0; for (const h of hits) v = Math.max(v, t < h ? ein(prog(t, h - up, h)) : 1 - eout(prog(t, h, h + down))); return v; };
function puff(x, y, t, t0, n = 9, r0 = 30, spread = 120, col = P.white) {
  const p = prog(t, t0, t0 + .55); if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const a = i / n * 6.283 + hash(i) * .6, d = spread * eout(p); s += `<circle cx="${x + Math.cos(a) * d}" cy="${y + Math.sin(a) * d * .7}" r="${r0 * (1 - p * .7)}" fill="${col}" opacity="${.9 * (1 - p)}" ${ST(3)}/>`; }
  return s;
}
function speedLines(t, cx, cy, n = 14, col = P.paperDk) { let s = ''; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + t * .4; s += `<path d="M ${cx + Math.cos(a) * 380} ${cy + Math.sin(a) * 380} L ${cx + Math.cos(a) * 1300} ${cy + Math.sin(a) * 1300}" stroke="${col}" stroke-width="${30 + 20 * hash(i)}" opacity=".45"/>`; } return s; }
function qmark(x, y, p, col = P.red, sz = 170) { if (p <= 0) return ''; return `<g transform="translate(${x} ${y}) scale(${p}) rotate(${8 * Math.sin(p * 9)})">${TX(0, 0, sz, '?', col, { sw: 10, sc: P.white })}</g>`; }
function coinsFall(t, t0, x, y0, y1, n = 3, ts = .12) { let s = ''; for (let i = 0; i < n; i++) { const p = prog(t, t0 + i * ts, t0 + i * ts + .25); if (p <= 0) continue; s += `<ellipse cx="${x + i * 6}" cy="${lerp(y0, y1 - i * 8, ein(p))}" rx="22" ry="${p < 1 ? 22 : 8}" fill="${P.gold}" ${ST(4)}/>`; } return s; }
function wallpaper(col1 = '#E2CBA0', col2 = '#D4B98A') { let s = R(0, 0, 1080, 1920, col1); for (let x = 30; x < 1080; x += 120) for (let y = 40; y < 1300; y += 140) s += `<path d="M ${x} ${y} l 14 22 l -14 22 l -14 -22 Z" fill="${col2}"/>`; return s; }
function jacketShape(x, y, s, o = {}) { // empty uniform jacket, origin at collar
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <path d="M -80 10 L -130 260 L -96 270 L -66 90 L -70 330 L 70 330 L 66 90 L 96 270 L 130 260 L 80 10 Q 0 -6 -80 10 Z" fill="${P.blue}" ${ST(6)}/>
    <rect x="-118" y="236" width="40" height="26" fill="${P.red}" ${ST(4)} transform="rotate(12 -98 250)"/><rect x="78" y="236" width="40" height="26" fill="${P.red}" ${ST(4)} transform="rotate(-12 98 250)"/>
    <rect x="-36" y="-6" width="72" height="24" rx="6" fill="${P.red}" ${ST(4)}/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="0" cy="${50 + i * 44}" r="8" fill="${P.gold}" stroke="${OL}" stroke-width="3"/>`).join('')}
    ${o.epaul ? `<ellipse cx="-78" cy="14" rx="30" ry="12" fill="${P.silver}" ${ST(4)}/><ellipse cx="78" cy="14" rx="30" ry="12" fill="${P.silver}" ${ST(4)}/>` : ''}
    ${o.patch ? `<rect x="30" y="200" width="30" height="28" fill="${P.blueHi}" ${ST(3)} stroke-dasharray="5 4"/>` : ''}</g>`;
}
const helmetAt = (x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot}) translate(0 610)">${hat('pickel', KIND.voigt)}</g>`;
function trousers(x, y, s, rot = 0) { return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})"><path d="M -60 0 L 60 0 L 70 300 L 14 300 L 0 70 L -14 300 L -70 300 Z" fill="${P.black}" ${ST(6)}/><path d="M -46 20 L -42 290 M 46 20 L 42 290" stroke="${P.red}" stroke-width="7"/></g>`; }
function bundle(x, y, s, rot) { return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})"><path d="M -70 -40 Q 0 -70 70 -40 Q 90 0 70 40 Q 0 60 -70 40 Q -90 0 -70 -40 Z" fill="${P.blue}" ${ST(6)}/><path d="M -20 -55 Q -10 0 -20 50 M 30 -55 Q 40 0 30 50" stroke="${P.red}" stroke-width="7" fill="none"/><circle cx="-45" cy="0" r="7" fill="${P.gold}"/><circle cx="55" cy="10" r="7" fill="${P.gold}"/></g>`; }
function crow(x, y, s, flap) { const f = Math.sin(flap) * 40; return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -30 0 Q 0 -24 34 -4 L 52 -2 L 36 8 Q 0 24 -30 0 Z" fill="${P.black}" ${ST(3)}/><path d="M -6 -8 L -40 ${-30 - f} L 10 -10 Z" fill="${P.black}" ${ST(3)}/><circle cx="34" cy="-6" r="3" fill="${P.white}"/></g>`; }
function pigeon(x, y, s, flap) { const f = Math.sin(flap) * 30; return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="34" ry="20" fill="#A7A9B0" ${ST(4)}/><circle cx="30" cy="-16" r="13" fill="#A7A9B0" ${ST(4)}/><path d="M 42 -16 l 12 4 l -12 4 Z" fill="${P.gold}"/><path d="M -10 -10 L -30 ${-40 - f} L 14 -12 Z" fill="#8E9098" ${ST(3)}/><circle cx="33" cy="-19" r="2.5" fill="${OL}"/></g>`; }
function rowHouses(y, col = P.paperDk, off = 0) {
  let s = '';
  for (let i = -1; i < 7; i++) {
    const x = i * 200 - (off % 200), h = 520 + 90 * hash(i + Math.floor(off / 200) * 7);
    const c = [P.brick, '#C9A779', '#B08F6A', '#D4BC92'][((i + Math.floor(off / 200)) % 4 + 4) % 4];
    s += `<rect x="${x}" y="${y - h}" width="200" height="${h}" fill="${c}" ${ST(5)}/><path d="M ${x - 6} ${y - h} L ${x + 100} ${y - h - 70} L ${x + 206} ${y - h} Z" fill="${P.brownDk}" ${ST(5)}/>`;
    for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 2; c2++) s += `<rect x="${x + 36 + c2 * 82}" y="${y - h + 60 + r * 150}" width="48" height="90" fill="#4A4250" stroke="${P.stone}" stroke-width="6"/>`;
  }
  return s;
}

// ---------- shots ----------
function sShoe(t) {
  const hit = strikeAt(t, [.44, .82, 1.2]);
  const aR = lerp(-150, -38, hit);
  const uni = t > 2.04;
  const swing = ring(t, 1.46, 1.6, 2.2) * 9;
  const reach = eout(prog(t, 2.25, 2.55));
  let shelf = '';
  for (let i = 0; i < 6; i++) shelf += `<path d="M ${70 + i * 150} 520 q 10 -50 50 -50 l 50 30 q 30 10 30 30 Z" fill="${[P.brownDk, P.black, P.brown][i % 3]}" ${ST(4)}/>`;
  let sparks = '';
  for (const h of [.44, .82, 1.2]) { const p = prog(t, h, h + .2); if (p > 0 && p < 1) for (let i = 0; i < 6; i++) { const a = -2.6 + i * .45; sparks += `<path d="M ${740 + Math.cos(a) * 30 * (1 + p * 2)} ${1240 + Math.sin(a) * 30 * (1 + p * 2)} l ${Math.cos(a) * 26} ${Math.sin(a) * 26}" stroke="${P.goldHi}" stroke-width="7" stroke-linecap="round" opacity="${1 - p}"/>`; } }
  // moth from the used jacket
  const mp = prog(t, 1.5, 2.6);
  const moth = mp > 0 && mp < 1 ? `<g transform="translate(${820 - 220 * mp + 40 * Math.sin(mp * 14)} ${880 - 480 * mp})"><path d="M 0 0 L -22 ${-14 + 10 * Math.sin(t * 50)} L -18 10 Z M 0 0 L 22 ${-14 + 10 * Math.sin(t * 50)} L 18 10 Z" fill="${P.greyHi}" ${ST(3)}/></g>` : '';
  const spot = uni ? `<circle cx="820" cy="880" r="${420 * eout(prog(t, 2.04, 2.3))}" fill="url(#kspot)"/>` : '';
  return `${R(0, 0, 1080, 1920, '#CDB48E')}${Array.from({ length: 10 }, (_, i) => `<path d="M ${i * 110 + 40} 0 V 1920" stroke="#B89C74" stroke-width="5"/>`).join('')}
    <rect x="40" y="520" width="680" height="22" fill="${P.woodSh}" ${ST(5)}/>${shelf}
    <rect x="60" y="640" width="250" height="300" fill="#F6EBC6" ${ST(7)}/><path d="M 185 640 V 940 M 60 790 H 310" ${ST(7)}/>
    ${spot}
    <g transform="rotate(${swing} 820 560)"><path d="M 820 560 V 620" ${ST(5)}/><path d="M 720 670 Q 820 600 920 670" fill="none" stroke="${P.woodSh}" stroke-width="14"/>${jacketShape(820, 670, 1.25, { epaul: 1, patch: 1 })}${helmetAt(820, 560, .8, -6)}</g>
    ${puff(820, 900, t, 1.46, 8, 30, 180, P.paperSh)}${moth}
    ${fig(380, 1820, 1.85, { kind: 'voigtShoe', aR: uni ? lerp(-70, -95, reach) : aR, propR: uni ? null : hammerP(lerp(-150, -95, hit)), aL: -28, bendL: -40, look: uni ? 14 : 8, lookY: uni ? -8 : 10, eyeS: uni ? 1.7 : 1, brow: uni ? 'up' : 'calm', mouth: uni ? 'o' : 'flat' })}
    <rect x="-20" y="1330" width="1120" height="620" fill="${P.wood}" ${ST(7)}/><rect x="-20" y="1330" width="1120" height="40" fill="${P.woodHi}" ${ST(6)}/>
    <path d="M 660 1330 L 672 1240 Q 730 1190 800 1226 L 836 1330 Z" fill="${P.black}" ${ST(5)}/><path d="M 672 1262 Q 730 1226 810 1262" stroke="#5a4a40" stroke-width="6" fill="none"/>
    ${sparks}${stamp(540, 250, -6, 'KÖPENICK · 1906', pop(t, .1, .22))}`;
}

function sMarch(t) {
  const z = 1 + .07 * eio(prog(t, 2.62, 5.64));
  const open = back(prog(t, 4.32, 4.6));
  const sh = shk(t, 4.32, 10);
  const x = lerp(140, 330, eout(prog(t, 2.62, 3.15)));
  const walking = t < 3.15;
  const draw = back(prog(t, 3.12, 3.4));
  const aR = lerp(-10, -120, draw);
  let birds = '';
  if (t > 4.32) for (let i = 0; i < 5; i++) { const p = prog(t, 4.32 + i * .05, 5.6); birds += pigeon(380 + i * 80 + p * (200 + i * 60), 500 - p * (380 + i * 40), .55, t * 30 + i); }
  return `${sky()}<g transform="translate(${540 + sh} 1100) scale(${z}) translate(-540 -1100)">
    ${rathaus(540, 1250, .82, { open, flag: t })}${birds}
    ${cobbles(1255, 1920)}
    ${fig(x, 1650, 1.25, { kind: 'voigt', walk: walking ? walkPh(t) : undefined, aR, propR: draw > .05 ? swordP(180 + aR) : null, noSword: draw > .05, aL: 10, mouth: t > 3.1 && t < 3.6 ? 'o' : 'flat', brow: 'angry', look: 10, lookY: -6 })}
    ${puff(x, 1250, t, 2.62, 10, 46, 220)}</g>`;
}

function berlinSkyline(y) {
  let s = rowHouses(y, P.paperDk, 0);
  // Brandenburger Tor silhouette
  s += `<g transform="translate(540 ${y}) scale(1.1)"><rect x="-230" y="-300" width="460" height="300" fill="${P.stone}" ${ST(6)}/><rect x="-250" y="-340" width="500" height="60" fill="${P.stone}" ${ST(6)}/>
    ${[-190, -110, -30, 50, 130].map(xx => `<rect x="${xx}" y="-280" width="60" height="280" fill="#5A4E46" ${ST(4)}/>`).join('')}
    ${[-210, -130, -50, 30, 110, 190].map(xx => `<rect x="${xx}" y="-280" width="20" height="280" fill="${P.stoneSh}" ${ST(4)}/>`).join('')}
    <path d="M -60 -340 L -40 -400 L 40 -400 L 60 -340 Z" fill="${P.olive}" ${ST(5)}/></g>`;
  return s;
}
function calendar(x, y, s, num, month, flipP, rot = 0) {
  const page = (n, extra = '') => `<rect x="-250" y="-200" width="500" height="560" rx="14" fill="${P.white}" ${ST(7)} ${extra}/>${TX(0, 230, 330, n, P.ink)}`;
  let fly = '';
  if (flipP > 0 && flipP < 1) fly = `<g transform="translate(0 -200) rotate(${-140 * ein(flipP)}) translate(${-30 * flipP} ${-180 * flipP})" opacity="${1 - flipP}">${page(num - 1)}</g>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#drop)">${page(num)}
    <rect x="-250" y="-300" width="500" height="120" rx="14" fill="${P.red}" ${ST(7)}/>${TX(0, -218, 66, month, P.white, { ls: 6 })}
    ${[-150, -50, 50, 150].map(xx => `<rect x="${xx - 9}" y="-330" width="18" height="60" rx="9" fill="${P.silver}" ${ST(4)}/>`).join('')}${fly}</g>`;
}
function sDate(t) {
  const flips = [5.66, 5.82, 5.98, 6.14, 6.3];
  let n = 11, fp = 0;
  for (let i = 0; i < flips.length; i++) if (t >= flips[i]) { n = 12 + i; fp = prog(t, flips[i], flips[i] + .25); }
  if (t >= 6.43) { n = 16; fp = prog(t, 6.43, 6.68); }
  const land = shk(t, 6.43, 8);
  const st = pop(t, 7.48, .2);
  const sh = shk(t, 7.48, 14);
  let birds = '';
  if (t > 7.5) for (let i = 0; i < 6; i++) { const p = prog(t, 7.5 + i * .04, 8.9); birds += pigeon(160 + i * 140 + p * 160, 1060 - p * (600 + i * 50), .6, t * 30 + i); }
  return `<g transform="translate(${sh} 0)">${sky()}${berlinSkyline(1300)}${cobbles(1300, 1920)}
    <g><rect x="70" y="760" width="18" height="560" fill="${P.black}" ${ST(4)}/><path d="M 40 760 L 118 760 L 100 690 L 58 690 Z" fill="#F3D98C" ${ST(5)}/></g>
    ${calendar(540, 640 + land, .95, n, 'OKTOBER', fp, -3)}${birds}
    ${stamp(540, 1040, -7, '16.10.1906', st, { sz: 96, bg: P.paper })}</g>`;
}

function deskTop(col = P.woodSh) { let s = R(0, 0, 1080, 1920, col); for (let i = 0; i < 26; i++) s += `<path d="M -20 ${i * 76 + 20} Q 540 ${i * 76 + 20 + 30 * Math.sin(i)} 1100 ${i * 76 + 10}" stroke="${P.woodHi}" stroke-width="3" opacity=".35" fill="none"/>`; return s; }
function polaroid(x, y, rot, s, dev, inner) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#drop)"><rect x="-210" y="-250" width="420" height="500" fill="${P.white}" ${ST(5)}/>
    <clipPath id="kpol${Math.round(x)}"><rect x="-180" y="-220" width="360" height="360"/></clipPath>
    <g clip-path="url(#kpol${Math.round(x)})">${R(-180, -220, 360, 360, '#CFC2A8')}${Array.from({ length: 7 }, (_, i) => `<path d="M -180 ${-200 + i * 50} H 180" stroke="#9E8F75" stroke-width="3"/>`).join('')}${inner}
    <rect x="-180" y="-220" width="360" height="360" fill="#2A2421" opacity="${1 - dev}"/></g>
    <rect x="-180" y="-220" width="360" height="360" fill="none" ${ST(4)}/></g>`;
}
function sFile(t) {
  const sl = eout(prog(t, 8.9, 9.25));
  const fx = lerp(1300, 560, sl);
  const dev = eio(prog(t, 9.05, 9.9));
  const n57 = pop(t, 9.76, .22);
  const mug = G('translate(0 1250) scale(2.2)', fig(0, 0, 1, { kind: 'voigtCiv', hat: 'none', mouth: 'frown', look: 0 }));
  const drift = 6 * Math.sin(t * 1.4);
  return `${deskTop()}
    <g transform="translate(${fx} ${880 + drift}) rotate(${lerp(8, -3, sl)})" filter="url(#drop)">
      <path d="M -420 -520 L -160 -520 L -130 -470 L 420 -470 L 420 520 L -420 520 Z" fill="#D9B878" ${ST(6)}/>
      ${TX(-290, -478, 40, 'W. VOIGT', P.ink, { ls: 3 })}
      <rect x="-380" y="-430" width="760" height="910" fill="#F2E7CF" ${ST(4)}/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M 40 ${-200 + i * 56} h ${300 - 60 * hash(i)}" stroke="#9A8A72" stroke-width="9"/>`).join('')}
      ${polaroid(-170, -130, -5, .9, dev, mug)}
      <path d="M -230 -360 q 0 -50 30 -50 q 30 0 30 50 v 120" fill="none" stroke="${P.silver}" stroke-width="10"/>
      ${n57 > 0 ? `<g transform="translate(180 330) rotate(-8) scale(${n57})"><circle r="120" fill="none" stroke="${P.red}" stroke-width="10"/>${TX(0, 52, 150, '57', P.red)}</g>` : ''}
    </g>`;
}

function tally(n, x0, y0) { let s = ''; for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5, gx = x0 + (g % 4) * 110, gy = y0 + Math.floor(g / 4) * 150; s += j < 4 ? `<path d="M ${gx + j * 20} ${gy} l ${3} 100" stroke="#F2E7CF" stroke-width="8" stroke-linecap="round"/>` : `<path d="M ${gx - 12} ${gy + 70} L ${gx + 80} ${gy + 20}" stroke="#F2E7CF" stroke-width="8" stroke-linecap="round"/>`; } return s; }
function bars(x, col = P.black, spacing = 150, w = 26) { let s = ''; for (let bx = -60; bx < 1140; bx += spacing) s += `<rect x="${bx + x}" y="-20" width="${w}" height="1960" fill="${col}" ${ST(4)}/>`; return s + `<rect x="${x - 100}" y="420" width="1400" height="30" fill="${col}" ${ST(4)}/>`; }
function sCell(t) {
  const n = Math.floor(cl((t - 11.4) / 2.1) * 40);
  const scr = Math.sin(t * 26) * 6 * (t > 11.4 && t < 13.5 ? 1 : 0);
  const bx = lerp(1200, 0, eout(prog(t, 11.08, 11.3))) + shk(t, 11.3, 14, 7);
  return `${cellSet(t)}${tally(n, 520, 620)}
    <rect x="80" y="1200" width="420" height="70" fill="${P.woodSh}" ${ST(5)}/>
    ${fig(330, 1500, 1.25, { kind: 'voigtCiv', hat: 'none', aR: -78 + scr, bendR: -30, aL: 12, look: 12, lookY: -4, mouth: 'frown', brow: 'worried' })}
    <g opacity=".95">${bars(bx)}</g>`;
}

function shopShelves() {
  let s = R(0, 0, 1080, 1920, '#B99B70');
  for (const y of [380, 640, 900]) s += `<rect x="0" y="${y}" width="1080" height="24" fill="${P.woodSh}" ${ST(5)}/>`;
  const items = [[90, 380, 'clock'], [250, 380, 'jug'], [430, 380, 'boot'], [640, 380, 'clock'], [830, 380, 'jug'], [120, 640, 'boot'], [330, 640, 'jug'], [560, 640, 'horn'], [880, 640, 'boot'], [200, 900, 'jug'], [700, 900, 'clock']];
  for (const [x, y, k] of items) {
    if (k === 'clock') s += `<rect x="${x - 50}" y="${y - 150}" width="100" height="150" rx="16" fill="${P.wood}" ${ST(5)}/><circle cx="${x}" cy="${y - 100}" r="34" fill="${P.white}" ${ST(4)}/><path d="M ${x} ${y - 100} l 0 -24 M ${x} ${y - 100} l 16 6" ${ST(4)}/>`;
    if (k === 'jug') s += `<path d="M ${x - 40} ${y} Q ${x - 60} ${y - 80} ${x - 30} ${y - 120} L ${x + 30} ${y - 120} Q ${x + 60} ${y - 80} ${x + 40} ${y} Z" fill="${P.olive}" ${ST(5)}/>`;
    if (k === 'boot') s += `<path d="M ${x - 30} ${y} L ${x - 30} ${y - 120} L ${x + 10} ${y - 120} L ${x + 10} ${y - 40} L ${x + 60} ${y - 30} L ${x + 60} ${y} Z" fill="${P.black}" ${ST(5)}/>`;
    if (k === 'horn') s += `<path d="M ${x} ${y} V ${y - 80} L ${x + 120} ${y - 200} Q ${x + 160} ${y - 120} ${x + 110} ${y - 90} L ${x + 20} ${y - 80}" fill="${P.goldHi}" ${ST(5)}/><rect x="${x - 50}" y="${y - 60}" width="100" height="60" fill="${P.wood}" ${ST(5)}/>`;
  }
  return s;
}
function sShop(t) {
  const hx = lerp(820, 520, eout(prog(t, 13.85, 14.3)));
  const grab = prog(t, 14.96, 15.2);
  const onHead = t > 15.18;
  const helmet = grab <= 0 ? helmetAt(hx, 1140, .9, 0) : '';
  const voigtAR = grab > 0 ? lerp(-60, -170, eout(grab)) : (t > 14.4 ? -60 : -15);
  return `${shopShelves()}
    ${fig(790, 1760, 1.6, { kind: 'dealer', aL: t < 14.3 ? lerp(20, 60, prog(t, 13.7, 13.9)) : 15, look: -12, mouth: talk(t, 13.7, 14.6), brow: 'calm' })}
    ${fig(290, 1800, 1.65, { kind: 'voigtCiv', hat: onHead ? 'pickel' : 'cap', aR: voigtAR, look: 14, lookY: 6, mouth: onHead ? 'smile' : 'flat', eyeS: grab > 0 && !onHead ? 1.5 : 1 })}
    <rect x="-20" y="1260" width="1120" height="680" fill="${P.wood}" ${ST(7)}/><rect x="-20" y="1260" width="1120" height="36" fill="${P.woodHi}" ${ST(6)}/>
    ${helmet}${coinsFall(t, 14.5, 470, 1000, 1265, 3)}${puff(290, 1800 - 640 * 1.65, t, 15.18, 8, 30, 140)}`;
}

function sDummy(t) {
  const times = [15.42, 15.94, 16.48, 16.98, 17.5];
  let idx = -1; for (let i = 0; i < times.length; i++) if (t >= times[i]) idx = i;
  const aw = [[P.red, P.white], [P.olive, P.paper], [P.blueHi, P.paper], [P.brown, P.paper], [P.red, P.olive], [P.red, P.white]][idx + 1];
  const bump = idx >= 0 ? ring(t, times[idx], 3, 6) * 6 : 0;
  const arrive = (i, fromX, fromY) => { const p = back(prog(t, times[i] - .22, times[i])); return [lerp(fromX, 0, p), lerp(fromY, 0, p), p]; };
  let pieces = '';
  const cx = 540, cy = 760;
  if (t > times[1] - .22) { const [dx, dy] = arrive(1, -700, 200); pieces += trousers(cx + dx, cy + 330 + dy, 1); }
  if (t > times[0] - .22) { const [dx, dy] = arrive(0, 700, -100); pieces += jacketShape(cx + dx, cy + dy, 1, { epaul: t > times[4] }); }
  if (t > times[3] - .22) { const [dx, dy] = arrive(3, -700, -200); pieces += `<g transform="translate(${dx} ${dy})"><rect x="${cx - 80}" y="${cy + 250}" width="160" height="22" fill="${P.silver}" ${ST(4)}/><path d="M ${cx - 70} ${cy + 270} L ${cx - 140} ${cy + 560}" stroke="${P.silver}" stroke-width="14" stroke-linecap="round"/><path d="M ${cx - 70} ${cy + 270} L ${cx - 140} ${cy + 560}" stroke="${OL}" stroke-width="3"/></g>`; }
  if (t > times[2] - .22) { const [dx, dy] = arrive(2, 200, -900); pieces += helmetAt(cx + dx, cy - 70 + dy, .95, 0); }
  let tings = '';
  if (idx >= 0) { const p = prog(t, times[idx], times[idx] + .3); if (p < 1) tings = `<circle cx="${cx}" cy="${cy + 200}" r="${200 + 300 * p}" fill="none" stroke="${P.goldHi}" stroke-width="${14 * (1 - p)}" opacity="${1 - p}"/>`; }
  let stripes = ''; for (let i = 0; i < 12; i++) stripes += `<path d="M ${i * 90} 0 h 90 v 200 q -45 40 -90 0 Z" fill="${i % 2 ? aw[0] : aw[1]}" ${ST(4)}/>`;
  const vx = lerp(1200, 830, eout(prog(t, 17.6, 18.0)));
  return `${R(0, 0, 1080, 1920, P.paper)}${rowHouses(1300, P.paperDk, idx * 200)}${R(0, 1300, 1080, 640, '#B9A07A')}
    <g transform="translate(0 ${-30 * (1 - eout(prog(t, idx >= 0 ? times[idx] - .1 : 0, idx >= 0 ? times[idx] + .1 : 1)))})">${stripes}</g>
    <g transform="translate(0 ${bump})"><rect x="${cx - 8}" y="${cy + 300}" width="16" height="500" fill="${P.woodSh}" ${ST(4)}/><path d="M ${cx - 120} ${cy + 830} L ${cx + 120} ${cy + 830} L ${cx} ${cy + 780} Z" fill="${P.woodSh}" ${ST(5)}/>
      <path d="M ${cx - 80} ${cy} Q ${cx - 110} ${cy + 150} ${cx - 70} ${cy + 330} L ${cx + 70} ${cy + 330} Q ${cx + 110} ${cy + 150} ${cx + 80} ${cy} Q ${cx} ${cy - 20} ${cx - 80} ${cy} Z" fill="#D9C7A0" ${ST(5)}/><rect x="${cx - 14}" y="${cy - 60}" width="28" height="60" fill="${P.woodSh}" ${ST(4)}/><circle cx="${cx}" cy="${cy - 70}" r="26" fill="${P.woodSh}" ${ST(4)}/>
      ${pieces}</g>${tings}
    ${t > 17.6 ? fig(vx, 1700, 1.15, { kind: 'voigtCiv', aL: 30, bendL: -40, look: -14, mouth: 'smile', brow: 'up' }) : ''}`;
}

function streetClock(cx, cy, r, h, m) {
  return `<g transform="translate(${cx} ${cy})" filter="url(#drop)"><rect x="-24" y="${r}" width="48" height="1300" fill="${P.green}" ${ST(6)}/><circle r="${r + 26}" fill="${P.green}" ${ST(7)}/><circle r="${r}" fill="${P.white}" ${ST(7)}/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M ${Math.sin(i * .5236) * r * .8} ${-Math.cos(i * .5236) * r * .8} L ${Math.sin(i * .5236) * r * .92} ${-Math.cos(i * .5236) * r * .92}" ${ST(i % 3 ? 6 : 12)}/>`).join('')}
    <path d="M 0 0 L ${Math.sin((h % 12 + m / 60) * .5236) * r * .5} ${-Math.cos((h % 12 + m / 60) * .5236) * r * .5}" ${ST(20)}/><path d="M 0 0 L ${Math.sin(m * .10472) * r * .78} ${-Math.cos(m * .10472) * r * .78}" ${ST(12)}/><circle r="18" fill="${P.gold}" ${ST(5)}/></g>`;
}
function sNoon(t) {
  const p = eout(prog(t, 18.28, 18.5));
  const m = lerp(-25, 0, p) + 2 * ring(t, 18.5, 3, 7);
  let legs = '';
  for (let i = 0; i < 8; i++) {
    const x = ((i * 170 + (t - 18.28) * 300) % 1360) - 140, ph = t * 9 + i * .4;
    legs += `<g transform="translate(${x} 1400) scale(1.6)"><path d="M -80 -420 L 80 -420 L 88 -228 L -88 -228 Z" fill="${P.blueSol}" ${ST(6)}/><rect x="-88" y="-330" width="176" height="20" fill="${P.black}"/><path d="M 96 -420 L 110 -150" stroke="${P.wood}" stroke-width="26" stroke-linecap="round"/><g transform="rotate(${22 * Math.sin(ph)} 0 -250)"><rect x="-21" y="-262" width="42" height="240" rx="12" fill="${P.black}" ${ST()}/><path d="M -25 -36 L 23 -36 Q 40 -10 34 0 L -27 0 Z" fill="${P.black}" ${ST(5)}/></g><g transform="rotate(${-22 * Math.sin(ph)} 0 -250)"><rect x="-21" y="-262" width="42" height="240" rx="12" fill="#3a302b" ${ST()}/><path d="M -25 -36 L 23 -36 Q 40 -10 34 0 L -27 0 Z" fill="${P.black}" ${ST(5)}/></g></g>`;
  }
  return `${sky()}${rowHouses(1100, P.paperDk, 400)}${cobbles(1100, 1920, (t - 18.28) * 200)}${streetClock(540, 560, 300, 12, m)}${legs}`;
}

function sStop(t) {
  const stopT = 21.0;
  let sol = '';
  for (let i = 5; i >= 0; i--) {
    const tx = 610 - i * 105;
    const run = t < stopT ? (t - stopT) * 160 : 0;
    const bumpT = stopT + i * .07;
    const sq = t > bumpT ? ring(t, bumpT, 3, 8) : 0;
    sol += fig(tx + run - sq * 12, 1400 + (i % 2) * 14, .82, { kind: 'soldier', walk: t < bumpT ? walkPh(t) + i : undefined, backR: rifle, aR: -6, aL: t < bumpT ? 15 * Math.sin(walkPh(t) + i) : 6, eyeS: t > bumpT ? 1.5 : 1, brow: t > bumpT ? 'up' : 'calm', mouth: t > bumpT ? 'o' : 'flat', rot: sq * -5, look: 6 });
  }
  const vx = lerp(1250, 860, eout(prog(t, 19.8, 20.45)));
  const raise = back(prog(t, 20.85, 21.05));
  return `${sky()}${rowHouses(1200, P.paperDk, 900)}${cobbles(1200, 1920)}${sol}
    ${fig(vx, 1440, .95, { kind: 'voigt', walk: t < 20.45 ? walkPh(t) : undefined, aL: lerp(8, 95, raise), bendL: 30 * raise, aR: -8, look: -14, brow: 'angry', mouth: raise > .5 && t < 21.4 ? 'o' : 'flat' })}`;
}

function helmetBack(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -150 300 Q -160 120 -60 90 L 60 90 Q 160 120 150 300 Z" fill="${P.blueSol}" ${ST(7)}/><rect x="-40" y="60" width="80" height="50" fill="${P.red}" ${ST(5)}/><ellipse cx="-60" cy="10" rx="14" ry="20" fill="${P.skin}" ${ST(4)}/><ellipse cx="60" cy="10" rx="14" ry="20" fill="${P.skin}" ${ST(4)}/><ellipse cx="0" cy="0" rx="62" ry="72" fill="#6A4A30" ${ST(6)}/><rect x="-30" y="60" width="60" height="30" fill="${P.skinSh}"/><g transform="translate(0 545)">${hat('pickel', KIND.soldier)}</g></g>`; }
function sOrder(t) {
  const pull = eout(prog(t, 21.96, 22.35));
  const open = eout(prog(t, 23.0, 23.34));
  const hit = shk(t, 23.34, 8, 9);
  return `${R(0, 0, 1080, 1920, P.sky2)}${speedLines(t * .2, 540, 700, 16, P.paper)}
    ${fig(400 + hit, 2080, 2.15, { kind: 'voigt', aR: lerp(-8, -20, pull), bendR: lerp(0, -80, pull), propR: pull > .3 ? paperP(lerp(.15, 1, open), 170) : null, look: -10, brow: 'angry', mouth: talk(t, 21.85, 23.3) })}
    ${helmetBack(150, 1150, 1.25)}`;
}

function crown(x, y, s, t) {
  let rays = ''; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * .5; rays += `<path d="M 0 0 L ${Math.cos(a) * 520} ${Math.sin(a) * 520} L ${Math.cos(a + .1) * 520} ${Math.sin(a + .1) * 520} Z" fill="${P.goldHi}" opacity=".35"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${rays}<circle r="260" fill="url(#kgold)"/>
    <path d="M -150 60 L -170 -90 L -90 -20 L -40 -130 L 0 -40 L 40 -130 L 90 -20 L 170 -90 L 150 60 Z" fill="${P.gold}" ${ST(7)}/><rect x="-160" y="50" width="320" height="50" rx="10" fill="${P.gold}" ${ST(7)}/>
    ${[-100, -35, 35, 100].map(xx => `<circle cx="${xx}" cy="75" r="12" fill="${P.red}" ${ST(4)}/>`).join('')}<path d="M 0 -140 v -60 M -24 -176 h 48" ${ST(10)} stroke="${P.gold}"/><path d="M 0 -140 v -60 M -24 -176 h 48" fill="none" ${ST(4)}/></g>`;
}
function cloud(x, y, s) { return `<path transform="translate(${x} ${y}) scale(${s})" d="${scallop(0, 0, 220, 80, 9)}" fill="${P.white}" ${ST(6)}/>`; }
function sUp(t) {
  const point = back(prog(t, 23.62, 23.92));
  const cam = eio(prog(t, 23.95, 24.55)) * 1350;
  return `${R(0, 0, 1080, 1920, '#F1DDB2')}<g transform="translate(0 ${cam})">
    ${R(-40, -1500, 1160, 1600, '#E9D6A8')}${cloud(250, -100, 1)}${cloud(820, -300, .8)}${cloud(400, -550, 1.1)}
    ${crown(560, -900, 1 + .08 * Math.sin(t * 6), t)}
    ${fig(470, 2050, 1.7, { kind: 'voigt', aR: lerp(-30, -172, point), bendR: 0, lookY: -16, look: 4, brow: 'angry', mouth: talk(t, 23.6, 24.3) })}</g>`;
}

function sNobody(t) {
  const ask = t > 25.35 && t < 25.85;
  const nod = t > 25.98 ? 18 * Math.sin(prog(t, 25.98, 26.3) * Math.PI) : 0;
  const lookSide = t > 25.42 && t < 25.98;
  const head = (x, i) => fig(x, 1980, 1.6, { kind: 'soldier', aR: i === 1 && ask ? -140 : -6, bendR: i === 1 && ask ? -30 : 0, aL: 8,
    look: lookSide ? (i === 0 ? 12 : i === 2 ? -12 : 0) : (t < 25.4 ? 10 * Math.sin(t * 7 + i * 2) : 0), headDy: nod, eyeS: i === 1 && ask ? 1.5 : 1,
    mouth: i === 1 && ask ? 'o' : 'flat', brow: lookSide && i !== 1 ? 'angry' : i === 1 && t > 25.85 && t < 26.4 ? 'worried' : 'calm', sweat: i === 1 && t > 25.85 });
  return `${R(0, 0, 1080, 1920, P.paper)}${speedLines(0, 540, 900, 18, P.paperSh)}${head(230, 0)}${head(850, 2)}${head(540, 1)}
    ${qmark(540, 720, ask ? pop(t, 25.4, .2) : 0, P.red, 150)}`;
}

function sCount(t) {
  const n = Math.min(10, Math.floor((t - 26.94) / .06) + 1);
  const go = t > 27.96 ? (t - 27.96) * 230 : 0;
  let sol = '';
  for (let i = 10; i >= 0; i--) {
    const t0 = i < 10 ? 26.94 + i * .06 : 27.42;
    if (t < t0) continue;
    const p = back(prog(t, t0, t0 + .18));
    const x = 700 - i * 64 + go, y = 1360 + (i % 2) * 10;
    const s = .72 * p;
    const f = fig(x, y, s, { kind: 'soldier', backR: rifle, aR: -6, walk: t > 27.96 ? walkPh(t) + i * .3 : undefined, look: 10 });
    sol += i === 10 ? `<g opacity=".5">${f}</g>${qmark(x, y - 640, pop(t, 27.5, .2), P.olive, 120)}` : f;
  }
  const big = pop(t, 26.94 + (n - 1) * .06, .12);
  return `${sky()}${rowHouses(1250, P.paperDk, 1600 + go * .5)}${cobbles(1250, 1920, go)}${sol}
    ${fig(860 + go, 1390, .8, { kind: 'voigt', walk: t > 27.96 ? walkPh(t) : undefined, look: -10, brow: 'angry', aR: -8 })}
    ${n > 0 ? `<g transform="translate(400 380) scale(${.8 + .2 * big})">${TX(0, 0, 230, n, P.red, { sw: 12, sc: P.white })}</g>` : ''}
    ${t > 27.42 ? `<g transform="translate(700 320) scale(${pop(t, 27.42, .2)})">${TX(0, 0, 120, '11?', P.olive, { sw: 9, sc: P.white })}</g>` : ''}`;
}

function sTrain(t) {
  const sc = (t - 28.68) * 900;
  let poles = '';
  for (let i = 0; i < 6; i++) { const x = ((i * 380 - sc) % 2280 + 2280) % 2280 - 300; poles += `<rect x="${x}" y="760" width="16" height="560" fill="${P.woodSh}" ${ST(4)}/><rect x="${x - 50}" y="780" width="116" height="14" fill="${P.woodSh}"/>`; }
  let trees = '';
  for (let i = 0; i < 12; i++) { const x = ((i * 130 - sc * .3) % 1560 + 1560) % 1560 - 200; trees += `<circle cx="${x}" cy="${1000 - 40 * hash(i)}" r="${70 + 20 * hash(i + 3)}" fill="${i % 2 ? P.olive : P.oliveHi}" ${ST(5)}/>`; }
  const pass = (c, j, wx) => {
    const isV = c === 0 && j === 0;
    const b = 4 * Math.sin(t * 14 + j + c * 3);
    return `<g transform="translate(${wx + 35} ${-178 + b}) scale(.24)">${isV ? fig(0, 0, 1, { kind: 'voigt', look: 10, mouth: 'smile' }) : fig(0, 0, 1, { kind: 'soldier', look: 8 * Math.sin(t * 3 + j) })}</g>`;
  };
  const whistle = prog(t, 29.5, 30.3);
  const signX = lerp(1400, -400, prog(t, 30.5, 31.4));
  return `${sky()}${trees}${R(-20, 1080, 1120, 900, P.grass)}${R(-20, 1260, 1120, 50, P.stoneSh)}${Array.from({ length: 14 }, (_, i) => `<rect x="${((i * 90 - sc) % 1260 + 1260) % 1260 - 90}" y="1290" width="60" height="20" fill="${P.woodSh}"/>`).join('')}
    ${poles}
    <g transform="translate(0 ${2 * Math.sin(t * 22)})">${train(820, 1270, .8, t, { pass })}</g>
    ${whistle > 0 && whistle < 1 ? `<g opacity="${1 - whistle}">${cloud(1000 - 260 * whistle, 900 - 300 * whistle, .5 + whistle)}</g>` : ''}
    <g transform="translate(${signX} 0)"><rect x="-8" y="900" width="16" height="420" fill="${P.black}"/><rect x="-200" y="830" width="400" height="100" rx="8" fill="${P.white}" ${ST(6)}/>${TX(0, 902, 62, 'KÖPENICK', P.ink, { ls: 3 })}</g>`;
}

function sMap(t) {
  const z = 1 + .12 * eio(prog(t, 31.5, 34.4));
  const tp = eio(prog(t, 31.55, 32.9));
  const bx = 380, by = 560, kx = 760, ky = 960;
  const px = lerp(bx + 120, kx - 60, tp), py = lerp(by + 150, ky - 40, tp) - 30 * Math.sin(tp * Math.PI);
  const border = prog(t, 32.56, 33.0);
  const blink = t > 33.56 ? .5 + .5 * Math.sin((t - 33.56) * 18) * Math.exp(-(t - 33.56) * 3) : 0;
  let grid = ''; for (let i = 0; i < 12; i++) grid += `<path d="M ${i * 100} 0 V 1920 M 0 ${i * 170} H 1080" stroke="${P.paperDk}" stroke-width="2" opacity=".5"/>`;
  const berlin = `M ${bx - 260} ${by} Q ${bx - 250} ${by - 230} ${bx - 20} ${by - 260} Q ${bx + 230} ${by - 250} ${bx + 270} ${by - 30} Q ${bx + 290} ${by + 200} ${bx + 60} ${by + 260} Q ${bx - 200} ${by + 270} ${bx - 260} ${by} Z`;
  return `${R(0, 0, 1080, 1920, P.paper)}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${grid}
    <path d="M -40 ${by + 40} Q ${bx} ${by + 80} ${bx + 200} ${by + 170} Q ${kx - 100} ${ky - 80} ${kx} ${ky + 20} Q ${kx + 200} ${ky + 120} 1120 ${ky + 60}" stroke="#7FA1A8" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="${berlin}" fill="${P.paperDk}" ${ST(6)} opacity=".95"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M ${bx - 200 + i * 42} ${by - 180} l -60 360" stroke="${P.brown}" stroke-width="4" opacity=".35"/>`).join('')}
    <path d="${berlin}" fill="none" stroke="${P.red}" stroke-width="${10 * blink}" opacity="${blink}"/>
    <circle cx="${kx}" cy="${ky}" r="110" fill="${P.paperSh}" ${ST(6)}/>
    <circle cx="${kx}" cy="${ky}" r="150" fill="none" stroke="${P.red}" stroke-width="9" stroke-dasharray="22 14" pathLength="1000" style="stroke-dasharray:${22 * border} 14"/>
    <path d="M ${bx + 120} ${by + 150} Q ${(bx + kx) / 2} ${(by + ky) / 2 - 60} ${kx - 60} ${ky - 40}" stroke="${OL}" stroke-width="8" fill="none" stroke-dasharray="20 14"/>
    <circle cx="${bx}" cy="${by}" r="16" fill="${OL}"/>
    ${t > 33.56 ? `<g transform="translate(${bx} ${by - 40}) scale(${pop(t, 33.56, .2)})">${TX(0, 0, 70, 'BERLIN', P.ink, { ls: 6 })}</g>` : ''}
    <g transform="translate(${px} ${py}) scale(.22)">${train(150, 120, 1, t)}</g>
    ${stamp(kx - 30, ky + 230, -6, 'KÖPENICK · 1906', pop(t, 33.0, .2), { sz: 44 })}</g>`;
}

function sBeer(t) {
  const sc = (t - 34.42) * 600;
  const hand = eout(prog(t, 34.9, 35.6));
  const cheers = back(prog(t, 35.85, 36.1));
  const clink = t > 36.1 ? prog(t, 36.1, 36.5) : 0;
  let splash = '';
  if (clink > 0 && clink < 1) for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * .3; splash += `<circle cx="${540 + Math.cos(a) * 160 * clink}" cy="${660 + Math.sin(a) * 160 * clink + 200 * clink * clink}" r="${12 * (1 - clink) + 4}" fill="${P.foam}" ${ST(3)}/>`; }
  let win = '';
  for (let i = 0; i < 8; i++) { const x = ((i * 200 - sc) % 1600 + 1600) % 1600 - 200; win += `<circle cx="${x}" cy="${520 + 30 * hash(i)}" r="${60 + 30 * hash(i + 1)}" fill="${i % 2 ? P.olive : P.oliveHi}" ${ST(4)}/>`; }
  const rise = cheers * 70;
  return `${R(0, 0, 1080, 1920, P.woodSh)}${R(0, 380, 1080, 300, '#DCEBEA')}${win}${R(0, 380, 1080, 300, 'none', ST(10))}
    ${[0, 360, 720].map(x => `<rect x="${x}" y="370" width="30" height="320" fill="${P.wood}" ${ST(5)}/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M 0 ${760 + i * 120} H 1080" stroke="${P.wood}" stroke-width="10"/>`).join('')}
    ${fig(180, 1880, 1.3, { kind: 'soldier', aR: lerp(-30, -120, hand) - rise * .4, bendR: -20, propR: hand > .3 ? mugP(1, 0) : null, look: 14, mouth: cheers > .5 ? 'laugh' : 'smile', brow: 'up' })}
    ${fig(900, 1880, 1.3, { kind: 'soldier', aL: lerp(30, 120, hand) + rise * .4, bendL: 20, propL: hand > .3 ? mugP(1, 0) : null, look: -14, mouth: cheers > .5 ? 'laugh' : 'smile', brow: 'up' })}
    ${fig(540, 1820, 1.25, { kind: 'voigt', aR: -120 - rise * .5, bendR: 10, propR: mugP(1, 0), aL: 20, look: 0, mouth: 'smile', brow: 'up' })}
    ${splash}`;
}

function sGuards(t) {
  const doorTimes = [38.0, 38.28, 38.52, 38.76];
  const s = .9, gy = 1330, cx = 540;
  const groupX = lerp(-300, 140, eout(prog(t, 36.68, 37.3)));
  let gs = '';
  doorTimes.forEach((dt, i) => {
    const p = prog(t, dt - .2, dt);
    const sx = groupX + i * 50, sy = gy + 40 + (i % 2) * 20;
    const tx = cx + RH_DOORS[i] * s, ty = gy;
    const x = lerp(sx, tx, eio(p)), y = lerp(sy, ty, p) - 120 * Math.sin(p * Math.PI);
    const st = t > dt ? 1 - .08 * Math.exp(-(t - dt) * 10) : 1;
    gs += `<g transform="translate(${x} ${y}) scale(1 ${st}) translate(${-x} ${-y})">${fig(x, y, .6, { kind: 'soldier', backR: rifle, aR: -6, walk: t < 37.3 ? walkPh(t) + i : undefined, look: 0 })}</g>`;
  });
  let target = -1; doorTimes.forEach((dt, i) => { if (t > dt - .3) target = i; });
  const aim = target >= 0 ? lerp(-150, -60, target / 3) : -10;
  return `${sky()}${rathaus(cx, gy, s, { flag: t })}${cobbles(gy + 20, 1920)}${gs}
    ${fig(540, 1640, 1.0, { kind: 'voigt', aR: target >= 0 ? -70 : -10, aL: target >= 0 && target < 2 ? 70 : 8, look: target >= 0 ? (target < 2 ? -10 : 10) : 0, mouth: talk(t, 37.3, 39.0), brow: 'angry' })}
    ${doorTimes.map((dt, i) => puff(cx + RH_DOORS[i] * s, gy, t, dt, 6, 18, 80, P.paperSh)).join('')}`;
}

function office(t) {
  return `${wallpaper()}${R(0, 1000, 1080, 920, P.woodSh)}${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 190 + 20}" y="1030" width="160" height="300" fill="none" stroke="${P.wood}" stroke-width="8"/>`).join('')}
    <g filter="url(#drop)"><rect x="620" y="250" width="300" height="360" fill="${P.gold}" ${ST(6)}/><rect x="645" y="275" width="250" height="310" fill="#CFE0D8" ${ST(4)}/><path d="M 645 520 L 720 420 L 780 480 L 840 390 L 895 470 V 585 H 645 Z" fill="${P.olive}"/></g>`;
}
function sMayor(t) {
  const burst = back(prog(t, 39.66, 39.82));
  const enter = eout(prog(t, 40.4, 40.95));
  const grab = back(prog(t, 40.95, 41.15));
  const lift = 70 * eout(prog(t, 41.05, 41.3));
  let papers = '';
  if (t > 41.05) for (let i = 0; i < 7; i++) { const p = prog(t, 41.05, 41.62); papers += `<rect x="${560 + (i - 3) * 60 * (1 + 3 * p)}" y="${1140 - 500 * p + 900 * p * p * (.5 + hash(i))}" width="90" height="110" fill="${P.white}" ${ST(4)} transform="rotate(${p * 360 * (hash(i) - .5)} ${560 + (i - 3) * 60} 1140)"/>`; }
  const mayor = fig(560, 1640 - lift, 1.3, { kind: 'mayor', aL: lerp(10, 70, grab), aR: t < 39.7 ? -20 + 6 * Math.sin(t * 20) : lerp(-20, -70, grab), bendR: t < 39.7 ? 30 : 0, eyeS: t > 39.72 ? 1.7 : 1, look: t > 39.72 && t < 40.9 ? -14 : 0, mouth: t > 39.72 ? 'o' : 'flat', brow: t > 39.72 ? 'worried' : 'calm', sweat: t > 40.2 });
  return `${office(t)}
    <rect x="40" y="560" width="240" height="460" fill="#2A221E" ${ST(6)}/>
    ${t > 39.75 ? fig(160, 1030, .78, { kind: 'voigt', aR: -75, bendR: -10, look: 12, mouth: talk(t, 39.8, 40.6), brow: 'angry' }) : ''}
    <g transform="translate(40 560) scale(${1 - .85 * burst} 1)"><rect x="0" y="0" width="240" height="460" fill="${P.wood}" ${ST(6)}/><rect x="30" y="30" width="180" height="170" fill="none" stroke="${P.woodSh}" stroke-width="8"/><rect x="30" y="250" width="180" height="170" fill="none" stroke="${P.woodSh}" stroke-width="8"/></g>
    ${fig(lerp(-200, 380, enter), 1660, 1.2, { kind: 'soldier', aR: lerp(-10, -90, grab), look: 12, brow: 'angry' })}
    ${fig(lerp(1300, 750, enter), 1660, 1.2, { kind: 'soldier', aL: lerp(10, 90, grab), look: -12, brow: 'angry' })}
    ${mayor}
    <rect x="200" y="1200" width="760" height="40" fill="${P.woodHi}" ${ST(6)}/><rect x="230" y="1240" width="700" height="400" fill="${P.wood}" ${ST(6)}/>
    ${t < 41.05 ? `<rect x="480" y="1170" width="160" height="40" fill="${P.white}" ${ST(4)}/>` : ''}${papers}`;
}

function corridor() {
  let s = R(0, 0, 1080, 1920, '#D8C39A') + R(0, 1150, 1080, 800, '#9C7E5A');
  for (let i = 0; i < 10; i++) s += `<path d="M ${i * 120} 1150 L ${i * 160 - 180} 1920" stroke="#86694A" stroke-width="5"/>`;
  s += `<rect x="0" y="1080" width="1080" height="70" fill="${P.woodSh}" ${ST(5)}/>`;
  s += `<g filter="url(#drop)"><rect x="80" y="380" width="200" height="250" fill="${P.gold}" ${ST(6)}/><rect x="100" y="400" width="160" height="210" fill="#CFE0D8"/></g>`;
  return s;
}
function sSecretary(t) {
  const walk = t < 42.4;
  const px = lerp(-200, 330, eout(prog(t, 41.62, 42.4)));
  const door = eout(prog(t, 42.3, 42.56));
  const yank = back(prog(t, 43.2, 43.5));
  const sx = lerp(820, 680, yank);
  const leave = t > 44.0 ? (t - 44.0) * 260 : 0;
  const quill = t > 43.25 ? `<path transform="translate(${820 + 30 * prog(t, 43.25, 43.8)} ${1100 + 400 * ein(prog(t, 43.25, 43.8))}) rotate(${300 * prog(t, 43.25, 43.8)})" d="M 0 0 Q 30 -60 10 -120 Q -10 -60 0 0 Z" fill="${P.white}" ${ST(4)}/>` : '';
  return `${corridor()}
    <rect x="700" y="560" width="240" height="560" fill="#2A221E" ${ST(6)}/>
    <g transform="translate(940 560) scale(${1 - .8 * door} 1)"><rect x="-240" y="0" width="240" height="560" fill="${P.wood}" ${ST(6)}/></g>
    ${fig(sx + leave, 1560, 1.05, { kind: 'secretary', aL: yank > 0 ? 40 : 15, aR: t < 43.2 ? -35 : -60, bendR: -40, propR: t < 43.25 ? ((hx, hy) => `<path transform="translate(${hx} ${hy})" d="M 0 0 Q 30 -60 10 -120 Q -10 -60 0 0 Z" fill="${P.white}" ${ST(4)}/>`) : null, look: t > 42.56 ? -14 : 0, eyeS: t > 42.56 ? 1.6 : 1, mouth: t > 42.56 ? 'o' : 'flat', brow: 'worried', rot: yank > 0 && yank < 1 ? -10 * (1 - yank) : 0 })}
    ${fig(px - 210 + leave, 1600, 1.05, { kind: 'soldier', walk: walk || leave ? walkPh(t) : undefined, aR: -60, look: 10, brow: 'angry' })}
    ${fig(px + leave, 1620, 1.05, { kind: 'mayor', walk: walk || leave ? walkPh(t) + 1 : undefined, aL: 20, aR: -20, mouth: 'frown', brow: 'worried', look: t > 42.56 ? 12 : 0 })}
    ${fig(px + 140 + leave, 1640, 1.05, { kind: 'soldier', walk: walk || leave ? walkPh(t) + 2 : undefined, aR: t > 43.0 ? lerp(-20, -95, eout(prog(t, 43.0, 43.2))) : -10, look: 12, brow: 'angry' })}
    ${quill}`;
}

function voigtBack(x, y, s, armA = 0, palm = 0) { // over-the-shoulder: Voigt seen from behind, right arm reaching forward
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g transform="rotate(${armA} 120 120)"><rect x="100" y="100" width="56" height="${300}" rx="24" fill="${P.blue}" ${ST(7)} transform="rotate(-60 128 120)"/></g>
    <path d="M -200 600 Q -220 160 -80 110 L 140 110 Q 240 150 230 600 Z" fill="${P.blue}" ${ST(7)}/>
    <ellipse cx="-110" cy="118" rx="54" ry="20" fill="${P.silver}" ${ST(5)}/><ellipse cx="150" cy="118" rx="54" ry="20" fill="${P.silver}" ${ST(5)}/>
    <rect x="-46" y="70" width="92" height="50" fill="${P.red}" ${ST(5)}/>
    <ellipse cx="0" cy="10" rx="64" ry="74" fill="${P.skinSh}" ${ST(6)}/><path d="M -60 20 Q 0 70 60 20" stroke="${P.greyHi}" stroke-width="16" fill="none"/>
    <g transform="translate(0 560)">${hat('pickel', KIND.voigt)}</g></g>`;
}
function sCashier(t) {
  const reach = eout(prog(t, 45.0, 45.74));
  const push = eio(prog(t, 46.24, 46.8));
  const bx = lerp(700, 430, push);
  const land = shk(t, 46.8, 10, 9);
  const tremble = 4 * Math.sin(t * 60);
  const handX = lerp(330, 420, reach), handY = lerp(1500, 1180, reach);
  return `${R(0, 0, 1080, 1920, '#D9C49A')}${Array.from({ length: 9 }, (_, i) => `<path d="M 0 ${200 + i * 120} H 1080" stroke="#C7AF83" stroke-width="5"/>`).join('')}
    <rect x="300" y="420" width="560" height="760" fill="#BFAE8C" ${ST(7)}/>
    ${fig(620 + tremble, 1560, 1.35, { kind: 'cashier', aR: lerp(-15, -55, push), aL: lerp(15, 30, push), bendR: -30, bendL: 30, look: -14, eyeS: 1.6, brow: 'worried', mouth: t > 46.8 ? 'o' : 'frown', sweat: 1 })}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${320 + i * 74}" y="420" width="12" height="620" fill="${P.gold}" ${ST(3)}/>`).join('')}
    <rect x="280" y="1040" width="600" height="40" fill="${P.gold}" ${ST(5)}/>
    <rect x="-20" y="1160" width="1120" height="800" fill="${P.wood}" ${ST(7)}/><rect x="-20" y="1160" width="1120" height="36" fill="${P.woodHi}" ${ST(6)}/>
    <g transform="translate(${bx} ${1080 + land})"><rect x="-120" y="-90" width="240" height="160" rx="10" fill="${P.steel}" ${ST(7)}/><rect x="-120" y="-90" width="240" height="40" rx="8" fill="#6E7A88" ${ST(6)}/><circle cx="0" cy="0" r="20" fill="${P.gold}" ${ST(4)}/><path d="M -40 -110 Q 0 -150 40 -110" fill="none" ${ST(9)}/></g>
    ${voigtBack(150, 1080, 1.05, -reach * 10)}
    <path d="M 290 1270 L ${handX} ${handY}" stroke="${P.blue}" stroke-width="58" stroke-linecap="round"/><path d="M 290 1270 L ${handX} ${handY}" stroke="${OL}" stroke-width="7" fill="none" opacity=".0"/>
    <rect x="${handX - 26}" y="${handY - 10}" width="52" height="28" fill="${P.red}" ${ST(4)} transform="rotate(-50 ${handX} ${handY})"/>
    <ellipse cx="${handX + 22}" cy="${handY - 18}" rx="34" ry="22" fill="${P.skin}" ${ST(5)}/>`;
}

function sMoney(t) {
  const open = back(prog(t, 48.0, 48.18));
  const val = Math.round(3557 * eout(prog(t, 48.24, 49.6)));
  const punch = pop(t, 49.68, .2);
  let parts = '';
  for (let i = 0; i < 46; i++) {
    const t0 = 48.05 + i * .03, p = prog(t, t0, t0 + .9);
    if (p <= 0) continue;
    const a = -Math.PI / 2 + (hash(i) - .5) * 1.8, v = 900 + 400 * hash(i + 7);
    const x = 540 + Math.cos(a) * v * p * .9, y = 1000 + Math.sin(a) * v * p + 1500 * p * p;
    const yy = Math.min(y, 1330 + 30 * hash(i + 2));
    parts += i % 3 === 0 ? `<rect x="${x - 50}" y="${yy - 26}" width="100" height="52" fill="#C9D3B0" ${ST(4)} transform="rotate(${p * 300 * (hash(i) - .5)} ${x} ${yy})"/>` : `<ellipse cx="${x}" cy="${yy}" rx="24" ry="${10 + 14 * Math.abs(Math.sin(p * 12 + i))}" fill="${P.gold}" ${ST(4)}/>`;
  }
  return `${deskTop('#7E5A3C')}<circle cx="540" cy="1000" r="${500 * open}" fill="url(#kgold)"/>
    <g transform="translate(540 1050) scale(1.7)"><rect x="-140" y="-90" width="280" height="190" rx="12" fill="${P.steel}" ${ST(7)}/>
      <g transform="translate(0 -90) rotate(${-110 * open} -140 0)"><rect x="-140" y="-40" width="280" height="44" rx="8" fill="#6E7A88" ${ST(6)}/></g><circle cx="0" cy="10" r="22" fill="${P.gold}" ${ST(4)}/></g>
    ${parts}
    <g transform="translate(540 360) scale(${1 + .15 * punch * (1 - prog(t, 49.9, 50.2))})"><rect x="-440" y="-130" width="880" height="190" rx="20" fill="${P.white}" ${ST(7)}/>${TX(0, 20, 140, `${val} MARK`, P.red, { ls: 4 })}</g>`;
}

function sReceipt(t) {
  const slide = eout(prog(t, 50.46, 50.8));
  const sig = prog(t, 51.0, 52.55);
  const ul = prog(t, 52.82, 53.1);
  const sigPath = 'M 0 0 C 30 -60 60 -60 50 0 C 40 50 90 40 110 -20 C 120 -60 140 -40 150 0 C 160 30 190 20 210 -30 L 230 10 C 250 -40 280 -40 300 0 C 320 40 360 -20 380 -10';
  // pen tip position along a simple approximate path
  const px = 340 + 380 * sig, py = 1050 + 20 * Math.sin(sig * 30);
  return `${R(0, 0, 1080, 1920, P.olive)}${R(60, 140, 960, 1500, P.oliveHi, `rx="30" ${ST(6)}`)}
    <g transform="translate(0 ${lerp(-1200, 0, slide)}) rotate(-3 540 760)" filter="url(#drop)">
      <rect x="200" y="300" width="680" height="900" fill="${P.white}" ${ST(6)}/>
      ${TX(540, 440, 92, 'QUITTUNG', P.ink, { ls: 8 })}
      <path d="M 300 ${470} H ${300 + 480 * ul}" stroke="${P.red}" stroke-width="10"/><path d="M 300 ${490} H ${300 + 480 * ul}" stroke="${P.red}" stroke-width="5"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M 260 ${580 + i * 70} H ${820 - 140 * hash(i)}" stroke="#9A8A72" stroke-width="9"/>`).join('')}
      <path d="M 300 1080 H 780" stroke="${P.ink}" stroke-width="4" stroke-dasharray="10 8"/>
      <path transform="translate(340 1050)" d="${sigPath}" fill="none" stroke="#1E2A4A" stroke-width="9" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${sig} 1"/>
    </g>
    <g transform="translate(${px} ${py})"><path d="M 0 0 L 150 -260" stroke="${P.black}" stroke-width="16" stroke-linecap="round"/><path d="M 0 0 L 12 -30" stroke="${P.silver}" stroke-width="10"/></g>
    <path d="M ${px + 120} ${py - 180} Q ${px + 300} ${py + 80} 1180 ${py + 340}" stroke="${P.blue}" stroke-width="110" fill="none" stroke-linecap="round"/>
    <rect x="${px + 70}" y="${py - 150}" width="110" height="46" fill="${P.red}" ${ST(5)} transform="rotate(55 ${px + 125} ${py - 127})"/>
    <ellipse cx="${px + 80}" cy="${py - 120}" rx="56" ry="40" fill="${P.skin}" ${ST(6)}/>
    <g transform="translate(980 1560)"><circle r="190" fill="${P.black}" ${ST(7)}/><circle r="50" fill="${P.gold}" ${ST(5)}/><path d="M -180 -40 Q 0 -20 180 -40" stroke="#5a504a" stroke-width="10" fill="none"/><ellipse cx="-180" cy="-150" rx="80" ry="34" fill="${P.silver}" ${ST(5)}/></g>`;
}

function sHold(t) {
  const s = 1.1, cx = 620, gy = 1300;
  const sal = back(prog(t, 54.34, 54.55));
  let g = '';
  RH_DOORS.forEach((dx, i) => { g += fig(cx + dx * s, gy, .7, { kind: 'soldier', backR: sal > .5 ? null : rifle, aR: lerp(-6, -150, sal), bendR: lerp(0, -95, sal), look: -6 }); });
  const vx = lerp(520, 140, prog(t, 53.4, 55.6));
  return `${sky()}${rathaus(cx, gy, s, { flag: t })}${cobbles(gy + 20, 1920)}${g}
    ${fig(vx, 1720, 1.15, { kind: 'voigt', walk: walkPh(t), aR: t > 53.7 && t < 54.6 ? -140 : -10, bendR: t > 53.7 && t < 54.6 ? -20 : 0, look: 10, mouth: talk(t, 53.6, 54.6), brow: 'angry' })}`;
}

function sClock(t) {
  const m = lerp(0, 30, eio(prog(t, 55.78, 57.3)));
  const a = m * 6 * Math.PI / 180;
  const wedge = m > 0 ? `<path d="M 0 0 L 0 -300 A 300 300 0 ${m > 30 ? 1 : 0} 1 ${Math.sin(a) * 300} ${-Math.cos(a) * 300} Z" fill="${P.red}" opacity=".35"/>` : '';
  let mortar = ''; for (let y = 0; y < 1920; y += 30) mortar += `<path d="M 0 ${y} H 1080" stroke="${P.brickSh}" stroke-width="3" opacity=".6"/>`;
  const yawn = t > 56.6 && t < 57.4;
  return `${R(0, 0, 1080, 1920, P.brick)}${mortar}
    <g transform="translate(540 720)"><circle r="380" fill="${P.stone}" ${ST(8)}/><circle r="330" fill="${P.white}" ${ST(8)}/>${wedge}
      ${Array.from({ length: 60 }, (_, i) => `<path d="M ${Math.sin(i * .1047) * 300} ${-Math.cos(i * .1047) * 300} L ${Math.sin(i * .1047) * (i % 5 ? 285 : 260)} ${-Math.cos(i * .1047) * (i % 5 ? 285 : 260)}" ${ST(i % 5 ? 4 : 9)}/>`).join('')}
      <path d="M 0 0 L ${Math.sin((1 + m / 60) * .5236) * 160} ${-Math.cos((1 + m / 60) * .5236) * 160}" ${ST(22)}/><path d="M 0 0 L ${Math.sin(a) * 250} ${-Math.cos(a) * 250}" ${ST(13)}/><circle r="22" fill="${P.gold}" ${ST(5)}/></g>
    ${fig(220, 2120, 1.45, { kind: 'soldier', aR: -6, mouth: yawn ? 'o' : 'flat', blink: yawn || (t > 57.6 && t < 57.7), headTilt: yawn ? -6 : 0, look: 8, lookY: -10 })}
    ${fig(880, 2140, 1.45, { kind: 'soldier', aR: -6, look: -10, lookY: -10, blink: t > 56.0 && t < 56.1 })}`;
}

function sVanish(t) {
  const vx = lerp(520, 880, eio(prog(t, 58.22, 58.74)));
  const gone = t > 58.82;
  const turn = eout(prog(t, 59.15, 59.35));
  let mortar = ''; for (let y = 200; y < 1400; y += 26) mortar += `<path d="M 760 ${y} H 1080" stroke="${P.brickSh}" stroke-width="3" opacity=".6"/>`;
  return `${sky()}${rowHouses(1300, P.paperDk, 2400)}
    <rect x="-20" y="200" width="760" height="1100" fill="${P.brickSh}" ${ST(6)}/>
    <path d="M 160 1300 V 760 Q 160 640 280 640 Q 400 640 400 760 V 1300 Z" fill="#2A221E" stroke="${P.stone}" stroke-width="16"/>
    ${cobbles(1300, 1920)}
    ${fig(280, 1330, .85, { kind: 'soldier', backR: rifle, aR: -6, look: lerp(0, 16, turn), brow: turn > .5 ? 'up' : 'calm' })}
    ${!gone ? fig(vx, 1310, .9, { kind: 'voigt', walk: walkPh(t, 13), walkA: 14, look: 14, mouth: 'smile', brow: 'up', headDy: 10 }) : ''}
    <rect x="760" y="200" width="340" height="1100" fill="${P.brick}" ${ST(6)}/>${mortar}<rect x="752" y="200" width="24" height="1100" fill="${P.stone}" ${ST(5)}/>
    ${puff(800, 1150, t, 58.78, 8, 28, 120, P.paperSh)}
    ${qmark(420, 860, pop(t, 59.4, .2), P.red, 150)}`;
}

function stationBg() {
  let s = R(0, 0, 1080, 1920, '#CDBB98');
  for (let i = 0; i < 4; i++) s += `<path d="M ${i * 360 - 180} 900 Q ${i * 360} 250 ${i * 360 + 180} 900" fill="none" stroke="${P.steel}" stroke-width="22"/>`;
  s += `<rect x="0" y="880" width="1080" height="30" fill="${P.steel}"/>${streetClock(820, 420, 110, 1, 10).replace(/<rect x="-24"[^>]*\/>/, '')}`;
  return s;
}
function sStationBeer(t) {
  const lift = eout(prog(t, 60.3, 60.6)) * (1 - eout(prog(t, 61.3, 61.6)));
  const foam = t > 61.2;
  return `${stationBg()}
    ${fig(480, 1760, 1.45, { kind: 'voigt', aR: lerp(-20, -20, lift), bendR: lerp(-60, 168, lift), propR: mugP(1, lerp(0, -70, lift)), aL: 12, blink: lift > .6, look: lift > .5 ? 0 : 10, mouth: foam ? 'smile' : 'flat', brow: foam ? 'up' : 'calm',
      extra: foam ? `<path d="M -44 -506 Q -20 -480 0 -500 Q 20 -480 44 -506" stroke="${P.foam}" stroke-width="12" fill="none" stroke-linecap="round"/>` : '' })}
    <rect x="-20" y="1250" width="1120" height="700" fill="${P.woodSh}" ${ST(7)}/><rect x="-20" y="1250" width="1120" height="40" fill="${P.woodHi}" ${ST(6)}/>
    ${foam ? `<g opacity="${1 - prog(t, 61.3, 61.8)}">${TX(720, 760, 90, '~', P.brown)}</g>` : ''}`;
}

function sChange(t) {
  const flyItems = [[61.95, (x, y, r) => helmetAt(x, y, .9, r), -1], [62.25, (x, y, r) => jacketShape(x, y, .8, { rot: r, epaul: 1 }), 1], [62.5, (x, y, r) => trousers(x, y, .8, r), -1], [62.7, (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M 0 -200 L 0 200" stroke="${P.silver}" stroke-width="16" stroke-linecap="round"/></g>`, 1]];
  let items = '';
  for (const [t0, f, dir] of flyItems) {
    const p = prog(t, t0, t0 + .55); if (p <= 0) continue;
    const x = 540 + dir * 420 * p, y = 640 - 500 * p + 900 * p * p;
    items += f(x, Math.min(y, 1260), dir * 300 * p);
  }
  const out = back(prog(t, 63.0, 63.25));
  const headUp = t < 63.0;
  return `${wallpaper('#D8C9A6', '#C8B48C')}${R(0, 1300, 1080, 640, P.woodSh)}
    ${headUp ? fig(540, 1380 + 8 * Math.sin(t * 20), 1.3, { kind: 'voigt', hat: t < 61.95 ? 'pickel' : 'none', look: 6 * Math.sin(t * 9), mouth: 'flat', aR: -150, aL: 150 }) : ''}
    ${[180, 400, 620].map((x, i) => `<g><rect x="${x}" y="760" width="${220}" height="560" fill="${['#E9D9B6', '#DCC9A0', '#E9D9B6'][i]}" ${ST(6)}/><path d="M ${x + 40} 900 q 30 -40 60 0 q 30 40 60 0" stroke="${P.red}" stroke-width="6" fill="none" opacity=".6"/><circle cx="${x + 110}" cy="1100" r="30" fill="${P.olive}" opacity=".5"/></g>`).join('')}
    ${items}
    ${out > 0 ? fig(lerp(700, 900, out), 1620, 1.2, { kind: 'voigtLate', aR: -150, bendR: -40, look: -12, mouth: 'smile', brow: 'up' }) : ''}${puff(880, 1150, t, 63.0, 9, 30, 160)}`;
}

function sField(t) {
  const throwP = prog(t, 63.62, 64.24);
  const bx = lerp(330, 720, throwP), by = lerp(1120, 1240, throwP) - 380 * Math.sin(throwP * Math.PI);
  const land = t > 64.24;
  const roll = prog(t, 64.3, 65.0);
  const hx = land ? lerp(740, 900, eout(roll)) : bx, hy = land ? 1265 : by - 30;
  const z = 1.08 - .08 * eout(prog(t, 65.6, 66.4));
  const vx = t > 64.5 ? lerp(300, 120, prog(t, 64.5, 66.6)) : 300;
  let grass = ''; for (let i = 0; i < 40; i++) { const x = hash(i) * 1080, y = 1100 + hash(i + 3) * 700; grass += `<path d="M ${x} ${y} q ${6 + 8 * Math.sin(t * 2 + i)} -30 ${12 + 10 * Math.sin(t * 2 + i)} -50" stroke="${P.grassSh}" stroke-width="6" fill="none" stroke-linecap="round"/>`; }
  const c1 = prog(t, 64.9, 65.36), c2 = prog(t, 65.25, 65.72);
  return `${sky()}<g transform="translate(540 1200) scale(${z}) translate(-540 -1200)">
    ${Array.from({ length: 9 }, (_, i) => `<circle cx="${i * 140 + 20}" cy="1060" r="${40 + 18 * hash(i)}" fill="${P.oliveHi}" ${ST(4)}/>`).join('')}
    ${R(-60, 1060, 1200, 900, P.grass)}${Array.from({ length: 5 }, (_, i) => `<path d="M -60 ${1120 + i * 120} H 1140" stroke="${P.grassSh}" stroke-width="${8 + i * 4}" opacity=".4"/>`).join('')}${grass}
    ${fig(vx, 1180, .62, { kind: 'voigtLate', aR: t < 64.24 ? lerp(-20, -160, eout(throwP)) : -10, walk: t > 64.5 ? walkPh(t) : undefined, look: t > 64.5 ? -10 : 12, mouth: 'smile' })}
    ${land ? bundle(750, 1250 + shk(t, 64.24, 10, 10), .9, 6) : bundle(bx, by, .9, throwP * 400)}
    ${helmetAt(hx, hy, .5, land ? roll * 400 : throwP * 300)}
    ${crow(lerp(1200, 760, eout(c1)), lerp(700, 1195, eout(c1)), 1, t * 30 * (c1 < 1 ? 1 : 0))}${crow(lerp(-150, 900, eout(c2)), lerp(600, 1225, eout(c2)), .9, t * 30 * (c2 < 1 ? 1 : 0))}
    ${puff(750, 1270, t, 64.24, 7, 20, 100, P.grassSh)}</g>`;
}

function sTenDays(t) {
  let n = 16, fp = 0;
  for (let i = 0; i < 10; i++) { const ft = 66.66 + i * .1; if (t >= ft) { n = 17 + i; fp = prog(t, ft, ft + .2); } }
  return `${wallpaper('#E0CDA4', '#CDB48A')}${calendar(560, 760, 1.2, n, 'OKTOBER', fp, 4)}
    <g transform="translate(540 1270) scale(${pop(t, 66.66, .2)})">${TX(0, 0, 130, '+10', P.red, { sw: 10, sc: P.white })}</g>`;
}

function sBreakfast(t) {
  const burst = back(prog(t, 68.9, 69.05));
  const grab = eout(prog(t, 69.0, 69.25));
  const shock = t > 69.0;
  const sip = eout(prog(t, 68.2, 68.45)) * (1 - eout(prog(t, 68.75, 68.95)));
  const cupP = prog(t, 69.0, 69.6);
  let splash = ''; if (cupP > 0 && cupP < 1) for (let i = 0; i < 8; i++) splash += `<circle cx="${600 + (i - 4) * 30 * cupP * 3}" cy="${900 - 300 * cupP + 500 * cupP * cupP * (1 + hash(i))}" r="10" fill="#6A3E22" ${ST(2)}/>`;
  return `${wallpaper('#E6D2A6', '#D4BB8C')}
    <rect x="640" y="300" width="300" height="380" fill="#F6EBC6" ${ST(7)}/><path d="M 790 300 V 680 M 640 490 H 940" ${ST(7)}/>
    <rect x="40" y="560" width="250" height="740" fill="#2A221E" ${ST(6)}/>
    ${shock ? fig(lerp(120, 320, grab), 1400, .95, { kind: 'police', aR: lerp(-20, -95, grab), look: 14, mouth: 'o', brow: 'angry' }) : ''}
    <g transform="translate(40 560) scale(${1 - .85 * burst} 1)"><rect x="0" y="0" width="250" height="740" fill="${P.wood}" ${ST(6)}/><circle cx="210" cy="380" r="14" fill="${P.gold}" ${ST(3)}/></g>
    ${fig(620 + shk(t, 69.0, 12), 1640, 1.25, { kind: 'voigtLate', hat: 'none', aR: shock ? -140 : -20, bendR: shock ? 0 : lerp(-60, 168, sip), propR: shock ? null : mugP(.7, lerp(0, -60, sip), 0), aL: shock ? 140 : 15, eyeS: shock ? 1.7 : 1, look: shock ? -14 : 0, mouth: shock ? 'o' : 'smile', blink: sip > .6 })}
    ${shock ? `<g transform="translate(${600 + 60 * cupP} ${lerp(980, 700, eout(cupP))}) rotate(${cupP * 400})">${mugP(.7, 0, 0)(0, 0)}</g>` : ''}${splash}
    <rect x="200" y="1180" width="760" height="40" fill="${P.white}" ${ST(6)}/><rect x="230" y="1220" width="700" height="500" fill="${P.wood}" ${ST(6)}/>
    <ellipse cx="420" cy="1170" rx="70" ry="34" fill="#D9A45A" ${ST(5)}/><path d="M 380 1160 Q 420 1140 460 1160" stroke="#B07A3A" stroke-width="5" fill="none"/>`;
}

function sBetray(t) {
  const close = t > 71.6;
  const z = close ? 1.45 : 1, ox = close ? 560 : 540, oy = close ? 1000 : 960;
  const point = back(prog(t, 71.76, 71.95));
  const coin = t > 72.9;
  const palm = eout(prog(t, 72.6, 72.9));
  const whisper = t < 71.6;
  let wl = ''; if (whisper) for (let i = 0; i < 3; i++) { const p = ((t * 2 + i / 3) % 1); wl += `<path d="M ${520 + p * 60} ${720 - i * 14} q 20 -10 40 0" stroke="${P.ink}" stroke-width="5" fill="none" opacity="${1 - p}"/>`; }
  return `${R(0, 0, 1080, 1920, '#C9B48E')}<g transform="translate(540 960) scale(${z}) translate(${-ox} ${-oy})">
    <g filter="url(#drop)"><rect x="140" y="260" width="300" height="380" fill="${P.white}" ${ST(6)}/>${TX(290, 330, 46, '???', P.red)}<g transform="translate(290 620) scale(.38)">${fig(0, 0, 1, { kind: 'voigt', aR: -8 })}</g></g>
    <rect x="700" y="300" width="18" height="300" fill="${P.black}"/><path d="M 640 600 L 780 600 L 750 520 L 670 520 Z" fill="${P.olive}" ${ST(5)}/>
    ${fig(720, 1700, 1.25, { kind: 'police', aL: coin ? lerp(30, 60, palm) : 25, bendL: coin ? -60 : -30, look: -14, mouth: 'flat', brow: whisper ? 'calm' : 'up' })}
    ${fig(380, 1720, 1.25, { kind: 'cellmate', aR: whisper ? -150 : (point > 0 && t < 72.6 ? lerp(-60, -40, point) : lerp(-40, -60, palm)), bendR: whisper ? 150 : 0, aL: point > 0 && t < 72.6 ? lerp(10, 140, point) : 10, look: whisper ? 14 : t < 72.6 ? -12 : 14, headTilt: whisper ? 12 : 0, mouth: coin ? 'grin' : 'smile', brow: 'angry' })}
    <rect x="-20" y="1230" width="1120" height="700" fill="${P.woodSh}" ${ST(7)}/><rect x="-20" y="1230" width="1120" height="36" fill="${P.wood}" ${ST(6)}/>
    ${coin ? coinsFall(t, 73.0, 590, 900, 1120, 3, .1) : ''}${wl}</g>`;
}

function sGavel(t) {
  const hit = strikeAt(t, [73.96], .14, .3);
  const sh = shk(t, 73.96, 16, 8);
  return `<g transform="translate(${sh} ${sh * .5})">${R(-30, -30, 1140, 1980, '#6E4A2E')}${Array.from({ length: 7 }, (_, i) => `<rect x="${i * 160}" y="0" width="120" height="1000" fill="#5E3E25"/>`).join('')}
    <g filter="url(#drop)"><circle cx="540" cy="300" r="120" fill="${P.gold}" ${ST(6)}/><path d="M 540 220 V 370 M 460 250 H 620 M 480 250 L 455 320 M 480 250 L 505 320 M 600 250 L 575 320 M 600 250 L 625 320" fill="none" ${ST(6)}/><path d="M 450 320 Q 480 350 510 320 Z M 570 320 Q 600 350 630 320 Z" fill="${P.goldHi}" ${ST(5)}/></g>
    ${fig(540, 1700, 1.55, { kind: 'judge', aR: lerp(-160, -60, hit), bendR: lerp(-20, -10, hit), propR: hammerP(lerp(-170, -90, hit)), aL: 15, brow: 'angry', mouth: hit > .9 ? 'o' : 'flat', look: 4 })}
    <rect x="-20" y="1120" width="1120" height="820" fill="${P.woodSh}" ${ST(7)}/><rect x="-20" y="1120" width="1120" height="50" fill="${P.wood}" ${ST(6)}/>
    ${puff(760, 1120, t, 73.96, 8, 22, 130, P.paperSh)}</g>`;
}

function sVerdict(t) {
  const st = pop(t, 74.92, .2);
  const sh = shk(t, 74.92, 12, 9);
  const barsX = lerp(1200, 0, eout(prog(t, 75.3, 75.5)));
  return `<g transform="translate(${sh} 0)">${deskTop('#7A5236')}
    <g transform="translate(540 860) rotate(2)" filter="url(#drop)"><rect x="-400" y="-560" width="800" height="1060" fill="#F2E7CF" ${ST(6)}/>
      ${polaroid(-210, -260, 4, .7, 1, G('translate(0 330) scale(.62)', fig(0, 0, 1, { kind: 'voigtLate', hat: 'none', mouth: 'frown', brow: 'worried' })))}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M ${i < 6 ? 30 : -330} ${-430 + i * 70} h ${280 - 60 * hash(i)}" stroke="#9A8A72" stroke-width="9"/>`).join('')}</g>
    ${stamp(560, 1060, -8, '4 JAHRE', st, { sz: 120 })}
    <g opacity=".45">${bars(barsX, '#1a1410', 190, 40)}</g></g>`;
}

function sPapers(t) {
  const papers = [[76.62, -900, 0, 330, 640, -10, 0], [77.15, 1000, 200, 760, 760, 8, 1], [77.5, 0, -900, 520, 1050, -3, 2]];
  let s = '';
  for (const [t0, fx, fy, x, y, r, k] of papers) {
    const p = eout(prog(t, t0, t0 + .3)); if (p <= 0) continue;
    s += newspaper(lerp(x + fx, x, p), lerp(y + fy, y, p), r + (1 - p) * 40, 1.15, k);
  }
  const laugh = t > 77.6;
  const shake = laugh ? 8 * Math.sin(t * 40) : 0;
  return `${R(0, 0, 1080, 1920, '#B59670')}${s}
    ${laugh ? fig(170 + shake, 2150 - 140 * eout(prog(t, 77.6, 77.85)), 1.5, { kind: 'buyerB', mouth: 'laugh', blink: true, brow: 'up', headTilt: -8 }) : ''}
    ${laugh ? fig(920 - shake, 2170 - 140 * eout(prog(t, 77.7, 77.95)), 1.5, { kind: 'buyerA', mouth: 'laugh', blink: true, brow: 'up', headTilt: 8 }) : ''}`;
}

function sCartoon(t) {
  const arrive = eout(prog(t, 78.4, 79.1));
  const sal = back(prog(t, 79.95, 80.15));
  const spot = prog(t, 79.5, 79.7);
  const sway = 4 * Math.sin(t * 5);
  let sol = '';
  for (let i = 0; i < 4; i++) sol += fig(lerp(-300, 120 + i * 120, arrive), 1300 + (i % 2) * 10, .78, { kind: 'soldier', walk: arrive < 1 ? walkPh(t) + i : undefined, aR: lerp(-6, -150, sal), bendR: lerp(0, -100, sal), look: 12, brow: 'up', mouth: sal > .5 ? 'flat' : 'smile' });
  return `${R(0, 0, 1080, 1920, '#B59670')}<g transform="rotate(-1.5 540 900)" filter="url(#drop)"><rect x="40" y="200" width="1000" height="1260" fill="#F2E7CF" ${ST(8)}/><rect x="70" y="230" width="940" height="1200" fill="none" ${ST(4)}/>
    <clipPath id="kcart"><rect x="70" y="230" width="940" height="1200"/></clipPath><g clip-path="url(#kcart)">
    ${R(70, 1300, 940, 140, '#E2D4B4')}
    <circle cx="820" cy="760" r="${360 * spot}" fill="url(#kspot)"/>
    <g transform="rotate(${sway} 820 1300)"><rect x="812" y="560" width="16" height="740" fill="${P.woodSh}" ${ST(4)}/><path d="M 740 1300 L 900 1300 L 820 1250 Z" fill="${P.woodSh}" ${ST(4)}/>${jacketShape(820, 640, .9, { epaul: 1 })}${helmetAt(820, 545, .7, 0)}</g>
    ${sol}</g></g>`;
}

function sCell2(t) {
  const pages = Math.floor(prog(t, 80.7, 82.2) * 22);
  let fly = '';
  for (let i = 0; i < pages; i++) { const ft = 80.7 + i * (1.5 / 22), p = prog(t, ft, ft + .4); if (p >= 1) continue; fly += `<rect x="${720 + 200 * p}" y="${560 - 200 * p + 500 * p * p}" width="140" height="170" fill="${P.white}" ${ST(4)} opacity="${1 - p}" transform="rotate(${p * 200} ${790} 640)"/>`; }
  const daylight = .4 + .6 * Math.abs(Math.sin((t - 80.6) * 5));
  return `${cellSet(t * 8, daylight)}
    <g filter="url(#drop)"><rect x="700" y="540" width="180" height="210" fill="${P.white}" ${ST(5)}/><rect x="700" y="540" width="180" height="50" fill="${P.red}" ${ST(5)}/></g>${fly}
    ${fig(380, 2050, 1.9, { kind: 'voigtCiv', hat: 'none', look: 14, lookY: -6, mouth: 'flat', brow: 'worried', blink: t > 81.5 && t < 81.6 })}`;
}

function sKaiser(t) {
  const sig = prog(t, 82.4, 83.0);
  const seal = pop(t, 83.25, .18);
  const sh = shk(t, 83.25, 10, 9);
  const wig = sig > 0 && sig < 1 ? 4 * Math.sin(t * 40) : 0;
  let hand = [0, 0];
  const quill = (hx, hy) => { hand = [hx, hy]; return `<g transform="translate(${hx} ${hy})"><path d="M 0 0 Q 30 -70 90 -130 Q 40 -60 0 0 Z" fill="${P.white}" ${ST(4)}/></g>`; };
  const k = fig(300, 1960, 1.75, { kind: 'kaiser', aR: -62 + wig, bendR: -48, propR: quill, look: 14, lookY: 12, brow: 'calm', mouth: seal > 0 ? 'smile' : 'flat' });
  return `<g transform="translate(0 ${sh})">${R(0, 0, 1080, 1920, '#7A2A2A')}${Array.from({ length: 8 }, (_, i) => `<path d="M ${i * 150 + 40} 0 Q ${i * 150 + 80} 500 ${i * 150 + 40} 1100" stroke="#5E1E1E" stroke-width="40" fill="none"/>`).join('')}
    <g filter="url(#drop)"><rect x="560" y="230" width="360" height="430" fill="${P.gold}" ${ST(7)}/><rect x="590" y="260" width="300" height="370" fill="#E6D6B0"/>${crown(740, 450, .45, 0)}</g>
    <rect x="-20" y="1180" width="1120" height="760" fill="${P.woodSh}" ${ST(7)}/><rect x="-20" y="1180" width="1120" height="44" fill="${P.woodHi}" ${ST(6)}/>
    <g transform="translate(790 1150) rotate(-4)"><rect x="-220" y="-90" width="440" height="150" fill="${P.white}" ${ST(5)}/>${crown(-170, -40, .12, 0)}<path d="M -120 -50 h 260 M -120 -20 h 220" stroke="#9A8A72" stroke-width="7"/>
      <path transform="translate(-60 30)" d="M 0 0 C 30 -30 60 -30 70 0 C 80 30 120 20 140 -10 C 150 -30 180 -20 200 0" fill="none" stroke="#1E2A4A" stroke-width="7" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${sig} 1"/>
      ${seal > 0 ? `<g transform="translate(170 20) scale(${seal})"><circle r="44" fill="${P.red}" ${ST(5)}/>${crown(0, 6, .16, 0)}</g>` : ''}</g>
    <clipPath id="kkais"><rect x="-20" y="-20" width="1120" height="1225"/></clipPath><g clip-path="url(#kkais)">${k}</g></g>`;
}

function postcard(x, y, rot, s) { return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-90" y="-120" width="180" height="240" fill="${P.white}" ${ST(5)}/><rect x="-74" y="-104" width="148" height="170" fill="#D9C7A0"/><g transform="translate(0 64) scale(.21)">${fig(0, 0, 1, { kind: 'voigt', aR: -150, bendR: -95, shadow: false })}</g><path d="M -60 92 q 20 -20 40 0 q 20 20 40 -6" stroke="#1E2A4A" stroke-width="5" fill="none"/></g>`; }
function sCards(t) {
  const giveL = eout(prog(t, 84.64, 85.0)) * (1 - eout(prog(t, 85.3, 85.5)));
  const sign = prog(t, 85.5, 86.3);
  const giveR = eout(prog(t, 86.5, 86.85)) * (1 - eout(prog(t, 87.0, 87.2)));
  const helm = t > 87.24;
  const sal = back(prog(t, 87.35, 87.55));
  const clap = t > 87.6 ? Math.abs(Math.sin(t * 18)) : 0;
  return `${sky()}${rowHouses(1150, P.paperDk, 3000)}${cobbles(1150, 1920)}
    ${fig(150, 1720, 1.2, { kind: 'buyerA', aR: lerp(-10, -60, giveL) - 25 * clap, bendR: -20, aL: 10 + 25 * clap, look: 12, mouth: helm ? 'laugh' : 'smile', brow: 'up' })}
    ${fig(890, 1740, 1.2, { kind: 'buyerC', aL: lerp(10, 60, giveR) + 25 * clap, bendL: 20, aR: -10 - 25 * clap, look: -12, mouth: helm ? 'laugh' : 'smile', brow: 'up' })}
    ${fig(540, 1560, 1.2, { kind: 'voigtLate', hat: helm ? 'pickel' : 'bowler', aL: lerp(15, 75, giveL), propL: giveL > .2 ? (hx, hy) => postcard(hx, hy - 60, -8, .7) : null, aR: helm ? lerp(-30, -150, sal) : giveR > 0 ? lerp(-20, -75, giveR) : -25 + 8 * Math.sin(sign * 40), bendR: helm ? lerp(30, -95, sal) : giveR > 0 ? 0 : 40, propR: giveR > .2 ? (hx, hy) => postcard(hx, hy - 60, 8, .7) : null, look: giveL > .2 ? -12 : giveR > .2 ? 12 : 0, lookY: sign > 0 && sign < 1 ? 14 : 0, mouth: 'smile', brow: helm ? 'angry' : 'up' })}
    <rect x="200" y="1180" width="680" height="40" fill="${P.white}" ${ST(6)}/><rect x="230" y="1220" width="620" height="500" fill="${P.red}" ${ST(6)}/>
    ${postcard(330, 1250, -10, .6)}${postcard(390, 1245, 4, .6)}${postcard(760, 1255, 12, .6)}
    ${sign > 0 && sign < 1 ? `<path d="M 600 1150 l ${40 * sign} ${-6 * Math.sin(sign * 20)}" stroke="#1E2A4A" stroke-width="6"/>` : ''}`;
}

function sStatue(t) {
  const cam = eio(prog(t, 90.56, 91.6)) * 420;
  const glint = prog(t, 89.36, 89.9);
  const flash1 = t > 89.5 && t < 89.65, flash2 = t > 91.15 && t < 91.3;
  const pg = prog(t, 89.9, 90.45);
  const statue = `<circle cx="540" cy="780" r="380" fill="url(#kspot)"/><g filter="url(#kbronze)">${fig(540, 1110, 1.05, { kind: 'voigt', aR: -150, bendR: -95, shadow: false, brow: 'angry' })}</g>`;
  return `${sky('ksky2')}<g transform="translate(0 ${cam})">
    ${rathaus(540, 1130, .72, { flag: t, flagC: '#C9443A', lit: 0 })}${cobbles(1150, 2400)}
    <rect x="410" y="1110" width="260" height="140" fill="${P.stone}" ${ST(6)}/><rect x="390" y="1240" width="300" height="40" fill="${P.stoneSh}" ${ST(5)}/>
    ${statue}
    ${glint > 0 && glint < 1 ? `<path d="M ${380 + 340 * glint} 560 l 30 0 l -60 560 l -30 0 Z" fill="#FFF6D8" opacity="${.8 * Math.sin(glint * Math.PI)}"/>` : ''}
    ${pigeon(lerp(1100, 560, eout(pg)), lerp(300, 530, eout(pg)) - (pg < 1 ? 0 : 0), .6, pg < 1 ? t * 30 : 0)}
    ${fig(860, 1700, 1.1, { kind: 'tourist', aL: 60, bendL: 60, aR: -20, bendR: -60, look: -12, mouth: 'smile', propL: (hx, hy) => `<rect x="${hx - 30}" y="${hy - 60}" width="60" height="100" rx="10" fill="${P.black}" ${ST(4)}/>` })}
    ${fig(170, 1720, 1.05, { kind: 'buyerC', hat: 'none', aR: -100, look: 12, mouth: 'smile', brow: 'up' })}
    </g>
    ${flash1 || flash2 ? R(0, 0, 1080, 1920, '#FFFFFF', 'opacity=".35"') : ''}`;
}

function sEnd(t) {
  const point = back(prog(t, 92.6, 92.8)) * (1 - eout(prog(t, 93.7, 93.9)));
  const beck = t > 94.0 ? Math.sin((t - 94.0) * 14) * .5 + .5 : 0;
  const q = pop(t, 94.55, .25);
  const z = 1 + .04 * Math.sin(t * .8);
  return `${sky()}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${rathaus(540, 1250, .82, { flag: t })}${cobbles(1255, 1920)}
    ${fig(560, 2120, 1.95, { kind: 'voigt', aR: t > 94.0 ? -35 : lerp(-10, -45, point), bendR: t > 94.0 ? lerp(-90, -150, beck) : lerp(0, -45, point), aL: 10, look: t > 94.0 ? 6 : 0, lookY: 6, mouth: t > 94.0 ? 'smile' : talk(t, 92.4, 93.9), brow: t > 94.0 ? 'up' : 'angry', headTilt: t > 94.0 ? 6 : 0 })}
    ${qmark(860, 520, q, P.red, 230)}</g>
    ${stamp(540, 250, -6, 'KÖPENICK · 1906', pop(t, 95.3, .22))}`;
}

const SHOTS = [[0, 2.62, sShoe], [2.62, 5.64, sMarch], [5.64, 8.9, sDate], [8.9, 11.0, sFile], [11.0, 13.68, sCell], [13.68, 15.4, sShop], [15.4, 18.28, sDummy],
  [18.28, 19.75, sNoon], [19.75, 21.82, sStop], [21.82, 23.55, sOrder], [23.55, 25.04, sUp], [25.04, 26.94, sNobody], [26.94, 28.68, sCount], [28.68, 31.5, sTrain],
  [31.5, 34.42, sMap], [34.42, 36.68, sBeer], [36.68, 39.66, sGuards], [39.66, 41.62, sMayor], [41.62, 44.72, sSecretary], [44.72, 47.98, sCashier], [47.98, 50.46, sMoney],
  [50.46, 53.26, sReceipt], [53.26, 55.6, sHold], [55.6, 58.22, sClock], [58.22, 59.86, sVanish], [59.86, 61.85, sStationBeer], [61.85, 63.6, sChange], [63.6, 66.62, sField],
  [66.62, 67.9, sTenDays], [67.9, 69.94, sBreakfast], [69.94, 73.76, sBetray], [73.76, 74.4, sGavel], [74.4, 76.54, sVerdict], [76.54, 78.4, sPapers], [78.4, 80.6, sCartoon],
  [80.6, 82.3, sCell2], [82.3, 84.15, sKaiser], [84.15, 88.26, sCards], [88.26, 92.36, sStatue], [92.36, 999, sEnd]];

function scene(t) {
  let f = SHOTS[0][2];
  for (const s of SHOTS) if (t >= s[0]) f = s[2];
  let body = '';
  try { body = f(t); } catch (e) { body = R(0, 0, 1080, 1920, P.paper); }
  const flick = .035 * hash(Math.floor(t * 12));
  return `${KDEFS}${body}${R(0, 0, 1080, 1920, 'url(#kgr)')}${R(0, 0, 1080, 1920, '#3B2F2A', `opacity="${flick.toFixed(3)}"`)}`;
}

const __style = {"dust": false, "vignette": true, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
