import dynamic from 'next/dynamic';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';

const FAQ = dynamic(() => import('./FAQ').then(mod => mod.FAQ), { 
  ssr: true,
  loading: () => <div className="h-20 animate-pulse bg-gray-50 rounded-2xl" />
});

const NextStepCard = dynamic(() => import('./NextStepCard').then(mod => mod.NextStepCard), {
  ssr: true,
  loading: () => <div className="h-40 animate-pulse bg-gray-50 rounded-2xl" />
});

import { AdSlot } from '@/components/ads/AdSlot';

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
      <div className="container mx-auto px-4 py-10 pb-32 max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center overflow-x-auto no-scrollbar whitespace-nowrap px-4">
          <ol className="flex items-center gap-x-3 text-xs md:text-sm text-gray-400 font-medium">
            <li className="flex items-center gap-x-3">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </li>
            {category ? (
              <li className="flex items-center gap-x-3">
                <Link href={category.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                  {category.name}
                </Link>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </li>
            ) : null}
            <li className="text-gray-900 truncate max-w-[150px] md:max-w-none" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <div className="mb-12 text-center prose prose-slate mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 text-balance">
            {title}
          </h1>
          <div className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto text-balance">
            {intro}
          </div>
        </div>

        <div className="mb-12">
           {children}
        </div>

        <AdSlot id="calc-after-tool" type="horizontal" className="mb-16" />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-12">
            
            {nextStep && (
                <NextStepCard {...nextStep} />
            )}

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">How This Calculator Works</h2>
              {howItWorks}
            </section>

            <AdSlot id="calc-content-middle-1" type="horizontal" className="my-12" />

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">Formula</h2>
              {formula}
            </section>

            <section className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold mb-4">Example Calculation</h2>
              {example}
            </section>

            <AdSlot id="calc-content-middle-2" type="horizontal" className="my-12" />
            
            <section className="prose prose-blue max-w-none">
              {guide}
            </section>
            
            <FAQ items={faq} />

            <AdSlot id="calc-before-related" type="horizontal" className="my-12" />

            {relatedForBottom.length > 0 && (
              <section className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  Continue Your Analysis
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedForBottom.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                    >
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-sm mb-1">{calc.name}</span>
                      <span className="text-xs text-gray-500">Calculate now &rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black mb-4 uppercase tracking-tight text-gray-400">Toolkit</h3>
                <ul className="space-y-4">
                  {relatedCalculators.map((calc) => (
                    <li key={calc.href}>
                      <Link href={calc.href} className="flex items-center gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-500 transition-colors"></div>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors leading-tight">
                          {calc.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black mb-4 uppercase tracking-tight text-gray-400">Knowledge</h3>
                    <ul className="space-y-4">
                    {relatedArticles.map((article) => (
                        <li key={article.href}>
                        <Link href={article.href} className="group flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors leading-snug">
                                {article.title}
                            </span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
              )}

              <AdSlot id="calc-sidebar-rectangle" type="rectangle" className="mt-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
