export type CategoryKey =
  | 'mortgage'
  | 'loan'
  | 'salary'
  | 'retirement'
  | 'credit-card'
  | 'tax'
  | 'finance';

export interface CategoryConfig {
  key: CategoryKey;
  name: string;
  href: string;
}

export const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  mortgage: { key: 'mortgage', name: 'Mortgage Calculators', href: '/mortgage' },
  loan: { key: 'loan', name: 'Loan Calculators', href: '/loan' },
  salary: { key: 'salary', name: 'Salary Calculators', href: '/salary' },
  retirement: { key: 'retirement', name: 'Retirement Calculators', href: '/retirement' },
  'credit-card': { key: 'credit-card', name: 'Credit Card Calculators', href: '/credit-card-calculators' },
  tax: { key: 'tax', name: 'Tax Calculators', href: '/tax-calculators' },
  finance: { key: 'finance', name: 'Finance Calculators', href: '/finance-calculators' },
};

export function getCategory(key: CategoryKey): CategoryConfig {
  return CATEGORIES[key];
}

