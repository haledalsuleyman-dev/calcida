import { CalculatorPage } from '@/components/CalculatorPage';
import { CompoundInterestCalculator } from '@/components/calculators/finance/CompoundInterestCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata, absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('compound-interest');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Compound Interest Calculator (${currentYear}): Project Your Growth`,
  description: `Calculate exactly how your money will grow over time with our free compound interest calculator. Model contributions, APY rates, and compounding frequencies.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Compound Interest Calculator (${currentYear}): Project Your Growth`,
    description: `Calculate exactly how your money will grow over time with our free compound interest calculator. Model contributions, APY rates, and compounding frequencies.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const COMPOUND_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is compound interest?",
    answer: "Compound interest is the interest on a deposit calculated based on both the initial principal and the accumulated interest from previous periods. It is famously referred to as finding 'interest on your interest.'"
  },
  {
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is only ever calculated on the initial principal you invested. Compound interest takes the interest you earned in Year 1, adds it to the principal for Year 2, and calculates interest on the new, larger balance."
  },
  {
    question: "Does compounding frequency matter?",
    answer: "Yes. The more frequently interest is compounded (Daily vs Monthly vs Annually), the faster your money grows. While the difference is small in Year 1, over 30 years, daily compounding significantly outpaces annual compounding."
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a quick mental math shortcut. Divide 72 by your annual interest rate to find out how many years it will take for your money to double. For example, at an 8% return, your money doubles every 9 years (72 / 8 = 9)."
  },
  {
    question: "Can I use this for the stock market?",
    answer: "Yes, though the stock market doesn't 'compound' in the traditional bank sense. However, calculating the average annualized return of the S&P 500 (historically ~7-10%) through a compound interest calculator is the standard way to project stock market wealth over decades."
  }
];

export default function CompoundInterestPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={COMPOUND_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Albert Einstein reportedly referred to compound interest as the "eighth wonder of the world," stating: <em>"He who understands it, earns it; he who doesn't, pays it."</em>
          </p>
          <p>
            Our <strong>Compound Interest Calculator</strong> visually demonstrates the explosive power of time and consistent contributions in wealth building. By reinvesting your returns rather than withdrawing them, your wealth graph bends upward into an accelerating curve.
          </p>
          <p>
            Model your savings account APY, project an S&P 500 index fund strategy, or test how waiting just five years to start investing alters your final net worth.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            The engine behind the calculation simulates the exact compounding intervals utilized by major financial institutions and investment brokerages.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Input Variables:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium text-gray-900">Initial Deposit:</span> The starting balance you have today.
              </li>
              <li>
                <span className="font-medium text-gray-900">Contributions:</span> The amount you commit to adding on a recurring schedule (e.g., $500 every month).
              </li>
              <li>
                <span className="font-medium text-gray-900">Interest Rate:</span> The expected annual return (APY). High-Yield Savings Accounts currently hover around 4-5%, while historical stock market averages span 7-10%.
              </li>
              <li>
                <span className="font-medium text-gray-900">Time Horizon:</span> The single most critical variable. Compounding is exponential, meaning the vast majority of your wealth is generated in the final few years of your timeline.
              </li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>The mathematical foundation for compounding financial assets:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4 flex flex-col space-y-2">
            <p>A = P(1 + r/n)^(nt)</p>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-sm bg-gray-50 p-4 rounded border border-gray-200">
            <li><strong>A:</strong> Total Future Value (including interest)</li>
            <li><strong>P:</strong> Principal investment amount</li>
            <li><strong>r:</strong> Annual interest rate (in decimal format)</li>
            <li><strong>n:</strong> Number of times interest is compounded per year</li>
            <li><strong>t:</strong> Time the money is invested in years</li>
          </ul>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-bold text-blue-900 mb-4 text-lg">
            Example: The Magic of $500 a Month
          </p>
          <p className="mb-4 text-gray-700">Let's witness how an ordinary monthly contribution transforms into extraordinary wealth over a 30-year career using an 8% stock market return.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Initial Deposit:</span> <span className="font-medium">$0</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Monthly Contribution:</span> <span className="font-medium">$500</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Annual Return Rate:</span> <span className="font-medium">8.0%</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Timeline:</span> <span className="font-medium">30 Years</span>
            </li>
            <li className="flex justify-between pb-2 pt-1">
              <span>Total Your Actually Invested (Principal):</span> <span className="font-bold text-blue-900">$180,000</span>
            </li>
            <li className="flex justify-between pb-2 pt-1">
              <span>Interest You Earned For Doing Nothing:</span> <span className="font-bold text-blue-900">$565,000+</span>
            </li>
            <li className="flex justify-between pt-2 mt-2 border-t border-blue-300">
              <span className="text-xl font-bold text-blue-900">Total Future Wealth:</span> 
              <span className="text-xl font-bold text-blue-900">~$745,000</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *This is why compounding is magic. The interest you earned eventually eclipsed the actual money you put in by roughly 300%.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The Cost of Waiting is Devastating
            </h2>
            <p className="mb-4 text-gray-700">
              Because the compounding curve is exponential, the money you invest in Year 1 is infinitely more powerful than the money you invest in Year 10. 
            </p>
            <p className="mb-4 text-gray-700">
              If Person A invests $500 a month from age 25 to 35, and then never invests a single dollar again. And Person B starts at age 35, and invests $500 a month all the way until they are 65. <strong>Person A will still have more money at retirement.</strong> Start immediately, even if it's a small amount. Time cannot be recovered.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Wealth Planners</h2>
            <p className="mb-4 text-gray-700">Now that you understand how compounding works in a vacuum, start applying it to specific real-world financial accounts:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/401k-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">401(k) Evaluator</span>
                <span className="text-sm text-gray-500 mt-2 block">Overlay compounding math with your specific employer match and IRS limits.</span>
              </Link>
              <Link href="/net-worth-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Net Worth Tracker</span>
                <span className="text-sm text-gray-500 mt-2 block">Organize all of your compounding assets against your diminishing liabilities to find your actual wealth score.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <CompoundInterestCalculator />
    </CalculatorPage>
  );
}
