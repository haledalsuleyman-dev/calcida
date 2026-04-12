import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retirement Calculators | 401k & Savings',
  description: 'Plan your retirement with our 401k and savings growth calculators.',
};

const calculators = [
  {
    name: "Retirement Calculator",
    description: "Estimate how much you need to save to reach your retirement goals.",
    href: "/retirement-calculator"
  },
  {
    name: "401k Calculator",
    description: "Project your retirement savings with employer matching and compound interest.",
    href: "/401k-calculator"
  },
  {
    name: "Savings Calculator",
    description: "Calculate how your savings can grow over time with monthly deposits and interest.",
    href: "/savings-calculator"
  }
];

export default function RetirementCategoryPage() {
  return (
    <CategoryPage
      title="Retirement Calculators"
      description="Start planning for a secure future today."
      calculators={calculators}
    >
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          Browse the complete <Link href="/retirement-calculators" className="text-blue-700 hover:underline font-medium">Retirement Calculators</Link> hub or explore the full <Link href="/calculators" className="text-blue-700 hover:underline font-medium">Calculators</Link> index.
        </p>
      </div>
    </CategoryPage>
  );
}
