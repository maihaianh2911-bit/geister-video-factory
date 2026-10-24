// @ts-nocheck
// Geister video: engine + scenes ported 1:1 from the approved HTML prototype.
// Every layer is a pure function of time t (seconds) -> SVG string.
// Frame-driven 2D animation (Remotion-style: every layer is a pure function of time).
const FPS = 30;
const SUBS_OLD = [
  [0, 5.308, 'Zwei Uhr nachts. Draußen im Flur ein dumpfes Geräusch. Dein erster Gedanke: ein Geist.'],
  [5.308, 9.457, 'Voller Angst starrst du auf die Tür. Aber gibt es Geister wirklich?'],
];
// ---------- palette ----------
const C = {
  ol: '#0a0f1c', skin: '#f3c39c', skinSh: '#d89c74', hair: '#3b2720', hairHi: '#6a4636',
  pj: '#2f9fac', pjSh: '#227781', blank: '#3f66c8', blankHi: '#6b93ee', blankSh: '#2b4796',
  pillow: '#e2e9f7', pillowSh: '#a9b7d4', wood: '#8d5b3c', woodHi: '#ad7650', woodSh: '#5c3a26',
  wall: '#1d2b4a', wallFar: '#172440', floor: '#241f38', moon: '#d8e6ff', warm: '#ffd27a',
  red: '#ff5468', ghost: '#effffb', ghostSh: '#b5ece2', glow: '#62f0d2', dark: '#060912',
};
// ---------- timing helpers ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const prog = (t, a, b) => cl((t - a) / (b - a));
const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const eout = x => 1 - Math.pow(1 - x, 3);
const ein = x => x * x * x;
const back = (x, s = 1.70158) => x <= 0 ? 0 : x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
const lerp = (a, b, p) => a + (b - a) * p;
const ring = (t, t0, f, d) => t < t0 ? 0 : Math.exp(-(t - t0) * d) * Math.sin((t - t0) * f * 2 * Math.PI);
const hash = n => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

// ---------- shared defs ----------
const DEFS = `<defs>
<filter id="blur8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="blur20" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="20"/></filter>
<filter id="blur40" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="40"/></filter>
<filter id="drop" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000" flood-opacity=".45"/></filter>
<linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121b30"/><stop offset=".55" stop-color="${C.wall}"/><stop offset="1" stop-color="#18243f"/></linearGradient>
<linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1830"/><stop offset="1" stop-color="#2c2542"/></linearGradient>
<linearGradient id="gBlank" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blankHi}"/><stop offset=".5" stop-color="${C.blank}"/><stop offset="1" stop-color="${C.blankSh}"/></linearGradient>
<linearGradient id="gDoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.woodSh}"/><stop offset=".25" stop-color="${C.wood}"/><stop offset="1" stop-color="${C.woodHi}"/></linearGradient>
<linearGradient id="gStrip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.warm}" stop-opacity=".75"/><stop offset="1" stop-color="${C.warm}" stop-opacity="0"/></linearGradient>
<radialGradient id="gVig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>
<radialGradient id="gTorch" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3d1" stop-opacity=".95"/><stop offset=".55" stop-color="#ffd98f" stop-opacity=".55"/><stop offset="1" stop-color="#ffb85c" stop-opacity="0"/></radialGradient>
<radialGradient id="gRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.red}" stop-opacity=".35"/><stop offset="1" stop-color="${C.red}" stop-opacity="0"/></radialGradient>
<radialGradient id="gMoon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.moon}" stop-opacity=".55"/><stop offset="1" stop-color="${C.moon}" stop-opacity="0"/></radialGradient>
</defs>`;

// ---------- characters ----------
function ghostPath(t) {
  const w = [0, 1, 2, 3].map(i => 13 * Math.sin(t * 6 + i * 1.4));
  return `M -105 -30 C -108 -178 108 -178 105 -30 L 110 112 Q 82 ${148 + w[0]} 55 116 Q 27 ${148 + w[1]} 0 116 Q -27 ${148 + w[2]} -55 116 Q -82 ${148 + w[3]} -110 112 Z`;
}
// A ghost with its own silhouette (tilted top curl, stubby arms, wavy tail) and expressions.
function ghost(x, y, s, o = {}) {
  const t = o.t || 0, arms = o.arms || 0, tilt = o.tilt || 0, st = o.stretch || 1, look = o.look || 0;
  const aL = lerp(28, 150, arms), aR = -aL;
  const body = ghostPath(t);
  if (o.draw !== undefined) { // outline-only "hypothesis" ghost drawn with a pen stroke
    const eyes = o.eyes || 0;
    return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s} ${s * st})">
      <path d="${body}" fill="${C.ghost}" fill-opacity="${0.12 * (o.fill || 0)}" stroke="${C.ghost}" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 0" pathLength="1" style="stroke-dasharray:${o.draw} 1"/>
      <g transform="translate(0 -20) scale(${eyes})"><ellipse cx="-38" cy="0" rx="15" ry="23" fill="${C.ghost}"/><ellipse cx="38" cy="0" rx="15" ry="23" fill="${C.ghost}"/></g>
    </g>`;
  }
  const mouth = o.mouth === 'o'
    ? `<ellipse cx="0" cy="42" rx="20" ry="${26 * st}" fill="${C.ol}"/><ellipse cx="0" cy="54" rx="11" ry="8" fill="#ff8fa8"/>`
    : `<path d="M -22 36 Q 0 54 22 36" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const brows = o.mouth === 'o'
    ? `<path d="M -62 -64 L -20 -52 M 62 -64 L 20 -52" stroke="${C.ol}" stroke-width="8" stroke-linecap="round"/>`
    : `<path d="M -60 -58 Q -40 -70 -20 -60 M 60 -58 Q 40 -70 20 -60" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const arm = (ang, sx) => `<g transform="rotate(${ang} ${sx * 92} 10)"><ellipse cx="${sx * 92}" cy="52" rx="24" ry="46" fill="${C.ghost}" stroke="${C.ol}" stroke-width="7"/></g>`;
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s} ${s * st})">
    <path d="${body}" fill="${C.glow}" opacity=".45" filter="url(#blur20)"/>
    ${arm(aL, -1)}${arm(aR, 1)}
    <path d="${body}" fill="${C.ghost}" stroke="${C.ol}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 70 -110 C 98 -70 100 40 92 108" stroke="${C.ghostSh}" stroke-width="22" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M 4 -142 q 20 -34 46 -20" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cx="${-38 + look}" cy="-20" rx="16" ry="24" fill="${C.ol}"/><ellipse cx="${38 + look}" cy="-20" rx="16" ry="24" fill="${C.ol}"/>
    <circle cx="${-33 + look}" cy="-30" r="6" fill="#fff"/><circle cx="${43 + look}" cy="-30" r="6" fill="#fff"/>
    ${brows}
    <ellipse cx="-62" cy="14" rx="14" ry="8" fill="#7fe6d6" opacity=".7"/><ellipse cx="62" cy="14" rx="14" ry="8" fill="#7fe6d6" opacity=".7"/>
    ${mouth}
  </g>`;
}

// Back-of-head with a turn parameter u (0 = seen from behind, 1 = profile toward the door).
function headBack(u, blink) {
  const hx = -u * 105;
  const eye = u > 0.35 ? cl((u - .35) / .4) : 0;
  return `
    <ellipse cx="${-150 - u * 30}" cy="12" rx="24" ry="36" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="0" cy="0" r="150" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/>
    <clipPath id="hc"><circle cx="0" cy="0" r="146"/></clipPath>
    <g clip-path="url(#hc)">
      <circle cx="${hx}" cy="${-14 - u * 22}" r="168" fill="${C.hair}"/>
      <ellipse cx="${20 - u * 10}" cy="-118" rx="150" ry="${50 + u * 22}" fill="${C.hair}"/>
      <path d="M ${150 - u * 30} -70 Q ${110} ${-40 + u * 6} ${86} -78 Z" fill="${C.hair}" opacity="${u}"/>
      <path d="M ${hx - 40} -150 Q ${hx + 70} -150 ${hx + 120} -60" stroke="${C.hairHi}" stroke-width="18" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M ${hx - 90} -90 Q ${hx - 20} -40 ${hx - 70} 40" stroke="#2a1b16" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="${150 - 20}" cy="40" rx="${30 * eye}" ry="${18 * eye}" fill="#f19c86" opacity=".55"/>
    </g>
    <circle cx="0" cy="0" r="150" fill="none" stroke="${C.ol}" stroke-width="7"/>
    <path d="M 140 -10 q ${30 * eye} 16 ${4 * eye} 40" fill="${C.skin}" stroke="${C.ol}" stroke-width="${6 * eye}" stroke-linejoin="round"/>
    <g transform="translate(118 -18) scale(${eye} ${eye * (1 - blink)})"><ellipse cx="0" cy="0" rx="16" ry="21" fill="#fff" stroke="${C.ol}" stroke-width="5"/><circle cx="7" cy="0" r="9" fill="${C.ol}"/></g>
    <path d="M ${100} ${-52 - 10 * eye} q 18 -10 36 0" stroke="${C.ol}" stroke-width="${7 * eye}" fill="none" stroke-linecap="round"/>
    <ellipse cx="${150 - u * 125}" cy="10" rx="${22 + u * 6}" ry="34" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/>
    <path d="M ${148 - u * 125} -2 q 10 12 0 24" stroke="${C.skinSh}" stroke-width="5" fill="none"/>`;
}

function hand(x, y, s, rot = 0) {
  const f = [-36, -12, 12, 36].map((d, i) => `<rect x="${d - 12}" y="-30" width="24" height="${46 - Math.abs(i - 1.5) * 4}" rx="12" fill="${C.skin}" stroke="${C.ol}" stroke-width="5"/>`).join('');
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${f}<path d="M -48 6 Q 0 22 48 6" stroke="${C.skinSh}" stroke-width="5" fill="none"/></g>`;
}

function scallop(cx, cy, rx, ry, n, bulge = .62) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p = pts[(i + 1) % n], q = pts[i];
    const r = Math.hypot(p[0] - q[0], p[1] - q[1]) * bulge;
    d += ` A ${r} ${r} 0 0 1 ${p[0]} ${p[1]}`;
  }
  return d + ' Z';
}

// ---------- SHOT 1: over-the-shoulder, 0 – 5.30 s ----------
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

// ---------- SHOT 2: front close-up, 5.30 – 6.45 s ----------
function shot2(t) {
  const l = t - 5.3;
  const pull = -16 * eout(prog(l, 0, .1)) * (1 - eio(prog(l, .1, .4))) + 130 * back(prog(l, .1, .45));
  const by = 1130 - pull;
  const brow = eout(prog(l, .12, .4));
  const dart = eio(prog(l, .15, .35));
  const px = lerp(-26, 0, dart) + (l > .4 ? 3 * Math.sin(t * 61) : 0), py = lerp(8, 4, dart) + (l > .4 ? 2 * Math.cos(t * 53) : 0);
  const pr = lerp(27, 15, eout(prog(l, .4, .6)));
  const sw = prog(l, .5, .62), sy = eio(prog(l, .65, 1.1));
  const tr = l > .45 ? 2.5 * Math.sin(t * 66) : 0;
  const eye = ex => `<ellipse cx="${ex}" cy="760" rx="66" ry="${76 + 6 * brow}" fill="#fff" stroke="${C.ol}" stroke-width="7"/>
      <circle cx="${ex + px}" cy="${770 + py}" r="${pr + 8}" fill="#5a3a2a"/><circle cx="${ex + px}" cy="${770 + py}" r="${pr}" fill="${C.ol}"/>
      <circle cx="${ex + px + 8}" cy="${760 + py}" r="6" fill="#fff"/>`;
  return `<g transform="translate(${tr} 0)">
    <rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <ellipse cx="900" cy="300" rx="420" ry="380" fill="url(#gMoon)" opacity=".5"/>
    <rect x="70" y="280" width="940" height="560" rx="60" fill="${C.wood}" stroke="${C.ol}" stroke-width="8"/>
    <rect x="110" y="320" width="860" height="80" rx="30" fill="${C.woodHi}" opacity=".6"/>
    <path d="M 60 760 Q 120 560 540 570 Q 960 560 1020 760 Q 1040 1000 900 1100 L 180 1100 Q 40 1000 60 760 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <g>
      <ellipse cx="290" cy="790" rx="34" ry="52" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/><ellipse cx="790" cy="790" rx="34" ry="52" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/>
      <circle cx="540" cy="800" r="255" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
      <path d="M 290 760 Q 270 520 540 520 Q 820 520 790 760 Q 760 640 650 620 Q 600 680 520 650 Q 420 690 360 640 Q 300 680 290 760 Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="7"/>
      <path d="M 420 560 Q 560 520 680 570" stroke="${C.hairHi}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M 770 690 A 255 255 0 0 1 760 940" stroke="${C.moon}" stroke-width="10" fill="none" opacity=".55"/>
      ${eye(450)}${eye(630)}
      <path d="M ${380} ${660 - 24 * brow} Q 430 ${640 - 34 * brow} ${500} ${668 - 30 * brow}" stroke="${C.hair}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M ${700} ${660 - 24 * brow} Q 650 ${640 - 34 * brow} ${580} ${668 - 30 * brow}" stroke="${C.hair}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <g transform="translate(${735 + 8 * sy} ${640 + 150 * sy}) scale(${back(sw)})"><path d="M 0 -26 Q 18 4 0 16 Q -18 4 0 -26 Z" fill="#9fd9ff" stroke="${C.ol}" stroke-width="4"/></g>
    </g>
    <path d="M -30 1960 L -30 ${by + 40} Q 260 ${by - 20} 540 ${by} Q 820 ${by - 20} 1110 ${by + 40} L 1110 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 120 ${by + 220} Q 300 ${by + 140} 460 ${by + 260} M 620 ${by + 260} Q 800 ${by + 150} 960 ${by + 230}" stroke="${C.blankSh}" stroke-width="12" fill="none" stroke-linecap="round"/>
    ${hand(430, by + 8, 1.15, -6)}${hand(650, by + 8, 1.15, 6)}
  </g>`;
}

// ---------- SHOT 3 (POV door, 6.45 – 7.45) + SHOT 4 (under the blanket, 7.45 – 9.5) ----------
function shot3(t) {
  const l = t - 6.45;
  const hr = 5 * Math.sin(t * 29) * (0.6 + .4 * Math.sin(t * 3));
  const shadowX = lerp(560, 1060, eio(prog(l, .3, .95)));
  const shadowOn = l > .25 && l < 1.0;
  const tremble = 3 * Math.sin(t * 63);
  const doorView = `
    <rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="0" y="1240" width="1080" height="700" fill="url(#gFloor)"/>
    <rect x="250" y="210" width="580" height="1040" fill="${C.woodSh}" stroke="${C.ol}" stroke-width="8"/>
    <rect x="280" y="240" width="520" height="1006" fill="url(#gDoor)" stroke="${C.ol}" stroke-width="6"/>
    <rect x="330" y="300" width="420" height="420" rx="10" fill="none" stroke="${C.woodSh}" stroke-width="14"/>
    <rect x="330" y="780" width="420" height="400" rx="10" fill="none" stroke="${C.woodSh}" stroke-width="14"/>
    <g transform="rotate(${hr} 735 760)"><circle cx="735" cy="760" r="26" fill="#d8b25a" stroke="${C.ol}" stroke-width="6"/><rect x="650" y="746" width="90" height="28" rx="14" fill="#d8b25a" stroke="${C.ol}" stroke-width="6"/></g>
    <rect x="280" y="1240" width="520" height="12" fill="${C.warm}"/>
    <clipPath id="strip"><rect x="280" y="1240" width="520" height="12"/></clipPath>
    ${shadowOn ? `<g clip-path="url(#strip)"><rect x="${shadowX - 260}" y="1236" width="60" height="20" fill="#000"/><rect x="${shadowX - 170}" y="1236" width="60" height="20" fill="#000"/></g>` : ''}
    <polygon points="280,1252 800,1252 980,1500 100,1500" fill="url(#gStrip)" opacity=".55"/>
    <path d="M -30 1960 L -30 1430 Q 280 1360 540 1390 Q 800 1360 1110 1430 L 1110 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 100 1600 Q 300 1500 500 1620 M 640 1620 Q 820 1520 1000 1600" stroke="${C.blankSh}" stroke-width="12" fill="none" stroke-linecap="round"/>`;

  // blanket pulled over the camera (cause of the transition)
  const cover = eio(prog(t, 7.45, 7.85));
  const edge = 1960 - 2300 * cover;
  const hands = `${hand(380 + tremble, edge < 1400 ? edge + 10 : 1400, 1.3, -10)}${hand(700 + tremble, edge < 1400 ? edge + 10 : 1400, 1.3, 10)}`;
  let under = '';
  if (t >= 7.45) {
    const w = 30 * Math.sin(t * 8);
    under = `<path d="M -30 2000 L -30 ${edge + 40} Q 270 ${edge - 30 + w} 540 ${edge + 10} Q 810 ${edge + 50 - w} 1110 ${edge} L 1110 2000 Z" fill="#14204a" stroke="${C.ol}" stroke-width="8"/>
      <path d="M -30 ${edge + 40} Q 270 ${edge - 30 + w} 540 ${edge + 10} Q 810 ${edge + 50 - w} 1110 ${edge}" stroke="${C.blank}" stroke-width="22" fill="none"/>`;
  }
  let inside = '';
  if (t >= 7.85) {
    const on = t >= 8.05 && !(t >= 8.1 && t < 8.14);
    const ph = back(prog(t, 7.88, 8.05));
    const draw = eio(prog(t, 8.15, 8.75));
    const eyes = back(prog(t, 8.75, 8.92));
    const tilt = -14 * back(prog(t, 8.9, 9.12));
    const q = back(prog(t, 9.0, 9.2));
    const wob = t > 9.1 ? .55 + .45 * Math.abs(Math.sin(t * 9)) : 1;
    let folds = '';
    for (let i = 0; i < 6; i++) folds += `<path d="M ${-50 + i * 220} 0 Q ${60 + i * 220} 900 ${-20 + i * 210} 1920" stroke="#0b1430" stroke-width="40" fill="none" opacity=".7"/>`;
    inside = `<rect x="0" y="0" width="1080" height="1920" fill="#101a3c"/>${folds}
      ${on ? `<circle cx="540" cy="700" r="420" fill="url(#gTorch)"/>` : ''}
      ${on ? ghost(540, 730, 1.35, { t, draw, eyes, tilt, fill: draw }).replace('<g ', `<g opacity="${wob}" `) : ''}
      ${on && q > 0 ? `<text x="790" y="520" text-anchor="middle" transform="rotate(12 790 470) translate(790 470) scale(${q}) translate(-790 -470)" style="font-family:'Inter';font-weight:900;font-size:220px" fill="${C.warm}" stroke="${C.ol}" stroke-width="8" paint-order="stroke">?</text>` : ''}
      <g transform="translate(540 ${1640 - 470 * ph})">
        <rect x="-80" y="-10" width="160" height="300" rx="26" fill="#1a1d26" stroke="${C.ol}" stroke-width="7"/>
        <circle cx="-40" cy="20" r="14" fill="${on ? '#fff8dc' : '#444'}"/>
        ${on ? '<circle cx="-40" cy="20" r="40" fill="#fff3c4" opacity=".5" filter="url(#blur8)"/>' : ''}
        ${hand(0, 120, 1.25, 0)}
      </g>`;
  }
  return (t < 7.85 ? doorView + under + (cover < .95 ? hands : '') : inside);
}


// Scenes 9.457 s – 88 s. Depends on helpers/characters in anim.js.
const SUBS_ALL = [
  [0, 5.308, 'Zwei Uhr nachts. Draußen im Flur ein dumpfes Geräusch. Dein erster Gedanke: ein Geist.'],
  [5.308, 9.457, 'Voller Angst starrst du auf die Tür. Aber gibt es Geister wirklich?'],
  [9.457, 15.131, 'Hätte jeder Verstorbene einen Geist hinterlassen, wäre es in deinem Flur wohl ziemlich voll.'],
  [15.131, 20.012, 'Eine grobe Rechnung: Rund 117 Milliarden Menschen haben je auf der Erde gelebt,'],
  [20.012, 25.992, 'über 8 Milliarden leben heute. Im Schnitt kämen also auf jeden von uns mehr als dreizehn Geister.'],
  [25.992, 29.286, 'Nicht nur in alten Schlössern. Auch bei dir zu Hause.'],
  [29.286, 35.327, 'Aber bevor wir ihnen Platz machen, gibt es ein paar Probleme zu lösen. Ein Geist geht durch Wände.'],
  [35.327, 41.733, 'Warum fällt er dann nicht durch den Boden? Beides besteht aus Materie. Woran erkennt er den Unterschied?'],
  [41.733, 47.468, 'Er ist durchsichtig. Geht das Licht ungehindert durch seine Augen, ohne absorbiert zu werden,'],
  [47.468, 51.312, 'fehlt ihm das Lichtsignal zum Sehen. Und das Geräusch im Flur?'],
  [51.312, 57.718, 'Um etwas umzuwerfen, muss er eine Kraft ausüben. Um zu flüstern, muss er die Luft zum Schwingen bringen.'],
  [57.718, 65.528, 'Er kann nicht gleichzeitig überhaupt nicht mit Materie wechselwirken und nach Belieben Türen zuschlagen oder Möbel verschieben.'],
  [65.528, 68.823, 'Dafür bräuchte es einen Mechanismus, der das erklärt.'],
  [68.823, 74.68, 'Genau diese Widersprüche machen das vertraute Bild vom Geist wissenschaftlich schwer erklärbar.'],
  [74.68, 78.646, 'Das heißt nicht, dass jedes seltsame Erlebnis schon erklärt ist.'],
  [78.646, 84.503, 'Aber keine Erklärung zu haben, ist noch kein Beweis für Geister. Das Geräusch im Flur ist echt.'],
  [84.503, 88.0, 'Die dreizehn unsichtbaren Gäste bleiben nur eine Annahme.'],
];
const END_T = 88.0;

// ---------- extended characters ----------
function ghostX(x, y, s, o = {}) {
  const t = o.t || 0, aL = o.aL ?? 28, aR = o.aR ?? -28, sx = o.sx || 1, st = o.st || 1;
  const al = o.alpha ?? 1, lx = o.look || 0, ly = o.lookY || 0, tilt = o.tilt || 0;
  const body = ghostPath(t);
  const arm = (ang, sd) => `<g transform="rotate(${ang} ${sd * 92} 10)"><ellipse cx="${sd * 92}" cy="52" rx="24" ry="46" fill="${C.ghost}" fill-opacity="${al}" stroke="${C.ol}" stroke-width="7"/></g>`;
  let eyes;
  const em = o.eyes || 'n';
  if (em === 'glass') eyes = [-38, 38].map(e => `<ellipse cx="${e}" cy="-20" rx="17" ry="25" fill="#cfefff" fill-opacity=".15" stroke="#9fdfff" stroke-width="5"/>`).join('');
  else if (em === 'closed') eyes = `<path d="M -54 -18 Q -38 -6 -22 -18 M 22 -18 Q 38 -6 54 -18" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (em === 'x') eyes = `<path d="M -50 -32 L -26 -8 M -26 -32 L -50 -8 M 26 -32 L 50 -8 M 50 -32 L 26 -8" stroke="${C.ol}" stroke-width="8" stroke-linecap="round"/>`;
  else { const es = o.eyeS || 1; eyes = `<ellipse cx="${-38 + lx}" cy="${-20 + ly}" rx="${16 * es}" ry="${24 * es}" fill="${C.ol}"/><ellipse cx="${38 + lx}" cy="${-20 + ly}" rx="${16 * es}" ry="${24 * es}" fill="${C.ol}"/>
    <circle cx="${-33 + lx}" cy="${-30 + ly}" r="6" fill="#fff"/><circle cx="${43 + lx}" cy="${-30 + ly}" r="6" fill="#fff"/>`; }
  const B = {
    mean: `<path d="M -62 -64 L -20 -52 M 62 -64 L 20 -52" stroke="${C.ol}" stroke-width="8" stroke-linecap="round"/>`,
    up: `<path d="M -60 -66 Q -40 -82 -20 -72 M 60 -66 Q 40 -82 20 -72" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    sad: `<path d="M -60 -56 L -22 -70 M 60 -56 L 22 -70" stroke="${C.ol}" stroke-width="7" stroke-linecap="round"/>`,
    calm: `<path d="M -60 -58 Q -40 -70 -20 -60 M 60 -58 Q 40 -70 20 -60" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    none: ''
  }[o.brows || 'calm'];
  const M = {
    smile: `<path d="M -22 36 Q 0 54 22 36" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M -30 30 Q 0 66 30 30 Z" fill="${C.ol}"/><path d="M -16 46 Q 0 56 16 46" fill="#ff8fa8"/>`,
    o: `<ellipse cx="0" cy="42" rx="20" ry="26" fill="${C.ol}"/><ellipse cx="0" cy="54" rx="11" ry="8" fill="#ff8fa8"/>`,
    small: `<ellipse cx="0" cy="40" rx="10" ry="12" fill="${C.ol}"/>`,
    flat: `<path d="M -18 40 L 18 40" stroke="${C.ol}" stroke-width="7" stroke-linecap="round"/>`,
    wavy: `<path d="M -26 40 q 9 -10 17 0 q 9 10 17 0 q 9 -10 17 0" stroke="${C.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.mouth || 'smile'];
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s * sx} ${s * st})">
    ${o.noGlow ? '' : `<path d="${body}" fill="${C.glow}" opacity="${.45 * al}" filter="url(#blur20)"/>`}
    ${o.armsFront ? '' : arm(aL, -1) + arm(aR, 1)}
    <path d="${body}" fill="${C.ghost}" fill-opacity="${al}" stroke="${C.ol}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 70 -110 C 98 -70 100 40 92 108" stroke="${C.ghostSh}" stroke-width="22" fill="none" stroke-linecap="round" opacity="${.8 * al}"/>
    <path d="M 4 -142 q 20 -34 46 -20" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${eyes}${B}
    <ellipse cx="-62" cy="14" rx="14" ry="8" fill="#7fe6d6" opacity="${.7 * al}"/><ellipse cx="62" cy="14" rx="14" ry="8" fill="#7fe6d6" opacity="${.7 * al}"/>
    ${M}${o.armsFront ? arm(aL, -1) + arm(aR, 1) : ''}${o.hold || ''}
  </g>`;
}

// Full-body character, origin at the feet. aL/aR: arm angles (positive aL / negative aR = outward/up).
function personF(x, y, s, o = {}) {
  const aL = o.aL ?? 12, aR = o.aR ?? -12, lx = o.look || 0, ly = o.lookY || 0, br = o.brow || 0;
  const arm = (ang, sd) => `<g transform="rotate(${ang} ${sd * 92} -450)"><rect x="${sd * 92 - 24}" y="-462" width="48" height="200" rx="24" fill="${C.pj}" stroke="${C.ol}" stroke-width="6"/><circle cx="${sd * 92}" cy="-252" r="30" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/></g>`;
  const M = {
    smile: `<path d="M -30 -560 Q 0 -530 30 -560" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="0" cy="-550" rx="18" ry="22" fill="${C.ol}"/>`,
    flat: `<path d="M -22 -552 L 22 -552" stroke="${C.ol}" stroke-width="7" stroke-linecap="round"/>`,
    worried: `<path d="M -30 -548 q 10 -12 20 0 q 10 12 20 0 q 10 -12 20 0" stroke="${C.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.mouth || 'flat'];
  const es = o.eyeS || 1;
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s * (o.sx || 1)} ${s * (o.sy || 1)})">
    <ellipse cx="0" cy="0" rx="120" ry="22" fill="#000" opacity=".35"/>
    <rect x="-72" y="-240" width="56" height="230" rx="26" fill="${C.pjSh}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="16" y="-240" width="56" height="230" rx="26" fill="${C.pjSh}" stroke="${C.ol}" stroke-width="6"/>
    <ellipse cx="-50" cy="-8" rx="46" ry="22" fill="#c94f5d" stroke="${C.ol}" stroke-width="6"/><ellipse cx="50" cy="-8" rx="46" ry="22" fill="#c94f5d" stroke="${C.ol}" stroke-width="6"/>
    ${arm(aL, -1)}${arm(aR, 1)}
    <rect x="-104" y="-490" width="208" height="290" rx="64" fill="${C.pj}" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -40 -488 L 0 -440 L 40 -488" fill="none" stroke="${C.pjSh}" stroke-width="8"/>
    <circle cx="0" cy="-400" r="7" fill="#e8f6f8"/><circle cx="0" cy="-350" r="7" fill="#e8f6f8"/><circle cx="0" cy="-300" r="7" fill="#e8f6f8"/>
    <g transform="translate(0 ${o.headDy || 0}) rotate(${o.headTilt || 0} 0 -500)">
    <ellipse cx="-122" cy="-600" rx="22" ry="32" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/><ellipse cx="122" cy="-600" rx="22" ry="32" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="0" cy="-610" r="126" fill="${C.skin}" stroke="${C.ol}" stroke-width="7"/>
    <path d="M -126 -620 Q -132 -748 0 -748 Q 134 -748 126 -620 Q 110 -690 50 -690 Q 20 -660 -20 -680 Q -70 -650 -100 -690 Q -120 -660 -126 -620 Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="6"/>
    <ellipse cx="-46" cy="-612" rx="${26 * es}" ry="${32 * es}" fill="#fff" stroke="${C.ol}" stroke-width="5"/><ellipse cx="46" cy="-612" rx="${26 * es}" ry="${32 * es}" fill="#fff" stroke="${C.ol}" stroke-width="5"/>
    <circle cx="${-46 + lx}" cy="${-608 + ly}" r="12" fill="${C.ol}"/><circle cx="${46 + lx}" cy="${-608 + ly}" r="12" fill="${C.ol}"/>
    <path d="M -76 ${-664 - 10 * br} Q -46 ${-678 - 14 * br} -18 ${-660 - 6 * br} M 76 ${-664 - 10 * br} Q 46 ${-678 - 14 * br} 18 ${-660 - 6 * br}" stroke="${C.hair}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="-80" cy="-570" rx="18" ry="10" fill="#f19c86" opacity=".6"/><ellipse cx="80" cy="-570" rx="18" ry="10" fill="#f19c86" opacity=".6"/>
    ${M}</g>
  </g>`;
}

// Hallway in one-point perspective. Shared by several scenes.
const rwY = (x, v) => { const top = 470 - (x - 700) / 380 * 470, bot = 800 + (x - 700) / 380 * 620; return top + v * (bot - top); };
function hallway(t, o = {}) {
  const door = [[790, rwY(790, .2)], [930, rwY(930, .2)], [930, rwY(930, 1)], [790, rwY(790, 1)]];
  const dB = o.bulge || 0;
  const vase = o.vase === 'broken'
    ? `<g transform="translate(330 1300)"><path d="M -60 0 l 30 -26 l 24 22 Z" fill="#5fb3c9" stroke="${C.ol}" stroke-width="5"/><path d="M 10 6 l 34 -20 l 16 24 Z" fill="#5fb3c9" stroke="${C.ol}" stroke-width="5"/>
        <g transform="rotate(${8 * Math.sin(t * 9) * Math.exp(-Math.max(0, t - (o.brokenT || 0)) * .8)} 90 0)"><path d="M 60 0 a 40 30 0 0 1 60 -20 l 10 20 Z" fill="#5fb3c9" stroke="${C.ol}" stroke-width="5"/></g>
        <path d="M -20 -12 l 10 -14 l 8 12 Z" fill="#7cd0e3" stroke="${C.ol}" stroke-width="4"/><ellipse cx="20" cy="12" rx="120" ry="14" fill="#000" opacity=".25"/></g>`
    : `<g transform="rotate(${o.vaseRot || 0} 210 1000)"><path d="M 180 1000 Q 160 940 185 900 Q 175 870 190 850 L 230 850 Q 245 870 235 900 Q 260 940 240 1000 Z" fill="#5fb3c9" stroke="${C.ol}" stroke-width="6"/><path d="M 196 860 Q 186 920 196 990" stroke="#9fdcec" stroke-width="8" fill="none" opacity=".8"/></g>`;
  const lamp = o.lampOn ?? 0;
  return `
    <rect x="0" y="0" width="1080" height="1920" fill="#141c32"/>
    <polygon points="0,0 1080,0 700,470 380,470" fill="#121a2e"/>
    <polygon points="0,0 380,470 380,800 0,1420" fill="${C.wall}"/>
    <polygon points="1080,0 700,470 700,800 1080,1420" fill="#1a2744"/>
    <rect x="380" y="470" width="320" height="330" fill="#22325a"/>
    <rect x="470" y="540" width="140" height="110" fill="#3a3157" stroke="${C.ol}" stroke-width="6"/><circle cx="540" cy="595" r="30" fill="#5d4d86"/>
    <polygon points="380,800 700,800 1080,1420 1080,1920 0,1920 0,1420" fill="url(#gFloor)"/>
    <polygon points="480,812 600,812 780,1420 300,1420" fill="#7a2f3e" stroke="#5a1f2c" stroke-width="8"/>
    <line x1="540" y1="0" x2="540" y2="250" stroke="#0a0f1c" stroke-width="5"/>
    <path d="M 480 300 Q 540 220 600 300 Z" fill="#30406a" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="540" cy="306" r="16" fill="${lamp ? '#fff4c9' : '#55607e'}"/>
    ${lamp ? `<ellipse cx="540" cy="520" rx="${520 * lamp}" ry="${420 * lamp}" fill="${C.warm}" opacity=".12"/>` : ''}
    <g transform="translate(${860} ${700}) scale(${1 + .04 * dB} 1) translate(-860 -700)">
      <polygon points="${door.map(p => p.join(',')).join(' ')}" fill="url(#gDoor)" stroke="${C.ol}" stroke-width="6"/>
      <circle cx="${905}" cy="${rwY(905, .6)}" r="10" fill="#d8b25a" stroke="${C.ol}" stroke-width="4"/>
    </g>
    <polygon points="90,1010 330,1010 300,960 120,960" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="90" y="1010" width="240" height="230" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
    <rect x="115" y="1040" width="190" height="70" rx="6" fill="none" stroke="${C.woodSh}" stroke-width="6"/>
    <rect x="115" y="1130" width="190" height="70" rx="6" fill="none" stroke="${C.woodSh}" stroke-width="6"/>
    ${o.vase === 'none' ? '' : vase}
    ${o.dim ? `<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity="${o.dim}"/>` : ''}`;
}

// ---------- S5: hallway fills with ghosts (9.457 – 15.131) ----------
const CROWD = (() => {
  const L = [];
  const spec = [
    [540, 720, .36, 9.65, 'drop'], [455, 735, .34, 10.0, 'drop'], [625, 730, .35, 10.3, 'drop'],
    [300, 900, .55, 10.55, 'left'], [780, 900, .55, 10.8, 'right'], [540, 880, .5, 11.0, 'drop'],
    [420, 960, .6, 11.25, 'drop'], [660, 960, .6, 11.45, 'drop'],
    [160, 1120, .85, 11.7, 'left'], [930, 1120, .85, 11.9, 'right'], [400, 1180, .9, 12.1, 'drop'],
    [690, 1180, .9, 12.3, 'drop'], [540, 1060, .7, 12.5, 'drop'], [250, 1000, .65, 12.7, 'left'], [840, 1010, .65, 12.85, 'right'],
  ];
  spec.forEach(([x, y, s, t0, m], i) => L.push({ x, y, s, t0, m, i }));
  return L;
})();
function crowdLayer(t, o = {}) {
  let g = '';
  const crowd = prog(t, 12.6, 13.4);
  for (const c of CROWD) {
    if (t < c.t0) continue;
    const p = prog(t, c.t0, c.t0 + .4);
    let x = c.x, y = c.y;
    if (c.m === 'drop') y = lerp(-200, c.y, back(p, 1.2));
    if (c.m === 'left') x = lerp(-250, c.x, back(p));
    if (c.m === 'right') x = lerp(1330, c.x, back(p));
    const land = c.m === 'drop' ? Math.exp(-Math.max(0, t - c.t0 - .3) * 8) * Math.sin(Math.max(0, t - c.t0 - .3) * 30) : 0;
    const jost = o.freeze ? 1.5 * Math.sin(t * 40 + c.i) : crowd * 10 * Math.sin(t * 7 + c.i * 1.7);
    const look = o.lookAt !== undefined ? cl((o.lookAt - x) / 40, -12, 12) : 8 * Math.sin(t * 2 + c.i);
    g += ghostX(x + jost, y - 6 * Math.sin(t * 3 + c.i), c.s, {
      t: t + c.i, sx: (1 - .14 * crowd) * (1 - .15 * land), st: 1 + .15 * land, look,
      mouth: o.mouth || (crowd > .5 && c.i % 3 === 0 ? 'o' : c.i % 4 === 0 ? 'grin' : 'smile'),
      brows: o.brows || (crowd > .5 ? 'up' : 'calm'), aL: c.i % 5 === 0 ? 120 + 20 * Math.sin(t * 8) : 28, aR: -28, eyeS: o.eyeS || 1
    });
  }
  return g;
}
function sHallCrowd(t) {
  const crowd = prog(t, 12.6, 13.4);
  const press = back(prog(t, 13.75, 14.1));
  const squish = 1 + .18 * eout(prog(t, 14.05, 14.3));
  return hallway(t, { bulge: crowd * Math.abs(Math.sin(t * 6)) * 1.5 }) + crowdLayer(t) +
    (t > 13.7 ? `<g transform="translate(540 ${lerp(2300, 980, press)})">${ghostX(0, 0, 3.6, { t, sx: squish, st: 1 / squish, mouth: 'wavy', brows: 'up', look: 0, aL: 150, aR: -150 })}</g>
      <rect x="0" y="0" width="1080" height="1920" fill="#cfefff" opacity="${.06 * press}"/>` : '');
}

// ---------- S6: the ghost does the maths (15.131 – 16.5) ----------
function sCalc(t) {
  const l = t - 15.131;
  const tap = Math.max(0, Math.sin(l * 14)) * (l > .25 ? 1 : 0);
  const digits = l < .3 ? '0' : String(Math.floor(hash(Math.floor(l * 12)) * 9e8)).slice(0, 6 + Math.floor(l * 3) % 3);
  const calc = `<g transform="translate(-95 30) rotate(-6)"><rect x="0" y="0" width="190" height="250" rx="22" fill="#2b2f3d" stroke="${C.ol}" stroke-width="7"/>
     <rect x="18" y="18" width="154" height="62" rx="8" fill="#b8e6c7"/><text x="160" y="64" text-anchor="end" style="font-family:'Inter';font-weight:800;font-size:34px" fill="#1a3a26">${digits}</text>
     ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${22 + c * 52}" y="${98 + r * 48}" width="40" height="36" rx="8" fill="${r === 2 && c === 2 ? '#ff9a4d' : '#4b5266'}"/>`).join('')).join('')}</g>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="0" y="1250" width="1080" height="700" fill="url(#gFloor)"/>
    ${ghostX(540, 820 - 8 * Math.sin(t * 3), 2.1, { t, aL: 60, aR: -40 - 30 * tap, armsFront: true, look: 0, lookY: 14, mouth: 'flat', brows: 'calm', hold: calc })}`;
}

// ---------- S7: Earth and 117 billion (16.5 – 22.8) ----------
const ICONS = (() => { const a = []; for (let i = 0; i < 230; i++) { const r = 330 + (i % 5) * 46 + hash(i) * 20, an = i * 2.399; a.push([540 + r * Math.cos(an), 800 + r * Math.sin(an) * .92, hash(i + 7) < .075]); } return a; })();
function earth(t, cx, cy, r) {
  const rot = (t * 60) % 900;
  const land = [[0, -80, 140, 90], [220, 40, 110, 140], [420, -40, 160, 80], [640, 60, 120, 110], [100, 140, 90, 50]];
  let L = '';
  for (const k of [-900, 0, 900]) for (const [lx, ly, w, h] of land)
    L += `<ellipse cx="${cx - 450 + lx + rot + k}" cy="${cy + ly}" rx="${w}" ry="${h}" fill="#4caf7a" stroke="#2e7d55" stroke-width="6"/>`;
  return `<circle cx="${cx}" cy="${cy}" r="${r + 30}" fill="#5aa9ff" opacity=".18" filter="url(#blur20)"/>
    <clipPath id="ec"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <g clip-path="url(#ec)"><rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#2f6fd6"/>${L}
      <circle cx="${cx + r * .5}" cy="${cy + r * .1}" r="${r * 1.05}" fill="#000" opacity=".28"/></g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ol}" stroke-width="8"/>`;
}
function sEarth(t) {
  const n = Math.floor(ICONS.length * eio(prog(t, 16.5, 19.6)));
  const live = prog(t, 20.1, 20.7);
  let ic = '';
  ICONS.forEach(([x, y, lv], i) => {
    if (i >= n) return;
    const ap = back(cl((t - (16.5 + i / ICONS.length * 3.1)) / .2));
    const col = lv && live > 0 ? (hash(i) < live * .075 / .075 ? C.warm : '#8a93a8') : '#8a93a8';
    const pop = lv && live > 0 ? 1 + .4 * Math.sin(prog(t, 20.1, 20.5) * Math.PI) : 1;
    ic += `<g transform="translate(${x} ${y}) scale(${ap * pop})" opacity="${lv && live > 0 ? 1 : .8}"><circle cx="0" cy="-12" r="9" fill="${col}"/><rect x="-10" y="0" width="20" height="20" rx="9" fill="${col}"/></g>`;
  });
  const v = 117 * eio(prog(t, 16.5, 19.6));
  const v2 = 8 * eio(prog(t, 20.1, 21.2));
  const s2 = back(prog(t, 20.05, 20.35));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#070b16"/>${stars(90, 11)}
    ${earth(t * 1.6, 540, 800, 230)}<g transform="rotate(${(t - 16.5) * 5} 540 800)">${ic}</g>
    <text x="540" y="290" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:120px" fill="#c3cad8">${Math.round(v)} Mrd.</text>
    ${s2 > 0 ? `<g transform="translate(540 1330) scale(${s2})"><text x="0" y="0" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:96px" fill="${C.warm}">${Math.round(v2)} Mrd.</text></g>` : ''}`;
}

// ---------- S8: thirteen ghosts per person (22.8 – 25.992) ----------
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

// ---------- S9: castle (25.992 – 27.8) and German apartment block (27.8 – 29.286) ----------
function sCastle(t) {
  const fly = ein(prog(t, 27.35, 27.8));
  let back_ = '', front = '';
  for (let i = 0; i < 3; i++) {
    const a = t * 1.8 + i * 2.1;
    const x = 540 + 330 * Math.cos(a), y = 640 + 80 * Math.sin(a), s = .32 + .08 * Math.sin(a);
    const gx = ghostX(x, y, s, { t: t + i, aL: 100, aR: -100, mouth: 'o', brows: 'mean', look: -Math.sin(a) * 10 });
    if (Math.sin(a) < 0) back_ += gx; else front += gx;
  }
  const tower = (x, w, h) => `<rect x="${x}" y="${1150 - h}" width="${w}" height="${h}" fill="#4a5480" stroke="${C.ol}" stroke-width="6"/><rect x="${x + w - 18}" y="${1150 - h}" width="14" height="${h}" fill="${C.moon}" opacity=".35"/>
     ${[0, 1, 2, 3].map(k => `<rect x="${x + k * w / 4}" y="${1150 - h - 30}" width="${w / 8}" height="30" fill="#4a5480" stroke="${C.ol}" stroke-width="5"/>`).join('')}
     <rect x="${x + w / 2 - 14}" y="${1150 - h + 60}" width="28" height="44" rx="14" fill="${C.warm}" opacity=".85"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0b1124"/>${stars(70, 5)}
    <circle cx="760" cy="430" r="150" fill="url(#gMoon)"/><circle cx="760" cy="430" r="90" fill="${C.moon}"/>
    ${back_}
    ${tower(230, 140, 420)}${tower(700, 150, 380)}${tower(430, 220, 300)}
    <rect x="300" y="900" width="480" height="250" fill="#3e4670" stroke="${C.ol}" stroke-width="6"/>
    <path d="M 0 1150 Q 300 1080 540 1130 Q 800 1080 1080 1150 L 1080 1920 L 0 1920 Z" fill="#141a2e" stroke="${C.ol}" stroke-width="6"/>
    ${front}
    ${fly > 0 ? ghostX(lerp(700, 540, fly), lerp(700, 900, fly), lerp(.4, 11, fly), { t, mouth: 'o', brows: 'mean', aL: 120, aR: -120 }) : ''}`;
}
function sAltbau(t) {
  const reveal = prog(t, 27.8, 27.95);
  let win = '';
  const cols = [190, 400, 680, 890], rows = [480, 720, 960, 1200];
  let k = 0;
  for (const ry of rows) for (const cx of cols) {
    const t0 = 27.95 + hash(k + 3) * .9;
    const on = t > t0;
    const p = back(prog(t, t0, t0 + .25));
    win += `<rect x="${cx - 70}" y="${ry - 90}" width="140" height="180" rx="8" fill="${on ? '#ffcf7a' : '#1a2036'}" stroke="${C.ol}" stroke-width="6"/>
      <path d="M ${cx} ${ry - 90} V ${ry + 90} M ${cx - 70} ${ry - 20} H ${cx + 70}" stroke="${C.woodSh}" stroke-width="7"/>
      <rect x="${cx - 86}" y="${ry + 90}" width="172" height="16" fill="#b9a68a" stroke="${C.ol}" stroke-width="4"/>
      ${on ? `<g clip-path="url(#w${k})"><clipPath id="w${k}"><rect x="${cx - 70}" y="${ry - 90}" width="140" height="180"/></clipPath>${ghostX(cx + 10, ry + 60 - 40 * p, .42, { t: t + k, aL: 130 + 25 * Math.sin(t * 12 + k), mouth: 'grin' })}</g>` : ''}`;
    k++;
  }
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0d1328"/>${stars(40, 9)}
    <rect x="40" y="330" width="1000" height="1100" fill="#4a4361" stroke="${C.ol}" stroke-width="8"/>
    <rect x="20" y="300" width="1040" height="40" fill="#5a5274" stroke="${C.ol}" stroke-width="6"/>
    <polygon points="20,300 1060,300 960,180 120,180" fill="#2c2a3e" stroke="${C.ol}" stroke-width="6"/>
    ${[600, 840, 1080].map(y => `<rect x="40" y="${y - 22}" width="1000" height="12" fill="#5a5274"/>`).join('')}
    ${win}
    <rect x="0" y="1430" width="1080" height="500" fill="#151a2c"/>
    <rect x="0" y="0" width="1080" height="1920" fill="${C.ghost}" opacity="${1 - reveal}"/>`;
}

// ---------- S10: stop! three problems (29.286 – 32.9) ----------
function sStop(t) {
  const enter = eout(prog(t, 29.3, 29.75));
  const ant = prog(t, 29.75, 29.85), up = back(prog(t, 29.85, 30.1));
  const aL = lerp(12, -10, ant) * (1 - up) + 165 * up;
  const frozen = t > 30.05;
  const cards = [['floor', 31.0], ['eye', 31.3], ['sound', 31.6]];
  let cc = '';
  cards.forEach(([k, t0], i) => {
    const p = back(prog(t, t0, t0 + .3));
    if (p <= 0) return;
    const x = 240 + i * 300, y = 380 + 10 * Math.sin(t * 4 + i);
    let icon = '';
    if (k === 'floor') icon = `<rect x="-60" y="30" width="120" height="22" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="5"/><path d="M 0 -50 V 10 M -22 -12 L 0 12 L 22 -12" stroke="${C.red}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (k === 'eye') icon = `<path d="M -62 0 Q 0 -54 62 0 Q 0 54 -62 0 Z" fill="#fff" stroke="${C.ol}" stroke-width="6"/><circle cx="0" cy="0" r="22" fill="${C.accent || '#4aa8ff'}"/><circle cx="0" cy="0" r="10" fill="${C.ol}"/>`;
    if (k === 'sound') icon = `<path d="M -50 -18 h 22 l 28 -24 v 84 l -28 -24 h -22 Z" fill="#cfd5e2" stroke="${C.ol}" stroke-width="5"/><path d="M 16 -22 q 18 22 0 44 M 34 -40 q 34 40 0 80" stroke="#cfd5e2" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    cc += `<g transform="translate(${x} ${y}) scale(${p}) rotate(${(i - 1) * 6})"><rect x="-110" y="-100" width="220" height="200" rx="26" fill="#f4efe2" stroke="${C.ol}" stroke-width="7" filter="url(#drop)"/>${icon}
      <circle cx="80" cy="-80" r="28" fill="${C.red}" stroke="${C.ol}" stroke-width="5"/><text x="80" y="-68" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:36px" fill="#fff">${i + 1}</text></g>`;
  });
  return hallway(t) + crowdLayer(Math.max(t, 15), { freeze: frozen, lookAt: frozen ? 860 : undefined, mouth: frozen ? 'small' : undefined, brows: frozen ? 'up' : undefined, eyeS: frozen ? 1.15 : 1 }) +
    personF(lerp(1300, 850, enter), 1560, 1.0, { aL: aR_(aL), aR: -14, look: -14, brow: .4, mouth: 'flat', lean: lerp(8, 0, enter) - 4 * ant + 3 * up }) + cc;
}
function aR_(a) { return a; }

// ---------- S11: through the wall, stop, look down, fall through the floor (32.9 – 41.733) ----------
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

// ---------- S12: transparent ghost & light passing through its eyes (41.733 – 47.468) ----------
function photons(t, t0, t1, from, to, pass) {
  let s = '';
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  for (let k = 0; ; k++) {
    const te = t0 + k * .14;
    if (te > t1 || te > t) break;
    const d = (t - te) * 1300;
    if (d > len + 60) { // sparkle where it hits the wall
      const sp = (d - len - 60) / 300;
      if (sp < 1) s += `<circle cx="${to[0]}" cy="${to[1]}" r="${10 + 40 * sp}" fill="none" stroke="${C.warm}" stroke-width="${6 * (1 - sp)}"/>`;
      continue;
    }
    const f = Math.min(d, len) / len, fb = Math.max(0, d - 70) / len;
    const p = [lerp(from[0], to[0], f), lerp(from[1], to[1], f)], q = [lerp(from[0], to[0], fb), lerp(from[1], to[1], fb)];
    s += `<line x1="${q[0]}" y1="${q[1]}" x2="${p[0]}" y2="${p[1]}" stroke="${C.warm}" stroke-width="10" stroke-linecap="round" opacity=".5"/><circle cx="${p[0]}" cy="${p[1]}" r="10" fill="#fff6d0"/>`;
  }
  return s;
}
function sTransparent(t) {
  const al = lerp(1, .3, eio(prog(t, 41.9, 42.7)));
  const lookHands = t > 41.85 && t < 43.0;
  const arms = back(prog(t, 41.8, 42.1)) * (t < 42.9 ? 1 : 1 - eio(prog(t, 42.9, 43.2)));
  const stripes = Array.from({ length: 12 }, (_, i) => `<rect x="${i * 90}" y="0" width="45" height="1300" fill="#24345e"/>`).join('');
  const gx = 600, gy = 830, gs = 2.0;
  const eyeL = [gx - 38 * gs, gy - 20 * gs];
  const glass = t > 43.0;
  return `<rect x="0" y="0" width="1080" height="1300" fill="#1c2a4c"/>${stripes}
    <rect x="0" y="1300" width="1080" height="700" fill="url(#gFloor)"/>
    <g><rect x="80" y="620" width="40" height="160" rx="10" fill="${C.woodSh}"/><path d="M 60 600 L 180 600 L 150 680 L 90 680 Z" fill="#f4d58d" stroke="${C.ol}" stroke-width="6"/>
      <circle cx="120" cy="700" r="140" fill="${C.warm}" opacity=".18" filter="url(#blur20)"/></g>
    ${ghostX(gx, gy - 8 * Math.sin(t * 2.5), gs, { t, alpha: al, aL: 28 + 100 * arms, aR: -28 - 100 * arms, look: lookHands ? 0 : 0, lookY: lookHands ? -6 : 0, mouth: lookHands ? 'o' : 'flat', brows: lookHands ? 'up' : 'calm', eyes: glass ? 'glass' : 'n' })}
    ${glass ? photons(t, 43.1, 47.3, [150, 700], [1080, 700 + (eyeL[1] - 700) / (eyeL[0] - 150) * 930], 1) : ''}`;
}
// ---------- S13: blind ghost bumps into the lamp (47.468 – 49.6), then the hallway noise (49.6 – 51.312) ----------
function sBlind(t) {
  const x = lerp(640, 300, eio(prog(t, 47.6, 48.9)));
  const bump = t > 48.9 ? ring(t, 48.9, 2.2, 3.5) : 0;
  const recoil = t > 48.9 ? 30 * Math.exp(-(t - 48.9) * 5) : 0;
  const grope = Math.sin(t * 9);
  const stripes = Array.from({ length: 12 }, (_, i) => `<rect x="${i * 90}" y="0" width="45" height="1300" fill="#24345e"/>`).join('');
  let noise = '';
  for (let i = 0; i < 70; i++) { const h = hash(i + Math.floor(t * 30) * 13); noise += `<rect x="${640 + (i % 10) * 34}" y="${180 + Math.floor(i / 10) * 30}" width="34" height="30" fill="#fff" opacity="${h * .25}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1300" fill="#1c2a4c"/>${stripes}
    <rect x="0" y="1300" width="1080" height="700" fill="url(#gFloor)"/>
    <g transform="rotate(${18 * bump} 120 520)"><line x1="120" y1="380" x2="120" y2="620" stroke="${C.ol}" stroke-width="6"/><path d="M 60 600 L 180 600 L 150 680 L 90 680 Z" fill="#f4d58d" stroke="${C.ol}" stroke-width="6"/></g>
    ${ghostX(x + recoil, 860 - 8 * Math.sin(t * 2.5), 1.6, { t, alpha: .35, aL: 70 + 25 * grope, aR: -70 + 25 * grope, eyes: 'glass', mouth: t > 48.9 ? 'o' : 'wavy', brows: 'up', tilt: -6 * bump })}
    <g><rect x="620" y="160" width="380" height="250" rx="24" fill="#05070c" stroke="#e9f0ff" stroke-width="10"/>${noise}
      <path d="M 700 470 q 30 -30 60 -10" stroke="#e9f0ff" stroke-width="8" fill="none"/></g>`;
}
function sHallSound(t) {
  const w = ring(t, 49.75, 3, 1.2) + ring(t, 50.55, 3, 2);
  let rings = '';
  for (let k = 0; k < 6; k++) { const s0 = k < 3 ? 49.75 + k * .12 : 50.55 + (k - 3) * .12; const p = prog(t, s0, s0 + .85); if (p > 0 && p < 1) rings += `<circle cx="210" cy="920" r="${40 + 260 * p}" fill="none" stroke="${C.warm}" stroke-width="${8 * (1 - p)}" opacity="${.6 * (1 - p)}"/>`; }
  const sh = t < 50.2 ? 6 * Math.exp(-(t - 49.75) * 6) * Math.sin(t * 90) : 0;
  return `<g transform="translate(${sh} 0)">${hallway(t, { vaseRot: 9 * w })}${rings}</g>`;
}

// ---------- S14: force & whisper (51.312 – 57.718) ----------
function sVase(t) {
  const gx = lerp(-250, 300, eout(prog(t, 51.35, 51.85)));
  const swipe = eio(prog(t, 51.9, 52.25));
  const puzzled = t > 52.35;
  const arrowP = back(prog(t, 52.8, 53.25));
  const tip = eio(prog(t, 53.3, 53.9));
  const fall = ein(prog(t, 53.9, 54.5));
  const vx = 600 + fall * 120, vy = 1000 + fall * 900;
  const vr = tip * 92 + fall * 60;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="0" y="1360" width="1080" height="600" fill="url(#gFloor)"/>
    <rect x="120" y="1000" width="860" height="40" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="7"/>
    <rect x="150" y="1040" width="800" height="320" fill="${C.wood}" stroke="${C.ol}" stroke-width="7"/>
    <rect x="190" y="1080" width="340" height="230" rx="8" fill="none" stroke="${C.woodSh}" stroke-width="8"/><rect x="570" y="1080" width="340" height="230" rx="8" fill="none" stroke="${C.woodSh}" stroke-width="8"/>
    ${ghostX(gx, 780 - 8 * Math.sin(t * 3), 1.4, { t, aR: -28 - 110 * Math.sin(swipe * Math.PI), aL: puzzled && t < 52.8 ? 80 : 28, look: puzzled ? (t < 52.8 ? 14 : 18) : 10, lookY: puzzled && t < 52.8 ? 12 : 4, mouth: puzzled ? (t > 53.9 ? 'o' : 'flat') : 'grin', brows: puzzled ? 'up' : 'mean', tilt: puzzled && t < 52.8 ? 8 : 0 })}
    ${t > 51.9 && t < 52.4 ? `<path d="M 470 820 Q 560 900 520 1000" stroke="#e9f0ff" stroke-width="8" fill="none" opacity="${1 - swipe * .7}" stroke-linecap="round"/>` : ''}
    <g transform="translate(${vx} ${vy}) rotate(${vr} 70 0)">
      <path d="M -60 0 Q -90 -120 -45 -200 Q -60 -250 -30 -290 L 30 -290 Q 60 -250 45 -200 Q 90 -120 60 0 Z" fill="#5fb3c9" stroke="${C.ol}" stroke-width="7"/>
      <path d="M -30 -270 Q -60 -150 -34 -20" stroke="#9fdcec" stroke-width="10" fill="none" opacity=".8"/></g>
    ${arrowP > 0 && fall < .3 ? `<g transform="translate(${470 - 40 * (1 - arrowP)} 880) scale(${arrowP} 1)"><path d="M -330 -30 H -60 V -70 L 0 0 L -60 70 V 30 H -330 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/></g>` : ''}`;
}
function sWhisper(t) {
  const amp = 16 * eio(prog(t, 55.0, 55.8));
  let dots = '';
  for (let c = 0; c < 15; c++) for (let r = 0; r < 7; r++) {
    const x0 = 360 + c * 28, y0 = 640 + r * 42;
    const dx = amp * Math.sin(c * .9 - t * 11);
    dots += `<circle cx="${x0 + dx}" cy="${y0}" r="8" fill="#9fd4ff" opacity=".85"/>`;
  }
  const shiver = t > 56.4 ? 4 * Math.sin(t * 70) * Math.exp(-(t - 56.4) * 2) : 0;
  const ear = t > 56.4 ? 6 * Math.sin(t * 40) * Math.exp(-(t - 56.4) * 3) : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <path d="M 640 1020 Q 640 860 900 860 L 1100 860 L 1100 1100 L 640 1100 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="7"/>
    <g transform="translate(${shiver} 0)">
      <circle cx="900" cy="760" r="170" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
      <path d="M 760 700 Q 780 560 920 580 Q 1080 600 1070 760 Q 1000 660 900 680 Q 820 660 760 700 Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="7"/>
      <g transform="rotate(${ear} 760 770)"><ellipse cx="752" cy="770" rx="34" ry="52" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/><path d="M 748 748 q -12 22 0 44" stroke="${C.ol}" stroke-width="5" fill="none"/></g>
      <path d="M 820 820 q 20 12 40 0" stroke="${C.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M 560 1060 Q 800 980 1100 1040 L 1100 1960 L 560 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="7"/>
    ${ghostX(200, 780 - 6 * Math.sin(t * 3), 1.15, { t, aR: -150, aL: 28, look: 14, mouth: 'small', brows: 'mean', tilt: 10 })}
    ${dots}`;
}

// ---------- S15: no interaction vs slamming doors / moving furniture (57.718 – 65.528) ----------
function sTests(t) {
  let x, y = 960, o = { t, brows: 'calm', mouth: 'smile' }, tilt = 0;
  if (t < 60.2) { x = lerp(1050, 330, eio(prog(t, 57.72, 60.1))); o.look = -14; }
  else if (t < 62.6) {
    x = 330; const wind = eout(prog(t, 60.3, 60.7)), swing = ein(prog(t, 60.7, 60.95));
    o.aL = 28 + 60 * wind - 200 * swing + (t > 61 ? 0 : 0); o.look = -16; o.brows = 'mean'; o.mouth = 'grin';
    if (t > 61.2) { o.aL = 70; o.look = -14; o.lookY = 8; o.brows = 'up'; o.mouth = 'flat'; tilt = -8; }
  } else {
    x = lerp(330, 560, eio(prog(t, 62.6, 63.2)));
    const push = eout(prog(t, 63.2, 63.6)), fall = ein(prog(t, 63.9, 64.4));
    o.aR = -28 - 60 * push; o.look = 16; o.brows = 'mean'; o.mouth = 'flat';
    x += 60 * push + 220 * fall; y += 300 * fall; tilt = 75 * fall;
    if (t > 64.4) { o.eyes = 'x'; o.mouth = 'wavy'; tilt = 75; }
  }
  const doorWhiff = t > 60.75 && t < 61.2 ? `<path d="M 250 700 Q 180 820 230 960" stroke="#e9f0ff" stroke-width="10" fill="none" opacity=".8" stroke-linecap="round"/>` : '';
  let starsD = '';
  if (t > 64.5) for (let i = 0; i < 4; i++) { const a = t * 5 + i * Math.PI / 2; starsD += `<path transform="translate(${x + 40 + 90 * Math.cos(a)} ${y - 120 + 30 * Math.sin(a)}) scale(.9)" d="M 0 -20 L 6 -6 L 20 0 L 6 6 L 0 20 L -6 6 L -20 0 L -6 -6 Z" fill="${C.warm}"/>`; }
  const chair = `<g><rect x="700" y="740" width="30" height="510" rx="10" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="700" y="740" width="230" height="40" rx="12" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="700" y="1030" width="260" height="40" rx="10" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="6"/>
      <rect x="930" y="1070" width="26" height="180" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/><rect x="706" y="1070" width="26" height="180" fill="${C.wood}" stroke="${C.ol}" stroke-width="6"/></g>`;
  return `<rect x="0" y="0" width="1080" height="1250" fill="url(#gWall)"/>
    <rect x="0" y="1250" width="1080" height="700" fill="url(#gFloor)"/>
    <rect x="80" y="420" width="300" height="840" fill="${C.dark}" stroke="${C.woodSh}" stroke-width="18"/>
    <polygon points="80,420 250,470 250,1220 80,1260" fill="url(#gDoor)" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="225" cy="860" r="12" fill="#d8b25a" stroke="${C.ol}" stroke-width="4"/>
    ${ghostX(x, y - 8 * Math.sin(t * 3), 1.0, { ...o, tilt })}
    <g opacity="${t < 62.6 ? .88 : .92}">${chair}</g>
    ${doorWhiff}${starsD}`;
}

// ---------- S16: mechanism (65.528 – 68.823) ----------
function gear(cx, cy, r, n, a, col) {
  let d = '';
  for (let i = 0; i < n; i++) { const an = a + i * 2 * Math.PI / n; d += `<rect x="${-10}" y="${-r - 16}" width="20" height="26" fill="${col}" transform="translate(${cx} ${cy}) rotate(${an * 180 / Math.PI})"/>`; }
  return `${d}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/><circle cx="${cx}" cy="${cy}" r="${r * .35}" fill="#123a6b"/>`;
}
function sMech(t) {
  const jam = t > 67.6;
  const sp = jam ? 0 : t * 2.2;
  const shake = jam ? 6 * Math.sin(t * 60) * Math.exp(-(t - 67.6) * 4) : 0;
  const drop = t < 67.0 ? lerp(-200, 980, eio(prog(t, 66.4, 67.0))) : 980 - 140 * Math.sin(prog(t, 67.0, 67.4) * Math.PI) + 900 * ein(prog(t, 67.4, 68.3));
  const dx = t < 67.0 ? 0 : 260 * prog(t, 67.0, 68.3);
  let grid = '';
  for (let i = 0; i <= 18; i++) grid += `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="1920" stroke="#2c5a92" stroke-width="2"/><line x1="0" y1="${i * 60 * 1.78}" x2="1080" y2="${i * 60 * 1.78}" stroke="#2c5a92" stroke-width="2"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#123a6b"/>${grid}
    <g transform="translate(${shake} 0)">
    <g transform="translate(540 860) scale(3.2)"><path d="${ghostPath(t)}" fill="none" stroke="#e9f0ff" stroke-width="3.5" stroke-dasharray="10 6"/></g>
    <rect x="300" y="760" width="480" height="380" rx="20" fill="#0e2f58" stroke="#e9f0ff" stroke-width="6"/>
    ${gear(420, 880, 60, 10, sp, '#9cc3f0')}${gear(530, 990, 50, 8, -sp * 1.2 + .3, '#c9dcf5')}
    <circle cx="670" cy="900" r="68" fill="none" stroke="#ffd27a" stroke-width="6" stroke-dasharray="14 10"/>
    <text x="670" y="935" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:96px" fill="#ffd27a">?</text>
    ${gear(670 + dx, drop, 95, 14, t * 3, '#ffb36b')}
    </g>`;
}

// ---------- S17: the familiar picture cracks (68.823 – 74.68) ----------
function sPortrait(t) {
  const hits = [[69.4, 430, 700, 'floor', [-200, 1700]], [70.8, 650, 900, 'eye', [1300, 300]], [72.2, 520, 1080, 'sound', [-200, 400]]];
  let fly = '', cracks = '';
  hits.forEach(([th, hx, hy, k, from], i) => {
    const p = prog(t, th - .45, th);
    const icon = k === 'floor' ? `<rect x="-50" y="22" width="100" height="18" fill="${C.woodHi}" stroke="${C.ol}" stroke-width="5"/><path d="M 0 -40 V 8 M -18 -10 L 0 10 L 18 -10" stroke="${C.red}" stroke-width="9" fill="none" stroke-linecap="round"/>`
      : k === 'eye' ? `<path d="M -52 0 Q 0 -46 52 0 Q 0 46 -52 0 Z" fill="#fff" stroke="${C.ol}" stroke-width="5"/><circle r="16" fill="${C.ol}"/>`
      : `<path d="M -40 -14 h 18 l 24 -20 v 68 l -24 -20 h -18 Z" fill="#cfd5e2" stroke="${C.ol}" stroke-width="5"/><path d="M 14 -18 q 16 18 0 36" stroke="#cfd5e2" stroke-width="6" fill="none"/>`;
    if (p > 0 && p < 1) fly += `<g transform="translate(${lerp(from[0], hx, ein(p))} ${lerp(from[1], hy, ein(p))}) rotate(${p * 360})"><circle r="70" fill="#f4efe2" stroke="${C.ol}" stroke-width="6"/>${icon}</g>`;
    if (t >= th) {
      const g = eout(prog(t, th, th + .2));
      for (let j = 0; j < 7; j++) { const a = j * 0.9 + i; let L = 120 + 120 * hash(j + i * 10); cracks += `<path d="M ${hx} ${hy} L ${hx + Math.cos(a) * L * .5 * g + 20 * hash(j)} ${hy + Math.sin(a) * L * .5 * g} L ${hx + Math.cos(a + .2) * L * g} ${hy + Math.sin(a + .2) * L * g}" stroke="#e9f6ff" stroke-width="5" fill="none"/>`; }
      const ring_ = prog(t, th, th + .3); if (ring_ < 1) cracks += `<circle cx="${hx}" cy="${hy}" r="${30 + 120 * ring_}" fill="none" stroke="#fff" stroke-width="${8 * (1 - ring_)}"/>`;
    }
  });
  const sh = prog(t, 73.3, 74.6);
  let shards = '';
  if (sh > 0) for (let i = 0; i < 18; i++) {
    const sx = 280 + (i % 6) * 100, sy = 520 + Math.floor(i / 6) * 220, vx = (hash(i) - .5) * 600, vy0 = -300 * hash(i + 3);
    const tt = (t - 73.3);
    shards += `<polygon points="0,-40 34,30 -30,26" fill="#cfefff" fill-opacity=".35" stroke="#e9f6ff" stroke-width="4" transform="translate(${sx + vx * tt} ${sy + vy0 * tt + 1400 * tt * tt}) rotate(${tt * 400 * (hash(i) - .5)})"/>`;
  }
  const shocked = t > 73.3;
  const hitF = hits.reduce((m, h) => Math.max(m, t >= h[0] ? Math.exp(-(t - h[0]) * 4) : 0), 0);
  const swing = hits.reduce((m, h) => m + (t >= h[0] ? 4 * Math.exp(-(t - h[0]) * 1.5) * Math.sin((t - h[0]) * 9) : 0), 0);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <g transform="rotate(${swing} 540 380)"><line x1="540" y1="380" x2="300" y2="405" stroke="#000" stroke-width="4"/><line x1="540" y1="380" x2="780" y2="405" stroke="#000" stroke-width="4"/>
    <rect x="200" y="400" width="680" height="880" rx="16" fill="#c99a3a" stroke="${C.ol}" stroke-width="8" filter="url(#drop)"/>
    <rect x="240" y="440" width="600" height="800" fill="#2a2440"/>
    <rect x="240" y="1000" width="600" height="240" fill="#1d1a30"/>
    ${ghostX(540, 820 - 6 * Math.sin(t * 3), 1.6, { t, sx: 1 - .08 * hitF, st: 1 + .08 * hitF, lookY: -6 * hitF, mouth: shocked ? 'o' : 'smile', brows: shocked ? 'up' : 'calm', aL: shocked ? 140 : 28, aR: shocked ? -140 : -28 })}
    ${sh <= 0 ? `<rect x="240" y="440" width="600" height="800" fill="#cfefff" opacity=".08"/>${cracks}` : ''}
    </g>${shards}${fly}`;
}

// ---------- S18: case board (74.68 – 78.646) ----------
function sBoard(t) {
  const pics = ['house', 'steps', 'candle', 'door', 'mirror', 'shadow', 'wave', 'eye', 'moon'];
  const unsolved = [4, 7];
  let cards = '', strings = '';
  const pos = i => [210 + (i % 3) * 330, 420 + Math.floor(i / 3) * 360];
  [[0, 4], [4, 8], [2, 4], [6, 4], [1, 5]].forEach(([a, b]) => { const [x1, y1] = pos(a), [x2, y2] = pos(b); strings += `<path d="M ${x1} ${y1 - 120} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 40} ${x2} ${y2 - 120}" stroke="#c0392b" stroke-width="5" fill="none"/>`; });
  let order = 0;
  pics.forEach((k, i) => {
    const [x, y] = pos(i);
    const ic = {
      house: `<path d="M -50 30 V -10 L 0 -50 L 50 -10 V 30 Z" fill="#7d8aa8"/>`, steps: `<ellipse cx="-20" cy="10" rx="12" ry="20" fill="#7d8aa8"/><ellipse cx="20" cy="-20" rx="12" ry="20" fill="#7d8aa8"/>`,
      candle: `<rect x="-14" y="-10" width="28" height="50" fill="#e8dcc0" stroke="#7d8aa8" stroke-width="4"/><path d="M 0 -40 q 14 16 0 26 q -14 -10 0 -26" fill="#ffb347"/>`,
      door: `<rect x="-30" y="-46" width="60" height="90" fill="#9b6b4a"/>`, mirror: `<ellipse rx="34" ry="46" fill="#b8d8e8" stroke="#7d8aa8" stroke-width="6"/>`,
      shadow: `<circle cy="-24" r="18" fill="#3a3f55"/><rect x="-22" y="-4" width="44" height="50" rx="18" fill="#3a3f55"/>`, wave: `<path d="M -50 0 q 12 -24 25 0 t 25 0 t 25 0 t 25 0" stroke="#7d8aa8" stroke-width="7" fill="none"/>`,
      eye: `<path d="M -46 0 Q 0 -36 46 0 Q 0 36 -46 0 Z" fill="#fff" stroke="#7d8aa8" stroke-width="5"/><circle r="12" fill="#3a3f55"/>`, moon: `<circle r="34" fill="#e8e0b8"/><circle cx="16" cy="-10" r="30" fill="#f4efe2"/>`
    }[k];
    let stamp = '';
    if (!unsolved.includes(i)) {
      const t0 = 74.8 + order * .3; order++;
      const p = prog(t, t0, t0 + .15);
      if (p > 0) stamp = `<g transform="translate(60 50) scale(${lerp(1.8, 1, eout(p))}) rotate(-12)" opacity="${p}"><circle r="40" fill="none" stroke="#27ae60" stroke-width="8"/><path d="M -18 0 L -4 14 L 20 -14" stroke="#27ae60" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
    } else if (t > 77.0) {
      const pu = 1 + .12 * Math.sin(t * 10);
      stamp = `<circle cx="0" cy="0" r="${110 * pu}" fill="${C.warm}" opacity=".18"/><text x="60" y="80" text-anchor="middle" transform="scale(${back(prog(t, 77.0, 77.25))})" transform-origin="60 60" style="font-family:'Inter';font-weight:900;font-size:90px" fill="${C.warm}" stroke="${C.ol}" stroke-width="6" paint-order="stroke">?</text>`;
    }
    cards += `<g transform="translate(${x} ${y}) rotate(${(hash(i) - .5) * 8 + 2.5 * Math.sin(t * 2.2 + i)})"><rect x="-120" y="-130" width="240" height="250" fill="#f4efe2" stroke="${C.ol}" stroke-width="5" filter="url(#drop)"/>
      <circle cx="0" cy="-118" r="12" fill="${C.red}" stroke="${C.ol}" stroke-width="4"/>${ic}${stamp}</g>`;
  });
  const mp = eio(prog(t, 77.3, 78.6));
  const [mx1, my1] = pos(4), [mx2, my2] = pos(7);
  const mx = lerp(mx1, mx2, mp), my = lerp(my1, my2, mp);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="40" y="220" width="1000" height="1180" rx="14" fill="#a87c52" stroke="${C.ol}" stroke-width="10"/>
    ${Array.from({ length: 140 }, (_, i) => `<circle cx="${60 + hash(i) * 960}" cy="${240 + hash(i + 50) * 1140}" r="3" fill="#8a6440"/>`).join('')}
    ${strings}${cards}
    ${t > 77.25 ? `<g transform="translate(${mx + 40} ${my + 40})"><line x1="70" y1="70" x2="150" y2="150" stroke="#2b2f3d" stroke-width="28" stroke-linecap="round"/><circle r="100" fill="#cfefff" fill-opacity=".2" stroke="#c9d2e6" stroke-width="14"/></g>` : ''}`;
}

// ---------- S19: the scale (78.646 – 81.6) ----------
function sScale(t) {
  const qd = prog(t, 78.75, 79.15);
  const qy = t < 79.15 ? lerp(-200, 905, ein(qd)) : 905;
  const tiltA = (t < 79.15 ? 0 : -14 * (1 - Math.exp(-(t - 79.15) * 6) * Math.cos((t - 79.15) * 14))) + .8 * Math.sin(t * 2.5);
  const a = tiltA * Math.PI / 180;
  const Lx = 540 - 300 * Math.cos(a), Ly = 700 - 300 * Math.sin(a), Rx = 540 + 300 * Math.cos(a), Ry = 700 + 300 * Math.sin(a);
  const gArr = eout(prog(t, 79.6, 80.2));
  const gThrough = ein(prog(t, 80.3, 80.9));
  const gy = (t < 80.3 ? lerp(300, Ry + 140, gArr) : Ry + 140 + 280 * gThrough) - (t > 80.9 ? 14 * Math.sin((t - 80.9) * 5) : 0);
  const gx = lerp(1250, Rx, gArr);
  const shrug = t > 80.9 ? 1 : 0;
  const pan = (x, y) => `<line x1="${x}" y1="${y}" x2="${x - 120}" y2="${y + 200}" stroke="#c9d2e6" stroke-width="5"/><line x1="${x}" y1="${y}" x2="${x + 120}" y2="${y + 200}" stroke="#c9d2e6" stroke-width="5"/>
     <path d="M ${x - 150} ${y + 200} Q ${x} ${y + 260} ${x + 150} ${y + 200} Z" fill="#d8b25a" stroke="${C.ol}" stroke-width="6"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="0" y="1300" width="1080" height="700" fill="url(#gFloor)"/>
    <rect x="510" y="700" width="60" height="560" fill="#b8913e" stroke="${C.ol}" stroke-width="6"/>
    <path d="M 400 1300 Q 540 1220 680 1300 Z" fill="#b8913e" stroke="${C.ol}" stroke-width="6"/>
    ${ghostX(gx, gy, .75, { t, mouth: shrug ? 'flat' : 'smile', aL: shrug ? 120 : 28, aR: shrug ? -120 : -28, brows: shrug ? 'up' : 'calm', look: shrug ? -10 : -6 })}
    <line x1="${Lx}" y1="${Ly}" x2="${Rx}" y2="${Ry}" stroke="#d8b25a" stroke-width="22" stroke-linecap="round"/>
    <circle cx="540" cy="700" r="26" fill="#d8b25a" stroke="${C.ol}" stroke-width="6"/>
    ${pan(Lx, Ly)}${pan(Rx, Ry)}
    <g transform="translate(${Lx} ${t < 79.15 ? qy : Ly + 205})"><rect x="-70" y="-130" width="140" height="130" rx="18" fill="#f4efe2" stroke="${C.ol}" stroke-width="7"/>
      <text x="0" y="-28" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:110px" fill="${C.ol}">?</text></g>`;
}

// ---------- S20: lights on, the noise was real (81.6 – 84.503) ----------
function sHallReal(t) {
  const on = t > 81.85 && !(t > 81.95 && t < 82.02);
  const peek = back(prog(t, 82.6, 83.0));
  const relief = t > 83.6;
  const nod = t > 83.1 ? 14 * Math.sin(prog(t, 83.1, 84.4) * Math.PI * 2) : 0;
  const head = `<g transform="translate(${lerp(990, 900, peek)} ${760 + 10 * Math.sin(prog(t, 83.1, 83.5) * Math.PI)}) rotate(${-8 + nod})">
      <circle r="70" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/>
      <path d="M -70 -10 Q -70 -84 0 -84 Q 70 -84 70 -10 Q 40 -50 0 -46 Q -40 -50 -70 -10 Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="5"/>
      <ellipse cx="-24" cy="0" rx="12" ry="${relief ? 6 : 15}" fill="#fff" stroke="${C.ol}" stroke-width="4"/><ellipse cx="20" cy="0" rx="12" ry="${relief ? 6 : 15}" fill="#fff" stroke="${C.ol}" stroke-width="4"/>
      <circle cx="-30" cy="${relief ? 1 : 4}" r="6" fill="${C.ol}"/><circle cx="14" cy="${relief ? 1 : 4}" r="6" fill="${C.ol}"/>
      ${relief ? `<path d="M -18 36 Q 0 46 18 36" stroke="${C.ol}" stroke-width="5" fill="none"/>` : `<ellipse cx="-4" cy="38" rx="8" ry="10" fill="${C.ol}"/>`}</g>
    ${hand(lerp(1010, 930, peek) - (t > 83.6 ? 40 : 0), t > 83.6 ? 690 + 14 * Math.sin(t * 20) : 900, .8, t > 83.6 ? -150 : -80)}`;
  return hallway(t, { vase: 'broken', brokenT: 81.6, lampOn: on ? 1 : 0, dim: on ? 0 : .45 }) + head;
}

// ---------- S21: the 13 guests remain an assumption (84.503 – 88) ----------
function sEnd(t) {
  let g = '';
  for (let i = 0; i < 13; i++) {
    const an = -Math.PI + i / 12 * Math.PI;
    const x = 540 + 440 * Math.cos(an), y = 780 + 420 * Math.sin(an);
    const t0 = 84.55 + i * .14;
    const d = 1 - eio(prog(t, t0, t0 + .3));
    if (d <= 0) { const pp = prog(t, t0 + .3, t0 + .6); if (pp < 1) g += `<circle cx="${x}" cy="${y}" r="${20 + 50 * pp}" fill="none" stroke="${C.ghost}" stroke-width="${5 * (1 - pp)}"/>`; continue; }
    g += ghost(x, y, .38, { t: t + i, draw: d, eyes: d });
  }
  const relax = eio(prog(t, 86.4, 87.0));
  const off = t > 87.35;
  const by = 1000 + 70 * relax;
  const lid = relax;
  const eye = ex => `<ellipse cx="${ex}" cy="760" rx="66" ry="${76 * (1 - .55 * lid)}" fill="#fff" stroke="${C.ol}" stroke-width="7"/><circle cx="${ex}" cy="${772}" r="${20}" fill="${C.ol}"/>
     <path d="M ${ex - 70} ${760 - 76 * (1 - .55 * lid)} Q ${ex} ${700} ${ex + 70} ${760 - 76 * (1 - .55 * lid)}" fill="${C.skin}" stroke="${C.ol}" stroke-width="6" opacity="${lid}"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/>
    <rect x="70" y="280" width="940" height="560" rx="60" fill="${C.wood}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 60 760 Q 120 560 540 570 Q 960 560 1020 760 Q 1040 1000 900 1100 L 180 1100 Q 40 1000 60 760 Z" fill="${C.pillow}" stroke="${C.ol}" stroke-width="8"/>
    <ellipse cx="290" cy="790" rx="34" ry="52" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/><ellipse cx="790" cy="790" rx="34" ry="52" fill="${C.skinSh}" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="540" cy="800" r="255" fill="${C.skin}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M 290 760 Q 270 520 540 520 Q 820 520 790 760 Q 760 640 650 620 Q 600 680 520 650 Q 420 690 360 640 Q 300 680 290 760 Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="7"/>
    ${eye(450)}${eye(630)}
    <path d="M 470 ${930} Q 540 ${930 + 30 * relax} 610 930" stroke="${C.ol}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${relax}"/>
    <path d="M -30 1960 L -30 ${by + 40} Q 260 ${by - 20} 540 ${by} Q 820 ${by - 20} 1110 ${by + 40} L 1110 1960 Z" fill="url(#gBlank)" stroke="${C.ol}" stroke-width="8"/>
    ${hand(430, by + 8, 1.15, -6)}${hand(650, by + 8, 1.15, 6)}
    ${g}
    ${off ? `<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity="${t > 87.42 ? .97 : .7}"/>` : ''}`;
}

// ---------- router ----------
const SCENES = [
  [0, 5.3, shot1], [5.3, 6.45, shot2], [6.45, 9.457, shot3],
  [9.457, 15.131, sHallCrowd], [15.131, 16.5, sCalc], [16.5, 22.8, sEarth], [22.8, 25.992, sThirteen],
  [25.992, 27.8, sCastle], [27.8, 29.286, sAltbau], [29.286, 32.9, sStop], [32.9, 41.733, sWall],
  [41.733, 47.468, sTransparent], [47.468, 49.6, sBlind], [49.6, 51.312, sHallSound],
  [51.312, 54.6, sVase], [54.6, 57.718, sWhisper], [57.718, 65.528, sTests], [65.528, 68.823, sMech],
  [68.823, 74.68, sPortrait], [74.68, 78.646, sBoard], [78.646, 81.6, sScale], [81.6, 84.503, sHallReal], [84.503, 99, sEnd],
];
function stars(n = 40, seed = 3) { let s = '', r = seed; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280 }; for (let i = 0; i < n; i++) s += `<circle cx="${rnd() * 1080}" cy="${rnd() * 1300}" r="${1 + rnd() * 2.5}" fill="#fff" opacity="${.3 + .3 * Math.sin(i)}"/>`; return s }

function dust(t) { let d = ''; for (let i = 0; i < 26; i++) { const x = (hash(i) * 1080 + t * (12 + 20 * hash(i + 1))) % 1080, y = (hash(i + 9) * 1400 + 60 * Math.sin(t * .7 + i)) ; d += `<circle cx="${x}" cy="${y}" r="${2 + 3 * hash(i + 4)}" fill="#cfe0ff" opacity="${.12 + .12 * Math.sin(t * 2 + i)}"/>`; } return d; }

export const FPS_ = FPS;
export const DURATION_S = END_T;
export function renderSvg(t) {
  const sc = SCENES.find(([a, b]) => t >= a && t < b) || SCENES[SCENES.length - 1];
  return DEFS + sc[2](t) + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) {
  const s = SUBS_ALL.find(([a, b]) => t >= a && t < b) || SUBS_ALL[SUBS_ALL.length - 1];
  return s[2];
}
