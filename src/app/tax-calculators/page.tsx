import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Tax Calculators Hub | Federal Brackets, Self-Employment & FICA',
  description: 'Forecast your federal and state tax liabilities. Free online tax calculators to model progressive brackets, estimate self-employment taxes, and plan capital gains.',
  canonicalPath: '/tax-calculators',
});

export default function TaxCalculatorsPage() {
  const preferred: CalculatorId[] = ['income-tax', 'self-employment-tax', 'capital-gains-tax'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'tax')
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
      title="Federal & State Taxation Models"
      description="The US tax code is built on progressive buckets and complex deductions. We strip away the confusion so you can accurately predict your liabilities long before you file."
      calculators={calculators}
      currentPath="/tax-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Finding Your Effective Rate</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are a standard W-2 employee, run your salary through the <Link href="/income-tax-calculator" className="text-blue-600 hover:underline font-semibold">Federal Income Tax Bracket Calculator</Link>. 
            It is crucial to understand the difference between your "Marginal" top bracket and your actual "Effective" blended tax rate. This prevents panic regarding whether a raise will secretly "lower" your take-home pay (which is mathematically impossible).
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are a freelancer or contractor, you must use the <Link href="/self-employment-tax-calculator" className="text-blue-600 hover:underline font-semibold">Self-Employment FICA Calculator</Link>. 
            1099 workers are on the hook for both the employee and employer portions of Social Security and Medicare. Running these numbers ensures you are structurally saving enough cash for brutal quarterly tax filings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The Bracket Engine:</strong> Visually watch your income spill over the 10%, 12%, 22%, and 24% federal tax lines in real-time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Standard Deductions:</strong> See how claiming the Standard Single or Married deduction surgically carves away your taxable base income before the IRS touches it.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Capital Gains Harvesting:</strong> Estimate the vastly different tax penalties between holding an appreciating stock for 11 months versus holding it for 12 months.</span>
            </li>
          </ul>
        </section>
      </div>
    </CategoryPage>
  );
}
