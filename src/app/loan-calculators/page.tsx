import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Loan Calculators Hub | Auto, Personal, and Amortization Planners',
  description: 'Evaluate the true cost of debt. Free loan calculators to estimate monthly payments for auto loans, personal loans, student debt, and total interest burdens.',
  canonicalPath: '/loan-calculators',
});

export default function LoanCalculatorsPage() {
  const preferred: CalculatorId[] = ['auto-loan', 'personal-loan', 'student-loan', 'loan-comparison', 'debt-payoff', 'heloc'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'loan')
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
      title="Debt & Loan Calculators"
      description="Never sign a lending contract blindly. Our debt analysis tools break down auto loans, personal loans, and student debt to expose the actual cost of borrowing."
      calculators={calculators}
      currentPath="/loan-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Defending Against High Interest</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are standing in a dealership getting pressured into financing, immediately open the <Link href="/auto-loan-calculator" className="text-blue-600 hover:underline font-semibold">Auto Loan Calculator</Link>. 
            Dealerships negotiate based on "monthly payments" to hide the true cost of the vehicle. By locking in your own loan math, you regain total leverage in the negotiation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are suffocating under multiple streams of consumer debt, use the <Link href="/debt-payoff-calculator" className="text-blue-600 hover:underline font-semibold">Debt Payoff Simulator</Link> to structure a mathematically sound escape route (like the Avalanche or Snowball method).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Car Payments:</strong> Understand how your Down Payment and Trade-In Value alter your required monthly cash flow.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Personal Loan Consolidation:</strong> Test if taking out a 10% APY personal loan to crush 25% APR credit cards actually saves you money.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Loan Offer Comparison:</strong> Line up two completely different lending structures side-by-side to find the lowest absolute "Total Cost to Borrow".</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Student Loan Extinguishment:</strong> Discover how an extra $50 a month radically drops the lifespan of crippling student debt.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Debt Strategy Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/credit-card-minimum-payment-trap" className="block p-4 border border-blue-100 bg-blue-50 rounded-md hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-blue-900 mb-1">The Minimum Payment Trap</h3>
              <p className="text-sm text-blue-800">Learn why paying only the minimum on consumer debt guarantees years of financial paralysis and astronomical bank profits.</p>
            </Link>
          </div>
        </section>
      </div>
    </CategoryPage>
  );
}
