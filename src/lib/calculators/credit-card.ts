export function calculateCreditCardPayoff(balance: number, interestRate: number, monthlyPayment: number) {
  const monthlyRate = interestRate / 100 / 12;
  let months = 0;
  let totalInterest = 0;
  let currentBalance = balance;

  // Safety check for minimum payment
  const minInterestPayment = currentBalance * monthlyRate;
  if (monthlyPayment <= minInterestPayment) {
    return {
      months: Infinity,
      totalInterest: Infinity,
      totalPayment: Infinity,
      schedule: []
    };
  }

  const schedule = [];
  while (currentBalance > 0 && months < 1200) { // Limit to 100 years
    const interest = currentBalance * monthlyRate;
    let principal = monthlyPayment - interest;
    
    if (currentBalance < principal) {
        principal = currentBalance;
    }

    currentBalance -= principal;
    totalInterest += interest;
    months++;
    
    schedule.push({
        month: months,
        payment: principal + interest,
        principal,
        interest,
        remainingBalance: Math.max(0, currentBalance)
    });
  }

  return {
    months,
    totalInterest,
    totalPayment: balance + totalInterest,
    schedule
  };
}
