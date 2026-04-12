import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Calculator, DollarSign, Home, Briefcase, TrendingUp, CreditCard } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Financial Calculators for Mortgages, Loans & Paychecks',
  description: 'Use free financial calculators for mortgage payments, loans, salary conversions, taxes, retirement planning, and other everyday money decisions.',
  canonicalPath: '/',
});

const popularCalculators = [
  {
    name: "Mortgage Payment",
    description: "Estimate monthly payments with taxes & insurance.",
    href: "/mortgage-payment-calculator",
    icon: Home
  },
  {
    name: "Auto Loan",
    description: "Calculate car payments and total interest.",
    href: "/auto-loan-calculator",
    icon: Calculator
  },
  {
    name: "Salary to Hourly",
    description: "Convert your annual salary to an hourly wage.",
    href: "/salary-to-hourly-calculator",
    icon: DollarSign
  },
  {
    name: "Net Worth",
    description: "Calculate your total assets minus liabilities.",
    href: "/net-worth-calculator",
    icon: TrendingUp
  },
  {
    name: "Debt Payoff",
    description: "Compare payoff strategies and save on interest.",
    href: "/debt-payoff-calculator",
    icon: CreditCard
  },
  {
    name: "401k Growth",
    description: "Project your retirement savings over time.",
    href: "/401k-calculator",
    icon: TrendingUp
  },
  {
    name: "Credit Card Payoff",
    description: "See how long to pay off your balance.",
    href: "/credit-card-payoff-calculator",
    icon: CreditCard
  },
  {
    name: "Paycheck Calculator",
    description: "Calculate your take-home pay after taxes.",
    href: "/paycheck-calculator",
    icon: Briefcase
  }
];

const categories = [
  { name: "Mortgage", href: "/mortgage", icon: Home },
  { name: "Loans", href: "/loan", icon: Calculator },
  { name: "Salary", href: "/salary", icon: DollarSign },
  { name: "Retirement", href: "/retirement", icon: TrendingUp },
  { name: "Credit Cards", href: "/credit-card", icon: CreditCard },
  { name: "Taxes", href: "/tax", icon: Briefcase },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Financial Calculators Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Make smarter financial decisions with our fast, free, and accurate calculators for mortgages, loans, salary, and more.
          </p>
          
          <div className="max-w-md mx-auto relative">
             {/* Search placeholder */}
            <input 
                type="text" 
                placeholder="Search calculators (e.g. mortgage, auto loan)..." 
                className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link href="/calculators">
              <Button size="lg">Browse All Calculators</Button>
            </Link>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <Link href="/mortgage-calculators" className="hover:text-blue-600 hover:underline">Mortgage</Link>
              <Link href="/loan-calculators" className="hover:text-blue-600 hover:underline">Loans</Link>
              <Link href="/salary-calculators" className="hover:text-blue-600 hover:underline">Salary</Link>
              <Link href="/retirement-calculators" className="hover:text-blue-600 hover:underline">Retirement</Link>
              <Link href="/investment-calculators" className="hover:text-blue-600 hover:underline">Investing</Link>
              <Link href="/budget-calculators" className="hover:text-blue-600 hover:underline">Budgeting</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Popular Calculators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-gray-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <calc.icon size={24} />
                    </div>
                    <CardTitle className="text-xl mb-2">{calc.name}</CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Calculators */}
      <section className="py-16 bg-blue-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">New & High Demand</h2>
            <Link href="/calculators" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              View All <Calculator size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "ROI Calculator", href: "/roi-calculator", desc: "Calculate investment efficiency" },
              { name: "Inflation Calculator", href: "/inflation-calculator", desc: "Buying power over time" },
              { name: "Emergency Fund", href: "/emergency-fund-calculator", desc: "Plan your safety net" },
              { name: "Loan Comparison", href: "/loan-comparison-calculator", desc: "Compare two loans side-by-side" },
            ].map((calc) => (
              <Link 
                key={calc.href} 
                href={calc.href}
                className="bg-white p-5 rounded-xl border border-blue-100 hover:border-blue-400 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-blue-900 mb-1">{calc.name}</h3>
                <p className="text-xs text-gray-500">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="block group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center gap-3">
                  <cat.icon className="text-gray-500 group-hover:text-blue-600 transition-colors" size={32} />
                  <span className="font-semibold text-gray-900">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Features */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Fast</div>
                   <p className="text-gray-600">Instant results without page reloads.</p>
               </div>
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Accurate</div>
                   <p className="text-gray-600">Updated with 2024 tax brackets and rates.</p>
               </div>
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
                   <p className="text-gray-600">No sign-up required. Always free to use.</p>
               </div>
           </div>
        </div>
      </section>
    </div>
  );
}
