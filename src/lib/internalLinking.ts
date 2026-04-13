import type { CalculatorId, CalculatorSpec } from '@/lib/calculatorSpecs';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';

export interface NextStepSuggestion {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryActions: { label: string; href: string }[];
}

export interface CrossCategoryLink {
  title: string;
  description: string;
  links: { label: string; href: string }[];
}

export const NEXT_STEP_SUGGESTIONS: Partial<Record<CalculatorId, NextStepSuggestion>> = {
  'mortgage-payment': {
    title: 'Ready to compare mortgage options?',
    description: 'See how different rates or terms affect your payment.',
    primaryAction: { label: 'Compare Rates', href: '/mortgage-rate-comparison-calculator' },
    secondaryActions: [
      { label: 'Amortization Schedule', href: '/mortgage-amortization-calculator' },
      { label: 'Refinance Analysis', href: '/refinance-calculator' },
    ],
  },
  'mortgage-amortization': {
    title: 'Want to pay off your mortgage faster?',
    description: 'See how extra payments can shorten your loan and save interest.',
    primaryAction: { label: 'Extra Payments', href: '/extra-payment-mortgage-calculator' },
    secondaryActions: [
      { label: 'Biweekly Payments', href: '/biweekly-mortgage-calculator' },
      { label: 'Payoff Analysis', href: '/mortgage-payoff-calculator' },
    ],
  },
  'biweekly-mortgage': {
    title: 'Compare biweekly vs extra payments',
    description: 'Understand which strategy saves you the most.',
    primaryAction: { label: 'Extra Payment Calc', href: '/extra-payment-mortgage-calculator' },
    secondaryActions: [
      { label: 'Amortization', href: '/mortgage-amortization-calculator' },
      { label: 'Refinance Check', href: '/refinance-calculator' },
    ],
  },
  'refinance': {
    title: 'Is refinancing worth the closing costs?',
    description: 'Calculate your break-even point and total savings.',
    primaryAction: { label: 'Closing Costs', href: '/closing-costs-calculator' },
    secondaryActions: [
      { label: 'APR Compare', href: '/apr-calculator' },
      { label: 'Rate Comparison', href: '/mortgage-rate-comparison-calculator' },
    ],
  },
  'salary-to-hourly': {
    title: 'Know your hourly rate? Now check your paycheck.',
    description: 'Estimate your take-home pay after taxes and deductions.',
    primaryAction: { label: 'Paycheck Calculator', href: '/paycheck-calculator' },
    secondaryActions: [
      { label: 'After-Tax Income', href: '/after-tax-income-calculator' },
      { label: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
    ],
  },
  'hourly-to-salary': {
    title: 'Compare your salary to market rates',
    description: 'See how your hourly wage translates to annual income.',
    primaryAction: { label: 'Salary to Hourly', href: '/salary-to-hourly-calculator' },
    secondaryActions: [
      { label: 'Take-Home Pay', href: '/take-home-pay-calculator' },
      { label: 'Overtime Calc', href: '/overtime-calculator' },
    ],
  },
  'paycheck': {
    title: 'Build a budget with your take-home pay',
    description: 'Use the 50/30/20 rule to plan your spending.',
    primaryAction: { label: 'Budget Calculator', href: '/budget-calculator' },
    secondaryActions: [
      { label: 'Emergency Fund', href: '/emergency-fund-calculator' },
      { label: 'Savings Goal', href: '/savings-goal-calculator' },
    ],
  },
  'take-home-pay': {
    title: 'Plan your budget with your net income',
    description: 'Allocate your take-home pay efficiently.',
    primaryAction: { label: 'Budget Calculator', href: '/budget-calculator' },
    secondaryActions: [
      { label: 'Emergency Fund', href: '/emergency-fund-calculator' },
      { label: 'Net Worth', href: '/net-worth-calculator' },
    ],
  },
  'after-tax-income': {
    title: 'Understand your tax bracket',
    description: 'See how much of your income goes to taxes.',
    primaryAction: { label: 'Tax Bracket Calc', href: '/tax-bracket-calculator' },
    secondaryActions: [
      { label: 'Effective Tax Rate', href: '/effective-tax-rate-calculator' },
      { label: 'Paycheck Calc', href: '/paycheck-calculator' },
    ],
  },
  '401k': {
    title: 'Maximize your retirement savings',
    description: 'See how employer match and contributions grow over time.',
    primaryAction: { label: '401k Growth', href: '/401k-growth-calculator' },
    secondaryActions: [
      { label: 'Retirement Calc', href: '/retirement-calculator' },
      { label: 'Compound Interest', href: '/compound-interest-calculator' },
    ],
  },
  'retirement': {
    title: 'Plan your retirement income',
    description: 'Estimate how much you need to save for a comfortable retirement.',
    primaryAction: { label: '401k Calculator', href: '/401k-calculator' },
    secondaryActions: [
      { label: 'Retirement Savings', href: '/retirement-savings-calculator' },
      { label: 'FIRE Calculator', href: '/fire-calculator' },
    ],
  },
  'compound-interest': {
    title: 'See your investment growth potential',
    description: 'Model how compound interest builds wealth over decades.',
    primaryAction: { label: 'Investment Return', href: '/investment-return-calculator' },
    secondaryActions: [
      { label: 'ROI Calculator', href: '/roi-calculator' },
      { label: 'Future Value', href: '/future-value-calculator' },
    ],
  },
  'investment-return': {
    title: 'Plan for retirement with your returns',
    description: 'Connect your investment gains to retirement planning.',
    primaryAction: { label: 'Retirement Calc', href: '/retirement-calculator' },
    secondaryActions: [
      { label: 'Compound Interest', href: '/compound-interest-calculator' },
      { label: 'Rule of 72', href: '/rule-of-72-calculator' },
    ],
  },
  'auto-loan': {
    title: 'Can you afford this car?',
    description: 'Check if the payment fits your budget.',
    primaryAction: { label: 'Car Affordability', href: '/car-affordability-calculator' },
    secondaryActions: [
      { label: 'Compare Loans', href: '/loan-comparison-calculator' },
      { label: 'APR Calc', href: '/apr-calculator' },
    ],
  },
  'personal-loan': {
    title: 'Compare your loan options',
    description: 'See how different rates and terms affect your payment.',
    primaryAction: { label: 'Loan Comparison', href: '/loan-comparison-calculator' },
    secondaryActions: [
      { label: 'APR Calc', href: '/apr-calculator' },
      { label: 'Debt Payoff', href: '/debt-payoff-calculator' },
    ],
  },
  'debt-payoff': {
    title: 'Build a debt-free plan',
    description: 'Compare snowball vs avalanche strategies.',
    primaryAction: { label: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
    secondaryActions: [
      { label: 'Budget Calc', href: '/budget-calculator' },
      { label: 'Emergency Fund', href: '/emergency-fund-calculator' },
    ],
  },
  'budget': {
    title: 'Set up your financial safety net',
    description: 'Build an emergency fund and track your net worth.',
    primaryAction: { label: 'Emergency Fund', href: '/emergency-fund-calculator' },
    secondaryActions: [
      { label: 'Net Worth', href: '/net-worth-calculator' },
      { label: 'Savings Goal', href: '/savings-goal-calculator' },
    ],
  },
  'net-worth': {
    title: 'Track your financial progress',
    description: 'Monitor your assets, liabilities, and overall wealth.',
    primaryAction: { label: 'Budget Calc', href: '/budget-calculator' },
    secondaryActions: [
      { label: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { label: 'Retirement Calc', href: '/retirement-calculator' },
    ],
  },
  'credit-card-payoff': {
    title: 'Eliminate credit card debt',
    description: 'See how soon you can be debt-free.',
    primaryAction: { label: 'Debt Payoff', href: '/debt-payoff-calculator' },
    secondaryActions: [
      { label: 'Budget Calc', href: '/budget-calculator' },
      { label: 'Balance Transfer', href: '/balance-transfer-calculator' },
    ],
  },
  'savings': {
    title: 'Grow your savings efficiently',
    description: 'See how compound interest accelerates your goals.',
    primaryAction: { label: 'Compound Interest', href: '/compound-interest-calculator' },
    secondaryActions: [
      { label: 'Emergency Fund', href: '/emergency-fund-calculator' },
      { label: 'Savings Goal', href: '/savings-goal-calculator' },
    ],
  },
  'emergency-fund': {
    title: 'Build your financial foundation',
    description: 'Once you have an emergency fund, start investing.',
    primaryAction: { label: 'Savings Calc', href: '/savings-calculator' },
    secondaryActions: [
      { label: 'Budget Calc', href: '/budget-calculator' },
      { label: 'Net Worth', href: '/net-worth-calculator' },
    ],
  },
};

export const CROSS_CATEGORY_SUGGESTIONS: Record<string, CrossCategoryLink> = {
  mortgage: {
    title: 'Related Financial Tools',
    description: 'After calculating your mortgage, explore these related tools:',
    links: [
      { label: 'Budget Calculator', href: '/budget-calculator' },
      { label: 'Debt-to-Income Ratio', href: '/debt-to-income-calculator' },
      { label: 'Net Worth Tracker', href: '/net-worth-calculator' },
    ],
  },
  loan: {
    title: 'Related Financial Tools',
    description: 'Manage your loans with these additional calculators:',
    links: [
      { label: 'Debt Payoff Planner', href: '/debt-payoff-calculator' },
      { label: 'Budget Calculator', href: '/budget-calculator' },
      { label: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
    ],
  },
  salary: {
    title: 'Related Financial Tools',
    description: 'Make the most of your income with these tools:',
    links: [
      { label: 'Budget Calculator', href: '/budget-calculator' },
      { label: '401k Calculator', href: '/401k-calculator' },
      { label: 'Tax Calculator', href: '/tax-bracket-calculator' },
    ],
  },
  retirement: {
    title: 'Related Financial Tools',
    description: 'Plan your financial future with these tools:',
    links: [
      { label: 'Investment Return', href: '/investment-return-calculator' },
      { label: 'Net Worth Tracker', href: '/net-worth-calculator' },
      { label: 'Compound Interest', href: '/compound-interest-calculator' },
    ],
  },
  finance: {
    title: 'Related Financial Tools',
    description: 'Explore more tools for your financial journey:',
    links: [
      { label: 'Salary Calculators', href: '/salary-calculators' },
      { label: 'Retirement Planning', href: '/retirement-calculators' },
      { label: 'Tax Calculators', href: '/tax-calculators' },
    ],
  },
};

export function getNextStepForCalculator(spec: CalculatorSpec): NextStepSuggestion | undefined {
  if (NEXT_STEP_SUGGESTIONS[spec.id]) {
    return NEXT_STEP_SUGGESTIONS[spec.id];
  }
  const hub = getCalculatorHub(spec);
  const crossCategory = CROSS_CATEGORY_SUGGESTIONS[spec.category];
  if (crossCategory) {
    return {
      title: 'What should you do next?',
      description: crossCategory.description,
      primaryAction: crossCategory.links[0],
      secondaryActions: crossCategory.links.slice(1, 3),
    };
  }
  return undefined;
}

export function getContextualCrossLinks(spec: CalculatorSpec): { label: string; href: string }[] {
  const hub = getCalculatorHub(spec);
  const crossLinks: { label: string; href: string }[] = [];
  
  const categoryCrossLinkMap: Record<string, { label: string; href: string }[]> = {
    'mortgage': [
      { label: 'Salary Calculators', href: '/salary-calculators' },
      { label: 'Budget Tools', href: '/budget-calculators' },
    ],
    'loan': [
      { label: 'Budget Tools', href: '/budget-calculators' },
      { label: 'Credit Card Tools', href: '/credit-card-calculators' },
    ],
    'salary': [
      { label: 'Budget Tools', href: '/budget-calculators' },
      { label: 'Tax Calculators', href: '/tax-calculators' },
    ],
    'retirement': [
      { label: 'Investment Tools', href: '/investment-calculators' },
      { label: 'Salary Tools', href: '/salary-calculators' },
    ],
    'finance': [
      { label: 'Retirement Tools', href: '/retirement-calculators' },
      { label: 'Salary Tools', href: '/salary-calculators' },
    ],
    'credit-card': [
      { label: 'Loan Tools', href: '/loan-calculators' },
      { label: 'Budget Tools', href: '/budget-calculators' },
    ],
    'tax': [
      { label: 'Salary Tools', href: '/salary-calculators' },
      { label: 'Budget Tools', href: '/budget-calculators' },
    ],
  };
  
  return categoryCrossLinkMap[spec.category] || [];
}

export function getCalculatorSuggestionsForBlog(blogCategory: string, keywords: string[]): { name: string; href: string; reason: string }[] {
  const categoryKeywords: Record<string, CalculatorId[]> = {
    'mortgage': ['mortgage-payment', 'mortgage-amortization', 'refinance', 'mortgage-affordability', 'pmi', 'down-payment'],
    'loan': ['auto-loan', 'personal-loan', 'student-loan', 'apr', 'loan-comparison', 'consolidation-loan'],
    'salary': ['salary-to-hourly', 'hourly-to-salary', 'paycheck', 'take-home-pay', 'after-tax-income', 'overtime'],
    'retirement': ['retirement', '401k', 'retirement-savings', 'roth-ira', 'fire'],
    'investing': ['compound-interest', 'investment-return', 'roi', 'inflation', 'future-value', 'rule-of-72'],
    'personal-finance': ['budget', 'net-worth', 'emergency-fund', 'savings', 'debt-payoff'],
    'taxes': ['tax-bracket', 'income-tax', 'effective-tax-rate', 'capital-gains-tax', 'self-employment-tax'],
    'credit-cards': ['credit-card-payoff', 'credit-card-interest', 'balance-transfer', 'credit-utilization'],
  };
  
  const calculatorIds = categoryKeywords[blogCategory?.toLowerCase()] || [];
  const keywordLower = keywords.map(k => k.toLowerCase());
  
  const suggestions = calculatorIds.map(id => {
    const spec = getCalculatorSpec(id);
    if (!spec) return null;
    
    const specKeywords = [
      spec.title.toLowerCase(),
      spec.description.toLowerCase(),
      ...spec.faqs.map(f => f.question.toLowerCase() + ' ' + f.answer.toLowerCase()),
    ].join(' ');
    
    const matchScore = keywordLower.reduce((score, kw) => {
      return specKeywords.includes(kw) ? score + 1 : score;
    }, 0);
    
    return {
      name: spec.title,
      href: spec.route,
      reason: matchScore > 0 ? 'Topically relevant' : 'Same category',
      score: matchScore,
    };
  }).filter((s): s is NonNullable<typeof s> => s !== null);
  
  suggestions.sort((a, b) => b.score - a.score);
  
  return suggestions.slice(0, 4);
}

export const CATEGORY_HUB_LINKS: Record<string, { name: string; href: string; description: string }[]> = {
  '/mortgage-calculators': [
    { name: 'Budget Calculators', href: '/budget-calculators', description: 'Plan your monthly budget' },
    { name: 'Salary Calculators', href: '/salary-calculators', description: 'Understand your income' },
    { name: 'Loan Calculators', href: '/loan-calculators', description: 'Compare loan options' },
  ],
  '/loan-calculators': [
    { name: 'Budget Calculators', href: '/budget-calculators', description: 'Manage monthly payments' },
    { name: 'Credit Card Tools', href: '/credit-card-calculators', description: 'Pay off debt faster' },
    { name: 'Mortgage Tools', href: '/mortgage-calculators', description: 'Home loan options' },
  ],
  '/salary-calculators': [
    { name: 'Budget Calculators', href: '/budget-calculators', description: 'Plan with take-home pay' },
    { name: 'Tax Calculators', href: '/tax-calculators', description: 'Understand your taxes' },
    { name: 'Retirement Tools', href: '/retirement-calculators', description: 'Plan for the future' },
  ],
  '/retirement-calculators': [
    { name: 'Investment Tools', href: '/investment-calculators', description: 'Grow your wealth' },
    { name: 'Salary Tools', href: '/salary-calculators', description: 'Maximize contributions' },
    { name: 'Budget Tools', href: '/budget-calculators', description: 'Save for retirement' },
  ],
  '/investment-calculators': [
    { name: 'Retirement Tools', href: '/retirement-calculators', description: 'Plan your future' },
    { name: 'Salary Tools', href: '/salary-calculators', description: 'Invest your income' },
    { name: 'Tax Tools', href: '/tax-calculators', description: 'Tax-advantaged accounts' },
  ],
  '/budget-calculators': [
    { name: 'Salary Tools', href: '/salary-calculators', description: 'Know your income' },
    { name: 'Debt Tools', href: '/loan-calculators', description: 'Manage debt payments' },
    { name: 'Retirement Tools', href: '/retirement-calculators', description: 'Save for the future' },
  ],
  '/tax-calculators': [
    { name: 'Salary Tools', href: '/salary-calculators', description: 'Calculate take-home pay' },
    { name: 'Retirement Tools', href: '/retirement-calculators', description: 'Tax-advantaged savings' },
    { name: 'Investment Tools', href: '/investment-calculators', description: 'Capital gains taxes' },
  ],
  '/credit-card-calculators': [
    { name: 'Loan Tools', href: '/loan-calculators', description: 'Consolidate debt' },
    { name: 'Budget Tools', href: '/budget-calculators', description: 'Manage spending' },
    { name: 'Salary Tools', href: '/salary-calculators', description: 'Increase payments' },
  ],
};