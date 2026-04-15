import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Calcida | Demystifying complex financial math',
  description: 'Learn how Calcida builds accurate financial calculators, reviews mathematical formulas, and prioritizes transparency and usability for all users.',
  canonicalPath: '/about',
});

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Calcida",
      "url": getSiteUrl(),
      "logo": `${getSiteUrl()}/logo.png`,
      "description": "Free online educational financial calculators designed to demystify complex math for everyone."
    }
  };

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b border-gray-200 pb-4">About Calcida</h1>
        
        <div className="prose prose-lg prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-8 text-gray-800 font-medium">
            Calcida is built by a dedicated team of software engineers, financial analysts, and personal finance advocates. We believe that objective mathematical truth should be accessible to everyone, free from predatory marketing.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">What Problem Does Calcida Solve?</h2>
          <p className="mb-4">
            The modern financial landscape is overly complex. Banks hide behind obscure terminology, loan origination fees are buried in fine print, and tax brackets are profoundly misunderstood. 
          </p>
          <p className="mb-6">
            We built Calcida because we were tired of encountering financial calculators that required users to surrender an email address, or worse, skewed the math to sell a high-interest loan. **Our platform solves the problem of financial ambiguity.** We provide calculators that execute rigorous mathematical formulas instantly in your browser, giving you a completely objective look at your finances.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">How Our Calculators Work</h2>
          <p className="mb-4">
            Our tools execute standard industry formulas locally on your device. We prioritize three core pillars:
          </p>
          <ul className="list-none pl-0 mb-6 space-y-4">
            <li className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <strong className="text-gray-900 block mb-1">1. Absolute Privacy</strong> 
              Because the math executes directly in your browser, your sensitive financial inputs (like your salary or mortgage details) never leave your device. We do not store, track, or sell your financial data.
            </li>
            <li className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <strong className="text-gray-900 block mb-1">2. Transparent Methodologies</strong> 
              We do not hide our math. Every calculator page explicitly details the exact mathematical formulas used to derive the estimates, empowering you to reconstruct the calculations if desired.
            </li>
            <li className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <strong className="text-gray-900 block mb-1">3. Institutional-Grade Formulas</strong> 
              Our engines utilize the exact same amortization, present value, and compound interest equations used by traditional underwriters and loan officers.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">How Data and Formulas Are Maintained</h2>
          <p className="mb-4">
            To ensure the integrity of our tools, we follow a strict deployment pipeline:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Benchmarking:</strong> Every new calculator is cross-referenced against institutional outputs (e.g., matching our mortgage calculator against a primary lender's official Good Faith Estimate).</li>
            <li><strong>Regulatory Updates:</strong> Tax algorithms and contribution limits (401k, IRA, HSA) are strictly tied to official IRS publications. We never use arbitrary approximations when authoritative data exists.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Our Unwavering Commitment to Updates</h2>
          <p className="mb-4">
            A calculator is only as trustworthy as its latest update. Calcida is committed to a robust maintenance schedule:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Annual Mandates:</strong> Federal tax brackets, standard deductions, and retirement limits are updated at the start of every calendar year.</li>
            <li><strong>Algorithmic Audits:</strong> Mathematical engines govern our platform. Our engineering team routinely stress-tests these algorithms against edge cases to guarantee stability.</li>
            <li><strong>User-Driven Corrections:</strong> We operate with humility. If a user flags a methodological discrepancy, it immediately escalates to our core engineering team for verification and public correction.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-12 mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Learn More About Our Standards</h3>
            <p className="text-sm text-blue-800 mb-0">
              To understand our core principles regarding review structures, editorial independence, and calculation warnings, please read our strict <Link href="/editorial-policy" className="font-bold underline hover:text-blue-700">Editorial & Methodology Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
