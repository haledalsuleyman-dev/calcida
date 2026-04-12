import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Mortgage Calculators for Payments and Affordability',
  description: 'Explore mortgage calculators for monthly payments, affordability, PMI, refinancing, amortization, and other home loan decisions.',
  canonicalPath: '/mortgage',
});

const calculators = [
  {
    name: "Mortgage Payment Calculator",
    description: "Calculate your monthly mortgage payment including taxes, insurance, and PMI.",
    href: "/mortgage-payment-calculator"
  },
  {
    name: "Mortgage Amortization Calculator",
    description: "View your complete mortgage repayment schedule breakdown by principal and interest.",
    href: "/mortgage-amortization-calculator"
  },
  {
    name: "Bi-Weekly Mortgage Calculator",
    description: "See how much interest you can save by switching to bi-weekly payments.",
    href: "/biweekly-mortgage-calculator"
  },
  {
    name: "Extra Payment Calculator",
    description: "Calculate how much time and interest you save by making extra principal payments.",
    href: "/extra-payment-mortgage-calculator"
  },
  {
    name: "Refinance Calculator",
    description: "Determine if refinancing your mortgage will save you money.",
    href: "/refinance-calculator"
  },
  {
    name: "Mortgage Refinance Calculator",
    description: "Calculate refinance savings and find your break-even point including closing costs.",
    href: "/mortgage-refinance-calculator"
  }
];

const faq = [
  {
    question: "What is a mortgage calculator?",
    answer: "A mortgage calculator is a financial tool that helps you estimate your monthly mortgage payments. It takes into account the loan amount, interest rate, loan term, and often includes additional costs like property taxes, homeowners insurance, and PMI."
  },
  {
    question: "How much house can I afford?",
    answer: "A general rule of thumb is the 28/36 rule: spend no more than 28% of your gross monthly income on housing expenses and no more than 36% on total debt. Our mortgage affordability calculator can help you determine a precise budget based on your income and debts."
  },
  {
    question: "What is PMI and how can I avoid it?",
    answer: "Private Mortgage Insurance (PMI) is usually required if your down payment is less than 20% of the home's purchase price. To avoid PMI, you typically need to make a down payment of at least 20%. Alternatively, you can look into piggyback loans or lender-paid PMI options."
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 30-year mortgage offers lower monthly payments, making it more affordable for many buyers. A 15-year mortgage has higher monthly payments but saves you a significant amount in interest over the life of the loan and allows you to build equity faster."
  },
  {
    question: "How do interest rates affect my mortgage?",
    answer: "Interest rates directly impact your monthly payment and the total cost of the loan. Even a small difference in rate (e.g., 0.5%) can add up to tens of thousands of dollars in interest over a 30-year term. It's crucial to shop around for the best rate."
  },
  {
    question: "What are closing costs?",
    answer: "Closing costs are fees paid at the closing of a real estate transaction. They typically range from 2% to 5% of the loan amount and include appraisal fees, title insurance, origination fees, and prepaid taxes and insurance."
  }
];

export default function MortgageCategoryPage() {
  return (
    <CategoryPage
      title="Mortgage Calculators"
      description="Plan your home purchase with our comprehensive suite of mortgage calculators. Estimate payments, compare loan types, and find your budget."
      calculators={calculators}
      faq={faq}
    >
      <div className="space-y-6 text-gray-800">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Looking for a fast directory? Browse <Link href="/mortgage-calculators" className="text-blue-700 hover:underline font-medium">Mortgage Calculators</Link> or view the full <Link href="/calculators" className="text-blue-700 hover:underline font-medium">Calculators</Link> index.
          </p>
        </div>
        <p>
          Buying a home is one of the most significant financial decisions you will ever make. Navigating the complex world of mortgages, interest rates, and loan terms can be daunting. That's why we've created a comprehensive suite of <strong>free mortgage calculators</strong> to help you every step of the way.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Use a Mortgage Calculator?</h2>
        <p>
          Before you start house hunting, it's essential to understand your budget. A mortgage calculator allows you to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Estimate Monthly Payments:</strong> See exactly how much a home will cost you each month, including principal, interest, taxes, and insurance (PITI).</li>
          <li><strong>Compare Loan Scenarios:</strong> Test different down payments, interest rates, and loan terms to see how they affect your monthly obligation.</li>
          <li><strong>Plan for the Future:</strong> Understand how extra payments can shorten your loan term and save you thousands in interest.</li>
          <li><strong>Avoid Surprises:</strong> Factor in often-overlooked costs like HOA fees and Private Mortgage Insurance (PMI).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Understanding Key Mortgage Terms</h2>
        <p>
          To get the most out of our calculators, it helps to understand the terminology:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Principal</h3>
            <p>The amount of money you borrow from the lender. As you make payments, your principal balance decreases.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Interest</h3>
            <p>The cost of borrowing money, expressed as a percentage. This is paid to the lender over the life of the loan.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Amortization</h3>
            <p>The process of paying off debt with regular payments over time. An amortization schedule shows the breakdown of each payment.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Equity</h3>
            <p>The difference between your home's market value and the amount you owe on your mortgage. You build equity as you pay down principal.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Types of Mortgages</h2>
        <p>
          There are several types of mortgage loans available, each with its pros and cons:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Fixed-Rate Mortgage:</strong> The interest rate remains the same for the entire loan term (usually 15 or 30 years), providing predictable monthly payments.</li>
          <li><strong>Adjustable-Rate Mortgage (ARM):</strong> The interest rate is fixed for an initial period (e.g., 5 years) and then adjusts periodically based on market conditions.</li>
          <li><strong>FHA Loan:</strong> A government-backed loan with lower credit score and down payment requirements, popular among first-time homebuyers.</li>
          <li><strong>VA Loan:</strong> A loan for eligible veterans and active-duty service members, often requiring no down payment and no PMI.</li>
        </ul>

        <p className="mt-8">
          Whether you are calculating your first mortgage payment, looking to refinance, or planning to pay off your loan early, Calcida's tools are here to provide clarity and confidence in your financial journey.
        </p>
      </div>
    </CategoryPage>
  );
}
