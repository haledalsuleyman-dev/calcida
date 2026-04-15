import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { HourlyToSalaryCalculator } from '@/components/calculators/salary/HourlyToSalaryCalculator';
import { HourlyToSalaryArticle } from '@/components/content/HourlyToSalaryArticle';

export const metadata: Metadata = {
  title: '$25 an Hour Is How Much a Year? Salary Calculator',
  description: 'Convert $25/hour to yearly, monthly, weekly, and biweekly pay. Use a free hourly-to-salary calculator with schedule assumptions—fast.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/hourly-to-salary-calculator' },
  robots: { index: false, follow: true },
  openGraph: {
    title: '$25 an Hour Is How Much a Year?',
    description: 'Convert $25/hour to yearly pay and compare schedule assumptions.',
    url: '/salary/25-an-hour-is-how-much-a-year',
    type: 'article',
  },
};

export default function Hourly25ToYearPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$25 an Hour Is How Much a Year?</h1>

      <div className="mb-10">
        <HourlyToSalaryArticle hourlyNum={25} />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Customize Your Schedule</h2>
        <HourlyToSalaryCalculator defaultValues={{ hourlyRate: 25 }} />
      </div>
    </div>
  );
}

