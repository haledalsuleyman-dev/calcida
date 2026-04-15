import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Salary & Paycheck Calculators Hub | Convert Income & Net Pay',
  description: 'Convert annual salaries to hourly wages, estimate true take-home pay, and analyze how tax brackets impact your gross income packages.',
  canonicalPath: '/salary-calculators',
});

export default function SalaryCalculatorsPage() {
  const preferred: CalculatorId[] = ['salary-to-hourly', 'hourly-to-salary', 'paycheck', 'take-home-pay', 'after-tax-income'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'salary')
    .map((s) => s.id);
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
      title="Salary & Paycheck Conversions"
      description="Gross salaries are an illusion. Navigate job offers mathematically by converting hourly wages to annual salaries and stripping away taxes to reveal your true take-home pay."
      calculators={calculators}
      currentPath="/salary-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Income Transparency</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When recruiters quote an annual gross salary, your immediate next step should be utilizing the <Link href="/paycheck-calculator" className="text-blue-600 hover:underline font-semibold">Paycheck Calculator</Link>. 
            Taxes, FICA, healthcare premiums, and 401(k) deductions can aggressively cannibalize up to 30% of your gross offer. Identifying the actual direct-deposit number is strictly required before you sign a lease on an apartment constraint.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are transitioning between W-2 employment and freelance 1099 contracts, immediately rely on the <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline font-semibold">Salary to Hourly Calculator</Link> to ensure you don't accidentally take a massive pay cut when switching models.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The "2080 Rule" Math:</strong> Seamlessly scale an hourly rate like $35/hr up into a full-time 40-hour 52-week annual salary projection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Take-Home Reality:</strong> Deduct Federal brackets, State levies, and FICA explicitly to reveal cash-in-hand.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Pre-Tax Deductions:</strong> See how bumping your 401(k) contribution actually forces the IRS brackets to drop your total taxable income.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Pay Frequency Models:</strong> Compare biweekly paychecks exactly against semi-monthly distribution models.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Compensation Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/take-home-pay-explained" className="block p-4 border border-blue-100 bg-blue-50 rounded-md hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-blue-900 mb-1">Gross vs. Net Pay Breakdown</h3>
              <p className="text-sm text-blue-800">Review the anatomical breakdown of a standard US paystub, exploring where your money is systematically routed before you receive it.</p>
            </Link>
          </div>
        </section>
      </div>
    </CategoryPage>
  );
}
