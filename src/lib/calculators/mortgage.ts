export interface MortgagePaymentInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxYearly?: number;
  insuranceYearly?: number;
  hoaMonthly?: number;
  paymentFrequency?: 'monthly' | 'biweekly';
  extraPayment?: number; // Kept for backward compatibility
  
  // Enhanced Extra Payment Inputs
  extraMonthly?: number;
  extraYearly?: number;
  extraOneTime?: number;
  extraOneTimeStartMonth?: number; // 1 = Month 1, etc.
}

export interface MortgagePaymentResult {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  biWeeklyPayment?: number;
  
  // Baseline (No Extra)
  totalInterest: number;
  totalPrincipal: number;
  totalCost: number;
  payoffMonths: number;
  
  // With Extra Payments
  totalInterestWithExtra: number;
  totalCostWithExtra: number;
  payoffMonthsWithExtra: number;
  
  // Savings
  interestSaved: number;
  timeSavedMonths: number;
  
  savings: number; // Legacy field (mapped to interestSaved)
  
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    extraPrincipal: number;
    remainingBalance: number;
  }[];
}

export function calculateMortgage(input: MortgagePaymentInput): MortgagePaymentResult {
  const {
    loanAmount,
    interestRate,
    loanTermYears,
    propertyTaxYearly = 0,
    insuranceYearly = 0,
    hoaMonthly = 0,
    paymentFrequency = 'monthly',
    extraPayment = 0,
    
    extraMonthly = 0,
    extraYearly = 0,
    extraOneTime = 0,
    extraOneTimeStartMonth = 1,
  } = input;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonthsScheduled = loanTermYears * 12;

  // 1. Calculate Monthly Principal & Interest (Base)
  let monthlyPrincipalAndInterest = 0;
  if (interestRate === 0) {
    monthlyPrincipalAndInterest = loanAmount / totalMonthsScheduled;
  } else {
    monthlyPrincipalAndInterest =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonthsScheduled)) /
      (Math.pow(1 + monthlyRate, totalMonthsScheduled) - 1);
  }

  const monthlyPropertyTax = propertyTaxYearly / 12;
  const monthlyInsurance = insuranceYearly / 12;
  const baseMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly;

  // 2. Calculate Baseline Totals (No Extra Payments)
  const baselineTotalInterest = (monthlyPrincipalAndInterest * totalMonthsScheduled) - loanAmount;
  
  // 3. Calculate Schedule WITH Extra Payments
  const amortizationSchedule = [];
  let remainingBalance = loanAmount;
  let totalInterestWithExtra = 0;
  let months = 0;
  
  // Combine legacy extraPayment with new extraMonthly
  const effectiveMonthlyExtra = extraPayment + extraMonthly;

  // Bi-weekly logic: Approximate monthly payment = (P&I / 2) * 26 / 12
  let requiredPayment = monthlyPrincipalAndInterest;
  if (paymentFrequency === 'biweekly') {
      requiredPayment = (monthlyPrincipalAndInterest / 2) * 26 / 12;
  }

  while (remainingBalance > 0.01 && months < totalMonthsScheduled * 2) { 
    months++;
    const interestPayment = remainingBalance * monthlyRate;
    
    // Start with required payment
    let principalPayment = requiredPayment - interestPayment;
    let extraPrincipalThisMonth = 0;

    // Add Monthly Extra
    extraPrincipalThisMonth += effectiveMonthlyExtra;

    // Add Annual Extra (applied at month 12, 24, 36...)
    if (extraYearly > 0 && months % 12 === 0) {
        extraPrincipalThisMonth += extraYearly;
    }

    // Add One-Time Extra
    if (extraOneTime > 0 && months === extraOneTimeStartMonth) {
        extraPrincipalThisMonth += extraOneTime;
    }

    let totalPrincipalPayment = principalPayment + extraPrincipalThisMonth;

    // Cap at remaining balance
    if (totalPrincipalPayment > remainingBalance) {
        totalPrincipalPayment = remainingBalance;
        // Adjust extra part if needed for display, though mathematically it's just paying off
        if (totalPrincipalPayment < principalPayment) {
             principalPayment = totalPrincipalPayment;
             extraPrincipalThisMonth = 0;
        } else {
             extraPrincipalThisMonth = totalPrincipalPayment - principalPayment;
        }
    }
    
    remainingBalance -= totalPrincipalPayment;
    totalInterestWithExtra += interestPayment;

    amortizationSchedule.push({
      month: months,
      payment: totalPrincipalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      extraPrincipal: extraPrincipalThisMonth,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  const interestSaved = Math.max(0, baselineTotalInterest - totalInterestWithExtra);
  const timeSavedMonths = Math.max(0, totalMonthsScheduled - months);

  return {
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHOA: hoaMonthly,
    totalMonthlyPayment: baseMonthlyPayment, // Required monthly payment
    biWeeklyPayment: baseMonthlyPayment / 2, // Bi-weekly payment amount
    
    // Baseline
    totalInterest: baselineTotalInterest,
    totalPrincipal: loanAmount,
    totalCost: loanAmount + baselineTotalInterest + (monthlyPropertyTax + monthlyInsurance + hoaMonthly) * totalMonthsScheduled,
    payoffMonths: totalMonthsScheduled, // Baseline term
    
    // With Extra
    totalInterestWithExtra,
    totalCostWithExtra: loanAmount + totalInterestWithExtra + (monthlyPropertyTax + monthlyInsurance + hoaMonthly) * months,
    payoffMonthsWithExtra: months,
    
    // Savings
    interestSaved,
    timeSavedMonths,
    savings: interestSaved, // Legacy support
    
    amortizationSchedule,
  };
}
