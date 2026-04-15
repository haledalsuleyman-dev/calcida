import { CalculatorPage } from '@/components/CalculatorPage';
import { SalaryToHourlyCalculator } from '@/components/calculators/salary/SalaryToHourlyCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('salary-to-hourly');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Salary to Hourly Calculator (${currentYear}): Convert Annual Income`,
  description: `Easily convert your annual salary to an hourly wage, or vice versa. Find out exactly how much you make per hour, day, week, and month instantly.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Salary to Hourly Calculator (${currentYear}): Convert Annual Income`,
    description: `Easily convert your annual salary to an hourly wage, or vice versa. Find out exactly how much you make per hour, day, week, and month instantly.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const SALARY_TO_HOURLY_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "How do you calculate salary to hourly?",
    answer: "Divide your annual salary by the total number of hours you work in a year. A standard full-time year is 2,080 hours (40 hours/week × 52 weeks). So a $50,000 salary divided by 2,080 equals roughly $24.04 an hour."
  },
  {
    question: "Is doing contract hourly work better than a salary?",
    answer: "It depends. Hourly (1099 or contract) work pays for every hour you work, and often has a much higher gross rate. However, you are responsible for your own health insurance, sick days, and self-employment taxes, which salaried W-2 employers normally cover."
  },
  {
    question: "How many work hours are actually in a year?",
    answer: "While 2,080 is the standard mathematical baseline for 52 weeks at 40 hours a week, if you take 2 weeks of unpaid vacation, your working hours drop to 2,000. Use 2,080 for generalized math, and 2,000 for conservative contract budgeting."
  },
  {
    question: "Should I negotiate based on hourly rate or salary?",
    answer: "Always negotiate based on total annual compensation (Salary + Benefits + Bonuses). If you are switching from salary to an hourly contracting gig, you generally need to charge 20% to 30% MORE per hour to make up for the lack of employer-paid benefits."
  },
  {
    question: "What is $25 an hour annually?",
    answer: "Assuming a standard full-time workload of 40 hours a week for 52 weeks (2,080 hours total), $25 an hour translates to an annual salary of $52,000."
  }
];

export default function SalaryToHourlyCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={SALARY_TO_HOURLY_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            When preparing for a job interview, transitioning to freelance work, or simply wondering what your time is really worth, converting a fixed salary into an hourly rate is a required step.
          </p>
          <p>
            Our <strong>Salary to Hourly Calculator</strong> instantly translates your annual income into an exact hourly, daily, weekly, and monthly wage. You can run the math firmly in both directions: salary to hourly, or hourly up to annual salary.
          </p>
          <p>
            Use this tool to set a baseline so you never accidentally accept a pay cut when switching between different compensation structures.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Converting your pay is a straightforward mathematical process of scaling your compensation up or down based on the exact hours you work securely in a standard calendar year.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Conversion Math:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-medium text-gray-900">Establish Annual Hours:</span> We multiply your standard "Hours per Week" by your "Weeks per Year" (the max base is 52 weeks). This yields your total working hours.</li>
              <li><span className="font-medium text-gray-900">Salary to Hourly:</span> We divide your total annual salary by the total annual working hours.</li>
              <li><span className="font-medium text-gray-900">Hourly to Salary:</span> We multiply your hourly rate by your weekly hours, and multiply that by your total working weeks.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>
            The formulas used across the finance world for these conversions are beautifully objective:
          </p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4 space-y-2">
            <p>Annual Salary = Hourly Rate × Hours per Week × Weeks per Year</p>
            <p>Hourly Rate = Annual Salary / (Hours per Week × Weeks per Year)</p>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">Scenario: Going Freelance from an $80,000 Salary</p>
          <p className="mb-4 text-gray-700">Let's assume you work 40 hours a week, 52 weeks a year, and earn an $80,000 W-2 salary. You are considering a 1099 hourly freelance contract and want to find your breakeven hourly rate.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Annual Salary:</span> <span className="font-medium">$80,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Weeks per Year:</span> <span className="font-medium">52 Weeks</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Hours per Week:</span> <span className="font-medium">40 Hours</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Total Annual Hours:</span> <span className="font-medium">2,080</span>
            </li>
            <li className="flex justify-between pt-2 mt-2 border-t border-blue-300">
              <span className="text-xl font-bold text-blue-900">Gross Hourly Equivalence:</span> 
              <span className="text-xl font-bold text-blue-900">$38.46 / hr</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Warning: $38.46/hr is only the GROSS equivalent. Freelancers have to pay an extra 7.65% in self-employment tax and fund their own medical insurance. To truly match an $80k salaried lifestyle, a freelancer usually needs to charge around $50-$60/hr.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Why the 2,080 Rule Matters</h2>
            <p className="mb-4 text-gray-700">
              When recruiters throw around hourly rates, they almost universally utilize the <strong>2,080 rule</strong>. 
            </p>
            <p className="mb-4 text-gray-700">
              52 weeks × 40 hours = 2,080. If someone offers you $30 an hour, you multiply $30 by 2,080 to arrive at a gross annual salary of $62,400. Committing this math to memory allows you to instantly decipher whether a job offer on LinkedIn is a lowball or a massive step forward.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps: Check Your Taxes</h2>
            <p className="mb-4 text-gray-700">
              No matter what your hourly rate says on paper, the IRS takes their cut. Convert your gross pay into your true net (take-home) pay below:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/paycheck-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Paycheck Calculator</span>
                <p className="text-sm text-gray-600 mt-2">Deduct federal, state, FICA taxes, and 401(k) contributions to see your precise semi-monthly or biweekly paycheck amount.</p>
              </Link>
              <Link href="/self-employment-tax-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Self-Employment Taxes</span>
                <p className="text-sm text-gray-600 mt-2">If you took an hourly 1099 role, run the figures here to prepare for your brutal quarterly tax payments.</p>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <SalaryToHourlyCalculator />
    </CalculatorPage>
  );
}
