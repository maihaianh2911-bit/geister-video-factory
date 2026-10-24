// EXEMPLAR (approved quality) — 3 representative shots of "Gibt es Geister wirklich?" (~17 s of the 88 s video).
// shot1 (0–5.3 s): over-the-shoulder bedroom, clock flip, door impact -> picture tilt, dust, sound rings, character anticipation/startle/grip/head turn, thought bubble with an imagined scene that pops.
// sThirteen (22.8–26 s): counting beat — 13 ghosts fly out one by one around a reacting character, number counter + "+" pop.
// sWall (32.9–41.7 s): one continuous action — ghost glides through a wall, stops (overshoot), looks down, sinks through the floor; magnifier lenses compare matter; re-emerges with "?".
// Engine functions (ghostX, ghost, personF, headBack, hand, scallop, prog, back, ring ...) come from src/engine/core.js.

function sThirteen(t) {
  let g = '', count = 0;
  let nearest = 0;
  for (let i = 0; i < 13; i++) {
    const t0 = 23.0 + i * .18;
    if (t < t0) continue;
    count++;
    const an = -Math.PI / 2 + (i - 6) * .42 + (i % 2 ? Math.PI : 0) * 0 ;
    const ang = -Math.PI * .95 + i / 12 * Math.PI * 1.9;
    const R = 360 + (i % 2) * 70;
    const tx = 540 + R * Math.cos(ang), ty = 900 + R * .95 * Math.sin(ang);
    const p = back(prog(t, t0, t0 + .3));
    const x = lerp(540, tx, p), y = lerp(1000, ty, p);
    nearest = tx;
    g += ghostX(x, y - 6 * Math.sin(t * 3 + i), .48 * cl(p * 1.5), { t: t + i, look: (540 - x) / 30, mouth: i % 3 ? 'smile' : 'grin', brows: i % 2 ? 'calm' : 'mean' });
  }
  const shrink = eout(prog(t, 23.1, 23.5));
  const look = count ? cl((nearest - 540) / 15, -18, 18) : 0;
  const plus = back(prog(t, 25.35, 25.55));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="0" y="1300" width="1080" height="700" fill="url(#gFloor)"/>
    <ellipse cx="540" cy="900" rx="520" ry="520" fill="url(#gMoon)" opacity=".25"/>
    ${personF(540, 1360, .95, { aL: 12 - 8 * shrink, aR: -12 + 8 * shrink, look, brow: shrink, mouth: count > 6 ? 'worried' : 'flat', sy: 1 - .04 * shrink, headDy: 10 * shrink })}
    ${g}
    <g transform="translate(540 300)"><text x="${plus > 0 ? -30 : 0}" y="0" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:180px" fill="${C.ghost}" stroke="${C.ol}" stroke-width="8" paint-order="stroke">${count}</text>
      ${plus > 0 ? `<text x="100" y="-10" text-anchor="middle" transform="scale(${plus})" style="font-family:'Inter';font-weight:900;font-size:150px" fill="${C.warm}" stroke="${C.ol}" stroke-width="8" paint-order="stroke">+</text>` : ''}</g>`;
}

function sWall(t) {
  const x = t < 35.3 ? lerp(140, 800, eio(prog(t, 32.95, 35.3))) : 800 + 18 * ring(t, 35.3, 1.4, 6);
  const look = t < 35.9 ? 10 : 0;
  const lookY = eout(prog(t, 35.9, 36.25)) * 16;
  const hop = -26 * Math.sin(prog(t, 36.45, 36.75) * Math.PI);
  const sink = ein(prog(t, 36.75, 37.7));
  let y = 940 + hop + sink * 800 - (sink > 0 ? 0 : 8 * Math.sin(t * 3));
  const reup = prog(t, 39.6, 40.0);
  if (t >= 39.6) y = lerp(1600, 1228, back(reup)) - (t > 40 ? 12 * Math.sin((t - 40) * 4) : 0);
  const tilt = t > 36.0 && t < 36.8 ? 8 * eout(prog(t, 36.0, 36.3)) : 0;
  const mouth = t > 36.6 && t < 38 ? 'o' : t >= 39.6 ? 'flat' : 'smile';
  const lk = t >= 39.6 ? (t < 40.4 ? lerp(0, -16, eout(prog(t, 40.0, 40.3))) : 0) : look;
  const lky = t >= 39.6 ? (t > 40.4 ? 14 * eout(prog(t, 40.4, 40.7)) : 0) : lookY;
  const tl2 = t >= 39.6 ? -10 * back(prog(t, 40.9, 41.15)) : tilt;
  const q = back(prog(t, 41.05, 41.3));
  let bricks = '';
  for (let r = 0; r < 20; r++) for (let c = 0; c < 2; c++) bricks += `<rect x="${500 + (r % 2) * 20 + c * 40 - 20}" y="${250 + r * 50}" width="40" height="50" fill="none" stroke="#5a2f2a" stroke-width="4"/>`;
  const lens = (cx, cy, p) => {
    if (p <= 0) return '';
    let a = '';
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) a += `<circle cx="${cx + i * 50 + 4 * Math.sin(t * 20 + i * 3 + j)}" cy="${cy + j * 50 + 4 * Math.cos(t * 17 + j * 2 + i)}" r="16" fill="#e0a26b" stroke="${C.ol}" stroke-width="4"/>`;
    return `<g transform="translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})"><line x1="${cx + 110}" y1="${cy + 110}" x2="${cx + 190}" y2="${cy + 190}" stroke="#2b2f3d" stroke-width="30" stroke-linecap="round"/>
      <clipPath id="ln${cx}"><circle cx="${cx}" cy="${cy}" r="140"/></clipPath><circle cx="${cx}" cy="${cy}" r="140" fill="#1b2340"/><g clip-path="url(#ln${cx})">${a}</g>
      <circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="#c9d2e6" stroke-width="16"/><circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="${C.ol}" stroke-width="5"/></g>`;
  };
  const lp1 = back(prog(t, 37.8, 38.1)) * (1 - prog(t, 39.45, 39.6)), lp2 = back(prog(t, 38.1, 38.4)) * (1 - prog(t, 39.45, 39.6));
  const eq = back(prog(t, 38.5, 38.75)) * (1 - prog(t, 39.45, 39.6));
  return `<rect x="0" y="0" width="540" height="1300" fill="#22325a"/><rect x="540" y="0" width="540" height="1300" fill="#1c2848"/>
    ${[100, 300].map(x => `<rect x="${x}" y="420" width="120" height="160" fill="#2d3f6e" stroke="${C.ol}" stroke-width="5"/>`).join('')}
    <rect x="850" y="380" width="150" height="110" fill="#3a3157" stroke="${C.ol}" stroke-width="5"/>
    <rect x="0" y="1420" width="1080" height="600" fill="#0b0f1a"/>
    ${t < 39.6 && sink < 1 || t >= 39.6 ? ghostX(x, y, .9, { t, look: lk, lookY: lky, tilt: tl2, mouth, brows: t > 36.6 && t < 38 ? 'up' : 'calm', aL: t > 36.75 && t < 38 ? 150 : 28, aR: t > 36.75 && t < 38 ? -150 : -28 }) : ''}
    <g opacity=".86"><rect x="500" y="250" width="80" height="1000" fill="#a4553f" stroke="${C.ol}" stroke-width="6"/>${bricks}</g>
    <g opacity=".9"><rect x="0" y="1250" width="1080" height="34" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="0" y="1284" width="1080" height="136" fill="#4a4a60" stroke="${C.ol}" stroke-width="6"/>
      ${Array.from({ length: 22 }, (_, i) => `<line x1="${i * 52}" y1="1300" x2="${i * 52 + 40}" y2="1410" stroke="#3a3a50" stroke-width="5"/>`).join('')}</g>
    ${lens(540, 640, lp1)}${lens(300, 1250, lp2)}
    ${eq > 0 ? `<text x="430" y="1000" text-anchor="middle" transform="translate(430 960) scale(${eq}) translate(-430 -960)" style="font-family:'Inter';font-weight:900;font-size:150px" fill="${C.warm}" stroke="${C.ol}" stroke-width="7" paint-order="stroke">=</text>` : ''}
    ${q > 0 ? `<text x="${x + 110}" y="1080" text-anchor="middle" transform="translate(${x + 110} 1030) scale(${q}) translate(${-x - 110} -1030)" style="font-family:'Inter';font-weight:900;font-size:160px" fill="${C.warm}" stroke="${C.ol}" stroke-width="7" paint-order="stroke">?</text>` : ''}`;
}
