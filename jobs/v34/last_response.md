<style_md>
# Blackout Grünau — series style bible (Teil 1 defines it; all parts reuse it exactly)
- Mood: winter night in a Leipzig-Grünau Plattenbau after the power fails; cold dark, one warm light source at a time (phone torch, crank-radio dial). Tension through darkness, sound, clocks — no gore.
- Palette: night charcoal `#141A1F` / `#1E2A30`, moss shadow `#24363A`, concrete `#2B3943` (shadow `#1F2A32`), dark window `#0E1418`, lit window (only before 17:42) `#FFC46B`; warm light amber `#FFB547`; danger red `#E5484D` only for threats/alarms; cold moonlight `#9DB8C8`; snow `#DCE7EE`; water `#7CC6E6` → `#3F8DB3`.
- Line: flat shapes, outline `#0B0F12` 6 px, round joins; light as soft radial glows (amber/cold), hard dark foreground band under the subtitles.
- **Jonas Krüger (41):** moss-green parka `#56703F` (shadow `#3C5030`, collar `#6E8A50`, centre zip line, two square pockets), orange beanie `#F07A2A` with darker ribbed cuff `#C25A1A`, short brown beard `#6B4428`, skin `#E8B38A`, oval face, round eyes. Code: `jonas(x, y, s, o)` + `jHead`/`jBackHead` in v34 scene.js.
- **Mia (11):** yellow jacket `#F4C531` (shadow `#C99A1E`, collar `#FFE07A`), dark-blonde hair `#9A6A34` with fringe and two side braids tied with teal bands `#2EA39A`, rosy cheeks. Code: `mia(x, y, s, o)` + `mHead`.
- **Crank radio:** orange `#F28C28` box, black carry handle, left speaker grill, amber dial window with red needle, steel crank on the right side, antenna. Code: `radio(x, y, s, o)`.
- Places: 16-storey slab blocks (`tower()`), flat kitchen with window to the opposite blocks, dark hallway, bathroom tiles, stairwell with steel lift doors, lift shaft cut-away.
- Camera: close-ups of hands/objects, over-the-shoulder at the window, exterior of the blocks, building cut-aways; hard cut every 1.5–2.5 s, each cut on a new line or beat; impacts shake the frame.
- On-screen text: only `17:42`, `18:10`, `−8 °C`, `14. STOCK` as white Inter-900 labels on black boxes, plus symbols (`?`, signal bars, battery, Wi-Fi, lightning bolt).
- Subtitles: horror style; the bottom of every shot is a dark band so white text stays readable.
- Avoid: blood, bright daylight, beige paper looks, logos, any extra captions.
</style_md>
<style_json>{"dust": true, "vignette": true, "subtitle": "horror"}</style_json>
<plan>
0–2.26 lit Plattenbau, tram sweeps past, 17:42 slams · 2.26–4.66 aerial Grünau, two flickers, all dark on "dunkel" · 4.66–6.58 Jonas flips the dead switch · 6.58–8.3 whip up the facade to 14. STOCK · 8.3–10.5 thermometer falls to −8 °C, frost · 10.5–12.26 breath fog, calendar Tuesday circled · 12.26–14.6 Mia peeks out of her room · 14.6–17.24 tablet Wi-Fi struck out · 17.24–18.7 router LEDs die, Jonas realises · 18.7–20.2 fridge light dies · 20.2–22 tram sparks and stops on the crossing (top-down) · 22–23.64 stopped tram, dark traffic light · 23.64–25.5 over-shoulder at window, black towers · 25.5–27.26 finger wipes fogged glass, no light anywhere · 27.26–28.84 grabs phone · 28.84–30.12 bars 4→2 · 30.12–32 cell mast, arcs shrink · 32–33.94 mast battery drains red · 33.94–35.92 torch on cupboard, crank radio revealed · 35.92–38.12 memory: he laughed at the gift · 38.12–39.08 cranking · 39.08–40.9 radio static · 40.9–42.7 pull-out: dark to the horizon · 42.7–44.24 faces in dial light, "?" · 44.24–46.14 candle drawer pushed shut · 46.14–47.36 drop falls: water · 47.36–50.28 cut-away: pump pushes water up to 14. STOCK · 50.28–52.44 pump needs power, bolt struck, rotor stops · 52.44–55.2 tap turned, pause, it runs · 55.2–56.9 Mia fills pot, bottle · 56.9–58.82 counter fills, watering can · 58.82–60.6 plug in drain · 60.6–62.44 tub fills · 62.44–64.7 bottles capped · 64.7–67.24 bucket to toilet, washing · 67.24–69.9 18:10, stream thins · 69.9–71.54 drips · 71.54–74.34 Mia cheers · 74.34–76.94 smile drops, knock on door · 76.94–78.48 lift doors shudder · 78.48–80.1 down the shaft · 80.1–82.78 someone stuck between floors, knocking · 82.78–85.6 Jonas looks at you, "?", torch off.
</plan>
<scene_js>
// Blackout Grünau – Teil 1. Kênh 1: đêm lạnh, một nguồn sáng ấm. Character designs here are the series bible.
const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', amb: '#FFB547', ambD: '#C9822A', red: '#E5484D', ol: '#0B0F12',
  skin: '#E8B38A', skinSh: '#C48E68',
  park: '#56703F', parkSh: '#3C5030', parkHi: '#6E8A50', hat: '#F07A2A', hatSh: '#C25A1A', hatHi: '#FF9A50', beard: '#6B4428', beardSh: '#4E301B',
  mia: '#F4C531', miaSh: '#C99A1E', miaHi: '#FFE07A', mHair: '#9A6A34', mHairSh: '#6F4A22', band: '#2EA39A',
  conc: '#2B3943', concSh: '#1F2A32', concHi: '#3A4B56', win: '#0E1418', lit: '#FFC46B',
  snow: '#DCE7EE', cold: '#5E7F93', coldHi: '#9DB8C8', water: '#7CC6E6', waterSh: '#3F8DB3', waterHi: '#CDEFFC',
  radio: '#F28C28', radioSh: '#B8601A', steel: '#5A6A74', steelSh: '#3A464E', steelHi: '#7D8D97', tile: '#2A3A42', tileSh: '#22303A',
  tram: '#D9DEE2', tramSh: '#A9B3BA', tramB: '#2F5D8A', wood: '#5A4030', woodSh: '#3E2C21',
};
const OL = (w = 6) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
const shk = (t, t0, a, d = 6) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
const blinkAt = (t, off = 0) => { const k = (t + off) % 2.7; return k > 2.55 ? Math.sin((k - 2.55) / .15 * Math.PI) : 0; };
const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 17)) * (.6 + .4 * Math.sin(t * 5.3)) : 0;

const MYDEFS = `<defs>
<linearGradient id="kSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091015"/><stop offset=".65" stop-color="#1A262C"/><stop offset="1" stop-color="#2C3D45"/></linearGradient>
<linearGradient id="kHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB547" stop-opacity="0"/><stop offset="1" stop-color="#FFB547" stop-opacity=".45"/></linearGradient>
<radialGradient id="kAmb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB547" stop-opacity=".75"/><stop offset=".5" stop-color="#FFB547" stop-opacity=".25"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="kCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".55"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></radialGradient>
<radialGradient id="kRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".6"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<linearGradient id="kFg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0F12" stop-opacity="0"/><stop offset=".35" stop-color="#0B0F12" stop-opacity=".82"/><stop offset="1" stop-color="#0B0F12" stop-opacity=".95"/></linearGradient>
<linearGradient id="kBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".7"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
<linearGradient id="kWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AD8F0"/><stop offset="1" stop-color="#3F8DB3"/></linearGradient>
<radialGradient id="kMem" cx=".5" cy=".5" r=".6"><stop offset=".6" stop-color="#3A2410" stop-opacity="0"/><stop offset="1" stop-color="#1A1008" stop-opacity=".85"/></radialGradient>
</defs>`;
const FG = (y = 1340) => `<rect x="0" y="${y}" width="1080" height="${1920 - y}" fill="url(#kFg)"/>`;

function snow(t, n = 40, seed = 1, wind = 40, a = .8) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const sp = 70 + 90 * hash(i + seed), y = (hash(i * 3 + seed) * 2000 + t * sp) % 2000 - 40;
    const x = (hash(i * 7 + seed) * 1180 + t * wind + 30 * Math.sin(t * 1.3 + i)) % 1180 - 50;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.5 + 4 * hash(i + 11 * seed)).toFixed(1)}" fill="${K.snow}" opacity="${(a * (.4 + .6 * hash(i + 5))).toFixed(2)}"/>`;
  }
  return s;
}

// a slab-building facade; windows drawn as dashed lines (cheap), per-window lights from hash
function tower(x, yb, w, fl, cols, o = {}) {
  const fh = o.fh || 80, h = fl * fh, L = o.lit || 0, seed = o.seed || 1, p = o.p ?? .72, cw = w / cols, ww = cw * .58, pad = cw * .21;
  let s = `<rect x="${x}" y="${yb - h}" width="${w}" height="${h}" fill="${o.col || K.conc}" ${OL(o.lw || 5)}/>`;
  s += `<rect x="${x + w * .78}" y="${yb - h}" width="${w * .22}" height="${h}" fill="${K.concSh}" opacity=".6"/>`;
  for (let f = 0; f < fl; f++) {
    const y = yb - (f + .5) * fh;
    s += `<line x1="${x}" y1="${yb - f * fh}" x2="${x + w}" y2="${yb - f * fh}" stroke="${K.concSh}" stroke-width="${Math.max(1.5, fh * .05)}"/>`;
    s += `<line x1="${x + pad}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.win}" stroke-width="${fh * .46}" stroke-dasharray="${ww} ${cw - ww}"/>`;
    if (L > 0) {
      const cs = [];
      for (let c = 0; c < cols; c++) if (hash(seed * 31.7 + f * 13.1 + c * 7.3) < p) cs.push(c);
      if (cs.length) {
        const da = [];
        cs.forEach((c, i) => { da.push(ww.toFixed(1)); da.push(i < cs.length - 1 ? ((cs[i + 1] - c) * cw - ww).toFixed(1) : 3000); });
        s += `<line x1="${x + pad + cs[0] * cw}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.lit}" opacity="${L}" stroke-width="${fh * .46}" stroke-dasharray="${da.join(' ')}"/>`;
      }
    }
  }
  if (o.refl) s += `<line x1="${x + pad}" y1="${yb - h * .55}" x2="${x + w}" y2="${yb - h * .55 - 4}" stroke="${K.coldHi}" opacity=".12" stroke-width="${h * .9}" stroke-dasharray="${ww * .25} ${cw - ww * .25}"/>`;
  return s;
}

function lightLevel(t) { // the whole district: on, two flickers, out at 3.7
  if (t < 3.24) return 1;
  if (t < 3.3) return .15; if (t < 3.44) return 1; if (t < 3.5) return .25; if (t < 3.7) return .85;
  return 0;
}

// ---------- characters ----------
function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` };
}
function eyesS(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1;
  return [-34, 34].map(ex => `<ellipse cx="${ex}" cy="-6" rx="${14 * es}" ry="${Math.max(2, 17 * es * (1 - bl))}" fill="#F6F1E8" ${OL(4)}/>` + (bl < .6 ? `<circle cx="${ex + lx * .7}" cy="${-5 + ly * .7}" r="${7.5 * Math.min(es, 1.15)}" fill="${K.ol}"/>` : '')).join('');
}
function browsS(type, col, y0 = -34) {
  const B = { calm: [[-52, 2, -18, 0], [18, 0, 52, 2]], worry: [[-52, 4, -18, -8], [18, -8, 52, 4]], up: [[-52, -8, -18, -12], [18, -12, 52, -8]], angry: [[-52, -6, -18, 6], [18, 6, 52, -6]] }[type || 'calm'];
  return B.map(b => `<path d="M ${b[0]} ${y0 + b[1]} L ${b[2]} ${y0 + b[3]}" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`).join('');
}
function mouthS(m, talk, y) {
  if (talk > .05 || m === 'o') { const ry = m === 'o' ? 16 : 4 + 14 * talk; return `<ellipse cx="0" cy="${y}" rx="${m === 'o' ? 13 : 18}" ry="${ry}" fill="#3A1414" ${OL(4)}/>`; }
  if (m === 'smile') return `<path d="M -26 ${y - 6} Q 0 ${y + 18} 26 ${y - 6}" fill="none" ${OL(6)}/>`;
  if (m === 'grin') return `<path d="M -32 ${y - 8} Q 0 ${y + 36} 32 ${y - 8} Z" fill="#3A1414" ${OL(5)}/><path d="M -24 ${y - 3} L 24 ${y - 3}" stroke="#F6F1E8" stroke-width="7"/>`;
  if (m === 'worried') return `<path d="M -24 ${y + 4} q 8 -10 16 0 q 8 10 16 0 q 8 -10 16 0" fill="none" ${OL(5)}/>`;
  return `<path d="M -20 ${y} L 20 ${y}" fill="none" ${OL(6)}/>`;
}
function jHead(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="-86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skin}" ${OL(6)}/>
   <path d="M -85 12 Q -84 104 0 110 Q 84 104 85 12 Q 78 54 48 60 Q 0 72 -48 60 Q -78 54 -85 12 Z" fill="${K.beard}" ${OL(5)}/>
   <path d="M -42 46 Q 0 30 42 46 Q 22 58 0 51 Q -22 58 -42 46 Z" fill="${K.beardSh}"/>
   <path d="M -4 2 Q -14 30 -2 34 Q 8 36 12 30" fill="none" stroke="${K.skinSh}" stroke-width="7" stroke-linecap="round"/>
   ${eyesS(o)}${browsS(o.brow, K.beardSh)}
   ${mouthS(o.mouth || 'flat', o.talk || 0, 76)}
   <path d="M -94 -40 Q -98 -156 0 -158 Q 98 -156 94 -40 Z" fill="${K.hat}" ${OL(6)}/>
   <path d="M -50 -128 Q 0 -150 50 -128" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
   <rect x="-100" y="-80" width="200" height="42" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -70 -74 V -44 M -42 -74 V -44 M -14 -74 V -44 M 14 -74 V -44 M 42 -74 V -44 M 70 -74 V -44" stroke="${K.hat}" stroke-width="6"/>
  </g>`;
}
function jBackHead(u = 0) { // back of Jonas' head (over the shoulder), u turns toward right profile
  return `<g>
   <circle cx="${-84 + 20 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="${84 - 10 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skinSh}" ${OL(6)}/>
   <path d="M -84 30 Q -70 104 0 108 Q 70 104 84 30 Q 40 70 0 68 Q -40 70 -84 30 Z" fill="${K.beard}" opacity="${.4 + .6 * u}"/>
   <path d="M -96 30 Q -100 -156 0 -158 Q 100 -156 96 30 Q 0 54 -96 30 Z" fill="${K.hat}" ${OL(6)}/>
   <rect x="-102" y="-8" width="204" height="44" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -60 -130 Q 0 -152 60 -130" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
// Jonas: origin = centre of shoulder line. aL/aR = [upper, fore] degrees from straight down, + = outward, − = across the body
function jonas(x, y, s, o = {}) {
  const aL = o.aL || [10, 6], aR = o.aR || [10, 6];
  const L = arm(-126, 34, aL[0], aL[1], -1, 150, 138, K.park, 62), R = arm(126, 34, aR[0], aR[1], 1, 150, 138, K.park, 62);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="27" fill="${K.skin}" ${OL(5)}/>`;
  const head = o.back ? jBackHead(o.u || 0) : jHead(o);
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -150 44 Q -152 -8 -96 -20 L 96 -20 Q 152 -8 150 44 L 174 560 L -174 560 Z" fill="${K.park}" ${OL(6)}/>
    <path d="M 70 -14 Q 150 -6 150 44 L 174 560 L 112 560 Z" fill="${K.parkSh}"/>
    ${o.back ? '' : `<path d="M 0 30 V 560" stroke="${K.parkSh}" stroke-width="7"/><rect x="-136" y="330" width="88" height="72" rx="10" fill="none" stroke="${K.parkSh}" stroke-width="7"/><rect x="48" y="330" width="88" height="72" rx="10" fill="none" stroke="${K.parkSh}" stroke-width="7"/>`}
    ${o.back ? `<path d="M -120 -20 Q 0 -70 120 -20 L 130 70 Q 0 30 -130 70 Z" fill="${K.parkSh}" ${OL(5)}/>` : ''}
    <g transform="translate(${o.hdx || 0} ${-112 + (o.hdy || 0)})">${head}</g>
    ${o.back ? '' : `<path d="M -112 -34 Q 0 40 112 -34 L 120 4 Q 0 74 -120 4 Z" fill="${K.parkHi}" ${OL(5)}/>`}
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${o.noArmL ? '' : L.svg + hnd(L)}${o.noArmR ? '' : R.svg + hnd(R)}
    ${o.front || ''}
  </g>`;
}
function mHead(o = {}) {
  const sw = o.sway || 0;
  const braid = sd => { let b = ''; for (let i = 0; i < 5; i++) { const bx = sd * (84 + i * 3) + sw * i * 3, by = 30 + i * 30; b += `<ellipse cx="${bx}" cy="${by}" rx="${17 - i}" ry="19" fill="${i % 2 ? K.mHairSh : K.mHair}" ${OL(4)}/>`; } return b + `<rect x="${sd * 96 + sw * 15 - 12}" y="168" width="24" height="12" rx="5" fill="${K.band}" ${OL(3)}/>`; };
  return `<g transform="rotate(${o.tilt || 0})">
   ${braid(-1)}${braid(1)}
   <ellipse cx="0" cy="8" rx="80" ry="88" fill="${K.skin}" ${OL(6)}/>
   <ellipse cx="-50" cy="40" rx="16" ry="10" fill="#F08F86" opacity=".45"/><ellipse cx="50" cy="40" rx="16" ry="10" fill="#F08F86" opacity=".45"/>
   <path d="M -84 10 Q -96 -102 0 -100 Q 96 -102 84 10 Q 76 -46 34 -54 Q 10 -34 -16 -56 Q -72 -50 -84 10 Z" fill="${K.mHair}" ${OL(6)}/>
   <path d="M -40 -84 Q 0 -96 40 -84" fill="none" stroke="#C08A4C" stroke-width="8" stroke-linecap="round"/>
   <path d="M -2 10 Q -8 26 4 28" fill="none" stroke="${K.skinSh}" stroke-width="6" stroke-linecap="round"/>
   ${eyesS(Object.assign({ eyeS: 1.08 }, o))}${browsS(o.brow, K.mHairSh, -36)}
   ${mouthS(o.mouth || 'smile', o.talk || 0, 56)}
  </g>`;
}
function mia(x, y, s, o = {}) {
  const aL = o.aL || [8, 4], aR = o.aR || [8, 4];
  const L = arm(-98, 26, aL[0], aL[1], -1, 118, 108, K.mia, 50), R = arm(98, 26, aR[0], aR[1], 1, 118, 108, K.mia, 50);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="22" fill="${K.skin}" ${OL(5)}/>`;
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -116 36 Q -118 -6 -74 -16 L 74 -16 Q 118 -6 116 36 L 132 440 L -132 440 Z" fill="${K.mia}" ${OL(6)}/>
    <path d="M 56 -10 Q 118 -6 116 36 L 132 440 L 86 440 Z" fill="${K.miaSh}"/>
    <path d="M 0 24 V 440" stroke="${K.miaSh}" stroke-width="6"/><path d="M -116 230 H 116" stroke="${K.miaSh}" stroke-width="5" opacity=".7"/>
    <g transform="translate(${o.hdx || 0} ${-92 + (o.hdy || 0)})">${mHead(o)}</g>
    <path d="M -88 -26 Q 0 34 88 -26 L 94 4 Q 0 62 -94 4 Z" fill="${K.miaHi}" ${OL(5)}/>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${L.svg}${hnd(L)}${R.svg}${hnd(R)}
    ${o.front || ''}
  </g>`;
}

// ---------- props ----------
function phone(x, y, s, rot, o = {}) {
  const on = o.on ?? 1;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${on > 0 ? `<ellipse cx="0" cy="0" rx="190" ry="210" fill="url(#kCold)" opacity="${.8 * on}"/>` : ''}
    <rect x="-42" y="-78" width="84" height="156" rx="14" fill="#1A2126" ${OL(5)}/>
    <rect x="-34" y="-66" width="68" height="128" rx="8" fill="${on > 0 ? '#BFD8E6' : '#0E1418'}" opacity="${.3 + .7 * on}"/>
    ${o.screen || ''}
  </g>`;
}
function radio(x, y, s, o = {}) {
  const crank = o.crank || 0, dial = o.dial || 0, vib = o.vib || 0;
  const cx = 150, cy = 10;
  const hx = cx + 70 * Math.cos(crank), hy = cy + 70 * Math.sin(crank);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${dial > 0 ? `<ellipse cx="0" cy="-10" rx="${300}" ry="${260}" fill="url(#kAmb)" opacity="${.9 * dial}"/>` : ''}
    <line x1="-90" y1="-90" x2="-170" y2="-250" stroke="${K.steelHi}" stroke-width="8" stroke-linecap="round"/><circle cx="-170" cy="-250" r="9" fill="${K.steelHi}" ${OL(3)}/>
    <path d="M -110 -96 Q -110 -140 -60 -140 L 60 -140 Q 110 -140 110 -96" fill="none" stroke="#2B2B2B" stroke-width="22" stroke-linecap="round"/>
    <rect x="-140" y="-100" width="280" height="200" rx="34" fill="${K.radio}" ${OL(6)}/>
    <rect x="40" y="-100" width="100" height="200" rx="30" fill="${K.radioSh}" opacity=".55"/>
    <g transform="translate(${vib * Math.sin(o.t * 90)} 0)"><circle cx="-56" cy="18" r="58" fill="#2A2018" ${OL(5)}/>
    ${[0, 1, 2, 3].map(i => `<circle cx="-56" cy="18" r="${12 + i * 13}" fill="none" stroke="#4A3A2C" stroke-width="5"/>`).join('')}</g>
    <rect x="22" y="-66" width="92" height="44" rx="10" fill="${dial > 0 ? '#FFD58A' : '#4A3A2C'}" opacity="${.5 + .5 * dial}" ${OL(4)}/>
    <line x1="${34 + 66 * (o.needle || .4)}" y1="-62" x2="${34 + 66 * (o.needle || .4)}" y2="-26" stroke="${K.red}" stroke-width="5"/>
    <circle cx="68" cy="30" r="22" fill="${K.radioSh}" ${OL(5)}/><circle cx="68" cy="30" r="6" fill="${K.ol}"/>
    <circle cx="${cx}" cy="${cy}" r="18" fill="${K.steel}" ${OL(4)}/>
    <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${K.ol}" stroke-width="22" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${K.steelHi}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="20" fill="#2B2B2B" ${OL(4)}/>
  </g>`;
}
function bottle(x, y, s, lvl, o = {}) { // y = bottom
  const cap = o.cap ?? 1, capY = -260 - 50 * (1 - cap), h = 200 * cl(lvl);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -50 0 L -50 -170 Q -50 -200 -22 -214 L -22 -240 L 22 -240 L 22 -214 Q 50 -200 50 -170 L 50 0 Z" fill="#9DB8C8" fill-opacity=".22" ${OL(5)}/>
    ${h > 0 ? `<path d="M -45 -4 L -45 ${-Math.min(h, 170)} L 45 ${-Math.min(h, 170)} L 45 -4 Z" fill="url(#kWat)" opacity=".9"/>` : ''}
    <path d="M -34 -150 V -30" stroke="#fff" stroke-width="7" opacity=".35" stroke-linecap="round"/>
    ${cap > 0 ? `<g transform="rotate(${(1 - cap) * 200} 0 ${capY + 20})"><rect x="-27" y="${capY}" width="54" height="34" rx="6" fill="${o.capCol || '#2EA39A'}" ${OL(4)}/></g>` : ''}
  </g>`;
}
function pot(x, y, s, lvl) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-150" y="-110" width="40" height="18" rx="8" fill="${K.steelSh}" ${OL(4)}/><rect x="110" y="-110" width="40" height="18" rx="8" fill="${K.steelSh}" ${OL(4)}/>
    <path d="M -118 -130 L -110 -10 Q -108 0 -96 0 L 96 0 Q 108 0 110 -10 L 118 -130 Z" fill="${K.steel}" ${OL(5)}/>
    <ellipse cx="0" cy="-130" rx="118" ry="22" fill="${K.steelSh}" ${OL(5)}/>
    ${lvl > 0 ? `<ellipse cx="0" cy="${-130 + 100 * (1 - cl(lvl))}" rx="${110 - 6 * (1 - lvl)}" ry="18" fill="${K.water}" opacity=".95"/>` : ''}
    <path d="M -80 -100 V -30" stroke="${K.steelHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
function wcan(x, y, s, lvl) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 90 -110 L 220 -230" stroke="${K.ol}" stroke-width="30" stroke-linecap="round"/><path d="M 90 -110 L 220 -230" stroke="#4FA36A" stroke-width="18" stroke-linecap="round"/>
    <rect x="200" y="-262" width="44" height="30" rx="8" transform="rotate(-42 222 -247)" fill="#3E8556" ${OL(4)}/>
    <path d="M -100 -170 Q -170 -200 -150 -110 Q -140 -70 -100 -70" fill="none" stroke="${K.ol}" stroke-width="26"/><path d="M -100 -170 Q -170 -200 -150 -110 Q -140 -70 -100 -70" fill="none" stroke="#4FA36A" stroke-width="14"/>
    <path d="M -110 0 L -100 -190 L 100 -190 L 110 0 Z" fill="#4FA36A" ${OL(6)}/>
    <ellipse cx="0" cy="-190" rx="100" ry="18" fill="#3E8556" ${OL(5)}/>
    ${lvl > 0 ? `<ellipse cx="0" cy="-190" rx="${88 * cl(lvl)}" ry="${14 * cl(lvl)}" fill="${K.water}"/>` : ''}
    <path d="M -70 -160 V -30" stroke="#7CCB94" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}
function tap(x, y, s, o = {}) { // faucet; spout tip at local (120, 40)
  const hr = o.handle || 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-40" y="-20" width="80" height="140" rx="14" fill="${K.steel}" ${OL(5)}/>
    <path d="M 0 0 Q 0 -80 80 -80 Q 130 -80 130 -20 L 130 30 L 104 30 L 104 -20 Q 104 -54 80 -54 Q 26 -54 26 0 Z" fill="${K.steelHi}" ${OL(5)}/>
    <g transform="rotate(${hr} 0 -40)"><rect x="-90" y="-58" width="180" height="34" rx="16" fill="${K.steel}" ${OL(5)}/><circle cx="0" cy="-40" r="22" fill="${K.steelHi}" ${OL(4)}/></g>
  </g>`;
}
function stream(x, y0, y1, w, t) {
  if (w <= .5) return '';
  let wob = '';
  for (let i = 0; i < 4; i++) { const yy = y0 + ((t * 900 + i * 90) % (y1 - y0)); wob += `<ellipse cx="${x}" cy="${yy}" rx="${w * .35}" ry="10" fill="${K.waterHi}" opacity=".55"/>`; }
  return `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${w / 2}" fill="url(#kWat)" stroke="${K.waterSh}" stroke-width="3"/>${wob}`;
}
function lab(str, cx, cy, sz, p, col = '#FFFFFF', bg = K.ol) {
  if (p <= 0) return '';
  const w = str.length * sz * .62 + sz * .9, h = sz * 1.35;
  return `<g transform="translate(${cx} ${cy}) scale(${p}) rotate(${-3 * (1 - cl(p))})">
    <rect x="${-w / 2 + 10}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="12" fill="#000" opacity=".5"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${bg}" stroke="${col}" stroke-opacity=".25" stroke-width="4"/>
    ${TX(str, 0, sz * .36, sz, col, 'middle', 'letter-spacing="4"')}
  </g>`;
}
function rings(t, t0, x, y, col = K.amb, n = 3, r1 = 260) {
  let s = '';
  for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .09, t0 + .7 + k * .09); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${40 + p * r1}" fill="none" stroke="${col}" stroke-width="${10 * (1 - p)}" opacity="${.7 * (1 - p)}"/>`; }
  return s;
}
function breath(t, t0, x, y, dir = 1) {
  const p = prog(t, t0, t0 + 1.1); if (p <= 0 || p >= 1) return '';
  let s = ''; for (let i = 0; i < 3; i++) { const q = cl(p * 1.3 - i * .12); if (q <= 0) continue; s += `<circle cx="${x + dir * (30 + 120 * q + i * 30)}" cy="${y - 20 * q - i * 10}" r="${18 + 50 * q}" fill="#E6F0F6" opacity="${.45 * (1 - q)}"/>`; }
  return s;
}
// apartment backdrop (after the blackout): cold wall, moonlight from a window at left
function flatWall(o = {}) {
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
   <rect x="0" y="1180" width="1080" height="740" fill="${K.bg}"/>
   <polygon points="${o.wx || 0},300 ${(o.wx || 0) + 300},300 ${(o.wx || 0) + 760},1500 ${(o.wx || 0) + 120},1500" fill="${K.coldHi}" opacity=".07"/>`;
}
function kitchen(t, o = {}) {
  let tiles = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) tiles += `<rect x="${c * 110}" y="${880 + r * 80}" width="108" height="78" fill="${(r + c) % 2 ? K.tile : K.tileSh}"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
   <rect x="60" y="240" width="330" height="440" rx="8" fill="#0D1519" ${OL(8)}/>
   <rect x="78" y="258" width="294" height="404" fill="url(#kSky)"/>
   ${tower(96, 662, 120, 9, 4, { fh: 42, col: '#18232A', lw: 3 })}${tower(250, 662, 110, 7, 4, { fh: 46, col: '#18232A', lw: 3 })}
   <circle cx="320" cy="320" r="26" fill="${K.coldHi}" opacity=".8"/>
   <path d="M 225 258 V 662 M 78 460 H 372" stroke="#0D1519" stroke-width="12"/>
   <polygon points="78,662 372,662 820,1500 120,1500" fill="${K.coldHi}" opacity=".08"/>
   ${tiles}
   <rect x="460" y="200" width="560" height="260" rx="8" fill="${K.moss}" ${OL(6)}/><path d="M 740 200 V 460" stroke="${K.ol}" stroke-width="6"/>
   <circle cx="715" cy="420" r="9" fill="${K.steelHi}"/><circle cx="765" cy="420" r="9" fill="${K.steelHi}"/>
   <rect x="0" y="1200" width="1080" height="40" fill="${K.steelSh}" ${OL(6)}/>
   <rect x="0" y="1240" width="1080" height="680" fill="${K.moss}" ${OL(6)}/>
   <path d="M 360 1240 V 1920 M 720 1240 V 1920" stroke="${K.ol}" stroke-width="6"/>
   <path d="M 540 0 V 120" stroke="${K.ol}" stroke-width="6"/><path d="M 470 170 Q 540 90 610 170 Z" fill="${K.steelSh}" ${OL(5)}/><circle cx="540" cy="172" r="16" fill="#3A4A52" ${OL(4)}/>`;
}

// ---------- shots ----------
function s01(t) { // street-level: lit Plattenbau, tram sweeps past, 17:42 slams
  const push = 1 + .05 * prog(t, 0, 2.26), [sx, sy] = shk(t, .42, 14, 7);
  const tramX = lerp(1150, -1250, prog(t, 0, 2.2));
  const p = back(prog(t, .4, .72));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <rect x="0" y="700" width="1080" height="700" fill="url(#kHaze)"/>
   <g transform="translate(${540 + sx} ${980 + sy}) scale(${push}) translate(-540 -980)">
    ${tower(-260, 1330, 330, 12, 4, { fh: 82, seed: 4, lit: 1, p: .6 })}
    ${tower(140, 1330, 800, 16, 8, { fh: 76, seed: 1, lit: 1 })}
    ${tower(1010, 1330, 330, 13, 4, { fh: 80, seed: 7, lit: 1, p: .65 })}
    <rect x="-40" y="1320" width="1160" height="600" fill="#C9D6DE"/>
    <rect x="-40" y="1320" width="1160" height="26" fill="#E8F0F4"/>
    <path d="M -40 1180 H 1120" stroke="#0B0F12" stroke-width="4"/>
    <g transform="translate(${tramX} 0)">
      <rect x="0" y="1150" width="1500" height="210" rx="40" fill="${K.tram}" ${OL(6)}/>
      <rect x="0" y="1290" width="1500" height="28" fill="${K.tramB}"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${60 + i * 200}" y="1180" width="150" height="90" rx="12" fill="${K.lit}" opacity=".9" ${OL(4)}/>`).join('')}
      <path d="M 700 1150 L 760 1100 L 700 1060 L 760 1060" fill="none" stroke="${K.ol}" stroke-width="6"/>
      <circle cx="30" cy="1320" r="16" fill="#FFF3D1"/>
    </g>
    <rect x="70" y="1050" width="16" height="290" fill="${K.steelSh}" ${OL(3)}/><circle cx="78" cy="1050" r="26" fill="#FFE2A8"/><ellipse cx="78" cy="1060" rx="150" ry="150" fill="url(#kAmb)" opacity=".7"/>
   </g>
   ${snow(t, 46, 2)}
   ${FG(1420)}
   ${lab('17:42', 540, 300, 150, p)}`;
}
function s02(t) { // aerial Grünau: everything goes dark at the same time
  const L = lightLevel(t), [sx, sy] = shk(t, 3.7, 18, 5);
  const desc = 20 * prog(t, 2.26, 4.66);
  let rows = '';
  const R = [[560, .38, 10, 6], [760, .55, 11, 7], [1000, .78, 11, 8], [1330, 1.1, 10, 9]];
  R.forEach(([yb, sc, fl, n], r) => {
    let b = '';
    for (let i = 0; i < n; i++) {
      const w = 260, x = i * 300 - 120 + (r % 2) * 140;
      b += `<polygon points="${x},${yb - fl * 60} ${x + 60},${yb - fl * 60 - 50} ${x + w + 60},${yb - fl * 60 - 50} ${x + w},${yb - fl * 60}" fill="${K.concHi}" ${OL(4)}/>` + tower(x, yb, w, fl, 6, { fh: 60, seed: r * 10 + i, lit: L, lw: 4 });
    }
    rows += `<g transform="translate(540 ${yb}) scale(${sc}) translate(-540 ${-yb})">${b}</g>`;
    rows += `<rect x="0" y="${yb + 2}" width="1080" height="${12 + r * 10}" fill="#B8C7CF" opacity=".55"/>`;
    for (let k = 0; k < 9; k++) rows += `<circle cx="${k * 130 + 40 + r * 30}" cy="${yb + 8 + r * 6}" r="${4 + r * 2}" fill="#FFE2A8" opacity="${L}"/>`;
  });
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <rect x="0" y="300" width="1080" height="700" fill="url(#kHaze)" opacity="${L}"/>
   <circle cx="860" cy="210" r="40" fill="${K.coldHi}" opacity="${.3 + .6 * (1 - L)}"/>
   <g transform="translate(${sx} ${sy - desc})">${rows}
    <rect x="0" y="1340" width="1080" height="600" fill="#AEBEC7"/></g>
   ${t > 3.7 && t < 3.8 ? `<rect width="1080" height="1920" fill="#000" opacity=".5"/>` : ''}
   ${snow(t, 40, 5)}${FG(1420)}`;
}
function s03(t) { // kitchen: Jonas flips the switch twice – nothing
  const reach = eout(prog(t, 4.66, 4.95));
  const flick = (t > 5.0 && t < 5.12) || (t > 5.4 && t < 5.52) ? 1 : 0;
  const up = eout(prog(t, 5.6, 5.9)), turn = eout(prog(t, 6.05, 6.3));
  const sw = 3 * Math.sin(t * 2.2);
  return `${kitchen(t)}
   <rect x="800" y="690" width="70" height="100" rx="10" fill="#C9D2D8" ${OL(5)}/><rect x="823" y="${flick ? 742 : 712}" width="24" height="36" rx="5" fill="#8C979E" ${OL(3)}/>
   ${jonas(520, 1010, 1, { aR: [lerp(10, 40, reach), lerp(6, -170 + 18 * flick, reach)], aL: [8, 4], lookY: -14 * up + 10 * turn * 0, look: lerp(10, 0, turn), brow: turn > .5 ? 'worry' : 'calm', mouth: turn > .5 ? 'flat' : 'flat', hdy: -6 * up, tilt: sw, blink: blinkAt(t) })}
   ${FG()}`;
}
function s04(t) { // whip up the dark facade to the 14th floor
  const p = t < 7.15 ? eio(prog(t, 6.58, 7.12)) : 1 + .03 * ring(t, 7.12, 2.5, 6);
  const fh = 110, rise = lerp(0, 14 * fh - 600, p);
  const lp = back(prog(t, 7.15, 7.42));
  let fl = '';
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <g transform="translate(0 ${rise})">
    ${tower(100, 1500, 880, 16, 6, { fh, seed: 3, lit: 0, refl: 1 })}
    <rect x="${100 + 880 / 6 * 2 + 30}" y="${1500 - 13.5 * fh - 28}" width="${880 / 6 * .58}" height="${fh * .46}" fill="${K.coldHi}" opacity=".35"/>
    <g transform="translate(${100 + 880 / 6 * 2 + 30 + 880 / 12 * .58} ${1500 - 13.5 * fh + 10})">${jonas(0, 0, .14, { look: 0 })}</g>
    ${fl}
   </g>
   ${snow(t, 40, 9)}
   ${lab('14. STOCK', 540, 1120, 92, lp)}
   ${lp > 0 ? `<path d="M 540 1060 L 540 ${1500 - 13.5 * fh + rise + 70}" stroke="#fff" stroke-width="6" stroke-dasharray="14 10" opacity="${cl(lp)}"/>` : ''}
   ${FG(1420)}`;
}
function s05(t) { // window outside: thermometer falls to −8 °C, frost grows
  const temp = lerp(2, -8, eio(prog(t, 8.5, 9.6)));
  const fy = 700 + (2 - temp) * 34;
  const fr = eout(prog(t, 8.3, 10.4));
  const lp = back(prog(t, 9.54, 9.82));
  let frost = '';
  for (let i = 0; i < 7; i++) { const a = -0.2 + i * .28, L = 260 * fr * (.6 + .4 * hash(i)); frost += `<path d="M 160 1330 l ${L * Math.cos(a)} ${-L * Math.sin(a + .9)}" stroke="#E8F4FA" stroke-width="6" opacity=".6" stroke-linecap="round"/><path d="M 920 330 l ${-L * Math.cos(a)} ${L * Math.sin(a + .9)}" stroke="#E8F4FA" stroke-width="6" opacity=".6" stroke-linecap="round"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-40, 1700, 520, 14, 4, { fh: 110, seed: 12, col: '#18232A', refl: 1 })}${tower(560, 1700, 560, 16, 4, { fh: 100, seed: 15, col: '#18232A', refl: 1 })}
   ${snow(t, 60, 3, 260, 1)}
   <rect x="100" y="270" width="880" height="1120" fill="none" stroke="${K.ol}" stroke-width="40"/><rect x="100" y="270" width="880" height="1120" fill="none" stroke="#3B4A52" stroke-width="24"/>
   <path d="M 540 270 V 1390" stroke="#3B4A52" stroke-width="30"/><path d="M 540 270 V 1390" stroke="${K.ol}" stroke-width="6"/>
   <ellipse cx="160" cy="1330" rx="${320 * fr}" ry="${260 * fr}" fill="#E8F4FA" opacity=".18"/><ellipse cx="920" cy="330" rx="${300 * fr}" ry="${240 * fr}" fill="#E8F4FA" opacity=".18"/>${frost}
   <g transform="translate(760 0)">
    <rect x="-70" y="560" width="140" height="760" rx="30" fill="#E6EDF1" ${OL(6)}/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="-40" y1="${632 + i * 102}" x2="0" y2="${632 + i * 102}" stroke="${K.ol}" stroke-width="5"/>`).join('')}
    <rect x="-14" y="600" width="28" height="640" rx="14" fill="#fff" ${OL(4)}/>
    <rect x="-9" y="${fy}" width="18" height="${1250 - fy}" rx="9" fill="${K.red}"/>
    <circle cx="0" cy="1262" r="34" fill="${K.red}" ${OL(5)}/>
   </g>
   ${lab('−8 °C', 360, 760, 120, lp)}
   ${FG(1420)}`;
}
function s06(t) { // inside: Jonas at window, breath fogs, rubs hands; calendar
  const rub = t > 10.9 ? Math.sin(t * 16) * 10 : 0, hands = eout(prog(t, 10.6, 10.9));
  let cal = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) cal += `<rect x="${130 + c * 34}" y="${640 + r * 30}" width="28" height="24" fill="${r === 2 && c === 1 ? '#fff' : '#C9D2D8'}" opacity=".85"/>`;
  const circ = eout(prog(t, 10.74, 11.1));
  return `${flatWall({ wx: 600 })}
   <rect x="640" y="280" width="420" height="620" fill="url(#kSky)" ${OL(8)}/>${tower(660, 900, 200, 10, 3, { fh: 60, col: '#18232A', lw: 3 })}
   <rect x="110" y="380" width="280" height="400" fill="#E6EDF1" ${OL(5)}/><rect x="110" y="380" width="280" height="230" fill="#3E6A8A"/>
   <path d="M 250 430 l 0 140 M 190 465 l 120 70 M 190 535 l 120 -70" stroke="#fff" stroke-width="10" stroke-linecap="round"/>${cal}
   <circle cx="${130 + 34 + 14}" cy="${640 + 60 + 12}" r="24" fill="none" stroke="${K.red}" stroke-width="5" stroke-dasharray="160" stroke-dashoffset="${160 * (1 - circ)}"/>
   ${jonas(560, 1060, 1.05, { aL: [lerp(10, 22, hands), lerp(6, -120, hands) + rub * .4], aR: [lerp(10, 22, hands), lerp(6, -120, hands) - rub * .4], look: 12, lookY: -4, brow: 'worry', mouth: t > 10.6 && t < 11.0 || t > 11.5 && t < 11.9 ? 'o' : 'flat', blink: blinkAt(t, .7) })}
   ${breath(t, 10.62, 660, 870)}${breath(t, 11.55, 660, 870)}
   ${FG()}`;
}
function s07(t) { // dark hallway, Mia pops out of her door with a tablet
  const pk = back(prog(t, 12.6, 12.95)), call = t > 13.12;
  return `${flatWall({ wx: -200 })}
   <rect x="520" y="420" width="380" height="900" fill="#0B1014" ${OL(6)}/>
   <polygon points="520,420 ${520 + 220 * (1 - pk * .3)},460 ${520 + 220 * (1 - pk * .3)},1290 520,1320" fill="#3A3026" ${OL(5)}/>
   <rect x="${300 - 40}" y="470" width="190" height="120" fill="#55634A" opacity=".5" ${OL(4)}/>
   <g transform="translate(${lerp(980, 820, pk)} 0)">${mia(0, 860, .95, { tilt: lerp(-20, -8, pk), aR: [30, -140], aL: [10, 4], mouth: call ? 'smile' : 'smile', talk: talkAt(t, 13.12, 14.5), brow: 'up', look: -12, holdR: (x, y) => `<g transform="translate(${x - 30} ${y + 10}) rotate(-10)"><rect x="-80" y="-60" width="160" height="110" rx="12" fill="#1A2126" ${OL(5)}/><rect x="-68" y="-48" width="136" height="86" rx="6" fill="#BFD8E6"/></g>` })}</g>
   <rect x="900" y="420" width="180" height="900" fill="${K.bg2}"/><rect x="900" y="420" width="16" height="900" fill="${K.ol}"/>
   ${rings(t, 13.15, 760, 640, K.miaHi, 2, 200)}
   <ellipse cx="760" cy="900" rx="220" ry="200" fill="url(#kCold)" opacity=".5"/>
   ${FG()}`;
}
function s08(t) { // close: Mia shows the tablet, WiFi icon greys out, she shakes it
  const off = prog(t, 15.95, 16.2), shake = t > 16.35 && t < 17.0 ? 16 * Math.sin(t * 40) : 0;
  const x0 = 540;
  const wifi = `<g transform="translate(0 30)">${[0, 1, 2].map(i => `<path d="M ${-40 - i * 34} ${-10 - i * 30} Q 0 ${-50 - i * 50} ${40 + i * 34} ${-10 - i * 30}" fill="none" stroke="${off > .5 ? '#6B7B84' : '#2EA39A'}" stroke-width="14" stroke-linecap="round"/>`).join('')}<circle cx="0" cy="16" r="14" fill="${off > .5 ? '#6B7B84' : '#2EA39A'}"/>
    ${off > 0 ? `<line x1="-110" y1="-120" x2="${-110 + 220 * off}" y2="${-120 + 160 * off}" stroke="${K.red}" stroke-width="18" stroke-linecap="round"/>` : ''}</g>`;
  return `${flatWall({ wx: 100 })}
   <ellipse cx="540" cy="900" rx="460" ry="420" fill="url(#kCold)" opacity=".55"/>
   ${mia(x0, 1080, 1.55, { tilt: shake * .2, aL: [30, -150], aR: [30, -150], talk: talkAt(t, 15.14, 16.8), brow: off > .5 ? 'worry' : 'up', mouth: off > .5 ? 'worried' : 'smile', look: 0, lookY: 8, sway: Math.sin(t * 6) })}
   <g transform="translate(${540 + shake} 1150) rotate(${shake * .3})"><rect x="-230" y="-170" width="460" height="320" rx="26" fill="#1A2126" ${OL(6)}/><rect x="-200" y="-140" width="400" height="260" rx="12" fill="#DDEBF2"/>${wifi}
     <circle cx="-210" cy="140" r="40" fill="${K.skin}" ${OL(5)}/><circle cx="210" cy="140" r="40" fill="${K.skin}" ${OL(5)}/></g>
   ${FG(1400)}`;
}
function s09(t) { // "Nicht nur das WLAN": Jonas close, head turns; router LEDs die
  const turn = eio(prog(t, 17.3, 17.7)), dark = prog(t, 17.6, 18.4);
  let leds = ''; for (let i = 0; i < 5; i++) { const on = dark * 5 < i + 1 ? 1 : 0; leds += `<circle cx="${780 + i * 36}" cy="560" r="10" fill="${on ? '#5BE08A' : '#25302F'}" ${OL(3)}/>`; }
  return `${flatWall({ wx: -100 })}
   <rect x="720" y="520" width="240" height="90" rx="16" fill="#2B3439" ${OL(5)}/>${leds}<line x1="760" y1="520" x2="740" y2="420" stroke="${K.ol}" stroke-width="10"/><line x1="920" y1="520" x2="940" y2="420" stroke="${K.ol}" stroke-width="10"/>
   ${jonas(420, 1260, 1.75, { hdx: -20 * turn, look: lerp(-12, 14, turn), lookY: -4, brow: turn > .5 ? 'angry' : 'up', mouth: 'flat', tilt: lerp(-6, 4, turn), blink: blinkAt(t, 1.2) })}
   ${FG(1420)}`;
}
function s10(t) { // fridge opens, light dies, hum stops
  const door = eout(prog(t, 18.72, 19.05)), dieT = 19.3;
  const L = t < dieT ? 1 : (t < 19.4 ? .3 : (t < 19.48 ? .8 : 0));
  let hum = ''; if (t < dieT) for (let i = 0; i < 3; i++) hum += `<path d="M ${880 + i * 30} ${520 + i * 40} q 20 -20 0 -40 q -20 -20 0 -40" fill="none" stroke="${K.coldHi}" stroke-width="5" opacity="${.5 - .1 * i}" transform="translate(${4 * Math.sin(t * 30 + i)} 0)"/>`;
  return `${flatWall({ wx: -300 })}
   <rect x="300" y="300" width="500" height="1100" rx="30" fill="#C9D2D8" ${OL(6)}/>
   <rect x="330" y="330" width="440" height="1040" rx="16" fill="${L > 0 ? '#F3F1E0' : '#2C3740'}" opacity="${.35 + .65 * L}"/>
   ${[600, 850, 1100].map(y => `<rect x="330" y="${y}" width="440" height="10" fill="#8C979E"/>`).join('')}
   ${bottle(420, 590, .9, .8)}${pot(620, 590, .8, 0)}<rect x="560" y="740" width="150" height="100" rx="12" fill="#E8C77A" ${OL(4)}/><rect x="400" y="980" width="200" height="110" rx="20" fill="#D97B5A" ${OL(4)}/>
   ${L > 0 ? `<ellipse cx="550" cy="700" rx="420" ry="520" fill="url(#kAmb)" opacity="${.5 * L}"/>` : ''}
   <polygon points="300,300 ${300 - 260 * door},${250 + 30 * (1 - door)} ${300 - 260 * door},${1450 - 30 * (1 - door)} 300,1400" fill="#AEB8BE" ${OL(6)}/>
   ${hum}
   ${jonas(170, 1180, .9, { look: 14, brow: L > 0 ? 'calm' : 'worry', mouth: 'flat', aR: [30, -60], lookY: -2 })}
   ${FG()}`;
}
function s11(t) { // top-down: tram sparks and stops mid-crossing
  const p = eout(prog(t, 20.2, 21.9)), ty = lerp(-300, 760, p) + (t > 21.9 ? 6 * ring(t, 21.9, 2, 5) : 0);
  const sp = t > 20.44 && t < 20.9;
  let sparks = ''; if (sp) for (let i = 0; i < 8; i++) { const q = (t - 20.44) * 4 + hash(i); sparks += `<line x1="590" y1="${ty + 120}" x2="${590 + 60 * Math.cos(i)}" y2="${ty + 120 + 60 * Math.sin(i * 1.7)}" stroke="#CFEFFF" stroke-width="5" opacity="${1 - (q % 1)}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="#BFCDD5"/>
   <rect x="380" y="0" width="320" height="1920" fill="#5E6A70"/><rect x="0" y="720" width="1080" height="300" fill="#5E6A70"/>
   ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${400 + i * 50}" y="680" width="28" height="30" fill="#E8F0F4"/><rect x="${400 + i * 50}" y="1030" width="28" height="30" fill="#E8F0F4"/>`).join('')}
   <path d="M 500 -20 V 1940 M 580 -20 V 1940" stroke="#3A4248" stroke-width="8"/>
   <path d="M 540 -20 V 1940" stroke="#2A3035" stroke-width="3"/>
   <rect x="300" y="620" width="60" height="60" rx="10" fill="#1B2227" ${OL(4)}/><rect x="720" y="1060" width="60" height="60" rx="10" fill="#1B2227" ${OL(4)}/>
   <g transform="translate(0 ${ty})"><rect x="455" y="-280" width="170" height="560" rx="60" fill="${K.tram}" ${OL(6)}/><rect x="475" y="-240" width="130" height="480" rx="40" fill="${K.tramSh}"/>
     <path d="M 455 0 H 625" stroke="${K.ol}" stroke-width="5"/><rect x="520" y="90" width="40" height="70" rx="6" fill="#3A4248"/></g>
   ${sparks}
   ${[[220, 300], [880, 360], [200, 1300], [860, 1400]].map(([x, y]) => `<rect x="${x - 90}" y="${y - 70}" width="180" height="140" rx="10" fill="#2B3943" ${OL(5)}/>`).join('')}
   ${snow(t, 30, 13, 20, .9)}
   ${FG(1420)}`;
}
function s12(t) { // street level: tram stopped, dark traffic light, rocks
  const rock = 4 * ring(t, 22.0, 1.6, 3);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-100, 1080, 600, 11, 5, { fh: 90, seed: 21, col: '#18232A', refl: 1 })}${tower(620, 1080, 600, 13, 5, { fh: 80, seed: 22, col: '#18232A', refl: 1 })}
   <rect x="0" y="1060" width="1080" height="860" fill="#AEBEC7"/>
   <path d="M 0 360 L 1080 300" stroke="${K.ol}" stroke-width="4"/>
   <g transform="rotate(${rock} 540 1300)"><path d="M 160 1320 L 180 760 Q 190 700 260 690 L 820 690 Q 890 700 900 760 L 920 1320 Z" fill="${K.tram}" ${OL(6)}/>
    <rect x="230" y="760" width="620" height="260" rx="20" fill="#1A2329" ${OL(5)}/>
    ${[0, 1, 2].map(i => `<circle cx="${340 + i * 200}" cy="${880 + 10 * Math.sin(t * 2 + i)}" r="40" fill="#0B1014"/><rect x="${300 + i * 200}" y="${915 + 10 * Math.sin(t * 2 + i)}" width="80" height="110" rx="30" fill="#0B1014"/>`).join('')}
    <rect x="160" y="1150" width="760" height="34" fill="${K.tramB}"/>
    <circle cx="270" cy="1240" r="34" fill="#3A4248" ${OL(5)}/><circle cx="810" cy="1240" r="34" fill="#3A4248" ${OL(5)}/>
    <path d="M 540 690 L 600 600 L 520 540 L 640 540" fill="none" stroke="${K.ol}" stroke-width="7"/></g>
   <rect x="50" y="560" width="22" height="760" fill="${K.steelSh}" ${OL(4)}/><rect x="20" y="420" width="82" height="200" rx="14" fill="#1B2227" ${OL(5)}/>${[0, 1, 2].map(i => `<circle cx="61" cy="${460 + i * 60}" r="20" fill="#2C3439"/>`).join('')}
   ${snow(t, 50, 7, 60)}
   ${FG(1400)}`;
}
function s13(t) { // over Jonas' shoulder: opposite towers, all black; he leans to the glass
  const lean = eout(prog(t, 23.7, 24.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <circle cx="200" cy="260" r="46" fill="${K.coldHi}" opacity=".7"/><circle cx="200" cy="260" r="160" fill="url(#kCold)" opacity=".5"/>
   ${tower(60, 1320, 420, 16, 5, { fh: 66, seed: 31, col: '#1C2830', refl: 1 })}${tower(560, 1320, 460, 15, 5, { fh: 70, seed: 32, col: '#1C2830', refl: 1 })}
   ${snow(t, 36, 15)}
   <rect x="0" y="0" width="1080" height="1920" fill="none" stroke="#0D1519" stroke-width="60"/>
   <path d="M 540 0 V 1920" stroke="#0D1519" stroke-width="26"/>
   ${breath(t, 24.4, 640, 1070, 0)}${breath(t, 25.2, 640, 1070, 0)}
   ${jonas(720, 1400 - 20 * lean, 1.5, { back: true, u: .15, aL: [10, 4], aR: [10, 4], noArmL: true, noArmR: true })}
   ${FG(1500)}`;
}
function s14(t) { // finger wipes the fogged glass: every window black
  const w = eio(prog(t, 25.5, 26.9)), fx = lerp(120, 960, w), fy = 820 + 30 * Math.sin(w * Math.PI);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-80, 1600, 1240, 13, 9, { fh: 110, seed: 41, col: '#1C2830', refl: 1 })}
   <rect x="0" y="0" width="1080" height="1920" fill="#C8D8E2" opacity=".3"/>
   <path d="M 120 830 Q ${(120 + fx) / 2} ${fy + 50} ${fx} ${fy}" stroke="#0E1418" stroke-width="140" stroke-linecap="round" opacity="${w > .02 ? .7 : 0}" fill="none"/>
   ${tower(-80, 1600, 1240, 13, 9, { fh: 110, seed: 41, col: '#1C2830' }).slice(0, 0)}
   <g transform="translate(${fx} ${fy})"><path d="M 0 0 L 160 300" stroke="${K.ol}" stroke-width="88" stroke-linecap="round"/><path d="M 0 0 L 160 300" stroke="${K.skin}" stroke-width="70" stroke-linecap="round"/>
     <path d="M 150 290 L 280 520" stroke="${K.ol}" stroke-width="120"/><path d="M 150 290 L 280 520" stroke="${K.park}" stroke-width="100"/><ellipse cx="-4" cy="-6" rx="22" ry="16" fill="#F3D3B8"/></g>
   ${FG(1420)}`;
}
function s15(t) { // Jonas grabs his phone, the screen lights his face
  const reach = eio(prog(t, 27.3, 27.75)), lift = eout(prog(t, 27.9, 28.3));
  const ph = (x, y) => phone(x + 10, y - 50, 1, -8, { on: lift });
  return `${kitchen(t)}
   ${lift < .5 ? phone(800, 1180, 1, 80, { on: 0 }) : ''}
   ${jonas(500, 1030, 1, { aR: lift < .5 ? [lerp(10, 50, reach), lerp(6, 70, reach)] : [lerp(50, 30, lift), lerp(70, -150, lift)], holdR: lift >= .5 ? ph : null, look: lift > .5 ? 12 : 14, lookY: lift > .5 ? -2 : 10, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .3) })}
   ${lift > 0 ? `<ellipse cx="600" cy="850" rx="300" ry="300" fill="url(#kCold)" opacity="${.5 * lift}"/>` : ''}
   ${FG()}`;
}
function s16(t) { // phone close: signal bars 4 → 2
  const drop = prog(t, 28.9, 29.1);
  let bars = ''; for (let i = 0; i < 4; i++) { const on = i < 2 || drop < (i === 3 ? .5 : 1) ; bars += `<rect x="${-120 + i * 70}" y="${-40 - i * 50}" width="46" height="${80 + i * 50}" rx="8" fill="${on ? '#FFFFFF' : '#5C6A72'}" opacity="${on ? 1 : .5}"/>`; }
  const pop = back(prog(t, 29.0, 29.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <ellipse cx="540" cy="850" rx="600" ry="640" fill="url(#kCold)" opacity=".6"/>
   <path d="M 1100 1500 L 760 1180" stroke="${K.ol}" stroke-width="250"/><path d="M 1100 1500 L 760 1180" stroke="${K.park}" stroke-width="226"/>
   <g transform="translate(540 860) rotate(${-4 + 2 * Math.sin(t * 2)})">
    <rect x="-250" y="-460" width="500" height="920" rx="60" fill="#1A2126" ${OL(8)}/><rect x="-220" y="-420" width="440" height="840" rx="30" fill="#2E4654"/>
    <g transform="translate(0 40) scale(${1 + .08 * pop * (1 - prog(t, 29.3, 29.6))})">${bars}</g>
    <rect x="80" y="-380" width="90" height="40" rx="8" fill="none" stroke="#fff" stroke-width="5"/><rect x="88" y="-372" width="56" height="24" fill="#fff"/>
   </g>
   <circle cx="790" cy="1170" r="70" fill="${K.skin}" ${OL(6)}/><ellipse cx="760" cy="1060" rx="40" ry="70" fill="${K.skin}" ${OL(6)} transform="rotate(-30 760 1060)"/>
   ${FG(1420)}`;
}
function s17(t) { // cell mast on the roof; signal arcs shrink
  const blinkR = Math.floor(t * 1.6) % 2;
  const sh = 1 - prog(t, 30.3, 32.0) * .7;
  let arcs = ''; for (let i = 0; i < 3; i++) { const p = ((t * .9 + i / 3) % 1); arcs += `<path d="M ${540 - (100 + 300 * p) * sh} ${560 - 60 * p} Q 540 ${360 - 240 * p * sh} ${540 + (100 + 300 * p) * sh} ${560 - 60 * p}" fill="none" stroke="#9DB8C8" stroke-width="${8 * (1 - p)}" opacity="${(1 - p) * sh}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${arcs}
   <path d="M 540 500 L 470 1150 M 540 500 L 610 1150 M 495 900 L 585 900 M 480 1050 L 600 1050 M 510 700 L 570 700 M 490 800 L 590 950 M 590 800 L 490 950" stroke="${K.steel}" stroke-width="12" fill="none"/>
   <rect x="430" y="560" width="40" height="150" rx="6" fill="#C9D2D8" ${OL(5)}/><rect x="610" y="560" width="40" height="150" rx="6" fill="#C9D2D8" ${OL(5)}/>
   <circle cx="540" cy="480" r="16" fill="${blinkR ? K.red : '#5A2025'}"/>${blinkR ? `<circle cx="540" cy="480" r="80" fill="url(#kRed)"/>` : ''}
   <rect x="0" y="1150" width="1080" height="770" fill="#1C2830" ${OL(6)}/><rect x="0" y="1150" width="1080" height="30" fill="#CBD8DF"/>
   <rect x="660" y="1020" width="200" height="140" rx="10" fill="#3A464E" ${OL(5)}/><circle cx="830" cy="1050" r="8" fill="#5BE08A"/>
   ${snow(t, 40, 17, 80)}
   ${FG(1420)}`;
}
function s18(t) { // battery inside the mast cabinet drains
  const lvl = 1 - eio(prog(t, 32.0, 33.2)) * .78;
  const low = lvl < .3;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#2B353B"/>
   <rect x="120" y="200" width="840" height="1180" rx="20" fill="#3A464E" ${OL(8)}/>
   ${[0, 1, 2, 3].map(i => `<rect x="170" y="${260 + i * 70}" width="740" height="44" rx="6" fill="#222B30"/><circle cx="880" cy="${282 + i * 70}" r="9" fill="${i < 3 ? '#5BE08A' : K.red}"/>`).join('')}
   <g transform="translate(540 940)">
    <rect x="-260" y="-150" width="480" height="300" rx="28" fill="#1A2126" ${OL(8)}/><rect x="220" y="-60" width="50" height="120" rx="10" fill="#1A2126" ${OL(6)}/>
    <rect x="-234" y="-124" width="${428 * lvl}" height="248" rx="14" fill="${low ? K.red : '#5BE08A'}"/>
    <path d="M -10 -90 L -60 10 L 0 10 L -30 100 L 60 -20 L 0 -20 L 30 -90 Z" fill="#fff" opacity=".85"/>
   </g>
   ${low ? `<circle cx="540" cy="940" r="400" fill="url(#kRed)" opacity="${.5 + .3 * Math.sin(t * 12)}"/>` : ''}
   ${FG(1420)}`;
}
function s19(t) { // hallway cupboard: phone torch, door creaks open, crank radio revealed
  const open = eio(prog(t, 34.1, 34.8)), rev = back(prog(t, 35.0, 35.3));
  const beamA = -8 + 6 * Math.sin(t * 1.5);
  return `${flatWall({ wx: -400 })}
   <rect x="430" y="300" width="560" height="1100" fill="#10171B" ${OL(6)}/>
   <rect x="450" y="700" width="520" height="16" fill="${K.wood}"/><rect x="450" y="1000" width="520" height="16" fill="${K.wood}"/>
   <rect x="740" y="560" width="180" height="140" rx="10" fill="#4A3A2C" ${OL(4)}/><rect x="500" y="900" width="150" height="100" rx="8" fill="#3A464E" ${OL(4)}/>
   <g transform="rotate(${beamA} 330 820)"><polygon points="330,800 1100,560 1100,1180 330,840" fill="url(#kBeam)" opacity=".75"/></g>
   ${radio(720, 880, .8 * cl(.6 + .4 * rev), { t, dial: 0, crank: .6 })}
   ${rev > 0 ? `<ellipse cx="720" cy="880" rx="${260 * rev}" ry="${200 * rev}" fill="url(#kAmb)" opacity=".7"/>` : ''}
   <polygon points="990,300 ${990 - 560 * (1 - open)},300 ${990 - 560 * (1 - open)},1400 990,1400" fill="${K.woodSh}" ${OL(6)}/>
   <polygon points="430,300 ${430 - 120 * open},260 ${430 - 120 * open},1440 430,1400" fill="${K.wood}" ${OL(6)}/>
   ${jonas(170, 1160, .95, { aR: [60, -95], look: 14, lookY: 2, brow: rev > .5 ? 'up' : 'worry', mouth: rev > .5 ? 'o' : 'flat', holdR: (x, y) => phone(x + 20, y - 20, .9, 70, { on: 1 }) })}
   ${FG()}`;
}
function s20(t) { // memory: the gift he once laughed at (warm sepia frame)
  const pop = back(prog(t, 35.92, 36.2)), laugh = t > 37.4 ? Math.abs(Math.sin((t - 37.4) * 11)) * prog(t, 37.4, 37.6) : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <g transform="translate(540 820) scale(${pop}) rotate(${-2})">
    <rect x="-450" y="-560" width="900" height="1100" rx="24" fill="#F1E2C6" ${OL(8)}/>
    <rect x="-410" y="-520" width="820" height="900" fill="#C79A62"/>
    <rect x="-410" y="-520" width="820" height="900" fill="#FFD9A0" opacity=".25"/>
    <path d="M -410 140 H 410" stroke="#8A6A44" stroke-width="10"/><circle cx="260" cy="-330" r="70" fill="#FFF0C8" opacity=".6"/>
    <g transform="translate(0 ${-400})">${jonas(-40, 0, .8, { brow: 'up', mouth: laugh > .02 ? 'grin' : 'smile', tilt: -6 - 10 * laugh, hdy: -10 * laugh, look: 8, lookY: 6, aL: [26, -110], aR: [26, -110] })}</g>
    <g transform="translate(-20 ${-90 - 14 * laugh})">${radio(0, 0, .55, { t, crank: .3 })}<path d="M -60 -70 Q -100 -130 -30 -110 Q 0 -140 20 -100 Q 80 -130 50 -70" fill="${K.red}" ${OL(4)}/></g>
    <rect x="-410" y="-520" width="820" height="900" fill="url(#kMem)"/>
   </g>
   ${laugh > 0 ? `${TX('HA', 330, 380 - 20 * laugh, 70, '#FFE2A8', 'middle', `opacity="${laugh}"`)}` : ''}`;
}
function s21(t) { // he cranks: handle spins, dial warms up
  const sp = prog(t, 38.15, 38.4), ang = (t - 38.12) * 14 * sp;
  const dial = prog(t, 38.3, 39.0);
  let ml = ''; for (let i = 0; i < 3; i++) ml += `<path d="M ${780 + 0} ${640} A ${150 + i * 25} ${150 + i * 25} 0 0 1 ${780 + (150 + i * 25) * Math.cos(ang - .8 - i * .2)} ${640 + (150 + i * 25) * Math.sin(ang - .8 - i * .2)}" fill="none" stroke="#FFE2A8" stroke-width="${6 - i}" opacity="${.6 * sp}"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   ${radio(420, 860, 2.4, { t, crank: ang, dial, needle: .3 + .2 * dial })}
   ${ml}
   ${(() => { const hx = 420 + 2.4 * (150 + 70 * Math.cos(ang)), hy = 860 + 2.4 * (10 + 70 * Math.sin(ang)); return `<path d="M ${hx} ${hy} L 1150 ${hy + 300}" stroke="${K.ol}" stroke-width="150" stroke-linecap="round"/><path d="M ${hx} ${hy} L 1150 ${hy + 300}" stroke="${K.park}" stroke-width="128" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="62" fill="${K.skin}" ${OL(6)}/>`; })()}
   ${FG(1420)}`;
}
function s22(t) { // radio close: static waves, speaker vibrates
  let wav = ''; for (let i = 0; i < 4; i++) { const p = ((t - 39.08) * 1.2 + i / 4) % 1; wav += `<path d="M ${280 - 240 * p} ${620} Q ${180 - 280 * p} 900 ${280 - 240 * p} 1180" fill="none" stroke="#FFE2A8" stroke-width="${10 * (1 - p)}" opacity="${1 - p}"/>`; }
  let st = ''; const k = Math.floor(t * 15);
  for (let i = 0; i < 9; i++) st += `<rect x="${600 + hash(k + i) * 340}" y="${320 + hash(k * 3 + i) * 300}" width="${20 + 60 * hash(i + k)}" height="5" fill="#fff" opacity=".5"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   ${radio(540, 900, 2.6, { t, dial: 1, crank: 1.2, vib: 2.5, needle: .5 + .05 * Math.sin(t * 9) })}
   ${wav}${st}
   ${FG(1420)}`;
}
function s23(t) { // pull-out: to the horizon, the whole region is dark
  const z = lerp(1.35, 1, eout(prog(t, 40.9, 42.6)));
  let far = ''; for (let i = 0; i < 26; i++) { const h = 30 + 120 * hash(i * 2.1), x = i * 44 - 20; far += `<rect x="${x}" y="${900 - h}" width="40" height="${h}" fill="#152027"/>`; }
  let vil = ''; for (let i = 0; i < 14; i++) vil += `<rect x="${i * 80 + 20 * hash(i)}" y="${960 + 20 * hash(i + 3)}" width="40" height="26" fill="#1A2329"/><polygon points="${i * 80 + 20 * hash(i) - 4},${960 + 20 * hash(i + 3)} ${i * 80 + 20 * hash(i) + 20},${940 + 20 * hash(i + 3)} ${i * 80 + 20 * hash(i) + 44},${960 + 20 * hash(i + 3)}" fill="#1A2329"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${[0, 1, 2].map(i => `<ellipse cx="${(t * 40 + i * 420) % 1400 - 200}" cy="${300 + i * 120}" rx="260" ry="50" fill="#2A3A42" opacity=".6"/>`).join('')}
   <g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    ${far}
    <path d="M 0 905 Q 540 880 1080 905 V 1920 H 0 Z" fill="#AFC0C9"/>${vil}
    <path d="M -40 1200 Q 540 1060 1120 1250" stroke="#7F939D" stroke-width="16" fill="none"/>
    ${tower(-80, 1500, 300, 8, 4, { fh: 70, seed: 51, col: '#18232A' })}${tower(860, 1500, 300, 9, 4, { fh: 70, seed: 52, col: '#18232A' })}
   </g>
   ${snow(t, 40, 19)}${FG(1420)}`;
}
function s24(t) { // faces lit by the dial; "?"
  const q = back(prog(t, 43.2, 43.5));
  const up = eout(prog(t, 42.9, 43.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <ellipse cx="540" cy="1120" rx="620" ry="520" fill="url(#kAmb)" opacity=".75"/>
   ${jonas(360, 1040, 1.1, { look: 10, lookY: 10, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .4), aL: [10, 6], aR: [24, -30] })}
   ${mia(760, 1110, 1.0, { look: lerp(0, -14, up), lookY: lerp(10, -8, up), brow: 'worry', mouth: up > .5 ? 'worried' : 'smile', tilt: -6 * up, aL: [24, -30] })}
   <g transform="translate(560 1330)">${radio(0, 0, .9, { t, dial: 1, crank: 1.2, needle: .5, vib: 1.5 })}</g>
   ${q > 0 ? `<g transform="translate(560 380) scale(${q})">${TX('?', 0, 80, 260, K.amb, 'middle', `stroke="${K.ol}" stroke-width="10" paint-order="stroke"`)}</g>` : ''}
   ${FG(1460)}`;
}
function s25(t) { // drawer with candles slides out — Jonas pushes it shut
  const out = eout(prog(t, 44.24, 44.6)), shut = ein(prog(t, 45.05, 45.26));
  const dx = 420 * out * (1 - shut), [sx, sy] = shk(t, 45.26, 12);
  let c = ''; for (let i = 0; i < 4; i++) c += `<rect x="${-300 + i * 140}" y="-60" width="40" height="160" rx="8" fill="#F1E8D2" ${OL(4)} transform="rotate(80)"/>`;
  return `<g transform="translate(${sx} ${sy})">${flatWall({ wx: -200 })}
   <rect x="100" y="700" width="880" height="740" fill="${K.wood}" ${OL(6)}/>
   <g transform="translate(0 ${dx})"><rect x="140" y="560" width="800" height="260" fill="${K.woodSh}" ${OL(6)}/><rect x="160" y="580" width="760" height="70" fill="#2A1F18"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${210 + i * 130}" y="590" width="100" height="34" rx="10" fill="#F1E8D2" ${OL(4)}/><line x1="${210 + i * 130}" y1="607" x2="${190 + i * 130}" y2="607" stroke="${K.ol}" stroke-width="5"/>`).join('')}
    <rect x="740" y="630" width="120" height="70" rx="6" fill="${K.red}" ${OL(4)}/>
    <rect x="140" y="700" width="800" height="120" fill="${K.wood}" ${OL(6)}/><rect x="480" y="740" width="120" height="24" rx="10" fill="${K.steelHi}" ${OL(4)}/></g>
   <g transform="translate(${lerp(1200, 620, eout(prog(t, 44.7, 45.0)))} ${700 + dx})"><path d="M 0 0 L 500 300" stroke="${K.ol}" stroke-width="150" stroke-linecap="round"/><path d="M 0 0 L 500 300" stroke="${K.park}" stroke-width="128" stroke-linecap="round"/><circle cx="-10" cy="0" r="64" fill="${K.skin}" ${OL(6)}/></g>
   ${t > 45.26 ? rings(t, 45.26, 540, 800, '#fff', 2, 300) : ''}
   ${FG()}</g>`;
}
function s26(t) { // "Wasser": eyes widen, a drop falls from the tap and splashes
  const wide = back(prog(t, 46.5, 46.75));
  const dp = prog(t, 46.25, 46.75), dy = lerp(760, 1180, ein(dp));
  const spl = prog(t, 46.75, 47.2);
  return `${kitchen(t)}
   ${jonas(300, 1060, 1.05, { look: 14, lookY: 6, eyeS: 1 + .35 * wide, brow: wide > .3 ? 'up' : 'calm', mouth: wide > .3 ? 'o' : 'flat' })}
   <rect x="560" y="1170" width="460" height="60" rx="8" fill="${K.steelSh}" ${OL(5)}/>
   ${tap(690, 760, 1.1)}
   ${dp < 1 ? `<path d="M 828 ${dy - 30} Q 846 ${dy} 828 ${dy + 14} Q 810 ${dy} 828 ${dy - 30} Z" fill="${K.water}" ${OL(4)}/>` : ''}
   ${spl > 0 && spl < 1 ? `<ellipse cx="828" cy="1180" rx="${30 + 120 * spl}" ry="${10 + 26 * spl}" fill="none" stroke="${K.waterHi}" stroke-width="${8 * (1 - spl)}"/>` : ''}
   <ellipse cx="828" cy="1000" rx="${200 * wide}" ry="${260 * wide}" fill="url(#kCold)" opacity=".5"/>
   ${FG()}`;
}
function s27(t) { // building cut-away: pump in the basement pushes water up the riser
  const fl = 16, top = 170, bot = 1300, fh = (bot - top) / fl;
  const up = eio(prog(t, 47.5, 49.96)), wy = lerp(bot + 80, top + 10, up);
  let floors = ''; for (let f = 0; f < fl; f++) { const y = bot - (f + 1) * fh; floors += `<rect x="200" y="${y}" width="680" height="${fh}" fill="${f === 13 ? '#2E3C44' : '#1F2A32'}" stroke="#0B0F12" stroke-width="4"/>${f === 13 ? `<circle cx="760" cy="${y + fh / 2}" r="12" fill="${K.amb}"/>` : ''}`; }
  let dash = ''; for (let i = 0; i < 18; i++) { const y = bot + 80 - ((t * 260 + i * 70) % 1300); if (y > wy) dash += `<rect x="372" y="${y}" width="16" height="30" rx="8" fill="${K.waterHi}"/>`; }
  const rot = t * 600;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <polygon points="180,${top} 540,${top - 90} 900,${top}" fill="${K.concHi}" ${OL(5)}/>
   ${floors}
   <rect x="160" y="${bot}" width="760" height="200" fill="#151C21" ${OL(5)}/>
   <rect x="360" y="${top}" width="40" height="${bot + 110 - top}" fill="#0E1418" ${OL(4)}/>
   <rect x="364" y="${wy}" width="32" height="${bot + 110 - wy}" fill="url(#kWat)"/>${dash}
   <g transform="translate(380 ${bot + 110})"><circle cx="0" cy="0" r="56" fill="${K.steel}" ${OL(5)}/><g transform="rotate(${rot})"><path d="M -40 0 H 40 M 0 -40 V 40" stroke="${K.ol}" stroke-width="12"/></g></g>
   <path d="M 950 ${bot} V ${top + 40}" stroke="#fff" stroke-width="8" stroke-dasharray="20 14" opacity=".8"/><polygon points="930,${top + 60} 950,${top + 20} 970,${top + 60}" fill="#fff"/>
   ${lab('14. STOCK', 600, bot - 13.5 * fh, 44, back(prog(t, 49.0, 49.3)))}
   ${FG(1460)}`;
}
function s28(t) { // pump close: lightning bolt flashes, goes grey; rotor spins down
  const off = t >= 51.46;
  const spin = off ? 600 * 51.46 + 600 * (1 - Math.exp(-(t - 51.46) * 2)) / 2 : t * 600;
  const fl = t > 50.72 && t < 51.46 ? (Math.floor(t * 12) % 2 ? 1 : .5) : 1;
  const [sx, sy] = shk(t, 51.46, 10);
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="#151C21"/>
   <rect x="0" y="1180" width="1080" height="740" fill="#10161A"/>
   <rect x="0" y="620" width="1080" height="70" fill="${K.steelSh}" ${OL(5)}/>
   <rect x="200" y="760" width="520" height="420" rx="30" fill="${K.steel}" ${OL(7)}/>
   <circle cx="460" cy="970" r="160" fill="#222B30" ${OL(6)}/>
   <g transform="translate(460 970) rotate(${spin})">${[0, 1, 2, 3, 4].map(i => `<path d="M 0 0 Q 60 -30 120 ${-10}" stroke="${K.steelHi}" stroke-width="22" fill="none" transform="rotate(${i * 72})" stroke-linecap="round"/>`).join('')}<circle r="26" fill="${K.steelHi}" ${OL(4)}/></g>
   <rect x="720" y="900" width="200" height="60" fill="${K.steelSh}" ${OL(5)}/>
   <g transform="translate(540 420)" opacity="${fl}"><path d="M 20 -150 L -70 20 L 0 20 L -40 160 L 90 -30 L 20 -30 L 70 -150 Z" fill="${off ? '#5C6A72' : K.amb}" ${OL(6)}/>
    ${off ? `<line x1="-120" y1="-120" x2="140" y2="140" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>` : `<circle r="200" fill="url(#kAmb)"/>`}</g>
   ${FG(1420)}</g>`;
}
function s29(t) { // sink: hand turns the tap ... pause ... it still runs
  const tr = eio(prog(t, 52.62, 53.2)), on = t > 53.98;
  const w = on ? lerp(0, 34, eout(prog(t, 53.98, 54.1))) : 0;
  const relief = eout(prog(t, 54.2, 54.6));
  return `${kitchen(t)}
   <g opacity=".9">${jonas(250, 1100, 1.0, { look: 14, lookY: 8, brow: on ? 'up' : 'worry', mouth: on ? (relief > .5 ? 'smile' : 'o') : 'flat', blink: blinkAt(t, 1.5), aR: [70, -70] })}</g>
   <rect x="520" y="1160" width="560" height="80" rx="8" fill="${K.steelSh}" ${OL(5)}/><rect x="560" y="1170" width="480" height="40" fill="#151C21"/>
   ${tap(680, 760, 1.2, { handle: -60 * tr })}
   ${stream(825, 800, 1180, w, t)}
   ${on && t < 54.6 ? rings(t, 53.98, 825, 1180, K.waterHi, 2, 160) : ''}
   <g transform="translate(${680 - 140 + 70 * tr} ${660})"><circle r="56" fill="${K.skin}" ${OL(6)}/></g>
   ${FG()}`;
}
function s30(t) { // Mia holds a pot, then a bottle under the stream
  const a = prog(t, 55.4, 56.4), swap = t > 56.45, b = prog(t, 56.5, 56.9);
  return `${kitchen(t)}
   ${tap(560, 700, 1.1)}
   ${stream(700, 740, swap ? 1020 : 1000, 30, t)}
   ${mia(780, 1210, 1.0, { aL: [40, -130], aR: [10, 4], look: -14, lookY: 10, brow: 'up', mouth: 'smile', tilt: -6 })}
   ${swap ? bottle(700, 1260, 1.0, b) : pot(700, 1180, .9, a)}
   ${FG()}`;
}
function s31(t) { // counter fills up with containers: ting, ting, ting; watering can
  const items = [[150, 55.82, 'pot'], [370, 56.2, 'b'], [520, 56.54, 'b'], [670, 56.9, 'b'], [880, 57.46, 'can']];
  let s = '';
  items.forEach(([x, t0, k]) => { const p = back(prog(t, t0, t0 + .25)); if (p <= 0) return; s += `<g transform="translate(${x} 1200) scale(${p}) translate(${-x} -1200)">${k === 'pot' ? pot(x, 1200, .8, 1) : k === 'b' ? bottle(x, 1200, .8, 1, { cap: 0 }) : wcan(x - 40, 1200, .8, 1)}</g>`; });
  return `${kitchen(t)}
   ${mia(540, 880, .8, { aL: [70, 40], aR: [70, 40], look: 0, lookY: 8, brow: 'up', mouth: talkAt(t, 57.4, 57.8) > 0 ? 'grin' : 'smile', hdy: -8 * Math.abs(Math.sin(t * 6)) })}
   <rect x="0" y="1200" width="1080" height="30" fill="#151C21"/>
   ${s}
   ${FG(1360)}`;
}
function s32(t) { // drain plug pushed in
  const p = eio(prog(t, 58.82, 59.1));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#E6EDF1"/><rect x="0" y="0" width="1080" height="1920" fill="${K.bg}" opacity=".55"/>
   <ellipse cx="540" cy="900" rx="520" ry="360" fill="#D5DEE3" ${OL(8)}/><ellipse cx="540" cy="900" rx="470" ry="310" fill="#BCC8CF"/>
   <circle cx="540" cy="960" r="60" fill="#5A6A74" ${OL(5)}/>${[0, 1, 2].map(i => `<line x1="${510 + i * 30}" y1="930" x2="${510 + i * 30}" y2="990" stroke="${K.ol}" stroke-width="6"/>`).join('')}
   <path d="M 540 ${lerp(640, 930, p)} Q 700 ${lerp(500, 700, p)} 880 520" fill="none" stroke="${K.steelHi}" stroke-width="8" stroke-dasharray="14 8"/>
   <g transform="translate(540 ${lerp(640, 950, p)})"><ellipse cx="0" cy="0" rx="70" ry="32" fill="#2A2A2A" ${OL(5)}/><rect x="-10" y="-50" width="20" height="40" fill="${K.steelHi}" ${OL(3)}/></g>
   <g transform="translate(540 ${lerp(560, 870, p)})"><path d="M 0 0 L 300 -400" stroke="${K.ol}" stroke-width="140" stroke-linecap="round"/><path d="M 0 0 L 300 -400" stroke="${K.park}" stroke-width="118" stroke-linecap="round"/><ellipse cx="0" cy="-4" rx="62" ry="54" fill="${K.skin}" ${OL(6)}/></g>
   ${t > 59.1 ? rings(t, 59.1, 540, 950, K.waterHi, 2, 200) : ''}
   ${FG(1420)}`;
}
function s33(t) { // bathroom: tub fills, Jonas kneels and checks
  const lv = eio(prog(t, 60.6, 62.4));
  let tl = ''; for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) tl += `<rect x="${c * 122}" y="${r * 100}" width="120" height="98" fill="${(r + c) % 2 ? K.tile : K.tileSh}"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>${tl}
   <polygon points="0,200 300,200 800,1300 0,1300" fill="${K.coldHi}" opacity=".06"/>
   ${tap(140, 820, .9)}${stream(258, 850, 1100, 26, t)}
   <path d="M 60 1000 L 1020 1000 L 980 1300 Q 970 1340 930 1340 L 150 1340 Q 110 1340 100 1300 Z" fill="#E6EDF1" ${OL(7)}/>
   <rect x="90" y="${lerp(1290, 1040, lv)}" width="900" height="${lerp(40, 290, lv)}" fill="url(#kWat)" opacity=".85"/>
   <path d="M 120 ${lerp(1290, 1040, lv)} Q 540 ${lerp(1280, 1030, lv) + 6 * Math.sin(t * 8)} 960 ${lerp(1290, 1040, lv)}" fill="none" stroke="${K.waterHi}" stroke-width="8"/>
   <path d="M 60 1000 L 1020 1000" stroke="${K.ol}" stroke-width="12"/><rect x="50" y="970" width="980" height="40" rx="20" fill="#F3F6F8" ${OL(6)}/>
   ${jonas(740, 820, .9, { look: -10, lookY: 12, brow: 'calm', mouth: 'flat', aL: [40, 70], aR: [10, 10], blink: blinkAt(t, 2) })}
   <rect x="50" y="970" width="980" height="40" rx="20" fill="#F3F6F8" ${OL(6)}/>
   ${FG(1380)}`;
}
function s34(t) { // closed bottles: caps screw on, one by one
  let s = '';
  for (let i = 0; i < 5; i++) { const t0 = 62.6 + i * .38, c = eout(prog(t, t0, t0 + .3)); s += bottle(160 + i * 190, 1250, 1.05, 1, { cap: c }); }
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
   <ellipse cx="540" cy="900" rx="560" ry="500" fill="url(#kAmb)" opacity=".45"/>
   <rect x="0" y="1250" width="1080" height="700" fill="${K.wood}" ${OL(6)}/>
   ${s}
   <path d="M 540 560 Q 600 640 540 700 Q 480 640 540 560 Z" fill="${K.water}" ${OL(5)} transform="translate(540 630) scale(${1 + .15 * back(prog(t, 62.5, 62.8))}) translate(-540 -630)"/>
   ${FG(1420)}`;
}
function s35(t) { // the tub is for flushing and washing: bucket to toilet, washcloth
  const sc = eio(prog(t, 64.84, 65.3)), pour = prog(t, 65.4, 65.9), wash = prog(t, 65.96, 66.9);
  const bx = lerp(540, 300, sc), by = lerp(1150, 780, sc), tilt = -70 * eout(pour);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <rect x="0" y="0" width="1080" height="1300" fill="${K.tile}"/>
   <path d="M 340 1200 L 980 1200 L 960 1360 L 360 1360 Z" fill="#E6EDF1" ${OL(6)}/><rect x="350" y="1210" width="620" height="30" fill="${K.water}"/>
   <g><rect x="80" y="700" width="180" height="120" rx="20" fill="#E6EDF1" ${OL(6)}/><path d="M 60 840 Q 60 1000 170 1010 Q 280 1000 280 840 Z" fill="#E6EDF1" ${OL(6)}/><ellipse cx="170" cy="845" rx="110" ry="30" fill="#BCC8CF" ${OL(5)}/>
    ${pour > 0 && pour < 1 ? `<path d="M ${bx - 60} ${by} Q 200 ${by + 20} 180 845" stroke="${K.water}" stroke-width="22" fill="none"/>` : ''}</g>
   <g transform="translate(${bx} ${by}) rotate(${tilt})"><path d="M -70 -80 L 70 -80 L 54 60 L -54 60 Z" fill="#E07A3A" ${OL(6)}/><path d="M -70 -80 Q 0 -170 70 -80" fill="none" stroke="${K.ol}" stroke-width="6"/>${sc > .5 ? `<ellipse cx="0" cy="-74" rx="62" ry="12" fill="${K.water}"/>` : ''}</g>
   <g transform="translate(800 760)"><rect x="-140" y="-40" width="280" height="40" fill="#E6EDF1" ${OL(5)}/><path d="M -130 0 Q 0 140 130 0" fill="#E6EDF1" ${OL(6)}/>
    <g transform="translate(${60 * Math.sin(wash * 14)} ${-120})"><rect x="-70" y="-40" width="140" height="80" rx="14" fill="#7CC6E6" ${OL(5)}/><circle cx="-50" cy="-30" r="30" fill="${K.skin}" ${OL(5)}/><circle cx="50" cy="-30" r="30" fill="${K.skin}" ${OL(5)}/></g>
    ${wash > 0 ? [0, 1, 2].map(i => `<circle cx="${-60 + i * 60}" cy="${-200 - 60 * ((wash * 3 + i * .3) % 1)}" r="${12 + 4 * i}" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>`).join('') : ''}</g>
   ${FG(1420)}`;
}
function s36(t) { // 18:10 — the stream gets thinner
  const p = back(prog(t, 67.62, 67.95)), w = lerp(34, 7, eio(prog(t, 68.3, 69.3)));
  return `${kitchen(t)}
   ${jonas(250, 1100, 1.0, { look: 14, lookY: 8, brow: 'worry', mouth: 'worried', blink: blinkAt(t), aR: [40, -20] })}
   <rect x="520" y="1160" width="560" height="80" rx="8" fill="${K.steelSh}" ${OL(5)}/>
   ${tap(680, 760, 1.2, { handle: -60 })}
   ${stream(825, 800, 1180, w + 2 * Math.sin(t * 30), t)}
   ${lab('18:10', 540, 330, 140, p)}
   ${FG()}`;
}
function s37(t) { // extreme close: drip … drip
  let d = '';
  const per = .55;
  const k = (t - 69.9) / per, ph = k - Math.floor(k);
  const grow = cl(ph / .6), fall = ph > .6 ? (ph - .6) / .4 : 0;
  d += `<ellipse cx="540" cy="${760 + 30 * grow + 700 * fall * fall}" rx="${18 + 14 * grow}" ry="${22 + 24 * grow}" fill="${K.water}" ${OL(5)}/>`;
  const sp = ph < .25 && t > 70.3 ? ph / .25 : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <ellipse cx="540" cy="700" rx="500" ry="500" fill="url(#kCold)" opacity=".4"/>
   <path d="M -40 300 Q 200 260 420 300 L 460 340 Q 470 560 470 720 L 610 720 Q 610 520 600 300 Q 560 180 420 180 Q 180 160 -40 200 Z" fill="${K.steelHi}" ${OL(8)}/>
   <rect x="460" y="700" width="160" height="40" rx="10" fill="${K.steel}" ${OL(6)}/>
   ${d}
   <rect x="0" y="1300" width="1080" height="620" fill="#151C21"/><ellipse cx="540" cy="1310" rx="360" ry="40" fill="${K.waterSh}" opacity=".6"/>
   ${sp > 0 ? `<ellipse cx="540" cy="1310" rx="${30 + 200 * sp}" ry="${8 + 26 * sp}" fill="none" stroke="${K.waterHi}" stroke-width="${8 * (1 - sp)}"/>` : ''}
   ${FG(1420)}`;
}
function s38(t) { // Mia laughs relieved among the full containers
  const hop = -40 * Math.abs(Math.sin((t - 71.6) * 5)) * prog(t, 71.6, 71.8) * (1 - prog(t, 73.6, 74.3));
  return `${kitchen(t)}
   <ellipse cx="540" cy="1100" rx="600" ry="440" fill="url(#kAmb)" opacity=".5"/>
   ${jonas(250, 1080, .95, { look: 12, lookY: 4, brow: 'calm', mouth: 'smile', blink: blinkAt(t, .9), aL: [10, 4], aR: [30, -40] })}
   ${mia(720, 1130 + hop, .95, { aL: [150, 170], aR: [150, 170], brow: 'up', mouth: talkAt(t, 72.9, 73.6) > 0 ? 'grin' : 'grin', talk: talkAt(t, 72.92, 73.6) * .6, look: -6, lookY: 0, tilt: 8 * Math.sin(t * 6), sway: Math.sin(t * 6) })}
   <g transform="translate(560 1320)">${radio(0, 0, .55, { t, dial: 1, crank: 1.2 })}</g>
   ${pot(140, 1360, .7, 1)}${bottle(860, 1360, .7, 1)}${bottle(960, 1360, .7, 1)}${wcan(330, 1380, .55, 1)}
   ${FG(1420)}`;
}
function s39(t) { // the smile drops: knock at the door
  const frz = eout(prog(t, 74.4, 74.7)), turn = eio(prog(t, 75.3, 75.7));
  const kn = [76.02, 76.3, 76.58];
  let dj = 0, rg = '';
  kn.forEach(k => { dj += 8 * ring(t, k, 9, 9); rg += rings(t, k, 860, 820, '#fff', 2, 220); });
  return `${flatWall({ wx: -300 })}
   <rect x="700" y="360" width="320" height="960" fill="#0B1014" ${OL(6)}/>
   <g transform="translate(${dj} 0)"><rect x="716" y="376" width="288" height="944" fill="#3A3026" ${OL(5)}/><circle cx="740" cy="860" r="18" fill="${K.steelHi}" ${OL(4)}/><circle cx="860" cy="560" r="12" fill="#0B0F12"/></g>
   ${rg}
   ${jonas(330, 1120, 1.15, { hdx: 20 * turn, look: lerp(-4, 14, turn), lookY: -2, brow: frz > .5 ? 'up' : 'calm', mouth: frz > .5 ? 'o' : 'smile', eyeS: 1 + .2 * frz, tilt: 6 * turn, aR: [lerp(10, 40, frz), lerp(6, -30, frz)], holdR: (x, y) => phone(x + 10, y - 40, .8, -10, { on: 1 }) })}
   ${FG()}`;
}
function s40(t) { // stairwell: torch on the lift doors, they shudder with every knock
  const kn = [77.05, 77.45, 77.85, 78.25];
  let dj = 0, dust = '';
  kn.forEach((k, i) => { dj += 6 * ring(t, k, 11, 9); if (t > k) for (let j = 0; j < 5; j++) { const dt = t - k, p = prog(dt, 0, .8); if (p < 1) dust += `<circle cx="${420 + j * 60 + i * 10}" cy="${470 + 300 * dt * dt + 40 * j % 3}" r="4" fill="#C9D2D8" opacity="${1 - p}"/>`; } });
  const beam = -4 + 3 * Math.sin(t * 2.3);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1A2227"/>
   <rect x="0" y="1240" width="1080" height="680" fill="#11171B"/>
   <rect x="300" y="420" width="480" height="840" fill="#222B30" ${OL(6)}/>
   <g transform="translate(${dj} 0)"><rect x="320" y="460" width="215" height="800" fill="${K.steel}" ${OL(5)}/><rect x="545" y="460" width="215" height="800" fill="${K.steel}" ${OL(5)}/>
    <path d="M 340 480 V 1240 M 740 480 V 1240" stroke="${K.steelHi}" stroke-width="10" opacity=".6"/></g>
   <rect x="820" y="760" width="60" height="110" rx="10" fill="#2B3439" ${OL(4)}/><circle cx="850" cy="815" r="14" fill="#3A464E"/>
   <g transform="rotate(${beam} -40 1100)"><polygon points="-40,1080 1000,560 1000,1320 -40,1120" fill="url(#kBeam)" opacity=".55"/></g>
   <ellipse cx="540" cy="860" rx="300" ry="380" fill="url(#kAmb)" opacity=".35"/>
   ${dust}
   ${kn.map(k => rings(t, k, 540, 860, '#fff', 1, 260)).join('')}
   ${FG()}`;
}
function s41(t) { // camera sinks into the shaft
  const d = eio(prog(t, 78.48, 80.1)) * 520;
  let cab = '';
  for (let i = 0; i < 6; i++) cab += `<rect x="200" y="${i * 360 - 200 + (d % 360)}" width="680" height="16" fill="#2B353B"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0D1316"/>
   <rect x="160" y="0" width="760" height="1920" fill="#141C20" ${OL(6)}/>
   ${cab}
   <path d="M 470 0 V 1920 M 610 0 V 1920" stroke="#3A464E" stroke-width="8"/>
   <g transform="translate(0 ${1250 - d * .9})"><rect x="240" y="0" width="600" height="60" fill="${K.steelSh}" ${OL(5)}/><rect x="240" y="60" width="600" height="500" fill="${K.steel}" ${OL(5)}/>
    <rect x="510" y="-60" width="60" height="60" fill="#3A464E" ${OL(4)}/></g>
   <ellipse cx="540" cy="${1300 - d * .9}" rx="300" ry="120" fill="url(#kAmb)" opacity=".4"/>
   ${FG(1420)}`;
}
function s42(t) { // cut-away: someone stuck between floor 14 and 13, knocking
  const kn = [80.6, 81.0, 81.4, 81.9, 82.3];
  let jx = 0; kn.forEach(k => jx += 5 * ring(t, k, 10, 9));
  const arm = kn.some(k => t > k - .12 && t < k + .05) ? -20 : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <rect x="0" y="380" width="1080" height="40" fill="#2B3943" ${OL(5)}/><rect x="0" y="1060" width="1080" height="40" fill="#2B3943" ${OL(5)}/>
   ${lab('14. STOCK', 760, 330, 46, 1)}
   <rect x="300" y="0" width="480" height="1400" fill="#0B1014"/>
   <path d="M 400 0 V 1400 M 680 0 V 1400" stroke="#3A464E" stroke-width="8"/>
   <g transform="translate(${jx} 0)"><rect x="330" y="560" width="420" height="640" fill="${K.steelSh}" ${OL(6)}/><rect x="350" y="580" width="380" height="600" fill="#1A2227"/>
    <ellipse cx="540" cy="880" rx="260" ry="320" fill="url(#kRed)" opacity="${.55 + .2 * Math.sin(t * 7)}"/>
    <circle cx="520" cy="820" r="60" fill="#0B0F12"/><path d="M 440 1180 L 450 920 Q 520 880 590 920 L 600 1180 Z" fill="#0B0F12"/>
    <path d="M 580 930 L ${680 + arm} 860" stroke="#0B0F12" stroke-width="36" stroke-linecap="round"/><circle cx="${690 + arm}" cy="852" r="24" fill="#0B0F12"/></g>
   ${kn.map(k => rings(t, k, 740, 850, K.red, 1, 200)).join('')}
   <rect x="0" y="380" width="300" height="40" fill="#2B3943"/><rect x="780" y="380" width="300" height="40" fill="#2B3943"/>
   ${FG(1420)}`;
}
function s43(t) { // Jonas at the lift door, looks at YOU; "?"; torch clicks off → loop
  const q = back(prog(t, 84.2, 84.45)), off = t > 85.0;
  const turn = eout(prog(t, 82.85, 83.25));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1A2227"/>
   <rect x="560" y="300" width="520" height="1100" fill="${K.steel}" ${OL(6)}/><path d="M 820 300 V 1400" stroke="${K.ol}" stroke-width="6"/>
   ${off ? '' : `<ellipse cx="540" cy="900" rx="520" ry="560" fill="url(#kCold)" opacity=".5"/>`}
   ${jonas(460, 1160, 1.3, { look: lerp(14, 0, turn), lookY: 0, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .2), tilt: -4 * turn, aR: [40, -60], holdR: (x, y) => phone(x + 6, y - 40, .85, -20, { on: off ? 0 : 1 }) })}
   ${q > 0 ? `<g transform="translate(830 560) scale(${q})">${TX('?', 0, 90, 300, K.red, 'middle', `stroke="${K.ol}" stroke-width="12" paint-order="stroke"`)}</g>` : ''}
   ${off ? `<rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity="${.85 * prog(t, 85.0, 85.15)}"/>` : ''}
   ${FG()}`;
}

const SHOTS = [
  [0, s01], [2.26, s02], [4.66, s03], [6.58, s04], [8.3, s05], [10.5, s06], [12.26, s07], [14.6, s08], [17.24, s09],
  [18.7, s10], [20.2, s11], [22.0, s12], [23.64, s13], [25.5, s14], [27.26, s15], [28.84, s16], [30.12, s17], [32.0, s18],
  [33.94, s19], [35.92, s20], [38.12, s21], [39.08, s22], [40.9, s23], [42.7, s24], [44.24, s25], [46.14, s26], [47.36, s27],
  [50.28, s28], [52.44, s29], [55.2, s30], [56.9, s31], [58.82, s32], [60.6, s33], [62.44, s34], [64.7, s35], [67.24, s36],
  [69.9, s37], [71.54, s38], [74.34, s39], [76.94, s40], [78.48, s41], [80.1, s42], [82.78, s43],
];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  return MYDEFS + f(t);
}

</scene_js>
<events_json>{"music": "horror_tension", "events": [{"t": 0.0, "type": "ambience", "dur": 4.6, "gain": 0.3}, {"t": 0.1, "type": "whoosh", "dur": 1.2, "gain": 0.5, "pan": 0.6}, {"t": 0.42, "type": "hit", "gain": 0.8, "weight": "hero"}, {"t": 2.26, "type": "whoosh", "dur": 0.5, "gain": 0.3}, {"t": 3.24, "type": "click", "gain": 0.3}, {"t": 3.44, "type": "click", "gain": 0.3}, {"t": 3.7, "type": "hit", "gain": 0.9, "weight": "hero"}, {"t": 5.0, "type": "switch", "gain": 0.5}, {"t": 5.4, "type": "switch", "gain": 0.5}, {"t": 6.6, "type": "whoosh", "dur": 0.6, "gain": 0.5}, {"t": 7.15, "type": "stamp", "gain": 0.6}, {"t": 8.3, "type": "air", "dur": 2.0, "gain": 0.4}, {"t": 8.5, "type": "slide", "f0": 600, "f1": 200, "dur": 1.1, "gain": 0.3}, {"t": 9.54, "type": "stamp", "gain": 0.6}, {"t": 10.62, "type": "air", "dur": 0.8, "gain": 0.3}, {"t": 10.9, "type": "rustle", "dur": 1.0, "gain": 0.3}, {"t": 12.6, "type": "creak", "dur": 0.6, "gain": 0.4}, {"t": 12.8, "type": "pop", "f0": 500, "f1": 900, "gain": 0.3}, {"t": 15.98, "type": "womp", "gain": 0.4}, {"t": 16.4, "type": "rustle", "dur": 0.5, "gain": 0.3}, {"t": 17.6, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 17.8, "type": "tick", "f": 1300, "gain": 0.2}, {"t": 18.0, "type": "tick", "f": 1100, "gain": 0.2}, {"t": 18.75, "type": "click", "gain": 0.4}, {"t": 19.3, "type": "switch", "gain": 0.4}, {"t": 20.2, "type": "ambience", "dur": 3.4, "gain": 0.3}, {"t": 20.44, "type": "static", "dur": 0.4, "gain": 0.4}, {"t": 21.0, "type": "slide", "f0": 400, "f1": 120, "dur": 0.9, "gain": 0.35}, {"t": 22.0, "type": "clank", "gain": 0.5}, {"t": 23.64, "type": "air", "dur": 2.0, "gain": 0.3}, {"t": 25.5, "type": "rustle", "dur": 1.3, "gain": 0.3}, {"t": 27.5, "type": "rustle", "dur": 0.4, "gain": 0.3}, {"t": 28.12, "type": "pop", "f0": 700, "f1": 1200, "gain": 0.3}, {"t": 29.02, "type": "tick", "f": 900, "gain": 0.35}, {"t": 29.1, "type": "tick", "f": 700, "gain": 0.35}, {"t": 30.12, "type": "static", "dur": 0.6, "gain": 0.2}, {"t": 32.0, "type": "riser", "dur": 1.0, "f0": 200, "f1": 500, "gain": 0.3}, {"t": 33.06, "type": "alarm", "dur": 0.6, "gain": 0.3}, {"t": 34.1, "type": "creak", "dur": 0.7, "gain": 0.5}, {"t": 35.04, "type": "shimmer", "dur": 0.6, "gain": 0.35}, {"t": 35.92, "type": "whoosh", "dur": 0.4, "gain": 0.3}, {"t": 37.48, "type": "pop", "f0": 400, "f1": 700, "gain": 0.3}, {"t": 38.15, "type": "tick", "f": 800, "gain": 0.3}, {"t": 38.4, "type": "tick", "f": 850, "gain": 0.3}, {"t": 38.65, "type": "tick", "f": 900, "gain": 0.3}, {"t": 38.9, "type": "tick", "f": 950, "gain": 0.3}, {"t": 39.08, "type": "static", "dur": 1.8, "gain": 0.45}, {"t": 40.9, "type": "whoosh", "dur": 1.5, "gain": 0.35}, {"t": 43.22, "type": "pop", "f0": 300, "f1": 600, "gain": 0.35}, {"t": 44.3, "type": "slide", "f0": 300, "f1": 500, "dur": 0.3, "gain": 0.3}, {"t": 45.26, "type": "thud", "gain": 0.7, "weight": "hero"}, {"t": 46.75, "type": "drip", "gain": 0.6}, {"t": 47.5, "type": "riser", "dur": 2.4, "f0": 200, "f1": 700, "gain": 0.3}, {"t": 49.96, "type": "ting", "f": 659.25, "gain": 0.35}, {"t": 50.72, "type": "static", "dur": 0.7, "gain": 0.3}, {"t": 51.46, "type": "hit", "gain": 0.75, "weight": "hero"}, {"t": 51.5, "type": "slide", "f0": 500, "f1": 80, "dur": 0.9, "gain": 0.35}, {"t": 52.62, "type": "creak", "dur": 0.5, "gain": 0.4}, {"t": 53.98, "type": "whoosh", "dur": 0.6, "gain": 0.45}, {"t": 54.0, "type": "drip", "gain": 0.4}, {"t": 55.82, "type": "ting", "f": 440, "gain": 0.35}, {"t": 56.2, "type": "ting", "f": 493.88, "gain": 0.3}, {"t": 56.54, "type": "ting", "f": 523.25, "gain": 0.35}, {"t": 56.9, "type": "ting", "f": 587.33, "gain": 0.35}, {"t": 57.46, "type": "ting", "f": 659.25, "gain": 0.4}, {"t": 59.1, "type": "plop", "f": 220, "gain": 0.6}, {"t": 60.6, "type": "drip", "gain": 0.3}, {"t": 62.9, "type": "click", "gain": 0.35}, {"t": 63.28, "type": "click", "gain": 0.35}, {"t": 63.66, "type": "click", "gain": 0.35}, {"t": 64.04, "type": "click", "gain": 0.35}, {"t": 64.42, "type": "click", "gain": 0.35}, {"t": 64.84, "type": "plop", "f": 300, "gain": 0.4}, {"t": 65.46, "type": "whoosh", "dur": 0.5, "gain": 0.35}, {"t": 65.96, "type": "rustle", "dur": 0.9, "gain": 0.3}, {"t": 67.62, "type": "stamp", "gain": 0.6}, {"t": 68.3, "type": "riser", "dur": 1.0, "f0": 500, "f1": 250, "gain": 0.25}, {"t": 70.33, "type": "drip", "gain": 0.6}, {"t": 70.88, "type": "drip", "gain": 0.6}, {"t": 71.43, "type": "drip", "gain": 0.5}, {"t": 71.7, "type": "pop", "f0": 500, "f1": 900, "gain": 0.3}, {"t": 74.4, "type": "heart", "gain": 0.5}, {"t": 76.02, "type": "knock_heavy", "gain": 0.8, "weight": "hero"}, {"t": 77.05, "type": "clank", "gain": 0.6}, {"t": 77.45, "type": "clank", "gain": 0.55}, {"t": 77.85, "type": "clank", "gain": 0.6}, {"t": 78.25, "type": "clank", "gain": 0.55}, {"t": 78.48, "type": "whoosh", "dur": 1.4, "gain": 0.35}, {"t": 80.1, "type": "heart", "gain": 0.4}, {"t": 80.6, "type": "clank", "gain": 0.5}, {"t": 81.0, "type": "clank", "gain": 0.5}, {"t": 81.4, "type": "clank", "gain": 0.5}, {"t": 81.9, "type": "clank", "gain": 0.5}, {"t": 82.3, "type": "clank", "gain": 0.5}, {"t": 84.2, "type": "hit", "gain": 0.7, "weight": "hero"}, {"t": 85.0, "type": "switch", "gain": 0.5}]}</events_json>
<storyboard_json>[{"t0": 0, "t1": 2.26, "lines": [0], "title_vi": "17:42", "desc_vi": "Khu Plattenbau sáng đèn, tàu điện lướt qua, thẻ 17:42 đập vào khung."}, {"t0": 2.26, "t1": 4.66, "lines": [0], "title_vi": "Cả Grünau tắt", "desc_vi": "Nhìn từ trên cao: đèn chớp hai lần rồi cả khu tối cùng lúc, khung rung."}, {"t0": 4.66, "t1": 6.58, "lines": [1], "title_vi": "Công tắc chết", "desc_vi": "Jonas trong bếp bật công tắc hai lần – không có điện, ngước nhìn đèn."}, {"t0": 6.58, "t1": 8.3, "lines": [1], "title_vi": "14. STOCK", "desc_vi": "Máy quay vút lên mặt tòa nhà tối đến ô cửa tầng 14, nhãn 14. STOCK."}, {"t0": 8.3, "t1": 10.5, "lines": [2], "title_vi": "−8 °C", "desc_vi": "Nhiệt kế ngoài cửa sổ tụt xuống −8 °C, băng giá lan trên kính, tuyết bay."}, {"t0": 10.5, "t1": 12.26, "lines": [2], "title_vi": "Thứ Ba tháng Giêng", "desc_vi": "Jonas thở ra khói, xoa tay; lịch treo tường khoanh đỏ ngày thứ Ba."}, {"t0": 12.26, "t1": 14.6, "lines": [3], "title_vi": "Mia gọi", "desc_vi": "Mia ló ra từ cửa phòng tối, cầm máy tính bảng, gọi bố."}, {"t0": 14.6, "t1": 17.24, "lines": [3], "title_vi": "Mất wifi", "desc_vi": "Cận Mia giơ máy tính bảng: biểu tượng wifi bị gạch đỏ, cô bé lắc máy."}, {"t0": 17.24, "t1": 18.7, "lines": [4], "title_vi": "Không chỉ wifi", "desc_vi": "Jonas quay đầu, đèn router tắt từng cái một."}, {"t0": 18.7, "t1": 20.2, "lines": [5], "title_vi": "Tủ lạnh im bặt", "desc_vi": "Mở tủ lạnh: đèn trong tủ chớp rồi tắt, tiếng ù dừng."}, {"t0": 20.2, "t1": 22.0, "lines": [5], "title_vi": "Tàu điện dừng", "desc_vi": "Nhìn thẳng từ trên xuống: tàu điện tóe lửa ở dây rồi dừng giữa ngã tư."}, {"t0": 22.0, "t1": 23.64, "lines": [5], "title_vi": "Giữa ngã tư", "desc_vi": "Tàu điện đứng im, hành khách trong bóng tối, đèn giao thông tắt."}, {"t0": 23.64, "t1": 25.5, "lines": [6], "title_vi": "Tòa đối diện", "desc_vi": "Qua vai Jonas bên cửa sổ: các tòa nhà đối diện tối đen."}, {"t0": 25.5, "t1": 27.26, "lines": [6], "title_vi": "Không một ô sáng", "desc_vi": "Ngón tay lau lớp hơi nước trên kính: mọi ô cửa đều đen."}, {"t0": 27.26, "t1": 28.84, "lines": [7], "title_vi": "Cầm điện thoại", "desc_vi": "Jonas với lấy điện thoại, màn hình soi sáng mặt."}, {"t0": 28.84, "t1": 30.12, "lines": [7], "title_vi": "Hai vạch", "desc_vi": "Cận màn hình: sóng từ bốn vạch rớt còn hai."}, {"t0": 30.12, "t1": 32.0, "lines": [8], "title_vi": "Trạm phát sóng", "desc_vi": "Cột ăng-ten trên mái, đèn đỏ nhấp nháy, sóng thu nhỏ dần."}, {"t0": 32.0, "t1": 33.94, "lines": [8], "title_vi": "Pin dự phòng cạn", "desc_vi": "Trong tủ trạm: pin tụt dần sang màu đỏ."}, {"t0": 33.94, "t1": 35.92, "lines": [9], "title_vi": "Radio quay tay", "desc_vi": "Đèn pin điện thoại soi tủ hành lang, cửa mở, radio cam lộ ra."}, {"t0": 35.92, "t1": 38.12, "lines": [9], "title_vi": "Món quà bị cười", "desc_vi": "Hồi ức màu ấm: Jonas cười ha hả khi nhận chiếc radio có nơ."}, {"t0": 38.12, "t1": 39.08, "lines": [10], "title_vi": "Anh quay", "desc_vi": "Cận tay quay radio xoay tít, mặt số sáng dần."}, {"t0": 39.08, "t1": 40.9, "lines": [11], "title_vi": "Tiếng rè", "desc_vi": "Cận radio: loa rung, sóng âm và nhiễu."}, {"t0": 40.9, "t1": 42.7, "lines": [11], "title_vi": "Leipzig và vùng quanh", "desc_vi": "Kéo lùi ra đường chân trời: thành phố và làng mạc đều tối."}, {"t0": 42.7, "t1": 44.24, "lines": [11], "title_vi": "Chưa rõ nguyên nhân", "desc_vi": "Jonas và Mia sáng mặt dưới ánh radio, dấu ? hiện lên."}, {"t0": 44.24, "t1": 46.14, "lines": [12], "title_vi": "Không phải nến", "desc_vi": "Ngăn kéo đầy nến trượt ra, tay Jonas đóng sập lại."}, {"t0": 46.14, "t1": 47.36, "lines": [13], "title_vi": "Nước", "desc_vi": "Mắt Jonas mở to, một giọt nước rơi từ vòi."}, {"t0": 47.36, "t1": 50.28, "lines": [14], "title_vi": "Máy bơm đẩy nước", "desc_vi": "Mặt cắt tòa nhà: máy bơm dưới hầm đẩy nước lên tới tầng 14."}, {"t0": 50.28, "t1": 52.44, "lines": [15], "title_vi": "Bơm cần điện", "desc_vi": "Cận máy bơm: tia sét bị gạch, cánh quạt quay chậm rồi dừng."}, {"t0": 52.44, "t1": 55.2, "lines": [16], "title_vi": "Vẫn còn chảy", "desc_vi": "Tay vặn vòi, một nhịp chờ, nước phụt ra; Jonas nhẹ nhõm."}, {"t0": 55.2, "t1": 56.9, "lines": [17], "title_vi": "Hứng nồi, chai", "desc_vi": "Mia hứng nồi rồi đổi sang chai dưới vòi."}, {"t0": 56.9, "t1": 58.82, "lines": [17], "title_vi": "Bình tưới", "desc_vi": "Mặt bếp đầy dần: nồi, chai, bình tưới hiện lần lượt kèm tiếng ting."}, {"t0": 58.82, "t1": 60.6, "lines": [18], "title_vi": "Nút bồn tắm", "desc_vi": "Tay ấn nút cao su vào lỗ thoát nước."}, {"t0": 60.6, "t1": 62.44, "lines": [18], "title_vi": "Xả đầy bồn", "desc_vi": "Bồn tắm đầy dần, Jonas cúi xuống kiểm tra."}, {"t0": 62.44, "t1": 64.7, "lines": [19], "title_vi": "Chai đậy kín", "desc_vi": "Hàng chai nước lần lượt được vặn nắp."}, {"t0": 64.7, "t1": 67.24, "lines": [19], "title_vi": "Bồn để dội và rửa", "desc_vi": "Xô múc nước từ bồn đổ vào toilet, tay giặt khăn ở bồn rửa."}, {"t0": 67.24, "t1": 69.9, "lines": [20], "title_vi": "18:10", "desc_vi": "Thẻ 18:10, dòng nước nhỏ dần, Jonas lo lắng."}, {"t0": 69.9, "t1": 71.54, "lines": [21], "title_vi": "Nhỏ giọt", "desc_vi": "Cận đầu vòi: từng giọt rơi."}, {"t0": 71.54, "t1": 74.34, "lines": [22], "title_vi": "Mình có đủ rồi", "desc_vi": "Mia nhảy cẫng giữa nồi chai, Jonas mỉm cười."}, {"t0": 74.34, "t1": 76.94, "lines": [23], "title_vi": "Tiếng gõ", "desc_vi": "Nụ cười tắt, Jonas quay về phía cửa, cánh cửa rung theo tiếng gõ."}, {"t0": 76.94, "t1": 78.48, "lines": [24], "title_vi": "Cửa thang máy", "desc_vi": "Hành lang cầu thang: cửa thép thang máy rung từng nhịp gõ, bụi rơi."}, {"t0": 78.48, "t1": 80.1, "lines": [24], "title_vi": "Giếng thang", "desc_vi": "Máy quay chìm xuống giếng thang máy tối."}, {"t0": 80.1, "t1": 82.78, "lines": [25], "title_vi": "Kẹt giữa hai tầng", "desc_vi": "Mặt cắt: cabin kẹt giữa hai tầng, bóng người bên trong đập tay, ánh đỏ."}, {"t0": 82.78, "t1": 85.596, "lines": [26], "title_vi": "Bạn làm gì?", "desc_vi": "Jonas nhìn thẳng người xem, dấu ? đỏ, đèn pin tắt."}]</storyboard_json>
