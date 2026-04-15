import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Budget & Financial Planners Hub | Net Worth & Emergency Funds',
  description: 'Control your cash flow. Free online budget calculators to track expenses, calculate net worth, size out emergency funds, and optimize your financial life.',
  canonicalPath: '/budget-calculators',
});

export default function BudgetCalculatorsPage() {
  const preferred: CalculatorId[] = ['budget', 'net-worth', 'emergency-fund', 'savings', 'inflation'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'finance') 
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
      title="Budgeting & Wealth Checkups"
      description="Financial strength is measured by retention, not gross income. Organize your cash flows, calculate your exact net worth score, and build an impenetrable emergency fortress."
      calculators={calculators}
      currentPath="/budget-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Establishing Financial Defenses</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you do not know where your money goes every month, you must execute the <Link href="/budget-calculator" className="text-blue-600 hover:underline font-semibold">Base Budget Planner</Link>. 
            Following the 50/30/20 rule, it forcefully separates your "needs" from your "wants", exposing exactly how much fat can be trimmed and redirected toward aggressive savings.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Simultaneously, run your baseline numbers through the <Link href="/emergency-fund-calculator" className="text-blue-600 hover:underline font-semibold">Emergency Fund Sizer</Link>. 
            If you were to lose your job tomorrow, you need to know the literal, mathematical amount of cash required to survive 6 months of housing and biological needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Your Wealth Score:</strong> Use the Net Worth calculator to sum up everything you own, subtract everything you owe, and reveal your actual wealth.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The 50/30/20 Metric:</strong> Map your take-home pay to strict budget buckets so you never overextend your lifestyle.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Inflation Damage:</strong> Calculate how much purchasing power your cash sitting inside a checking account has lost over the last decade.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Savings Milestone Timelines:</strong> Hit a target goal (like a $20k down payment) by generating a required monthly timeline.</span>
            </li>
          </ul>
        </section>
      </div>
    </CategoryPage>
  );
}
