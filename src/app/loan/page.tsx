import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Loan Calculators for Auto, Personal and Student Loans',
  description: 'Compare auto, personal, and student loan scenarios with calculators for monthly payments, APR, payoff timelines, and borrowing costs.',
  canonicalPath: '/loan',
});

const calculators = [
  {
    name: "Auto Loan Calculator",
    description: "Estimate monthly car payments and see how interest rates affect your total loan cost.",
    href: "/auto-loan-calculator"
  },
  {
    name: "Personal Loan Calculator",
    description: "Calculate payments and interest for personal loans, debt consolidation, or major purchases.",
    href: "/personal-loan-calculator"
  },
  {
    name: "Student Loan Calculator",
    description: "Plan your student loan repayment strategy and see how extra payments can save you money.",
    href: "/student-loan-calculator"
  },
  {
    name: "Loan Comparison Calculator",
    description: "Compare two loan offers side-by-side to see which one saves you more money.",
    href: "/loan-comparison-calculator"
  },
  {
    name: "APR Calculator",
    description: "Calculate the true APR of a loan including fees and compare borrowing costs accurately.",
    href: "/apr-calculator"
  }
];

const faq = [
  {
    question: "How is a loan payment calculated?",
    answer: "Loan payments are calculated using an amortization formula that takes into account the loan principal (amount borrowed), the annual interest rate (APR), and the loan term (length of time to repay). The formula ensures that you pay off both the interest and principal by the end of the term."
  },
  {
    question: "What is APR?",
    answer: "APR stands for Annual Percentage Rate. It is the yearly cost of borrowing money, including both the interest rate and any fees or additional costs associated with the loan. APR provides a more complete picture of the cost of a loan than the interest rate alone."
  },
  {
    question: "How does the loan term affect my payment?",
    answer: "A longer loan term (e.g., 60 months vs. 36 months) lowers your monthly payment but increases the total amount of interest you pay over the life of the loan. A shorter term increases your monthly payment but saves you money on interest."
  },
  {
    question: "Should I pay off my loan early?",
    answer: "Paying off a loan early can save you a significant amount of money in interest. However, you should check if your lender charges a prepayment penalty. Also, consider if that money could be better used elsewhere, such as paying off higher-interest debt or investing."
  },
  {
    question: "What is the difference between a secured and unsecured loan?",
    answer: "A secured loan is backed by collateral (like a car or house) that the lender can seize if you fail to repay. An unsecured loan (like most personal loans and student loans) is not backed by collateral and relies on your creditworthiness."
  }
];

export default function LoanCategoryPage() {
  return (
    <CategoryPage
      title="Loan Calculators"
      description="Calculate payments for any type of loan with our easy-to-use tools. Compare rates, terms, and total costs."
      calculators={calculators}
      faq={faq}
    >
      <div className="space-y-6 text-gray-800">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Browse the complete <Link href="/loan-calculators" className="text-blue-700 hover:underline font-medium">Loan Calculators</Link> hub or explore the full <Link href="/calculators" className="text-blue-700 hover:underline font-medium">Calculators</Link> index.
          </p>
        </div>
        <p>
          Loans are a fundamental part of personal finance, allowing us to afford major purchases like cars, education, and home improvements. However, taking on debt is a serious commitment. Our <strong>free loan calculators</strong> are designed to help you understand the true cost of borrowing before you sign on the dotted line.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Use a Loan Calculator?</h2>
        <p>
          Lenders often focus on the monthly payment to make a loan seem affordable. But looking only at the monthly payment can be misleading. A loan calculator helps you:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>See the Total Cost:</strong> Understand exactly how much you will pay in interest over the life of the loan.</li>
          <li><strong>Compare Terms:</strong> See how a 3-year loan compares to a 5-year loan in terms of monthly payments and total interest.</li>
          <li><strong>Budget Effectively:</strong> Ensure that the monthly payment fits comfortably within your budget without stretching your finances.</li>
          <li><strong>Plan Repayment:</strong> Experiment with extra payments to see how much faster you can become debt-free.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Common Types of Loans</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">Auto Loans</h3>
            <p className="text-sm">Used to purchase vehicles. These are secured loans, meaning the car is collateral. Terms typically range from 36 to 72 months.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">Personal Loans</h3>
            <p className="text-sm">Unsecured loans used for various purposes like debt consolidation, weddings, or medical bills. Rates depend heavily on credit score.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-blue-900">Student Loans</h3>
            <p className="text-sm">Loans to pay for higher education. Federal loans offer fixed rates and protections, while private loans vary based on credit.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Key Loan Terminology</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Principal:</strong> The original amount of money borrowed.</li>
          <li><strong>Interest Rate:</strong> The percentage of the principal charged by the lender for the use of their money.</li>
          <li><strong>APR (Annual Percentage Rate):</strong> The annual cost of the loan, including interest and fees.</li>
          <li><strong>Term:</strong> The amount of time you have to repay the loan.</li>
          <li><strong>Amortization:</strong> The schedule of payments that pays off the loan over time.</li>
        </ul>

        <p className="mt-8">
          Use our calculators to take control of your debt. By understanding the numbers, you can choose the best loan for your situation and save money in the long run.
        </p>
      </div>
    </CategoryPage>
  );
}
