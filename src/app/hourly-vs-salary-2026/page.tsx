import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Hourly vs Salary: Which is Better in 2026?',
  description: 'Comparing hourly wages vs annual salary. Pros, cons, and financial differences updated for the 2026 job market.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/hourly-vs-salary-2026',
  },
  openGraph: {
    title: 'Hourly vs Salary: Which is Better?',
    description: 'Should you choose hourly or salary? We break down the math and benefits.',
    url: '/hourly-vs-salary-2026',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hourly vs Salary: Which is Better in 2026?",
  "description": "Comprehensive comparison of hourly vs salaried employment including overtime, benefits, and flexibility.",
  "author": {
    "@type": "Organization",
    "name": "Calcida"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Calcida",
    "logo": {
      "@type": "ImageObject",
      "url": `${getSiteUrl()}/logo.png`
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can salaried employees get overtime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, no. Most salaried positions are 'exempt' from overtime pay under the FLSA, meaning you get paid the same regardless of working 40 or 60 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Is it better to be hourly or salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you value stability and benefits, salary is often better. If you work many extra hours and want to be paid for them, hourly is better."
      }
    }
  ]
};

export default function HourlyVsSalaryPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Hourly vs Salary: Which is Better in 2026?</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            The debate between hourly and salaried pay is about more than just money—it's about lifestyle, stability, and legal protections.
          </p>
          <p className="mb-8">
            In 2026, with the rise of remote work and the gig economy, the lines are blurring. But the fundamental math remains the same. Here is what you need to know before signing your offer letter.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Core Difference</h2>
          <p className="mb-4">
            If you need to convert between the two, use our <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline">salary to hourly calculator</Link>.
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 text-lg mb-2">Hourly Pay</h3>
              <p className="text-sm mb-4">You trade time for money directly.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Pro:</strong> Paid for every minute worked.</li>
                <li><strong>Pro:</strong> 1.5x Overtime pay is required by law.</li>
                <li><strong>Con:</strong> Income fluctuates if hours are cut.</li>
                <li><strong>Con:</strong> Often fewer benefits (health/401k).</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-900 text-lg mb-2">Annual Salary</h3>
              <p className="text-sm mb-4">You are paid for a role/output.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Pro:</strong> Stable, predictable paycheck.</li>
                <li><strong>Pro:</strong> Access to better benefits & bonuses.</li>
                <li><strong>Con:</strong> No extra pay for working late/weekends.</li>
                <li><strong>Con:</strong> "Job creep" can lead to 50-60 hour weeks.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The "Real Hourly Rate" Test</h2>
          <p>
            To compare offers, you must convert the salary to an hourly equivalent. (You can also use our <Link href="/paycheck-calculator" className="text-blue-600 hover:underline">paycheck calculator</Link> to see the net difference).
          </p>
          <p>
            <strong>Standard Formula:</strong> Salary / 2,080 = Hourly Rate
          </p>
          <p>
            However, salaried employees often work more than 40 hours. If you are offered <strong>$60,000</strong>:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>At 40 hours/week: <strong>$28.85/hr</strong></li>
            <li>At 50 hours/week: <strong>$23.08/hr</strong> (Your value drops!)</li>
          </ul>
          <p>
            Meanwhile, an hourly employee at $28.85/hr working 50 hours would earn <strong>$72,000</strong> due to overtime pay.
          </p>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Compare Your Offers</h3>
            <p className="mb-4">Use our calculator to see the breakdown:</p>
            <div className="flex justify-center">
              <Link href="/hourly-to-salary-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Hourly to Salary Calculator
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Trends in 2026</h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Remote Work:</strong> Salaried roles offer more flexibility to run errands or handle childcare during the day without clocking out.</li>
            <li><strong>Threshold Changes:</strong> The salary threshold for overtime exemption changes periodically. Check current DOL rules to see if your salary is low enough to still qualify for overtime.</li>
            <li><strong>The Side Hustle Factor:</strong> Hourly work with a strict 40-hour cap leaves time for side businesses, whereas demanding salaried roles might drain your energy.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Verdict</h2>
          <p>
            Choose <strong>Salary</strong> if you are mid-career, value stability, and can set boundaries to avoid overwork.
          </p>
          <p>
            Choose <strong>Hourly</strong> if you are early-career, want to maximize earnings through overtime, or value a strict separation between work and life.
          </p>
        </div>
      </div>
    </>
  );
}