import { CalculatorPage } from '@/components/CalculatorPage';
import { IncomeTaxCalculator } from '@/components/calculators/generated/TaxExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('income-tax');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Federal Income Tax Calculator (${currentYear}): Check Your Brackets`,
  description: `Estimate your ${currentYear} federal income tax bill. Understand your effective tax rate, marginal tax brackets, and optimize your deductions.`,
  canonicalPath: spec.route,
});

const TAX_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is the difference between marginal and effective tax rates?",
    answer: "Your 'marginal' tax rate is the highest bracket you reach—meaning it's the percentage of tax you pay on your very last dollar earned. Your 'effective' tax rate is the blended average rate you pay across all your income. Your effective rate is always significantly lower than your marginal rate."
  },
  {
    question: "How do progressive tax brackets work?",
    answer: "The US uses progressive tax brackets. Imagine buckets. Your first $11,000 fills the 10% bucket. Your income from $11,001 up to $44,000 fills the 12% bucket. If you earn $50,000, only the final $6,000 spills into the 22% bucket. You do NOT pay 22% on the entire $50,000."
  },
  {
    question: "What is the Standard Deduction?",
    answer: "The standard deduction is a flat, zero-tax amount created by the IRS to shield your baseline living income from federal taxes. You subtract it directly from your gross income to lower your 'Taxable Income'."
  },
  {
    question: "How can I legally lower my tax bill?",
    answer: "The best ways to reduce taxable income are contributing to pre-tax retirement accounts (Traditional 401(k), Traditional IRA), funding Health Savings Accounts (HSAs), and claiming all available credits like the Child Tax Credit."
  },
  {
    question: "Are FICA taxes the same as income taxes?",
    answer: "No. Federal income taxes fund the US government generally. FICA taxes (7.65%) strictly fund Social Security and Medicare. FICA is taken out via payroll deductions completely separately from your income tax brackets."
  }
];

export default function IncomeTaxCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={TAX_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Understanding the United States tax code feels like trying to decipher a foreign language. But once you grasp how progressive tax brackets actually work, you unlock the ability to legally protect thousands of your own dollars.
          </p>
          <p>
            Our <strong>{currentYear} Federal Income Tax Calculator</strong> strips away the confusion. We calculate your estimated tax bill, explicitly separate your effective rate from your marginal rate, and demonstrate precisely how the standard deduction operates.
          </p>
          <p>
            Run the numbers to predict your tax burden ahead of time, ensuring you never receive a surprise tax bill in April.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Your total gross salary is essentially run through an IRS filter. Here is how your numbers get separated, shrunk down, and taxed:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The 3-Step Taxation Algorithm</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium text-gray-900">Determine Taxable Income:</span> We take your total Gross Income and immediately subtract the Standard Deduction for your filing status (Single, Married, Head of Household).
              </li>
              <li>
                <span className="font-medium text-gray-900">Run the Bracket Engine:</span> We push your new Taxable Income through the 7 IRS brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%). As your money fills a lower tier, the remaining balance pushes into the higher tier.
              </li>
              <li>
                <span className="font-medium text-gray-900">Synthesize Total Tax:</span> We add the tax generated from each bucket together to produce your total Federal Tax liability.
              </li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>The core concept the IRS relies on is identifying your Taxable base:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4 space-y-2">
            <p>Taxable Income = Gross Pay - (Pre-Tax Deductions + Standard Deduction)</p>
          </div>
          <p className="text-sm">
            Once Taxable Income is identified, it is simply subjected to tiered percentages.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-bold text-blue-900 mb-4 text-lg">
            Example: Why Gross Pay is a Lie
          </p>
          <p className="mb-4 text-gray-700">Let's witness how progressive taxation operates on a very common scenario: A Single Filer earning $80,000 a year.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Total Gross Income:</span> <span className="font-medium">$80,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Less Approx Standard Deduction:</span> <span className="font-medium text-red-600">-$15,000</span>
            </li>
            <li className="flex justify-between pb-2 pt-1 bg-blue-100 px-2 rounded">
              <span className="font-medium text-blue-900">Actual Taxable Income Base:</span> <span className="font-bold text-blue-900">$65,000</span>
            </li>
            
            <li className="pt-3 pb-1 font-bold text-sm text-gray-500 uppercase tracking-wide">Bracket Breakdown:</li>
            <li className="flex justify-between text-sm ml-4 border-l-2 border-blue-300 pl-2">
              <span>The 10% Bracket slices off:</span> <span>~$1,200</span>
            </li>
            <li className="flex justify-between text-sm ml-4 border-l-2 border-blue-300 pl-2">
              <span>The 12% Bracket slices off:</span> <span>~$4,400</span>
            </li>
            <li className="flex justify-between text-sm ml-4 border-l-2 border-blue-300 pl-2 border-b border-blue-100 pb-2">
              <span>The 22% Bracket slices off:</span> <span>~$3,600</span>
            </li>
            
            <li className="flex justify-between pt-2 mt-2">
              <span className="text-xl font-bold text-blue-900">Total Federal Tax:</span> 
              <span className="text-xl font-bold text-blue-900">~$9,200</span>
            </li>
            <li className="flex justify-between pt-1 text-blue-800">
              <span className="font-medium text-sm">Marginal Bracket vs. Effective Rate</span> 
              <span className="font-medium text-sm">22% vs. 11.5%</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Notice how they hit the terrifying 22% bracket, but because of the buckets, their ACTUAL effective tax rate is only 11.5%.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Myth: A Raise Will Lower Your Pay
            </h2>
            <p className="mb-4 text-gray-700">
              You will hear people say, <em>"I don't want a raise. It will push me into a higher tax bracket and I'll make less money!"</em>
            </p>
            <p className="mb-4 text-gray-700">
              This is mathematically impossible. Because we use progressive tax brackets, ONLY the income that crosses the boundary line gets subjected to the higher tax rate. The money you earned below the line is completely unaffected. A raise will always result in more net money in your pocket.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Analyze Your Income Further</h2>
            <p className="mb-4 text-gray-700">Take your tax planning to the next level by visualizing how different financial vehicles interact with the tax code.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/paycheck-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Paycheck Simulator</span>
                <span className="text-sm text-gray-500 mt-2 block">Overlay your State taxes, FICA taxes, and Health Care premiums to find your real-world take home pay.</span>
              </Link>
              <Link href="/401k-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">401(k) Pre-Tax Shielding</span>
                <span className="text-sm text-gray-500 mt-2 block">Find out how utilizing a Traditional 401(k) drops your "Taxable Income Base" before the IRS brackets even touch it.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <IncomeTaxCalculator />
    </CalculatorPage>
  );
}
