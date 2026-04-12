import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy for Calcida Visitors',
  description: 'Understand what data Calcida collects, how it is used, which analytics tools run on the site, and the choices available to visitors.',
  canonicalPath: '/privacy-policy',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "url": `${getSiteUrl()}/privacy-policy`,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getSiteUrl()
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": `${getSiteUrl()}/privacy-policy`
      }
    ]
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: October 26, 2024</p>

        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="mb-4">
            At Calcida, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Information We Collect</h2>
          <p className="mb-4">
            We collect minimal personal information to provide you with the best experience possible.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Calculator Inputs:</strong> Data entered into our calculators (like loan amounts, interest rates, or salary figures) is processed locally in your browser whenever possible. We do not store or transmit this data to our servers unless explicitly stated for a specific feature (e.g., saving a calculation to an account).</li>
            <li><strong>Usage Data:</strong> We may collect anonymous usage data, such as pages visited, time spent on the site, and referring websites, to help us improve our content and user experience.</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To improve, personalize, and expand our Service.</li>
            <li>To understand and analyze how you use our Service.</li>
            <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Third-Party Services</h2>
          <p className="mb-4">
            We may use third-party services, such as Google Analytics, to help us understand how our Service is used. These third-party service providers have their own privacy policies addressing how they use such information.
          </p>
          <p className="mb-4">
            We may also display advertisements from third-party ad networks (like Google AdSense). These ad networks may use cookies and similar technologies to collect data about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Data Retention & User Rights</h2>
          <p className="mb-4">
            We retain anonymous analytics data for a limited period to analyze trends. Since we do not collect personal accounts or sensitive financial data on our servers, there is generally no personal data to request for deletion. However, if you have contacted us via email, you may request the deletion of that correspondence at any time.
          </p>
          <p className="mb-4">
            Depending on your location, you may have rights under GDPR or CCPA regarding your data. Please contact us if you wish to exercise these rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Data Security</h2>
          <p className="mb-4">
            We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@calcida.app" className="text-blue-600 hover:underline">hello@calcida.app</a>.
          </p>
        </div>
      </div>
    </>
  );
}
