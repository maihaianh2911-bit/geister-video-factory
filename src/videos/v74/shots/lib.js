// v74 Hauptmann von Köpenick — kit for this video only (style: jobs/v74/style.md).
// Characters and archive look follow the earlier Köpenick video v36 (same story, same channel), copied here so v74 stays independent.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash, scallop } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };
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
function deskTop(col = P.woodSh) { let s = R(0, 0, 1080, 1920, col); for (let i = 0; i < 26; i++) s += `<path d="M -20 ${i * 76 + 20} Q 540 ${i * 76 + 20 + 30 * Math.sin(i)} 1100 ${i * 76 + 10}" stroke="${P.woodHi}" stroke-width="3" opacity=".35" fill="none"/>`; return s; }
function polaroid(x, y, rot, s, dev, inner) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#drop)"><rect x="-210" y="-250" width="420" height="500" fill="${P.white}" ${ST(5)}/>
    <clipPath id="kpol${Math.round(x)}"><rect x="-180" y="-220" width="360" height="360"/></clipPath>
    <g clip-path="url(#kpol${Math.round(x)})">${R(-180, -220, 360, 360, '#CFC2A8')}${Array.from({ length: 7 }, (_, i) => `<path d="M -180 ${-200 + i * 50} H 180" stroke="#9E8F75" stroke-width="3"/>`).join('')}${inner}
    <rect x="-180" y="-220" width="360" height="360" fill="#2A2421" opacity="${1 - dev}"/></g>
    <rect x="-180" y="-220" width="360" height="360" fill="none" ${ST(4)}/></g>`;
}
function tally(n, x0, y0) { let s = ''; for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5, gx = x0 + (g % 4) * 110, gy = y0 + Math.floor(g / 4) * 150; s += j < 4 ? `<path d="M ${gx + j * 20} ${gy} l ${3} 100" stroke="#F2E7CF" stroke-width="8" stroke-linecap="round"/>` : `<path d="M ${gx - 12} ${gy + 70} L ${gx + 80} ${gy + 20}" stroke="#F2E7CF" stroke-width="8" stroke-linecap="round"/>`; } return s; }
function bars(x, col = P.black, spacing = 150, w = 26) { let s = ''; for (let bx = -60; bx < 1140; bx += spacing) s += `<rect x="${bx + x}" y="-20" width="${w}" height="1960" fill="${col}" ${ST(4)}/>`; return s + `<rect x="${x - 100}" y="420" width="1400" height="30" fill="${col}" ${ST(4)}/>`; }
function streetClock(cx, cy, r, h, m) {
  return `<g transform="translate(${cx} ${cy})" filter="url(#drop)"><rect x="-24" y="${r}" width="48" height="1300" fill="${P.green}" ${ST(6)}/><circle r="${r + 26}" fill="${P.green}" ${ST(7)}/><circle r="${r}" fill="${P.white}" ${ST(7)}/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M ${Math.sin(i * .5236) * r * .8} ${-Math.cos(i * .5236) * r * .8} L ${Math.sin(i * .5236) * r * .92} ${-Math.cos(i * .5236) * r * .92}" ${ST(i % 3 ? 6 : 12)}/>`).join('')}
    <path d="M 0 0 L ${Math.sin((h % 12 + m / 60) * .5236) * r * .5} ${-Math.cos((h % 12 + m / 60) * .5236) * r * .5}" ${ST(20)}/><path d="M 0 0 L ${Math.sin(m * .10472) * r * .78} ${-Math.cos(m * .10472) * r * .78}" ${ST(12)}/><circle r="18" fill="${P.gold}" ${ST(5)}/></g>`;
}
function helmetBack(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -150 300 Q -160 120 -60 90 L 60 90 Q 160 120 150 300 Z" fill="${P.blueSol}" ${ST(7)}/><rect x="-40" y="60" width="80" height="50" fill="${P.red}" ${ST(5)}/><ellipse cx="-60" cy="10" rx="14" ry="20" fill="${P.skin}" ${ST(4)}/><ellipse cx="60" cy="10" rx="14" ry="20" fill="${P.skin}" ${ST(4)}/><ellipse cx="0" cy="0" rx="62" ry="72" fill="#6A4A30" ${ST(6)}/><rect x="-30" y="60" width="60" height="30" fill="${P.skinSh}"/><g transform="translate(0 545)">${hat('pickel', KIND.soldier)}</g></g>`; }
function crown(x, y, s, t) {
  let rays = ''; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * .5; rays += `<path d="M 0 0 L ${Math.cos(a) * 520} ${Math.sin(a) * 520} L ${Math.cos(a + .1) * 520} ${Math.sin(a + .1) * 520} Z" fill="${P.goldHi}" opacity=".35"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${rays}<circle r="260" fill="url(#kgold)"/>
    <path d="M -150 60 L -170 -90 L -90 -20 L -40 -130 L 0 -40 L 40 -130 L 90 -20 L 170 -90 L 150 60 Z" fill="${P.gold}" ${ST(7)}/><rect x="-160" y="50" width="320" height="50" rx="10" fill="${P.gold}" ${ST(7)}/>
    ${[-100, -35, 35, 100].map(xx => `<circle cx="${xx}" cy="75" r="12" fill="${P.red}" ${ST(4)}/>`).join('')}<path d="M 0 -140 v -60 M -24 -176 h 48" ${ST(10)} stroke="${P.gold}"/><path d="M 0 -140 v -60 M -24 -176 h 48" fill="none" ${ST(4)}/></g>`;
}
function cloud(x, y, s) { return `<path transform="translate(${x} ${y}) scale(${s})" d="${scallop(0, 0, 220, 80, 9)}" fill="${P.white}" ${ST(6)}/>`; }
function office(t) {
  return `${wallpaper()}${R(0, 1000, 1080, 920, P.woodSh)}${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 190 + 20}" y="1030" width="160" height="300" fill="none" stroke="${P.wood}" stroke-width="8"/>`).join('')}
    <g filter="url(#drop)"><rect x="620" y="250" width="300" height="360" fill="${P.gold}" ${ST(6)}/><rect x="645" y="275" width="250" height="310" fill="#CFE0D8" ${ST(4)}/><path d="M 645 520 L 720 420 L 780 480 L 840 390 L 895 470 V 585 H 645 Z" fill="${P.olive}"/></g>`;
}
function corridor() {
  let s = R(0, 0, 1080, 1920, '#D8C39A') + R(0, 1150, 1080, 800, '#9C7E5A');
  for (let i = 0; i < 10; i++) s += `<path d="M ${i * 120} 1150 L ${i * 160 - 180} 1920" stroke="#86694A" stroke-width="5"/>`;
  s += `<rect x="0" y="1080" width="1080" height="70" fill="${P.woodSh}" ${ST(5)}/>`;
  s += `<g filter="url(#drop)"><rect x="80" y="380" width="200" height="250" fill="${P.gold}" ${ST(6)}/><rect x="100" y="400" width="160" height="210" fill="#CFE0D8"/></g>`;
  return s;
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
function stationBg() {
  let s = R(0, 0, 1080, 1920, '#CDBB98');
  for (let i = 0; i < 4; i++) s += `<path d="M ${i * 360 - 180} 900 Q ${i * 360} 250 ${i * 360 + 180} 900" fill="none" stroke="${P.steel}" stroke-width="22"/>`;
  s += `<rect x="0" y="880" width="1080" height="30" fill="${P.steel}"/>${streetClock(820, 420, 110, 1, 10).replace(/<rect x="-24"[^>]*\/>/, '')}`;
  return s;
}
function postcard(x, y, rot, s) { return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-90" y="-120" width="180" height="240" fill="${P.white}" ${ST(5)}/><rect x="-74" y="-104" width="148" height="170" fill="#D9C7A0"/><g transform="translate(0 64) scale(.21)">${fig(0, 0, 1, { kind: 'voigt', aR: -150, bendR: -95, shadow: false })}</g><path d="M -60 92 q 20 -20 40 0 q 20 20 40 -6" stroke="#1E2A4A" stroke-width="5" fill="none"/></g>`; }
export { FONT, G, GRAIN, KDEFS, KIND, OL, P, R, RH_DOORS, ST, TX, bars, berlinSkyline, bundle, calendar, cellSet, cloud, cobbles, coinsFall, corridor, crow, crown, deskTop, fig, hammerP, hat, helmetAt, helmetBack, jacketShape, mugP, newspaper, office, paperP, pigeon, polaroid, pop, postcard, puff, qmark, rathaus, rifle, rowHouses, shk, sky, speedLines, stamp, stationBg, streetClock, strikeAt, swordP, talk, tally, train, trousers, voigtBack, walkPh, wallpaper };

// ---------- v74 additions ----------
// frame: archive paper grain + light film flicker over every shot
export function frame(t, body) {
  const flick = .035 * hash(Math.floor(t * 12));
  return `${KDEFS}${body}${R(0, 0, 1080, 1920, 'url(#kgr)')}${R(0, 0, 1080, 1920, '#3B2F2A', `opacity="${flick.toFixed(3)}"`)}`;
}
// small archive label (paper tag with ink text) that pops in with p (0..1+)
export function tag(x, y, txt, p, o = {}) {
  if (p <= 0) return '';
  const sz = o.sz || 46, w = txt.length * sz * .68 + 50, h = sz * 1.5;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${Math.min(1.15, p)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="${o.bg || P.white}" ${ST(5)}/>${TX(0, sz * .36, sz, txt, o.col || P.ink, { ls: 2 })}</g>`;
}
// headline strip for the cover
export function headline(t, txt, y = 250, a = 1) {
  const p = back(prog(t, 0, .3));
  if (a <= 0) return '';
  return `<g transform="translate(540 ${y}) scale(${(.85 + .15 * cl(p)).toFixed(3)}) rotate(-2)" opacity="${a.toFixed(2)}"><rect x="-470" y="-82" width="940" height="150" rx="12" fill="${P.paper}" ${ST(7)} filter="url(#drop)"/>${TX(0, 24, 66, txt, P.red, { ls: 2 })}</g>`;
}
export function workshop() {
  let shelf = '';
  for (let i = 0; i < 6; i++) shelf += `<path d="M ${70 + i * 150} 520 q 10 -50 50 -50 l 50 30 q 30 10 30 30 Z" fill="${[P.brownDk, P.black, P.brown][i % 3]}" ${ST(4)}/>`;
  return `${R(0, 0, 1080, 1920, '#CDB48E')}${Array.from({ length: 10 }, (_, i) => `<path d="M ${i * 110 + 40} 0 V 1920" stroke="#B89C74" stroke-width="5"/>`).join('')}
    <rect x="40" y="520" width="680" height="22" fill="${P.woodSh}" ${ST(5)}/>${shelf}
    <rect x="60" y="640" width="250" height="300" fill="#F6EBC6" ${ST(7)}/><path d="M 185 640 V 940 M 60 790 H 310" ${ST(7)}/>`;
}
export function benchFront(y = 1330) {
  return `<rect x="-20" y="${y}" width="1120" height="${1950 - y}" fill="${P.wood}" ${ST(7)}/><rect x="-20" y="${y}" width="1120" height="40" fill="${P.woodHi}" ${ST(6)}/>`;
}
export const bootOnBench = (x = 660, y = 1330) => `<path d="M ${x} ${y} L ${x + 12} ${y - 90} Q ${x + 70} ${y - 140} ${x + 140} ${y - 104} L ${x + 176} ${y} Z" fill="${P.black}" ${ST(5)}/><path d="M ${x + 12} ${y - 68} Q ${x + 70} ${y - 104} ${x + 150} ${y - 68}" stroke="#5a4a40" stroke-width="6" fill="none"/>`;
// iron strongbox; open 0..1 lifts the lid; label optional
export function cashBox(x, y, s, open = 0, label = '') {
  let notes = '';
  if (open > .2) for (let i = 0; i < 5; i++) notes += `<rect x="${-110 + i * 44}" y="${-96 - 10 * hash(i)}" width="70" height="40" fill="#C9D3B0" ${ST(3)} transform="rotate(${(hash(i + 3) - .5) * 30} ${-75 + i * 44} -76)"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${notes}<rect x="-140" y="-90" width="280" height="190" rx="12" fill="${P.steel}" ${ST(7)}/>
    <g transform="translate(0 -90) rotate(${-105 * open} -140 0)"><rect x="-140" y="-40" width="280" height="44" rx="8" fill="#6E7A88" ${ST(6)}/></g>
    <circle cx="0" cy="${label ? 66 : 10}" r="18" fill="${P.gold}" ${ST(4)}/>${label ? `<rect x="-118" y="-30" width="236" height="56" rx="6" fill="${P.paper}" ${ST(4)}/>${TX(0, 10, 30, label, P.ink, { ls: 0 })}` : ''}</g>`;
}
// police officer kind already in KIND (police); handcuffs pair
export const cuffs = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle cx="-26" cy="0" r="22" fill="none" stroke="${P.silver}" stroke-width="10"/><circle cx="-26" cy="0" r="22" fill="none" ${ST(3)}/><circle cx="26" cy="0" r="22" fill="none" stroke="${P.silver}" stroke-width="10"/><circle cx="26" cy="0" r="22" fill="none" ${ST(3)}/><path d="M -4 0 h 8" stroke="${P.steel}" stroke-width="8"/></g>`;
