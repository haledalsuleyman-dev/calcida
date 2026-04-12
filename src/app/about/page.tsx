import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Calcida and Our Calculator Standards',
  description: 'Learn how Calcida builds financial calculators, reviews formulas, updates assumptions, and prioritizes accuracy, transparency, and usability.',
  canonicalPath: '/about',
});

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Calcida",
    "url": getSiteUrl(),
    "logo": `${getSiteUrl()}/logo.png`,
    "description": "Free online financial calculators for mortgage, loans, and salary."
  };

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">About Calcida</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Calcida is built by a dedicated team of software engineers, financial analysts, and personal finance enthusiasts. Our mission is to simplify complex financial decisions through powerful, accurate, and easy-to-use calculators.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Who Builds Our Tools?</h2>
          <p className="mb-4">
            Our tools are developed by a team with deep expertise in both financial mathematics and modern software engineering. We combine rigorous quantitative analysis with a focus on user experience to ensure that every calculation is both mathematically sound and easy to understand.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How Accuracy is Ensured</h2>
          <p className="mb-4">
            At Calcida, accuracy is our highest priority. We follow a multi-step verification process for every calculator we build:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Formula Verification:</strong> Every calculator is built using standard industry formulas, cross-referenced against financial textbooks and official institutional benchmarks.</li>
            <li><strong>Strict Testing:</strong> We perform rigorous edge-case testing to ensure our tools remain accurate even with extreme or unusual inputs.</li>
            <li><strong>Official Data Sources:</strong> For tax and salary tools, we use official IRS publications, state-level tax tables, and government-issued payroll standards.</li>
            <li><strong>Continuous Monitoring:</strong> We regularly monitor financial regulations and interest rate environments to ensure our assumptions remain current.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Our Commitment to Updates</h2>
          <p className="mb-4">
            The financial landscape is constantly changing. We are committed to maintaining the long-term reliability of our tools through:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Annual Reviews:</strong> All tax-related calculators are updated annually to reflect the latest tax brackets, standard deductions, and contribution limits.</li>
            <li><strong>Regular Audits:</strong> Our core calculation engines undergo periodic audits to ensure they still meet our high standards for precision and performance.</li>
            <li><strong>User Feedback:</strong> We actively listen to our users. If a potential discrepancy is reported, our engineering team investigates and resolves it with the highest priority.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Why Trust Calcida?</h2>
          <p className="mb-4">
            We know that when it comes to money, accuracy is everything. We prioritize objective math over marketing.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>No Hidden Agendas:</strong> Our calculators run on standard industry formulas. We test our logic strictly against financial textbooks and institutional benchmarks.</li>
            <li><strong>Strict Methodology:</strong> Tax brackets, standard deductions, and calculation limits are updated annually based on official IRS publications.</li>
            <li><strong>Educational Focus:</strong> We provide these tools strictly for educational and informational purposes, helping you understand the <em>"what ifs"</em> before you speak to a qualified professional.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How Our Calculators Work</h2>
          <p className="mb-4">
            Our tools are built using modern web technologies to deliver precise estimates:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Accuracy First:</strong> Vigorous edge-case testing prevents math breakdowns on extreme inputs.</li>
            <li><strong>Simplicity:</strong> Clean interfaces that ask only for the variables strictly necessary to produce a meaningful estimate.</li>
            <li><strong>Speed & Privacy:</strong> Calculations happen instantly and locally in your browser without page reloads. We do <strong>not</strong> store or sell the financial data you input.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Learn More About Our Standards</h2>
          <p className="mb-4">
            For a full breakdown of how we build, test, and maintain our calculators and articles, please read our comprehensive <Link href="/editorial-policy" className="text-blue-600 font-semibold hover:underline">Editorial & Methodology Policy</Link>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-4">
            Have a suggestion, feedback, or found a bug in a calculator? We take mathematical discrepancies seriously. Please visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link> to report any issues or get in touch.
          </p>
        </div>
      </div>
    </>
  );
}
