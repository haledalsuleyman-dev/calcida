import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Credit Card Calculators for Payoff and Transfers',
  description: 'Plan debt payoff, calculate interest, compare balance transfer offers, and track utilization with credit card calculators.',
  canonicalPath: '/credit-card-calculators',
});

export default function CreditCardCalculatorsPage() {
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
      description="Manage your credit card debt and optimize your payments with our suite of free financial tools."
      calculators={calculators}
    >
      <p>
        Credit card debt can be one of the most expensive forms of borrowing due to high interest rates. 
        Understanding how your payments are applied and how interest is calculated is the first step toward becoming debt-free.
      </p>
      <p>
        Use the credit card payoff calculator to see how long it will take to pay off your balance with different monthly payments, 
        or use the balance transfer calculator to see if moving your debt to a lower-interest card makes financial sense.
      </p>
    </CategoryPage>
  );
}
