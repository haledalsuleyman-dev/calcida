import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { MortgagePaymentArticle } from '@/components/content/MortgagePaymentArticle';

export const metadata: Metadata = {
  title: '$200,000 Mortgage Payment: Estimated Monthly Cost & Breakdown',
  description: 'How much is the monthly payment on a $200,000 mortgage? See your estimated principal and interest, plus how taxes and insurance impact your all-in cost.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/mortgage-payment-calculator' },
  robots: { index: false, follow: true },
  openGraph: {
    title: '$200,000 Mortgage Payment: Monthly Breakdown',
    description: 'Calculate your monthly payment for a $200,000 mortgage including taxes and insurance.',
    url: '/mortgage/200000-mortgage-payment',
    type: 'article',
  },
};

export default function Mortgage200kPaymentPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">$200,000 Mortgage Payment Breakdown</h1>
        <MortgagePaymentArticle loanAmount={200000} />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Customize Your Estimate</h2>
        <MortgageCalculator defaultValues={{ homePrice: 200000, downPayment: 0, paymentFrequency: 'monthly' }} />
      </div>
    </div>
  );
}
