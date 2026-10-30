// 55.74–61.01: several problems one after another ("aufeinanderfolgende Probleme"): a row of blocks topples one into the next; the last falls on "außer Kontrolle"
import { K, DEFS, BG, card, grain, f1, prog, eio, ein, lerp } from './lib.js';
export default function renderShot(t) {
  const N = 5, t0 = 56.6, step = .75;
  let blocks = '';
  for (let i = 0; i < N; i++) { const s = t0 + i * step; const a = ein(prog(t, s, s + .45)); const ang = lerp(0, i === N - 1 ? 84 : 26, a);
    const x = 170 + i * 170;
    blocks += `<g transform="rotate(${f1(ang)} ${x + 40} 1200)"><rect x="${x - 40}" y="800" width="80" height="400" rx="8" fill="${i === N - 1 ? K.red : K.brown}" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2].map(k => `<circle cx="${x}" cy="${880 + k * 110}" r="10" fill="${K.paperL}"/>`).join('')}</g>`; }
  const ok = prog(t, t0 + (N - 1) * step + .3, t0 + (N - 1) * step + .6);
  return `${DEFS}${BG('url(#lSky)')}${grain(13)}<rect x="-60" y="1200" width="1200" height="800" fill="${K.paperD}" stroke="${K.ink}" stroke-width="5"/>${blocks}${card(540, 400, 'AUSSER KONTROLLE', ok, 64, K.red)}`;
}
