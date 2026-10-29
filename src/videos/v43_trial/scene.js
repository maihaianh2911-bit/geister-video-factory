// v43 second art trial — only the first 15 real seconds are rendered.
// The original v43 module and production video are unchanged.
import {cl,prog,eio,eout,ein,back,lerp,ring,hash,DEFS,scallop} from '../../engine/core.js';
export const subtitleStyle='default';
const move=(x,y,s,rot,body)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;
const op=(a,body)=>a>0?`<g opacity="${cl(a)}">${body}</g>`:'';
const pop=(t,a,d=.25)=>back(prog(t,a,a+d),1.05);
const P = { paper: '#F4EFE6', grid: '#E3DCCF', ink: '#2B2B2B', blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', teal: '#14A38B', purple: '#7A5AF8', mark: '#FFD84D', lav: '#E4DCFF', soft: '#DDD5C7' };
const SANS = `font-family:'Inter';font-weight:900`;
const SERIF = `font-family:'Liberation Serif','DejaVu Serif',serif;font-style:italic;font-weight:400`;

const fit = (txt, max, w = 860, k = 0.74) => Math.min(max, w / (Math.max(1, txt.length) * k));

// ---------- primitives ----------
function kw(txt, x, y, size, col, t0, t, o = {}) {
  if (t < t0) return '';
  const p = back(prog(t, t0, t0 + .24));
  const pulse = o.pulse ? 1 + .05 * Math.sin(prog(t, o.pulse, o.pulse + .35) * Math.PI) : 1;
  const idle = 1 + .008 * Math.sin(t * 3.1 + x * .01);
  const s = (o.from !== undefined ? lerp(o.from, 1, p) : p) * pulse * idle;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})" opacity="${o.from !== undefined ? 1 : cl(prog(t, t0, t0 + .08) * 1.2)}"><text x="0" y="0" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px;letter-spacing:-1px" fill="${col}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 8}" paint-order="stroke"` : ''}>${txt}</text></g>`;
}
function words(list, x, y, size, t, col = P.ink) {
  // list: [[word, t0], ...] — one centred serif-italic line, each word appears when spoken
  if (t < list[0][1]) return '';
  const sp = list.map(([w, t0]) => `<tspan fill-opacity="${cl(prog(t, t0, t0 + .12))}">${w} </tspan>`).join('');
  const dy = 18 * (1 - eout(prog(t, list[0][1], list[0][1] + .25)));
  return `<text x="${x}" y="${y + dy}" text-anchor="middle" style="${SERIF};font-size:${size}px" fill="${col}">${sp}</text>`;
}
function marker(x, y, w, h, t0, t1, t, col = P.mark) {
  const p = eout(prog(t, t0, t1));
  if (p <= 0) return '';
  return `<path d="M ${x} ${y + h * .15} L ${x + w * p} ${y} L ${x + w * p} ${y + h} L ${x} ${y + h * .9} Z" fill="${col}" opacity=".85"/>`;
}
function check(x, y, s, t0, t, col = P.teal) {
  const p = eout(prog(t, t0, t0 + .28));
  if (p <= 0) return '';
  return `<path d="M ${x - 40 * s} ${y} L ${x - 10 * s} ${y + 32 * s} L ${x + 48 * s} ${y - 40 * s}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function cross(x, y, s, t0, t, col = P.red) {
  const a = eout(prog(t, t0, t0 + .16)), b = eout(prog(t, t0 + .14, t0 + .3));
  if (a <= 0) return '';
  return `<path d="M ${x - 38 * s} ${y - 38 * s} L ${x + 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${a} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>
    ${b > 0 ? `<path d="M ${x + 38 * s} ${y - 38 * s} L ${x - 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${b} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>` : ''}`;
}
function stamp(txt, x, y, size, col, rot, t0, t) {
  if (t < t0 - .12) return '';
  const p = prog(t, t0 - .12, t0);
  const s = lerp(2.4, 1, ein(p)) * (1 + .06 * ring(t, t0, 5, 9));
  const w = txt.length * size * .74 + 60, h = size * 1.25;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${cl(p * 2)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="10"/>
    <rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="8" fill="none" stroke="${col}" stroke-width="3"/>
    <text x="0" y="4" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px" fill="${col}">${txt}</text></g>`;
}
function burst(x, y, t0, t, col = P.ink, n = 8, r0 = 70, r1 = 150) {
  const p = prog(t, t0, t0 + .35);
  if (p <= 0 || p >= 1) return '';
  let g = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + .3, ra = lerp(r0, r1, eout(p)), rb = lerp(r0, r1, eout(cl(p * 1.6)));
    g += `<line x1="${x + Math.cos(a) * ra}" y1="${y + Math.sin(a) * ra}" x2="${x + Math.cos(a) * rb}" y2="${y + Math.sin(a) * rb}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return g;
}
function dashBox(x, y, w, h, t0, t, col = P.ink) {
  const p = eout(prog(t, t0, t0 + .3));
  if (p <= 0) return '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${col}" stroke-width="5" stroke-dasharray="22 14" stroke-dashoffset="${-t * 40}" pathLength="${1000}" opacity="${p}" transform="translate(${x + w / 2} ${y + h / 2}) scale(${lerp(1.15, 1, p)}) translate(${-x - w / 2} ${-y - h / 2})"/>`;
}

// ---------- icons ----------
function brain(x, y, s, o = {}) {
  const t = o.t || 0, look = o.look || 0;
  const br = 1 + .025 * Math.sin(t * 4);
  const mouth = o.mouth === 'o' ? `<ellipse cx="0" cy="48" rx="14" ry="16" fill="${P.ink}"/>` : o.mouth === 'sad' ? `<path d="M -22 56 Q 0 38 22 56" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>` : `<path d="M -24 40 Q 0 62 24 40" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const blink = o.blink ? .15 : 1;
  return `<g transform="translate(${x} ${y}) scale(${s * br} ${s / br}) rotate(${o.tilt || 0})">
    <ellipse cx="0" cy="104" rx="${110}" ry="14" fill="${P.ink}" opacity=".12"/>
    <path d="${scallop(0, 0, 130, 98, 11)}" fill="#B9A6FF" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 0 -96 C -10 -50 12 -20 0 20" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -96 -30 q 30 -18 52 6 M -88 40 q 30 10 46 -10 M 50 -60 q 30 4 40 34 M 56 50 q 30 -2 44 -26" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="${-34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/><ellipse cx="${34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/>
    <circle cx="${-30 + look}" cy="-5" r="4" fill="#fff"/><circle cx="${38 + look}" cy="-5" r="4" fill="#fff"/>
    ${mouth}${o.sweat ? `<path d="M 118 -50 q 14 24 0 34 q -14 -10 0 -34 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3" transform="translate(0 ${12 * ((t * 1.6) % 1)})"/>` : ''}
  </g>`;
}
function nameTag(x, y, s, rot, inner = '') {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-300" y="-170" width="600" height="360" rx="34" fill="${P.ink}" opacity=".14" transform="translate(10 16)"/>
    <rect x="-300" y="-180" width="600" height="360" rx="34" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -300 -100 V -146 Q -300 -180 -266 -180 H 266 Q 300 -180 300 -146 V -100 Z" fill="${P.red}" stroke="${P.ink}" stroke-width="6"/>
    <text x="0" y="-130" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:50px;letter-spacing:6px" fill="#fff">HALLO</text>
    <line x1="-230" y1="130" x2="230" y2="130" stroke="${P.soft}" stroke-width="5" stroke-dasharray="14 10"/>
    ${inner}</g>`;
}
// handwritten name inside a tag, revealed left→right by a pen (wipe 0..1) and removed by an eraser (erase 0..1)
function tagName(name, id, wipe, erase, col = P.blue) {
  if (wipe <= 0) return '';
  const x0 = -240 + 480 * erase, x1 = -240 + 480 * wipe;
  if (x1 <= x0) return '';
  return `<clipPath id="${id}"><rect x="${x0}" y="-90" width="${x1 - x0}" height="220"/></clipPath>
    <g clip-path="url(#${id})"><text x="0" y="22" text-anchor="middle" dominant-baseline="central" transform="skewX(-10)" style="${SANS};font-size:150px;letter-spacing:4px" fill="${col}">${name}</text></g>`;
}
function pen(x, y, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M 0 0 L 22 -40 L 60 -170 L 92 -160 L 54 -30 Z" fill="${P.orange}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M 0 0 L 22 -40 L 34 -36 Z" fill="${P.ink}"/></g>`;
}
function eraser(x, y, rot = -20) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-55" y="-120" width="110" height="160" rx="16" fill="#F7A6B4" stroke="${P.ink}" stroke-width="5"/><rect x="-55" y="-120" width="110" height="70" rx="14" fill="${P.blue}" stroke="${P.ink}" stroke-width="5"/></g>`;
}
function crumbs(x, y, t0, t, n = 8) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const dt = t - t0 - i * .04;
    if (dt <= 0 || dt > .8) continue;
    g += `<circle cx="${x + (hash(i + 3) - .5) * 160 + dt * 60 * (hash(i) - .5)}" cy="${y + 40 + 500 * dt * dt + 30 * hash(i + 7)}" r="${4 + 4 * hash(i + 11)}" fill="#E7A3AE" opacity="${1 - dt / .8}"/>`;
  }
  return g;
}
function stopwatch(x, y, r, ang, fill = 0, col = P.red) {
  const a0 = -Math.PI / 2, a1 = a0 + fill * Math.PI * 2;
  const sector = fill > 0.001 ? `<path d="M 0 0 L ${r * .82 * Math.cos(a0)} ${r * .82 * Math.sin(a0)} A ${r * .82} ${r * .82} 0 ${fill > .5 ? 1 : 0} 1 ${r * .82 * Math.cos(a1)} ${r * .82 * Math.sin(a1)} Z" fill="${col}" opacity=".3"/>` : '';
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<line x1="${Math.cos(a) * r * .72}" y1="${Math.sin(a) * r * .72}" x2="${Math.cos(a) * r * .84}" y2="${Math.sin(a) * r * .84}" stroke="${P.ink}" stroke-width="${i % 3 ? 3 : 6}"/>`; }
  return `<g transform="translate(${x} ${y})">
    <rect x="${-r * .16}" y="${-r * 1.28}" width="${r * .32}" height="${r * .26}" rx="6" fill="${P.ink}"/>
    <circle cx="0" cy="0" r="${r}" fill="#fff" stroke="${P.ink}" stroke-width="7"/>${sector}${ticks}
    <line x1="0" y1="0" x2="${Math.cos(ang - Math.PI / 2) * r * .7}" y2="${Math.sin(ang - Math.PI / 2) * r * .7}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    <circle r="${r * .1}" fill="${P.ink}"/></g>`;
}
function person(x, y, s, fill, o = {}) {
  const j = o.jit || 0;
  return `<g transform="translate(${x + j * Math.sin((o.t || 0) * 70)} ${y}) scale(${s})">
    <path d="M -62 96 Q -62 30 0 30 Q 62 30 62 96 Z" fill="${fill}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="0" cy="-12" r="38" fill="${fill}" stroke="${P.ink}" stroke-width="5"/>
    <circle cx="-12" cy="-14" r="4.5" fill="${P.ink}"/><circle cx="12" cy="-14" r="4.5" fill="${P.ink}"/>
    ${o.label ? `<text x="0" y="72" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:36px" fill="#fff">${o.label}</text>` : ''}
    ${o.sweat ? `<path d="M 40 -40 q 10 18 0 26 q -10 -8 0 -26 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3"/>` : ''}</g>`;
}
function bubble(x, y, w, h, tailX, tailY, s, inner, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M ${-w / 2 + 24} ${-h / 2} H ${w / 2 - 24} Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 24} V ${h / 2 - 24} Q ${w / 2} ${h / 2} ${w / 2 - 24} ${h / 2} H ${18} L ${tailX} ${tailY} L ${-14} ${h / 2} H ${-w / 2 + 24} Q ${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 24} V ${-h / 2 + 24} Q ${-w / 2} ${-h / 2} ${-w / 2 + 24} ${-h / 2} Z" fill="#fff" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    ${inner}</g>`;
}

function bike(x, y, s, col = P.blue) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${P.ink}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="-110" cy="40" r="78" stroke-width="12"/><circle cx="110" cy="40" r="78" stroke-width="12"/>
    <circle cx="-110" cy="40" r="10" fill="${P.ink}"/><circle cx="110" cy="40" r="10" fill="${P.ink}"/>
    <path d="M -110 40 L -40 -70 L 70 -70 L 110 40 M -40 -70 L 0 40 L 70 -70 M 0 40 L -110 40" stroke="${col}" stroke-width="16"/>
    <path d="M -60 -100 L -14 -100 M 60 -70 L 50 -120 L 90 -126" stroke="${P.ink}" stroke-width="12"/>
  </g>`;
}
function listing(x, y, s, price, o = {}) { // classifieds-style phone screen, no real logo
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})">
    <rect x="-300" y="-500" width="600" height="1000" rx="70" fill="${P.ink}" opacity=".15" transform="translate(14 18)"/>
    <rect x="-300" y="-500" width="600" height="1000" rx="70" fill="${P.ink}"/>
    <rect x="-270" y="-460" width="540" height="920" rx="40" fill="#FFFFFF"/>
    <rect x="-270" y="-460" width="540" height="100" rx="40" fill="${P.teal}"/><rect x="-270" y="-400" width="540" height="40" fill="${P.teal}"/>
    <rect x="-230" y="-430" width="300" height="40" rx="20" fill="#FFFFFF" opacity=".85"/>
    <rect x="-230" y="-330" width="460" height="340" rx="20" fill="#EAF2F0" stroke="${P.ink}" stroke-width="4"/>
    ${bike(0, -170, .9)}
    <rect x="-230" y="40" width="300" height="26" rx="13" fill="${P.soft}"/><rect x="-230" y="84" width="200" height="26" rx="13" fill="${P.soft}"/>
    ${price}
    <rect x="-230" y="340" width="460" height="80" rx="40" fill="${P.blue}"/><rect x="-150" y="370" width="300" height="20" rx="10" fill="#FFFFFF" opacity=".8"/>
  </g>`;
}

const text=(s,x,y,size,col=P.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px;letter-spacing:-2px" fill="${col}">${s}</text>`;
function paper(t){
 let g=`<rect width="1080" height="1920" fill="${P.paper}"/>`;
 for(let x=0;x<=1080;x+=60)g+=`<path d="M ${x} 0 V 1920" stroke="${P.grid}" stroke-width="2"/>`;
 for(let y=0;y<=1920;y+=60)g+=`<path d="M 0 ${y} H 1080" stroke="${P.grid}" stroke-width="2"/>`;
 // Same soft paper depth as the reference; no added particles or hard shadow cards.
 g+=`<radialGradient id="trialPaper" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#C9BBA4" stop-opacity="0"/><stop offset="1" stop-color="#C9BBA4" stop-opacity=".35"/></radialGradient><rect width="1080" height="1920" fill="url(#trialPaper)"/>`;
 const x=lerp(90,990,cl(t/81.3));
 return g+`<path d="M 90 150 H 990" stroke="${P.ink}" stroke-width="4" opacity=".18" stroke-linecap="round"/><path d="M 90 150 H ${x}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="150" r="11" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>`;
}
function price(t,value='500',color=P.red,scale=1){
 return move(0,225,scale,0,text(value+' € VB',0,0,103,color));
}
function tag(x,y,s,value,color,rot=0){
 return move(x,y,s,rot,`<path d="M -195 -64 H 155 L 214 0 L 155 64 H -195 Z" fill="#FFFFFF" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><circle cx="165" cy="0" r="8" fill="${P.paper}" stroke="${P.ink}" stroke-width="3"/>${text(value,-16,1,100,color)}`);
}
function buyer(x,y,s,t,mood='neutral'){
 const blink=(t>5.96&&t<6.06)||(t>8.92&&t<9.03);
 const tilt=mood==='worried'?-7:mood==='proud'?7:0;
 let g=`<path d="M -62 96 Q -62 30 0 30 Q 62 30 62 96 Z" fill="${P.blue}" stroke="${P.ink}" stroke-width="5"/>`;
 let head=`<circle cy="-12" r="38" fill="${P.blue}" stroke="${P.ink}" stroke-width="5"/><ellipse cx="-12" cy="-16" rx="4.5" ry="${blink?1:4.5}" fill="${P.ink}"/><ellipse cx="12" cy="-16" rx="4.5" ry="${blink?1:4.5}" fill="${P.ink}"/>`;
 if(mood==='worried')head+=`<path d="M -21 -30 l 14 4 M 7 -26 l 14 -4 M -9 9 Q 0 1 9 9" fill="none" stroke="${P.ink}" stroke-width="3.5" stroke-linecap="round"/>`;
 if(mood==='proud')head+=`<path d="M -15 4 Q 0 17 15 4" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`;
 return move(x,y,s,0,g+move(0,0,1,tilt,head));
}
function cage(t){
 const fall=ein(prog(t,5.46,5.86));
 const y=lerp(-740,0,fall)+(t>5.86?9*ring(t,5.86,4.2,10):0);
 let bars='';for(let i=0;i<6;i++)bars+=`<path d="M ${285+i*58} 745 V 1235" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>`;
 return move(0,y,1,0,`<path d="M 265 745 H 595 M 265 1235 H 595" fill="none" stroke="${P.ink}" stroke-width="13" stroke-linecap="round"/>${bars}`);
}
function opening(t){
 const leave=eio(prog(t,4.78,5.16));
 const settle=eout(prog(t,0,.38));
 const x=lerp(540,785,leave),y=lerp(860-65*(1-settle),650,leave),s=lerp(.96,.43,leave);
 const rot=lerp(-3-5*(1-settle),5,leave);
 const pulse=1+.06*Math.sin(prog(t,1.91,2.35)*Math.PI);
 let p=price(t,'500',P.red,pulse);
 p+=marker(38,254,180,16,3.20,3.52,t);
 let g=listing(x,y,s,p,{rot});
 // A single short annotation follows the number; the phone stays light and readable.
 if(t<4.78){
  const a=eout(prog(t,1.91,2.22));
  g+=move(x,y,s,rot,`<path d="M -205 271 Q ${-205+150*a} ${283+8*a} ${-205+303*a} 271" fill="none" stroke="${P.red}" stroke-width="${4*a}" stroke-linecap="round"/>`);
 }
 if(leave>0){
  const enter=eout(prog(t,4.82,5.16));
  g+=buyer(430,lerp(1160,1050,enter),1.75*enter,t,t>=5.86?'worried':'neutral');
  g+=cage(t);
  g+=words([['in',5.50],['der',5.70],['Falle.',5.86]],430,485,76,t);
 }
 return g;
}
function negotiation(t){
 const p=eio(prog(t,6.48,6.85));
 const x=lerp(785,540,p),y=lerp(747,500,p);
 let g=t<7.72?tag(x,y,lerp(.43,1,p),'500',P.red,lerp(5,-4,p)):'';
 const prev=1-eout(prog(t,6.48,6.69));
 g+=op(prev,move(220*(1-prev),-120*(1-prev),1,0,listing(785,650,.43,'',{rot:5})));
 g+=buyer(300,1095,1.3,t,t>=9.5?'proud':'neutral');
 if(t<7.72){
  const a=eout(prog(t,6.72,7.10));
  g+=`<path d="M 540 650 V ${650+485*a}" fill="none" stroke="${P.blue}" stroke-width="17" stroke-linecap="round"/>`;
  if(a>.8)g+=op((a-.8)*5,`<path d="M 483 1073 L 540 1140 L 597 1073" fill="none" stroke="${P.blue}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>`);
  g+=words([['Du',6.48],['willst',6.6],['handeln.',6.8]],540,350,76,t);
 }else{
  const ghost=eio(prog(t,7.72,8.05));
  // Keep the earlier 500 as a pale trace. The new offer remains the only large blue number.
  g=tag(540,500,1,'500',lerpColor(P.red,P.soft,ghost),-4)+g;
  const strike=eout(prog(t,8.26,8.53));
  if(strike>0)g+=`<path d="M 360 519 L ${360+315*strike} ${519-51*strike}" stroke="${P.red}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  const n=pop(t,8.292,.25);
  if(n>0)g+=move(540,835,n,0,text('400',0,0,270,P.blue));
  g+=marker(335,966,410,26,8.61,8.9,t);
  g+=check(730,1130,.85,9.656,t);
 }
 return g;
}
function lerpColor(a,b,p){
 const A=a.slice(1).match(/../g).map(v=>parseInt(v,16)),B=b.slice(1).match(/../g).map(v=>parseInt(v,16));
 return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],p)).toString(16).padStart(2,'0')).join('');
}
function realization(t){
 const enter=eout(prog(t,10.36,10.63));
 const think=eio(prog(t,11.22,11.868));
 let g=op(1-enter,move(0,-90*enter,1,0,text('400',540,835,270,P.blue)));
 g+=brain(420,1060,1.25*enter,{t,look:think*14,mouth:t<11.868?'o':'smile',tilt:-4+4*think});
 g+=words([['Aber',10.36],['dein',10.54],['Gehirn',10.76]],540,350,76,t);
 const bx=lerp(540,690,think),by=lerp(500,685,think);
 if(think<1)g+=op(1-think,tag(bx,by,1,'500',P.soft,-4*(1-think)));
 if(think>0){
  let cloud=`<path d="${scallop(0,0,235,158,12)}" fill="#FFFFFF" stroke="${P.ink}" stroke-width="5"/>`;
  const key=eout(prog(t,11.868,12.03));
  cloud+=text('500',0,0,168,lerpColor(P.soft,P.red,key));
  g+=move(690,685,think,0,cloud);
  g+=op(think,`<circle cx="563" cy="893" r="17" fill="#FFFFFF" stroke="${P.ink}" stroke-width="4"/><circle cx="536" cy="946" r="10" fill="#FFFFFF" stroke="${P.ink}" stroke-width="4"/>`);
  g+=marker(555,756,270,18,11.92,12.25,t);
 }
 return g;
}
function alternative(t){
 const appear=eout(prog(t,13.42,13.72));
 const flip=eio(prog(t,13.76,14.08));
 const sy=Math.max(.07,Math.abs(Math.cos(Math.PI*flip)));
 const val=flip<.5?'500':'300';
 const leave=eio(prog(t,15.58,15.98));
 const x=lerp(540,750,leave),y=lerp(860,780,leave),s=lerp(.95,.65,leave);
 let p=move(0,225,1,0,`<g transform="scale(1 ${sy})">${text(val+' € VB',0,0,103,P.red)}</g>`);
 let g=listing(x,y,s*lerp(.86,1,appear),p,{rot:lerp(-3,2,flip)});
 if(leave>0){
  const amount=pop(t,16.194,.25);
  if(amount>0)g+=move(320,1085,amount,0,text('250',0,0,170,P.blue));
  const a=eout(prog(t,15.70,16.15));
  if(a>0)g+=`<path d="M 652 1060 Q 600 1195 ${652-188*a} ${1060+108*a}" fill="none" stroke="${P.blue}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="${a} 1"/><path d="M 487 1135 L 455 1171 L 504 1174" fill="none" stroke="${P.blue}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="${cl((a-.8)*5)}"/>`;
 }
 return g;
}
export function renderSvg(t){
 let g=t<6.48?opening(t):t<10.36?negotiation(t):t<13.42?realization(t):alternative(t);
 return DEFS+paper(t)+g;
}
export function subtitleAt(t){return '';}
