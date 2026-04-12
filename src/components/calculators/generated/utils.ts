export function nn(x: number): number {
  if (!Number.isFinite(x)) return 0;
  return Math.max(0, x);
}

export function clamp(x: number, min: number, max: number): number {
  if (!Number.isFinite(x)) return min;
  return Math.min(max, Math.max(min, x));
}

export function fmtPct(x: number): string {
  return `${x.toFixed(2)}%`;
}

export function inverseAmortizedPrincipal(monthlyPayment: number, annualRate: number, termYears: number): number {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  if (n <= 0) return 0;
  if (annualRate === 0) return monthlyPayment * n;
  const pow = Math.pow(1 + r, n);
  return monthlyPayment * (pow - 1) / (r * pow);
}

