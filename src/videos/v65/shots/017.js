// 49.74–52.82: a male mosquito (feathery antennae) sits on a flower umbel and sips; the nectar drop glows on "Nektar"
import { K, DEFS, BG, vig, chip, mosquito, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const land = eio(prog(t, 49.74, 50.5));
  const mx = lerp(1100, 560, land), my = lerp(380, 620, land);
  const sip = eout(prog(t, 50.6, 51.2));
  const glow = eout(prog(t, 51.9, 52.3));
  let fl = '';
  for (let i = 0; i < 11; i++) { const a = -Math.PI + i / 10 * Math.PI; const x = 560 + Math.cos(a) * 300, y = 800 + Math.sin(a) * 90 + 60; fl += `<path d="M 560 1060 Q ${f1((560 + x) / 2)} 960 ${f1(x)} ${f1(y)}" fill="none" stroke="${K.leafD}" stroke-width="7"/>`; }
  let fl2 = '';
  for (let i = 0; i < 11; i++) { const a = -Math.PI + i / 10 * Math.PI; const x = 560 + Math.cos(a) * 300, y = 800 + Math.sin(a) * 90 + 60; fl2 += `<g transform="translate(${f1(x)} ${f1(y)})">${[0, 1, 2, 3, 4].map(k => `<circle cx="${f1(Math.cos(k * 1.256) * 26)}" cy="${f1(Math.sin(k * 1.256) * 20)}" r="20" fill="${K.petal}" stroke="${K.ink}" stroke-width="2"/>`).join('')}<circle r="12" fill="${K.nectar}"/></g>`; }
  const drop = `<circle cx="600" cy="730" r="${f1(14 + 6 * glow)}" fill="${K.nectar}" stroke="${K.ink}" stroke-width="2"/><circle cx="600" cy="730" r="${f1(60 * glow)}" fill="url(#mLamp)" opacity="${f1(glow)}"/>`;
  const sc = `${BG('url(#mDusk)')}<path d="M 560 1500 L 560 1060" stroke="${K.leafD}" stroke-width="16"/>${fl}${fl2}${drop}
    ${mosquito(mx, my, 1.6, { t, male: true, wings: land < 1 ? 1 : 0, sip: sip, ang: lerp(-10, 6, land) })}`;
  return `${DEFS}${cam(sc, lerp(1, 1.08, eio(prog(t, 49.74, 52.82))), 560, 760)}${chip(300, 300, 'MÄNNCHEN', prog(t, 49.8, 50.1), K.cyan, 48)}${vig()}`;
}
