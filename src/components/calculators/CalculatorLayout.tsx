import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { FAQ } from './FAQ';
import { NextStepCard } from './NextStepCard';

interface NextStep {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryActions: { label: string; href: string }[];
}

interface CalculatorLayoutProps {
  title: string;
  category?: { name: string; href: string };
  intro: React.ReactNode;
  children: React.ReactNode;
  howItWorks: React.ReactNode;
  formula: React.ReactNode;
  example: React.ReactNode;
  faq: { question: string; answer: string }[];
  relatedCalculators: { name: string; href: string }[];
  relatedArticles?: readonly { title: string; href: string }[];
  guide: React.ReactNode;
  schema: unknown;
  nextStep?: NextStep;
}

export function CalculatorLayout({
  title,
  category,
  intro,
  children,
  howItWorks,
  formula,
  example,
  faq,
  relatedCalculators,
  relatedArticles,
  guide,
  
  schema,
  nextStep,
}: CalculatorLayoutProps) {
  const relatedForBottom = relatedCalculators.slice(0, 6);
  return (
    <>
      <JsonLd data={schema} />
      <div className="container mx-auto px-4 py-8 pb-32 max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            {category ? (
              <>
                <li>
                  <Link href={category.href} className="hover:text-blue-600 hover:underline">
                    {category.name}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
              </>
            ) : null}
            <li className="text-gray-900 font-medium" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>
          <div className="max-w-3xl mx-auto">{intro}</div>
        </div>

        <div className="mb-12">
           {children}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-12">
            
            {nextStep && (
                <NextStepCard {...nextStep} />
            )}

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">How This Calculator Works</h2>
              {howItWorks}
            </section>

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">Formula</h2>
              {formula}
            </section>

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">Example Calculation</h2>
              {example}
            </section>
            
            <section className="prose prose-blue max-w-none">
              {guide}
            </section>
            
            <FAQ items={faq} />

            {relatedForBottom.length > 0 && (
              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedForBottom.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="block p-3 bg-white rounded-md border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-blue-700 hover:text-blue-800"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Related Calculators</h3>
                <ul className="space-y-3">
                  {relatedCalculators.map((calc) => (
                    <li key={calc.href}>
                      <Link href={calc.href} className="text-blue-600 hover:underline block py-1">
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Helpful Guides</h3>
                    <ul className="space-y-3">
                    {relatedArticles.map((article) => (
                        <li key={article.href}>
                        <Link href={article.href} className="text-blue-600 hover:underline block py-1 leading-snug">
                            {article.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
