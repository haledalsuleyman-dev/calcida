import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Mortgage Calculators for Payments and Refinance',
  description: 'Estimate mortgage payments, compare refinance options, review amortization, and explore affordability and payoff scenarios.',
  canonicalPath: '/mortgage-calculators',
});

export default function MortgageCalculatorsPage() {
  const preferred: CalculatorId[] = ['mortgage-payment', 'mortgage-amortization', 'biweekly-mortgage', 'extra-payment-mortgage', 'mortgage-payoff', 'refinance', 'mortgage-affordability'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'mortgage')
    .map((s) => s.id)
    .filter((id) => id !== 'mortgage-refinance' && id !== 'house-affordability');
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
      title="Mortgage Calculators"
      description="Browse our mortgage calculators to estimate payments, understand amortization, and evaluate refinance scenarios."
      calculators={calculators}
      currentPath="/mortgage-calculators"
    >
      <p>
        Mortgages can be complicated because the monthly payment depends on the interest rate, loan term, taxes, insurance, and the repayment schedule over time.
        These tools help you quickly estimate the numbers and compare scenarios with confidence.
      </p>
      <p>
        Start with the mortgage payment calculator for a monthly estimate, then explore the amortization schedule to see principal vs. interest over time.
        If you are considering refinancing, use the refinance tools to understand savings and break-even points.
      </p>
    </CategoryPage>
  );
}

