import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service for Calcida Users',
  description: 'Read the Calcida terms of service covering site use, content ownership, calculator limitations, and user responsibilities.',
  canonicalPath: '/terms',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "url": `${getSiteUrl()}/terms`,
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
        "name": "Terms of Service",
        "item": `${getSiteUrl()}/terms`
      }
    ]
  }
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: October 26, 2024</p>

        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="mb-4">
            Welcome to Calcida! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the Calcida website (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use this Site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">2. Use of the Site</h2>
          <p className="mb-4">
            Calcida provides financial calculators and informational content for personal, non-commercial use only. You agree not to use the Site for any illegal or unauthorized purpose.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">3. Disclaimer of Warranties</h2>
          <p className="mb-4">
            The information and calculators provided on Calcida are for general informational and educational purposes only. While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          <p className="mb-4">
            Any reliance you place on such information is strictly at your own risk. We recommend consulting with a qualified financial advisor before making any financial decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">4. Limitation of Liability</h2>
          <p className="mb-4">
            In no event will Calcida be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">5. Intellectual Property</h2>
          <p className="mb-4">
            The content, layout, design, data, databases and graphics on this website are protected by United States and other international intellectual property laws and are owned by Calcida or its licensors. Unless expressly permitted in writing, you may not copy, modify, reproduce, republish, distribute, display, or transmit for commercial, non-profit or public purposes all or any portion of this website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">6. Third-Party Links</h2>
          <p className="mb-4">
            Through this website, you are able to link to other websites which are not under the control of Calcida. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will post the revised Terms on this page and update the "Last Updated" date. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at <a href="mailto:hello@calcida.app" className="text-blue-600 hover:underline">hello@calcida.app</a>.
          </p>
        </div>
      </div>
    </>
  );
}
