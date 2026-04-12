import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Credit Card Calculators for Payoff and Interest',
  description: 'Estimate payoff time, interest costs, minimum payment timelines, and balance transfer savings with credit card calculators.',
  canonicalPath: '/credit-card',
});

export default function CreditCardCategoryPage() {
  const preferred: CalculatorId[] = ['credit-card-payoff', 'credit-card-interest', 'credit-card-minimum-payment', 'balance-transfer', 'credit-utilization'];
  const idsInCategory = CALCULATOR_SPECS.filter((s) => s.category === 'credit-card').map((s) => s.id);
  const inCategory = new Set<CalculatorId>(idsInCategory);
  const preferredFiltered = preferred.filter((id) => inCategory.has(id));
  const preferredSet = new Set<CalculatorId>(preferredFiltered);
  const rest = idsInCategory
    .filter((id) => !preferredSet.has(id))
    .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
  const calculators = [...preferredFiltered, ...rest].map((id) => {
    const spec = getCalculatorSpec(id);
    return { name: spec.title, description: spec.description, href: spec.route };
  });

  return (
    <CategoryPage
      title="Credit Card Calculators"
      description="Estimate payoff timelines, understand interest costs, and compare strategies to pay down credit card debt faster."
      calculators={calculators}
    />
  );
}
