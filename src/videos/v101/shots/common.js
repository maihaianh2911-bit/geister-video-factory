// v101 small motion helpers
export const nod = (t, t0, t1) => (t >= t0 && t < t1) ? Math.max(0, Math.sin((t - t0) * 12)) * 18 : 0;
