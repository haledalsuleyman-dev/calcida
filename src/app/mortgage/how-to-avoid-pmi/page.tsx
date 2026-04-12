import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { GeneratedCalculator } from '@/components/calculators/generated/GeneratedCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: 'How to Avoid PMI: Down Payment & PMI Calculator Guide',
  description: 'Learn how to avoid PMI and estimate the cost if you put less than 20% down. Use a PMI calculator and down payment tools—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/mortgage/how-to-avoid-pmi' },
  openGraph: {
    title: 'How to Avoid PMI',
    description: 'Practical ways to avoid PMI and estimate PMI cost when putting less than 20% down.',
    url: '/mortgage/how-to-avoid-pmi',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is PMI?',
    answer:
      'PMI (private mortgage insurance) is a monthly insurance cost lenders often require when you put less than 20% down on a conventional loan.',
  },
  {
    question: 'How can I avoid PMI?',
    answer:
      'Common options include putting 20% down, using lender-paid PMI (often a higher rate), choosing a piggyback loan (80/10/10), or using certain loan programs where PMI is structured differently.',
  },
  {
    question: 'Is it ever worth paying PMI?',
    answer:
      'Sometimes. If waiting for 20% down keeps you renting for years or missing a favorable price, a smaller down payment plus PMI can still be a reasonable plan. Run scenarios and compare total cost.',
  },
  {
    question: 'How do I remove PMI?',
    answer:
      'For many conventional loans, PMI can be removed after you reach certain loan-to-value thresholds, based on your balance and/or a home appraisal. Rules vary by lender and loan type.',
  },
  {
    question: 'Does FHA have PMI?',
    answer:
      'FHA loans have mortgage insurance premiums (MIP), which are not the same as conventional PMI and can last longer depending on your down payment and loan term.',
  },
  {
    question: 'What down payment avoids PMI?',
    answer:
      'A 20% down payment avoids PMI for many conventional loans. Some lenders may have different thresholds or pricing.',
  },
];

export default function HowToAvoidPMIPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">How to Avoid PMI</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          PMI can add a meaningful monthly cost when you put less than 20% down. This page explains practical ways to avoid PMI (or reduce it faster) and gives
          you a calculator to estimate the impact on your payment.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Practical Ways to Avoid or Reduce PMI</h2>
        <ul>
          <li>
            <strong>Increase down payment:</strong> A 20% down payment avoids PMI in many conventional loans.
          </li>
          <li>
            <strong>Choose a different loan structure:</strong> Some borrowers use a piggyback setup (for example, 80/10/10) to reduce or avoid PMI.
          </li>
          <li>
            <strong>Pay extra principal:</strong> Reaching the required loan-to-value threshold sooner can help you request PMI removal.
          </li>
          <li>
            <strong>Compare programs:</strong> FHA and VA loans handle mortgage insurance differently; the cheapest option depends on your profile.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example: a 10% down payment can trigger PMI. Estimate the monthly PMI cost below, then compare how a larger down payment changes the outcome using the{' '}
          <Link href="/down-payment-calculator" className="text-blue-600 hover:underline font-medium">
            Down Payment Calculator
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">PMI Calculator</h2>
      </div>

      <div className="mt-6">
        <GeneratedCalculator id="pmi" />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Calculators</h2>
        <ul>
          <li>
            <Link href="/down-payment-calculator" className="text-blue-600 hover:underline font-medium">
              Down Payment Calculator
            </Link>
          </li>
          <li>
            <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline font-medium">
              Mortgage Payment Calculator
            </Link>
          </li>
          <li>
            <Link href="/mortgage-affordability-calculator" className="text-blue-600 hover:underline font-medium">
              Mortgage Affordability Calculator
            </Link>
          </li>
          <li>
            <Link href="/closing-costs-calculator" className="text-blue-600 hover:underline font-medium">
              Closing Costs Calculator
            </Link>
          </li>
          <li>
            <Link href="/refinance-calculator" className="text-blue-600 hover:underline font-medium">
              Refinance Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

