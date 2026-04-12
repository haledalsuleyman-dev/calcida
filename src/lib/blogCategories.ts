export type BlogCategorySlug = 'mortgage' | 'investing' | 'retirement' | 'salary' | 'personal-finance' | 'taxes';

export const BLOG_CATEGORIES: Array<{ slug: BlogCategorySlug; name: string; description: string }> = [
  {
    slug: 'mortgage',
    name: 'Mortgage',
    description: 'Home buying, mortgage payments, PMI, affordability, refinancing, and closing costs.',
  },
  {
    slug: 'investing',
    name: 'Investing',
    description: 'Compounding, future value, present value, dividends, and long-term investing concepts.',
  },
  {
    slug: 'retirement',
    name: 'Retirement',
    description: 'FIRE planning, IRAs, Social Security, and retirement savings strategies.',
  },
  {
    slug: 'salary',
    name: 'Salary',
    description: 'Paychecks, overtime, bonuses, conversions, and take-home pay.',
  },
  {
    slug: 'personal-finance',
    name: 'Personal Finance',
    description: 'Budgeting, emergency funds, debt payoff, and everyday money decisions.',
  },
  {
    slug: 'taxes',
    name: 'Taxes',
    description: 'Tax brackets, effective tax rate, payroll taxes, and capital gains.',
  },
];

export function normalizeBlogCategory(input: string | undefined | null): BlogCategorySlug | null {
  if (!input) return null;
  const normalized = input
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const allowed = new Set<string>(BLOG_CATEGORIES.map((c) => c.slug));
  if (allowed.has(normalized)) return normalized as BlogCategorySlug;

  if (normalized === 'personal' || normalized === 'finance' || normalized === 'personal-finance-tips') return 'personal-finance';
  if (normalized === 'tax' || normalized === 'taxes-and') return 'taxes';
  if (normalized === 'invest' || normalized === 'investments') return 'investing';
  return null;
}

