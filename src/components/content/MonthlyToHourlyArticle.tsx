import React from 'react';
import Link from 'next/link';
import { formatUSD, formatUSD2 } from '@/data/hourlyToYear';
import { monthlyToHourlyData } from '@/data/monthlyToHourly';
import { TrustBadge } from '@/components/TrustBadge';
import { AuthorBlock, SourcesBlock, DisclaimerBlock } from './AuthorBlock';
import { SEOInternalLinkingWidget } from './SEOInternalLinkingWidget';

interface Props {
  monthlyNum: number;
}

export function MonthlyToHourlyArticle({ monthlyNum }: Props) {
  const yearly = monthlyNum * 12;
  const hourly = yearly / 2080;
  const weekly = yearly / 52;
  const biweekly = yearly / 26;

  const monthlyStr = formatUSD(monthlyNum);
  const hourlyStr = formatUSD2(hourly);
  const yearlyStr = formatUSD(yearly);
  const weeklyStr = formatUSD(weekly);
  const biweeklyStr = formatUSD(biweekly);

  const takeHome75 = monthlyNum * 0.75;
  const takeHome70 = monthlyNum * 0.70;
  const takeHome75Str = formatUSD(takeHome75);
  const takeHome70Str = formatUSD(takeHome70);

  let budgetSection;
  if (monthlyNum <= 3000) {
    budgetSection = (
      <div className="my-10 p-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Navigating a {monthlyStr} Budget
        </h3>
        <p className="mb-4 text-yellow-800">
          Managing expenses on {monthlyStr} per month requires strategic planning. Focus on the essentials first to ensure financial stability:
        </p>
        <ul className="space-y-2 text-yellow-900 font-medium">
          <li className="flex items-start"><svg className="w-5 h-5 mr-2 mt-0.5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Keep housing costs below {formatUSD(monthlyNum * 0.40)} if possible.</li>
          <li className="flex items-start"><svg className="w-5 h-5 mr-2 mt-0.5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Build an emergency fund with even $50-100 per month.</li>
          <li className="flex items-start"><svg className="w-5 h-5 mr-2 mt-0.5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Use our tools to find ways to increase your effective hourly rate.</li>
        </ul>
      </div>
    );
  } else if (monthlyNum <= 8000) {
    budgetSection = (
      <div className="my-10 p-8 bg-green-50 border border-green-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Optimizing Your {monthlyStr}/mo Income
        </h3>
        <p className="mb-6 text-green-800">
          Earning {monthlyStr} a month provides a solid foundation. Consider the 50/30/20 rule to balance your current lifestyle with future goals:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-xs font-bold text-green-600 uppercase mb-1">Needs</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthlyNum * 0.50)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-xs font-bold text-green-600 uppercase mb-1">Wants</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthlyNum * 0.30)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-xs font-bold text-green-600 uppercase mb-1">Savings</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthlyNum * 0.20)}</div>
          </div>
        </div>
      </div>
    );
  } else {
    budgetSection = (
      <div className="my-10 p-8 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          High-Income Strategy: {monthlyStr}
        </h3>
        <p className="mb-4 text-blue-800">
          With a monthly income of {monthlyStr}, you are in a prime position to maximize tax-advantaged accounts and build significant wealth.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-lg border border-blue-100 text-sm font-medium text-blue-900">
            Max out your 401(k) to lower taxable income.
          </div>
          <div className="p-3 bg-white rounded-lg border border-blue-100 text-sm font-medium text-blue-900">
            Consider a Backdoor Roth IRA if eligible.
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = monthlyToHourlyData.findIndex(d => d.monthly === monthlyNum);
  const nearbyRates = monthlyToHourlyData
    .slice(Math.max(0, currentIndex - 4), Math.min(monthlyToHourlyData.length, currentIndex + 5))
    .filter(d => d.monthly !== monthlyNum)
    .filter((_, i) => i % 2 === 0)
    .slice(0, 5);

  // Higher and lower monthly values for contextual linking
  const lowerMonthly = monthlyToHourlyData.filter(m => m.monthly < monthlyNum).reverse()[0]?.monthly || monthlyNum - 500;
  const higherMonthly = monthlyToHourlyData.filter(m => m.monthly > monthlyNum)[0]?.monthly || monthlyNum + 500;

  // Intent-based variation for the intro
  const introWording = 
    monthlyNum >= 8000 ? "Earning a high monthly income is a major achievement in financial management." :
    monthlyNum >= 5000 ? "A solid monthly income provides the stability needed to build long-term wealth." :
    monthlyNum >= 3000 ? "Maintaining a consistent monthly income is the first step toward a stable financial future." :
    "Understanding how your monthly pay scales to an hourly wage is essential for effective budgeting.";

  return (
    <div className="prose prose-blue max-w-none text-gray-700">
      <TrustBadge />
      <div className="mb-8">
        <p className="text-xl leading-relaxed text-gray-900 font-medium">
          {introWording} If you earn <strong>{monthlyStr} a month</strong>, your gross hourly wage is approximately <strong>{hourlyStr}</strong>.
        </p>
        <p className="mt-4 text-gray-600">
          This estimate is based on a standard 40-hour work week and 52 weeks per year. Whether you're planning your household budget or negotiating a new job offer, knowing your hourly rate is a key part of financial literacy. You can also compare this with <Link href={`/${lowerMonthly}-a-month-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSD(lowerMonthly)}/mo</Link> or <Link href={`/${higherMonthly}-a-month-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSD(higherMonthly)}/mo</Link> to see the difference in hourly earnings.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl my-10 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          {monthlyStr} Monthly Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Hourly</div>
            <div className="text-lg font-bold text-gray-900">{hourlyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Weekly</div>
            <div className="text-lg font-bold text-gray-900">{weeklyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Biweekly</div>
            <div className="text-lg font-bold text-gray-900">{biweeklyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Annual</div>
            <div className="text-lg font-bold text-gray-900">{yearlyStr}</div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Tracking Monthly Income Matters</h2>
        <p>
          Most major expenses—like rent, mortgages, and car payments—are calculated on a monthly basis. By knowing that your {monthlyStr} translates to {hourlyStr} an hour, you can better judge whether a new subscription or recurring expense is truly worth your time. For instance, a $50 monthly bill represents roughly {Math.round(50 / hourly)} hours of your labor. To see how this fits into a larger home buying plan, use our <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline">Mortgage Payment Calculator</Link>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">The Impact of Taxes</h2>
      <p className="mb-6">
        While {monthlyStr} is your gross monthly income, your actual take-home pay will be lower due to federal and state tax withholdings. Here is an estimate of what you'll actually see in your bank account:
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-sm font-bold text-gray-500 uppercase mb-1">Est. Take-Home (25% Tax)</div>
          <div className="text-xl font-bold text-blue-600">{takeHome75Str} / month</div>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-sm font-bold text-gray-500 uppercase mb-1">Est. Take-Home (30% Tax)</div>
          <div className="text-xl font-bold text-blue-600">{takeHome70Str} / month</div>
        </div>
      </div>
      <p className="text-sm text-gray-500 italic mb-8 text-center">
        *Estimates for single filers with standard deductions. Use our <Link href="/paycheck-calculator" className="text-blue-600 hover:underline">Paycheck Calculator</Link> for precise local figures.
      </p>

      {budgetSection}

      <div className="bg-gray-900 text-white rounded-2xl p-8 my-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Plan Your Future with Confidence</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Take control of your finances by using our suite of professional-grade tools like the <Link href="/take-home-pay-calculator" className="text-blue-400 hover:text-blue-300 underline">Take-Home Pay Calculator</Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/salary-to-hourly-calculator" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            Salary Converter
          </Link>
          <Link href="/take-home-pay-calculator" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all">
            Take-Home Pay Tool
          </Link>
          <Link href="/mortgage-payment-calculator" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700">
            Mortgage Tool
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Is {monthlyStr} a month good?</h3>
          <p>{monthlyStr} a month equals {yearlyStr} a year. {monthlyNum >= 6000 ? "This is a strong middle-class income that provides for significant savings" : monthlyNum >= 4000 ? "This is a solid living wage that covers essentials comfortably in most areas" : "This is an entry-level income that requires careful budgeting"}. For more context on income levels, read our guide on <Link href="/blog/salary-vs-hourly-which-is-better" className="text-blue-600 hover:underline">Salary and Career Planning</Link>.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How many working hours are in a month?</h3>
          <p>The standard for full-time employment is 173.33 hours per month (2,080 annual hours divided by 12 months).</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What is {monthlyStr} a year?</h3>
          <p>If you earn {monthlyStr} every month, your annual gross salary is {yearlyStr}.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What is {monthlyStr} a week?</h3>
          <p>With a {monthlyStr} monthly income, your weekly pay is approximately {weeklyStr}.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {monthlyStr} after taxes?</h3>
          <p>While taxes vary, a single person can expect to take home about {takeHome75Str} to {takeHome70Str} per month after federal and state taxes.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Compare Nearby Salaries</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {nearbyRates.map(r => (
          <Link 
            key={r.monthly} 
            href={`/${r.monthly}-a-month-is-how-much-an-hour`}
            className="px-3 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-gray-600 transition-all border border-gray-100 text-center font-medium"
          >
            {formatUSD(r.monthly)}/mo
          </Link>
        ))}
      </div>

      <SEOInternalLinkingWidget />
      <AuthorBlock />
      <SourcesBlock />
      <DisclaimerBlock />
    </div>
  );
}
