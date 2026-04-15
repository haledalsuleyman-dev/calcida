import { CalculatorPage } from '@/components/CalculatorPage';
import { NetWorthCalculator } from '@/components/calculators/finance/NetWorthCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata, absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('net-worth');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Net Worth Calculator (${currentYear}): Track Your Wealth Score`,
  description: `Calculate your true net worth. Instantly add up your assets (homes, cash, investments) and subtract your liabilities (mortgage, debt) to see your financial health.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Net Worth Calculator (${currentYear}): Track Your Wealth Score`,
    description: `Calculate your true net worth. Instantly add up your assets (homes, cash, investments) and subtract your liabilities (mortgage, debt) to see your financial health.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const NET_WORTH_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is net worth?",
    answer: "Your net worth is the ultimate scorecard of your financial health. Simply put, it is the total value of everything you own (assets) minus the total value of everything you owe (liabilities)."
  },
  {
    question: "What counts as an asset?",
    answer: "Assets include cash in checking/savings accounts, retirement accounts (401k, IRA), brokerage investments, equity in real estate, vehicles, and sometimes extremely high-value personal property like jewelry or art."
  },
  {
    question: "What counts as a liability?",
    answer: "Liabilities are any debts you owe to a third party. This includes the remaining balance on your mortgage, auto loans, student loans, outstanding credit card balances, and personal loans."
  },
  {
    question: "Is it normal to have a negative net worth?",
    answer: "Yes, especially for young adults and recent graduates. If you have $50,000 in student loan debt and only $5,000 in your bank account, your net worth is -$45,000. Do not panic; as you aggressively pay down debt and build savings, that number moves upward into the positive."
  },
  {
    question: "How often should I calculate my net worth?",
    answer: "Most financial advisors recommend tracking your net worth either quarterly or annually. Tracking it daily or weekly isn't useful because stock market fluctuations and house valuations shift constantly on paper."
  }
];

export default function NetWorthPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={NET_WORTH_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            You can make a $300,000 salary, drive a new Porsche, and live in a massive mansion—and still have a negative net worth if your lifestyle is entirely funded by debt.
          </p>
          <p>
            Income does not equal wealth. Our <strong>Net Worth Calculator</strong> strips away the financial illusions and forces you to confront the math. By tallying your hard assets against your outstanding liabilities, you'll discover exactly where you stand.
          </p>
          <p>
            Tracking this single number over time is the most effective way to ensure that your lifetime labor is actually translating into personal freedom.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Determining your net worth is accounting at its purest. You organize your life's balance sheet into two opposing columns:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Accounting Breakdown:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium text-gray-900">Aggregate All Assets:</span> We add together liquid cash, stock portfolios, retirement accounts, and the current market value of your real estate and vehicles.
              </li>
              <li>
                <span className="font-medium text-gray-900">Aggregate All Liabilities:</span> We add together the exact payoff balances (not the monthly payments) of your mortgages, credit cards, student loans, and auto loans.
              </li>
              <li>
                <span className="font-medium text-gray-900">Extract the Difference:</span> Liabilities are subtracted from Assets to spit out a singular, objective wealth score.
              </li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>The calculation is brilliantly straightforward, relying on zero complex interest math:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-2xl my-4 text-blue-900 font-bold">
            Net Worth = Total Assets − Total Liabilities
          </div>
          <p className="text-sm">
            Note: You only accrue actual wealth when the value of the asset column goes up, OR the value of the liability column goes down.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-bold text-blue-900 mb-4 text-lg">
            Example: Evaluating a Standard Household
          </p>
          <p className="mb-4 text-gray-700">Consider a family that recently bought a house and has standard consumer debt alongside modest retirement savings.</p>
          
          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded border border-blue-200">
              <p className="font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-2">Assets (+)</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between"><span>Checking & Savings:</span> <span>$15,000</span></li>
                <li className="flex justify-between"><span>401(k) / IRAs:</span> <span>$65,000</span></li>
                <li className="flex justify-between"><span>Home Market Value:</span> <span>$400,000</span></li>
                <li className="flex justify-between"><span>Vehicles Value:</span> <span>$25,000</span></li>
                <li className="flex justify-between font-bold pt-2 border-t mt-2"><span className="text-gray-900">Total Assets:</span> <span className="text-green-700">$505,000</span></li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded border border-blue-200">
              <p className="font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-2">Liabilities (-)</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between"><span>Remaining Mortgage:</span> <span>$320,000</span></li>
                <li className="flex justify-between"><span>Auto Loan Balance:</span> <span>$18,000</span></li>
                <li className="flex justify-between"><span>Student Loans:</span> <span>$45,000</span></li>
                <li className="flex justify-between"><span>Credit Card Debt:</span> <span>$6,000</span></li>
                <li className="flex justify-between font-bold pt-2 border-t mt-2"><span className="text-gray-900">Total Liabilities:</span> <span className="text-red-600">$389,000</span></li>
              </ul>
            </div>
            
            <div className="flex justify-between pt-2">
              <span className="text-xl font-bold text-blue-900">Total Net Worth:</span> 
              <span className="text-xl font-bold text-blue-900">$116,000</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Even though their home is $400k, their huge mortgage means their actual equity drops their total verifiable wealth down to $116k.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The 2 Ways to Grow Wealth
            </h2>
            <p className="mb-4 text-gray-700">
              Once you know your baseline number, raising it requires one of two actions (doing both simultaneously sparks massive net worth explosions):
            </p>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-green-500">
                <h3 className="font-bold text-gray-900">1. Acquire Appreciating Assets</h3>
                <p className="text-gray-600 mt-1">Stashing cash in a savings account barely fights inflation. Your net worth booms when you convert cash into S&P 500 Index Funds or Real Estate—assets that mathematically expand in value while you sleep.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-green-500">
                <h3 className="font-bold text-gray-900">2. aggressively Destroy Debt</h3>
                <p className="text-gray-600 mt-1">Paying off a $10,000 loan balance instantly shoots your net worth up by $10,000. Furthermore, killing that debt prevents it from generating suffocating compound interest against you.</p>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Actionable Financial Planners</h2>
            <p className="mb-4 text-gray-700">Don't just calculate your net worth—actively manipulate it using our scenario engines:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/compound-interest-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Surge Your Assets column</span>
                <span className="text-sm text-gray-500 mt-2 block">Dial in your investment contributions and visualize the exponential curve.</span>
              </Link>
              <Link href="/credit-card-payoff-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Crush Your Liability column</span>
                <span className="text-sm text-gray-500 mt-2 block">Map out an aggressive payoff schedule to eviscerate costly credit card debt.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <NetWorthCalculator />
    </CalculatorPage>
  );
}
