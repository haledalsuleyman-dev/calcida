
import { CalculatorPage } from '@/components/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('mortgage-payment');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});


const MORTGAGE_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "How is a mortgage payment calculated?",
    answer: "A mortgage payment is calculated using the principal loan amount, interest rate, and loan term. The core formula determines the monthly principal and interest. To get the total monthly payment, we add estimated property taxes, homeowners insurance, and HOA fees (if applicable)."
  },
  {
    question: "What is PITI?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Principal and interest go to the lender, while taxes and insurance are often held in an escrow account."
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 30-year mortgage has lower monthly payments, making it more affordable for many. A 15-year mortgage has higher monthly payments but significantly lower total interest costs and builds equity much faster."
  },
  {
    question: "Do I need to include PMI in my calculation?",
    answer: "If you are putting down less than 20% on a conventional loan, you will likely pay Private Mortgage Insurance (PMI). This calculator can help you estimate your payment with and without PMI costs."
  },
  {
    question: "How do interest rates affect my monthly payment?",
    answer: "Even a 1% difference in interest rate can change your monthly payment by hundreds of dollars and increase the total interest paid over the life of the loan by tens of thousands of dollars."
  }
];

export default function MortgagePaymentCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={MORTGAGE_FAQ}
      howItWorks={
        <div className="space-y-4">
          <p>
            This calculator determines your monthly mortgage payment (PITI) by combining your loan's principal and interest with estimated local costs for taxes and insurance.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 my-6">
            <h3 className="font-bold text-gray-900 mb-2">The Calculation Process:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium text-gray-900">Loan Amount:</span> We subtract your down payment from the home price.</li>
              <li><span className="font-medium text-gray-900">Monthly Interest:</span> Your annual rate is divided by 12 to get the monthly interest charge.</li>
              <li><span className="font-medium text-gray-900">Amortization:</span> We apply the standard formula to spread principal and interest across your chosen term (e.g., 360 months for a 30-year loan).</li>
              <li><span className="font-medium text-gray-900">Add-ons:</span> We add 1/12th of your annual property taxes, homeowners insurance, and HOA fees to the core payment.</li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4">Here is a common scenario for a $400,000 home purchase:</p>
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li><strong>Home Price:</strong> $400,000</li>
            <li><strong>Down Payment (20%):</strong> $80,000</li>
            <li><strong>Loan Amount:</strong> $320,000</li>
            <li><strong>Interest Rate:</strong> 6.5%</li>
            <li><strong>Loan Term:</strong> 30 Years</li>
            <li className="pt-2 border-t border-blue-200 mt-2">
              <span className="text-xl font-bold text-blue-900">Monthly Principal & Interest: ~$2,023</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800">
            *Note: Your final payment will be higher once you include localized property taxes and homeowners insurance.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Lower Your Mortgage Payment</h2>
            <p className="mb-4">
              If the estimated payment is higher than your monthly budget, consider these strategies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Increase Down Payment:</strong> Every dollar down reduces your loan balance and potential PMI costs.</li>
              <li><strong>Improve Credit Score:</strong> A better credit score often leads to lower interest rate offers.</li>
              <li><strong>Shop for Insurance:</strong> Get multiple quotes for homeowners insurance to find the most competitive rate.</li>
              <li><strong>Extend the Term:</strong> Choosing a 30-year loan instead of a 15-year loan lowers the monthly payment, though you will pay more in total interest.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Mortgage Tools</h2>
            <p className="mb-4 text-gray-700">
              Planning your home purchase requires looking at the numbers from different angles. Use these related calculators to refine your strategy:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/mortgage-amortization-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">Amortization Calculator</span>
                <span className="text-sm text-gray-500 no-underline">See a full schedule of every payment over the loan term.</span>
              </Link>
              <Link href="/mortgage/how-much-house-can-i-afford-on-70000-salary" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">Mortgage Affordability</span>
                <span className="text-sm text-gray-500 no-underline">Estimate how much house you can afford based on your income.</span>
              </Link>
              <Link href="/refinance-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">Refinance Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Already have a mortgage? See if a lower rate could save you money.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <MortgageCalculator />
    </CalculatorPage>
  );
}
