
export interface CompoundInterestResult {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
  schedule: Array<{
    period: number;
    balance: number;
    interest: number;
    totalInterest: number;
  }>;
}

export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): CompoundInterestResult {
  const schedule = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = principal;

  const periodsPerYear = 12; // Monthly contributions are assumed monthly
  const totalPeriods = years * periodsPerYear;
  const periodicRate = annualRate / 100 / periodsPerYear;

  for (let i = 1; i <= totalPeriods; i++) {
    const interestForPeriod = balance * periodicRate;
    balance += interestForPeriod + monthlyContribution;
    totalInterest += interestForPeriod;
    totalPrincipal += monthlyContribution;

    if (i % (periodsPerYear / Math.min(periodsPerYear, 1)) === 0) {
      schedule.push({
        period: i / periodsPerYear,
        balance: Math.round(balance),
        interest: Math.round(interestForPeriod),
        totalInterest: Math.round(totalInterest),
      });
    }
  }

  return {
    finalBalance: Math.round(balance),
    totalPrincipal: Math.round(totalPrincipal),
    totalInterest: Math.round(totalInterest),
    schedule,
  };
}

export function calculateSavings(
  initialAmount: number,
  monthlyDeposit: number,
  annualInterestRate: number,
  years: number
) {
  return calculateCompoundInterest(initialAmount, monthlyDeposit, annualInterestRate, years);
}

export function calculateInvestmentReturn(
  initialInvestment: number,
  monthlyContribution: number,
  expectedReturn: number,
  years: number
) {
  return calculateCompoundInterest(initialInvestment, monthlyContribution, expectedReturn, years);
}

export function calculateNetWorth(assets: number, liabilities: number) {
  return assets - liabilities;
}

export function calculateInflation(amount: number, rate: number, years: number) {
  return amount * Math.pow(1 + rate / 100, years);
}

export function calculateEmergencyFund(monthlyExpenses: number, months: number) {
  return monthlyExpenses * months;
}

export function calculateROI(initial: number, final: number) {
  if (initial === 0) return 0;
  return ((final - initial) / initial) * 100;
}

export function calculateBudget(netIncome: number) {
  return {
    needs: netIncome * 0.5,
    wants: netIncome * 0.3,
    savings: netIncome * 0.2,
  };
}
