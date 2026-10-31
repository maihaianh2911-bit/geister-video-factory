// 19.04–21.6: lack of sleep makes focusing harder — the focus beam from the head drifts off the task ("konzentrieren" 20.98)
import { K, BG, brainHead, label, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const on = eio(prog(t, 19.1, 19.6)), drift = eio(prog(t, 20.4, 21.2));
  const tx = 900, ty = 880, ox = 705, oy = 800;
  const ang = Math.atan2(ty - oy, tx - ox) + (Math.sin(t * 7) * .05 + drift * .45 * Math.sin(t * 2.3 + 1));
  const L = 300 * on, w = .16;
  const beam = on > 0 ? `<path d="M ${ox} ${oy} L ${f1(ox + Math.cos(ang - w) * L)} ${f1(oy + Math.sin(ang - w) * L)} L ${f1(ox + Math.cos(ang + w) * L)} ${f1(oy + Math.sin(ang + w) * L)} Z" fill="${K.amber}" opacity=".55"/>` : '';
  const target = `<rect x="${tx - 70}" y="${ty - 50}" width="140" height="100" rx="12" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><path d="M ${tx - 70} ${ty - 50} L ${tx} ${ty + 6} L ${tx + 70} ${ty - 50}" fill="none" stroke="${K.ink}" stroke-width="5"/>`;
  return `${BG()}${target}${beam}${brainHead(420, 900, 1.5, '', {})}${label(540, 300, 'KONZENTRATION', prog(t, 20.98, 21.2), K.ink, 56)}`;
}
