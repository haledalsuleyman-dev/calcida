import { CalculatorPage } from '@/components/CalculatorPage';
import { GeneratedCalculator } from '@/components/calculators/generated/GeneratedCalculator';
import { getCalculatorHub } from '@/lib/calculatorHubs';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl, calculatorMetadata, pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { salaryData, formatUSDNoCents, formatUSD } from '@/data/salaryYearToHour';
import { hourlyToYearData, formatUSD2 } from '@/data/hourlyToYear';
import { monthlyToHourlyData } from '@/data/monthlyToHourly';
import { biweeklyToHourlyData } from '@/data/biweeklyToHourly';
import { JsonLd } from '@/components/JsonLd';
import { SalaryToHourlyArticle } from '@/components/content/SalaryToHourlyArticle';
import { HourlyToSalaryArticle } from '@/components/content/HourlyToSalaryArticle';
import { MonthlyToHourlyArticle } from '@/components/content/MonthlyToHourlyArticle';
import { BiweeklyToHourlyArticle } from '@/components/content/BiweeklyToHourlyArticle';

export const dynamicParams = false;
export const dynamic = 'force-static';

// Patterns
const SALARY_PATTERN = /^(\d+)-a-year-is-how-much-an-hour$/;
const HOURLY_PATTERN = /^([\d.]+)-an-hour-is-how-much-a-year$/;
const MONTHLY_PATTERN = /^([\d.]+)-a-month-is-how-much-an-hour$/;
const BIWEEKLY_PATTERN = /^([\d.]+)-every-two-weeks-is-how-much-an-hour$/;

const BILL_SPLIT_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'Should I enter subtotal or total from the receipt?',
    answer:
      'Usually, enter the subtotal before tip. If you want each person to cover tax and service fees too, add those amounts into the bill amount you enter.',
  },
  {
    question: 'Do I tip on tax?',
    answer:
      'It depends on preference and local norms. Many people tip on the pre-tax subtotal. If you want to tip on the full total, enter the post-tax amount as the bill.',
  },
  {
    question: 'How do I include service fees or delivery fees?',
    answer:
      'Add any fixed fees into the bill amount before splitting. If a fee is a percentage and you want it included, convert it to a dollar amount and add it in.',
  },
  {
    question: 'How do I split unevenly?',
    answer:
      'This calculator assumes an equal split. For an uneven split, use the per-person result as a baseline, then adjust by adding or subtracting the difference for each person’s items.',
  },
  {
    question: 'How do I handle rounding differences?',
    answer:
      'When splitting a total, rounding can leave a 1–2 cent difference. Decide ahead of time whether one person covers the extra cents or you round one share up and another down.',
  },
  {
    question: 'What if one person ordered more?',
    answer:
      'If the group is not splitting evenly, total the items per person (or estimate) and apply tip proportionally. Alternatively, split shared items evenly and assign personal items directly.',
  },
];

export function generateStaticParams(): { slug: string }[] {
  const specs = CALCULATOR_SPECS.filter((s) => 'generated' in s && s.generated).map((s) => ({ slug: s.route.slice(1) }));
  
  const salaries = salaryData.map(s => ({ slug: `${s}-a-year-is-how-much-an-hour` }));
  const hourlies = hourlyToYearData.map(h => ({ slug: `${h.hourly}-an-hour-is-how-much-a-year` }));
  const monthlies = monthlyToHourlyData.map(m => ({ slug: `${m.monthly}-a-month-is-how-much-an-hour` }));
  const biweeklies = biweeklyToHourlyData.map(b => ({ slug: `${b.biweekly}-every-two-weeks-is-how-much-an-hour` }));

  return [...specs, ...salaries, ...hourlies, ...monthlies, ...biweeklies];
}

function DefaultHowItWorks({ spec }: { spec: CalculatorSpec }) {
  const hub = getCalculatorHub(spec);
  if (spec.id === 'bill-split') {
    return (
      <div className="space-y-4 text-gray-700">
        <p>This bill split calculator estimates how much each person should pay when everyone is splitting the bill evenly.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Bill amount:</span> Enter the amount you want to split. Many people use the subtotal (before tip). If you want to
            include tax or fees, add them into this number.
          </li>
          <li>
            <span className="font-medium">Tip percentage:</span> Tip is calculated as a percentage of the bill amount you entered, then added to get the total.
          </li>
          <li>
            <span className="font-medium">Number of people:</span> The total (bill + tip) is divided evenly by the number of people.
          </li>
          <li>
            <span className="font-medium">Equal split assumption:</span> Everyone pays the same share. For uneven splits, use the result as a baseline and
            adjust manually.
          </li>
        </ul>
        <p>
          For quick comparisons, change one input at a time (tip rate, people count, or bill amount) and review the updated per-person total.
        </p>
      </div>
    );
  }
  const categoryNotes =
    spec.category === 'mortgage'
      ? 'Adjust home price, down payment, and loan term to see how monthly payments and total interest change.'
      : spec.category === 'loan'
        ? 'Change the loan amount, rate, and term to compare monthly payments and total cost.'
        : spec.category === 'salary'
          ? 'Enter your pay inputs and adjust assumptions like hours, weeks, and deductions to compare scenarios.'
          : spec.category === 'retirement'
            ? 'Update contributions, return rate, and years to retirement to see how compounding affects your ending balance.'
            : spec.category === 'credit-card'
              ? 'Enter your balance, APR, and payment amount to estimate payoff time and total interest.'
              : spec.category === 'tax'
                ? 'Enter your taxable amounts and tax rates to estimate totals and compare outcomes.'
                : 'Enter your inputs, review the result, and adjust one assumption at a time to understand the impact.';

  return (
    <div className="space-y-4 text-gray-700">
      <p>
        This calculator estimates results using standard financial math based on the inputs you provide. It is designed for quick comparisons so you can
        understand how key variables affect the outcome.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Enter realistic inputs (amounts, rates, and time periods).</li>
        <li>Review the computed result and any breakdown shown in the tool.</li>
        <li>{categoryNotes}</li>
      </ul>
      <p>
        For related tools and deeper comparisons, browse{' '}
        <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
          {hub.name}
        </Link>
        .
      </p>
    </div>
  );
}

function DefaultGuide({ spec }: { spec: CalculatorSpec }) {
  const hub = getCalculatorHub(spec);
  if (spec.id === 'bill-split') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Practical Bill-Splitting Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Decide what the “bill amount” represents (subtotal only vs subtotal + tax/fees) before you calculate.</li>
          <li>If there’s a service fee, check whether it replaces tip or is added on top.</li>
          <li>For uneven splits, split shared items evenly and assign personal items directly, then apply tip proportionally.</li>
          <li>Expect small rounding differences; agree on a simple rounding rule so the final total matches the receipt.</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900">Explore Related Tools</h2>
        <p className="text-gray-700">
          Continue with{' '}
          <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
            {hub.name}
          </Link>{' '}
          to find budgeting calculators for planning and shared expenses. For a broader view, try the{' '}
          <Link href="/budget-calculator" className="text-blue-600 hover:underline font-medium">
            Budget Calculator
          </Link>{' '}
          or estimate take-home money for shared bills with the{' '}
          <Link href="/net-income-calculator" className="text-blue-600 hover:underline font-medium">
            Net Income Calculator
          </Link>
          .
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Tips for Better Estimates</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Use the best available rate (quote, current APR, or a conservative assumption).</li>
        <li>Model multiple scenarios by changing one input at a time.</li>
        <li>Include fees, taxes, and deductions when they materially affect the total.</li>
        <li>
          Compare alternatives using the{' '}
          <Link href="/calculators" className="text-blue-600 hover:underline font-medium">
            calculators directory
          </Link>{' '}
          or the related calculators section.
        </li>
      </ul>
      <h2 className="text-2xl font-bold text-gray-900">Explore Related Tools</h2>
      <p className="text-gray-700">
        Continue with{' '}
        <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
          {hub.name}
        </Link>{' '}
        to compare similar calculators and validate your assumptions across different scenarios.
      </p>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug;
  if (typeof slug !== 'string') return {};

  // Salary Patterns
  const salaryMatch = slug.match(SALARY_PATTERN);
  if (salaryMatch) {
    const salary = parseInt(salaryMatch[1]);
    const salaryStr = formatUSDNoCents(salary);
    return pageMetadata({
      title: `${salaryStr} a Year Is How Much an Hour?`,
      description: `Convert ${salaryStr} salary to an hourly wage and review daily, weekly, biweekly, and monthly pay estimates for your schedule.`,
      canonicalPath: `/${slug}`,
    });
  }

  const hourlyMatch = slug.match(HOURLY_PATTERN);
  if (hourlyMatch) {
    const hourly = parseFloat(hourlyMatch[1]);
    const hourlyStr = formatUSD2(hourly);
    return pageMetadata({
      title: `${hourlyStr} an Hour Is How Much a Year?`,
      description: `Convert ${hourlyStr} per hour into yearly, monthly, biweekly, and weekly pay so you can compare jobs and income scenarios quickly.`,
      canonicalPath: `/${slug}`,
    });
  }

  const monthlyMatch = slug.match(MONTHLY_PATTERN);
  if (monthlyMatch) {
    const monthly = parseFloat(monthlyMatch[1]);
    const monthlyStr = formatUSD(monthly);
    return pageMetadata({
      title: `${monthlyStr} a Month Is How Much an Hour?`,
      description: `Convert ${monthlyStr} per month into an hourly wage, then compare weekly, biweekly, and annual income estimates in one place.`,
      canonicalPath: `/${slug}`,
    });
  }

  const biweeklyMatch = slug.match(BIWEEKLY_PATTERN);
  if (biweeklyMatch) {
    const biweekly = parseFloat(biweeklyMatch[1]);
    const biweeklyStr = formatUSD(biweekly);
    return pageMetadata({
      title: `${biweeklyStr} Every Two Weeks Is How Much an Hour?`,
      description: `Convert a ${biweeklyStr} biweekly paycheck into an hourly rate and review the matching monthly and yearly pay breakdown.`,
      canonicalPath: `/${slug}`,
    });
  }

  // Standard Calculators
  if (!slug.endsWith('-calculator')) return {};
  const route = `/${slug}` as `/${string}`;
  const specLite = CALCULATOR_SPECS.find((s) => s.route === route);
  if (!specLite) return {};
  const spec = getCalculatorSpec(specLite.id);
  
  if (spec.id === 'bill-split') {
    const seoTitle = 'Bill Split Calculator: Tip & Per-Person Total';
    const seoDescription =
      'Split a bill evenly and calculate tip and per-person totals. Quick bill split calculator for friends, roommates, and group meals—free.';
    return {
      title: seoTitle,
      description: seoDescription,
      alternates: { canonical: absoluteUrl(spec.route) },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: absoluteUrl(spec.route),
        type: 'website',
      },
    };
  }
  return calculatorMetadata({ title: spec.title, description: spec.description, canonicalPath: spec.route });
}

export default async function GeneratedCalculatorRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const slug = resolved?.slug;
  if (typeof slug !== 'string') notFound();

  // Handle Salary/Hourly Patterns
  const salaryMatch = slug.match(SALARY_PATTERN);
  if (salaryMatch) {
    const salary = parseInt(salaryMatch[1]);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${formatUSDNoCents(salary)} a Year is How Much an Hour?`,
      "author": { "@type": "Organization", "name": "Calcida" },
      "publisher": { "@type": "Organization", "name": "Calcida" }
    };
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <JsonLd data={[jsonLd]} />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{formatUSDNoCents(salary)} a Year is How Much an Hour?</h1>
        <SalaryToHourlyArticle salaryNum={salary} />
      </div>
    );
  }

  const hourlyMatch = slug.match(HOURLY_PATTERN);
  if (hourlyMatch) {
    const hourly = parseFloat(hourlyMatch[1]);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${formatUSD2(hourly)} an Hour Is How Much a Year?`,
      "author": { "@type": "Organization", "name": "Calcida" },
      "publisher": { "@type": "Organization", "name": "Calcida" }
    };
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <JsonLd data={[jsonLd]} />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{formatUSD2(hourly)} an Hour Is How Much a Year?</h1>
        <HourlyToSalaryArticle hourlyNum={hourly} />
      </div>
    );
  }

  const monthlyMatch = slug.match(MONTHLY_PATTERN);
  if (monthlyMatch) {
    const monthly = parseFloat(monthlyMatch[1]);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${formatUSD(monthly)} a Month Is How Much an Hour?`,
      "author": { "@type": "Organization", "name": "Calcida" },
      "publisher": { "@type": "Organization", "name": "Calcida" }
    };
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <JsonLd data={[jsonLd]} />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{formatUSD(monthly)} a Month Is How Much an Hour?</h1>
        <MonthlyToHourlyArticle monthlyNum={monthly} />
      </div>
    );
  }

  const biweeklyMatch = slug.match(BIWEEKLY_PATTERN);
  if (biweeklyMatch) {
    const biweekly = parseFloat(biweeklyMatch[1]);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${formatUSD(biweekly)} Every Two Weeks Is How Much an Hour?`,
      "author": { "@type": "Organization", "name": "Calcida" },
      "publisher": { "@type": "Organization", "name": "Calcida" }
    };
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <JsonLd data={[jsonLd]} />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{formatUSD(biweekly)} Every Two Weeks Is How Much an Hour?</h1>
        <BiweeklyToHourlyArticle biweeklyNum={biweekly} />
      </div>
    );
  }

  // Handle Standard Calculators
  if (!slug.endsWith('-calculator')) notFound();
  const route = `/${slug}` as `/${string}`;
  const specLite = CALCULATOR_SPECS.find((s) => s.route === route);
  if (!specLite) notFound();
  const spec = getCalculatorSpec(specLite.id);

  return (
    <CalculatorPage
      spec={spec}
      howItWorks={<DefaultHowItWorks spec={spec} />}
      guide={<DefaultGuide spec={spec} />}
      faq={spec.id === 'bill-split' ? BILL_SPLIT_FAQ : undefined}
    >
      <GeneratedCalculator id={spec.id} />
    </CalculatorPage>
  );
}
