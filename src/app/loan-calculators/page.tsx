import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Loan Calculators for Payments, APR and Payoff',
  description: 'Estimate monthly payments, compare loan offers, evaluate APR, and review payoff timelines with free loan calculators.',
  canonicalPath: '/loan-calculators',
});

export default function LoanCalculatorsPage() {
  const preferred: CalculatorId[] = ['personal-loan', 'auto-loan', 'auto-lease', 'student-loan', 'loan-comparison', 'apr'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'loan')
    .map((s) => s.id)
    .filter((id) => id !== 'loan-interest');
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
      title="Loan Calculators"
      description="Estimate loan payments, compare offers, and understand the true cost of borrowing."
      calculators={calculators}
    >
      <p>
        Loans are easiest to compare when you look at the monthly payment, total interest, and total cost side-by-side. A lower monthly payment can hide a higher
        total interest cost if the term is longer.
      </p>
      <p>
        Use the loan comparison calculator to compare two offers, and use the APR calculator to understand the real cost of a loan after fees are included.
        If you are borrowing for a vehicle, start with the auto loan calculator.
      </p>
    </CategoryPage>
  );
}

