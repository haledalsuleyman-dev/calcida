import React from 'react';
import Link from 'next/link';
import { formatUSD, formatUSDNoCents, salaryData } from '@/data/salaryYearToHour';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { TrustBadge } from '@/components/TrustBadge';

interface Props {
  salaryNum: number;
}

export function SalaryToHourlyArticle({ salaryNum }: Props) {
  const hourly = salaryNum / 2080;
  const weekly = salaryNum / 52;
  const biweekly = salaryNum / 26;
  const monthly = salaryNum / 12;

  const salaryStr = formatUSDNoCents(salaryNum);
  const hourlyStr = formatUSD(hourly);
  const weeklyStr = formatUSD(weekly);
  const biweeklyStr = formatUSD(biweekly);
  const monthlyStr = formatUSD(monthly);
  
  const estimatedTaxRate = salaryNum > 100000 ? 0.28 : salaryNum > 50000 ? 0.22 : 0.15;
  const estimatedMonthlyTax = monthly * estimatedTaxRate;
  const estimatedMonthlyTakeHome = monthly - estimatedMonthlyTax;
  const takeHomeStr = formatUSDNoCents(estimatedMonthlyTakeHome);
  const rentBudgetStr = formatUSDNoCents(monthly * 0.3);

  const lowerSalary = salaryData.filter(s => s < salaryNum).reverse()[0] || salaryNum - 5000;
  const higherSalary = salaryData.filter(s => s > salaryNum)[0] || salaryNum + 5000;

  const relatedSalaries = [
    salaryNum - 10000,
    salaryNum - 5000,
    salaryNum,
    salaryNum + 5000,
    salaryNum + 10000,
  ].filter(s => s > 0);

  // Intent-based variation for the intro
  const introWording = 
    salaryNum >= 100000 ? "Reaching a six-figure income is a major financial milestone." :
    salaryNum >= 75000 ? "A mid-to-high five-figure salary provides significant financial flexibility." :
    salaryNum >= 50000 ? "Earning a solid middle-class salary is the foundation for a stable financial future." :
    "Starting your career with a steady income is the first step toward financial independence.";

  return (
    <div className="prose prose-blue max-w-none text-gray-700">
      <TrustBadge />
      <div className="mb-8">
        <p className="text-xl leading-relaxed text-gray-900 font-medium">
          {introWording} If you make <strong>{salaryStr} a year</strong>, your gross hourly salary is <strong>{hourlyStr}</strong>.
        </p>
        <p className="mt-4 text-gray-600">
          This calculation assumes a standard 2,080-hour work year (40 hours per week for 52 weeks). Understanding your hourly rate is crucial for comparing job offers, calculating overtime, and managing your personal budget more effectively. If your income is slightly different, you might also want to see the breakdown for <Link href={`/${lowerSalary}-a-year-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSDNoCents(lowerSalary)}</Link> or <Link href={`/${higherSalary}-a-year-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSDNoCents(higherSalary)}</Link> per year.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl my-10 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          {salaryStr} Salary Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Hourly Rate:</span>
            <span className="font-bold text-xl text-blue-700">{hourlyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Weekly Pay:</span>
            <span className="font-bold text-xl text-blue-700">{weeklyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Biweekly Pay:</span>
            <span className="font-bold text-xl text-blue-700">{biweeklyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Monthly Pay:</span>
            <span className="font-bold text-xl text-blue-700">{monthlyStr}</span>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Your Hourly Rate Matters</h2>
        <p>
          Knowing your hourly rate helps you make better financial decisions. For example, if you're considering a side hustle or freelance project, you can use your current {hourlyStr}/hour rate as a baseline for what your time is worth. It also makes it easier to understand the true cost of purchases—asking yourself "is this new gadget worth {Math.round(200 / hourly)} hours of work?" can be a powerful budgeting tool. For a more detailed analysis, check out our guide on <Link href="/blog/salary-vs-hourly-which-is-better" className="text-blue-600 hover:underline">Salary vs. Hourly Pay: Which is Better?</Link>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Adjusting for Your Schedule</h2>
      <p className="mb-6">
        Not every job follows a perfect 40-hour week. Depending on your industry, you might work more or fewer hours, which significantly changes your effective hourly wage for a {salaryStr} annual salary:
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200 mb-10 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hours per Week</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Effective Hourly Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[35, 37.5, 40, 45, 50].map(hours => (
              <tr key={hours} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{hours} hours (Full Time)</td>
                <td className="py-4 px-6 text-sm text-blue-600 font-bold">{formatUSD(salaryNum / (hours * 52))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-10 my-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Housing Budget for {salaryStr}</h2>
          <p className="mb-4">
            A common rule of thumb is to spend no more than 30% of your gross income on housing. For a {salaryStr} salary, that means aiming for a monthly rent or mortgage payment of roughly <strong>{rentBudgetStr}</strong>.
          </p>
          <p className="text-sm text-gray-600 italic">
            *This is a guideline. Your actual budget should account for other debts and local cost of living.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Take-Home Pay</h2>
          <p className="mb-4">
            Remember that {salaryStr} is your <em>gross</em> income. After federal and state taxes, your actual "take-home" pay will be closer to <strong>{takeHomeStr}</strong> per month.
          </p>
          <Link href="/take-home-pay-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors">
            Calculate your exact take-home pay <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </Link>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl p-8 my-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Optimize Your Income</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Use our specialized <Link href="/salary-to-hourly-calculator" className="text-blue-400 hover:text-blue-300 underline">Salary to Hourly Calculator</Link> to dive deeper into your finances and plan for your next big milestone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/salary-to-hourly-calculator" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            Salary Converter
          </Link>
          <Link href="/paycheck-calculator" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all shadow-lg shadow-black/10">
            Paycheck Estimator
          </Link>
          <Link href="/mortgage-payment-calculator" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700">
            Mortgage Tool
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Is {salaryStr} a good salary in 2026?</h3>
          <p>{salaryStr} is {salaryNum >= 75000 ? "considered a strong middle-class income that exceeds the national average" : salaryNum >= 50000 ? "a solid entry-to-mid-level income depending on your career stage" : "an entry-level income that requires careful budgeting"} in the United States. Your lifestyle will depend heavily on whether you live in a high or low cost-of-living area.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {salaryStr} after taxes?</h3>
          <p>While taxes vary by state, a single filer can expect to take home about 75-80% of their gross pay. For a {salaryStr} salary, this is roughly {takeHomeStr} per month.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How many working days are in a year?</h3>
          <p>A standard work year has 260 working days (52 weeks x 5 days). At {salaryStr} a year, you earn approximately {formatUSDNoCents(salaryNum / 260)} for every day you work.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Can I live comfortably on {salaryStr}?</h3>
          <p>In most U.S. cities, {salaryStr} is enough for a single person to live comfortably. However, in major hubs like San Francisco, NYC, or London, housing costs could take up a larger portion of your {monthlyStr} monthly gross pay.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What is {salaryStr} a week?</h3>
          <p>If you make {salaryStr} per year, you earn {weeklyStr} per week. This assumes you are paid 52 times per year.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Explore Other Salaries</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {relatedSalaries.map(s => (
          <Link 
            key={s} 
            href={`/${s}-a-year-is-how-much-an-hour`}
            className="px-3 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-gray-600 transition-all border border-gray-100 text-center"
          >
            {formatUSDNoCents(s)}/yr
          </Link>
        ))}
      </div>

      <AuthorBlock />
      <SourcesBlock />
      <DisclaimerBlock />
    </div>
  );
}
