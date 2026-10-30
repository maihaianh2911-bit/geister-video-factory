// 14.86–19.38: ÜBERTRAGUNG — a mosquito carries the pathogen from a sick person to a healthy one; MALARIA, DENGUE; on "verlieren" the route breaks
import { K, DEFS, BG, vig, kcard, chip, head, mosquito, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 15.0, 17.6));
  const brk = eout(prog(t, 18.1, 18.5));
  const A = [230, 860], B = [850, 860];
  const bez = u => { const x = (1 - u) ** 2 * A[0] + 2 * (1 - u) * u * 540 + u * u * B[0], y = (1 - u) ** 2 * (A[1] - 120) + 2 * (1 - u) * u * 380 + u * u * (B[1] - 120); return [x, y]; };
  let trail = '';
  for (let i = 0; i <= 30; i++) { const u = i / 30; if (u > p) break; const [x, y] = bez(u); trail += `${i ? 'L' : 'M'} ${f1(x)} ${f1(y)} `; }
  const [mx, my] = bez(p);
  const [cxm, cym] = bez(.5);
  const body = (x, sick) => `<path d="M ${x - 120} 1150 L ${x - 120} 1010 Q ${x - 120} 960 ${x - 70} 960 L ${x + 70} 960 Q ${x + 120} 960 ${x + 120} 1010 L ${x + 120} 1150 Z" fill="${sick ? '#7A6A8E' : K.shirt}" stroke="${K.ink}" stroke-width="4"/>`;
  const sc = `${BG('url(#mData)')}
    ${body(A[0], true)}${head(A[0], 870, 1, { pale: true, sweat: true, mouth: 'down' })}
    ${body(B[0], false)}${head(B[0], 870, 1, { look: -.6 })}
    <path d="${trail}" fill="none" stroke="${brk > 0 ? K.red : K.cyan}" stroke-width="7" stroke-linecap="round" stroke-dasharray="18 14" opacity="${f1(1 - .5 * brk)}"/>
    ${brk > 0 ? `<g transform="translate(${f1(cxm)} ${f1(cym)}) scale(${f1(back(brk))})"><circle r="60" fill="${K.n0}" stroke="${K.red}" stroke-width="6"/><path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/></g>` : ''}
    ${mosquito(mx, my, .8, { t, ang: lerp(-20, 20, p), alpha: 1 - brk })}
    ${chip(330, 1290, 'MALARIA', prog(t, 14.86, 15.1), K.sun, 46)}${chip(760, 1290, 'DENGUE', prog(t, 15.72, 15.95), K.sun, 46)}`;
  return `${DEFS}${sc}${kcard(540, 250, 'ÜBERTRAGUNG', prog(t, 14.9, 15.2), { sz: 80 })}${vig()}`;
}
