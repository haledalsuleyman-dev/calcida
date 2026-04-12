import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Hourly vs Salary Pros and Cons: Which Pay Model Wins?',
  description: 'Comparing hourly vs salary pay. Detailed pros and cons list to help you decide which employment type is better for your career and wallet.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/hourly-vs-salary-pros-cons',
  },
  openGraph: {
    title: 'Hourly vs Salary Pros and Cons',
    description: 'The ultimate guide to choosing between hourly wages and annual salary.',
    url: '/hourly-vs-salary-pros-cons',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": 'Hourly vs Salary Pros and Cons: Which Pay Model Wins?',
  "description": "In-depth analysis of the advantages and disadvantages of hourly versus salaried employment.",
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
      "name": "Is salary better than hourly for taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, the tax rates are the same for both. The IRS taxes 'ordinary income' at the same rate regardless of whether it was earned by the hour or as a salary. However, salaried workers may have more predictable withholdings."
      }
    },
    {
      "@type": "Question",
      "name": "Can I switch from salary to hourly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is up to your employer, but it is legal. Employers often switch roles from exempt (salary) to non-exempt (hourly) to comply with overtime laws."
      }
    }
  ]
};

export default function HourlyVsSalaryProsConsPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Hourly vs Salary Pros and Cons: Which Pay Model Wins?</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Choosing between an hourly wage and an annual salary is one of the most significant decisions in your career. It affects your income stability, work-life balance, and legal rights. Use our <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline">salary to hourly calculator</Link> to see the raw numbers.
          </p>
          <p className="mb-8">
            While salaried roles are often seen as more &quot;prestigious,&quot; hourly roles can actually be more lucrative for hard workers due to overtime laws. Let&apos;s weigh the pros and cons of each.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Hourly Pay: The Pros and Cons</h2>
          <div className="my-6">
            <h3 className="text-xl font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">✅ Pros of Hourly</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Overtime Pay (1.5x):</strong> By federal law, if you work over 40 hours, you must be paid &quot;time and a half.&quot; This can massively boost your income (check with our <Link href="/paycheck-calculator" className="text-blue-600 hover:underline">paycheck calculator</Link>).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Paid for Every Minute:</strong> If a meeting runs late, you get paid for it. Your time is literally money.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Work-Life Boundaries:</strong> When you clock out, you are done. Employers are less likely to call you after hours because they don&apos;t want to pay you.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Holiday Pay (2x):</strong> Many companies offer double-time for working on holidays.</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-red-800 border-b border-red-200 pb-2 mb-4 mt-8">❌ Cons of Hourly</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>Income Fluctuation:</strong> If business is slow and your hours get cut, your paycheck shrinks.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>Fewer Benefits:</strong> Hourly roles (especially part-time) often lack health insurance, 401k matching, or paid parental leave.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>Stigma:</strong> Some industries view hourly roles as "entry-level," which can affect career progression speed.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Salary Pay: The Pros and Cons</h2>
          <div className="my-6">
            <h3 className="text-xl font-bold text-green-800 border-b border-green-200 pb-2 mb-4">✅ Pros of Salary</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Stable Income:</strong> You get the same paycheck every two weeks, making budgeting (and getting a mortgage) much easier.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Better Benefits:</strong> Salaried roles typically come with comprehensive health plans, PTO, and retirement matching.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Flexibility:</strong> Need to leave early for a dentist appointment? Salaried bosses usually don&apos;t dock your pay.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500 font-bold">✓</span>
                <span><strong>Bonuses:</strong> Performance bonuses and stock options are far more common in salaried positions.</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-red-800 border-b border-red-200 pb-2 mb-4 mt-8">❌ Cons of Salary</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>No Overtime:</strong> If you work 60 hours to finish a project, you get paid for 40. This lowers your &quot;real&quot; hourly rate.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>Always &quot;On&quot;:</strong> Because you aren&apos;t clocking hours, there is pressure to check emails at night or on weekends.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500 font-bold">✗</span>
                <span><strong>Job Creep:</strong> Responsibilities can expand without a corresponding pay raise.</span>
              </li>
            </ul>
          </div>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Do the Math Before You Accept</h3>
            <p className="mb-4">Use our calculator to compare the offers side-by-side:</p>
            <div className="flex justify-center">
              <Link href="/hourly-to-salary-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Compare Pay Now
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Summary: Which Should You Choose?</h2>
          <p>
            <strong>Go Hourly If:</strong> You value being paid for every minute you work, you want clear separation between work and home, or you are in a field with frequent overtime (healthcare, trades, construction).
          </p>
          <p>
            <strong>Go Salary If:</strong> You value stability, want maximizing benefits/bonuses, need schedule flexibility during the day, or are climbing the corporate ladder in management.
          </p>
        </div>
      </div>
    </>
  );
}
