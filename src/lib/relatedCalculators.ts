import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId, type CalculatorSpec } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';

export interface RelatedLink {
  name: string;
  href: `/${string}`;
}

export function relatedCalculatorLinks(ids: CalculatorId[]): RelatedLink[] {
  return ids
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((spec) => ({ name: spec.title, href: spec.route }));
}

export function relatedCalculatorLinksForSpec(spec: CalculatorSpec, options?: { min?: number; max?: number }): RelatedLink[] {
  const min = options?.min ?? 4;
  const max = options?.max ?? 6;

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
    // Phase 1: Exclude secondary/redirected pages from related links
    .filter((s) => s.id !== 'mortgage-refinance' && s.id !== 'house-affordability' && s.id !== 'loan-interest')
    .map((s) => s.id);

  for (const id of categoryCandidates) {
    if (chosen.length >= min) break;
    if (used.has(id)) continue;
    used.add(id);
    chosen.push(id);
  }

  const globalCandidates = CALCULATOR_SPECS
    .filter((s) => s.id !== spec.id)
    // Phase 1: Exclude secondary/redirected pages from related links
    .filter((s) => s.id !== 'mortgage-refinance' && s.id !== 'house-affordability' && s.id !== 'loan-interest')
    .map((s) => s.id);

  for (const id of globalCandidates) {
    if (chosen.length >= min) break;
    if (used.has(id)) continue;
    used.add(id);
    chosen.push(id);
  }

  return chosen
    .slice(0, max)
    .map((id) => getCalculatorSpec(id))
    .filter(Boolean)
    .map((s) => ({ name: s.title, href: s.route }));
}
