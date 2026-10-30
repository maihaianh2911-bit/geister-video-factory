// Over the cold ground: a backpack thumps down on "Rucksäcke", a jacket lands on top on "Jacken".
import { K, DEFS60, backpack, P, FG, prog, ein, eout, lerp, shk } from './lib.js';

export default function renderShot(t) {
  const bp = ein(prog(t, 57.75, 58.04)), jk = ein(prog(t, 58.4, 58.68));
  const [sx, sy] = shk(t, 58.04, 8, 9);
  const j = P.blue;
  return DEFS60 + `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="#121B20"/>
  <path d="M 0 900 Q 540 840 1080 900 L 1080 1920 L 0 1920 Z" fill="#24323A"/>
  ${[0, 1, 2, 3, 4].map(i => `<path d="M ${100 + i * 220} 1000 l 20 -24 l 20 24" stroke="#DCEBF4" stroke-width="5" fill="none" opacity=".5"/>`).join('')}
  <ellipse cx="540" cy="1000" rx="520" ry="380" fill="url(#fAmb)" opacity=".45"/>
  ${backpack(540, lerp(200, 1080, bp), 2.0, lerp(-20, 80, bp), '#5A6B3A', '#44522A')}
  ${jk > 0 ? `<g transform="translate(540 ${lerp(150, 1010, jk)}) rotate(${lerp(30, 0, jk)})">
     <path d="M -340 -60 Q -360 -120 -220 -130 L 220 -130 Q 360 -120 340 -60 L 300 90 L -300 90 Z" fill="${j.j}" stroke="#0B0F12" stroke-width="8"/>
     <path d="M -220 -130 Q 0 -60 220 -130 L 230 -90 Q 0 -10 -230 -90 Z" fill="${j.jHi}" stroke="#0B0F12" stroke-width="6"/>
     <path d="M 0 -60 V 90" stroke="${j.jSh}" stroke-width="8"/></g>` : ''}
  </g>
  ${FG(1440)}`;
}
