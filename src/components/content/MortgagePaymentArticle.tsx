import React from 'react';
import Link from 'next/link';
import { formatUSD, formatUSDNoCents } from '@/data/salaryYearToHour';
import { TrustBadge } from '@/components/TrustBadge';

interface Props {
  loanAmount: number;
}

export function MortgagePaymentArticle({ loanAmount }: Props) {
  const loanAmountStr = formatUSDNoCents(loanAmount);
  
  // Assumptions for the example
  const rate = 0.065;
  const monthlyRate = rate / 12;
  const n = 360; // 30 years
  const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const taxesInsurance = loanAmount * 0.02 / 12; // 2% annual estimate
  const totalMonthly = pi + taxesInsurance;

  const lowerAmount = loanAmount - 50000;
  const higherAmount = loanAmount + 50000;

  return (
    <div className="prose prose-blue max-w-none text-gray-700">
      <TrustBadge />
      <div className="mb-10">
        <p className="text-xl leading-relaxed text-gray-900 font-medium">
          Securing a <strong>{loanAmountStr} mortgage</strong> is a major step in your home-buying journey. Understanding the monthly commitment before you buy is essential for long-term financial health.
        </p>
        <p className="mt-4 text-gray-600">
          Your final payment depends on your interest rate, loan term, and local costs like property taxes and insurance. If you're considering a different price range, you can also see the breakdown for a <Link href={`/mortgage/${lowerAmount}-mortgage-payment`} className="text-blue-600 hover:underline">{formatUSDNoCents(lowerAmount)} mortgage</Link> or a <Link href={`/mortgage/${higherAmount}-mortgage-payment`} className="text-blue-600 hover:underline">{formatUSDNoCents(higherAmount)} mortgage</Link>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Realistic Example: {loanAmountStr} at {rate * 100}%</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span className="text-blue-800">Principal & Interest (30yr):</span>
              <span className="font-bold text-blue-900">{formatUSD(pi)}</span>
            </div>
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span className="text-blue-800">Est. Taxes & Insurance:</span>
              <span className="font-bold text-blue-900">~{formatUSD(taxesInsurance)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-bold text-blue-900">Total Monthly Payment:</span>
              <span className="text-lg font-bold text-blue-900">~{formatUSD(totalMonthly)}</span>
            </div>
            <p className="text-xs text-blue-700 italic mt-4">
              *Assumes a 30-year fixed term at 6.5%. Your actual rate and taxes will vary by credit score and zip code.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Calculation Matters</h2>
          <p className="text-gray-700 leading-relaxed">
            Many buyers focus only on the home price, but the <strong>monthly carrying cost</strong> is what impacts your daily lifestyle. Calculating your {loanAmountStr} mortgage payment in advance helps you:
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </span>
              <span><strong>Avoid being "house poor":</strong> Ensure you have enough left for travel, savings, and maintenance.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </span>
              <span><strong>Compare 15 vs 30 Year Terms:</strong> See how much interest you can save by shortening the loan.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </span>
              <span><strong>Understand PMI Impact:</strong> If you put down less than 20%, see how much PMI adds to your {loanAmountStr} loan.</span>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is the monthly payment on a {loanAmountStr} mortgage?</h3>
          <p>For a standard 30-year fixed mortgage at 6.5%, the principal and interest is roughly {formatUSD(pi)}. Your total payment will be higher once taxes and insurance are added.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much income do I need for a {loanAmountStr} mortgage?</h3>
          <p>Lenders usually prefer a debt-to-income (DTI) ratio below 36-43%. For a {loanAmountStr} loan, a household income of roughly {formatUSDNoCents(loanAmount / 4)} to {formatUSDNoCents(loanAmount / 3)} is often recommended.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much total interest will I pay on {loanAmountStr}?</h3>
          <p>On a 30-year term at 6.5%, you will pay about {formatUSDNoCents(pi * 360 - loanAmount)} in total interest over the life of the loan.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Can I pay off my {loanAmountStr} mortgage early?</h3>
          <p>Yes, most mortgages allow for extra principal payments. Making just one extra payment per year can shorten a 30-year loan by 4-5 years and save thousands in interest.</p>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16 text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Refine Your Home Purchase Strategy</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Use our specialized tools to compare rates, calculate amortization, and find the perfect mortgage for your budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/mortgage-payment-calculator" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            Mortgage Calculator
          </Link>
          <Link href="/refinance-calculator" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all">
            Refinance Tools
          </Link>
          <Link href="/house-affordability-calculator" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700">
            Home Affordability
          </Link>
        </div>
      </div>
    </div>
  );
}
