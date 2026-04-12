export function salaryToHourly(annualSalary: number, hoursPerWeek: number = 40, weeksPerYear: number = 52) {
  const totalHours = hoursPerWeek * weeksPerYear;
  const hourlyRate = annualSalary / totalHours;
  return {
    hourly: hourlyRate,
    daily: hourlyRate * (hoursPerWeek / 5),
    weekly: annualSalary / weeksPerYear,
    biweekly: annualSalary / 26,
    monthly: annualSalary / 12,
    annual: annualSalary
  };
}

export function hourlyToSalary(hourlyRate: number, hoursPerWeek: number = 40, weeksPerYear: number = 52) {
  const annualSalary = hourlyRate * hoursPerWeek * weeksPerYear;
  return {
    hourly: hourlyRate,
    daily: hourlyRate * (hoursPerWeek / 5),
    weekly: annualSalary / weeksPerYear,
    biweekly: annualSalary / 26,
    monthly: annualSalary / 12,
    annual: annualSalary
  };
}
