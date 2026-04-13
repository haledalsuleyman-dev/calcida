import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Tax Calculators for Income and Capital Gains',
  description: 'Estimate income tax, calculate sales tax, model capital gains, and compare effective tax rates with free tax calculators.',
  canonicalPath: '/tax-calculators',
});

export default function TaxCalculatorsPage() {
  const preferred: CalculatorId[] = ['income-tax', 'tax-bracket', 'sales-tax', 'capital-gains-tax', 'effective-tax-rate', 'self-employment-tax'];
  const idsInCategory = CALCULATOR_SPECS.filter((s) => s.category === 'tax').map((s) => s.id);
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
      title="Tax Calculators"
      description="Calculate your estimated taxes, understand marginal vs. effective tax rates, and plan for your tax liability with our free tools."
      calculators={calculators}
      currentPath="/tax-calculators"
    >
      <p>
        Taxes are a significant part of your financial picture. Understanding how much you owe and how different types of income are taxed is crucial for accurate budgeting.
      </p>
      <p>
        Our federal income tax calculator helps you estimate your liability based on the latest IRS tax brackets, 
        while our capital gains tax tool can help you plan for the sale of investments. 
        If you work for yourself, use the self-employment tax calculator to estimate your Social Security and Medicare contributions.
      </p>
    </CategoryPage>
  );
}
