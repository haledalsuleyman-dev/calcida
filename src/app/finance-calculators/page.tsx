import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Finance Calculators for Investing and Retirement',
  description: 'Use finance calculators to project compound growth, compare investment returns, estimate savings targets, and plan retirement.',
  canonicalPath: '/finance-calculators',
});

const calculators = [
  {
    name: "Compound Interest Calculator",
    description: "Visualize how your money can grow over time with the power of compound interest.",
    href: "/compound-interest-calculator"
  },
  {
    name: "Retirement Calculator",
    description: "Determine how much you need to save to retire comfortably.",
    href: "/retirement-calculator"
  },
  {
    name: "401k Calculator",
    description: "Project your 401(k) balance at retirement including employer matching.",
    href: "/401k-calculator"
  },
  {
    name: "Savings Calculator",
    description: "Calculate how much you can save over time with consistent deposits and interest.",
    href: "/savings-calculator"
  },
  {
    name: "Investment Return Calculator",
    description: "Calculate the return on investment (ROI) for your portfolio or business ventures.",
    href: "/investment-return-calculator"
  }
];

const faq = [
  {
    question: "What is compound interest?",
    answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Essentially, it's 'interest on interest,' which allows your investments to grow exponentially over time."
  },
  {
    question: "How much do I need to retire?",
    answer: "A common rule of thumb is to aim for a retirement nest egg that is 25 times your expected annual expenses (based on the 4% withdrawal rule). For example, if you need $60,000 per year, you should aim for $1.5 million. However, this depends on your lifestyle, lifespan, and other income sources like Social Security."
  },
  {
    question: "What is the difference between a 401(k) and an IRA?",
    answer: "A 401(k) is an employer-sponsored retirement plan that often comes with a company match. An IRA (Individual Retirement Account) is a plan you open on your own. Both offer tax advantages, but 401(k)s typically have higher annual contribution limits."
  },
  {
    question: "What is a good rate of return on investments?",
    answer: "Historically, the S&P 500 (a proxy for the US stock market) has returned about 10% annually on average before inflation (or about 7% after inflation). However, returns vary by year and asset class. A conservative estimate for planning is often 6-8%."
  },
  {
    question: "How does inflation affect my savings?",
    answer: "Inflation reduces the purchasing power of your money over time. If inflation is 3% per year, $100 today will only buy about $97 worth of goods next year. Your investments need to grow faster than inflation to increase your real wealth."
  }
];

export default function FinanceCategoryPage() {
  return (
    <CategoryPage
      title="Finance Calculators"
      description="Plan your financial future with free calculators for compound interest, retirement savings, 401k growth, and investment returns."
      calculators={calculators}
      faq={faq}
    >
      <div className="space-y-6 text-gray-800">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Explore focused hubs for <Link href="/investment-calculators" className="text-blue-700 hover:underline font-medium">Investment Calculators</Link>,{' '}
            <Link href="/retirement-calculators" className="text-blue-700 hover:underline font-medium">Retirement Calculators</Link>, and{' '}
            <Link href="/budget-calculators" className="text-blue-700 hover:underline font-medium">Budget Calculators</Link>, or browse the full{' '}
            <Link href="/calculators" className="text-blue-700 hover:underline font-medium">Calculators</Link> directory.
          </p>
        </div>
        <p>
          Building wealth isn't just about how much you earn; it's about how well you manage, save, and invest your money. Our <strong>free finance calculators</strong> are designed to help you project your future wealth, understand the power of compounding, and stay on track for retirement.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8">The Power of Compound Interest</h2>
        <p>
          Albert Einstein famously called compound interest the "eighth wonder of the world." It is the engine that drives wealth creation.
        </p>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 my-6">
          <h3 className="font-bold text-lg mb-3 text-green-900">Example: Starting Early vs. Starting Late</h3>
          <p className="mb-2">
            Assuming an 8% annual return:
          </p>
          <ul className="space-y-4">
            <li>
              <strong>Investor A</strong> starts at age 25, invests $200/month for 10 years, then stops. Total invested: $24,000.
              <br />
              <span className="text-green-700 font-bold">Value at age 65: ~$275,000</span>
            </li>
            <li>
              <strong>Investor B</strong> starts at age 35, invests $200/month for 30 years. Total invested: $72,000.
              <br />
              <span className="text-green-700 font-bold">Value at age 65: ~$270,000</span>
            </li>
          </ul>
          <p className="mt-4 text-sm italic text-green-800">
            Even though Investor B invested 3x more money, Investor A ended up with more because their money had 10 extra years to compound.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Retirement Planning Basics</h2>
        <p>
          Planning for retirement involves estimating your future expenses and determining how much you need to save today to meet them.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">401(k) Plans</h3>
            <p className="text-sm">Take advantage of employer matching—it's free money. Contributions reduce your taxable income today.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">IRAs</h3>
            <p className="text-sm">Individual Retirement Accounts offer tax benefits. Choose Traditional (tax deduction now) or Roth (tax-free withdrawals later).</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">Social Security</h3>
            <p className="text-sm">A government safety net, but likely not enough to fully fund your retirement. View it as a supplement to your savings.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Key Investment Concepts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Asset Allocation:</strong> How you divide your portfolio between stocks, bonds, and cash. This determines your risk and potential return.</li>
          <li><strong>Diversification:</strong> Spreading investments across different sectors and geographies to reduce risk. "Don't put all your eggs in one basket."</li>
          <li><strong>Expense Ratios:</strong> The fees charged by funds. High fees eat into your returns over time. Low-cost index funds are often recommended.</li>
          <li><strong>Time Horizon:</strong> How long you plan to hold an investment. Longer horizons generally allow for more aggressive (riskier) investments like stocks.</li>
        </ul>

        <p className="mt-8">
          Financial freedom is a journey, not a destination. Use our calculators to map out your path and adjust your course as needed.
        </p>
      </div>
    </CategoryPage>
  );
}
