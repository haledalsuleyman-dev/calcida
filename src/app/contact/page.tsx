import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Calcida for Feedback and Support',
  description: 'Contact the Calcida team with calculator feedback, content corrections, partnership questions, or general support requests.',
  canonicalPath: '/contact',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Calcida",
  "url": `${getSiteUrl()}/contact`,
  "mainEntity": {
    "@type": "Organization",
    "name": "Calcida",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@calcida.app",
      "contactType": "customer support"
    }
  }
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            We value your feedback and are constantly working to ensure Calcida remains the most accurate and reliable financial toolset available.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How to Reach Us</h2>
          <p className="mb-4">
            For any inquiries, mathematical corrections, specific calculator requests, or partnership opportunities, please reach out to us via email:
          </p>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center my-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email Us</h3>
              <a href="mailto:hello@calcida.app" className="text-2xl text-blue-600 hover:text-blue-800 font-semibold underline">
                  hello@calcida.app
              </a>
              <p className="mt-2 text-gray-600 text-sm">We aim to review and respond to all inquiries within 2-3 business days.</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Common Topics</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Mathematical Discrepancies & Bugs:</strong> We take mathematical accuracy seriously. If a calculator isn't working as expected, please include the browser you are using and the exact inputs that caused the issue so our developers can replicate and fix it.</li>
            <li><strong>Feature Requests:</strong> Have an idea for a new financial calculator that would be genuinely useful? Let us know!</li>
            <li><strong>Content Corrections:</strong> Found a typo or outdated tax bracket in our guides? We appreciate the heads-up and strive to update our data constantly.</li>
            <li><strong>Partnerships:</strong> Interested in collaborating? We are open to relevant advertising and content partnerships, provided they align with our <Link href="/editorial-policy" className="text-blue-600 hover:underline">Editorial Policy</Link>.</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">
              <strong>Disclaimer:</strong> Calcida is a software company, not a financial advisory firm. We cannot provide personalized financial advice, debt counseling, or investment recommendations. For specific professional guidance, please consult a CPA or certified financial planner.
          </p>
        </div>
      </div>
    </>
  );
}
