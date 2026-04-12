
export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

export interface DebtPayoffResult {
  totalInterest: number;
  monthsToPayoff: number;
  payoffDate: Date;
  schedule: Array<{
    month: number;
    totalBalance: number;
    totalInterest: number;
  }>;
}

export function calculateDebtPayoff(
  debts: Debt[],
  extraMonthlyPayment: number,
  strategy: 'snowball' | 'avalanche'
): DebtPayoffResult {
  let currentDebts = debts.map(d => ({ ...d, currentBalance: d.balance }));
  let totalInterest = 0;
  let months = 0;
  const schedule = [];
  
  const now = new Date();

  while (currentDebts.some(d => d.currentBalance > 0) && months < 600) { // cap at 50 years
    months++;
    
    // Sort debts based on strategy
    if (strategy === 'snowball') {
      currentDebts = [...currentDebts].sort((a, b) => a.balance - b.balance);
    } else {
      currentDebts = [...currentDebts].sort((a, b) => b.interestRate - a.interestRate);
    }

    let availableExtra = extraMonthlyPayment;

    // First pay minimums
    for (const debt of currentDebts) {
      if (debt.currentBalance <= 0) continue;
      
      const interest = (debt.currentBalance * (debt.interestRate / 100)) / 12;
      totalInterest += interest;
      debt.currentBalance += interest;
      
      const payment = Math.min(debt.currentBalance, debt.minPayment);
      debt.currentBalance -= payment;
    }

    // Then apply extra to the first debt in sorted list
    for (const debt of currentDebts) {
      if (debt.currentBalance <= 0) continue;
      const extraToApply = Math.min(debt.currentBalance, availableExtra);
      debt.currentBalance -= extraToApply;
      availableExtra -= extraToApply;
      if (availableExtra <= 0) break;
    }

    if (months % 1 === 0) {
      schedule.push({
        month: months,
        totalBalance: Math.round(currentDebts.reduce((sum, d) => sum + Math.max(0, d.currentBalance), 0)),
        totalInterest: Math.round(totalInterest),
      });
    }
  }

  const payoffDate = new Date(now.setMonth(now.getMonth() + months));

  return {
    totalInterest: Math.round(totalInterest),
    monthsToPayoff: months,
    payoffDate,
    schedule,
  };
}
