import { CalculatorPage } from '@/components/CalculatorPage';
import { PaycheckCalculator } from '@/components/calculators/salary/PaycheckCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('paycheck');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: 'Paycheck Calculator: Estimate Take-Home Pay',
  description: 'Estimate your true take-home paycheck. Fast, free paycheck calculator that deducts federal taxes, state taxes, FICA, and 401(k) contributions automatically.',
  canonicalPath: spec.route,
});

const PAYCHECK_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "Why is my take-home pay lower than my salary?",
    answer: "Your salary is 'gross' income. Before any money hits your bank account, your employer legally must deduct federal income taxes, state income taxes, FICA taxes (Social Security and Medicare), and any personal deductions you chose like medical insurance premiums or 401(k) contribution."
  },
  {
    question: "What are FICA taxes, exactly?",
    answer: "FICA stands for Federal Insurance Contributions Act. It's a mandatory payroll tax. You pay 6.2% for Social Security and 1.45% for Medicare from every paycheck (totaling 7.65%). Your employer also pays a matching 7.65% behind the scenes."
  },
  {
    question: "How do pre-tax deductions like a 401(k) save me money?",
    answer: "Pre-tax deductions are subtracted from your gross pay BEFORE federal taxes are calculated. If you contribute $200 a paycheck to a Traditional 401(k), the IRS calculates your taxes as if you never earned that $200, effectively lowering your total tax burden."
  },
  {
    question: "How do I change how much tax is withheld?",
    answer: "You change your federal withholding by submitting a new W-4 form to your HR department. If you got a massive tax refund last year, it means you let the government hold too much of your paycheck each month. Adjusting your W-4 puts that money back in your pocket."
  },
  {
    question: "Is biweekly or semi-monthly better?",
    answer: "Biweekly means you get paid every two weeks (26 paychecks a year). Often this yields two 'magic months' where you receive three paychecks. Semi-monthly means getting paid twice a month (24 paychecks a year). Your total annual pay is mathematically identical; the checks are simply divided differently."
  }
];

export default function PaycheckCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={PAYCHECK_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            An offer letter with a massive gross salary looks fantastic—until reality sets in alongside federal taxes, state taxes, FICA, and premium healthcare deductions.
          </p>
          <p>
            Our <strong>{currentYear} Paycheck Calculator</strong> removes the guesswork. You can seamlessly factor in your 401(k) allocations, HSA goals, and location-specific tax withholdings to see precisely what your direct deposit will look like.
          </p>
          <p>
            Use this tool to compare job offers located in different tax states or to strategically adjust your W-4 withholding levels to maximize your monthly cash flow.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Estimating your net pay is a waterfall process. We systematically slice down your gross pay through every level of the US Tax Code constraints.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Withholding Waterfall:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-medium text-gray-900">Gross Baseline calculation:</span> We break your annual salary into the correct pay periods (e.g., dividing by 26 for biweekly checks).</li>
              <li><span className="font-medium text-gray-900">Subtract Pre-tax Deductions:</span> Things like Traditional 401(k), health premiums, and HSA contributions are immediately pulled out. This establishes your official "Taxable Income".</li>
              <li><span className="font-medium text-gray-900">Calculate Mandatory Taxes:</span> We calculate state taxes, progressive federal bracket taxes, and the mandatory 7.65% FICA cut.</li>
              <li><span className="font-medium text-gray-900">Final Net Pay:</span> All taxes are subtracted from the Taxable Income to produce the final cash deposit.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>The mathematical pathway to your bank account:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4 space-y-2">
            <p className="text-gray-500 text-base">Step 1: Gross Pay – PreTax Deductions = Taxable Income</p>
            <p className="text-gray-500 text-base">Step 2: Taxes = (Taxable Income × Tax Brackets) + (Gross Pay × 7.65% FICA)</p>
            <p className="font-bold text-blue-900">Step 3: NET PAY = Taxable Income – Taxes – PostTax Deductions</p>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">Example: Taking Home a $75,000 Salary</p>
          <p className="mb-4 text-gray-700">You finally landed a job playing $75,000. You are single, live in a typical state, get paid bi-weekly (26 times a year), and contribute 5% to a Traditional 401k.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Gross Biweekly Paycheck:</span> <span className="font-medium">$2,884</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>401(k) Pre-Tax Contribution (5%):</span> <span className="font-medium text-red-600">-$144</span>
            </li>
            <li className="flex justify-between pb-2 bg-blue-100 px-2 py-1 rounded">
              <span className="font-medium">Taxable Income Base:</span> <span className="font-bold">$2,740</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2 pt-2">
              <span>Estimated Federal Tax Withholding:</span> <span className="font-medium text-red-600">-$280</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>FICA (Soc Sec + Medicare):</span> <span className="font-medium text-red-600">-$220</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Estimated State Tax:</span> <span className="font-medium text-red-600">-$115</span>
            </li>
            <li className="flex justify-between pt-2 mt-2 border-t border-blue-300">
              <span className="text-xl font-bold text-blue-900">Final Take-Home Pay (Net):</span> 
              <span className="text-xl font-bold text-blue-900">~$2,125</span>
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Stop Giving the IRS an Interest-Free Loan</h2>
            <p className="mb-4 text-gray-700">
              If your tax refund in April is $3,600, you shouldn't celebrate. It means you accidentally loaned the government $300 a month at 0% interest for an entire year. 
            </p>
            <p className="mb-4 text-gray-700">
              Every month that $300 was locked up, you couldn't use it to pay off high-interest debt or invest in your savings. You should aim to tune your W-4 form accurately using tools like this so your refund is as close to $0 as possible, vastly increasing your monthly liquidity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Tax Optimization Next Steps</h2>
            <p className="mb-4 text-gray-700">
              Want to dive deeper into the mechanics taking away your hard-earned money? Use these related tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/income-tax-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Federal Income Tax Calc</span>
                <p className="text-sm text-gray-600 mt-2">See exactly how you are being taxed across the 7 progressive federal tax brackets before pay period divisions.</p>
              </Link>
              <Link href="/401k-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">401(k) Visualizer</span>
                <p className="text-sm text-gray-600 mt-2">See how adjusting your pre-tax deduction percent up or down dynamically compounds over a 30-year horizon.</p>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <PaycheckCalculator />
    </CalculatorPage>
  );
}
