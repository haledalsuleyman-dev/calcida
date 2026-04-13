import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId, type CalculatorSpec } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';

export interface RelatedLink {
  name: string;
  href: `/${string}`;
}

export interface RelatedCalculatorLink extends RelatedLink {
  category: string;
}

const CROSS_CATEGORY_MAP: Record<string, CalculatorId[]> = {
  'mortgage-payment': ['budget', 'debt-to-income', 'net-worth'],
  'mortgage-affordability': ['debt-to-income', 'budget', 'salary-to-hourly'],
  'refinance': ['mortgage-apr', 'closing-costs', 'mortgage-rate-comparison'],
  'salary-to-hourly': ['paycheck', 'take-home-pay', 'after-tax-income', 'budget'],
  'hourly-to-salary': ['salary-to-hourly', 'paycheck', 'overtime'],
  'paycheck': ['budget', 'emergency-fund', '401k'],
  'take-home-pay': ['budget', 'net-worth', 'emergency-fund'],
  'after-tax-income': ['tax-bracket', 'effective-tax-rate', 'paycheck'],
  '401k': ['retirement', 'compound-interest', 'investment-return'],
  'retirement': ['401k', 'compound-interest', 'net-worth'],
  'compound-interest': ['investment-return', 'savings', 'roi'],
  'investment-return': ['compound-interest', 'retirement', 'roi'],
  'auto-loan': ['car-affordability', 'loan-comparison', 'budget'],
  'personal-loan': ['loan-comparison', 'debt-payoff', 'budget'],
  'debt-payoff': ['budget', 'net-worth', 'credit-card-payoff'],
  'budget': ['emergency-fund', 'net-worth', 'savings'],
  'net-worth': ['budget', 'debt-payoff', 'retirement'],
  'credit-card-payoff': ['debt-payoff', 'budget', 'balance-transfer'],
  'savings': ['compound-interest', 'emergency-fund', 'savings-goal'],
  'emergency-fund': ['budget', 'savings', 'net-worth'],
};

function expandWithCrossCategory(spec: CalculatorSpec, base: CalculatorId[], maxTotal: number): CalculatorId[] {
  const crossLinks = CROSS_CATEGORY_MAP[spec.id] || [];
  const used = new Set<CalculatorId>([spec.id, ...base]);
  const result = [...base];
  
  for (const id of crossLinks) {
    if (result.length >= maxTotal) break;
    if (used.has(id)) continue;
    const crossSpec = getCalculatorSpec(id);
    if (!crossSpec) continue;
    used.add(id);
    result.push(id);
  }
  
  return result;
}

export function relatedCalculatorLinks(ids: CalculatorId[]): RelatedLink[] {
  return ids
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((spec) => ({ name: spec.title, href: spec.route }));
}

export function relatedCalculatorLinksWithCategory(ids: CalculatorId[]): RelatedCalculatorLink[] {
  return ids
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((spec) => ({ 
      name: spec.title, 
      href: spec.route,
      category: spec.category 
    }));
}

export function relatedCalculatorLinksForSpec(spec: CalculatorSpec, options?: { min?: number; max?: number }): RelatedLink[] {
  const min = options?.min ?? 5;
  const max = options?.max ?? 8;

  const base = spec.related ?? [];
  const chosen: CalculatorId[] = [];
  const used = new Set<CalculatorId>([spec.id]);

  for (const id of base) {
    if (used.has(id)) continue;
    used.add(id);
    chosen.push(id);
  }

  const hub = getCalculatorHub(spec);

  const hubIds = CALCULATOR_SPECS.map((s) => s.id).filter((id) => getCalculatorHub(getCalculatorSpec(id)).href === hub.href);
  const hubIndex = hubIds.indexOf(spec.id);
  const hubCandidates: CalculatorId[] = [];
  for (let i = 1; i <= hubIds.length; i++) {
    const next = hubIds[(hubIndex + i) % hubIds.length];
    if (next === spec.id) continue;
    hubCandidates.push(next);
  }

  for (const id of hubCandidates) {
    if (chosen.length >= min) break;
    if (used.has(id)) continue;
    used.add(id);
    chosen.push(id);
  }

  const categoryCandidates = CALCULATOR_SPECS
    .filter((s) => s.id !== spec.id)
    .filter((s) => s.category === spec.category)
    .filter((s) => s.id !== 'mortgage-refinance' && s.id !== 'house-affordability' && s.id !== 'loan-interest')
    .map((s) => s.id);

  for (const id of categoryCandidates) {
    if (chosen.length >= min) break;
    if (used.has(id)) continue;
    used.add(id);
    chosen.push(id);
  }

  const withCrossCategory = expandWithCrossCategory(spec, chosen, max);
  
  const globalCandidates = CALCULATOR_SPECS
    .filter((s) => s.id !== spec.id)
    .filter((s) => s.id !== 'mortgage-refinance' && s.id !== 'house-affordability' && s.id !== 'loan-interest')
    .map((s) => s.id);

  for (const id of globalCandidates) {
    if (withCrossCategory.length >= max) break;
    if (used.has(id)) continue;
    used.add(id);
    withCrossCategory.push(id);
  }

  return withCrossCategory
    .slice(0, max)
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((s) => ({ name: s.title, href: s.route }));
}

export function getCrossCategoryRelatedLinks(spec: CalculatorSpec): RelatedLink[] {
  const crossIds = CROSS_CATEGORY_MAP[spec.id] || [];
  return crossIds
    .slice(0, 3)
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((s) => ({ name: s.title, href: s.route }));
}
