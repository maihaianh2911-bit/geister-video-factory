// shared constants for v94: stone labels (owner's notes) and the standard medium-shot placement of "du"
export const LB = ['VERMIETER', 'ZAHNARZT', 'STEUER', 'OMA', 'WÄSCHE'];
export const DX = 560, GY = 1640;   // du's feet in the medium shot (bag hangs to the screen-left)
export const packOf = n => ({ n, labels: LB.slice(0, n) });
