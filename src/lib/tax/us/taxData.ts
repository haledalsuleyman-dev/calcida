import { CURRENT_TAX_YEAR } from '@/lib/dataFreshness';
import y2024 from '@/data/tax/us/2024.json';
import y2026 from '@/data/tax/us/2026.json';

export type FilingStatus = 'single' | 'married';

export interface TaxBracket {
  upTo: number | null;
  rate: number;
}

export interface TaxConfig {
  standardDeductions: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, TaxBracket[]>;
  ssWageBase: number;
  medicareAdditionalThreshold: Record<FilingStatus, number>;
}

function isBracket(x: unknown): x is TaxBracket {
  const v = x as Record<string, unknown>;
  if (!v) return false;
  const rateOk = typeof v.rate === 'number';
  const hasUpTo = Object.prototype.hasOwnProperty.call(v, 'upTo');
  const upToVal = (v as Record<string, unknown>).upTo as unknown;
  const upToOk = upToVal === null || typeof upToVal === 'number';
  return rateOk && hasUpTo && upToOk;
}

function isTaxConfig(x: unknown): x is TaxConfig {
  const v = x as Record<string, unknown>;
  if (!v) return false;
  const sd = v.standardDeductions as Record<string, unknown> | undefined;
  if (!sd || typeof sd.single !== 'number' || typeof sd.married !== 'number') return false;
  const br = v.brackets as Record<string, unknown> | undefined;
  if (!br) return false;
  const single = br.single as unknown;
  const married = br.married as unknown;
  if (!Array.isArray(single) || !Array.isArray(married)) return false;
  if (!(single as unknown[]).every(isBracket) || !(married as unknown[]).every(isBracket)) return false;
  if (typeof v.ssWageBase !== 'number') return false;
  const mt = v.medicareAdditionalThreshold as Record<string, unknown> | undefined;
  if (!mt || typeof mt.single !== 'number' || typeof mt.married !== 'number') return false;
  return true;
}

const TAX_DATA: Record<number, TaxConfig> = {};

function register(year: number, data: unknown) {
  if (isTaxConfig(data)) TAX_DATA[year] = data;
}

register(2024, y2024);
register(2026, y2026);

export function getTaxData(year: number): TaxConfig {
  if (TAX_DATA[year]) return TAX_DATA[year];
  const years = Object.keys(TAX_DATA).map(Number).sort((a, b) => b - a);
  const fallback = years.find(y => y <= year) ?? years[years.length - 1];
  return TAX_DATA[fallback];
}

export function loadCurrentTaxData(): TaxConfig {
  return getTaxData(CURRENT_TAX_YEAR);
}
