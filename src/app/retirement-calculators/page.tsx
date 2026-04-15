import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Retirement & Investment Calculators Hub | 401(k), Roth IRA, Growth',
  description: 'Project your future net worth. Free calculators for 401(k) compounding, Roth IRA growth, FIRE tracking, and comprehensive retirement savings planning.',
  canonicalPath: '/retirement-calculators',
});

export default function RetirementCalculatorsPage() {
  const preferred: CalculatorId[] = ['401k', 'roth-ira', 'retirement', 'retirement-savings', 'fire', 'social-security-benefits'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'retirement')
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
      title="Retirement & Compounding Models"
      description="Time is your greatest financial asset. Visualize how the explosive power of compound interest, employer matching, and aggressive savings rates can drastically accelerate your retirement timeline."
      calculators={calculators}
      currentPath="/retirement-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Your Wealth Horizon</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have an employer-sponsored retirement account, immediately calibrate your trajectory utilizing the <Link href="/401k-calculator" className="text-blue-600 hover:underline font-semibold">401(k) Calculator</Link>. 
            This will map out the mathematical reality of your current path, and prove exactly why capturing 100% of the employer match is the highest ROI action you can possibly execute right now.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are aggressively pursuing early exit strategies from the workforce, use the <Link href="/fire-calculator" className="text-blue-600 hover:underline font-semibold">FIRE (Financial Independence, Retire Early) Calculator</Link> to run the 4% Rule against your target portfolio to determine your exact crossover point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Tax-Free Explosions:</strong> Model how a $7,000 annual contribution into a completely tax-free Roth IRA compounds out.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The Target Nest Egg:</strong> Determine precisely how many millions are required to sustain a $5,000/month withdrawal rate forever.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The Cost of Waiting:</strong> Calculate the devastating penalty of waiting until age 35 to start investing, versus aggressively funding accounts prior to age 25.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Social Security Frequencies:</strong> Approximate the federal safety net buffers involved in waiting till full retirement age.</span>
            </li>
          </ul>
        </section>
      </div>
    </CategoryPage>
  );
}
