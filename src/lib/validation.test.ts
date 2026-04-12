import { describe, expect, it } from 'vitest';
import { clamp, parseMoney, parsePercent, safeDivide } from '@/lib/validation';

describe('validation', () => {
  it('clamps values', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(50, 0, 10)).toBe(10);
  });

  it('parses money and percent safely', () => {
    expect(parseMoney('100.5')).toBe(100.5);
    expect(parseMoney('not-a-number')).toBe(0);
    expect(parseMoney(-10)).toBe(0);
    expect(parsePercent(12.5)).toBe(12.5);
    expect(parsePercent(250)).toBe(100);
    expect(parsePercent(-1)).toBe(0);
  });

  it('safeDivide blocks invalid math', () => {
    expect(safeDivide(10, 2)).toBe(5);
    expect(safeDivide(10, 0)).toBe(0);
    expect(safeDivide(Number.NaN, 2)).toBe(0);
  });
});

