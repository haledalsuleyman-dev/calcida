import React from 'react';
import Link from 'next/link';
import { formatUSD, formatUSD2 } from '@/data/hourlyToYear';
import { biweeklyToHourlyData } from '@/data/biweeklyToHourly';
import { TrustBadge } from '@/components/TrustBadge';
import { AuthorBlock, SourcesBlock, DisclaimerBlock } from './AuthorBlock';
import { SEOInternalLinkingWidget } from './SEOInternalLinkingWidget';

interface Props {
  biweeklyNum: number;
}

export function BiweeklyToHourlyArticle({ biweeklyNum }: Props) {
  const hourly = biweeklyNum / 80;
  const yearly = biweeklyNum * 26;
  const monthly = yearly / 12;
  const weekly = biweeklyNum / 2;

  const biweeklyStr = formatUSD(biweeklyNum);
  const hourlyStr = formatUSD2(hourly);
  const yearlyStr = formatUSD(yearly);
  const monthlyStr = formatUSD(monthly);
  const weeklyStr = formatUSD(weekly);

  const lowerBiweekly = biweeklyToHourlyData.filter(b => b.biweekly < biweeklyNum).reverse()[0]?.biweekly || biweeklyNum - 200;
  const higherBiweekly = biweeklyToHourlyData.filter(b => b.biweekly > biweeklyNum)[0]?.biweekly || biweeklyNum + 200;

  // Intent-based variation for the intro
  const introWording = 
    biweeklyNum >= 4000 ? "Earning a substantial biweekly paycheck is a significant achievement in financial stability." :
    biweeklyNum >= 2500 ? "A consistent biweekly paycheck provides a strong foundation for managing your household budget." :
    biweeklyNum >= 1500 ? "Understanding how your biweekly earnings translate to an hourly wage is key for effective planning." :
    "Receiving a steady biweekly paycheck is the first step toward building a reliable financial future.";
    const nearbyRates = [
  { biweekly: 800 },
  { biweekly: 1000 },
  { biweekly: 1200 },
  { biweekly: 1500 },
  { biweekly: 2000 },
];
  return (
    <div className="prose prose-blue max-w-none text-gray-700">
      <TrustBadge />
      <div className="mb-8">
        <p className="text-xl leading-relaxed text-gray-900 font-medium">
          {introWording} If you receive a <strong>{biweeklyStr} paycheck every two weeks</strong>, your gross hourly wage is <strong>{hourlyStr}</strong>.
        </p>
        <p className="mt-4 text-gray-600">
          This calculation is based on a standard 80-hour biweekly pay period. Earning {biweeklyStr} biweekly scales to an annual salary of <strong>{yearlyStr}</strong>, assuming 26 pay periods in a year. You might also want to compare this with a <Link href={`/${lowerBiweekly}-every-two-weeks-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSD(lowerBiweekly)}</Link> or <Link href={`/${higherBiweekly}-every-two-weeks-is-how-much-an-hour`} className="text-blue-600 hover:underline">{formatUSD(higherBiweekly)}</Link> biweekly paycheck.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl my-10 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {biweeklyStr} Biweekly Pay Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Hourly Rate:</span>
            <span className="font-bold text-xl text-blue-700">{hourlyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Weekly Equivalent:</span>
            <span className="font-bold text-xl text-blue-700">{weeklyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100">
            <span className="text-blue-800 font-medium">Monthly (Avg):</span>
            <span className="font-bold text-xl text-blue-700">{monthlyStr}</span>
          </div>
          <div className="flex justify-between items-center bg-blue-600 p-4 rounded-xl border border-blue-500 shadow-inner">
            <span className="text-blue-50 font-medium">Annual Salary:</span>
            <span className="font-bold text-xl text-white">{yearlyStr}</span>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Biweekly Advantage</h2>
        <p>
          Getting paid every two weeks means you receive 26 paychecks per year. This creates two "magic months" each year where you receive three paychecks instead of two. Many people use these extra checks to boost savings, pay down debt, or fund a vacation without impacting their regular monthly budget. For more help with your biweekly budgeting, try our <Link href="/salary-calculators" className="text-blue-600 hover:underline">Salary & Paycheck</Link> hub.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Biweekly vs. Semi-Monthly Pay</h2>
      <p className="mb-6">
        It's common to confuse <strong>biweekly</strong> pay with <strong>semi-monthly</strong> pay, but they impact your budgeting differently:
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Biweekly (26/yr)</h3>
          <p className="text-sm text-gray-600 mb-4">Paid every other Friday. Each check is based on exactly 80 hours of work.</p>
          <div className="text-xs font-bold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">Great for consistent hour tracking</div>
        </div>
        <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Semi-Monthly (24/yr)</h3>
          <p className="text-sm text-gray-600 mb-4">Paid on fixed dates (e.g., 1st and 15th). Checks are slightly larger but occur only twice a month.</p>
          <div className="text-xs font-bold text-gray-600 bg-gray-200 inline-block px-2 py-1 rounded">Easier for fixed monthly bills</div>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl p-8 my-12 text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Budget Like a Pro</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Convert your paycheck, estimate your taxes, and plan your path to financial independence with our <Link href="/salary-to-hourly-calculator" className="text-blue-400 hover:text-blue-300 underline">Salary to Hourly Converter</Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/paycheck-calculator" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            Paycheck Estimator
          </Link>
          <Link href="/take-home-pay-calculator" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all">
            Take-Home Pay Tool
          </Link>
          <Link href="/salary-calculators" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700">
            Income Hub
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {biweeklyStr} every two weeks hourly?</h3>
          <p>Based on a standard 80-hour work period, {biweeklyStr} biweekly is exactly {hourlyStr} per hour.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How many biweekly paychecks are in a year?</h3>
          <p>In most years, there are 26 biweekly paychecks. However, because 26 x 14 days = 364 days, every 11 years or so, there is a year with 27 biweekly pay periods. For more on pay periods, see our <Link href="/blog/salary-vs-hourly-which-is-better" className="text-blue-600 hover:underline">Career and Salary Guide</Link>.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Is {biweeklyStr} biweekly a good salary?</h3>
          <p>{biweeklyStr} every two weeks equals {yearlyStr} a year. {biweeklyNum >= 3000 ? "This is a solid middle-class income that allows for both lifestyle and savings" : biweeklyNum >= 2000 ? "This is a respectable living wage in most US cities" : "This is an entry-level wage that requires careful expense tracking"}.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What is {biweeklyStr} a month?</h3>
          <p>With a {biweeklyStr} biweekly paycheck, your average monthly gross income is {monthlyStr}. Some months will have two checks, while others may have three.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {biweeklyStr} biweekly after taxes?</h3>
          <p>While taxes vary, a single person can expect to take home about 70-80% of their gross pay, which would be roughly {formatUSD(biweeklyNum * 0.75)} per paycheck.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Nearby Biweekly Rates</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {nearbyRates.map(r => (
          <Link 
            key={r.biweekly} 
            href={`/${r.biweekly}-every-two-weeks-is-how-much-an-hour`}
            className="px-3 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-gray-600 transition-all border border-gray-100 text-center font-medium"
          >
            {formatUSD(r.biweekly)}/2wks
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
