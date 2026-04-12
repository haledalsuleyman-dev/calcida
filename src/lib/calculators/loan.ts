export interface LoanInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  loanTermMonths?: number; // Some loans are in months
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

export function calculateLoan(input: LoanInput): LoanResult {
  const {
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths = 0,
  } = input;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12 + loanTermMonths;

  let monthlyPayment = 0;

  if (interestRate === 0) {
    monthlyPayment = loanAmount / totalMonths;
  } else {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const amortizationSchedule = [];
  let remainingBalance = loanAmount;
  let totalInterest = 0;

  for (let i = 1; i <= totalMonths; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterest += interestPayment;

    if (remainingBalance < 0) remainingBalance = 0;

    amortizationSchedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance,
    });
  }

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * totalMonths,
    totalInterest,
    amortizationSchedule,
  };
}

export function calculateAPR(loanAmount: number, monthlyPayment: number, totalMonths: number, upfrontFees: number = 0): number {
  const netLoanAmount = loanAmount - upfrontFees;
  
  // Solve for r in: P = PMT * (1 - (1 + r)^-n) / r
  // where P is netLoanAmount, PMT is monthlyPayment, n is totalMonths
  
  let low = 0;
  let high = 1; // 100% per month is a safe upper bound
  let apr = 0;
  
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    if (mid === 0) {
      low = 0.000001;
      continue;
    }
    const estimatedP = monthlyPayment * (1 - Math.pow(1 + mid, -totalMonths)) / mid;
    
    if (estimatedP > netLoanAmount) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  apr = low * 12 * 100;
  return apr;
}

export function calculateCarAffordability(monthlyBudget: number, downPayment: number, interestRate: number, termYears: number) {
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;
  
  // Solve for LoanAmount in: PMT = (L * r * (1+r)^n) / ((1+r)^n - 1)
  // L = PMT * ((1+r)^n - 1) / (r * (1+r)^n)
  
  let loanAmount = 0;
  if (interestRate === 0) {
    loanAmount = monthlyBudget * totalMonths;
  } else {
    loanAmount = monthlyBudget * (Math.pow(1 + monthlyRate, totalMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
  }
  
  return {
    loanAmount,
    totalCarPrice: loanAmount + downPayment,
  };
}
