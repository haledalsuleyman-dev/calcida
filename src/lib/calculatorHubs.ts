import type { CalculatorSpec } from '@/lib/calculatorSpecs';
import { getCategory } from '@/lib/categories';

export interface CalculatorHub {
  name: string;
  href: `/${string}`;
}

export function getCalculatorHub(spec: CalculatorSpec): CalculatorHub {
  if (spec.category === 'mortgage') return { name: 'Mortgage Calculators', href: '/mortgage-calculators' };
  if (spec.category === 'loan') return { name: 'Loan Calculators', href: '/loan-calculators' };
  if (spec.category === 'salary') return { name: 'Salary Calculators', href: '/salary-calculators' };
  if (spec.category === 'retirement') return { name: 'Retirement Calculators', href: '/retirement-calculators' };
  if (spec.category === 'credit-card') return { name: 'Credit Card Calculators', href: '/credit-card-calculators' };
  if (spec.category === 'tax') return { name: 'Tax Calculators', href: '/tax-calculators' };
  if (spec.category === 'finance') {
    const route = spec.route.toLowerCase();
    const investmentSignals = [
      'investment',
      'compound',
      'roi',
      'cagr',
      'future-value',
      'present-value',
      'dividend',
      'inflation',
      'return',
      'rule-of-72',
      'yield',
      'annuity',
      'payback',
      'stock',
      'fees',
      'expense-ratio',
      'cd-calculator',
      'bond-yield',
      'crypto',
    ];
    const budgetSignals = [
      'net-worth',
      'net-income',
      'budget',
      'emergency',
      'debt',
      'affordability',
      'savings',
      'savings-goal',
      'sinking-fund',
      'savings-rate',
      'bill-split',
      'payoff',
    ];
    if (investmentSignals.some((s) => route.includes(s))) return { name: 'Investment Calculators', href: '/investment-calculators' };
    if (budgetSignals.some((s) => route.includes(s))) return { name: 'Budget Calculators', href: '/budget-calculators' };
  }

  const category = getCategory(spec.category);
  return { name: category.name, href: category.href as `/${string}` };
}

