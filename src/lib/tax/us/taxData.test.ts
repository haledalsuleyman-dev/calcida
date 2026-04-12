import { describe, expect, it } from 'vitest';
import { getTaxData } from '@/lib/tax/us/taxData';

describe('taxData', () => {
  it('returns exact year when available', () => {
    const y = getTaxData(2024);
    expect(y.standardDeductions.single).toBeGreaterThan(0);
  });

  it('falls back to closest known year for unknown inputs', () => {
    const y = getTaxData(2025);
    expect(y.standardDeductions.single).toBeGreaterThan(0);
  });
});

