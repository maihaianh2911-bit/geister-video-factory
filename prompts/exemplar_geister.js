// EXEMPLAR (approved quality) — 3 representative shots of "Gibt es Geister wirklich?" (~17 s of the 88 s video).
// shot1 (0–5.3 s): over-the-shoulder bedroom, clock flip, door impact -> picture tilt, dust, sound rings, character anticipation/startle/grip/head turn, thought bubble with an imagined scene that pops.
// sThirteen (22.8–26 s): counting beat — 13 ghosts fly out one by one around a reacting character, number counter + "+" pop.
// sWall (32.9–41.7 s): one continuous action — ghost glides through a wall, stops (overshoot), looks down, sinks through the floor; magnifier lenses compare matter; re-emerges with "?".
// Engine functions (ghostX, ghost, personF, headBack, hand, scallop, prog, back, ring ...) come from src/engine/core.js.


function shot1(t) {
  const shake = t > 1.3 && t < 2 ? Math.exp(-(t - 1.3) * 7) * 12 : 0;
  const cx = shake * Math.sin(t * 93), cy = shake * Math.cos(t * 71);
  const imp = t >= 1.3 ? Math.exp(-(t - 1.3) * 4.5) : 0;
  const doorJ = imp * 7 * Math.sin((t - 1.3) * 55);
  const handleRot = t >= 1.3 ? imp * 26 * Math.sin((t - 1.3) * 40) + 4 * Math.sin(t * 33) * cl((t - 1.3) / .3) : 0;
  const tilt = t >= 1.33 ? 9 - 9 * Math.exp(-(t - 1.33) * 5) * Math.cos((t - 1.33) * 17) : 0;
  const strip = t < 1.3 ? .85 : (t < 1.7 ? (hash(Math.floor(t * 20)) > .5 ? .3 : .85) : .85);

  // clock flip 01:59 -> 02:00
  const fp = eio(prog(t, .28, .55));
  const colon = Math.floor(t * 2) % 2 ? .25 : 1;
  const digit = (ch0, ch1, x, changes) => {
    if (!changes) return `<text x="${x}" y="905" class="dg">${ch0}</text>`;
    return `<text x="${x}" y="${905 - 70 * fp}" class="dg">${ch0}</text><text x="${x}" y="${975 - 70 * fp}" class="dg">${ch1}</text>`;
  };
  const clock = `<g filter="url(#drop)">
    <rect x="60" y="830" width="250" height="110" rx="20" fill="#11141d" stroke="${C.ol}" stroke-width="6"/>
    <rect x="76" y="846" width="218" height="78" rx="10" fill="#07080c"/></g>
    <clipPath id="clk"><rect x="76" y="846" width="218" height="78" rx="10"/></clipPath>
    <g clip-path="url(#clk)" style="font-family:'Inter';font-weight:900;font-size:66px" fill="${C.red}" text-anchor="middle">
      <style>.dg{}</style>
      ${digit('0', '0', 106, false)}${digit('1', '2', 148, true)}
      <text x="185" y="900" opacity="${colon}">:</text>
      ${digit('5', '0', 222, true)}${digit('9', '0', 264, true)}
    </g>
    <ellipse cx="185" cy="885" rx="210" ry="120" fill="url(#gRed)" opacity="${.6 + .4 * fp}"/>`;

  // character timing
  const breathe = 9 * Math.sin(t * 3.2);
  // sleeper nestles into the pillow before the noise (anticipation-free idle action)
  const nest = t < 1.36 ? 6 * Math.sin(prog(t, .5, 1.3) * Math.PI) : 0;
  const cloudX = lerp(-60, 330, prog(t, 0, 1.3)) + (t > 1.3 ? 390 * prog(t, 1.3, 6) : 0);
  const moonDim = 1 - .55 * Math.max(0, 1 - Math.abs(cloudX - 270) / 120);
  const a = prog(t, 1.36, 1.47), b = prog(t, 1.47, 1.8);
  const lift = (t < 1.36 ? breathe : 0) + 14 * eout(a) * (1 - eio(b)) - 64 * back(b);
  const grip = back(prog(t, 1.82, 2.12));
  const u = cl(back(prog(t, 2.12, 2.55)), 0, 1.06);
  let jx = 0;
  if (t > 2.6) jx += 2 * Math.sin(t * 57);
  if (t > 4.5 && t < 5.1) jx += 7 * Math.sin(t * 80) * Math.sin(prog(t, 4.5, 5.1) * Math.PI);
  const blink = t > 3.0 && t < 3.12 ? Math.sin(prog(t, 3.0, 3.12) * Math.PI) : 0;
  const edgeY = 1352 - 40 * grip + lift * .35;

  // sound rings from door
  let rings = '';
  for (let k = 0; k < 3; k++) {
    const p = prog(t, 1.3 + k * .09, 1.95 + k * .09);
    if (p > 0 && p < 1) rings += `<circle cx="770" cy="690" r="${50 + p * 300}" fill="none" stroke="${C.warm}" stroke-width="${8 * (1 - p)}" opacity="${.55 * (1 - p)}"/>`;
  }
  let dust = '';
  if (t > 1.32) for (let i = 0; i < 9; i++) {
    const dt = t - 1.32 - i * .03, p = prog(dt, 0, 1.2);
    if (dt > 0 && p < 1) dust += `<circle cx="${660 + i * 28 + 10 * Math.sin(dt * 5 + i)}" cy="${372 + 420 * dt * dt * (0.7 + (i % 3) * .25)}" r="${3 + (i % 3)}" fill="#c9b9a6" opacity="${.9 * (1 - p)}"/>`;
  }

  // thought bubble (imagination)
  let bubble = '';
  if (t > 3.3) {
    const dots = [[392, 1078, 18, 3.32], [450, 1000, 26, 3.4], [520, 905, 36, 3.48]];
    let dd = '';
    for (const [x, y, r, t0] of dots) dd += `<circle cx="${x}" cy="${y}" r="${r * back(prog(t, t0, t0 + .16))}" fill="#e9f0ff" stroke="${C.ol}" stroke-width="6"/>`;
    const pop = prog(t, 5.06, 5.22);
    const bs = back(prog(t, 3.55, 3.88)) * (1 + .12 * eout(pop));
    const bx = 660, by = 560;
    const path = scallop(0, 0, 330, 255, 15);
    // imagined scene inside bubble (bubble-local coordinates)
    const o = eio(prog(t, 3.92, 4.22));
    const gx = lerp(40, 170, back(prog(t, 4.2, 4.5)));
    const arms = back(prog(t, 4.52, 4.72));
    const st = 1 + .12 * Math.sin(prog(t, 4.52, 4.8) * Math.PI);
    const inner = `
      <rect x="-340" y="-270" width="680" height="540" fill="#26355a"/>
      <rect x="-340" y="140" width="680" height="140" fill="#1b2440"/>
      <rect x="-110" y="-170" width="190" height="310" fill="${C.dark}"/>
      <rect x="-122" y="-182" width="214" height="322" fill="none" stroke="${C.woodSh}" stroke-width="16"/>
      <polygon points="-110,-170 ${80 - 150 * o},${-170 + 18 * o} ${80 - 150 * o},${140 - 18 * o} -110,140" fill="url(#gDoor)" stroke="${C.ol}" stroke-width="6"/>
      ${t > 4.18 ? ghost(gx, 10, .55, { t, arms, mouth: arms > .3 ? 'o' : 'smile', stretch: st, look: arms > .3 ? 0 : 6, tilt: lerp(-14, 0, arms) }) : ''}
      <rect x="-340" y="-270" width="680" height="540" fill="#9fc2ff" opacity=".08"/>`;
    const op = pop >= 1 ? 0 : 1;
    let burst = '';
    if (pop > 0) for (let i = 0; i < 12; i++) {
      const an = i / 12 * Math.PI * 2, rr = 300 + 160 * eout(pop);
      burst += `<circle cx="${bx + rr * Math.cos(an) * 1.15}" cy="${by + rr * Math.sin(an) * .9}" r="${22 * (1 - pop)}" fill="#e9f0ff"/>`;
    }
    bubble = `${pop < .3 ? dd : ''}
      <g transform="translate(${bx} ${by}) scale(${bs})" opacity="${op}">
        <path d="${path}" fill="#000" opacity=".35" transform="translate(0 18)" filter="url(#blur8)"/>
        <clipPath id="bub"><path d="${path}"/></clipPath>
        <g clip-path="url(#bub)">${inner}</g>
        <path d="${path}" fill="none" stroke="#e9f0ff" stroke-width="14"/>
        <path d="${path}" fill="none" stroke="${C.ol}" stroke-width="5"/>
      </g>${burst}`;
  }

  const curtain = s => `<path d="M ${s < 0 ? 66 : 374} 250 Q ${s < 0 ? 120 + 6 * Math.sin(t * 1.3) : 320 - 6 * Math.sin(t * 1.3)} 450 ${s < 0 ? 70 : 370} 660 L ${s < 0 ? 132 : 308} 660 Q ${s < 0 ? 170 : 270} 450 ${s < 0 ? 140 : 300} 250 Z" fill="#33437a" stroke="${C.ol}" stroke-width="5"/>`;
  let planks = '';
  for (let i = -6; i <= 14; i++) planks += `<line x1="${540 + i * 40}" y1="985" x2="${540 + i * 170}" y2="1500" stroke="#1a162a" stroke-width="4"/>`;

  return `<g transform="translate(${cx} ${cy})">
    <rect x="-20" y="-20" width="1120" height="1010" fill="url(#gWall)"/>
    <rect x="-20" y="985" width="1120" height="960" fill="url(#gFloor)"/>${planks}
    <polygon points="90,640 360,640 760,1180 300,1180" fill="${C.moon}" opacity="${.08 * moonDim}"/>
    <!-- window -->
    <g><rect x="90" y="260" width="270" height="380" rx="8" fill="#0d1630" stroke="${C.ol}" stroke-width="8"/>
      <circle cx="270" cy="360" r="90" fill="url(#gMoon)" opacity="${moonDim}"/><circle cx="270" cy="360" r="42" fill="${C.moon}"/>
      <clipPath id="win"><rect x="90" y="260" width="270" height="380"/></clipPath>
      <g clip-path="url(#win)"><g transform="translate(${cloudX} 360)"><ellipse cx="0" cy="0" rx="80" ry="28" fill="#4b5a85"/><ellipse cx="-30" cy="-18" rx="40" ry="26" fill="#56679a"/><ellipse cx="28" cy="-14" rx="34" ry="22" fill="#56679a"/></g></g>
      <circle cx="160" cy="320" r="3" fill="#fff"/><circle cx="200" cy="470" r="2" fill="#fff"/><circle cx="320" cy="520" r="2.5" fill="#fff"/>
      <path d="M 225 260 V 640 M 90 450 H 360" stroke="#2a3557" stroke-width="10"/>
      ${curtain(-1)}${curtain(1)}<rect x="60" y="240" width="330" height="18" rx="9" fill="${C.woodSh}"/></g>
    <!-- picture frame (reacts to the bump) -->
    <g transform="rotate(${tilt} 515 455)"><line x1="515" y1="455" x2="470" y2="490" stroke="#000" stroke-width="3"/><line x1="515" y1="455" x2="560" y2="490" stroke="#000" stroke-width="3"/>
      <rect x="450" y="488" width="130" height="110" fill="#d9c9a3" stroke="${C.woodSh}" stroke-width="10"/>
      <path d="M 460 590 L 495 540 L 520 565 L 545 525 L 570 590 Z" fill="#6f8f7a"/></g>
    <!-- door (background) -->
    <rect x="626" y="346" width="290" height="642" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="6"/>
    <g transform="translate(${doorJ} 0)">
      <rect x="642" y="362" width="258" height="624" fill="url(#gDoor)" stroke="${C.ol}" stroke-width="5"/>
      <rect x="672" y="400" width="198" height="250" rx="6" fill="none" stroke="${C.woodSh}" stroke-width="9"/>
      <rect x="672" y="700" width="198" height="250" rx="6" fill="none" stroke="${C.woodSh}" stroke-width="9"/>
      <g transform="rotate(${handleRot} 872 680)"><circle cx="872" cy="680" r="15" fill="#d8b25a" stroke="${C.ol}" stroke-width="4"/><rect x="822" y="672" width="52" height="16" rx="8" fill="#d8b25a" stroke="${C.ol}" stroke-width="4"/></g>
    </g>
    <rect x="642" y="984" width="258" height="8" fill="${C.warm}" opacity="${strip}"/>
    <polygon points="642,990 900,990 980,1120 560,1120" fill="url(#gStrip)" opacity="${strip * .6}"/>
    ${rings}${dust}
    <!-- nightstand + clock (midground) -->
    <g filter="url(#drop)"><rect x="30" y="935" width="300" height="300" rx="10" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="30" y="935" width="300" height="26" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="60" y="1000" width="240" height="90" rx="8" fill="none" stroke="${C.woodSh}" stroke-width="7"/><circle cx="180" cy="1045" r="10" fill="#d8b25a"/></g>
    ${clock}
    <!-- footboard (midground) -->
    <rect x="560" y="1000" width="540" height="56" rx="12" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="566" y="950" width="34" height="130" rx="10" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    <!-- pillow + character (foreground) -->
    <g transform="translate(${jx} 0)">
      <path d="M -40 1160 Q 60 1090 300 1110 Q 560 1100 620 1200 Q 650 1330 560 1420 L -40 1440 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="7"/>
      <path d="M 40 1180 Q 200 1150 420 1175" stroke="${C.pillowSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="300" cy="${1430 + lift * .6}" rx="250" ry="110" fill="${C.pj}" stroke="${C.ol}" stroke-width="7"/>
      <g transform="translate(300 ${1268 + lift}) rotate(${nest})">${headBack(u, blink)}</g>
    </g>
    <!-- blanket (foreground) -->
    <path d="M -30 1960 L -30 ${1440 + lift * .3} C 140 ${1420 + lift * .3} 330 ${1470 + lift * .2} 470 ${edgeY + 10} C 580 ${edgeY - 6} 650 1300 730 1190 C 800 1090 880 1060 1100 1050 L 1100 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="7"/>
    <path d="M 600 1500 Q 760 1330 1000 1250 M 760 1620 Q 880 1480 1080 1420 M 820 1150 Q 900 1100 1060 1090" stroke="${C.blankSh}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M 520 ${edgeY + 30} Q 640 1290 700 1220" stroke="${C.blankHi}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/>
    ${grip > 0 ? hand(540 + jx, edgeY + 4, .95 * grip, -8) : ''}
    ${bubble}
  </g>`;
}

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
