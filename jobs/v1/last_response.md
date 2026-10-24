<plan>mock</plan><scene_js>const SPANS = [[0.0, 1.9], [1.9, 5.12], [5.12, 8.06], [8.06, 10.788]];

function shotA(t, a, b, i) {           // person reacts, ghost pops up behind
  const p = prog(t, a, a + 0.5), g = back(prog(t, a + 0.6, a + 1.0));
  return `<rect width="1080" height="1920" fill="url(#gWall)"/><rect y="1300" width="1080" height="700" fill="url(#gFloor)"/>`
    + (g > 0 ? ghostX(lerp(900, 780, g), 820 - 10 * Math.sin(t * 3), 0.9 * g, { t, mouth: 'grin', brows: 'mean', aL: 120 }) : '')
    + personF(lerp(-200, 420, eout(p)), 1360, 0.95, { look: g > 0 ? 14 : 0, brow: g, mouth: g > 0 ? 'o' : 'flat', aR: g > 0 ? -150 : -12, lean: g > 0 ? -6 : 0 });
}
function shotB(t, a, b, i) {           // number of ghosts pops in, counted
  let s = '<rect width="1080" height="1920" fill="#0b1124"/>' + stars(50, i + 3);
  const n = 1 + (i % 5) * 2;
  for (let k = 0; k < n; k++) { const p = back(prog(t, a + 0.15 * k, a + 0.15 * k + 0.3)); if (p <= 0) continue;
    const an = -Math.PI + (k / Math.max(1, n - 1)) * Math.PI; s += ghostX(540 + 330 * Math.cos(an), 860 + 330 * Math.sin(an), 0.45 * p, { t: t + k }); }
  return s + earth(t, 540, 900, 160);
}
function shotC(t, a, b, i) {           // hallway, door shakes, vase wobbles
  return hallway(t, { vaseRot: 8 * ring(t, a + 0.3, 3, 2), bulge: Math.abs(ring(t, a + 0.3, 4, 3)) * 2 });
}
function scene(t) {
  let i = SPANS.findIndex(([a, b]) => t >= a && t < b); if (i < 0) i = SPANS.length - 1;
  const [a, b] = SPANS[i];
  return [shotA, shotB, shotC][i % 3](t, a, b, i);
}</scene_js><events_json>{"events": [{"t": 0.0, "type": "hit", "gain": 0.4, "f0": 100, "f1": 40, "dur": 1.0}, {"t": 0.6, "type": "pop", "gain": 0.4}, {"t": 1.9, "type": "hit", "gain": 0.4, "f0": 100, "f1": 40, "dur": 1.0}, {"t": 1.95, "type": "ting", "f": 440.0, "gain": 0.3}, {"t": 2.1, "type": "ting", "f": 493.8833012561241, "gain": 0.3}, {"t": 2.25, "type": "ting", "f": 554.3652619537442, "gain": 0.3}, {"t": 5.12, "type": "hit", "gain": 0.4, "f0": 100, "f1": 40, "dur": 1.0}, {"t": 5.42, "type": "thud", "gain": 0.8}, {"t": 8.06, "type": "hit", "gain": 0.4, "f0": 100, "f1": 40, "dur": 1.0}, {"t": 8.66, "type": "pop", "gain": 0.4}]}</events_json><storyboard_json>[{"t0": 0.0, "t1": 1.9, "lines": [0], "title_vi": "Cảnh 1 (MOCK)", "desc_vi": "Tại sao bầu trời màu xanh? — [bản mock, chưa do Claude thiết kế]"}, {"t0": 1.9, "t1": 5.12, "lines": [1], "title_vi": "Cảnh 2 (MOCK)", "desc_vi": "Ánh nắng chứa mọi màu của cầu vồng. — [bản mock, chưa do Claude thiết kế]"}, {"t0": 5.12, "t1": 8.06, "lines": [2], "title_vi": "Cảnh 3 (MOCK)", "desc_vi": "Ánh sáng xanh bị không khí tán xạ mạnh hơn nhiều. — [bản mock, chưa do Claude thiết kế]"}, {"t0": 8.06, "t1": 10.788, "lines": [3], "title_vi": "Cảnh 4 (MOCK)", "desc_vi": "Vì vậy ta thấy màu xanh khắp nơi. — [bản mock, chưa do Claude thiết kế]"}]</storyboard_json>