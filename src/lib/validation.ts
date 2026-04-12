export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function safeNumber(value: unknown, fallback = 0): number {
  const n = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  return isFiniteNumber(n) ? n : fallback;
}

export function parseMoney(value: unknown, opts?: { min?: number; max?: number }): number {
  const n = safeNumber(value, 0);
  const min = opts?.min ?? 0;
  const max = opts?.max ?? Number.POSITIVE_INFINITY;
  return clamp(n, min, max);
}

export function parsePercent(value: unknown, opts?: { min?: number; max?: number }): number {
  const n = safeNumber(value, 0);
  const min = opts?.min ?? 0;
  const max = opts?.max ?? 100;
  return clamp(n, min, max);
}

export function safeDivide(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 0;
  return numerator / denominator;
}

