import { P, cobbles, pigeon, pop, rathaus, shk, sky, stamp, frame, prog, eio } from './lib.js';
// 9.4–11.6 The real place: red-brick Rathaus Köpenick; the year stamp 1906 slams down on "neunzehnhundertsechs".
export default function renderShot(t) {
  const z = 1 + .06 * eio(prog(t, 9.4, 11.6));
  const st = pop(t, 10.39, .2);
  const sh = shk(t, 10.39, 12);
  let birds = '';
  if (t > 10.4) for (let i = 0; i < 5; i++) { const p = prog(t, 10.4 + i * .05, 11.6); birds += pigeon(380 + i * 80 + p * (200 + i * 60), 560 - p * (380 + i * 40), .55, t * 30 + i); }
  return frame(t, `<g transform="translate(${sh} 0)">${sky()}<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">
    ${rathaus(540, 1250, .82, { flag: t })}${cobbles(1255, 1920)}${birds}</g>
    ${stamp(540, 300, -6, '1906', st, { sz: 120, bg: P.paper })}</g>`);
}
