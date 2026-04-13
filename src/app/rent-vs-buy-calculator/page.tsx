import { CalculatorPage } from '@/components/CalculatorPage';
import { RentVsBuyCalculator } from '@/components/calculators/generated/MortgageAdvancedCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('rent-vs-buy');

export const metadata: Metadata = calculatorMetadata({
  title: 'Rent vs. Buy Calculator: Should You Rent or Buy a Home?',
  description:
    'Compare the true 10-year cost of renting vs. buying. Factor in home appreciation, rent growth, opportunity cost, and tax benefits to find your break-even point.',
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'Is it always better to buy than rent?',
    answer:
      "Not always. Buying builds equity and benefits from appreciation, but it also comes with transaction costs (typically 5–7% of purchase price), maintenance, property taxes, and illiquidity. If you plan to stay fewer than 3–5 years, renting often wins financially because closing costs haven't had time to amortize.",
  },
  {
    question: 'What is the rent vs. buy break-even point?',
    answer:
      "The break-even point is the number of years you must stay in the home before buying becomes cheaper than renting. It depends on your down payment, mortgage rate, rent level, home appreciation, and tax situation. Most scenarios break even between 3 and 7 years.",
  },
  {
    question: 'Does renting mean throwing money away?',
    answer:
      "No. Rent pays for housing — a real service. Mortgage payments also include interest (not equity), taxes, insurance, and maintenance, all of which are \"lost\" costs similar to rent. The equity-building argument is valid long-term, but the comparison isn't as simple as many assume.",
  },
  {
    question: 'How does home appreciation affect the calculation?',
    answer:
      "Historical U.S. home appreciation averages roughly 3–5% per year, though it varies widely by location. Higher appreciation strongly favors buying. If appreciation is below 2%, the financial case for buying weakens unless you have a long time horizon.",
  },
  {
    question: 'What happens to the down payment if I rent instead?',
    answer:
      "If you rent, your down payment stays liquid and can be invested. The opportunity cost of the down payment is a key factor in the comparison — a 7% annual investment return on a $60,000 down payment over 10 years grows to approximately $118,000.",
  },
  {
    question: 'Does the mortgage interest deduction change the analysis?',
    answer:
      "The mortgage interest deduction only helps if you itemize deductions. Since the 2018 tax reform raised the standard deduction, fewer homeowners benefit. Consult a tax advisor to estimate your actual tax savings.",
  },
];

const currentYear = new Date().getFullYear();

export default function RentVsBuyPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator models the cumulative cost of renting versus buying over a custom time
            horizon, giving you a data-driven break-even point rather than a gut feeling.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">Five Key Factors Modeled</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                <strong>Purchase costs:</strong> Down payment, closing costs (typically 2–5%), and
                financing costs are spread across your ownership horizon.
              </li>
              <li>
                <strong>Monthly housing cost:</strong> For buyers — PITI (principal, interest,
                taxes, insurance) plus maintenance (est. 1% of home value/year). For renters — rent
                plus renter's insurance.
              </li>
              <li>
                <strong>Appreciation &amp; equity:</strong> Home value growth builds equity, but
                selling costs (agent fees ~6%) reduce net proceeds.
              </li>
              <li>
                <strong>Rent growth:</strong> Rent typically rises 2–4% per year, while a fixed-rate
                mortgage payment stays constant — this benefits buyers over time.
              </li>
              <li>
                <strong>Opportunity cost:</strong> The down payment and any monthly savings from
                renting are modeled as an investment that compounds at your expected return rate.
              </li>
            </ol>
          </div>
          <p>
            The result shows which option leaves you in a better financial position at the end of
            your chosen time horizon.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">Example: $450,000 Home in {currentYear}</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-900 mb-2">Buying</p>
              <ul className="space-y-1">
                <li>Home price: $450,000</li>
                <li>Down payment (20%): $90,000</li>
                <li>Mortgage rate: 6.8% (30-yr)</li>
                <li>Monthly P&amp;I: ~$2,370</li>
                <li>Taxes + insurance: ~$700/mo</li>
                <li className="font-semibold">Total monthly: ~$3,070</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Renting</p>
              <ul className="space-y-1">
                <li>Monthly rent: $2,200</li>
                <li>Rent growth: 3%/year</li>
                <li>$90k invested at 7%/year</li>
                <li>No maintenance costs</li>
                <li>Full flexibility to move</li>
                <li className="font-semibold">Break-even: ~5.2 years</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *At 5.2 years, buying becomes the better financial choice assuming 3.5% annual
            appreciation. Under 5 years, renting wins.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              When Does Buying Make More Sense?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>You plan to stay 5+ years.</strong> Transaction costs require time to
                amortize. Anything shorter usually favors renting.
              </li>
              <li>
                <strong>Your rent-to-price ratio is above 0.5%.</strong> If a $400,000 home rents
                for $2,000+/month, buying is likely competitive.
              </li>
              <li>
                <strong>Local appreciation is strong (3%+/year).</strong> Markets like coastal
                cities have historically appreciated faster, tilting the math toward buying.
              </li>
              <li>
                <strong>Interest rates are below your area's historical average.</strong> Lower
                rates reduce carrying costs dramatically.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              When Does Renting Make More Sense?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>You're in a high price-to-rent ratio market.</strong> When homes cost 25×+
                annual rent, buying is expensive relative to renting.
              </li>
              <li>
                <strong>Your down payment capital earns more invested.</strong> In bull markets,
                keeping liquidity in equities can outperform home equity.
              </li>
              <li>
                <strong>You value flexibility.</strong> Job changes, relationship changes, or
                lifestyle shifts are worth a financial premium.
              </li>
              <li>
                <strong>Your emergency fund isn't robust.</strong> Homeownership requires reserve
                cash for maintenance, repairs, and carrying costs if income drops.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Tools</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/mortgage-payment-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Mortgage Payment Calculator</span>
                <span className="text-sm text-gray-500">Estimate your exact monthly mortgage cost.</span>
              </Link>
              <Link
                href="/house-affordability-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">House Affordability Calculator</span>
                <span className="text-sm text-gray-500">See how much home you can afford on your income.</span>
              </Link>
              <Link
                href="/mortgage-amortization-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Amortization Calculator</span>
                <span className="text-sm text-gray-500">See the full payment schedule over the loan term.</span>
              </Link>
              <Link
                href="/investment-return-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Investment Return Calculator</span>
                <span className="text-sm text-gray-500">Model down payment opportunity cost.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <RentVsBuyCalculator />
    </CalculatorPage>
  );
}
