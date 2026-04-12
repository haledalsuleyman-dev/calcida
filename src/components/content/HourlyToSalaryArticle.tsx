import React from 'react';
import Link from 'next/link';
import { formatUSD, formatUSD2, hourlyToYearData } from '@/data/hourlyToYear';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { SEOInternalLinkingWidget } from '@/components/content/SEOInternalLinkingWidget';
import { TrustBadge } from '@/components/TrustBadge';

interface Props {
  hourlyNum: number;
}

export function HourlyToSalaryArticle({ hourlyNum }: Props) {
  const yearly = hourlyNum * 2080;
  const monthly = yearly / 12;
  const weekly = hourlyNum * 40;
  const biweekly = weekly * 2;
  const daily = hourlyNum * 8;

  const hourlyStr = formatUSD2(hourlyNum);
  const yearlyStr = formatUSD(yearly);
  const monthlyStr = formatUSD(monthly);
  const weeklyStr = formatUSD(weekly);
  const biweeklyStr = formatUSD(biweekly);
  const dailyStr = formatUSD(daily);

  const overtimeRate = hourlyNum * 1.5;
  const overtimeRateStr = formatUSD2(overtimeRate);
  const overtimeWeekly = overtimeRate * 5;
  const overtimeWeeklyStr = formatUSD(overtimeWeekly);

  const takeHome75 = yearly * 0.75;
  const takeHome70 = yearly * 0.70;
  const takeHome75Str = formatUSD(takeHome75);
  const takeHome70Str = formatUSD(takeHome70);

  let budgetSection;
  if (hourlyNum <= 25) {
    budgetSection = (
      <div className="my-10 p-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Smart Budgeting on {hourlyStr}/hr
        </h3>
        <p className="mb-6 text-yellow-800">
          Earning {hourlyStr} an hour requires a disciplined approach to finances. By following the 50/30/20 rule, you can ensure your essentials are covered while still building a safety net. Based on an estimated monthly take-home of {formatUSD(monthly * 0.82)}:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-yellow-100">
            <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Needs (50%)</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthly * 0.82 * 0.50)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-yellow-100">
            <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Wants (30%)</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthly * 0.82 * 0.30)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-yellow-100">
            <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Savings (20%)</div>
            <div className="text-lg font-bold text-gray-900">{formatUSD(monthly * 0.82 * 0.20)}</div>
          </div>
        </div>
      </div>
    );
  } else if (hourlyNum <= 60) {
    budgetSection = (
      <div className="my-10 p-8 bg-green-50 border border-green-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Building Wealth at {hourlyStr}/hr
        </h3>
        <p className="mb-6 text-green-800">
          With {hourlyStr} an hour, you have a strong foundation for building long-term wealth. Beyond just covering your {formatUSD(monthly * 0.78 * 0.50)} in monthly needs, consider maximizing your retirement contributions or saving for a down payment on a home.
        </p>
        <Link href="/mortgage-payment-calculator" className="inline-flex items-center text-green-700 font-bold hover:text-green-800">
          Check home affordability <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </Link>
      </div>
    );
  } else {
    budgetSection = (
      <div className="my-10 p-8 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          High-Earner Strategy: {hourlyStr}/hr
        </h3>
        <p className="mb-4 text-blue-800">
          Earning {hourlyStr} per hour puts you in a top income bracket. Your focus should shift from simple budgeting to complex tax planning and diversified investing.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4 text-sm text-blue-900 font-medium">
          <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg> Maximize 401(k) and HSA</li>
          <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg> Tax-loss harvesting</li>
          <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg> Real estate diversification</li>
          <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg> Backdoor Roth IRA</li>
        </ul>
      </div>
    );
  }

  const currentIndex = hourlyToYearData.findIndex(d => d.hourly === hourlyNum);
  const nearbyRates = hourlyToYearData
    .slice(Math.max(0, currentIndex - 4), Math.min(hourlyToYearData.length, currentIndex + 5))
    .filter(d => d.hourly !== hourlyNum)
    .filter((_, i) => i % 2 === 0)
    .slice(0, 5);

  // Higher and lower hourly rates for contextual linking
  const lowerHourly = hourlyToYearData.filter(h => h.hourly < hourlyNum).reverse()[0]?.hourly || hourlyNum - 1;
  const higherHourly = hourlyToYearData.filter(h => h.hourly > hourlyNum)[0]?.hourly || hourlyNum + 1;

  // Intent-based variation for the intro
  const introWording = 
    hourlyNum >= 50 ? "Commanding a high hourly rate reflects specialized skills and experience." :
    hourlyNum >= 30 ? "Earning a competitive hourly wage is a key step toward long-term financial security." :
    hourlyNum >= 20 ? "A solid hourly wage provides the stability needed to manage a consistent monthly budget." :
    "Understanding how your hourly earnings add up is essential for effective financial planning.";

  return (
    <div className="prose prose-blue max-w-none text-gray-700">
      <TrustBadge />
      <div className="mb-8">
        <p className="text-xl leading-relaxed text-gray-900 font-medium">
          {introWording} If you're earning <strong>{hourlyStr} per hour</strong>, your annual pre-tax salary is exactly <strong>{yearlyStr}</strong>.
        </p>
        <p className="mt-4 text-gray-600">
          This estimate is based on a standard 40-hour work week and 52 weeks per year. Whether you're negotiating a raise or applying for a new role, understanding how your hourly rate scales to a yearly salary is the first step in mastering your personal finances. You can also compare this with <Link href={`/${lowerHourly}-an-hour-is-how-much-a-year`} className="text-blue-600 hover:underline">{formatUSD2(lowerHourly)}/hr</Link> or <Link href={`/${higherHourly}-an-hour-is-how-much-a-year`} className="text-blue-600 hover:underline">{formatUSD2(higherHourly)}/hr</Link> to see the difference in annual income.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl my-10 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {hourlyStr} Wage Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl border border-blue-100 text-center">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Daily (8h)</div>
            <div className="text-xl font-bold text-gray-900">{dailyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 text-center">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Weekly</div>
            <div className="text-xl font-bold text-gray-900">{weeklyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 text-center">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Biweekly</div>
            <div className="text-xl font-bold text-gray-900">{biweeklyStr}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 text-center">
            <div className="text-xs font-bold text-blue-500 uppercase mb-1">Monthly</div>
            <div className="text-xl font-bold text-gray-900">{monthlyStr}</div>
          </div>
          <div className="bg-blue-600 p-4 rounded-xl text-center sm:col-span-2 lg:col-span-2">
            <div className="text-xs font-bold text-blue-100 uppercase mb-1">Annual Salary</div>
            <div className="text-2xl font-bold text-white">{yearlyStr}</div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why the Hourly-to-Salary Conversion Matters</h2>
        <p>
          Converting your hourly wage to an annual salary provides a clearer picture of your financial standing. It allows you to use standard budgeting tools, compare your income against national averages, and qualify for financial products like mortgages or car loans, which typically evaluate borrowers based on their gross annual income. For more information on how this affects your purchasing power, check our <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline">Mortgage Payment Calculator</Link>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Earnings by Hours Worked</h2>
      <p className="mb-6">
        Your actual income can vary depending on your specific work schedule. Here is how {hourlyStr} an hour scales across different weekly commitments:
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200 mb-10 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Weekly Hours</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Weekly Pay</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Annual Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[20, 30, 35, 40, 45, 50].map(hours => (
              <tr key={hours} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{hours} hours</td>
                <td className="py-4 px-6 text-sm text-gray-600">{formatUSD(hourlyNum * hours)}</td>
                <td className="py-4 px-6 text-sm text-blue-600 font-bold">{formatUSD(hourlyNum * hours * 52)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-10 my-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overtime Impact</h2>
          <p className="mb-4 text-gray-600">
            If you work more than 40 hours per week, you're likely eligible for "time and a half" pay. At <strong>{hourlyStr}/hr</strong>, your overtime rate is <strong>{overtimeRateStr}/hr</strong>.
          </p>
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
            <p className="text-sm text-orange-900">
              Just 5 hours of overtime per week would add an extra <strong>{overtimeWeeklyStr}</strong> to your paycheck, or about <strong>{formatUSD(overtimeWeekly * 52)}</strong> per year.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Tax Reality</h2>
          <p className="mb-4 text-gray-600">
            Gross salary is just the starting point. After federal, state, and FICA taxes, your actual take-home pay for a {yearlyStr} salary will be roughly:
          </p>
          <ul className="space-y-2 text-sm font-bold text-gray-900">
            <li className="flex justify-between p-2 bg-gray-50 rounded"><span>25% Total Tax:</span> <span>~{takeHome75Str}/yr</span></li>
            <li className="flex justify-between p-2 bg-gray-50 rounded"><span>30% Total Tax:</span> <span>~{takeHome70Str}/yr</span></li>
          </ul>
        </div>
      </div>

      {budgetSection}

      <div className="bg-gray-900 text-white rounded-2xl p-8 my-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready for a deeper dive?</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Use our specialized <Link href="/paycheck-calculator" className="text-blue-400 hover:text-blue-300 underline">Paycheck Calculator</Link> to plan your taxes, compare loan offers, or build a complete monthly budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/paycheck-calculator" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            Paycheck Calculator
          </Link>
          <Link href="/salary-to-hourly-calculator" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all">
            Salary Converter
          </Link>
          <Link href="/mortgage-payment-calculator" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700">
            Mortgage Tool
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Is {hourlyStr} an hour a good wage?</h3>
          <p>{hourlyStr} per hour scales to {yearlyStr} annually. This is {hourlyNum >= 40 ? "a strong income that is well above the national median wage" : hourlyNum >= 25 ? "a solid living wage in most parts of the country" : "an entry-level wage that may be tight in high-cost cities"}. For more context, see our guide on <Link href="/blog/salary-vs-hourly-which-is-better" className="text-blue-600 hover:underline">Hourly vs. Salary: The Pros and Cons</Link>.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {hourlyStr} an hour monthly?</h3>
          <p>On a full-time 40-hour schedule, you will earn approximately {monthlyStr} per month before taxes.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">What is the "2,080 rule"?</h3>
          <p>The 2,080 rule is a standard used by HR and recruiters to convert hourly pay to salary. It comes from 40 hours per week multiplied by 52 weeks in a year.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">How much is {hourlyStr} a week?</h3>
          <p>Working 40 hours at {hourlyStr} per hour results in a weekly gross pay of {weeklyStr}.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Does this account for vacation time?</h3>
          <p>This calculation assumes 52 weeks of paid work. If you take unpaid time off, your annual {yearlyStr} salary will be lower by {dailyStr} for every day you are not paid.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Explore Similar Rates</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {nearbyRates.map(r => (
          <Link 
            key={r.hourly} 
            href={`/${r.hourly}-an-hour-is-how-much-a-year`}
            className="px-3 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-gray-600 transition-all border border-gray-100 text-center font-medium"
          >
            {formatUSD2(r.hourly)}/hr
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
