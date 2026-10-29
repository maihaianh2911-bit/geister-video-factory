// v43 quality trial: three isolated excerpts, with the original voice timeline and subtitle style.
// The existing production video is untouched. Other authored times fall through to v43.
import {renderSvg as originalSvg} from '../v43/scene.js';
import {DEFS} from '../../engine/core.js';

export const subtitleStyle = 'default';
const P = {paper:'#F4EFE6',grid:'#E3DCCF',ink:'#2B2B2B',blue:'#2F4BDB',red:'#E5484D',orange:'#F28C28',teal:'#14A38B',purple:'#7A5AF8',mark:'#FFD84D',soft:'#DDD5C7'};
const clamp = v => Math.max(0, Math.min(1, v));
const ramp = (t,a,b) => clamp((t-a)/Math.max(.001,b-a));
const ease = v => 1 - (1-clamp(v))**3;
const smooth = v => {v=clamp(v);return v*v*(3-2*v);};
const mix = (a,b,p) => a+(b-a)*p;
const txt = (s,x,y,size,color=P.ink,extra='') => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${color}" style="font-family:'Inter';font-weight:900;font-size:${size}px;letter-spacing:-2px" ${extra}>${s}</text>`;
const transform = (x,y,s,body,rot=0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;
const line = (x1,y1,x2,y2,color,width=8,extra='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
function paper(t) {
  let g=`<rect width="1080" height="1920" fill="${P.paper}"/>`;
  for(let x=0;x<=1080;x+=60)g+=line(x,0,x,1920,P.grid,2);
  for(let y=0;y<=1920;y+=60)g+=line(0,y,1080,y,P.grid,2);
  g+=line(90,150,990,150,P.ink,4,'opacity=".18"');
  const x=mix(90,990,clamp(t/81.3));
  return g+line(90,150,x,150,P.ink,4)+`<circle cx="${x}" cy="150" r="11" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>`;
}
function bike(x,y,s) {
  let g=`<g fill="none" stroke="${P.ink}" stroke-linecap="round" stroke-linejoin="round">`;
  for(const cx of [-160,160]) {
    g+=`<circle cx="${cx}" cy="75" r="112" stroke-width="11"/><circle cx="${cx}" cy="75" r="96" stroke="${P.soft}" stroke-width="3"/>`;
    for(let i=0;i<8;i++){const a=i*Math.PI/4;g+=line(cx,75,cx+108*Math.cos(a),75+108*Math.sin(a),P.soft,3);}
    g+=`<circle cx="${cx}" cy="75" r="12" fill="${P.ink}"/>`;
  }
  g+=`<path d="M -160 75 L -58 -95 L 95 -95 L 160 75 M -58 -95 L 0 75 L 95 -95 M 0 75 L -160 75" stroke="${P.blue}" stroke-width="18" fill="none"/>`;
  g+=line(-82,-133,-25,-133,P.ink,13)+line(-58,-95,-70,-132,P.ink,11)+`<path d="M 95 -95 L 74 -154 L 130 -163" stroke="${P.ink}" stroke-width="12" fill="none"/><circle cx="0" cy="75" r="23" stroke="${P.ink}" stroke-width="8"/>`;
  g+=line(0,75,44,104,P.ink,8)+line(34,105,65,105,P.ink,8)+line(-160,75,0,75,P.ink,3);
  return transform(x,y,s,g+'</g>');
}
function opening(t) {
  const arrive=ease(ramp(t,0,.36));
  // A readable hero frame exists at t=0; the card settles and the price becomes the focal point.
  const rise=mix(45,0,arrive), tilt=mix(-5,-2,arrive);
  const card=`<rect x="-390" y="-520" width="780" height="1040" rx="66" fill="${P.ink}" opacity=".12" transform="translate(18 20)"/>
    <rect x="-390" y="-520" width="780" height="1040" rx="66" fill="${P.ink}"/>
    <rect x="-366" y="-493" width="732" height="986" rx="46" fill="#FFFFFF"/>
    <path d="M -366 -445 Q -366 -493 -320 -493 H 320 Q 366 -493 366 -445 V -376 H -366 Z" fill="${P.teal}"/>
    <rect x="-300" y="-450" width="390" height="27" rx="13" fill="#FFFFFF" opacity=".88"/>
    <circle cx="300" cy="-438" r="15" fill="#FFFFFF" opacity=".8"/>
    <rect x="-330" y="-334" width="660" height="545" rx="24" fill="#ECF2ED" stroke="${P.ink}" stroke-width="4"/>
    ${bike(0,-70,1.05)}
    <rect x="-305" y="260" width="285" height="21" rx="10" fill="${P.soft}"/>
    <rect x="-305" y="303" width="185" height="17" rx="8" fill="${P.soft}"/>
    <rect x="-300" y="398" width="600" height="56" rx="28" fill="${P.blue}"/>`;
  let g=transform(540,790+rise,1,card,tilt);
  const detach=ease(ramp(t,.025,.48));
  const pricePulse=1+.065*Math.sin(Math.PI*ramp(t,1.92,2.4));
  const price=`<rect x="-425" y="-118" width="850" height="236" rx="30" fill="${P.ink}" opacity=".14" transform="translate(11 15)"/>
    <rect x="-425" y="-118" width="850" height="236" rx="30" fill="#FFFFFF" stroke="${P.ink}" stroke-width="7"/>
    ${txt('500',-126,4,202,P.red)}${txt('€',116,7,118,P.red)}
    <rect x="215" y="-66" width="160" height="130" rx="17" fill="${P.mark}"/>
    ${txt('VB',293,2,80,P.ink)}`;
  g+=transform(520,mix(1060,1160,detach),mix(.74,1,detach)*pricePulse,price,mix(-3,-1,detach));
  const underline=ease(ramp(t,3.18,3.5));
  if(underline>0)g+=`<path d="M 710 1250 Q ${710+100*underline} 1261 ${710+190*underline} 1247" fill="none" stroke="${P.red}" stroke-width="11" stroke-linecap="round"/>`;
  return paper(t)+g;
}
function anchorShape(x,y,s) {
  return transform(x,y,s,`<g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="-155" r="34" stroke="${P.ink}" stroke-width="31"/>
    <circle cx="0" cy="-155" r="34" stroke="${P.blue}" stroke-width="17"/>
    <path d="M 0 -118 V 150 M -105 -64 H 105 M -175 12 Q -157 150 0 150 Q 157 150 175 12 M -175 12 L -204 57 M -175 12 L -123 50 M 175 12 L 204 57 M 175 12 L 123 50" stroke="${P.ink}" stroke-width="42"/>
    <path d="M 0 -118 V 150 M -105 -64 H 105 M -175 12 Q -157 150 0 150 Q 157 150 175 12 M -175 12 L -204 57 M -175 12 L -123 50 M 175 12 L 204 57 M 175 12 L 123 50" stroke="${P.blue}" stroke-width="26"/>
    <path d="M -10 -105 V 105" stroke="#8A9BFF" stroke-width="6" opacity=".8"/>
  </g>`);
}
function anchorScene(t) {
  const morph=smooth(ramp(t,21.44,21.78));
  const labelY=mix(730,365,morph), labelScale=mix(1,.72,morph);
  let g=transform(540,labelY,labelScale,`<rect x="-345" y="-130" width="690" height="260" rx="30" fill="${P.ink}" opacity=".1" transform="translate(12 15)"/><path d="M -345 -130 H 275 L 355 0 L 275 130 H -345 Z" fill="#FFFFFF" stroke="${P.ink}" stroke-width="8"/>${txt('500',-10,4,204,P.red)}<circle cx="290" r="13" fill="${P.paper}" stroke="${P.ink}" stroke-width="5"/>`);
  if(morph>0) {
    const ay=mix(600,770,ease(morph));
    g+=anchorShape(540,ay,1.4*morph);
    g+=transform(540,1325,clamp((t-21.78)/.2),txt('ANKER',0,0,110,P.blue));
  }
  const starts=[[130,590],[925,565],[115,1170],[860,1195]];
  const ends=[[315,1040],[765,1040],[420,1190],[665,1190]];
  const colors=[P.orange,P.purple,P.teal,P.orange];
  if(t>=22.74)for(let i=0;i<4;i++){
    const p=smooth(ramp(t,23.02+i*.13,25.38));
    const [sx,sy]=starts[i], [ex,ey]=ends[i];
    const x=mix(sx,ex,p),y=mix(sy,ey,p);
    const bend=(1-p)*105*(i%2?1:-1);
    g+=`<path d="M 540 968 Q ${mix(540,x,.5)+bend} ${mix(968,y,.5)} ${x} ${y}" fill="none" stroke="${P.ink}" stroke-width="9" stroke-dasharray="19 13" opacity="${.3+.5*p}"/>`;
    if(p>.01)g+=`<circle cx="${sx}" cy="${sy}" r="42" fill="none" stroke="${colors[i]}" stroke-width="4" opacity="${.2*(1-p)}"/>`;
    g+=`<circle cx="${x+4}" cy="${y+9}" r="44" fill="${P.ink}" opacity=".12"/><circle cx="${x}" cy="${y}" r="44" fill="${colors[i]}" stroke="${P.ink}" stroke-width="6"/>`;
  }
  return paper(t)+g;
}
function glasses(x,y,s) {
  return transform(x,y,s,`<g fill="#FFFFFF" stroke="${P.ink}" stroke-width="9"><circle cx="-72" r="60"/><circle cx="72" r="60"/><path d="M -12 -4 Q 0 -22 12 -4 M -132 -5 L -178 -24 M 132 -5 L 178 -24" fill="none" stroke-linecap="round"/></g>`);
}
function groupMark(x,y,color) {
  let s='';
  for(let i=0;i<3;i++){const dx=(i-1)*36;s+=`<circle cx="${dx}" cy="0" r="13" fill="${color}"/><path d="M ${dx-18} 41 Q ${dx-18} 16 ${dx} 16 Q ${dx+18} 16 ${dx+18} 41 Z" fill="${color}"/>`;}
  return transform(x,y,1,s);
}
function resultBar(x,value,progress,color,reveal,t) {
  const h=value*7.1*ease(progress), y=1280-h;
  let g=`<rect x="${x-122+7}" y="${y+10}" width="244" height="${Math.max(0,h)}" rx="15" fill="${P.ink}" opacity=".12"/><rect x="${x-122}" y="${y}" width="244" height="${Math.max(0,h)}" rx="15" fill="${color}" stroke="${P.ink}" stroke-width="6"/>`;
  if(t>=reveal)g+=txt(String(value),x,y+83,116,'#FFFFFF');
  return g;
}
function experiment(t) {
  // One continuous visual argument: groups -> different input numbers -> estimates -> true age.
  const split=ease(ramp(t,36.24,36.75));
  const compact=ease(ramp(t,43.62,44.3));
  const xs=[mix(510,300,split),mix(570,780,split)];
  const ys=[mix(795,450,compact),mix(815,450,compact)];
  let g=glasses(540,mix(320,270,compact),mix(1,.72,compact));
  for(let i=1;i>=0;i--){
    const c=i?P.orange:P.blue, input=i?'140':'9';
    const active=i?ramp(t,39.54,39.8):ramp(t,37.7,37.9);
    const h=mix(750,190,compact), w=420;
    let card=`<rect x="${-w/2+12}" y="${-h/2+15}" width="${w}" height="${h}" rx="28" fill="${P.ink}" opacity=".1"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="28" fill="#FFFFFF" stroke="${active>0?c:P.ink}" stroke-width="${active>0?9:6}"/>
      <path d="M ${-w/2+26} ${-h/2+40} H ${w/2-26}" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
      <g opacity="${1-compact}">${groupMark(0,-h/2+80,c)}</g>`;
    if(active>0)card+=txt(input,0,mix(10,25,compact),i?mix(156,110,compact):mix(208,140,compact),c);
    else card+=txt('?',0,20,210,P.soft);
    const strike=ease(ramp(t,42.64+i*.1,43.0));
    if(strike>0&&compact<1)card+=`<path d="M -130 83 L ${-130+260*strike} ${83-168*strike}" stroke="${P.red}" stroke-width="13" stroke-linecap="round" opacity="${1-compact}"/>`;
    if(compact<1)card+=`<rect x="-135" y="${h/2-130}" width="270" height="14" rx="7" fill="${P.soft}"/><rect x="-135" y="${h/2-88}" width="170" height="14" rx="7" fill="${P.soft}"/>`;
    g+=transform(xs[i],ys[i],mix(.93,1,split),card,i?-mix(4,0,split):mix(-4,0,split));
  }
  if(compact>0){
    const opacity=compact;
    let chart='';
    for(let k=1;k<=3;k++)chart+=line(160,1280-k*165,920,1280-k*165,P.grid,3);
    chart+=line(155,1280,925,1280,P.ink,7);
    chart+=`<path d="M 300 630 V 690 M 780 630 V 690" stroke="${P.soft}" stroke-width="8" stroke-linecap="round"/>`;
    chart+=resultBar(300,50,ramp(t,44.6,46.12),P.blue,46.12,t);
    if(t>=47.0)chart+=resultBar(780,67,ramp(t,47.0,48.08),P.orange,48.08,t);
    g+=`<g opacity="${opacity}">${chart}</g>`;
  }
  if(t>=49.36&&t<50.51){
    const p=ramp(t,49.36,50.51), a=p*Math.PI*2-Math.PI/2;
    g+=transform(540,670,1,`<circle r="55" fill="${P.paper}" stroke="${P.purple}" stroke-width="7"/>${line(0,0,35*Math.cos(a),35*Math.sin(a),P.purple,6)}<circle r="6" fill="${P.purple}"/>`);
  }
  if(t>=50.51){
    const p=ease(ramp(t,50.51,50.8)), y=1280-78*7.1;
    g+=line(145,y,mix(145,935,p),y,P.teal,9,'stroke-dasharray="20 12"');
    g+=transform(540,650,mix(1.16,1,p),`<rect x="-360" y="-63" width="720" height="126" rx="18" fill="${P.paper}" stroke="${P.teal}" stroke-width="8"/>${txt('RICHTIG: 78',0,2,81,P.teal)}`,-3);
  }
  return paper(t)+g;
}
export function __scene(t) {
  if(t>=0&&t<4.78)return opening(t);
  if(t>=19.54&&t<25.94)return anchorScene(t);
  if(t>=33.38&&t<51.04)return experiment(t);
  return originalSvg(t);
}
export function renderSvg(t) {
  if((t>=0&&t<4.78)||(t>=19.54&&t<25.94)||(t>=33.38&&t<51.04))return DEFS+__scene(t);
  return originalSvg(t);
}
export function subtitleAt(){return '';}
