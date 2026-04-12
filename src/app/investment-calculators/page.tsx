import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Investment Calculators for ROI and Compound Growth',
  description: 'Project returns, model compound growth, calculate ROI, and account for inflation with investment calculators.',
  canonicalPath: '/investment-calculators',
});

export default function InvestmentCalculatorsPage() {
  const preferred: CalculatorId[] = ['compound-interest', 'investment-return', 'roi', 'inflation', 'future-value', 'present-value', 'cagr', 'rule-of-72'];
  const idsInHub = CALCULATOR_SPECS.map((s) => s.id).filter((id) => getCalculatorHub(getCalculatorSpec(id)).href === '/investment-calculators');
  const inHub = new Set<CalculatorId>(idsInHub);
  const preferredFiltered = preferred.filter((id) => inHub.has(id));
  const preferredSet = new Set<CalculatorId>(preferredFiltered);
  const rest = idsInHub
    .filter((id) => !preferredSet.has(id))
    .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
  const calculators = [...preferredFiltered, ...rest].map((id) => {
    const spec = getCalculatorSpec(id);
    return { name: spec.title, description: spec.description, href: spec.route };
  });

  return (
    <CategoryPage
      title="Investment Calculators"
      description="Project investment growth, calculate ROI, and understand how compounding and inflation affect your money."
      calculators={calculators}
    >
      <p>
        Investing is about the relationship between time, contribution rate, and return. Compounding rewards consistency, and inflation reduces buying power in the
        background.
      </p>
      <p>
        Use the compound interest and investment return tools to project growth, the ROI calculator to compare outcomes, and the inflation calculator to interpret
        results in real-world terms.
      </p>
    </CategoryPage>
  );
}

