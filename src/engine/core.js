// @ts-nocheck
// Shared 2D engine: palette, easing/timing helpers, SVG defs, characters and sets.
// Every function is pure: same inputs -> same SVG string. Generated videos import from here.

const C = {
  ol: '#0a0f1c', skin: '#f3c39c', skinSh: '#d89c74', hair: '#3b2720', hairHi: '#6a4636',
  pj: '#2f9fac', pjSh: '#227781', blank: '#3f66c8', blankHi: '#6b93ee', blankSh: '#2b4796',
  pillow: '#e2e9f7', pillowSh: '#a9b7d4', wood: '#8d5b3c', woodHi: '#ad7650', woodSh: '#5c3a26',
  wall: '#1d2b4a', wallFar: '#172440', floor: '#241f38', moon: '#d8e6ff', warm: '#ffd27a',
  red: '#ff5468', ghost: '#effffb', ghostSh: '#b5ece2', glow: '#62f0d2', dark: '#060912',
};

const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

const prog = (t, a, b) => cl((t - a) / (b - a));

const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const eout = x => 1 - Math.pow(1 - x, 3);

const ein = x => x * x * x;

const back = (x, s = 1.70158) => x <= 0 ? 0 : x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);

const lerp = (a, b, p) => a + (b - a) * p;

const ring = (t, t0, f, d) => t < t0 ? 0 : Math.exp(-(t - t0) * d) * Math.sin((t - t0) * f * 2 * Math.PI);

const hash = n => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

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

function ghostPath(t) {
  const w = [0, 1, 2, 3].map(i => 13 * Math.sin(t * 6 + i * 1.4));
  return `M -105 -30 C -108 -178 108 -178 105 -30 L 110 112 Q 82 ${148 + w[0]} 55 116 Q 27 ${148 + w[1]} 0 116 Q -27 ${148 + w[2]} -55 116 Q -82 ${148 + w[3]} -110 112 Z`;
}

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

function gear(cx, cy, r, n, a, col) {
  let d = '';
  for (let i = 0; i < n; i++) { const an = a + i * 2 * Math.PI / n; d += `<rect x="${-10}" y="${-r - 16}" width="20" height="26" fill="${col}" transform="translate(${cx} ${cy}) rotate(${an * 180 / Math.PI})"/>`; }
  return `${d}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/><circle cx="${cx}" cy="${cy}" r="${r * .35}" fill="#123a6b"/>`;
}

function stars(n = 40, seed = 3) { let s = '', r = seed; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280 }; for (let i = 0; i < n; i++) s += `<circle cx="${rnd() * 1080}" cy="${rnd() * 1300}" r="${1 + rnd() * 2.5}" fill="#fff" opacity="${.3 + .3 * Math.sin(i)}"/>`; return s }

function dust(t) { let d = ''; for (let i = 0; i < 26; i++) { const x = (hash(i) * 1080 + t * (12 + 20 * hash(i + 1))) % 1080, y = (hash(i + 9) * 1400 + 60 * Math.sin(t * .7 + i)) ; d += `<circle cx="${x}" cy="${y}" r="${2 + 3 * hash(i + 4)}" fill="#cfe0ff" opacity="${.12 + .12 * Math.sin(t * 2 + i)}"/>`; } return d; }

export { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust };
