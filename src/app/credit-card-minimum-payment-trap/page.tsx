import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'The Credit Card Minimum Payment Trap (Explained)',
  description: 'Why paying the minimum balance keeps you in debt for decades. See the math behind the minimum payment trap and how to escape.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/credit-card-minimum-payment-trap',
  },
  openGraph: {
    title: 'The Credit Card Minimum Payment Trap',
    description: 'Don\'t fall for the minimum payment trap. Learn how to pay off debt faster.',
    url: '/credit-card-minimum-payment-trap',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Credit Card Minimum Payment Trap",
  "description": "Explanation of how credit card minimum payments work and why they lead to long-term debt.",
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
      "name": "How is the minimum payment calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is usually calculated as 1% of your balance plus interest fees, or a flat percentage like 2-3% of the total balance."
      }
    },
    {
      "@type": "Question",
      "name": "Does paying the minimum hurt my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paying the minimum keeps your account 'current' (avoiding late fees), which helps your payment history. However, carrying a high balance hurts your Credit Utilization Ratio, which can lower your score."
      }
    }
  ]
};

export default function MinimumPaymentTrapPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">The Credit Card Minimum Payment Trap</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            If you are only paying the minimum balance on your credit card every month, you are falling into the credit card company's most profitable, precisely engineered scenario.
          </p>
          <p className="mb-8">
            The "Minimum Payment" calculation is mathematically designed to be just enough to cover your monthly compound interest plus a microscopic fraction of your actual principal balance. This ensures you stay in debt for as long as possible—sometimes stretching a single vacation or emergency expense over decades—while paying double or triple what you originally borrowed.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Math: Why It Takes Forever</h2>
          <p>
            Let's say you have <strong>$5,000</strong> in debt on a card with <strong>20% APR</strong>.
          </p>
          <p>
            Your minimum payment is calculated as <strong>Interest + 1% of Balance</strong>.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Interest for Month 1: ~$83</li>
            <li>1% of Balance: $50</li>
            <li><strong>Total Payment: $133</strong></li>
          </ul>
          <p>
            You pay $133, but only $50 goes toward reducing your $5,000 debt. The rest vanishes into the bank's profit.
          </p>

          <div className="bg-red-50 border border-red-200 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold text-red-900 mb-4">The Trap in Action</h2>
            <p className="mb-4">If you ONLY pay the minimum on that $5,000 debt:</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block text-gray-600 text-sm uppercase font-bold">Time to Pay Off</span>
                <span className="block text-2xl font-bold text-red-600">22 Years</span>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block text-gray-600 text-sm uppercase font-bold">Total Interest Paid</span>
                <span className="block text-2xl font-bold text-red-600">$7,800+</span>
              </div>
            </div>
            
            <p className="mt-4 text-center text-red-800 italic">
              You will pay over $12,800 for a $5,000 purchase.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How to Escape</h2>
          <p>
            The good news is that math works both ways. Small increases in your payment have massive effects.
          </p>
          <p>
            If you pay a fixed <strong>$200 per month</strong> instead of the minimum:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Time to Pay Off: <strong>Under 3 Years</strong> (vs 22 years)</li>
            <li>Total Interest: <strong>~$1,500</strong> (vs $7,800)</li>
          </ul>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">See Your Debt-Free Date</h3>
            <p className="mb-4">Use our calculator to see how much faster you can be free:</p>
            <div className="flex justify-center">
              <Link href="/credit-card-payoff-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Credit Card Payoff Calculator
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Strategies to Pay Faster</h2>
          <p className="mb-4">
            There are two primary mathematical strategies to get out of the minimum payment trap. You can read our full comparison of the <Link href="/blog/debt-snowball-vs-avalanche" className="text-blue-600 hover:underline">Debt Snowball vs Avalanche methods</Link> to decide which is right for you:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-4">
            <li><strong>The Debt Avalanche Method:</strong> Pay minimums on all cards, but throw all extra money at the card with the highest interest rate. This mathematically saves the most money and pays off debt the fastest.</li>
            <li><strong>The Debt Snowball Method:</strong> Pay off the smallest balance first to get a quick psychological "win," then roll that payment into the next smallest debt. This builds intense motivation.</li>
            <li><strong>Balance Transfer Strategy:</strong> Move high-interest debt to a 0% APR promotional card (usually lasting 12-18 months) so 100% of your minimum payment goes toward reducing the principal.</li>
          </ol>
        </div>
      </div>
    </>
  );
}