import { P, R, ST, TX, pop, frame, tag, prog, ein, back, lerp } from './lib.js';
// 11.6–13.28 Paper map: the pin lands on Köpenick, then the label BERLIN appears for "bei Berlin".
export default function renderShot(t) {
  const bx = 430, by = 640, kx = 760, ky = 1010;
  const pin = prog(t, 11.66, 11.92);
  const ring1 = prog(t, 11.92, 12.5);
  let grid = ''; for (let i = 0; i < 12; i++) grid += `<path d="M ${i * 100} 0 V 1920 M 0 ${i * 170} H 1080" stroke="${P.paperDk}" stroke-width="2" opacity=".5"/>`;
  const berlin = `M ${bx - 300} ${by} Q ${bx - 290} ${by - 260} ${bx - 20} ${by - 290} Q ${bx + 260} ${by - 280} ${bx + 300} ${by - 30} Q ${bx + 320} ${by + 220} ${bx + 60} ${by + 290} Q ${bx - 230} ${by + 300} ${bx - 300} ${by} Z`;
  const py = lerp(ky - 600, ky, ein(pin));
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${grid}
    <path d="M -40 ${by + 60} Q ${bx} ${by + 100} ${bx + 220} ${by + 190} Q ${kx - 100} ${ky - 80} ${kx} ${ky + 20} Q ${kx + 200} ${ky + 120} 1120 ${ky + 60}" stroke="#7FA1A8" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="${berlin}" fill="${P.paperDk}" ${ST(6)} opacity=".95"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M ${bx - 240 + i * 42} ${by - 200} l -60 400" stroke="${P.brown}" stroke-width="4" opacity=".35"/>`).join('')}
    <circle cx="${kx}" cy="${ky}" r="110" fill="${P.paperSh}" ${ST(6)}/>
    ${ring1 > 0 && ring1 < 1 ? `<circle cx="${kx}" cy="${ky}" r="${40 + 200 * ring1}" fill="none" stroke="${P.red}" stroke-width="${10 * (1 - ring1)}"/>` : ''}
    ${pin > 0 ? `<g transform="translate(${kx} ${py})"><path d="M 0 0 L -14 -70 L 14 -70 Z" fill="${P.steel}" ${ST(4)}/><circle cx="0" cy="-90" r="34" fill="${P.red}" ${ST(5)}/></g>` : ''}
    ${tag(kx, ky + 200, 'KÖPENICK', back(prog(t, 11.88, 12.1)), { sz: 58, rot: -3 })}
    ${t > 12.45 ? `<g transform="translate(${bx} ${by - 30}) scale(${pop(t, 12.48, .2)})">${TX(0, 0, 84, 'BERLIN', P.ink, { ls: 8 })}</g>` : ''}`);
}
