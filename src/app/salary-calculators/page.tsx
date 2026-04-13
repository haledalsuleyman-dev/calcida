import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Salary Calculators for Paychecks and Hourly Pay',
  description: 'Convert salary and hourly pay, estimate paychecks, and calculate take-home income after taxes and deductions.',
  canonicalPath: '/salary-calculators',
});

export default function SalaryCalculatorsPage() {
  const preferred: CalculatorId[] = ['salary-to-hourly', 'hourly-to-salary', 'overtime', 'paycheck', 'take-home-pay', 'after-tax-income'];
  const idsInCategory = CALCULATOR_SPECS.filter((s) => s.category === 'salary').map((s) => s.id);
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
      title="Salary Calculators"
      description="Convert salary and hourly wages, estimate take-home pay, and understand what you actually earn."
      calculators={calculators}
      currentPath="/salary-calculators"
    >
      <p>
        Whether you are comparing job offers or planning your budget, the most important number is your take-home pay. These calculators help you convert between
        salary and hourly rates, estimate paycheck amounts, and understand how taxes impact your real income.
      </p>
      <p>
        Start with a salary-to-hourly conversion, then use the paycheck and take-home pay calculators to get a more realistic picture of what you will actually
        receive.
      </p>
    </CategoryPage>
  );
}

