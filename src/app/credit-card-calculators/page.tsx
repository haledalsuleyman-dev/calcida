import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Credit Card Calculators Hub | Payoff Strategies & Minimum Traps',
  description: 'Escape revolving debt. Free credit card calculators to model aggressive payoff schedules, expose the minimum payment trap, and calculate accurate interest timelines.',
  canonicalPath: '/credit-card-calculators',
});

export default function CreditCardCalculatorsPage() {
  const preferred: CalculatorId[] = ['credit-card-payoff', 'credit-card-minimum-payment', 'apr'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'credit-card')
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
      title="Credit Card Debt Optimization"
      description="Credit card APRs are legally allowed to breach 25%+. Leaving a balance on these accounts will systematically destroy your net worth. Use these tools to structure an aggressive, mathematically sound escape plan."
      calculators={calculators}
      currentPath="/credit-card-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: Extinguishing The Fire</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are carrying a month-to-month balance, directly open the <Link href="/credit-card-payoff-calculator" className="text-blue-600 hover:underline font-semibold">Credit Card Payoff Simulator</Link>. 
            You need to establish a strict, fixed monthly payment that radically exceeds the bank's "suggested" minimum. This tool will show you the exact month and year you will finally become debt-free.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are curious why revolving debt feels impossible to beat, observe the horrific math inside the <Link href="/credit-card-minimum-payment-calculator" className="text-blue-600 hover:underline font-semibold">Minimum Payment Trap visualizer</Link>. It demonstrates how banks structure algorithms to keep you indentured for decades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>The True Cost of a Purchase:</strong> See how carrying a $3,000 balance at 24% APR actually forces you to pay $4,800 total.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Calculated Snowballing:</strong> Find out how adding a mere additional $50/month to your payment destroys years of interest scheduling.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>APR Conversions:</strong> Translate Annual Percentage Yields into the exact daily interest charges hitting your account every midnight.</span>
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Debt Relief Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/credit-card-minimum-payment-trap" className="block p-4 border border-blue-100 bg-blue-50 rounded-md hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-blue-900 mb-1">Surviving the Minimum Payment Trap</h3>
              <p className="text-sm text-blue-800">Learn the predatory formulas banks use to set minimum payments artificially low, ensuring maximum lifetime interest generation.</p>
            </Link>
          </div>
        </section>
      </div>
    </CategoryPage>
  );
}
