// v64: the "famous picture" drawn as a postcard (our own drawing, not the real card) — shots 032–033
import { K, tuffi, car, f1 } from './lib.js';
export const postcardInner = (W = 760, H = 540) => `<rect width="${W}" height="${H}" fill="#D8CDB2"/>
  <rect y="${H * .72}" width="${W}" height="${H * .28}" fill="#8E9C8F"/><path d="M 0 ${H * .55} Q 300 ${H * .45} ${W} ${H * .58} L ${W} ${H * .72} L 0 ${H * .72} Z" fill="#A9AE8C"/>
  <rect y="40" width="${W}" height="16" fill="${K.steel}"/>${car(380, 56, .7, { open: 1 })}
  ${tuffi(420, 400, .32, { rot: 25, ear: 1, tr: .7, legs: [-20, -10, 22, 14] })}
  <rect width="${W}" height="${H}" fill="#C9A77A" opacity=".25"/>`;
