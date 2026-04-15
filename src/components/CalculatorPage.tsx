import React from 'react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { getCategory, type CategoryKey } from '@/lib/categories';
import { softwareApplicationJsonLd, faqPageJsonLd, breadcrumbListJsonLd, type JsonLdFaqItem } from '@/lib/jsonld';
import { relatedCalculatorLinksForSpec, getCrossCategoryRelatedLinks } from '@/lib/relatedCalculators';
import type { CalculatorSpec } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';
import { getCalculatorSeoContentForRoute } from '@/lib/calculatorSeoContent';
import { CalculatorExample, CalculatorFormula, CalculatorIntro } from '@/components/calculators/SeoContentBlocks';
import { getNextStepForCalculator, getContextualCrossLinks, CATEGORY_HUB_LINKS } from '@/lib/internalLinking';
import Link from 'next/link';
import { TrustBadge } from '@/components/TrustBadge';

export interface CalculatorPageProps {
  spec: CalculatorSpec;
  children: React.ReactNode;
  howItWorks: React.ReactNode;
  guide: React.ReactNode;
  faq?: readonly JsonLdFaqItem[];
  relatedArticles?: readonly { title: string; href: `/${string}` }[];
  example?: React.ReactNode;
  nextStep?: {
    title: string;
    description: string;
    primaryAction: { label: string; href: string };
    secondaryActions: { label: string; href: string }[];
  };
  categoryOverride?: { key: CategoryKey; name: string; href: string };
  intro?: React.ReactNode;
  formula?: React.ReactNode;
}

function normalizeQuestion(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function ensureFaqCount(spec: CalculatorSpec, hubName: string, base: readonly JsonLdFaqItem[]): JsonLdFaqItem[] {
  const existing = base ?? [];
  const out: JsonLdFaqItem[] = [];
  const seen = new Set<string>();

  for (const item of existing) {
    const key = normalizeQuestion(item.question);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }

  const generic: JsonLdFaqItem[] =
    spec.category === 'mortgage'
      ? [
          {
            question: 'Does this mortgage calculator include property taxes and insurance?',
            answer:
              'If you enter property tax and homeowners insurance values, the calculator can include them in the total monthly estimate. If you leave them blank, the result reflects principal and interest only.',
          },
          {
            question: 'How accurate is a mortgage payment estimate?',
            answer:
              'The calculation is accurate for principal and interest when you use the correct loan amount, rate, and term. Real-world totals can vary based on taxes, insurance, HOA fees, PMI, and lender-specific rules.',
          },
          {
            question: 'What interest rate should I use?',
            answer:
              'Use the rate your lender quoted for your scenario. If you are estimating, try a conservative rate and compare multiple rates to see how sensitive the payment is to interest changes.',
          },
          {
            question: 'How can I lower my monthly mortgage payment?',
            answer:
              'Common levers include a larger down payment, a lower interest rate, a longer term, removing PMI, or reducing taxes and insurance where possible. Use related mortgage calculators to compare scenarios.',
          },
        ]
      : spec.category === 'loan'
      ? [
          {
            question: 'What is the difference between interest rate and APR?',
            answer:
              'The interest rate reflects the cost of borrowing the principal. APR typically includes fees and other costs, making it a better number for comparing loan offers.',
          },
          {
            question: 'How do I compare two loans correctly?',
            answer:
              'Compare monthly payment, total interest paid, and total cost. If fees differ, compare APR as well so you are comparing the true cost of borrowing.',
          },
          {
            question: 'Does a longer term always mean a cheaper loan?',
            answer:
              'A longer term usually lowers the monthly payment, but it often increases the total interest paid. Shorter terms cost more per month but can reduce total cost significantly.',
          },
          {
            question: 'Can I save money by making extra payments?',
            answer:
              'Yes. Extra payments reduce principal faster, which reduces future interest. The impact is larger early in the loan when the balance is highest.',
          },
        ]
      : spec.category === 'salary'
      ? [
          {
            question: 'Should I use gross pay or net pay?',
            answer:
              'For wage conversions, use gross pay. For budgeting, net pay (take-home pay) is more useful because it reflects what you actually receive after taxes and deductions.',
          },
          {
            question: 'How many work weeks should I use in a year?',
            answer:
              'Many calculators use 52 weeks, but if you take unpaid time off, you can reduce the number of weeks to better reflect your real working year.',
          },
          {
            question: 'Why does take-home pay differ from gross pay?',
            answer:
              'Taxes, benefits, retirement contributions, and other deductions reduce your gross pay. Take-home pay reflects what is deposited into your bank account.',
          },
          {
            question: 'Do bonuses and overtime change the results?',
            answer:
              'Yes. Adding bonuses and overtime increases gross income and can change tax withholding and effective tax rate. For best estimates, include all recurring compensation.',
          },
        ]
      : spec.category === 'retirement'
      ? [
          {
            question: 'What return rate should I assume?',
            answer:
              'A common long-term planning range is 5%–8% per year depending on your asset mix. Using a conservative rate can help avoid overly optimistic projections.',
          },
          {
            question: 'How does employer match affect retirement savings?',
            answer:
              'Employer match can materially increase contributions without increasing your take-home cost. Over long time horizons, the match can compound into a large portion of your ending balance.',
          },
          {
            question: 'Should I account for inflation in retirement projections?',
            answer:
              'Yes. Inflation reduces buying power over time. You can model real returns by subtracting expected inflation from your expected investment return.',
          },
          {
            question: 'How often should I update my retirement plan?',
            answer:
              'Revisit your plan at least annually or after major life changes. Updating salary, contributions, and return assumptions keeps projections realistic.',
          },
        ]
      : spec.category === 'finance'
      ? [
          {
            question: 'What inputs matter most for long-term projections?',
            answer:
              'Time horizon and contribution rate often matter more than the exact return rate. Small changes to contributions or years invested can significantly change outcomes.',
          },
          {
            question: 'What is the difference between nominal and real results?',
            answer:
              'Nominal results ignore inflation. Real results adjust for inflation to reflect buying power. If inflation is high, real growth can be materially lower than nominal growth.',
          },
          {
            question: 'How often should I recalculate these numbers?',
            answer:
              'Quarterly or annually is usually enough for planning. Recalculate after major changes like a new job, a raise, a large purchase, or a change in debt or savings goals.',
          },
          {
            question: 'Are the results guaranteed?',
            answer:
              'No. These calculators provide estimates based on your assumptions. Real-world outcomes vary with markets, rates, fees, and changes in your income or spending.',
          },
        ]
      : spec.category === 'credit-card'
      ? [
          {
            question: 'Why does credit card interest feel so expensive?',
            answer:
              'Credit cards often have high APRs, and interest accrues on the remaining balance. Paying only the minimum can extend payoff timelines for years and increases total interest substantially.',
          },
          {
            question: 'What happens if my payment is too small?',
            answer:
              'If your payment does not cover the monthly interest, the balance can grow over time. Increasing your payment is the fastest way to reduce interest and payoff time.',
          },
          {
            question: 'Is it better to pay off the highest APR or smallest balance first?',
            answer:
              'Paying the highest APR first typically minimizes total interest. Paying the smallest balance first can create quick wins that help you stay motivated.',
          },
          {
            question: 'Does balance transfer change the payoff timeline?',
            answer:
              'It can. A lower promotional APR reduces interest during the promo period, which can speed up payoff. Be sure to include balance transfer fees and what the APR becomes afterward.',
          },
        ]
      : spec.category === 'tax'
      ? [
          {
            question: 'Why is my effective tax rate lower than my top bracket?',
            answer:
              'In progressive tax systems, different portions of income are taxed at different rates. Your effective rate is your total tax divided by your total income.',
          },
          {
            question: 'How accurate are tax calculator estimates?',
            answer:
              'They are useful for planning, but exact taxes depend on deductions, credits, filing status, and jurisdiction-specific rules. For complex situations, consult a qualified tax professional.',
          },
          {
            question: 'Do pre-tax contributions reduce taxable income?',
            answer:
              'Often, yes. Contributions to traditional retirement plans and certain benefit accounts can reduce taxable income, which can lower your tax bill.',
          },
          {
            question: 'Are these results official tax advice?',
            answer:
              'No. They are educational estimates. Tax outcomes vary by personal circumstances and local rules.',
          },
        ]
      : [
          {
            question: 'What does this calculator do?',
            answer:
              'It provides an estimate based on the inputs you enter and the underlying financial math. Use it to compare scenarios quickly and understand the impact of key variables.',
          },
          {
            question: 'How accurate are the results?',
            answer:
              'The results are as accurate as the inputs and assumptions you provide. Real-world outcomes can differ due to fees, policy rules, rounding, and changing rates.',
          },
          {
            question: 'What inputs matter most?',
            answer:
              'The highest-impact inputs are typically the amount, the rate, and the time horizon. Try changing one input at a time to see how sensitive the result is.',
          },
          {
            question: `Where can I find related tools?`,
            answer:
              `Use the ${hubName} hub and the related calculators section on this page to explore similar tools and compare scenarios.`,
          },
        ];

  for (const item of generic) {
    if (out.length >= 6) break;
    const key = normalizeQuestion(item.question);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }

  while (out.length < 4) {
    out.push({
      question: `How do I use this calculator?`,
      answer:
        'Enter your inputs, review the computed result, and then adjust one input at a time to compare scenarios. This makes it easy to understand which factors drive the outcome.',
    });
  }

  return out.slice(0, 6);
}

export function CalculatorPage(props: CalculatorPageProps) {
  const seoContent = getCalculatorSeoContentForRoute({
    id: props.spec.id,
    route: props.spec.route,
    title: props.spec.title,
    description: props.spec.description,
  });
  const hub = getCalculatorHub(props.spec);
  const category = props.categoryOverride ?? { ...getCategory(props.spec.category), ...hub };
  const relatedCalculators = relatedCalculatorLinksForSpec(props.spec);
  const faq = ensureFaqCount(props.spec, hub.name, props.faq ?? props.spec.faqs);

  let intro: React.ReactNode;
  if (props.intro) {
    intro = props.intro;
  } else if (props.spec.id === 'bill-split') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Split a shared bill evenly in seconds. Enter the bill amount, tip percentage, and number of people to get a clear per-person total.</p>
        <p>This calculator assumes everyone pays an equal share. If one person ordered more, you can still use the tool for a quick baseline and then adjust manually.</p>
        <p>
          For similar budgeting tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          or view the full{' '}
          <Link href="/calculators" className="text-blue-600 hover:underline font-medium">
            calculators directory
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'paycheck') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Estimate what you’ll actually take home from a paycheck after deductions and taxes.</p>
        <p>
          This page helps you understand the typical flow from gross pay to net pay, including pre-tax deductions (like retirement and some benefits), payroll
          taxes, and post-tax deductions.
        </p>
        <p>
          Use it for budgeting, adjusting withholding, or sanity-checking a new pay stub. For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'take-home-pay') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Convert gross pay into take-home pay across different pay frequencies and deductions.</p>
        <p>
          This calculator is useful when comparing job offers or building a budget, because it focuses on the money you actually receive after estimated taxes,
          benefits, and other deductions.
        </p>
        <p>
          For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'after-tax-income') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Estimate how much income you keep after taxes and what that implies for your effective tax rate.</p>
        <p>
          After-tax income is the amount available for spending, saving, and investing. This page helps you connect gross income and tax assumptions to a clearer
          take-home number for planning.
        </p>
        <p>
          For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'refinance') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Compare your current mortgage to a refinance scenario and estimate the break-even point.</p>
        <p>
          This page focuses on the tradeoff between closing costs and monthly savings, plus how term and rate changes affect long-term cost.
        </p>
        <p>
          For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === '401k') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Project your 401(k) balance over time based on contributions, employer match, and return assumptions.</p>
        <p>
          Use it to compare contribution rates and see how match and compounding can change outcomes. Keep in mind real plans have annual contribution limits and
          match rules.
        </p>
        <p>
          For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'retirement-savings') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Estimate how your retirement savings may grow from your current balance and future contributions.</p>
        <p>
          This page helps you test assumptions for return rate, contribution level, and time horizon so you can compare scenarios and set more realistic targets.
        </p>
        <p>
          For related tools, browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>
          .
        </p>
      </div>
    );
  } else if (props.spec.id === 'mortgage-payment') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Estimate your total monthly housing cost with accuracy. This tool calculates your principal and interest payments while factoring in localized costs like property taxes, homeowners insurance, and HOA fees.</p>
        <p>Whether you are a first-time homebuyer or looking to move, use this mortgage calculator to determine how much house fits your monthly budget and how different interest rates impact your long-term cost.</p>
        <p>
          For more home-buying tools, visit our{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          section.
        </p>
      </div>
    );
  } else if (props.spec.id === 'auto-loan') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Plan your next vehicle purchase with confidence. Our auto loan calculator helps you estimate monthly payments by combining the vehicle price, your down payment, trade-in value, and financing terms.</p>
        <p>Use this tool before heading to the dealership to understand your borrowing power and ensure your new car fits comfortably within your monthly financial plan.</p>
        <p>
          Need to compare offers? Check out our{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          hub.
        </p>
      </div>
    );
  } else if (props.spec.id === 'salary-to-hourly') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Ever wondered exactly how much you earn per hour? This calculator translates your annual salary into a clear hourly, daily, and weekly breakdown.</p>
        <p>It's an essential tool for comparing a new job offer to your current role, or for freelancers setting their target rates based on a desired annual income.</p>
        <p>
          Explore more{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          calculators for deeper insights.
        </p>
      </div>
    );
  } else if (props.spec.id === 'retirement') {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>Visualize your future and take control of your retirement planning. This tool projects how your initial savings and consistent monthly contributions will grow over time through compound interest.</p>
        <p>Experiment with different retirement ages and return assumptions to see what it takes to hit your financial goals. The best time to start planning was yesterday; the second best time is today.</p>
        <p>
          Visit our{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          hub for more wealth-building tools.
        </p>
      </div>
    );
  } else if (seoContent) {
    intro = <CalculatorIntro description={props.spec.description} intro={seoContent.intro} hub={hub} related={relatedCalculators} />;
  } else {
    intro = (
      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
        <p>{props.spec.description}</p>
        <p>
          Browse{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          or view the full{' '}
          <Link href="/calculators" className="text-blue-600 hover:underline font-medium">
            calculators directory
          </Link>
          .
        </p>
      </div>
    );
  }

  const schema = [
    softwareApplicationJsonLd({
      name: props.spec.title,
      description: props.spec.description,
      urlPath: props.spec.route,
    }),
    ...(faq.length > 0 ? [faqPageJsonLd(faq)] : []),
    breadcrumbListJsonLd({
      items: [
        { name: 'Home', path: '/' },
        { name: category.name, path: category.href },
        { name: props.spec.title, path: props.spec.route },
      ],
    }),
  ];

  const defaultNextStep = getNextStepForCalculator(props.spec);
  const finalNextStep = props.nextStep ?? defaultNextStep;

  return (
    <CalculatorLayout
      title={props.spec.title}
      category={{ name: category.name, href: category.href }}
      intro={
        <>
          <TrustBadge />
          {intro}
        </>
      }
      faq={faq}
      relatedCalculators={relatedCalculators}
      relatedArticles={props.relatedArticles ?? props.spec.relatedArticles}
      howItWorks={props.howItWorks}
      formula={props.formula ?? (seoContent ? <CalculatorFormula formula={seoContent.formula} /> : <p>This calculator uses standard financial math to estimate the result from your inputs.</p>)}
      example={props.example ?? (seoContent ? <CalculatorExample example={seoContent.example} /> : <p>Enter sample values in the calculator above to see an example result and then adjust inputs to compare scenarios.</p>)}
      guide={props.guide}
      schema={schema}
      nextStep={finalNextStep}
    >
      {props.children}
    </CalculatorLayout>
  );
}
