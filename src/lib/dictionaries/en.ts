export const en = {
  mortgage: {
    title: 'Mortgage Calculator',
    homePrice: 'Home Price',
    homePricePlaceholder: 'e.g., 400000',
    homePriceHelper: 'Enter purchase price before closing costs.',
    downPayment: 'Down Payment',
    amount: 'Amount',
    percent: 'Percent',
    downPaymentHelper: '20% down avoids PMI in many cases.',
    loanTerm: 'Loan Term (Years)',
    years: 'Years',
    loanTermHelper: 'Shorter terms increase payment but cut total interest.',
    interestRate: 'Interest Rate (%)',
    taxesAndFees: 'Taxes & Fees',
    propertyTax: 'Property Tax / Year',
    propertyTaxHelper: 'If percent, we estimate based on home price.',
    homeInsurance: 'Home Insurance / Year',
    hoaFees: 'HOA / Monthly',
    extraPayment: 'Extra Monthly Payment',
    extraPaymentHelper: 'Applied toward principal each period.',
    paymentFrequency: 'Payment Frequency',
    monthly: 'Monthly',
    biweekly: 'Bi-Weekly',
    biweeklyHelper: 'Biweekly means 26 payments per year.',
    results: {
      monthlyPayment: 'Estimated Monthly Payment',
      biweeklyPayment: 'Estimated Bi-Weekly Payment',
      standardMonthly: 'Standard Monthly',
      save: 'Save {amount}',
      payoffSummary: 'Pay off your mortgage {years} years and {months} months sooner.',
      share: 'Share Results',
      download: 'Download CSV',
      breakdown: 'Payment Breakdown',
      detailedCosts: 'Detailed Costs ({mode})',
      principalInterest: 'Principal & Interest',
      totalMonthly: 'Total Monthly',
    },
    insights: {
      title: 'Key Insights',
      totalInterest: 'Over the life of this {years}-year loan, you will pay a total of {amount} in interest.',
      ltv: 'Your loan-to-value (LTV) ratio is {percent}%.',
      pmiWarning: 'Since your down payment is less than 20%, you may be required to pay Private Mortgage Insurance (PMI).',
      pmiSuccess: 'Great job! With a down payment of 20% or more, you avoid PMI costs.',
      biweeklyInsight: 'By paying bi-weekly, you are effectively making 13 full payments per year instead of 12, which accelerates your payoff.',
      downPaymentImpact: 'For every $10,000 you increase your down payment, your monthly payment decreases by approximately {amount}.',
    },
    sticky: {
        monthly: 'Estimated Monthly Payment',
        biweekly: 'Estimated Bi-Weekly Payment',
        standard: 'Standard Monthly'
    }
  },
  common: {
    loading: 'Loading Chart...',
    copied: 'Result copied to clipboard!',
    copyError: 'Error copying'
  }
};
