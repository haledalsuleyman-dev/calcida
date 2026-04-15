import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Mortgage Calculators Hub | Affordability, Refinance & Payoff Estimates',
  description: 'Free mortgage calculators designed for homebuyers and homeowners. Accurately estimate monthly PITI payments, refinance break-even points, and early payoff schedules.',
  canonicalPath: '/mortgage-calculators',
});

export default function MortgageCalculatorsPage() {
  const preferred: CalculatorId[] = ['mortgage-payment', 'mortgage-amortization', 'mortgage-payoff', 'biweekly-mortgage', 'extra-payment-mortgage', 'refinance', 'mortgage-affordability'];
  const idsInCategory = CALCULATOR_SPECS
    .filter((s) => s.category === 'mortgage')
    .map((s) => s.id)
    .filter((id) => id !== 'mortgage-refinance' && id !== 'house-affordability');
  const inCategory = new Set<CalculatorId>(idsInCategory);
  const preferredFiltered = preferred.filter((id) => inCategory.has(id));
  const preferredSet = new Set<CalculatorId>(preferredFiltered);
  const rest = idsInCategory
    .filter((id) => !preferredSet.has(id))
    .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
  
  // The first 2-3 are considered "Featured", but we pass all to the grid for navigation
  const calculators = [...preferredFiltered, ...rest].map((id) => {
    const spec = getCalculatorSpec(id);
    return { name: spec.title, description: spec.description, href: spec.route };
  });

  return (
    <CategoryPage
      title="Mortgage & Housing Calculators"
      description="Buying a house is likely the largest financial decision you will ever make. Take the guesswork out of lending: estimate your true monthly costs, model strict amortization schedules, and avoid destructive hidden interest traps."
      calculators={calculators}
      currentPath="/mortgage-calculators"
    >
      <div className="space-y-12 mt-12 bg-white p-8 rounded-lg border border-gray-200">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here: The Homebuyer's Journey</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are actively browsing real estate listings, always start with the <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline font-semibold">Core Mortgage Payment Calculator</Link>. 
            It is designed to give you a realistic "out-the-door" monthly cost by accounting for Property Taxes, Homeowners Insurance, and HOA fees—which often add hundreds of dollars beyond basic principal and interest.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you already own a home and are drowning in high internet rates, pivot to the <Link href="/refinance-calculator" className="text-blue-600 hover:underline font-semibold">Refinance Simulator</Link> to objectively calculate your exact "break-even" timeline on closing costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Calculate Here</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>True Housing Affordability:</strong> Reverse-engineer your salary to see how much house your budget can safely absorb.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Amortization Burn-down:</strong> See exactly how much of your first 5 years of payments is tragically swallowed purely by bank interest.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Extra Payment Impact:</strong> Model what happens to your 30-year term if you aggressively add an extra $200 toward the principal every month.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span><strong>Biweekly Hacks:</strong> Validate whether switching to a biweekly payment cadence actually saves you tens of thousands in interest.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Real Estate Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/biweekly-vs-monthly-mortgage" className="block p-4 border border-blue-100 bg-blue-50 rounded-md hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-blue-900 mb-1">Biweekly vs Monthly Mortgages</h3>
              <p className="text-sm text-blue-800">Review the mathematical proof behind why 26 half-payments a year secretly shaves years off a 30-year loan.</p>
            </Link>
          </div>
        </section>
      </div>
    </CategoryPage>
  );
}
