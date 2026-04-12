export interface RefinanceInput {
  currentLoanBalance: number;
  currentInterestRate: number;
  remainingLoanTermYears: number;
  
  newInterestRate: number;
  newLoanTermYears: number;
  closingCosts: number;
  cashOutAmount?: number;
}

export interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  
  newLoanAmount: number;
  cashOutAmount?: number; // Added to interface
  
  currentTotalInterestRemaining: number;
  newTotalInterest: number;
  lifetimeInterestSavings: number;
  
  totalCostOld: number;
  totalCostNew: number;
  netLifetimeSavings: number; // Includes closing costs
  
  breakEvenMonths: number;
  
  comparisonSchedule: {
    month: number;
    year: number;
    cumulativeCostOld: number;
    cumulativeCostNew: number;
  }[];
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const {
    currentLoanBalance,
    currentInterestRate,
    remainingLoanTermYears,
    newInterestRate,
    newLoanTermYears,
    closingCosts,
    cashOutAmount = 0,
  } = input;

  // 1. Calculate Current Loan Details
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentMonths = remainingLoanTermYears * 12;
  
  let currentMonthlyPayment = 0;
  if (currentInterestRate === 0) {
    currentMonthlyPayment = currentLoanBalance / currentMonths;
  } else {
    currentMonthlyPayment =
      (currentLoanBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths)) /
      (Math.pow(1 + currentMonthlyRate, currentMonths) - 1);
  }
  
  const currentTotalInterestRemaining = (currentMonthlyPayment * currentMonths) - currentLoanBalance;
  const totalCostOld = currentLoanBalance + currentTotalInterestRemaining;

  // 2. Calculate New Loan Details
  const newLoanAmount = currentLoanBalance + cashOutAmount; // Usually closing costs are paid upfront, but sometimes rolled in. For this calc, we assume paid upfront for break-even, or handled separately. Let's keep it simple: New Loan = Balance + Cash Out. Closing costs separate.
  
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newMonths = newLoanTermYears * 12;
  
  let newMonthlyPayment = 0;
  if (newInterestRate === 0) {
    newMonthlyPayment = newLoanAmount / newMonths;
  } else {
    newMonthlyPayment =
      (newLoanAmount * newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths)) /
      (Math.pow(1 + newMonthlyRate, newMonths) - 1);
  }
  
  const newTotalInterest = (newMonthlyPayment * newMonths) - newLoanAmount;
  // Total cost includes the closing costs paid upfront
  const totalCostNew = newLoanAmount + newTotalInterest + closingCosts;

  // 3. Savings Analysis
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const lifetimeInterestSavings = currentTotalInterestRemaining - newTotalInterest;
  const netLifetimeSavings = totalCostOld - totalCostNew;

  // 4. Break-Even Point
  // Time to recover closing costs via monthly savings
  let breakEvenMonths = 0;
  if (monthlySavings > 0) {
      breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
  } else {
      breakEvenMonths = Infinity; // Never break even on monthly basis if paying more
  }

  // 5. Comparison Schedule (for Chart)
  // We want to plot Cumulative Cost over time
  // Old Loan ends at currentMonths
  // New Loan ends at newMonths
  const maxMonths = Math.max(currentMonths, newMonths);
  const comparisonSchedule = [];
  
  // Downsample for chart (every 12 months)
  for (let m = 0; m <= maxMonths; m += 12) {
      let costOld = 0;
      if (m <= currentMonths) {
          costOld = m * currentMonthlyPayment;
      } else {
          costOld = currentMonths * currentMonthlyPayment; // Capped at total cost
      }
      
      let costNew = closingCosts; // Start with closing costs
      if (m <= newMonths) {
          costNew += m * newMonthlyPayment;
      } else {
          costNew += newMonths * newMonthlyPayment;
      }
      
      comparisonSchedule.push({
          month: m,
          year: m / 12,
          cumulativeCostOld: costOld,
          cumulativeCostNew: costNew,
      });
  }

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    newLoanAmount,
    cashOutAmount, // Pass through for UI
    currentTotalInterestRemaining,
    newTotalInterest,
    lifetimeInterestSavings,
    totalCostOld,
    totalCostNew,
    netLifetimeSavings,
    breakEvenMonths,
    comparisonSchedule,
  };
}
