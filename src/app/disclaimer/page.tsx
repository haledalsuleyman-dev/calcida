import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Financial Disclaimer for Calculator Results',
  description: 'Read the Calcida financial disclaimer covering educational use, estimate accuracy limits, third-party links, and professional advice.',
  canonicalPath: '/disclaimer',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Financial Disclaimer",
  "url": `${getSiteUrl()}/disclaimer`,
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
        "name": "Disclaimer",
        "item": `${getSiteUrl()}/disclaimer`
      }
    ]
  }
};

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Financial Disclaimer</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
              <p className="font-bold text-yellow-800 m-0">
                  Calcida is an educational tool, not a financial advisor.
              </p>
          </div>

          <p className="mb-6">
            The content provided on Calcida, including but not limited to calculators, articles, guides, and blog posts, is for <strong>informational and educational purposes only</strong>. It should not be considered professional financial, investment, tax, or legal advice.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Accuracy of Information</h2>
          <p className="mb-4">
            While we strive to keep our information accurate and up-to-date, financial laws, tax codes, and market conditions change frequently. We cannot guarantee the accuracy, completeness, or timeliness of the information provided.
          </p>
          <p className="mb-4">
            Our calculators use simplified models and assumptions that may not reflect your specific financial situation. Actual results may vary based on factors not included in our tools.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">No Professional Relationship</h2>
          <p className="mb-4">
            Using this website does not create a professional-client relationship between you and Calcida or its owners. You should not rely solely on the information provided here for making financial decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Consult a Professional</h2>
          <p className="mb-4">
            We strongly recommend that you consult with a qualified professional—such as a Certified Public Accountant (CPA), financial planner, or attorney—before making any significant financial decisions. They can provide personalized advice tailored to your unique circumstances.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Third-Party Links</h2>
          <p className="mb-4">
            This website may contain links to other websites or resources. These links are provided for your convenience only. We do not endorse or assume responsibility for the content, products, or services offered by third parties.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Calcida be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website or reliance on any information provided herein.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            By using Calcida, you acknowledge that you have read and understood this disclaimer.
          </p>
        </div>
      </div>
    </>
  );
}
