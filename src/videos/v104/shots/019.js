// L11b 61.6–63.8: du, still half asleep (half-closed eyes, a yawn on "überhaupt" 62.22), is already walking out of the door along the clear trail —
// his feet go before he thinks ("bevor du darüber nachdenkst"). Counter TAG 61.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { field } from './common.js';
import { dayCounter } from './meadow.js';
export default function renderShot(t) {
  const w = eio(prog(t, 61.6, 63.8));
  const yawn = t > 62.2 && t < 62.8;
  const s = field(t, 260 + 260 * w, 1400 + 140 * w, .85 + .12 * w, { mood: 'morning', p: .72, tall: 1.25, tallBack: 1.05, house: { open: 1, w: 470, dx: 140 }, du: { look: [6, 8], eyes: yawn ? 'closed' : 'half', brows: 'calm', mouth: yawn ? 'o' : 'small', walk: (t - 61.6) * 1.5 } });
  return frame(cam(s, 520, 1050, 1.04) + dayCounter('TAG 61', 820, 400, 1));
}
