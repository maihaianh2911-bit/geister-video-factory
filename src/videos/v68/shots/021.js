// 55.06–57.5: the test egg on a plate, a fork next to it — plate and fork get crossed out ("gegessen … nicht")
import { K, OL, f1, cross, prog } from './lib.js';
import { closeBG, egg } from './sets.js';
export default function renderShot(t) {
  const plate = `<ellipse cx="540" cy="1080" rx="360" ry="80" fill="#FFFFFF" ${OL(7)}/><ellipse cx="540" cy="1070" rx="250" ry="48" fill="none" stroke="#D7D7D7" stroke-width="5"/>`;
  const fork = `<g transform="translate(900 820) rotate(10)"><path d="M 0 0 V 320" ${OL(18)}/><path d="M -30 -110 V -10 Q 0 30 30 -10 V -110 M 0 -110 V 0" fill="none" ${OL(10)}/></g>`;
  return `${closeBG()}${plate}${egg(540, 960, 2.4, { id: 'e21', shell: 0, w: 7 })}${fork}${cross(620, 900, 280, prog(t, 56.6, 57.2))}`;
}
