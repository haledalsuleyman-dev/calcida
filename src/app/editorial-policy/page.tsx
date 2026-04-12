import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Editorial Policy and Methodology Standards',
  description: 'Review Calcida editorial standards, calculator methodology, update practices, corrections policy, and independence guidelines.',
  canonicalPath: '/editorial-policy',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Editorial Policy",
  "url": `${getSiteUrl()}/editorial-policy`
};

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Editorial Policy & Methodology</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            At Calcida, our primary goal is to provide reliable, clear, and objective financial calculators. We understand that mathematical accuracy is critical when exploring financial decisions. This policy outlines our strict standards for calculator development, content creation, and ongoing reviews.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">1. Core Principles</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Objectivity:</strong> Our core calculators are built purely on standard financial mathematics. Our formulas do not inherently favor any specific financial product or institution.</li>
            <li><strong>Transparency:</strong> We strive to clearly state the assumptions behind every calculator (e.g., compounding frequency, tax assumptions, or standard defaults) directly within the tool.</li>
            <li><strong>Educational Purpose:</strong> Our tools are designed strictly for educational and informational purposes. They are meant to help users explore scenarios, not to serve as definitive or binding financial advice.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">2. Calculator Methodology & Accuracy</h2>
          <p className="mb-4">Our calculators use standard industry formulas for amortization, present/future value, compound interest, and tax estimations. Our development process includes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Formula Verification:</strong> Core math logic is carefully cross-referenced against established financial textbooks and institutional benchmarks (e.g., standard lending formulas used by banks).</li>
            <li><strong>Edge-Case Testing:</strong> We rigorously test inputs to ensure the calculators gracefully handle zero-values, very high values, or unrealistic term lengths without returning misleading data.</li>
            <li><strong>Continuous Updates:</strong> Elements tied to tax brackets, standard deductions, and contribution limits (like 401(k) or IRA limits) are reviewed and updated annually to reflect current IRS data.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">3. Content Review & Update Frequency</h2>
          <p className="mb-4">
            Our content and calculators are subject to a rigorous review process. To ensure continued accuracy and relevance:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Annual Core Updates:</strong> All calculators tied to federal tax brackets, standard deductions, and retirement contribution limits (e.g., 401(k), IRA) are updated every January to reflect the latest IRS data.</li>
            <li><strong>Quarterly Technical Audits:</strong> Our engineering team performs quarterly audits of our core calculation engines to ensure mathematical precision and performance standards are met.</li>
            <li><strong>Ongoing Editorial Review:</strong> Accompanying articles, guides, and FAQs are reviewed regularly for clarity, and to ensure they reflect the current economic and interest rate environment.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">4. Revenue and Independence</h2>
          <p className="mb-4">
            Calcida is an independent platform. While we may earn revenue through display advertising or affiliate partnerships, these relationships <strong>never</strong> influence our calculator math, default inputs, or the objective nature of our tools. Our editorial integrity and mathematical accuracy always come first.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">5. Corrections & Error Handling</h2>
          <p className="mb-4">
            We take mathematical and factual accuracy seriously. Our correction policy ensures that any identified errors are handled swiftly and transparently:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Reporting:</strong> Users can report potential discrepancies via our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link>. We investigate every report involving calculation logic within 48 business hours.</li>
            <li><strong>Verification:</strong> Our technical team cross-references reported issues against official financial benchmarks and documentation.</li>
            <li><strong>Resolution:</strong> If an error is verified, we immediately deploy a fix to the live calculator or article. We maintain a version history of our core calculation logic to prevent regressions.</li>
            <li><strong>Transparency:</strong> Significant changes to calculator logic or methodology are noted in the "Last Updated" section of the relevant page.</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12 text-sm text-gray-600">
            <strong>Important Limitation:</strong> Calcida is a financial modeling software company, not a financial advisory firm, tax advisory firm, or legal provider. All output from our calculators is estimated and for educational use only. Always consult a certified financial planner, CPA, or other qualified professional before making significant financial commitments.
          </div>
        </div>
      </div>
    </>
  );
}
