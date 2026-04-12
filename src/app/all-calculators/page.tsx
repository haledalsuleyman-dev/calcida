import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { salaryData, formatUSDNoCents } from '@/data/salaryYearToHour';
import { hourlyToYearData, formatUSD, formatUSD2 } from '@/data/hourlyToYear';
import { monthlyToHourlyData } from '@/data/monthlyToHourly';
import { biweeklyToHourlyData } from '@/data/biweeklyToHourly';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'All Calculators and Salary Conversion Tools',
  description: 'See every calculator, salary converter, and pay chart on Calcida, including hourly, monthly, biweekly, mortgage, and loan tools.',
  canonicalPath: '/all-calculators',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "headline": "All Financial Calculators & Tools",
  "description": "Directory of all salary, mortgage, and loan calculators on Calcida.",
  "publisher": {
    "@type": "Organization",
    "name": "Calcida",
    "logo": {
      "@type": "ImageObject",
      "url": `${getSiteUrl()}/logo.png`
    }
  }
};

const calculators = [
  { name: 'Mortgage Payment Calculator', href: '/mortgage-payment-calculator' },
  { name: 'Mortgage Amortization Calculator', href: '/mortgage-amortization-calculator' },
  { name: 'Biweekly Mortgage Calculator', href: '/biweekly-mortgage-calculator' },
  { name: 'Extra Payment Mortgage Calculator', href: '/extra-payment-mortgage-calculator' },
  { name: 'Refinance Calculator', href: '/refinance-calculator' },
  { name: 'Mortgage Affordability Calculator', href: '/mortgage-affordability-calculator' },
  { name: 'Salary to Hourly Calculator', href: '/salary-to-hourly-calculator' },
  { name: 'Hourly to Salary Calculator', href: '/hourly-to-salary-calculator' },
  { name: 'Paycheck Calculator', href: '/paycheck-calculator' },
  { name: 'Take-Home Pay Calculator', href: '/take-home-pay-calculator' },
  { name: 'Retirement Calculator', href: '/retirement-calculator' },
  { name: '401k Calculator', href: '/401k-calculator' },
  { name: 'Savings Calculator', href: '/savings-calculator' },
  { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
  { name: 'Investment Return Calculator', href: '/investment-return-calculator' },
  { name: 'ROI Calculator', href: '/roi-calculator' },
  { name: 'Net Worth Calculator', href: '/net-worth-calculator' },
  { name: 'Inflation Calculator', href: '/inflation-calculator' },
  { name: 'Emergency Fund Calculator', href: '/emergency-fund-calculator' },
  { name: 'Budget Calculator', href: '/budget-calculator' },
  { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
  { name: 'Car Affordability Calculator', href: '/car-affordability-calculator' },
  { name: 'Personal Loan Calculator', href: '/personal-loan-calculator' },
  { name: 'Student Loan Calculator', href: '/student-loan-calculator' },
  { name: 'APR Calculator', href: '/apr-calculator' },
  { name: 'Loan Comparison Calculator', href: '/loan-comparison-calculator' },
  { name: 'Loan Payment Calculator', href: '/loan-payment-calculator' },
  { name: 'Credit Card Payoff Calculator', href: '/credit-card-payoff-calculator' },
  { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator' },
];

export default function AllCalculatorsPage() {
  return (
    <>
      <JsonLd data={[jsonLd]} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-6">
          <Link href="/calculators" className="text-sm font-medium text-blue-600 hover:underline">
            Browse the master calculators directory →
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-900">All Financial Calculators</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {calculators.map((calc) => (
            <Link 
              key={calc.href}
              href={calc.href}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
            >
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600">{calc.name}</h3>
            </Link>
          ))}
        </div>

        <div className="space-y-16">
          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Salary to Hourly Conversions</h2>
              <Link href="/salary-to-hourly-guide" className="text-blue-600 hover:underline font-medium">View Guide →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {salaryData.map((salary) => (
                <Link 
                  key={salary} 
                  href={`/${salary}-a-year-is-how-much-an-hour`}
                  className="text-sm p-2 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors text-center truncate"
                  title={`${formatUSDNoCents(salary)} a year`}
                >
                  {formatUSDNoCents(salary)} / yr
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Hourly to Yearly Conversions</h2>
              <Link href="/hourly-to-yearly-guide" className="text-blue-600 hover:underline font-medium">View Guide →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {hourlyToYearData.map((item) => (
                <Link 
                  key={item.hourly} 
                  href={`/${item.hourly}-an-hour-is-how-much-a-year`}
                  className="text-sm p-2 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors text-center truncate"
                  title={`${formatUSD2(item.hourly)} an hour`}
                >
                  {formatUSD2(item.hourly)} / hr
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Monthly Salary Conversions</h2>
              <Link href="/monthly-salary-to-hourly-guide" className="text-blue-600 hover:underline font-medium">View Guide →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {monthlyToHourlyData.map((item) => (
                <Link 
                  key={item.monthly} 
                  href={`/${item.monthly}-a-month-is-how-much-an-hour`}
                  className="text-sm p-2 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors text-center truncate"
                  title={`${formatUSD(item.monthly)} a month`}
                >
                  {formatUSD(item.monthly)} / mo
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Biweekly Pay Conversions</h2>
              <Link href="/biweekly-to-hourly-guide" className="text-blue-600 hover:underline font-medium">View Guide →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {biweeklyToHourlyData.map((item) => (
                <Link 
                  key={item.biweekly} 
                  href={`/${item.biweekly}-every-two-weeks-is-how-much-an-hour`}
                  className="text-sm p-2 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors text-center truncate"
                  title={`${formatUSD(item.biweekly)} biweekly`}
                >
                  {formatUSD(item.biweekly)} / 2 wks
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
