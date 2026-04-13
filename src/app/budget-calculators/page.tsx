import { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';
import { getCalculatorHub } from '@/lib/calculatorHubs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Budget Calculators for Net Worth and Debt Payoff',
  description: 'Track net worth, build a budget, plan an emergency fund, and compare debt payoff strategies with budgeting calculators.',
  canonicalPath: '/budget-calculators',
});

export default function BudgetCalculatorsPage() {
  const preferred: CalculatorId[] = ['net-worth', 'budget', 'cost-of-living', 'emergency-fund', 'debt-payoff', 'savings-goal', 'car-affordability', 'debt-snowball', 'debt-avalanche'];
  const idsInHub = CALCULATOR_SPECS.map((s) => s.id).filter((id) => getCalculatorHub(getCalculatorSpec(id)).href === '/budget-calculators');
  const inHub = new Set<CalculatorId>(idsInHub);
  const preferredFiltered = preferred.filter((id) => inHub.has(id));
  const preferredSet = new Set<CalculatorId>(preferredFiltered);
  const rest = idsInHub
    .filter((id) => !preferredSet.has(id))
    .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
  const calculators = [...preferredFiltered, ...rest].map((id) => {
    const spec = getCalculatorSpec(id);
    return { name: spec.title, description: spec.description, href: spec.route };
  });

  return (
    <CategoryPage
      title="Budget & Personal Finance Calculators"
      description="Track your net worth, create a budget, build an emergency fund, and pay off debt faster."
      calculators={calculators}
      currentPath="/budget-calculators"
    >
      <p>
        Personal finance is a system. Your budget controls your cash flow, your emergency fund prevents setbacks, and your debt payoff plan determines how quickly
        interest stops working against you.
      </p>
      <p>
        Use the net worth calculator as a snapshot, then build a monthly budget and emergency fund plan. If you are paying down balances, compare payoff strategies
        and use car affordability to keep large purchases within your budget.
      </p>
    </CategoryPage>
  );
}

