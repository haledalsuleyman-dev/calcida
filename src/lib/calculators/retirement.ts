export function calculate401k(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  annualSalary: number,
  contributionPercent: number,
  employerMatchPercent: number, // Employer matches this % of salary
  annualReturn: number,
  salaryIncrease: number
) {
  let balance = currentBalance;
  let salary = annualSalary;
  const years = retirementAge - currentAge;
  const schedule = [];
  let totalContributions = 0;

  for (let i = 0; i < years; i++) {
    const employeeContribution = salary * (contributionPercent / 100);
    const employerContribution = salary * (employerMatchPercent / 100);
    const totalContribution = employeeContribution + employerContribution;
    
    const interest = balance * (annualReturn / 100);
    balance += totalContribution + interest;
    
    totalContributions += totalContribution;
    salary *= (1 + salaryIncrease / 100);

    schedule.push({
      age: currentAge + i + 1,
      balance,
      contribution: totalContribution,
      interest,
      salary
    });
  }

  return {
    finalBalance: balance,
    totalContributions,
    schedule
  };
}
