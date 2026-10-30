// 43.22–47.2: whether that would be enough everywhere is uncertain — three different ponds, each gets a "?" on "nicht sicher vorhersagen"
import { K, DEFS, BG, vig, fish, swallow, larva, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const pond = (cx, cy, r, i) => {
    const a = eout(prog(t, 43.25 + i * .25, 43.7 + i * .25));
    const q = back(prog(t, 45.5 + i * .18, 45.8 + i * .18));
    const inner = `<rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${r}" fill="url(#mDusk)"/><rect x="${cx - r}" y="${cy}" width="${2 * r}" height="${r}" fill="url(#mWater)"/>
      <path d="M ${cx - r} ${cy} H ${cx + r}" stroke="${K.waterL}" stroke-width="4"/>
      ${[...Array(3 + i)].map((_, k) => `<path d="M ${f1(cx - r * .8 + k * 30)} ${cy} q -6 -${f1(r * .5)} -12 -${f1(r * .7)}" fill="none" stroke="${K.reed}" stroke-width="5"/>`).join('')}
      ${fish(cx + r * .3, cy + r * .5, r / 420, { t: t + i })}${i !== 1 ? swallow(cx + r * .1, cy - r * .55, r / 500, { t: t + i }) : ''}`;
    return `<g opacity="${f1(a)}"><clipPath id="c15${i}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><g clip-path="url(#c15${i})">${inner}</g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${K.cyan}" stroke-width="4"/>
      ${q > 0 ? `<g transform="translate(${cx + r * .7} ${cy - r * .7}) scale(${f1(q)})"><circle r="46" fill="${K.n0}" stroke="${K.sun}" stroke-width="5"/><text y="24" text-anchor="middle" fill="${K.sun}" style="font-family:'Inter';font-weight:900;font-size:68px">?</text></g>` : ''}</g>`;
  };
  return `${DEFS}${BG('url(#mData)')}${pond(300, 480, 220, 0)}${pond(760, 820, 200, 1)}${pond(330, 1180, 190, 2)}${vig()}`;
}
