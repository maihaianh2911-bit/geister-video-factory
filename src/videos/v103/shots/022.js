// L14 68.6–72.58: evening in du's room (blue dusk, warm lamp); day card AM ABEND; du (left, medium-close) holds the phone with the chat
// "Lena"; the message "Hast du am Wochenende Zeit?" is typed (69.6–70.9) and sent on "Zeit hat" (71.44); du exhales, small smile.
import { K, frame, cam, prog, eio, pop, person, label } from './lib.js';
import { room } from './sets.js';
import { chatPhone } from './props.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 19, mm: 30 });
  s += person('du', 300, 2000, 1.35, { t, seed: 1, look: [16, -4], brows: t > 71.6 ? 'calm' : 'worried', mouth: t > 71.7 ? 'smile' : 'small', rim: '#ffd98a', armR: [330, -520], elbowR: [260, -330] });
  const typ = prog(t, 69.6, 71.0);
  const txt = 'Hast du am Wochenende Zeit?';
  const sent = t > 71.44;
  const msgs = sent ? [{ lines: ['Hast du am', 'Wochenende', 'Zeit?'], me: true, p: pop(t, 71.44, .35), time: '19:32', size: 28 }] : [];
  let ph = chatPhone(t, 0, 0, 1, { who: 'lena', name: 'Lena', status: 'online', clock: '19:31', msgs, id: 'l22' });
  if (!sent && typ > 0) {
    const part = txt.slice(0, Math.round(txt.length * typ)).slice(-17);
    ph += `<g><text x="-125" y="246" font-size="17" font-family="Inter" font-weight="700" fill="#2b2b2b" style="font-family:'Inter';font-weight:700">${part}</text></g>`;
  }
  s += `<g transform="translate(720 830) rotate(-4) scale(1.25)">${ph}</g>`;
  s = cam(s, 600, 900, 1.0 + .05 * eio(prog(t, 68.6, 72.58)));
  s += label('AM ABEND', 540, 250, 96, { p: pop(t, 68.7, .45) });
  return frame(s);
}
