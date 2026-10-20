/** グラフ用の小さなスケールユーティリティ（依存ライブラリなし） */

export function niceStep(span: number, count: number) {
  const raw = span / Math.max(count, 1);
  const mag = 10 ** Math.floor(Math.log10(raw));
  const err = raw / mag;
  return (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
}

/** 値の範囲から、余白付きのきりの良い目盛りを作る */
export function niceDomain(values: number[], count = 5, padRatio = 0.12) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * padRatio || Math.abs(max) * 0.1 || 1;
  min -= pad;
  max += pad;
  const step = niceStep(max - min, count);
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
  return { min: start, max: end, ticks };
}

export function linear(d0: number, d1: number, r0: number, r1: number) {
  return (v: number) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
}

export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
