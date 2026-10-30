// v76 body diagram for shots 17–18 (front silhouette with simple organs).
import { K, f1, cl } from './lib.js';
// glowOrg 0..1 lights the organs; ring 0..1 dashed ring round chest+belly; lock 0..1 red lock on the torso; limbs 0..1 green tint on arms/legs
export function bodyDiagram(t, o = {}) {
  const sil = `<path d="M 540 260 m -80 0 a 80 90 0 1 0 160 0 a 80 90 0 1 0 -160 0 M 470 360 h 140 l 10 40 q 120 10 140 80 l 70 380 q 6 40 -30 44 l -30 4 l -80 -330 l 0 360 l 30 560 l -100 0 l -70 -480 l -70 480 l -100 0 l 30 -560 l 0 -360 l -80 330 l -30 -4 q -36 -4 -30 -44 l 70 -380 q 20 -70 140 -80 Z" fill="${K.bg1}" stroke="${K.cyan}" stroke-width="6" stroke-linejoin="round"/>`;
  const g = cl(o.glowOrg ?? 1);
  const org = `<g opacity="${f1(.4 + .6 * g)}"><path d="M 470 460 q -50 20 -50 120 q 0 90 50 100 q 40 -10 40 -110 q 0 -100 -40 -110 Z" fill="#E6889A" stroke="${K.ink}" stroke-width="4"/><path d="M 610 460 q 50 20 50 120 q 0 90 -50 100 q -40 -10 -40 -110 q 0 -100 40 -110 Z" fill="#E6889A" stroke="${K.ink}" stroke-width="4"/>
    <path d="M 540 560 q -40 -40 -60 0 q 0 40 60 80 q 60 -40 60 -80 q -20 -40 -60 0 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="4"/><path d="M 470 720 q 60 -20 140 10 q 30 60 -20 90 q -80 10 -120 -40 Z" fill="#F2B13B" stroke="${K.ink}" stroke-width="4"/>
    <path d="M 480 840 q 60 40 120 0 q 20 60 -20 100 q -40 30 -80 0 q -40 -40 -20 -100 Z" fill="#D9A27E" stroke="${K.ink}" stroke-width="4"/></g>`;
  const L = cl(o.limbs || 0);
  const limbs = L > 0 ? `<g opacity="${f1(L)}" fill="none" stroke="${K.lime}" stroke-width="16" stroke-linecap="round"><path d="M 700 500 L 760 840"/><path d="M 380 500 L 320 840"/><path d="M 600 1050 L 620 1500"/><path d="M 480 1050 L 460 1500"/></g>` : '';
  const R = cl(o.ring || 0), C = 2 * Math.PI * 260;
  const ring = R > 0 ? `<ellipse cx="540" cy="660" rx="200" ry="290" fill="none" stroke="${K.orange}" stroke-width="10" stroke-dasharray="30 18" stroke-dashoffset="${f1(C * (1 - R))}" opacity="${f1(cl(R * 2))}"/>` : '';
  const k = cl(o.lock || 0), ls = 1.6 - .6 * k;
  const lock = k > 0 ? `<g transform="translate(540 680) scale(${f1(ls)})" opacity="${f1(cl(k * 2))}"><path d="M -60 -40 V -90 Q -60 -150 0 -150 Q 60 -150 60 -90 V -40" fill="none" stroke="${K.red}" stroke-width="22"/><rect x="-100" y="-50" width="200" height="160" rx="24" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/><circle cx="0" cy="20" r="22" fill="${K.ink}"/><rect x="-8" y="20" width="16" height="50" fill="${K.ink}"/></g>` : '';
  return `${sil}${org}${limbs}${ring}${lock}`;
}
