import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { HourlyToSalaryCalculator } from '@/components/calculators/salary/HourlyToSalaryCalculator';
import { HourlyToSalaryArticle } from '@/components/content/HourlyToSalaryArticle';

export const metadata: Metadata = {
  title: '$20 an Hour Is How Much a Year? Salary Calculator',
  description: 'Convert $20/hour to yearly, monthly, weekly, and biweekly pay. Use a free hourly-to-salary calculator with hours/week and weeks/year inputs.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/salary/20-an-hour-is-how-much-a-year' },
  openGraph: {
    title: '$20 an Hour Is How Much a Year?',
    description: 'Convert $20/hour to yearly pay and compare schedule assumptions.',
    url: '/salary/20-an-hour-is-how-much-a-year',
    type: 'article',
  },
};

export default function Hourly20ToYearPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$20 an Hour Is How Much a Year?</h1>

      <div className="mb-10">
        <HourlyToSalaryArticle hourlyNum={20} />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Customize Your Schedule</h2>
        <HourlyToSalaryCalculator defaultValues={{ hourlyRate: 20 }} />
      </div>
    </div>
  );
}

