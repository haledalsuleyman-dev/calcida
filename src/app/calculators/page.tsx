import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getCalculatorSpec, type CalculatorId, CALCULATOR_SPECS } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Financial Calculators Directory | Free Online Finance Tools',
  description: 'The master directory of all free Calcida calculators. Master your money with tools for mortgages, retirement, salary conversion, debt payoff, and daily budgeting.',
  canonicalPath: '/calculators',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  headline: 'All Financial Calculators',
  description: 'Master directory of all financial calculators on Calcida, organized by category.',
  publisher: {
    '@type': 'Organization',
    name: 'Calcida',
    logo: { '@type': 'ImageObject', url: `${getSiteUrl()}/logo.png` },
  },
};

type Group = { title: string; intro: string; hubHref: `/${string}`; preferred: CalculatorId[] };

const groupDefs: Group[] = [
  {
    title: 'Mortgage Calculators',
    intro: 'Estimate payments, explore amortization, and evaluate refinancing options.',
    hubHref: '/mortgage-calculators',
    preferred: ['mortgage-payment', 'mortgage-amortization', 'biweekly-mortgage', 'extra-payment-mortgage', 'mortgage-payoff', 'refinance', 'mortgage-refinance', 'house-affordability'],
  },
  {
    title: 'Loan Calculators',
    intro: 'Compare borrowing options, estimate payments, and understand APR.',
    hubHref: '/loan-calculators',
    preferred: ['auto-loan', 'auto-lease', 'personal-loan', 'student-loan', 'loan-comparison', 'apr'],
  },
  {
    title: 'Salary Calculators',
    intro: 'Convert salary and hourly pay, estimate paycheck, and take-home income.',
    hubHref: '/salary-calculators',
    preferred: ['salary-to-hourly', 'hourly-to-salary', 'overtime', 'paycheck', 'take-home-pay', 'after-tax-income'],
  },
  {
    title: 'Retirement Calculators',
    intro: 'Project retirement savings and plan contributions.',
    hubHref: '/retirement-calculators',
    preferred: ['retirement', '401k'],
  },
  {
    title: 'Investment Calculators',
    intro: 'Model compounding, estimate returns, and account for inflation.',
    hubHref: '/investment-calculators',
    preferred: ['compound-interest', 'investment-return', 'roi', 'inflation'],
  },
  {
    title: 'Budget & Personal Finance Calculators',
    intro: 'Track net worth, plan an emergency fund, and build a debt payoff plan.',
    hubHref: '/budget-calculators',
    preferred: ['net-worth', 'savings', 'budget', 'cost-of-living', 'emergency-fund', 'debt-payoff', 'car-affordability'],
  },
  {
    title: 'Credit Card Calculators',
    intro: 'Pay down balances faster and see your debt-free date.',
    hubHref: '/credit-card-calculators',
    preferred: ['credit-card-payoff', 'credit-card-interest', 'credit-card-minimum-payment', 'balance-transfer', 'credit-utilization'],
  },
  {
    title: 'Tax Calculators',
    intro: 'Estimate taxes, model brackets, and compare after-tax outcomes.',
    hubHref: '/tax-calculators',
    preferred: ['income-tax', 'tax-bracket', 'sales-tax', 'capital-gains-tax', 'effective-tax-rate', 'self-employment-tax'],
  },
];

export default async function CalculatorsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').toLowerCase().trim();

  const groups = groupDefs.map((g) => {
    const idsInHub = CALCULATOR_SPECS
      .map((s) => s.id)
      .filter((id) => getCalculatorHub(getCalculatorSpec(id)).href === g.hubHref)
      .filter((id) => id !== 'mortgage-refinance' && id !== 'house-affordability' && id !== 'loan-interest');
    const inHub = new Set<CalculatorId>(idsInHub);
    const preferred = g.preferred.filter((id) => inHub.has(id));
    const preferredSet = new Set<CalculatorId>(preferred);
    const rest = idsInHub
      .filter((id) => !preferredSet.has(id))
      .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
    const ids = [...preferred, ...rest];
    return { ...g, ids };
  });

  if (query) {
    const allCalcs = CALCULATOR_SPECS
      .filter((s) => s.id !== 'mortgage-refinance' && s.id !== 'house-affordability' && s.id !== 'loan-interest')
      .filter((s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );

    return (
      <>
        <JsonLd data={[jsonLd, breadcrumbListJsonLd({
          items: [
            { name: 'Home', path: '/' },
            { name: 'Calculators', path: '/calculators' },
          ]
        })]} />
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Search Results</h1>
          <form action="/calculators" method="get" className="max-w-xl mb-8">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search calculators (e.g. 401k, mortgage, salary)..."
                className="w-full px-5 py-3 pr-24 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
          {allCalcs.length === 0 ? (
            <p className="text-gray-600 mb-8">
              No calculators found for &ldquo;{q}&rdquo;.{' '}
              <Link href="/calculators" className="text-blue-600 hover:underline">Browse all calculators</Link>.
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {allCalcs.length} calculator{allCalcs.length !== 1 ? 's' : ''} matching &ldquo;{q}&rdquo;.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCalcs.map((spec) => (
                  <Link
                    key={spec.route}
                    href={spec.route}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-gray-900">{spec.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{spec.description}</div>
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className="mt-8">
            <Link href="/calculators" className="text-blue-600 hover:underline text-sm">
              ← Browse all calculators by category
            </Link>
          </div>
        </div>
      </>
    );
  }

  const breadcrumb = breadcrumbListJsonLd({
    items: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
    ],
  });

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumb]} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Master Calculator Directory</h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          Welcome to the absolute central hub for all financial tooling on Calcida. Whether you are closing on a mortgage, negotiating a new salary, or mathematically plotting your exit from the workforce, you will find the exact calculation engine you need below.
        </p>

        <form action="/calculators" method="get" className="mt-6 max-w-xl">
          <div className="relative">
            <input
              type="text"
              name="q"
              placeholder="Search explicitly (e.g. mortgage, self-employment tax, 401k)..."
              className="w-full px-5 py-3 pr-24 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-12 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <section className="mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Popular Execution Engines</h2>
            <p className="text-gray-700 mb-6">
              If you aren't sure where to start your financial modeling, begin with these heavily-trafficked baseline tools:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/mortgage-payment-calculator" className="bg-blue-50 border border-blue-100 p-4 rounded hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-blue-900 mb-1">Mortgage Calculator</h3>
                <p className="text-sm text-blue-800">Identify your true monthly housing payment before underwriting.</p>
              </Link>
              <Link href="/compound-interest-calculator" className="bg-green-50 border border-green-100 p-4 rounded hover:border-green-300 transition-colors">
                <h3 className="font-bold text-green-900 mb-1">Compound Interest</h3>
                <p className="text-sm text-green-800">Map the exponential growth curve of long-term indexing.</p>
              </Link>
              <Link href="/salary-to-hourly-calculator" className="bg-purple-50 border border-purple-100 p-4 rounded hover:border-purple-300 transition-colors">
                <h3 className="font-bold text-purple-900 mb-1">Salary to Hourly</h3>
                <p className="text-sm text-purple-800">Seamlessly fluidize gross compensation packages.</p>
              </Link>
              <Link href="/credit-card-payoff-calculator" className="bg-red-50 border border-red-100 p-4 rounded hover:border-red-300 transition-colors">
                <h3 className="font-bold text-red-900 mb-1">Debt Extinguishment</h3>
                <p className="text-sm text-red-800">Calculate the brutal reality of 25% APR structural revolving traps.</p>
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {groups.map((g) => (
            <Link
              key={g.hubHref}
              href={g.hubHref}
              className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium"
            >
              {g.title}
            </Link>
          ))}
        </div>

        <div className="mt-12 space-y-12">
          {groups.map((group) => (
            <section key={group.title} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{group.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{group.intro}</p>
                </div>
                <Link href={group.hubHref} className="text-sm font-medium text-blue-600 hover:underline">
                  View {group.title} Hub →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.ids.map((id) => {
                  const spec = getCalculatorSpec(id);
                  return (
                    <Link
                       key={spec.route}
                      href={spec.route}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all"
                    >
                      <div className="font-semibold text-gray-900">{spec.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{spec.description}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

        </div>
      </div>
    </>
  );
}
