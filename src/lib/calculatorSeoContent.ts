import type { CalculatorId } from '@/lib/calculatorSpecs';

export interface SeoFormula {
  expression: string;
  where: Array<{ symbol: string; meaning: string }>;
  notes?: string[];
}

export interface SeoExample {
  inputs: Array<{ label: string; value: string }>;
  resultLabel: string;
  resultValue: string;
  note?: string;
}

export interface SeoIntro {
  inputs: string[];
  result: string;
  who: string;
}

export interface CalculatorSeoContent {
  intro: SeoIntro;
  formula: SeoFormula;
  example: SeoExample;
}

const CONTENT: Partial<Record<CalculatorId, CalculatorSeoContent>> = {
  'mortgage-payment': {
    intro: {
      who: 'Homebuyers and homeowners comparing mortgage scenarios.',
      inputs: ['Home price or loan amount', 'Interest rate', 'Loan term', 'Down payment', 'Taxes and insurance (optional)'],
      result: 'Estimated monthly payment and total loan cost.',
    },
    formula: {
      expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
      where: [
        { symbol: 'M', meaning: 'monthly principal + interest payment' },
        { symbol: 'P', meaning: 'principal (loan amount)' },
        { symbol: 'i', meaning: 'monthly interest rate (annual rate / 12)' },
        { symbol: 'n', meaning: 'number of monthly payments (years × 12)' },
      ],
      notes: ['Taxes, insurance, HOA, and PMI are added to estimate total monthly housing cost when provided.'],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$300,000' },
        { label: 'Interest rate', value: '6.00%' },
        { label: 'Loan term', value: '30 years' },
      ],
      resultLabel: 'Estimated monthly principal + interest',
      resultValue: '≈ $1,799',
    },
  },
  'mortgage-amortization': {
    intro: {
      who: 'Homeowners who want to see principal vs. interest over time.',
      inputs: ['Loan amount', 'Interest rate', 'Loan term', 'Start date (optional)'],
      result: 'Full amortization schedule and totals for interest paid.',
    },
    formula: {
      expression: 'Balance_k = P(1 + i)^k − M × [ ( (1 + i)^k − 1 ) / i ]',
      where: [
        { symbol: 'Balance_k', meaning: 'remaining balance after k payments' },
        { symbol: 'P', meaning: 'principal (loan amount)' },
        { symbol: 'i', meaning: 'monthly interest rate' },
        { symbol: 'M', meaning: 'monthly payment (from amortization formula)' },
        { symbol: 'k', meaning: 'payment number (month)' },
      ],
      notes: ['Interest each month is Balance × i; principal is M − interest.'],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$250,000' },
        { label: 'Interest rate', value: '5.50%' },
        { label: 'Loan term', value: '30 years' },
      ],
      resultLabel: 'First payment (principal vs. interest)',
      resultValue: '≈ $197 principal, ≈ $1,146 interest',
      note: 'Early payments are interest-heavy; principal share grows over time.',
    },
  },
  'biweekly-mortgage': {
    intro: {
      who: 'Borrowers deciding between monthly and biweekly mortgage payments.',
      inputs: ['Loan amount', 'Interest rate', 'Loan term', 'Payment frequency'],
      result: 'Payoff time and interest savings for biweekly vs. monthly.',
    },
    formula: {
      expression: 'Biweekly payments = (Monthly payment × 12) / 26',
      where: [
        { symbol: 'Monthly payment', meaning: 'standard monthly amortized payment' },
      ],
      notes: ['Biweekly schedules usually create one extra monthly payment per year, reducing interest and payoff time.'],
    },
    example: {
      inputs: [
        { label: 'Monthly payment', value: '$1,800' },
      ],
      resultLabel: 'Biweekly payment',
      resultValue: '≈ $831',
      note: 'This is equivalent to making 13 monthly payments per year.',
    },
  },
  'extra-payment-mortgage': {
    intro: {
      who: 'Homeowners exploring how extra payments affect payoff time and interest.',
      inputs: ['Loan amount', 'Interest rate', 'Loan term', 'Extra monthly payment'],
      result: 'New payoff date and total interest savings.',
    },
    formula: {
      expression: 'New balance uses the same amortization update, with payment = M + Extra',
      where: [
        { symbol: 'M', meaning: 'regular monthly payment' },
        { symbol: 'Extra', meaning: 'additional principal paid each month' },
      ],
      notes: ['Extra payments go to principal and reduce future interest because interest is calculated on the remaining balance.'],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$300,000' },
        { label: 'Interest rate', value: '6.00%' },
        { label: 'Term', value: '30 years' },
        { label: 'Extra payment', value: '$200/month' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Pay off years earlier and save thousands in interest',
    },
  },
  refinance: {
    intro: {
      who: 'homeowners comparing a refinance offer to their current mortgage',
      inputs: ['Current loan payment', 'New rate and term', 'Closing costs', 'Time you plan to keep the loan'],
      result: 'estimated monthly savings and break-even time',
    },
    formula: {
      expression: 'Monthly Savings = Current Payment − New Payment; Break-even (months) = Closing Costs / Monthly Savings',
      where: [
        { symbol: 'Closing Costs', meaning: 'total refinance fees paid upfront or rolled into loan' },
        { symbol: 'Monthly Savings', meaning: 'current payment − new payment' },
        { symbol: 'Break-even', meaning: 'months needed for savings to cover closing costs' },
      ],
      notes: [
        'A refinance often makes more sense when you plan to keep the loan beyond the break-even point.',
        'Resetting to a longer term can lower the payment but increase total interest paid.',
      ],
    },
    example: {
      inputs: [
        { label: 'Current payment', value: '$2,350/month' },
        { label: 'New payment', value: '$2,100/month' },
        { label: 'Closing costs', value: '$6,000' },
      ],
      resultLabel: 'Break-even point',
      resultValue: '≈ 24 months',
      note: 'If you expect to sell or refinance again before the break-even point, refinancing is less likely to pay off.',
    },
  },
  'mortgage-refinance': {
    intro: {
      who: 'Homeowners evaluating refinance savings with a clear break-even estimate.',
      inputs: ['Current loan details', 'Proposed refinance details', 'Closing costs'],
      result: 'Break-even month and long-term savings.',
    },
    formula: {
      expression: 'Break-even (months) = Closing Costs / Monthly Savings',
      where: [
        { symbol: 'Closing Costs', meaning: 'fees, points, and other refinance costs' },
        { symbol: 'Monthly Savings', meaning: 'current payment − new payment' },
      ],
    },
    example: {
      inputs: [
        { label: 'Current payment', value: '$2,000' },
        { label: 'New payment', value: '$1,800' },
        { label: 'Closing costs', value: '$4,000' },
      ],
      resultLabel: 'Break-even point',
      resultValue: '20 months',
    },
  },
  'personal-loan': {
    intro: {
      who: 'Borrowers estimating payments for fixed-rate installment loans.',
      inputs: ['Loan amount', 'Interest rate', 'Loan term'],
      result: 'Monthly payment, total interest, and total cost.',
    },
    formula: {
      expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
      where: [
        { symbol: 'M', meaning: 'monthly payment' },
        { symbol: 'P', meaning: 'principal (loan amount)' },
        { symbol: 'i', meaning: 'monthly interest rate' },
        { symbol: 'n', meaning: 'number of payments' },
      ],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$10,000' },
        { label: 'APR', value: '11.00%' },
        { label: 'Term', value: '3 years' },
      ],
      resultLabel: 'Estimated monthly payment',
      resultValue: '≈ $327',
    },
  },
  'auto-loan': {
    intro: {
      who: 'Car buyers comparing loan payments and total interest.',
      inputs: ['Vehicle price', 'Down payment', 'Interest rate', 'Loan term'],
      result: 'Monthly payment and total interest paid.',
    },
    formula: {
      expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
      where: [
        { symbol: 'P', meaning: 'loan amount (price − down payment)' },
        { symbol: 'i', meaning: 'monthly interest rate' },
        { symbol: 'n', meaning: 'number of monthly payments' },
        { symbol: 'M', meaning: 'monthly payment' },
      ],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$25,000' },
        { label: 'Interest rate', value: '6.50%' },
        { label: 'Term', value: '60 months' },
      ],
      resultLabel: 'Estimated monthly payment',
      resultValue: '≈ $489',
    },
  },
  'student-loan': {
    intro: {
      who: 'Students and graduates planning repayment and payoff timelines.',
      inputs: ['Loan balance', 'Interest rate', 'Loan term', 'Extra payment (optional)'],
      result: 'Monthly payment and total interest over time.',
    },
    formula: {
      expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
      where: [
        { symbol: 'P', meaning: 'principal balance' },
        { symbol: 'i', meaning: 'monthly interest rate' },
        { symbol: 'n', meaning: 'number of payments' },
        { symbol: 'M', meaning: 'monthly payment' },
      ],
      notes: ['Extra payments reduce principal faster and reduce total interest.'],
    },
    example: {
      inputs: [
        { label: 'Loan balance', value: '$30,000' },
        { label: 'Interest rate', value: '5.00%' },
        { label: 'Term', value: '10 years' },
      ],
      resultLabel: 'Estimated monthly payment',
      resultValue: '≈ $318',
    },
  },
  'loan-comparison': {
    intro: {
      who: 'Borrowers comparing two loan offers side-by-side.',
      inputs: ['Loan amount', 'Rate and term for Loan A', 'Rate and term for Loan B', 'Fees (optional)'],
      result: 'Monthly payments, total interest, and total cost comparison.',
    },
    formula: {
      expression: 'Compare by monthly payment + total interest + total cost (APR when fees apply)',
      where: [
        { symbol: 'M', meaning: 'monthly payment from amortization formula' },
      ],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$25,000' },
        { label: 'Option A', value: '6.50% for 5 years' },
        { label: 'Option B', value: '4.50% for 3 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Option B costs less overall but has a higher monthly payment',
    },
  },
  apr: {
    intro: {
      who: 'Borrowers who want the true cost of borrowing including fees.',
      inputs: ['Loan amount', 'Monthly payment', 'Loan term', 'Upfront fees'],
      result: 'APR that reflects interest plus fees.',
    },
    formula: {
      expression: 'APR is the annualized rate that equates net proceeds to the present value of payments',
      where: [
        { symbol: 'Net proceeds', meaning: 'loan amount − upfront fees' },
        { symbol: 'APR', meaning: 'annualized effective rate (IRR of cash flows)' },
      ],
      notes: ['APR is typically higher than the nominal interest rate when fees are present.'],
    },
    example: {
      inputs: [
        { label: 'Loan amount', value: '$10,000' },
        { label: 'Upfront fees', value: '$500' },
        { label: 'Monthly payment', value: '$500' },
        { label: 'Term', value: '24 months' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'APR > stated interest rate',
    },
  },
  'salary-to-hourly': {
    intro: {
      who: 'Employees comparing job offers or converting annual salary to hourly pay.',
      inputs: ['Annual salary', 'Hours per week', 'Weeks per year'],
      result: 'Equivalent hourly wage.',
    },
    formula: {
      expression: 'Hourly Rate = Annual Salary / (Hours per Week × Weeks per Year)',
      where: [
        { symbol: 'Annual Salary', meaning: 'gross annual pay' },
        { symbol: 'Hours per Week', meaning: 'hours worked each week' },
        { symbol: 'Weeks per Year', meaning: 'typically 52, adjusted for unpaid time off' },
      ],
    },
    example: {
      inputs: [
        { label: 'Annual salary', value: '$80,000' },
        { label: 'Hours per week', value: '40' },
        { label: 'Weeks per year', value: '52' },
      ],
      resultLabel: 'Hourly rate',
      resultValue: '≈ $38.46/hour',
    },
  },
  'hourly-to-salary': {
    intro: {
      who: 'Hourly workers converting their wage to an annual salary estimate.',
      inputs: ['Hourly wage', 'Hours per week', 'Weeks per year'],
      result: 'Estimated annual salary.',
    },
    formula: {
      expression: 'Annual Salary = Hourly Rate × Hours per Week × Weeks per Year',
      where: [
        { symbol: 'Hourly Rate', meaning: 'gross hourly pay' },
        { symbol: 'Hours per Week', meaning: 'hours worked each week' },
        { symbol: 'Weeks per Year', meaning: 'typically 52' },
      ],
    },
    example: {
      inputs: [
        { label: 'Hourly rate', value: '$25/hour' },
        { label: 'Hours per week', value: '40' },
        { label: 'Weeks per year', value: '52' },
      ],
      resultLabel: 'Annual salary',
      resultValue: '≈ $52,000/year',
    },
  },
  paycheck: {
    intro: {
      who: 'Employees estimating paycheck amounts for different pay frequencies.',
      inputs: ['Gross pay', 'Pay frequency', 'Federal/state taxes (estimated)', 'Deductions (optional)'],
      result: 'Estimated take-home pay per paycheck.',
    },
    formula: {
      expression: 'Net Pay = Gross Pay − Taxes − Deductions',
      where: [
        { symbol: 'Gross Pay', meaning: 'pre-tax earnings for the pay period' },
        { symbol: 'Taxes', meaning: 'estimated withholding for the period' },
        { symbol: 'Deductions', meaning: 'benefits, retirement contributions, etc.' },
      ],
    },
    example: {
      inputs: [
        { label: 'Gross pay', value: '$2,500 (biweekly)' },
        { label: 'Estimated taxes', value: '$500' },
        { label: 'Deductions', value: '$150' },
      ],
      resultLabel: 'Estimated net paycheck',
      resultValue: '≈ $1,850',
    },
  },
  'take-home-pay': {
    intro: {
      who: 'Anyone who wants to understand net income after taxes and deductions.',
      inputs: ['Annual income', 'Filing status', 'State', 'Deductions and pre-tax contributions'],
      result: 'Estimated annual and monthly take-home pay.',
    },
    formula: {
      expression: 'Take-Home Pay = Gross Income − Estimated Taxes − Pre-tax Deductions',
      where: [
        { symbol: 'Gross Income', meaning: 'income before taxes' },
        { symbol: 'Estimated Taxes', meaning: 'federal, state, and payroll taxes' },
        { symbol: 'Pre-tax Deductions', meaning: '401(k), HSA, etc.' },
      ],
    },
    example: {
      inputs: [
        { label: 'Annual income', value: '$100,000' },
        { label: 'Estimated total taxes', value: '$25,000' },
        { label: 'Pre-tax contributions', value: '$10,000' },
      ],
      resultLabel: 'Estimated take-home pay',
      resultValue: '≈ $65,000/year',
    },
  },
  'after-tax-income': {
    intro: {
      who: 'Employees and freelancers estimating income after taxes.',
      inputs: ['Income', 'Filing status', 'State', 'Deductions (optional)'],
      result: 'Estimated after-tax income and effective tax rate.',
    },
    formula: {
      expression: 'After-Tax Income = Gross Income − Total Estimated Taxes',
      where: [
        { symbol: 'Gross Income', meaning: 'total income before taxes' },
        { symbol: 'Total Estimated Taxes', meaning: 'federal + state + payroll taxes' },
      ],
    },
    example: {
      inputs: [
        { label: 'Gross income', value: '$90,000' },
        { label: 'Estimated taxes', value: '$22,000' },
      ],
      resultLabel: 'After-tax income',
      resultValue: '≈ $68,000',
    },
  },
  retirement: {
    intro: {
      who: 'Anyone projecting how much they may have by retirement.',
      inputs: ['Current savings', 'Monthly contribution', 'Expected return', 'Years to retirement'],
      result: 'Estimated retirement balance over time.',
    },
    formula: {
      expression: 'FV = P(1 + r)^t + PMT × [ ((1 + r)^t − 1) / r ]',
      where: [
        { symbol: 'FV', meaning: 'future value' },
        { symbol: 'P', meaning: 'starting balance' },
        { symbol: 'r', meaning: 'periodic return rate' },
        { symbol: 't', meaning: 'number of periods' },
        { symbol: 'PMT', meaning: 'periodic contribution' },
      ],
    },
    example: {
      inputs: [
        { label: 'Current savings', value: '$50,000' },
        { label: 'Monthly contribution', value: '$500' },
        { label: 'Return', value: '7%/year' },
        { label: 'Time horizon', value: '25 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Balance grows significantly due to compounding + contributions',
    },
  },
  '401k': {
    intro: {
      who: 'employees planning 401(k) contributions and employer match over time',
      inputs: ['Starting balance', 'Salary', 'Contribution rate', 'Employer match', 'Expected return', 'Years'],
      result: 'estimated 401(k) balance over time',
    },
    formula: {
      expression: 'Annual Contribution ≈ Salary × Contribution%; Annual Match ≈ Salary × Match%; FV ≈ P(1 + r)^n + PMT × [((1 + r)^n − 1) / r]',
      where: [
        { symbol: 'P', meaning: 'starting 401(k) balance' },
        { symbol: 'PMT', meaning: 'annual employee + employer contributions (simplified)' },
        { symbol: 'r', meaning: 'annual return rate (decimal)' },
        { symbol: 'n', meaning: 'years' },
      ],
      notes: ['Real employer match often has caps and vesting rules.', 'Annual contribution limits can constrain how much you can contribute.'],
    },
    example: {
      inputs: [
        { label: 'Starting balance', value: '$40,000' },
        { label: 'Salary', value: '$90,000' },
        { label: 'Employee contribution', value: '10%' },
        { label: 'Employer match', value: '4% (if eligible)' },
        { label: 'Return', value: '7%/year' },
        { label: 'Time', value: '30 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'A higher contribution rate and match can materially change the final balance',
    },
  },

  'retirement-savings': {
    intro: {
      who: 'savers estimating retirement growth from a current balance and ongoing contributions',
      inputs: ['Current savings', 'Ongoing contributions', 'Expected return', 'Years to retirement'],
      result: 'estimated retirement savings balance over time',
    },
    formula: {
      expression: 'FV = P(1 + r)^n + PMT × [((1 + r)^n − 1) / r]',
      where: [
        { symbol: 'FV', meaning: 'future value at retirement' },
        { symbol: 'P', meaning: 'current retirement savings balance' },
        { symbol: 'PMT', meaning: 'periodic contribution (annual or monthly, consistent with r)' },
        { symbol: 'r', meaning: 'periodic return rate (decimal)' },
        { symbol: 'n', meaning: 'number of periods' },
      ],
      notes: ['This is a planning estimate. Markets vary and returns are not guaranteed.', 'Small changes in time horizon and contributions can change results materially.'],
    },
    example: {
      inputs: [
        { label: 'Current savings', value: '$35,000' },
        { label: 'Contribution', value: '$500/month' },
        { label: 'Return', value: '6%/year' },
        { label: 'Time horizon', value: '25 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Balance grows with consistent contributions and compounding',
      note: 'Use a conservative return assumption if you are planning for a required minimum outcome.',
    },
  },
  savings: {
    intro: {
      who: 'Anyone planning savings goals and projecting growth.',
      inputs: ['Starting balance', 'Monthly deposit', 'Interest rate', 'Time'],
      result: 'Projected savings balance over time.',
    },
    formula: {
      expression: 'FV = P(1 + r)^t + PMT × [ ((1 + r)^t − 1) / r ]',
      where: [
        { symbol: 'FV', meaning: 'future value' },
        { symbol: 'P', meaning: 'starting balance' },
        { symbol: 'PMT', meaning: 'monthly deposit' },
        { symbol: 'r', meaning: 'monthly interest rate' },
        { symbol: 't', meaning: 'number of months' },
      ],
    },
    example: {
      inputs: [
        { label: 'Starting balance', value: '$2,000' },
        { label: 'Monthly deposit', value: '$200' },
        { label: 'Interest rate', value: '4%/year' },
        { label: 'Time', value: '5 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Savings grow steadily with deposits and interest',
    },
  },
  'compound-interest': {
    intro: {
      who: 'Investors and savers projecting growth from compounding.',
      inputs: ['Starting balance', 'Contribution', 'Return rate', 'Time horizon'],
      result: 'Projected balance and total interest earned.',
    },
    formula: {
      expression: 'FV = P(1 + r)^t + PMT × [ ((1 + r)^t − 1) / r ]',
      where: [
        { symbol: 'P', meaning: 'principal (starting amount)' },
        { symbol: 'PMT', meaning: 'periodic contribution' },
        { symbol: 'r', meaning: 'periodic return rate' },
        { symbol: 't', meaning: 'number of periods' },
      ],
    },
    example: {
      inputs: [
        { label: 'Starting amount', value: '$10,000' },
        { label: 'Monthly contribution', value: '$300' },
        { label: 'Return rate', value: '7%/year' },
        { label: 'Time', value: '20 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Interest can exceed total contributions over long horizons',
    },
  },
  'investment-return': {
    intro: {
      who: 'Investors estimating future value from deposits and expected returns.',
      inputs: ['Initial investment', 'Monthly contribution', 'Expected return', 'Years'],
      result: 'Projected final value and total gain.',
    },
    formula: {
      expression: 'FV = P(1 + r)^t + PMT × [ ((1 + r)^t − 1) / r ]',
      where: [
        { symbol: 'FV', meaning: 'future value' },
        { symbol: 'P', meaning: 'initial investment' },
        { symbol: 'PMT', meaning: 'monthly contribution' },
        { symbol: 'r', meaning: 'monthly return rate' },
        { symbol: 't', meaning: 'months invested' },
      ],
    },
    example: {
      inputs: [
        { label: 'Initial investment', value: '$15,000' },
        { label: 'Monthly contribution', value: '$500' },
        { label: 'Return rate', value: '8%/year' },
        { label: 'Time', value: '15 years' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Consistent contributions drive a large portion of the final balance',
    },
  },
  roi: {
    intro: {
      who: 'Anyone comparing the profitability of an investment or project.',
      inputs: ['Initial cost', 'Final value'],
      result: 'ROI percentage and net profit.',
    },
    formula: {
      expression: 'ROI (%) = ((Final Value − Initial Cost) / Initial Cost) × 100',
      where: [
        { symbol: 'Final Value', meaning: 'value when you exit or sell' },
        { symbol: 'Initial Cost', meaning: 'total cost to acquire or invest' },
      ],
    },
    example: {
      inputs: [
        { label: 'Initial cost', value: '$10,000' },
        { label: 'Final value', value: '$15,000' },
      ],
      resultLabel: 'ROI',
      resultValue: '50%',
    },
  },
  inflation: {
    intro: {
      who: 'Anyone estimating how inflation changes buying power over time.',
      inputs: ['Starting amount', 'Inflation rate', 'Years'],
      result: 'Future cost to match today’s buying power.',
    },
    formula: {
      expression: 'FV = PV × (1 + r)^n',
      where: [
        { symbol: 'FV', meaning: 'future value (future cost)' },
        { symbol: 'PV', meaning: 'present value (today’s cost)' },
        { symbol: 'r', meaning: 'annual inflation rate (decimal)' },
        { symbol: 'n', meaning: 'number of years' },
      ],
    },
    example: {
      inputs: [
        { label: 'Today’s cost', value: '$1,000' },
        { label: 'Inflation rate', value: '3%' },
        { label: 'Years', value: '10' },
      ],
      resultLabel: 'Future cost',
      resultValue: '≈ $1,344',
    },
  },
  'net-worth': {
    intro: {
      who: 'Anyone who wants a clear snapshot of financial health.',
      inputs: ['Assets (cash, investments, property)', 'Liabilities (debts and loans)'],
      result: 'Net worth (assets minus liabilities).',
    },
    formula: {
      expression: 'Net Worth = Total Assets − Total Liabilities',
      where: [
        { symbol: 'Total Assets', meaning: 'value of everything you own' },
        { symbol: 'Total Liabilities', meaning: 'total of everything you owe' },
      ],
    },
    example: {
      inputs: [
        { label: 'Assets', value: '$370,000' },
        { label: 'Liabilities', value: '$210,000' },
      ],
      resultLabel: 'Net worth',
      resultValue: '$160,000',
    },
  },
  budget: {
    intro: {
      who: 'People creating a simple monthly plan for needs, wants, and savings.',
      inputs: ['Monthly net income'],
      result: 'Suggested budget amounts using a 50/30/20 split.',
    },
    formula: {
      expression: 'Needs = Income × 0.50; Wants = Income × 0.30; Savings/Debt = Income × 0.20',
      where: [{ symbol: 'Income', meaning: 'monthly take-home pay' }],
    },
    example: {
      inputs: [{ label: 'Monthly net income', value: '$4,000' }],
      resultLabel: '50/30/20 breakdown',
      resultValue: '$2,000 needs, $1,200 wants, $800 savings/debt',
    },
  },
  'emergency-fund': {
    intro: {
      who: 'Anyone building a safety net for job loss or unexpected expenses.',
      inputs: ['Monthly essential expenses', 'Target months of coverage'],
      result: 'Recommended emergency fund target.',
    },
    formula: {
      expression: 'Emergency Fund Target = Monthly Essential Expenses × Months of Coverage',
      where: [
        { symbol: 'Monthly Essential Expenses', meaning: 'non-negotiable monthly costs' },
        { symbol: 'Months of Coverage', meaning: 'typically 3–6 months (or more)' },
      ],
    },
    example: {
      inputs: [
        { label: 'Monthly expenses', value: '$3,000' },
        { label: 'Coverage', value: '6 months' },
      ],
      resultLabel: 'Target emergency fund',
      resultValue: '$18,000',
    },
  },
  'debt-payoff': {
    intro: {
      who: 'People paying off multiple debts who want a clear payoff timeline.',
      inputs: ['Debt balances', 'Interest rates', 'Minimum payments', 'Extra monthly payment'],
      result: 'Debt-free date and total interest paid (snowball vs. avalanche).',
    },
    formula: {
      expression: 'Payoff uses amortization: interest accrues monthly and payments reduce principal',
      where: [
        { symbol: 'Interest (monthly)', meaning: 'Balance × (APR / 12)' },
        { symbol: 'Principal paid', meaning: 'Payment − Interest' },
      ],
      notes: ['Snowball prioritizes smallest balances; avalanche prioritizes highest APR.'],
    },
    example: {
      inputs: [
        { label: 'Debt A', value: '$5,000 at 22.9% APR' },
        { label: 'Debt B', value: '$15,000 at 5.5% APR' },
        { label: 'Extra payment', value: '$500/month' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Avalanche reduces total interest; snowball can reduce accounts faster',
    },
  },
  'car-affordability': {
    intro: {
      who: 'Car shoppers estimating a maximum purchase price within a monthly budget.',
      inputs: ['Monthly budget', 'Down payment', 'Interest rate', 'Loan term'],
      result: 'Estimated maximum car price and loan amount.',
    },
    formula: {
      expression: 'Loan Amount = PMT × [((1 + r)^n − 1) / (r(1 + r)^n)]',
      where: [
        { symbol: 'PMT', meaning: 'maximum monthly payment (budget)' },
        { symbol: 'r', meaning: 'monthly interest rate' },
        { symbol: 'n', meaning: 'number of payments (months)' },
      ],
      notes: ['Total car price = loan amount + down payment.'],
    },
    example: {
      inputs: [
        { label: 'Monthly budget', value: '$400' },
        { label: 'Down payment', value: '$5,000' },
        { label: 'Interest rate', value: '5%' },
        { label: 'Term', value: '5 years' },
      ],
      resultLabel: 'Estimated max car price',
      resultValue: '≈ $26,200',
    },
  },
  'credit-card-payoff': {
    intro: {
      who: 'Credit card users estimating payoff time and total interest.',
      inputs: ['Balance', 'APR', 'Monthly payment'],
      result: 'Payoff time and total interest paid.',
    },
    formula: {
      expression: 'Months = log(PMT / (PMT − r × L)) / log(1 + r)',
      where: [
        { symbol: 'PMT', meaning: 'monthly payment' },
        { symbol: 'r', meaning: 'monthly interest rate' },
        { symbol: 'L', meaning: 'starting balance' },
      ],
      notes: ['If PMT ≤ r × L, the balance will not decrease (payment is too small).'],
    },
    example: {
      inputs: [
        { label: 'Balance', value: '$5,000' },
        { label: 'APR', value: '20%' },
        { label: 'Monthly payment', value: '$200' },
      ],
      resultLabel: 'Typical outcome',
      resultValue: 'Payoff takes years; increasing payment reduces interest dramatically',
    },
  },
};

export function getCalculatorSeoContent(id: CalculatorId): CalculatorSeoContent | null {
  return CONTENT[id] ?? null;
}

function pct(x: number): string {
  return `${x.toFixed(2)}%`;
}

function money(x: number): string {
  return `$${Math.round(x).toLocaleString('en-US')}`;
}

export function getCalculatorSeoContentForRoute(input: {
  id: CalculatorId;
  route: `/${string}`;
  title: string;
  description: string;
}): CalculatorSeoContent {
  const existing = CONTENT[input.id];
  if (existing) return existing;

  const route = input.route.toLowerCase();

  if (route.includes('mortgage-affordability')) {
    return {
      intro: {
        who: 'homebuyers estimating a comfortable price range before talking to a lender',
        inputs: ['Annual household income', 'Monthly debts', 'Down payment', 'Interest rate', 'Loan term'],
        result: 'an estimated maximum home price and an estimated affordable monthly payment',
      },
      formula: {
        expression: 'Max Housing Payment ≈ min(Income × 0.28 / 12, (Income × 0.36 / 12) − Monthly Debts)',
        where: [
          { symbol: 'Income', meaning: 'gross annual income' },
          { symbol: 'Monthly Debts', meaning: 'monthly debt obligations (loans, cards, etc.)' },
        ],
        notes: ['This is a common guideline (28/36). Lenders may use different thresholds.'],
      },
      example: {
        inputs: [
          { label: 'Income', value: '$120,000/year' },
          { label: 'Monthly debts', value: '$800' },
          { label: 'Down payment', value: '$60,000' },
          { label: 'Rate', value: '6.50%' },
          { label: 'Term', value: '30 years' },
        ],
        resultLabel: 'Affordable monthly housing payment (rule-of-thumb)',
        resultValue: '≈ $2,000–$2,800',
      },
    };
  }

  if (route.includes('down-payment')) {
    return {
      intro: {
        who: 'homebuyers deciding how much to put down and how it changes the loan amount',
        inputs: ['Home price', 'Down payment (percent or amount)'],
        result: 'down payment amount, down payment percent, and estimated loan amount',
      },
      formula: {
        expression: 'Down Payment = Home Price × Down Payment %; Loan Amount = Home Price − Down Payment',
        where: [
          { symbol: 'Home Price', meaning: 'purchase price of the property' },
          { symbol: 'Down Payment %', meaning: 'percent of price paid upfront' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home price', value: '$400,000' },
          { label: 'Down payment', value: '20%' },
        ],
        resultLabel: 'Loan amount',
        resultValue: '$320,000',
      },
    };
  }

  if (route.includes('/pmi-')) {
    return {
      intro: {
        who: 'homebuyers estimating PMI when putting less than 20% down',
        inputs: ['Loan amount', 'PMI rate', 'Down payment'],
        result: 'estimated monthly PMI cost',
      },
      formula: {
        expression: 'Monthly PMI ≈ (Loan Amount × Annual PMI Rate) / 12',
        where: [
          { symbol: 'Loan Amount', meaning: 'principal borrowed' },
          { symbol: 'Annual PMI Rate', meaning: 'annual PMI rate as a decimal (e.g. 0.7%)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$320,000' },
          { label: 'PMI rate', value: '0.70%' },
        ],
        resultLabel: 'Monthly PMI',
        resultValue: '≈ $187',
      },
    };
  }

  if (route.includes('mortgage-apr')) {
    return {
      intro: {
        who: 'homebuyers comparing lenders when fees and points differ',
        inputs: ['Loan amount', 'Note rate', 'Term', 'Points', 'Upfront fees'],
        result: 'an estimated APR that reflects interest plus upfront costs',
      },
      formula: {
        expression: 'Find APR such that PV(Payments at APR) = Loan Amount − Upfront Fees',
        where: [
          { symbol: 'PV', meaning: 'present value of payments' },
          { symbol: 'Upfront Fees', meaning: 'points and eligible fees included in APR' },
        ],
        notes: ['APR is most comparable when you keep the loan for most of the term; if you plan to refinance soon, compare break-even months too.'],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$350,000' },
          { label: 'Note rate', value: '6.25%' },
          { label: 'Points', value: '1.00%' },
          { label: 'Fees', value: '$2,500' },
          { label: 'Term', value: '30 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'APR is slightly higher than the note rate when fees apply',
      },
    };
  }

  if (route.includes('property-tax')) {
    return {
      intro: {
        who: 'homeowners estimating annual taxes and monthly escrow amounts',
        inputs: ['Home value', 'Property tax rate', 'Exemptions (optional)'],
        result: 'estimated annual and monthly property tax cost',
      },
      formula: {
        expression: 'Annual Property Tax = max(0, Value − Exemption) × Tax Rate',
        where: [
          { symbol: 'Value', meaning: 'home value or assessed value' },
          { symbol: 'Tax Rate', meaning: 'annual property tax rate (decimal)' },
          { symbol: 'Exemption', meaning: 'reductions to taxable value (if applicable)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home value', value: '$450,000' },
          { label: 'Tax rate', value: '1.10%' },
        ],
        resultLabel: 'Annual property tax',
        resultValue: '≈ $4,950',
      },
    };
  }

  if (route.includes('closing-costs')) {
    return {
      intro: {
        who: 'buyers and refinancers estimating upfront closing costs before committing',
        inputs: ['Home price or loan amount', 'Estimated closing cost rate'],
        result: 'estimated closing costs and a typical range for budgeting',
      },
      formula: {
        expression: 'Closing Costs ≈ Home Price × Closing Cost %',
        where: [
          { symbol: 'Closing Cost %', meaning: 'often 2%–5% depending on lender and location' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home price', value: '$400,000' },
          { label: 'Closing cost rate', value: '3%' },
        ],
        resultLabel: 'Estimated closing costs',
        resultValue: '$12,000',
      },
    };
  }

  if (route.includes('mortgage-points')) {
    return {
      intro: {
        who: 'borrowers deciding whether buying points makes sense based on monthly savings',
        inputs: ['Loan amount', 'Points', 'Rate reduction (optional)', 'Monthly savings'],
        result: 'upfront points cost and break-even time',
      },
      formula: {
        expression: 'Points Cost = Loan Amount × (Points / 100); Break-even Months = Points Cost / Monthly Savings',
        where: [
          { symbol: 'Points', meaning: 'points purchased (1 point = 1% of loan amount)' },
          { symbol: 'Monthly Savings', meaning: 'payment difference between rates' },
        ],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$350,000' },
          { label: 'Points', value: '1.0' },
          { label: 'Monthly savings', value: '$60' },
        ],
        resultLabel: 'Break-even time',
        resultValue: '≈ 58 months',
      },
    };
  }

  if (route.includes('interest-only-mortgage')) {
    return {
      intro: {
        who: 'borrowers comparing interest-only payments to fully amortized payments',
        inputs: ['Loan amount', 'Interest rate', 'Interest-only period', 'Total term'],
        result: 'interest-only payment and an estimated later payment once amortization begins',
      },
      formula: {
        expression: 'Interest-Only Payment = P × (APR / 12)',
        where: [
          { symbol: 'P', meaning: 'loan principal' },
          { symbol: 'APR', meaning: 'annual interest rate (decimal)' },
        ],
        notes: ['Once amortization begins, the payment is recalculated using the standard amortization formula over the remaining term.'],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$400,000' },
          { label: 'Rate', value: '6.00%' },
        ],
        resultLabel: 'Interest-only payment',
        resultValue: '≈ $2,000/month',
      },
    };
  }

  if (route.includes('adjustable-rate-mortgage')) {
    return {
      intro: {
        who: 'borrowers estimating how an ARM payment could change after the initial fixed period',
        inputs: ['Loan amount', 'Initial rate', 'Fixed period', 'Adjusted rate', 'Total term'],
        result: 'estimated initial payment and an estimated later payment at the adjusted rate',
      },
      formula: {
        expression: 'Payment uses amortization: M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
        where: [
          { symbol: 'P', meaning: 'principal balance at that point in time' },
          { symbol: 'i', meaning: 'monthly interest rate' },
          { symbol: 'n', meaning: 'remaining number of payments' },
        ],
        notes: ['ARM adjustments depend on index + margin + caps; this calculator provides scenario estimates.'],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$400,000' },
          { label: 'Initial rate', value: '5.50%' },
          { label: 'Adjusted rate', value: '7.00%' },
          { label: 'Term', value: '30 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Payment can rise materially after the fixed period',
      },
    };
  }

  if (route.includes('heloc')) {
    return {
      intro: {
        who: 'homeowners estimating HELOC payments during draw and repayment periods',
        inputs: ['Drawn balance', 'Interest rate', 'Draw period', 'Repayment period'],
        result: 'estimated draw-period payment and repayment-period payment',
      },
      formula: {
        expression: 'Draw Payment ≈ Balance × (APR / 12); Repayment uses amortization over remaining term',
        where: [
          { symbol: 'Balance', meaning: 'outstanding drawn balance' },
          { symbol: 'APR', meaning: 'annual rate (often variable)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Drawn balance', value: '$50,000' },
          { label: 'Rate', value: '8.00%' },
        ],
        resultLabel: 'Draw payment (interest-only)',
        resultValue: '≈ $333/month',
      },
    };
  }

  if (route.includes('rent-vs-buy')) {
    return {
      intro: {
        who: 'renters and buyers comparing long-term costs under different assumptions',
        inputs: ['Monthly rent', 'Home price', 'Down payment', 'Interest rate', 'Time horizon'],
        result: 'estimated total cost comparison and a simple break-even style view',
      },
      formula: {
        expression: 'Rent Cost ≈ Rent × 12 × Years (with growth); Buy Cost ≈ Mortgage + Taxes/Insurance + Maintenance (with appreciation)',
        where: [
          { symbol: 'Years', meaning: 'comparison time horizon' },
        ],
        notes: ['Results depend heavily on assumptions (rent growth, appreciation, taxes, insurance, maintenance, and selling costs).'],
      },
      example: {
        inputs: [
          { label: 'Rent', value: '$2,400/month' },
          { label: 'Home price', value: '$420,000' },
          { label: 'Horizon', value: '7 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'The best option depends on rent growth, appreciation, and how long you stay',
      },
    };
  }

  if (route.includes('mortgage-rate-comparison')) {
    return {
      intro: {
        who: 'borrowers comparing two mortgage offers side-by-side',
        inputs: ['Loan amount', 'Rate A', 'Term A', 'Rate B', 'Term B'],
        result: 'difference in monthly payment and total interest',
      },
      formula: {
        expression: 'Compare amortized payments: M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
        where: [
          { symbol: 'P', meaning: 'loan amount' },
          { symbol: 'i', meaning: 'monthly interest rate' },
          { symbol: 'n', meaning: 'number of monthly payments' },
        ],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$350,000' },
          { label: 'Option A', value: '6.25% for 30 years' },
          { label: 'Option B', value: '5.75% for 30 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Lower rate reduces monthly payment and total interest',
      },
    };
  }

  if (route.includes('debt-to-income')) {
    return {
      intro: {
        who: 'borrowers checking eligibility for mortgages and other loans',
        inputs: ['Gross monthly income', 'Total monthly debt payments'],
        result: 'debt-to-income ratio (DTI)',
      },
      formula: {
        expression: 'DTI (%) = (Monthly Debt Payments / Gross Monthly Income) × 100',
        where: [
          { symbol: 'Monthly Debt Payments', meaning: 'loans, cards, housing, etc.' },
          { symbol: 'Gross Monthly Income', meaning: 'income before taxes' },
        ],
      },
      example: {
        inputs: [
          { label: 'Monthly debts', value: '$1,500' },
          { label: 'Monthly income', value: '$6,000' },
        ],
        resultLabel: 'DTI',
        resultValue: pct((1500 / 6000) * 100),
      },
    };
  }

  if (route.includes('simple-interest-loan')) {
    return {
      intro: {
        who: 'borrowers estimating total interest on simple-interest loans',
        inputs: ['Principal', 'Interest rate', 'Time'],
        result: 'interest amount and total repayment',
      },
      formula: {
        expression: 'Interest = P × r × t; Total = P + Interest',
        where: [
          { symbol: 'P', meaning: 'principal' },
          { symbol: 'r', meaning: 'annual rate (decimal)' },
          { symbol: 't', meaning: 'time in years' },
        ],
      },
      example: {
        inputs: [
          { label: 'Principal', value: '$5,000' },
          { label: 'Rate', value: '12%' },
          { label: 'Time', value: '2 years' },
        ],
        resultLabel: 'Interest',
        resultValue: '$1,200',
      },
    };
  }

  if (route.includes('loan') || route.includes('mortgage') || route.includes('home-equity') || route.includes('boat') || route.includes('rv') || route.includes('motorcycle') || route.includes('consolidation')) {
    return {
      intro: {
        who: 'borrowers estimating monthly payments and total interest on a fixed-rate loan',
        inputs: ['Loan amount', 'Interest rate', 'Loan term'],
        result: 'monthly payment, total interest, and total cost',
      },
      formula: {
        expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
        where: [
          { symbol: 'M', meaning: 'monthly payment' },
          { symbol: 'P', meaning: 'principal (loan amount)' },
          { symbol: 'i', meaning: 'monthly interest rate (annual / 12)' },
          { symbol: 'n', meaning: 'number of monthly payments' },
        ],
        notes: ['Total Interest ≈ (M × n) − P.'],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$25,000' },
          { label: 'Rate', value: '6.50%' },
          { label: 'Term', value: '5 years' },
        ],
        resultLabel: 'Estimated monthly payment',
        resultValue: '≈ $489',
      },
    };
  }

  if (route.includes('hourly-to-monthly')) {
    return {
      intro: {
        who: 'hourly workers converting their wage to a monthly income estimate',
        inputs: ['Hourly wage', 'Hours per week', 'Weeks per year'],
        result: 'estimated monthly income (gross)',
      },
      formula: {
        expression: 'Monthly Income = (Hourly Rate × Hours/Week × Weeks/Year) / 12',
        where: [
          { symbol: 'Hourly Rate', meaning: 'gross hourly pay' },
          { symbol: 'Weeks/Year', meaning: 'typically 52' },
        ],
      },
      example: {
        inputs: [
          { label: 'Hourly wage', value: '$25' },
          { label: 'Hours/week', value: '40' },
          { label: 'Weeks/year', value: '52' },
        ],
        resultLabel: 'Monthly income',
        resultValue: money(((25 * 40 * 52) / 12)),
      },
    };
  }

  if (route.includes('monthly-to-hourly')) {
    return {
      intro: {
        who: 'workers converting monthly income to an hourly rate estimate',
        inputs: ['Monthly income', 'Hours per week', 'Weeks per year'],
        result: 'estimated hourly wage',
      },
      formula: {
        expression: 'Hourly Rate = (Monthly Income × 12) / (Hours/Week × Weeks/Year)',
        where: [
          { symbol: 'Monthly Income', meaning: 'gross monthly income' },
        ],
      },
      example: {
        inputs: [
          { label: 'Monthly income', value: '$5,000' },
          { label: 'Hours/week', value: '40' },
          { label: 'Weeks/year', value: '52' },
        ],
        resultLabel: 'Hourly rate',
        resultValue: money((5000 * 12) / (40 * 52)),
      },
    };
  }

  if (route.includes('weekly-pay')) {
    return {
      intro: {
        who: 'employees converting salary or hourly income into a weekly estimate',
        inputs: ['Annual salary (or hourly wage)', 'Hours per week', 'Weeks per year'],
        result: 'estimated weekly gross pay',
      },
      formula: {
        expression: 'Weekly Pay = Annual Salary / Weeks per Year',
        where: [{ symbol: 'Weeks per Year', meaning: 'typically 52 (adjust for unpaid time off)' }],
      },
      example: {
        inputs: [
          { label: 'Annual salary', value: '$78,000' },
          { label: 'Weeks/year', value: '52' },
        ],
        resultLabel: 'Weekly pay',
        resultValue: money(78000 / 52),
      },
    };
  }

  if (route.includes('biweekly-pay')) {
    return {
      intro: {
        who: 'employees estimating biweekly pay and comparing pay frequencies',
        inputs: ['Annual salary', 'Pay frequency'],
        result: 'estimated gross pay per pay period',
      },
      formula: {
        expression: 'Biweekly Pay = Annual Salary / 26',
        where: [{ symbol: '26', meaning: 'biweekly pay periods per year' }],
      },
      example: {
        inputs: [{ label: 'Annual salary', value: '$78,000' }],
        resultLabel: 'Biweekly pay',
        resultValue: money(78000 / 26),
      },
    };
  }

  if (route.includes('monthly-salary')) {
    return {
      intro: {
        who: 'employees converting annual salary to monthly income for budgeting',
        inputs: ['Annual salary'],
        result: 'estimated gross monthly income',
      },
      formula: {
        expression: 'Monthly Salary = Annual Salary / 12',
        where: [{ symbol: '12', meaning: 'months per year' }],
      },
      example: {
        inputs: [{ label: 'Annual salary', value: '$84,000' }],
        resultLabel: 'Monthly salary',
        resultValue: money(84000 / 12),
      },
    };
  }

  if (route.includes('time-and-a-half')) {
    return {
      intro: {
        who: 'hourly workers calculating overtime pay at time-and-a-half',
        inputs: ['Hourly rate', 'Overtime hours'],
        result: 'overtime pay and total pay for the period',
      },
      formula: {
        expression: 'Overtime Pay = Hourly Rate × 1.5 × Overtime Hours',
        where: [
          { symbol: '1.5', meaning: 'time-and-a-half multiplier' },
        ],
      },
      example: {
        inputs: [
          { label: 'Hourly rate', value: '$22' },
          { label: 'Overtime hours', value: '10' },
        ],
        resultLabel: 'Overtime pay',
        resultValue: money(22 * 1.5 * 10),
      },
    };
  }

  if (route.includes('overtime')) {
    return {
      intro: {
        who: 'workers estimating overtime earnings under different multipliers',
        inputs: ['Hourly rate', 'Overtime hours', 'Overtime multiplier'],
        result: 'overtime earnings and combined total pay',
      },
      formula: {
        expression: 'Overtime Pay = Hourly Rate × Overtime Multiplier × Overtime Hours',
        where: [
          { symbol: 'Overtime Multiplier', meaning: 'often 1.5× or 2×' },
        ],
      },
      example: {
        inputs: [
          { label: 'Hourly rate', value: '$22' },
          { label: 'OT hours', value: '10' },
          { label: 'Multiplier', value: '1.5×' },
        ],
        resultLabel: 'Overtime pay',
        resultValue: money(22 * 1.5 * 10),
      },
    };
  }

  if (route.includes('salary-increase')) {
    return {
      intro: {
        who: 'employees evaluating the impact of a raise on annual and monthly pay',
        inputs: ['Current salary', 'New salary (or raise %)', 'Hours per week (optional)'],
        result: 'salary increase amount and percent change',
      },
      formula: {
        expression: 'Raise (%) = (New Salary − Old Salary) / Old Salary × 100',
        where: [
          { symbol: 'Old Salary', meaning: 'current salary' },
          { symbol: 'New Salary', meaning: 'salary after raise' },
        ],
      },
      example: {
        inputs: [
          { label: 'Old salary', value: '$80,000' },
          { label: 'New salary', value: '$88,000' },
        ],
        resultLabel: 'Raise',
        resultValue: '10.00%',
      },
    };
  }

  if (route.includes('bonus') || route.includes('commission')) {
    return {
      intro: {
        who: 'employees estimating variable compensation and total earnings',
        inputs: ['Base pay', 'Bonus or commission rate', 'Sales volume (for commission)'],
        result: 'estimated variable pay and total compensation',
      },
      formula: {
        expression: 'Total Compensation = Base Pay + Bonus (or Commission)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Base', value: '$70,000' },
          { label: 'Bonus', value: '$8,000' },
        ],
        resultLabel: 'Total compensation',
        resultValue: '$78,000',
      },
    };
  }

  if (route.includes('future-value')) {
    return {
      intro: {
        who: 'investors projecting growth with a return rate and recurring contributions',
        inputs: ['Starting amount', 'Return rate', 'Years', 'Monthly contribution (optional)'],
        result: 'future value and total growth over time',
      },
      formula: {
        expression: 'FV = PV(1 + r)^n + PMT × [ ((1 + r)^n − 1) / r ]',
        where: [
          { symbol: 'FV', meaning: 'future value' },
          { symbol: 'PV', meaning: 'present value (starting amount)' },
          { symbol: 'PMT', meaning: 'periodic contribution' },
          { symbol: 'r', meaning: 'periodic return rate' },
          { symbol: 'n', meaning: 'number of periods' },
        ],
      },
      example: {
        inputs: [
          { label: 'Starting amount', value: '$10,000' },
          { label: 'Contribution', value: '$300/month' },
          { label: 'Return', value: '7%/year' },
          { label: 'Time', value: '20 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Balance grows significantly with time + contributions',
      },
    };
  }

  if (route.includes('net-present-value')) {
    return {
      intro: {
        who: 'investors evaluating projects using a required return (discount rate)',
        inputs: ['Initial investment', 'Annual cash flow', 'Years', 'Discount rate', 'Terminal value (optional)'],
        result: 'net present value (NPV) in today’s dollars',
      },
      formula: {
        expression: 'NPV = −I₀ + Σ [ CF_t / (1 + r)^t ]',
        where: [
          { symbol: 'I₀', meaning: 'initial investment (cash outflow)' },
          { symbol: 'CF_t', meaning: 'cash flow in year t' },
          { symbol: 'r', meaning: 'discount rate (required return)' },
          { symbol: 't', meaning: 'year number (1..n)' },
        ],
        notes: ['Positive NPV can indicate the investment exceeds the required return at the chosen discount rate.'],
      },
      example: {
        inputs: [
          { label: 'Initial investment', value: '$100,000' },
          { label: 'Cash flow', value: '$18,000/year' },
          { label: 'Years', value: '10' },
          { label: 'Discount rate', value: '8%' },
        ],
        resultLabel: 'Interpretation',
        resultValue: 'If NPV is positive, the project clears the 8% hurdle rate',
      },
    };
  }

  if (route.includes('present-value')) {
    return {
      intro: {
        who: 'planners discounting a future amount into today’s dollars',
        inputs: ['Future value', 'Discount rate', 'Years'],
        result: 'present value today',
      },
      formula: {
        expression: 'PV = FV / (1 + r)^n',
        where: [
          { symbol: 'PV', meaning: 'present value' },
          { symbol: 'FV', meaning: 'future value' },
          { symbol: 'r', meaning: 'annual discount rate (decimal)' },
          { symbol: 'n', meaning: 'years' },
        ],
      },
      example: {
        inputs: [
          { label: 'Future value', value: '$50,000' },
          { label: 'Discount rate', value: '6%' },
          { label: 'Years', value: '10' },
        ],
        resultLabel: 'Present value',
        resultValue: '≈ $27,919',
      },
    };
  }

  if (route.includes('cagr')) {
    return {
      intro: {
        who: 'investors comparing growth over different time periods',
        inputs: ['Starting value', 'Ending value', 'Years'],
        result: 'compound annual growth rate (CAGR)',
      },
      formula: {
        expression: 'CAGR = (Ending / Starting)^(1 / Years) − 1',
        where: [
          { symbol: 'Starting', meaning: 'starting value' },
          { symbol: 'Ending', meaning: 'ending value' },
          { symbol: 'Years', meaning: 'investment horizon in years' },
        ],
      },
      example: {
        inputs: [
          { label: 'Starting value', value: '$10,000' },
          { label: 'Ending value', value: '$18,000' },
          { label: 'Years', value: '5' },
        ],
        resultLabel: 'CAGR',
        resultValue: '≈ 12.48%',
      },
    };
  }

  if (route.includes('rule-of-72')) {
    return {
      intro: {
        who: 'investors wanting a quick estimate of doubling time',
        inputs: ['Annual return rate'],
        result: 'estimated years to double',
      },
      formula: {
        expression: 'Years to Double ≈ 72 / (Annual Return %)',
        where: [{ symbol: '72', meaning: 'rule-of-thumb constant' }],
      },
      example: {
        inputs: [{ label: 'Return rate', value: '8%' }],
        resultLabel: 'Years to double',
        resultValue: '≈ 9 years',
      },
    };
  }

  if (route.includes('dividend-yield')) {
    return {
      intro: {
        who: 'income investors comparing dividend stocks or funds',
        inputs: ['Annual dividend per share', 'Share price'],
        result: 'dividend yield percentage',
      },
      formula: {
        expression: 'Dividend Yield (%) = (Annual Dividend / Price) × 100',
        where: [
          { symbol: 'Annual Dividend', meaning: 'dividend paid per share per year' },
          { symbol: 'Price', meaning: 'current share price' },
        ],
      },
      example: {
        inputs: [
          { label: 'Annual dividend', value: '$2.40' },
          { label: 'Share price', value: '$60' },
        ],
        resultLabel: 'Dividend yield',
        resultValue: '4.00%',
      },
    };
  }

  if (route.includes('dividend-growth')) {
    return {
      intro: {
        who: 'investors projecting future dividend income',
        inputs: ['Starting dividend', 'Dividend growth rate', 'Years'],
        result: 'projected dividend amount in future years',
      },
      formula: {
        expression: 'Future Dividend = Current Dividend × (1 + g)^n',
        where: [
          { symbol: 'g', meaning: 'annual dividend growth rate (decimal)' },
          { symbol: 'n', meaning: 'years' },
        ],
      },
      example: {
        inputs: [
          { label: 'Current dividend', value: '$2.00' },
          { label: 'Growth rate', value: '7%' },
          { label: 'Years', value: '10' },
        ],
        resultLabel: 'Projected dividend',
        resultValue: '≈ $3.93',
      },
    };
  }

  if (route.includes('dividend-reinvestment')) {
    return {
      intro: {
        who: 'investors modeling long-term growth with dividend reinvestment',
        inputs: ['Starting balance', 'Dividend yield', 'Dividend growth', 'Years', 'Return assumptions'],
        result: 'estimated ending balance and dividend income growth',
      },
      formula: {
        expression: 'Estimated growth combines price return + dividend yield; reinvested dividends increase shares over time',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Starting balance', value: '$25,000' },
          { label: 'Yield', value: '3%' },
          { label: 'Years', value: '20' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Reinvestment can materially increase ending value vs. taking dividends as cash',
      },
    };
  }

  if (route.includes('expense-ratio') || route.includes('investment-fees')) {
    return {
      intro: {
        who: 'investors comparing funds and understanding the drag from fees',
        inputs: ['Starting balance', 'Contribution', 'Return rate', 'Fee rate', 'Years'],
        result: 'estimated ending balance with and without fees',
      },
      formula: {
        expression: 'Net Return ≈ Gross Return − Fee Rate (simplified)',
        where: [
          { symbol: 'Fee Rate', meaning: 'expense ratio or advisory fee as a percent' },
        ],
        notes: ['Fees compound over time because they reduce the base that continues compounding.'],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$100,000' },
          { label: 'Return', value: '7%' },
          { label: 'Fees', value: '1%' },
          { label: 'Years', value: '25' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Even small annual fees can reduce long-term growth substantially',
      },
    };
  }

  if (route.includes('inflation-adjusted-return') || route.includes('real-return')) {
    return {
      intro: {
        who: 'investors comparing returns in real buying-power terms',
        inputs: ['Nominal return', 'Inflation rate'],
        result: 'real return rate after inflation',
      },
      formula: {
        expression: 'Real Return ≈ (1 + Nominal) / (1 + Inflation) − 1',
        where: [
          { symbol: 'Nominal', meaning: 'stated return rate (decimal)' },
          { symbol: 'Inflation', meaning: 'inflation rate (decimal)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Nominal return', value: '8%' },
          { label: 'Inflation', value: '3%' },
        ],
        resultLabel: 'Real return',
        resultValue: '≈ 4.85%',
      },
    };
  }

  if (route.includes('stock-average-price')) {
    return {
      intro: {
        who: 'investors averaging into a position across multiple buys',
        inputs: ['Share purchases (shares and price per share)'],
        result: 'average cost per share and total shares owned',
      },
      formula: {
        expression: 'Average Cost = Total Cost / Total Shares',
        where: [
          { symbol: 'Total Cost', meaning: 'sum of (shares × price) across buys' },
          { symbol: 'Total Shares', meaning: 'sum of shares purchased' },
        ],
      },
      example: {
        inputs: [
          { label: 'Buy 1', value: '10 shares at $50' },
          { label: 'Buy 2', value: '15 shares at $40' },
        ],
        resultLabel: 'Average cost',
        resultValue: '$44.00/share',
      },
    };
  }

  if (route.includes('annuity-payout')) {
    return {
      intro: {
        who: 'retirees estimating a monthly payout from an annuity balance',
        inputs: ['Annuity balance', 'Interest rate', 'Payout years'],
        result: 'estimated monthly payout',
      },
      formula: {
        expression: 'PMT = PV × r / (1 − (1 + r)^−n)',
        where: [
          { symbol: 'PMT', meaning: 'monthly payout' },
          { symbol: 'PV', meaning: 'present value (balance)' },
          { symbol: 'r', meaning: 'monthly rate' },
          { symbol: 'n', meaning: 'number of payments (months)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$250,000' },
          { label: 'Rate', value: '4%/year' },
          { label: 'Term', value: '20 years' },
        ],
        resultLabel: 'Estimated payout',
        resultValue: '≈ $1,515/month',
      },
    };
  }

  if (route.includes('annuity')) {
    return {
      intro: {
        who: 'savers projecting growth with steady contributions over time',
        inputs: ['Starting balance', 'Contribution', 'Return rate', 'Time'],
        result: 'future value based on contributions and compounding',
      },
      formula: {
        expression: 'FV = PV(1 + r)^n + PMT × [ ((1 + r)^n − 1) / r ]',
        where: [
          { symbol: 'PV', meaning: 'starting balance' },
          { symbol: 'PMT', meaning: 'periodic payment' },
          { symbol: 'r', meaning: 'periodic return rate' },
          { symbol: 'n', meaning: 'number of periods' },
        ],
      },
      example: {
        inputs: [
          { label: 'Starting balance', value: '$5,000' },
          { label: 'Contribution', value: '$250/month' },
          { label: 'Rate', value: '6%/year' },
          { label: 'Time', value: '15 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Balance grows with consistent contributions and time',
      },
    };
  }

  if (route.includes('payback-period')) {
    return {
      intro: {
        who: 'business owners and investors evaluating how quickly an investment recoups its cost',
        inputs: ['Initial investment', 'Annual cash flow'],
        result: 'payback period in years',
      },
      formula: {
        expression: 'Payback Period (years) = Initial Investment / Annual Cash Flow',
        where: [
          { symbol: 'Annual Cash Flow', meaning: 'net annual cash generated by the investment' },
        ],
      },
      example: {
        inputs: [
          { label: 'Initial cost', value: '$50,000' },
          { label: 'Annual cash flow', value: '$12,500' },
        ],
        resultLabel: 'Payback period',
        resultValue: '4 years',
      },
    };
  }

  if (route.includes('savings-goal')) {
    return {
      intro: {
        who: 'savers planning how much to set aside each month to reach a target',
        inputs: ['Goal amount', 'Current savings', 'Time horizon', 'Interest rate (optional)'],
        result: 'required monthly savings amount',
      },
      formula: {
        expression: 'PMT = (FV − PV(1 + r)^n) × r / ((1 + r)^n − 1)',
        where: [
          { symbol: 'FV', meaning: 'goal amount' },
          { symbol: 'PV', meaning: 'current savings' },
          { symbol: 'r', meaning: 'monthly interest rate' },
          { symbol: 'n', meaning: 'number of months' },
        ],
      },
      example: {
        inputs: [
          { label: 'Goal', value: '$10,000' },
          { label: 'Current', value: '$1,000' },
          { label: 'Time', value: '24 months' },
        ],
        resultLabel: 'Required savings',
        resultValue: '≈ $375/month',
      },
    };
  }

  if (route.includes('sinking-fund')) {
    return {
      intro: {
        who: 'people planning for an upcoming expense without using credit',
        inputs: ['Target amount', 'Months until needed'],
        result: 'monthly amount to set aside',
      },
      formula: {
        expression: 'Monthly Sinking Fund = Target Amount / Months',
        where: [
          { symbol: 'Target Amount', meaning: 'planned expense amount' },
          { symbol: 'Months', meaning: 'months until you need the money' },
        ],
      },
      example: {
        inputs: [
          { label: 'Target', value: '$2,400' },
          { label: 'Timeline', value: '12 months' },
        ],
        resultLabel: 'Monthly amount',
        resultValue: '$200/month',
      },
    };
  }

  if (route.includes('debt-snowball') || route.includes('debt-avalanche') || route.includes('debt-payoff')) {
    return {
      intro: {
        who: 'borrowers paying off multiple balances using a focused payoff strategy',
        inputs: ['Debt balances', 'Interest rates', 'Minimum payments', 'Extra payment'],
        result: 'estimated payoff timeline and total interest',
      },
      formula: {
        expression: 'Monthly Interest = Balance × (APR / 12); Principal Paid = Payment − Interest',
        where: [
          { symbol: 'APR', meaning: 'annual percentage rate' },
        ],
        notes: ['Snowball targets smallest balances; avalanche targets highest APR.'],
      },
      example: {
        inputs: [
          { label: 'Debt A', value: '$5,000 at 22.9% APR' },
          { label: 'Debt B', value: '$15,000 at 5.5% APR' },
          { label: 'Extra payment', value: '$300/month' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Extra payments reduce payoff time and interest dramatically',
      },
    };
  }

  if (route.includes('bill-split')) {
    return {
      intro: {
        who: 'friends and roommates splitting bills fairly',
        inputs: ['Bill amount', 'Tip percentage (optional)', 'Number of people'],
        result: 'per-person total and tip amount',
      },
      formula: {
        expression: 'Tip Amount = Bill × Tip%; Total = Bill + Tip Amount; Per Person = Total / People',
        where: [
          { symbol: 'Bill', meaning: 'the amount you want to split (often the subtotal before tip)' },
          { symbol: 'Tip%', meaning: 'tip rate as a decimal' },
          { symbol: 'People', meaning: 'number of people splitting the bill' },
        ],
        notes: ['This calculator assumes an equal split.', 'To include tax or service fees, add them into the bill amount before calculating.'],
      },
      example: {
        inputs: [
          { label: 'Bill amount', value: '$86.40' },
          { label: 'Tip', value: '20%' },
          { label: 'People', value: '3' },
        ],
        resultLabel: 'Per person total',
        resultValue: '≈ $34.56',
        note: 'If your receipt includes tax or a fixed service fee, add those into the bill amount you enter so the split matches what was paid.',
      },
    };
  }

  if (route.includes('paycheck')) {
    return {
      intro: {
        who: 'employees estimating net pay from a single paycheck',
        inputs: ['Gross pay', 'Pre-tax deductions', 'Filing info', 'State/location (if applicable)', 'Post-tax deductions'],
        result: 'estimated net (take-home) pay and an effective withholding picture',
      },
      formula: {
        expression: 'Net Pay = Gross Pay − Pre-Tax Deductions − Taxes − Post-Tax Deductions',
        where: [
          { symbol: 'Pre-Tax Deductions', meaning: '401(k), HSA, and certain benefits (varies by plan)' },
          { symbol: 'Taxes', meaning: 'estimated federal, state, and payroll taxes (withholding)' },
          { symbol: 'Post-Tax Deductions', meaning: 'items deducted after tax, such as some insurance or garnishments' },
        ],
        notes: ['Tax withholding is an estimate. Actual pay can vary by bonuses, overtime, and benefits setup.'],
      },
      example: {
        inputs: [
          { label: 'Gross pay', value: '$2,500 (biweekly)' },
          { label: 'Pre-tax deductions', value: '$150' },
          { label: 'Estimated taxes', value: '$520' },
          { label: 'Post-tax deductions', value: '$80' },
        ],
        resultLabel: 'Estimated net pay',
        resultValue: '≈ $1,750',
        note: 'Use a recent pay stub to mirror real deductions. Small differences are normal due to withholding and rounding.',
      },
    };
  }

  if (route.includes('take-home-pay')) {
    return {
      intro: {
        who: 'budgeters and job seekers converting gross pay into take-home pay',
        inputs: ['Income amount', 'Pay frequency', 'Tax assumptions', 'Deductions and benefits'],
        result: 'estimated net pay by pay period and over a year',
      },
      formula: {
        expression: 'Take-Home Pay = Gross Pay − Estimated Taxes − Deductions',
        where: [
          { symbol: 'Estimated Taxes', meaning: 'withholding estimates based on the assumptions you enter' },
          { symbol: 'Deductions', meaning: 'benefits and contributions (pre-tax or post-tax depending on type)' },
        ],
        notes: ['Changing pay frequency can change withholding and per-check amounts, even if annual pay is the same.'],
      },
      example: {
        inputs: [
          { label: 'Gross pay', value: '$60,000/year' },
          { label: 'Pay frequency', value: 'Biweekly (26 checks)' },
          { label: 'Estimated taxes', value: '$12,600/year' },
          { label: 'Deductions', value: '$3,120/year' },
        ],
        resultLabel: 'Estimated take-home',
        resultValue: '≈ $44,280/year (≈ $1,703/check)',
        note: 'For best results, enter deductions you actually see on a pay stub (health insurance, retirement, HSA, etc.).',
      },
    };
  }

  if (route.includes('after-tax-income')) {
    return {
      intro: {
        who: 'people comparing income after taxes across scenarios or locations',
        inputs: ['Gross income', 'Filing assumptions', 'State/location (if applicable)', 'Other tax inputs'],
        result: 'estimated after-tax income and effective tax rate',
      },
      formula: {
        expression: 'After-Tax Income = Gross Income − Total Taxes; Effective Tax Rate = Total Taxes / Gross Income',
        where: [
          { symbol: 'Total Taxes', meaning: 'estimated combined taxes based on your assumptions' },
        ],
        notes: ['This is an estimate for planning, not official tax advice. Real outcomes depend on deductions, credits, and local rules.'],
      },
      example: {
        inputs: [
          { label: 'Gross income', value: '$100,000/year' },
          { label: 'Estimated total taxes', value: '$24,000' },
        ],
        resultLabel: 'After-tax income',
        resultValue: '$76,000/year',
        note: 'Effective tax rate in this example is 24%. Your marginal bracket can be higher than your effective rate.',
      },
    };
  }

  if (route.includes('savings-rate')) {
    return {
      intro: {
        who: 'anyone tracking financial progress and goal speed',
        inputs: ['Monthly income', 'Monthly expenses'],
        result: 'savings rate percentage',
      },
      formula: {
        expression: 'Savings Rate (%) = (Income − Expenses) / Income × 100',
        where: [
          { symbol: 'Income', meaning: 'monthly take-home or gross income (be consistent)' },
          { symbol: 'Expenses', meaning: 'monthly spending' },
        ],
      },
      example: {
        inputs: [
          { label: 'Income', value: '$5,000' },
          { label: 'Expenses', value: '$3,500' },
        ],
        resultLabel: 'Savings rate',
        resultValue: '30.00%',
      },
    };
  }

  if (route.includes('net-income')) {
    return {
      intro: {
        who: 'budgeters who want a clean net-income number for planning',
        inputs: ['Gross income', 'Estimated taxes', 'Deductions'],
        result: 'net income after taxes and deductions',
      },
      formula: {
        expression: 'Net Income = Gross Income − Taxes − Deductions',
        where: [
          { symbol: 'Taxes', meaning: 'estimated total taxes' },
          { symbol: 'Deductions', meaning: 'benefits, retirement contributions, etc.' },
        ],
      },
      example: {
        inputs: [
          { label: 'Gross', value: '$6,500/month' },
          { label: 'Taxes', value: '$1,600' },
          { label: 'Deductions', value: '$400' },
        ],
        resultLabel: 'Net income',
        resultValue: '$4,500/month',
      },
    };
  }

  if (route.includes('sales-tax')) {
    return {
      intro: {
        who: 'shoppers and business owners calculating total checkout price',
        inputs: ['Price', 'Sales tax rate'],
        result: 'sales tax amount and total price',
      },
      formula: {
        expression: 'Sales Tax = Price × Tax Rate; Total = Price + Sales Tax',
        where: [
          { symbol: 'Tax Rate', meaning: 'sales tax rate as a decimal' },
        ],
      },
      example: {
        inputs: [
          { label: 'Price', value: '$100' },
          { label: 'Tax rate', value: '8%' },
        ],
        resultLabel: 'Total',
        resultValue: '$108',
      },
    };
  }

  if (route.includes('capital-gains-tax')) {
    return {
      intro: {
        who: 'investors estimating gains and taxes before selling',
        inputs: ['Buy price', 'Sell price', 'Shares', 'Tax rate'],
        result: 'capital gain and estimated tax owed',
      },
      formula: {
        expression: 'Gain = (Sell Price − Buy Price) × Shares; Tax = Gain × Tax Rate',
        where: [
          { symbol: 'Tax Rate', meaning: 'your estimated capital gains tax rate' },
        ],
      },
      example: {
        inputs: [
          { label: 'Buy price', value: '$50' },
          { label: 'Sell price', value: '$75' },
          { label: 'Shares', value: '100' },
          { label: 'Tax rate', value: '15%' },
        ],
        resultLabel: 'Estimated tax',
        resultValue: '$375',
      },
    };
  }

  if (route.includes('effective-tax-rate')) {
    return {
      intro: {
        who: 'anyone who wants a simple view of taxes as a percent of income',
        inputs: ['Total taxes paid', 'Total income'],
        result: 'effective tax rate percentage',
      },
      formula: {
        expression: 'Effective Tax Rate (%) = Total Taxes / Total Income × 100',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Taxes paid', value: '$18,000' },
          { label: 'Income', value: '$90,000' },
        ],
        resultLabel: 'Effective tax rate',
        resultValue: '20.00%',
      },
    };
  }

  if (route.includes('income-tax') || route.includes('self-employment-tax')) {
    return {
      intro: {
        who: 'taxpayers estimating federal tax and payroll taxes for planning purposes',
        inputs: ['Income', 'Filing status', 'Deductions (optional)'],
        result: 'estimated tax and effective tax rate',
      },
      formula: {
        expression: 'Estimated Tax = Progressive Brackets on Taxable Income; Effective Rate = Tax / Income',
        where: [
          { symbol: 'Taxable Income', meaning: 'income after deductions (e.g., standard deduction)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Income', value: '$90,000' },
          { label: 'Filing status', value: 'Single' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Tax is progressive; effective rate is lower than top bracket',
      },
    };
  }

  if (route.includes('credit-utilization')) {
    return {
      intro: {
        who: 'credit card users tracking utilization across accounts',
        inputs: ['Card balances', 'Credit limits'],
        result: 'overall utilization percentage',
      },
      formula: {
        expression: 'Utilization (%) = Total Balances / Total Limits × 100',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Balances', value: '$2,000' },
          { label: 'Limits', value: '$10,000' },
        ],
        resultLabel: 'Utilization',
        resultValue: '20.00%',
      },
    };
  }

  if (route.includes('balance-transfer')) {
    return {
      intro: {
        who: 'credit card users comparing a promo balance transfer to their current APR',
        inputs: ['Current balance', 'Current APR', 'Transfer APR', 'Transfer fee', 'Monthly payment'],
        result: 'estimated interest savings and payoff timeline comparison',
      },
      formula: {
        expression: 'Savings ≈ (Interest at Current APR) − (Interest at Transfer APR + Transfer Fee)',
        where: [
          { symbol: 'Transfer Fee', meaning: 'one-time fee, often 3%–5% of balance' },
        ],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$6,000' },
          { label: 'Current APR', value: '22%' },
          { label: 'Transfer APR', value: '0% (intro)' },
          { label: 'Fee', value: '3%' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Transfers can save interest if you pay down the balance during the promo period',
      },
    };
  }

  if (route.includes('credit-card-minimum-payment')) {
    return {
      intro: {
        who: 'credit card users estimating the cost of paying only the minimum',
        inputs: ['Balance', 'APR', 'Minimum payment rule'],
        result: 'estimated payoff time and total interest',
      },
      formula: {
        expression: 'Monthly Interest = Balance × (APR / 12); Payment reduces principal by (Payment − Interest)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$5,000' },
          { label: 'APR', value: '20%' },
          { label: 'Min payment', value: '2% of balance' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Minimum payments extend payoff time and increase total interest',
      },
    };
  }

  if (route.includes('credit-card-interest')) {
    return {
      intro: {
        who: 'credit card users estimating interest charges under different payments',
        inputs: ['Balance', 'APR', 'Monthly payment'],
        result: 'interest paid and payoff timeline estimate',
      },
      formula: {
        expression: 'Monthly Interest = Balance × (APR / 12)',
        where: [
          { symbol: 'APR', meaning: 'annual percentage rate' },
        ],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$3,000' },
          { label: 'APR', value: '24%' },
        ],
        resultLabel: 'Monthly interest (starting)',
        resultValue: '≈ $60',
      },
    };
  }

  if (route.includes('four-percent-rule')) {
    return {
      intro: {
        who: 'retirees estimating a sustainable withdrawal amount from a portfolio',
        inputs: ['Portfolio balance', 'Withdrawal rate (optional)'],
        result: 'estimated annual and monthly withdrawal',
      },
      formula: {
        expression: 'Annual Withdrawal = Portfolio × 0.04; Monthly Withdrawal = Annual / 12',
        where: [{ symbol: '0.04', meaning: '4% rule baseline' }],
      },
      example: {
        inputs: [{ label: 'Portfolio', value: '$1,000,000' }],
        resultLabel: 'Annual withdrawal',
        resultValue: '$40,000',
      },
    };
  }

  if (route.includes('fire-calculator')) {
    return {
      intro: {
        who: 'planners pursuing financial independence and early retirement',
        inputs: ['Annual expenses', 'Safe withdrawal rate (SWR)', 'Savings rate'],
        result: 'estimated FIRE number and progress toward the goal',
      },
      formula: {
        expression: 'FIRE Number = Annual Expenses / SWR',
        where: [
          { symbol: 'SWR', meaning: 'safe withdrawal rate (e.g., 4% = 0.04)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Annual expenses', value: '$48,000' },
          { label: 'SWR', value: '4%' },
        ],
        resultLabel: 'FIRE number',
        resultValue: '$1,200,000',
      },
    };
  }

  if (route.includes('pension')) {
    return {
      intro: {
        who: 'employees estimating pension benefits based on plan assumptions',
        inputs: ['Final salary', 'Years of service', 'Accrual rate'],
        result: 'estimated annual and monthly pension benefit',
      },
      formula: {
        expression: 'Annual Pension = Final Salary × Accrual Rate × Years of Service',
        where: [
          { symbol: 'Accrual Rate', meaning: 'plan accrual rate (e.g., 1.5% = 0.015)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Final salary', value: '$90,000' },
          { label: 'Years', value: '25' },
          { label: 'Accrual', value: '1.5%' },
        ],
        resultLabel: 'Annual pension',
        resultValue: '$33,750',
      },
    };
  }

  if (route.includes('rmd')) {
    return {
      intro: {
        who: 'retirees estimating required minimum distributions from retirement accounts',
        inputs: ['Account balance', 'Age'],
        result: 'estimated RMD amount based on a life expectancy divisor',
      },
      formula: {
        expression: 'RMD = Account Balance / Divisor (by age)',
        where: [
          { symbol: 'Divisor', meaning: 'IRS Uniform Lifetime Table divisor' },
        ],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$500,000' },
          { label: 'Age', value: '75' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'RMD increases gradually with age as the divisor decreases',
      },
    };
  }

  if (route.includes('ira') || route.includes('roth-ira')) {
    return {
      intro: {
        who: 'savers projecting retirement account growth with annual contributions',
        inputs: ['Starting balance', 'Annual contribution', 'Return rate', 'Years'],
        result: 'estimated future account balance',
      },
      formula: {
        expression: 'FV = PV(1 + r)^n + PMT × [ ((1 + r)^n − 1) / r ]',
        where: [
          { symbol: 'PV', meaning: 'starting balance' },
          { symbol: 'PMT', meaning: 'periodic contribution' },
          { symbol: 'r', meaning: 'periodic return rate' },
          { symbol: 'n', meaning: 'number of periods' },
        ],
      },
      example: {
        inputs: [
          { label: 'Starting balance', value: '$15,000' },
          { label: 'Contribution', value: '$6,000/year' },
          { label: 'Return', value: '7%/year' },
          { label: 'Time', value: '20 years' },
        ],
        resultLabel: 'Typical outcome',
        resultValue: 'Compounding plus contributions can create large long-term growth',
      },
    };
  }

  if (route.includes('va-loan')) {
    return {
      intro: {
        who: 'veterans and service members estimating VA loan payments with $0 down options',
        inputs: ['Home price', 'VA funding fee', 'Interest rate', 'Loan term'],
        result: 'monthly payment and total loan cost',
      },
      formula: {
        expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
        where: [
          { symbol: 'P', meaning: 'loan amount (including funding fee)' },
          { symbol: 'i', meaning: 'monthly interest rate' },
          { symbol: 'n', meaning: 'number of months' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home price', value: '$400,000' },
          { label: 'Down payment', value: '$0' },
          { label: 'Rate', value: '6.25%' },
        ],
        resultLabel: 'Estimated monthly payment',
        resultValue: '≈ $2,463',
      },
    };
  }

  if (route.includes('fha-loan')) {
    return {
      intro: {
        who: 'homebuyers estimating FHA loan payments with low down payment options',
        inputs: ['Home price', 'Down payment (min 3.5%)', 'MIP rate', 'Interest rate'],
        result: 'monthly payment including mortgage insurance (MIP)',
      },
      formula: {
        expression: 'Total Payment = P&I + Monthly MIP',
        where: [
          { symbol: 'P&I', meaning: 'principal and interest payment' },
          { symbol: 'MIP', meaning: 'mortgage insurance premium' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home price', value: '$300,000' },
          { label: 'Down payment', value: '3.5% ($10,500)' },
          { label: 'Rate', value: '6.5%' },
        ],
        resultLabel: 'Monthly payment (P&I + MIP)',
        resultValue: '≈ $2,015',
      },
    };
  }

  if (route.includes('reverse-mortgage')) {
    return {
      intro: {
        who: 'homeowners 62+ estimating how much equity they can access',
        inputs: ['Home value', 'Current mortgage balance', 'Age of youngest borrower', 'Interest rate'],
        result: 'estimated principal limit (available funds)',
      },
      formula: {
        expression: 'Principal Limit = Home Value × PLF (Principal Limit Factor)',
        where: [
          { symbol: 'PLF', meaning: 'factor based on age and expected interest rate' },
        ],
      },
      example: {
        inputs: [
          { label: 'Home value', value: '$500,000' },
          { label: 'Age', value: '70' },
        ],
        resultLabel: 'Estimated available funds',
        resultValue: '≈ $250,000',
      },
    };
  }

  if (route.includes('student-loan-refinance')) {
    return {
      intro: {
        who: 'graduates comparing current student loan rates to refinance offers',
        inputs: ['Current balance', 'Current rate', 'New rate', 'New term'],
        result: 'monthly savings and total interest savings',
      },
      formula: {
        expression: 'Savings = (Current Total Interest) − (New Total Interest)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Balance', value: '$40,000' },
          { label: 'Current rate', value: '6.8%' },
          { label: 'New rate', value: '4.5%' },
        ],
        resultLabel: 'Monthly savings',
        resultValue: '≈ $45',
      },
    };
  }

  if (route.includes('parent-plus-loan')) {
    return {
      intro: {
        who: 'parents estimating federal Parent PLUS loan payments',
        inputs: ['Loan amount', 'Interest rate', 'Origination fee', 'Term'],
        result: 'monthly payment and total interest',
      },
      formula: {
        expression: 'M = P × [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]',
        where: [
          { symbol: 'P', meaning: 'loan amount (after fees)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Loan amount', value: '$20,000' },
          { label: 'Rate', value: '9.08% (2024 rate)' },
        ],
        resultLabel: 'Monthly payment',
        resultValue: '≈ $254',
      },
    };
  }

  if (route.includes('estate-tax')) {
    return {
      intro: {
        who: 'individuals estimating federal estate tax liability',
        inputs: ['Total estate value', 'Filing year', 'Exemption amount'],
        result: 'estimated federal estate tax owed',
      },
      formula: {
        expression: 'Tax = (Estate Value − Exemption) × Tax Rate',
        where: [
          { symbol: 'Exemption', meaning: 'federal exemption limit ($13.61M in 2024)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Estate value', value: '$15,000,000' },
          { label: 'Exemption', value: '$13,610,000' },
        ],
        resultLabel: 'Estimated federal tax',
        resultValue: '≈ $556,000',
      },
    };
  }

  if (route.includes('inheritance-tax')) {
    return {
      intro: {
        who: 'beneficiaries estimating state inheritance tax',
        inputs: ['Inheritance amount', 'State', 'Relationship to deceased'],
        result: 'estimated inheritance tax',
      },
      formula: {
        expression: 'Tax = Inheritance Amount × State Rate (based on relationship)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Inheritance', value: '$100,000' },
          { label: 'State', value: 'Pennsylvania' },
          { label: 'Relationship', value: 'Sibling' },
        ],
        resultLabel: 'Estimated tax',
        resultValue: '≈ $12,000',
      },
    };
  }

  if (route.includes('gift-tax')) {
    return {
      intro: {
        who: 'donors estimating gift tax implications for large gifts',
        inputs: ['Gift amount', 'Annual exclusion', 'Lifetime exemption used'],
        result: 'estimated gift tax and impact on lifetime exemption',
      },
      formula: {
        expression: 'Taxable Gift = Total Gift − Annual Exclusion ($18,000)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Gift amount', value: '$50,000' },
          { label: 'Annual exclusion', value: '$18,000' },
        ],
        resultLabel: 'Amount counting against lifetime exemption',
        resultValue: '$32,000',
      },
    };
  }

  if (route.includes('social-security-benefits')) {
    return {
      intro: {
        who: 'future retirees estimating Social Security benefits',
        inputs: ['Highest 35 years of earnings', 'Retirement age'],
        result: 'estimated monthly benefit (PIA)',
      },
      formula: {
        expression: 'Benefit = f(AIME, Retirement Age)',
        where: [
          { symbol: 'AIME', meaning: 'Average Indexed Monthly Earnings' },
        ],
      },
      example: {
        inputs: [
          { label: 'Average annual earnings', value: '$70,000' },
          { label: 'Retirement age', value: '67 (FRA)' },
        ],
        resultLabel: 'Estimated monthly benefit',
        resultValue: '≈ $2,400',
      },
    };
  }

  if (route.includes('early-retirement')) {
    return {
      intro: {
        who: 'planners estimating when they can retire early',
        inputs: ['Annual expenses', 'Current savings', 'Savings rate', 'Expected return'],
        result: 'years until early retirement',
      },
      formula: {
        expression: 'Time = f(Savings, Expenses, Rate of Return)',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Annual expenses', value: '$50,000' },
          { label: 'Current savings', value: '$200,000' },
          { label: 'Monthly savings', value: '$2,000' },
        ],
        resultLabel: 'Estimated years to retire',
        resultValue: '≈ 15 years',
      },
    };
  }

  if (route.includes('roth-vs-traditional-ira')) {
    return {
      intro: {
        who: 'investors choosing between Roth and Traditional IRAs',
        inputs: ['Current tax rate', 'Expected retirement tax rate', 'Contribution amount'],
        result: 'comparison of after-tax value at retirement',
      },
      formula: {
        expression: 'Roth FV = P(1+r)^n; Traditional FV = P(1+r)^n × (1−t)',
        where: [
          { symbol: 't', meaning: 'retirement tax rate' },
        ],
      },
      example: {
        inputs: [
          { label: 'Current rate', value: '22%' },
          { label: 'Retirement rate', value: '15%' },
        ],
        resultLabel: 'Better option',
        resultValue: 'Traditional IRA (due to lower future rate)',
      },
    };
  }

  if (route.includes('mortgage-payoff')) {
    return {
      intro: {
        who: 'homeowners estimating how long it will take to pay off their mortgage',
        inputs: ['Current balance', 'Interest rate', 'Monthly payment', 'Extra payment (optional)'],
        result: 'estimated payoff date, total interest remaining, and interest saved with extra payments',
      },
      formula: {
        expression: 'Interest_t = Balance_{t−1} × r; Principal_t = Payment − Interest_t; Balance_t = Balance_{t−1} − Principal_t',
        where: [
          { symbol: 'r', meaning: 'monthly interest rate (APR / 12)' },
          { symbol: 'Payment', meaning: 'monthly payment (principal + interest), plus any extra payment' },
        ],
        notes: ['Payoff time is calculated month-by-month because the interest amount changes as the balance declines.'],
      },
      example: {
        inputs: [
          { label: 'Balance', value: money(320000) },
          { label: 'Rate', value: pct(6.5) },
          { label: 'Payment', value: money(2200) },
          { label: 'Extra', value: money(200) },
        ],
        resultLabel: 'Outcome',
        resultValue: 'Pay off sooner and reduce total interest',
      },
    };
  }

  if (route.includes('house-affordability')) {
    return {
      intro: {
        who: 'homebuyers estimating a price range before shopping or talking to a lender',
        inputs: ['Annual income', 'Monthly debts', 'Down payment', 'Interest rate', 'Loan term'],
        result: 'an estimated affordable home price and monthly payment using common DTI guidelines',
      },
      formula: {
        expression: 'Max Housing Payment ≈ min(Income × 0.28 / 12, (Income × 0.36 / 12) − Monthly Debts)',
        where: [
          { symbol: 'Income', meaning: 'gross annual income' },
          { symbol: 'Monthly Debts', meaning: 'monthly debt obligations (loans, cards, etc.)' },
        ],
        notes: ['This estimate focuses on principal and interest. Taxes, insurance, HOA, and PMI can reduce affordability.'],
      },
      example: {
        inputs: [
          { label: 'Income', value: money(120000) + '/year' },
          { label: 'Monthly debts', value: money(800) },
          { label: 'Down payment', value: money(60000) },
          { label: 'Rate', value: pct(6.5) },
          { label: 'Term', value: '30 years' },
        ],
        resultLabel: 'Affordable monthly housing payment (rule-of-thumb)',
        resultValue: '≈ $2,000–$2,800',
      },
    };
  }

  if (route.includes('auto-lease')) {
    return {
      intro: {
        who: 'drivers comparing lease offers using a simple, transparent estimate',
        inputs: ['Vehicle price', 'Down payment', 'Residual value', 'APR or money factor', 'Lease term'],
        result: 'estimated monthly lease payment and total lease cost',
      },
      formula: {
        expression: 'Payment ≈ (Cap Cost − Residual) / Term + (Cap Cost + Residual) × Money Factor',
        where: [
          { symbol: 'Cap Cost', meaning: 'negotiated price minus down payment (cap cost reduction)' },
          { symbol: 'Residual', meaning: 'estimated end-of-lease value' },
          { symbol: 'Money Factor', meaning: 'lease finance charge (approx. APR / 2400)' },
        ],
        notes: ['Taxes and fees vary by location and dealer and are not included in this simplified formula.'],
      },
      example: {
        inputs: [
          { label: 'Vehicle price', value: money(35000) },
          { label: 'Down payment', value: money(2000) },
          { label: 'Residual', value: money(21000) },
          { label: 'Term', value: '36 months' },
          { label: 'APR (equiv.)', value: pct(6) },
        ],
        resultLabel: 'Monthly payment',
        resultValue: '≈ $400–$500 (before taxes/fees)',
      },
    };
  }

  if (route.includes('tax-bracket')) {
    return {
      intro: {
        who: 'taxpayers estimating tax owed and understanding marginal vs. effective rates',
        inputs: ['Taxable income', 'Filing status'],
        result: 'marginal bracket, estimated tax by bracket, and effective rate',
      },
      formula: {
        expression: 'Total Tax = Σ (Amount in Bracket_i × Rate_i); Effective Rate = Total Tax / Taxable Income',
        where: [],
        notes: ['This is a bracket-based estimate and does not include credits, itemized deductions, or state taxes.'],
      },
      example: {
        inputs: [
          { label: 'Taxable income', value: money(90000) },
          { label: 'Filing status', value: 'Single' },
        ],
        resultLabel: 'Result',
        resultValue: 'Portions taxed at multiple rates; marginal bracket is the highest rate applied',
      },
    };
  }

  if (route.includes('cost-of-living')) {
    return {
      intro: {
        who: 'relocators comparing costs between two cities',
        inputs: ['Current salary', 'Current city', 'New city'],
        result: 'required salary in new city to match lifestyle',
      },
      formula: {
        expression: 'New Salary = Current Salary × (New Index / Current Index)',
        where: [
          { symbol: 'Index', meaning: 'Cost of Living Index (COLI)' },
        ],
      },
      example: {
        inputs: [
          { label: 'Current salary', value: '$75,000' },
          { label: 'Moving from', value: 'Atlanta' },
          { label: 'Moving to', value: 'New York City' },
        ],
        resultLabel: 'Required salary',
        resultValue: '≈ $145,000',
      },
    };
  }

  if (route.includes('severance-pay')) {
    return {
      intro: {
        who: 'employees estimating net severance pay after taxes',
        inputs: ['Gross severance amount', 'Tax withholding rate'],
        result: 'net severance pay and months of coverage',
      },
      formula: {
        expression: 'Net Severance = Gross − Federal Tax (22%) − FICA − State Tax',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Gross severance', value: '$20,000' },
          { label: 'Monthly expenses', value: '$4,000' },
        ],
        resultLabel: 'Net amount',
        resultValue: '≈ $14,000 (3.5 months)',
      },
    };
  }

  if (route.includes('crypto-return')) {
    return {
      intro: {
        who: 'crypto investors calculating profit or loss',
        inputs: ['Buy price', 'Sell price', 'Quantity', 'Fees'],
        result: 'net profit/loss and ROI',
      },
      formula: {
        expression: 'Profit = (Sell Price × Qty) − (Buy Price × Qty) − Fees',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Investment', value: '$1,000' },
          { label: 'Current value', value: '$1,500' },
        ],
        resultLabel: 'Profit',
        resultValue: '$500 (50% ROI)',
      },
    };
  }

  if (route.includes('bond-yield')) {
    return {
      intro: {
        who: 'bond investors calculating current yield and YTM',
        inputs: ['Bond price', 'Coupon rate', 'Years to maturity'],
        result: 'current yield and yield to maturity (YTM)',
      },
      formula: {
        expression: 'Current Yield = (Coupon / Price) × 100',
        where: [],
      },
      example: {
        inputs: [
          { label: 'Price', value: '$950' },
          { label: 'Coupon', value: '5%' },
        ],
        resultLabel: 'Current yield',
        resultValue: '5.26%',
      },
    };
  }

  return {
    intro: {
      who: 'people comparing financial scenarios quickly',
      inputs: ['the inputs shown in the calculator'],
      result: 'an estimate based on standard financial math',
    },
    formula: {
      expression: 'This calculator uses standard financial math to estimate results from your inputs.',
      where: [],
    },
    example: {
      inputs: [
        { label: 'Step 1', value: 'Enter realistic values' },
        { label: 'Step 2', value: 'Review the result' },
      ],
      resultLabel: 'Next step',
      resultValue: 'Adjust one input at a time to compare scenarios',
    },
  };
}

