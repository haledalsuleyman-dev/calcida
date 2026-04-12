import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Retirement Calculators for 401(k) and Savings',
  description: 'Project 401(k) growth, estimate retirement savings, and compare contribution strategies with retirement calculators.',
  canonicalPath: '/retirement-calculators',
});

export default function RetirementCalculatorsPage() {
  const preferred: CalculatorId[] = [
    'retirement',
    '401k',
    'fire',
    'four-percent-rule',
    'roth-ira',
    'ira',
    'pension',
    'rmd',
  ];
  const idsInCategory = CALCULATOR_SPECS.filter((s) => s.category === 'retirement').map((s) => s.id);
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
      title="Retirement Calculators"
      description="Plan retirement savings, project 401(k) growth, and estimate how contributions add up over time."
      calculators={calculators}
    >
      <p>
        Retirement planning is a long-term math problem. Small changes to contributions, expected return, and time horizon can make a big difference in your final
        retirement balance.
      </p>
      <p>
        Use the retirement calculator for a general projection, then use the 401(k) calculator to model employer match and contributions. For savings-style goals,
        the savings calculator helps you understand steady growth over time.
      </p>
    </CategoryPage>
  );
}

