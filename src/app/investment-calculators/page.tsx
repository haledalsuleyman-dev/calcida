import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Investment Calculators Hub | Project Returns, APY, & Compound Interest',
  description: 'Model your investment strategies. Use our free calculators to project compound interest, calculate ROI, estimate APY growth, and visualize stock market returns.',
  canonicalPath: '/investment-calculators',
});

export default function InvestmentCalculatorsPage() {
  const preferred: CalculatorId[] = ['compound-interest', 'investment-return', 'roi', 'cd', 'apr'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'finance') // Include general finance in investment for breadth
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
      title="Investment & Yield Simulators"
      description="Capitalizing on yield is the definition of wealth creation. Plot out exactly how high-yield savings accounts, index funds, and CD deposits will mathematically expand your net worth."
      calculators={calculators}
      currentPath="/investment-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: The Compounding Curve</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are just beginning to save, load the <Link href="/compound-interest-calculator" className="text-blue-600 hover:underline font-semibold">Compound Interest Calculator</Link>. 
            It is the single most important mathematical model in personal finance. Understanding how your early, un-touched contributions multiply upon themselves in later years is the key to locking in long-term financial discipline.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For evaluating active business decisions or real estate plays, use the <Link href="/roi-calculator" className="text-blue-600 hover:underline font-semibold">ROI (Return on Investment) Tracker</Link> to measure if a capital injection was statistically worth the absolute risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Total Investment Yield:</strong> Input a baseline 8% S&P 500 average to see what $10,000 transforms into over a 25-year timeline.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>CD & High Yield Tracking:</strong> Gauge exact interest outputs on locked Certificate of Deposit (CD) accounts yielding 5%.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>True Return on Investment:</strong> Quickly strip out the original cost basis from an asset sale to find the percentage of profit extraction.</span>
            </li>
          </ul>
        </section>
      </div>
    </CategoryPage>
  );
}
