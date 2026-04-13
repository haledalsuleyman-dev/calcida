import type { JsonLdFaqItem } from '@/lib/jsonld';
import type { CategoryKey } from '@/lib/categories';

export interface CalculatorSpecShape {
  id: string;
  route: `/${string}`;
  title: string;
  description: string;
  category: CategoryKey;
  faqs: readonly JsonLdFaqItem[];
  related: readonly string[];
  relatedArticles?: readonly { title: string; href: `/${string}` }[];
  generated?: boolean;
}

export const CALCULATOR_SPECS = [
  {
    id: 'mortgage-payment',
    route: '/mortgage-payment-calculator',
    title: 'Mortgage Payment Calculator with Taxes and Insurance',
    description: 'Calculate your monthly mortgage payment including principal, interest, taxes, insurance, and PMI. Get a complete breakdown of your monthly housing costs.',
    category: 'mortgage',
    faqs: [
      {
        question: "How is a mortgage payment calculated?",
        answer: "A mortgage payment is calculated using the principal loan amount, interest rate, and loan term. The core formula determines the monthly principal and interest. To get the total monthly payment, we add estimated property taxes, homeowners insurance, and HOA fees (if applicable)."
      },
      {
        question: "Does this calculator include property taxes and insurance?",
        answer: "Yes! This calculator includes fields for annual property taxes and homeowners insurance to give you a realistic estimate of your total monthly housing cost (PITI)."
      },
      {
        question: "How accurate is this mortgage payment calculator?",
        answer: "This calculator uses standard industry formulas used by lenders. However, your actual rate and payments will depend on your credit score, lender, and specific loan terms. Use this as a close estimate for budgeting."
      }
    ],
    related: ['mortgage-amortization', 'biweekly-mortgage', 'extra-payment-mortgage', 'refinance', 'mortgage-affordability', 'down-payment', 'pmi', 'mortgage-apr', 'property-tax'],
    relatedArticles: [
      { title: "Mortgage Payment Breakdown: Taxes, Insurance & HOA", href: "/blog/mortgage-payment-breakdown-taxes-insurance-hoa" },
      { title: "How Much House Can I Afford? (28/36 Rule)", href: "/blog/how-much-house-can-i-afford-28-36-rule" },
      { title: "What Is PMI and How to Avoid It", href: "/blog/what-is-pmi-and-how-to-avoid-it" },
      { title: "Calculate Mortgage Payments with Taxes & Insurance", href: "/blog/calculate-mortgage-payments-taxes-insurance" },
      { title: "Common Mortgage Mistakes to Avoid", href: "/blog/common-mortgage-mistakes-to-avoid" }
    ],
  },
  {
    id: 'mortgage-amortization',
    route: '/mortgage-amortization-calculator',
    title: 'Mortgage Amortization Calculator & Schedule',
    description: 'See a detailed mortgage amortization schedule. Track how much of each payment goes toward principal vs interest and see your loan balance over time.',
    category: 'mortgage',
    faqs: [
      {
        question: "What is an amortization schedule?",
        answer: "An amortization schedule is a table that shows each periodic payment on an amortizing loan. It breaks down each payment into interest and principal and shows the remaining balance after each payment."
      },
      {
        question: "How does amortization work?",
        answer: "In the early years of a mortgage, a larger portion of your monthly payment goes toward interest. As the principal balance decreases, the interest portion also decreases, and more of your payment goes toward paying off the principal."
      }
    ],
    related: ['mortgage-payment', 'extra-payment-mortgage', 'biweekly-mortgage', 'refinance'],
    relatedArticles: [
      { title: "Understanding Amortization Schedules", href: "/blog/understanding-amortization-schedules" },
      { title: "How to Read an Amortization Schedule", href: "/blog/how-to-read-amortization-schedule" }
    ],
  },
  {
    id: 'biweekly-mortgage',
    route: '/biweekly-mortgage-calculator',
    title: 'Biweekly Mortgage Calculator: Save on Interest',
    description: 'Compare biweekly vs monthly mortgage payments. See how making a payment every two weeks can shorten your loan term and save you thousands in interest.',
    category: 'mortgage',
    faqs: [
      {
        question: "How much can I save with biweekly mortgage payments?",
        answer: "By paying biweekly, you effectively make 13 full payments a year instead of 12. On a 30-year mortgage, this can often shorten the loan term by 4-6 years and save tens of thousands in interest."
      },
      {
        question: "Is there a catch to biweekly payments?",
        answer: "The main 'catch' is that you must be disciplined with your budgeting. Also, some lenders charge a fee to set up biweekly payments, though you can often achieve the same result by simply paying extra each month."
      }
    ],
    related: ['mortgage-payment', 'mortgage-amortization', 'extra-payment-mortgage', 'refinance'],
    relatedArticles: [
      { title: "Biweekly vs Monthly Mortgage Payments", href: "/blog/biweekly-vs-monthly-mortgage-payments" },
      { title: "15-Year vs 30-Year Mortgage: Comparison", href: "/blog/15-year-vs-30-year-mortgage-comparison" }
    ],
  },
  {
    id: 'extra-payment-mortgage',
    route: '/extra-payment-mortgage-calculator',
    title: 'Extra Mortgage Payment Calculator: Pay Off Early',
    description: 'Calculate how much you can save by making extra principal payments on your mortgage. See how much faster you can be debt-free.',
    category: 'mortgage',
    faqs: [
      {
        question: "Should I pay extra on my mortgage?",
        answer: "It depends on your other financial goals. Paying extra on your mortgage is a guaranteed return equal to your interest rate. If you have high-interest debt, pay that first. If not, extra mortgage payments can be a great way to build equity faster."
      },
      {
        question: "Does extra payment go to principal or interest?",
        answer: "Extra payments should be designated as 'principal-only' payments to ensure they reduce your loan balance directly, which in turn reduces the amount of interest you'll owe in the future."
      }
    ],
    related: ['mortgage-payment', 'mortgage-amortization', 'biweekly-mortgage', 'refinance'],
    relatedArticles: [
      { title: "How Extra Mortgage Payments Reduce Interest", href: "/blog/how-extra-mortgage-payments-reduce-interest" },
      { title: "Pay Off Your 30-Year Mortgage in 15 Years", href: "/blog/pay-off-30-year-mortgage-in-15-years" }
    ],
  },
  {
    id: 'refinance',
    route: '/refinance-calculator',
    title: 'Mortgage Refinance Calculator: Is It Worth It?',
    description: 'Compare your current mortgage to a new refinance scenario. Calculate your break-even point and see if refinancing your home loan makes financial sense.',
    category: 'mortgage',
    faqs: [
      {
        question: "When should I refinance my mortgage?",
        answer: "Generally, it makes sense to refinance if you can lower your interest rate by at least 0.75% to 1%, and if you plan to stay in the home long enough to reach the 'break-even point' where savings exceed closing costs."
      },
      {
        question: "What are the costs of refinancing?",
        answer: "Refinancing typically costs 2% to 5% of the loan amount. This includes appraisal fees, title insurance, and lender origination fees."
      }
    ],
    related: ['mortgage-payment', 'mortgage-amortization', 'mortgage-interest', 'mortgage-affordability', 'closing-costs', 'extra-payment-mortgage'],
    relatedArticles: [
      { title: "Should You Refinance? Break-Even Point Explained", href: "/blog/should-you-refinance-mortgage-break-even" },
      { title: "Closing Costs Explained for Refinancing", href: "/blog/closing-costs-explained-buying-refinancing" }
    ],
  },
  {
    id: 'mortgage-refinance',
    route: '/mortgage-refinance-calculator',
    title: 'Mortgage Refinance Calculator: Break-Even Point',
    description: 'Calculate your refinance savings and break-even point side-by-side. See if refinancing your mortgage is the right move for you.',
    category: 'mortgage',
    faqs: [
      {
        question: "When should I refinance my mortgage?",
        answer: "Generally, if you can lower your interest rate by 0.75% or more and plan to stay in your home long enough to reach the break-even point."
      },
      {
        question: "What are the costs to refinance?",
        answer: "Refinancing costs usually range from 2% to 5% of the loan amount, including appraisal, title insurance, and lender fees."
      }
    ],
    related: ['mortgage-payment', 'refinance', 'extra-payment-mortgage'],
  },
  {
    id: 'auto-loan',
    route: '/auto-loan-calculator',
    title: 'Auto Loan Calculator: Estimate Monthly Car Payments',
    description: 'Calculate your monthly car payment, total interest, and total cost of a vehicle. Factor in trade-ins, down payments, and sales tax.',
    category: 'loan',
    faqs: [
      {
        question: "How is an auto loan payment calculated?",
        answer: "It's calculated based on the loan amount, the annual interest rate (APR), and the loan term (usually in months). Our calculator uses the standard amortization formula for fixed-rate loans."
      }
    ],
    related: ['personal-loan', 'student-loan', 'car-affordability', 'loan-comparison', 'apr', 'loan-payment', 'loan-amortization'],
    relatedArticles: [
      { title: "Good Debt-to-Income Ratio for Loans", href: "/blog/good-debt-to-income-ratio-mortgage" },
      { title: "How Interest Rates Affect Buying Power", href: "/blog/how-interest-rates-affect-buying-power" }
    ],
  },
  {
    id: 'auto-lease',
    route: '/auto-lease-calculator',
    title: 'Auto Lease Calculator: Estimate Monthly Lease Payment',
    description: 'Estimate your monthly auto lease payment using price, residual value, lease term, and an APR-equivalent money factor.',
    category: 'loan',
    faqs: [
      {
        question: "What is residual value on a car lease?",
        answer: "Residual value is the estimated value of the vehicle at the end of the lease term. A higher residual value generally lowers the monthly payment."
      },
      {
        question: "What is a money factor?",
        answer: "A money factor is the lease finance charge expressed as a small decimal. A rough APR equivalent is Money Factor × 2400."
      },
      {
        question: "Does a bigger down payment reduce a lease payment?",
        answer: "A larger down payment (cap cost reduction) can reduce the monthly payment, but it may not always be the best choice because you could lose that money if the vehicle is totaled early in the lease."
      },
      {
        question: "Does this estimate include taxes and fees?",
        answer: "This calculator focuses on the core lease math. Taxes, registration, acquisition fees, and dealer add-ons can change the final payment."
      },
      {
        question: "Should I lease or buy?",
        answer: "Leasing can lower monthly payments and keep you in a newer vehicle, while buying can be cheaper long-term if you keep the car for many years. Compare total cost over your ownership horizon."
      }
    ],
    related: ['auto-loan', 'car-affordability', 'apr', 'loan-comparison'],
    generated: true,
  },
  {
    id: 'personal-loan',
    route: '/personal-loan-calculator',
    title: 'Personal Loan Calculator: Payment & Interest',
    description: 'Calculate monthly payments for a personal loan. See how different interest rates and terms affect your monthly budget and total cost.',
    category: 'loan',
    faqs: [
      {
        question: "What is a good interest rate for a personal loan?",
        answer: "Rates typically range from 6% to 36% depending on your credit score. Borrowers with excellent credit (720+) usually see the lowest rates."
      }
    ],
    related: ['auto-loan', 'student-loan', 'loan-payment', 'loan-interest', 'apr', 'loan-comparison', 'debt-consolidation-loan'],
    relatedArticles: [
      { title: "Good Debt-to-Income Ratio for Loans", href: "/blog/good-debt-to-income-ratio-mortgage" },
      { title: "Understanding Amortization Schedules", href: "/blog/understanding-amortization-schedules" }
    ],
  },
  {
    id: 'student-loan',
    route: '/student-loan-calculator',
    title: 'Student Loan Calculator: Payoff Estimator',
    description: 'Estimate your monthly student loan payments and total interest. See how extra payments can help you pay off your student debt faster.',
    category: 'loan',
    faqs: [
      {
        question: "How long does it take to pay off student loans?",
        answer: "The standard repayment plan for federal student loans is 10 years, but income-driven plans can extend this to 20-25 years. Private loans vary by lender."
      }
    ],
    related: ['personal-loan', 'auto-loan', 'loan-payment', 'loan-interest', 'debt-payoff', 'apr'],
    relatedArticles: [
      { title: "Good Debt-to-Income Ratio for Loans", href: "/blog/good-debt-to-income-ratio-mortgage" },
      { title: "How Extra Mortgage Payments Reduce Interest", href: "/blog/how-extra-mortgage-payments-reduce-interest" }
    ],
  },
  {
    id: 'salary-to-hourly',
    route: '/salary-to-hourly-calculator',
    title: 'Salary to Hourly Calculator: Convert Annual Pay',
    description: 'Convert your annual salary to an hourly wage. Factor in work hours per week and weeks per year to see exactly how much you earn per hour.',
    category: 'salary',
    faqs: [
      {
        question: "How do I calculate my hourly rate from my salary?",
        answer: "The simplest way is to divide your annual salary by 2,080 (the number of work hours in a year for a 40-hour work week). For a more precise calculation, use our tool to adjust for your specific weekly hours and weeks worked."
      }
    ],
    related: ['hourly-to-salary', 'paycheck', 'after-tax-income', 'take-home-pay', 'monthly-salary', 'weekly-pay', 'biweekly-pay', 'overtime'],
    relatedArticles: [
      { title: "Salary vs Hourly: Which is Better?", href: "/blog/salary-vs-hourly-which-is-better" },
      { title: "How to Calculate Take-Home Pay", href: "/blog/how-to-calculate-take-home-pay" }
    ],
  },
  {
    id: 'hourly-to-salary',
    route: '/hourly-to-salary-calculator',
    title: 'Hourly to Salary Calculator: Monthly & Yearly Pay',
    description: 'Convert your hourly wage to a yearly, monthly, and weekly salary. See how much you earn before and after standard working hours.',
    category: 'salary',
    faqs: [
      {
        question: "How many working hours are in a year?",
        answer: "A standard full-time work year consists of 2,080 hours (40 hours per week × 52 weeks)."
      }
    ],
    related: ['salary-to-hourly', 'paycheck', 'after-tax-income', 'take-home-pay'],
    relatedArticles: [
      { title: "Salary vs Hourly: Which is Better?", href: "/blog/salary-vs-hourly-which-is-better" }
    ],
  },
  {
    id: 'paycheck',
    route: '/paycheck-calculator',
    title: 'Paycheck Calculator: Estimate Your Take-Home Pay',
    description: 'Estimate your net take-home pay after federal, state, and FICA taxes. See how tax withholdings and deductions impact your paycheck.',
    category: 'salary',
    faqs: [
      {
        question: "What is FICA tax?",
        answer: "FICA stands for the Federal Insurance Contributions Act. It is a mandatory payroll tax that funds Social Security and Medicare. The total FICA tax rate is 15.3% — 7.65% paid by the employee and 7.65% matched by the employer."
      }
    ],
    related: ['take-home-pay', 'after-tax-income', 'salary-to-hourly', 'hourly-to-salary', 'overtime', 'biweekly-pay', 'weekly-pay', 'bonus'],
    relatedArticles: [
      { title: "Common Paycheck Mistakes to Avoid", href: "/blog/common-paycheck-mistakes" },
      { title: "What is FICA: Social Security & Medicare", href: "/blog/what-is-fica-social-security-medicare" },
      { title: "How to Calculate Take-Home Pay", href: "/blog/how-to-calculate-take-home-pay" }
    ],
  },
  {
    id: 'take-home-pay',
    route: '/take-home-pay-calculator',
    title: 'Take-Home Pay Calculator (Net Income)',
    description: 'Calculate your actual take-home pay after all taxes and deductions. Perfect for budgeting and comparing job offers.',
    category: 'salary',
    faqs: [
      {
        question: "What is the difference between gross and net pay?",
        answer: "Gross pay is the total amount you earn before any deductions. Net pay (or take-home pay) is the amount you actually receive in your bank account after taxes, insurance, and retirement contributions are deducted."
      }
    ],
    related: ['paycheck', 'after-tax-income', 'salary-to-hourly', 'hourly-to-salary', 'overtime'],
    relatedArticles: [
      { title: "How to Calculate Take-Home Pay", href: "/blog/how-to-calculate-take-home-pay" },
      { title: "How to Increase Your Take-Home Pay", href: "/blog/how-to-increase-your-take-home-pay" }
    ],
  },
  {
    id: 'after-tax-income',
    route: '/after-tax-income-calculator',
    title: 'After-Tax Income Calculator: Real Earnings',
    description: 'Estimate your annual after-tax income and effective tax rate based on your location and filing status.',
    category: 'tax',
    faqs: [
      {
        question: "What is an effective tax rate?",
        answer: "Your effective tax rate is the actual percentage of your income that you pay in taxes after all deductions and credits. It is usually lower than your marginal tax bracket."
      }
    ],
    related: ['take-home-pay', 'paycheck', 'salary-to-hourly', 'hourly-to-salary', 'income-tax'],
    relatedArticles: [
      { title: "After-Tax Income: Why It's Lower Than You Think", href: "/blog/after-tax-income-why-its-lower" },
      { title: "States With No Income Tax", href: "/blog/states-with-no-income-tax" }
    ],
  },
  {
    id: '401k',
    route: '/401k-calculator',
    title: '401(k) Calculator: Project Your Retirement Savings',
    description: 'Estimate your future 401(k) balance based on contributions, employer match, and investment returns. See the power of compounding.',
    category: 'retirement',
    faqs: [
      {
        question: "How much should I contribute to my 401(k)?",
        answer: "Most experts recommend contributing at least enough to get your full employer match, as this is 'free money'. Aim for 10-15% of your gross income for retirement."
      }
    ],
    related: ['retirement-savings', 'retirement', '401k-growth', '401k-contribution', 'compound-interest', 'investment-return', 'roth-ira'],
    relatedArticles: [
      { title: "How 401(k) Contributions Affect Your Paycheck", href: "/blog/how-401k-contributions-affect-your-paycheck" },
      { title: "Roth vs Traditional IRA Explained", href: "/blog/roth-vs-traditional-ira-explained" }
    ],
  },
  {
    id: 'retirement-savings',
    route: '/retirement-savings-calculator',
    title: 'Retirement Savings Calculator',
    description: 'Estimate how much you could save for retirement based on contributions, returns, and years until retirement.',
    category: 'retirement',
    faqs: [],
    related: ['401k', 'retirement', 'compound-interest', 'investment-return', 'inflation', 'savings-goal', 'fire'],
    relatedArticles: [
      { title: "How to build an Emergency Fund", href: "/blog/how-to-build-an-emergency-fund" },
      { title: "FIRE Movement Explained", href: "/blog/fire-movement-explained" }
    ],
  },
  {
    id: '401k-contribution',
    route: '/401k-contribution-calculator',
    title: '401(k) Contribution Calculator',
    description: 'Estimate your 401(k) contributions and employer match impact over time based on salary and contribution rate.',
    category: 'retirement',
    faqs: [],
    related: ['401k', 'paycheck', 'after-tax-income', 'take-home-pay'],
  },
  {
    id: '401k-growth',
    route: '/401k-growth-calculator',
    title: '401(k) Growth Calculator',
    description: 'Project 401(k) balance growth over time using current balance, contributions, employer match, and expected returns.',
    category: 'retirement',
    faqs: [],
    related: ['401k', 'retirement', 'compound-interest', 'inflation'],
  },
  {
    id: 'retirement',
    route: '/retirement-calculator',
    title: 'Retirement Calculator: Plan Your Financial Future',
    description: 'Estimate how much you need to save for retirement. Factor in your current age, retirement age, income, and expected lifestyle costs.',
    category: 'retirement',
    faqs: [
      {
        question: "How much money do I need to retire?",
        answer: "A common rule of thumb is the 80% rule: you'll need about 80% of your pre-retirement income to maintain your lifestyle. Another is the 4% rule for withdrawals."
      }
    ],
    related: ['401k', 'roth-ira', 'ira', 'savings', 'investment-return', 'compound-interest', 'fire'],
    relatedArticles: [
      { title: "Roth vs Traditional IRA Explained", href: "/blog/roth-vs-traditional-ira-explained" },
      { title: "The Rule of 72 Explained", href: "/blog/rule-of-72-explained" },
      { title: "FIRE Movement Explained", href: "/blog/fire-movement-explained" }
    ],
  },
  {
    id: 'savings',
    route: '/savings-calculator',
    title: 'Savings Calculator: Reach Your Financial Goals',
    description: 'Calculate how your savings will grow over time with monthly contributions and interest. Plan for a house, car, or emergency fund.',
    category: 'finance',
    faqs: [
      {
        question: "What is a high-yield savings account (HYSA)?",
        answer: "An HYSA is a type of savings account that typically pays a much higher interest rate than a standard savings account, often 10-20 times more."
      }
    ],
    related: ['compound-interest', 'investment-return', '401k', 'emergency-fund', 'future-value', 'savings-goal'],
    relatedArticles: [
      { title: "What is Compound Interest?", href: "/blog/what-is-compound-interest" },
      { title: "How to Build an Emergency Fund", href: "/blog/how-to-build-an-emergency-fund" }
    ],
  },
  {
    id: 'compound-interest',
    route: '/compound-interest-calculator',
    title: 'Compound Interest Calculator: Grow Your Wealth',
    description: 'See how compound interest can grow your money over time. Compare daily, monthly, and annual compounding frequencies.',
    category: 'finance',
    faqs: [
      {
        question: "What is compound interest?",
        answer: "Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods."
      }
    ],
    related: ['savings', 'investment-return', '401k', 'future-value', 'rule-of-72', 'cagr'],
    relatedArticles: [
      { title: "What is Compound Interest?", href: "/blog/what-is-compound-interest" },
      { title: "The Rule of 72 Explained", href: "/blog/rule-of-72-explained" },
      { title: "Future Value vs Present Value", href: "/blog/future-value-vs-present-value" }
    ],
  },
  {
    id: 'investment-return',
    route: '/investment-return-calculator',
    title: 'Investment Return Calculator (ROI)',
    description: 'Calculate the return on your investments. See your total gain, annualized return, and how your portfolio grows over time.',
    category: 'finance',
    faqs: [
      {
        question: "What is ROI?",
        answer: "ROI stands for Return on Investment. it's a measure used to evaluate the efficiency or profitability of an investment."
      }
    ],
    related: ['compound-interest', 'savings', '401k'],
    relatedArticles: [
      { title: "Dividend Yield Explained", href: "/blog/dividend-yield-explained" },
      { title: "The Rule of 72 Explained", href: "/blog/rule-of-72-explained" }
    ],
  },
  {
    id: 'net-worth',
    route: '/net-worth-calculator',
    title: 'Net Worth Calculator: Track Your Financial Progress',
    description: 'Calculate your total net worth by totaling your assets and subtracting your liabilities. See your financial big picture.',
    category: 'finance',
    faqs: [
      {
        question: "What is net worth?",
        answer: "Net worth is the value of everything you own (assets) minus everything you owe (liabilities). It is a key measure of financial health."
      },
      {
        question: "How often should I calculate my net worth?",
        answer: "Many people track their net worth quarterly or annually to see their long-term financial progress."
      }
    ],
    related: ['budget', 'savings', 'investment-return'],
  },
  {
    id: 'inflation',
    route: '/inflation-calculator',
    title: 'Inflation Calculator: Buying Power Over Time',
    description: 'Calculate how inflation affects the value of your money over time. See what a dollar in the past is worth today.',
    category: 'finance',
    faqs: [
      {
        question: "What is inflation?",
        answer: "Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling."
      },
      {
        question: "How is inflation measured?",
        answer: "In the US, it's most commonly measured by the Consumer Price Index (CPI), which tracks the price of a basket of consumer goods and services."
      }
    ],
    related: ['savings', 'compound-interest', 'investment-return'],
  },
  {
    id: 'emergency-fund',
    route: '/emergency-fund-calculator',
    title: 'Emergency Fund Calculator: Financial Safety Net',
    description: 'Calculate how much you need to save for an emergency fund based on your monthly expenses and desired safety margin.',
    category: 'finance',
    faqs: [
      {
        question: "How much should I have in my emergency fund?",
        answer: "Most experts recommend having 3 to 6 months of essential living expenses saved in an easily accessible account."
      },
      {
        question: "Where should I keep my emergency fund?",
        answer: "In a high-yield savings account (HYSA) where it can earn interest but still be withdrawn quickly if needed."
      }
    ],
    related: ['savings', 'budget', 'net-worth', 'savings-goal', 'sinking-fund'],
    relatedArticles: [
      { title: "How to Build an Emergency Fund", href: "/blog/how-to-build-an-emergency-fund" },
      { title: "50/30/20 Budget Rule", href: "/blog/50-30-20-budget-rule" }
    ],
  },
  {
    id: 'car-affordability',
    route: '/car-affordability-calculator',
    title: 'Car Affordability Calculator: How Much Can I Spend?',
    description: 'Determine how much car you can afford based on your monthly budget, down payment, and loan terms. Use the 20/4/10 rule.',
    category: 'loan',
    faqs: [
      {
        question: "What is the 20/4/10 rule for cars?",
        answer: "Put down at least 20%, limit the loan to 4 years, and ensure total car expenses (payment, insurance, fuel) are under 10% of your gross income."
      },
      {
        question: "Does car affordability include insurance?",
        answer: "Yes, true affordability should factor in insurance, maintenance, and fuel costs, not just the loan payment."
      }
    ],
    related: ['auto-loan', 'budget', 'personal-loan'],
  },
  {
    id: 'debt-payoff',
    route: '/debt-payoff-calculator',
    title: 'Debt Payoff Calculator: Snowball vs Avalanche',
    description: 'Compare debt payoff strategies like the Debt Snowball and Debt Avalanche. See how fast you can become debt-free.',
    category: 'finance',
    faqs: [
      {
        question: "What is the Debt Snowball method?",
        answer: "Paying off debts from smallest balance to largest balance, regardless of interest rate, to build psychological momentum."
      },
      {
        question: "What is the Debt Avalanche method?",
        answer: "Paying off debts from highest interest rate to lowest interest rate to minimize total interest paid."
      }
    ],
    related: ['credit-card-payoff', 'budget', 'personal-loan'],
    relatedArticles: [
      { title: "Debt Snowball vs Avalanche", href: "/blog/debt-snowball-vs-avalanche" }
    ],
  },
  {
    id: 'budget',
    route: '/budget-calculator',
    title: 'Budget Calculator: 50/30/20 Rule',
    description: 'Create a monthly budget using the 50/30/20 rule or custom categories. Track your needs, wants, and savings goals.',
    category: 'finance',
    faqs: [
      {
        question: "What is the 50/30/20 budget rule?",
        answer: "Allocate 50% of your after-tax income to Needs, 30% to Wants, and 20% to Savings and Debt Repayment."
      },
      {
        question: "Should I use gross or net income for budgeting?",
        answer: "Always use your net (take-home) income for budgeting as that is the money actually available to spend."
      }
    ],
    related: ['net-worth', 'savings', 'emergency-fund'],
    relatedArticles: [
      { title: "50/30/20 Budget Rule", href: "/blog/50-30-20-budget-rule" },
      { title: "How to Build an Emergency Fund", href: "/blog/how-to-build-an-emergency-fund" }
    ],
  },
  {
    id: 'roi',
    route: '/roi-calculator',
    title: 'ROI Calculator: Return on Investment',
    description: 'Calculate the Return on Investment (ROI) for any project or purchase. See your total profit and percentage gain.',
    category: 'finance',
    faqs: [
      {
        question: "How is ROI calculated?",
        answer: "ROI = (Net Profit / Cost of Investment) x 100. It measures the efficiency of an investment."
      },
      {
        question: "What is a good ROI?",
        answer: "A 'good' ROI depends on the risk and the asset class. For stocks, 7-10% annually is historically average."
      }
    ],
    related: ['investment-return', 'compound-interest', 'savings'],
    relatedArticles: [
      { title: "Net Present Value Explained", href: "/blog/net-present-value-explained" },
      { title: "Dividend Yield Explained", href: "/blog/dividend-yield-explained" }
    ],
  },
  {
    id: 'apr',
    route: '/apr-calculator',
    title: 'APR Calculator: Real Cost of a Loan',
    description: 'Calculate the Annual Percentage Rate (APR) for a loan, including fees and interest. See the true cost of borrowing.',
    category: 'loan',
    faqs: [
      {
        question: "What is the difference between interest rate and APR?",
        answer: "The interest rate is the cost of borrowing the principal. The APR includes the interest rate plus other fees like origination or points."
      },
      {
        question: "Why is APR higher than the interest rate?",
        answer: "Because it factors in the upfront costs and fees associated with getting the loan, expressed as an annual rate."
      }
    ],
    related: ['personal-loan', 'auto-loan', 'mortgage-payment'],
    relatedArticles: [
      { title: "Mortgage APR vs Interest Rate", href: "/blog/mortgage-apr-vs-interest-rate" },
      { title: "Understanding Amortization Schedules", href: "/blog/understanding-amortization-schedules" }
    ],
  },
  {
    id: 'loan-comparison',
    route: '/loan-comparison-calculator',
    title: 'Loan Comparison Calculator: Compare Side-by-Side',
    description: 'Compare two loans side-by-side to see which one saves you more money. Compare interest rates, terms, and fees.',
    category: 'loan',
    faqs: [
      {
        question: "Should I choose a lower rate or a shorter term?",
        answer: "A shorter term usually saves more in total interest, but a lower rate reduces the monthly payment. It depends on your budget."
      },
      {
        question: "What should I look for when comparing loans?",
        answer: "Look at the APR, the total interest paid over the life of the loan, and the monthly payment amount."
      }
    ],
    related: ['personal-loan', 'auto-loan', 'apr'],
    relatedArticles: [
      { title: "15-Year vs 30-Year Mortgage: Comparison", href: "/blog/15-year-vs-30-year-mortgage-comparison" },
      { title: "Good Debt-to-Income Ratio for Loans", href: "/blog/good-debt-to-income-ratio-mortgage" }
    ],
  },
  {
    id: 'credit-card-payoff',
    route: '/credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator: Debt-Free Date',
    description: 'Calculate how long it will take to pay off your credit card debt. See how much interest you can save by increasing your monthly payment.',
    category: 'credit-card',
    faqs: [
      {
        question: "How do I pay off credit card debt faster?",
        answer: "The best ways are to pay more than the minimum, use the debt avalanche method (highest interest first), or the debt snowball method (smallest balance first)."
      }
    ],
    related: ['debt-payoff', 'personal-loan', 'paycheck', 'take-home-pay'],
    relatedArticles: [
      { title: "Debt Snowball vs Avalanche", href: "/blog/debt-snowball-vs-avalanche" }
    ],
  },
  {
    id: 'mortgage-interest',
    route: '/mortgage-interest-calculator',
    title: 'Mortgage Interest Calculator',
    description: 'Estimate your mortgage payment, total interest paid, and total loan cost based on rate and term.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'mortgage-amortization', 'extra-payment-mortgage', 'refinance', 'mortgage-apr', 'mortgage-points'],
    relatedArticles: [
      { title: "How Interest Rates Affect Buying Power", href: "/blog/how-interest-rates-affect-buying-power" },
      { title: "Fixed vs Adjustable Rate Mortgages", href: "/blog/fixed-vs-adjustable-rate-mortgages" }
    ],
    generated: true,
  },
  {
    id: 'mortgage-payoff',
    route: '/mortgage-payoff-calculator',
    title: 'Mortgage Payoff Calculator',
    description: 'Estimate your mortgage payoff date, total interest remaining, and interest savings from extra payments.',
    category: 'mortgage',
    faqs: [
      {
        question: "Why does extra payment reduce total interest?",
        answer: "Extra payments reduce your principal balance faster. Because interest is calculated on the remaining balance, you pay interest on a smaller amount over time."
      },
      {
        question: "What if my monthly payment is too low to pay off the mortgage?",
        answer: "If your payment does not cover at least the monthly interest, your balance will not decrease. Increase the payment or confirm your rate and balance."
      },
      {
        question: "Should I pay down my mortgage early or invest instead?",
        answer: "Paying down a mortgage offers a guaranteed return equal to your interest rate (after taxes). Investing may offer higher returns but also comes with risk. Consider your goals and risk tolerance."
      },
      {
        question: "Does this include taxes and insurance?",
        answer: "No. This payoff estimate focuses on the principal and interest portion of your mortgage payment."
      },
      {
        question: "How accurate is the payoff date?",
        answer: "It is an estimate based on a fixed interest rate and consistent monthly payments. Real mortgages can change with escrow adjustments, rate changes (ARMs), or irregular payments."
      }
    ],
    related: ['mortgage-payment', 'mortgage-amortization', 'refinance', 'extra-payment-mortgage', 'mortgage-interest', 'mortgage-payoff-calculator'],
    relatedArticles: [
      { title: "Pay Off Your 30-Year Mortgage in 15 Years", href: "/blog/pay-off-30-year-mortgage-in-15-years" },
      { title: "How Extra Mortgage Payments Reduce Interest", href: "/blog/how-extra-mortgage-payments-reduce-interest" }
    ],
    generated: true,
  },
  {
    id: 'mortgage-affordability',
    route: '/mortgage-affordability-calculator',
    title: 'Mortgage Affordability Calculator',
    description: 'Estimate how much house you can afford based on income, debts, down payment, and interest rate.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'down-payment', 'pmi', 'property-tax', 'mortgage-apr', 'rent-vs-buy', 'house-affordability'],
    relatedArticles: [
      { title: "How Much House Can I Afford? (28/36 Rule)", href: "/blog/how-much-house-can-i-afford-28-36-rule" },
      { title: "What is a Good Debt-to-Income Ratio?", href: "/blog/good-debt-to-income-ratio-mortgage" }
    ],
    generated: true,
  },
  {
    id: 'house-affordability',
    route: '/house-affordability-calculator',
    title: 'House Affordability Calculator',
    description: 'Estimate an affordable home price based on income, debts, down payment, interest rate, and loan term using common DTI guidelines.',
    category: 'mortgage',
    faqs: [
      {
        question: "What does “28/36” mean?",
        answer: "A common guideline is spending up to ~28% of gross monthly income on housing and keeping total debt payments (including housing) under ~36%."
      },
      {
        question: "Does this include property taxes and insurance?",
        answer: "This tool estimates affordability using principal-and-interest based on your rate and term. Taxes, insurance, HOA, and PMI can materially reduce affordability."
      },
      {
        question: "How does down payment affect affordability?",
        answer: "A larger down payment reduces the loan amount and monthly payment, which can increase the home price you can afford."
      },
      {
        question: "What is debt-to-income (DTI)?",
        answer: "DTI is your total monthly debt payments divided by gross monthly income. Lenders use it to evaluate how much additional payment you can handle."
      },
      {
        question: "Why does interest rate matter so much?",
        answer: "At higher rates, a bigger portion of each payment goes to interest, which lowers the loan amount supported by the same monthly payment."
      }
    ],
    related: ['mortgage-affordability', 'down-payment', 'pmi', 'mortgage-payment', 'rent-vs-buy'],
    generated: true,
  },
  {
    id: 'down-payment',
    route: '/down-payment-calculator',
    title: 'Down Payment Calculator',
    description: 'Calculate your down payment amount, loan amount, and down payment percentage for a home purchase.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-affordability', 'mortgage-payment', 'pmi', 'mortgage-apr', 'property-tax'],
    generated: true,
  },
  {
    id: 'pmi',
    route: '/pmi-calculator',
    title: 'PMI Calculator',
    description: 'Estimate your monthly PMI payment based on home price, down payment, and PMI rate.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'down-payment', 'mortgage-affordability', 'mortgage-apr'],
    relatedArticles: [
      { title: "What Is PMI and How to Avoid It", href: "/blog/what-is-pmi-and-how-to-avoid-it" },
      { title: "Private Mortgage Insurance (PMI) Explained", href: "/blog/private-mortgage-insurance-pmi-explained" }
    ],
    generated: true,
  },
  {
    id: 'closing-costs',
    route: '/closing-costs-calculator',
    title: 'Closing Costs Calculator',
    description: 'Estimate typical mortgage closing costs using a percent-based range and compare scenarios.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-affordability', 'mortgage-payment', 'refinance'],
    generated: true,
  },
  {
    id: 'mortgage-points',
    route: '/mortgage-points-calculator',
    title: 'Mortgage Points Calculator',
    description: 'Estimate the cost of discount points and calculate the break-even time based on monthly savings.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-rate-comparison', 'mortgage-payment', 'refinance'],
    generated: true,
  },
  {
    id: 'interest-only-mortgage',
    route: '/interest-only-mortgage-calculator',
    title: 'Interest-Only Mortgage Calculator',
    description: 'Estimate interest-only payments and compare them to fully amortized payments over the full term.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'mortgage-interest', 'adjustable-rate-mortgage'],
    generated: true,
  },
  {
    id: 'adjustable-rate-mortgage',
    route: '/adjustable-rate-mortgage-calculator',
    title: 'Adjustable-Rate Mortgage (ARM) Calculator',
    description: 'Estimate payments for an ARM by comparing the initial fixed rate period to a later adjusted rate.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'mortgage-rate-comparison', 'refinance'],
    generated: true,
  },
  {
    id: 'home-equity-loan',
    route: '/home-equity-loan-calculator',
    title: 'Home Equity Loan Calculator',
    description: 'Estimate monthly payments and total interest for a fixed-rate home equity loan.',
    category: 'mortgage',
    faqs: [],
    related: ['heloc', 'mortgage-interest', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'heloc',
    route: '/heloc-calculator',
    title: 'HELOC Calculator',
    description: 'Estimate HELOC payments during the draw period and the repayment period based on your rate and term.',
    category: 'mortgage',
    faqs: [],
    related: ['home-equity-loan', 'mortgage-interest', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'rent-vs-buy',
    route: '/rent-vs-buy-calculator',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the estimated cost of renting vs buying over time using rent growth and home appreciation.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-affordability', 'mortgage-payment', 'net-worth'],
    generated: true,
  },
  {
    id: 'mortgage-rate-comparison',
    route: '/mortgage-rate-comparison-calculator',
    title: 'Mortgage Rate Comparison Calculator',
    description: 'Compare two mortgage rates and terms to see the difference in monthly payment and total interest.',
    category: 'mortgage',
    faqs: [],
    related: ['mortgage-payment', 'mortgage-points', 'refinance'],
    generated: true,
  },
  {
    id: 'mortgage-apr',
    route: '/mortgage-apr-calculator',
    title: 'Mortgage APR Calculator',
    description: 'Estimate mortgage APR by including points and upfront fees to compare loan offers more accurately.',
    category: 'mortgage',
    faqs: [
      {
        question: "What is mortgage APR?",
        answer: "APR (annual percentage rate) is a broader cost measure than the note rate. It includes interest plus certain upfront costs and fees spread over the loan term."
      },
      {
        question: "Why can APR be higher than the interest rate?",
        answer: "When you pay points or origination fees, you receive less net money than the loan amount, but you still repay based on the full loan. That increases the effective annual rate."
      },
      {
        question: "Is APR the best way to compare mortgages?",
        answer: "APR helps compare loans with different fee structures, especially if you keep the loan for most of the term. If you plan to refinance or sell soon, compare break-even months as well."
      },
      {
        question: "What fees are included in APR?",
        answer: "Lenders typically include certain finance charges (like points and origination fees). Other costs (like taxes, insurance, and some third-party fees) may be excluded depending on the lender and rules."
      }
    ],
    related: ['mortgage-payment', 'mortgage-points', 'closing-costs', 'mortgage-rate-comparison', 'refinance'],
    generated: true,
  },
  {
    id: 'property-tax',
    route: '/property-tax-calculator',
    title: 'Property Tax Calculator',
    description: 'Estimate annual and monthly property taxes based on home value, tax rate, and exemptions.',
    category: 'mortgage',
    faqs: [
      {
        question: "How do I estimate property taxes?",
        answer: "A common estimate is home value × local tax rate. Some areas tax assessed value instead of market value, and exemptions can reduce the taxable amount."
      },
      {
        question: "How do property taxes affect my mortgage payment?",
        answer: "If you escrow taxes, your lender collects a monthly amount to cover the annual bill. Higher taxes increase your total monthly housing cost."
      },
      {
        question: "What is a homestead exemption?",
        answer: "A homestead exemption is a benefit that can reduce the taxable value of your primary residence, lowering the property tax bill in eligible areas."
      },
      {
        question: "Will my property taxes change over time?",
        answer: "Yes. Taxes can change with reassessments, local budgets, and tax rate updates. New construction and renovations can also increase assessed value."
      }
    ],
    related: ['mortgage-payment', 'mortgage-affordability', 'down-payment', 'closing-costs'],
    generated: true,
  },
  {
    id: 'loan-interest',
    route: '/loan-interest-calculator',
    title: 'Loan Interest Calculator',
    description: 'Estimate monthly payment, total interest, and total loan cost for a fixed-rate installment loan.',
    category: 'loan',
    faqs: [],
    related: ['personal-loan', 'auto-loan', 'loan-comparison', 'apr'],
    generated: true,
  },
  {
    id: 'loan-payment',
    route: '/loan-payment-calculator',
    title: 'Loan Payment Calculator',
    description: 'Calculate a loan payment and see the total interest cost based on loan amount, rate, and term.',
    category: 'loan',
    faqs: [],
    related: ['loan-interest', 'loan-comparison', 'apr', 'personal-loan'],
    generated: true,
  },
  {
    id: 'loan-amortization',
    route: '/loan-amortization-calculator',
    title: 'Loan Amortization Calculator',
    description: 'Generate an amortization schedule and see how much of each payment goes to interest vs principal.',
    category: 'loan',
    faqs: [],
    related: ['loan-payment', 'loan-interest', 'debt-payoff', 'loan-payoff'],
    generated: true,
  },
  {
    id: 'loan-payoff',
    route: '/loan-payoff-calculator',
    title: 'Loan Payoff Calculator',
    description: 'Estimate how long it takes to pay off a loan and how extra payments can reduce total interest.',
    category: 'loan',
    faqs: [],
    related: ['loan-payment', 'loan-amortization', 'debt-payoff', 'loan-interest'],
    generated: true,
  },
  {
    id: 'debt-to-income',
    route: '/debt-to-income-calculator',
    title: 'Debt-to-Income (DTI) Ratio Calculator',
    description: 'Calculate your debt-to-income ratio to understand borrowing eligibility for loans and mortgages.',
    category: 'loan',
    faqs: [],
    related: ['mortgage-affordability', 'loan-payment', 'auto-loan', 'personal-loan'],
    generated: true,
  },
  {
    id: 'simple-interest-loan',
    route: '/simple-interest-loan-calculator',
    title: 'Simple Interest Loan Calculator',
    description: 'Calculate interest and total cost using simple interest (no compounding) for short-term loans.',
    category: 'loan',
    faqs: [],
    related: ['loan-interest', 'loan-payment', 'apr', 'personal-loan'],
    generated: true,
  },
  {
    id: 'business-loan',
    route: '/business-loan-calculator',
    title: 'Business Loan Calculator',
    description: 'Estimate business loan payments, total interest, and total cost for fixed-rate term loans.',
    category: 'loan',
    faqs: [],
    related: ['loan-payment', 'loan-interest', 'apr', 'loan-comparison'],
    generated: true,
  },
  {
    id: 'boat-loan',
    route: '/boat-loan-calculator',
    title: 'Boat Loan Calculator',
    description: 'Calculate boat loan payments and total interest cost based on your loan amount, rate, and term.',
    category: 'loan',
    faqs: [],
    related: ['auto-loan', 'loan-payment', 'loan-interest', 'loan-comparison'],
    generated: true,
  },
  {
    id: 'rv-loan',
    route: '/rv-loan-calculator',
    title: 'RV Loan Calculator',
    description: 'Estimate RV loan payments and total interest to plan your purchase with realistic monthly costs.',
    category: 'loan',
    faqs: [],
    related: ['auto-loan', 'loan-payment', 'loan-interest', 'loan-comparison'],
    generated: true,
  },
  {
    id: 'motorcycle-loan',
    route: '/motorcycle-loan-calculator',
    title: 'Motorcycle Loan Calculator',
    description: 'Calculate motorcycle loan payments and total interest cost for different rates and terms.',
    category: 'loan',
    faqs: [],
    related: ['auto-loan', 'loan-payment', 'loan-interest', 'loan-comparison'],
    generated: true,
  },
  {
    id: 'consolidation-loan',
    route: '/debt-consolidation-loan-calculator',
    title: 'Debt Consolidation Loan Calculator',
    description: 'Estimate payment and savings when consolidating multiple debts into one fixed-rate loan.',
    category: 'loan',
    faqs: [],
    related: ['debt-payoff', 'credit-card-payoff', 'loan-payment', 'apr'],
    generated: true,
  },
  {
    id: 'payday-loan',
    route: '/payday-loan-calculator',
    title: 'Payday Loan Calculator',
    description: 'Estimate the true cost of a payday loan using fees and effective APR.',
    category: 'loan',
    faqs: [],
    related: ['loan-interest', 'credit-card-payoff', 'debt-payoff', 'apr'],
    generated: true,
  },
  {
    id: 'weekly-pay',
    route: '/weekly-pay-calculator',
    title: 'Weekly Pay Calculator',
    description: 'Convert salary or hourly pay into a weekly paycheck estimate based on hours and weeks worked.',
    category: 'salary',
    faqs: [],
    related: ['paycheck', 'salary-to-hourly', 'hourly-to-salary', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'biweekly-pay',
    route: '/biweekly-pay-calculator',
    title: 'Biweekly Pay Calculator',
    description: 'Estimate biweekly pay from salary or hourly wages and understand how many paychecks you get per year.',
    category: 'salary',
    faqs: [],
    related: ['paycheck', 'take-home-pay', 'salary-to-hourly', 'after-tax-income'],
    relatedArticles: [
      { title: "How Overtime Pay is Calculated", href: "/blog/how-overtime-pay-is-calculated" },
      { title: "Overtime Rules: Exempt vs Non-Exempt", href: "/blog/overtime-laws-exempt-vs-nonexempt" }
    ],
    generated: true,
  },
  {
    id: 'monthly-salary',
    route: '/monthly-salary-calculator',
    title: 'Monthly Salary Calculator',
    description: 'Convert annual salary to monthly income and compare salary scenarios quickly.',
    category: 'salary',
    faqs: [],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'after-tax-income'],
    generated: true,
  },
  {
    id: 'overtime',
    route: '/overtime-calculator',
    title: 'Overtime Pay Calculator',
    description: 'Estimate overtime pay based on hourly rate, overtime rate multiplier, and overtime hours worked.',
    category: 'salary',
    faqs: [
      {
        question: "How is overtime pay calculated?",
        answer: "In the U.S., the FLSA requires overtime pay at a rate of at least 1.5 times the regular hourly rate (time-and-a-half) for all hours worked over 40 in a single workweek."
      },
      {
        question: "What is 'time-and-a-half'?",
        answer: "Time-and-a-half is the standard multiplier for overtime. It means for every hour of overtime worked, you earn your regular hourly rate plus an additional 50% of that rate."
      },
      {
        question: "Is there double-time pay?",
        answer: "While not required by federal law, some states (like California) or specific employment contracts may require 'double-time' (2x pay) for certain conditions, such as working over 12 hours in a day."
      },
      {
        question: "Who is eligible for overtime pay?",
        answer: "Most hourly (non-exempt) employees are eligible for overtime. Salaried employees may be exempt if they earn above a certain threshold and perform specific job duties defined by the FLSA."
      },
      {
        question: "Do weekends and holidays count as overtime?",
        answer: "Federal law does not require overtime pay for weekends or holidays unless those hours push your total for the workweek over 40 hours. However, many employers offer premium pay for these days."
      }
    ],
    related: ['paycheck', 'take-home-pay', 'salary-to-hourly', 'after-tax-income'],
    relatedArticles: [
      { title: "How Overtime Pay is Calculated", href: "/blog/how-overtime-pay-is-calculated" },
      { title: "Overtime Rules: Exempt vs Non-Exempt", href: "/blog/overtime-laws-exempt-vs-nonexempt" }
    ],
    generated: true,
  },
  {
    id: 'time-and-a-half',
    route: '/time-and-a-half-calculator',
    title: 'Time and a Half Calculator',
    description: 'Calculate time-and-a-half pay for overtime hours and estimate your total earnings.',
    category: 'salary',
    faqs: [],
    related: ['overtime', 'weekly-pay', 'paycheck', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'salary-increase',
    route: '/salary-increase-calculator',
    title: 'Salary Increase Calculator',
    description: 'Calculate the impact of a raise on your annual, monthly, and hourly pay and your percentage increase.',
    category: 'salary',
    faqs: [],
    related: ['salary-to-hourly', 'hourly-to-salary', 'after-tax-income', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'bonus',
    route: '/bonus-calculator',
    title: 'Bonus Calculator',
    description: 'Estimate a bonus payout and see how different bonus amounts affect your annual compensation.',
    category: 'salary',
    faqs: [],
    related: ['after-tax-income', 'paycheck', 'take-home-pay', 'salary-increase'],
    generated: true,
  },
  {
    id: 'commission',
    route: '/commission-calculator',
    title: 'Commission Calculator',
    description: 'Calculate commission earnings based on sales volume, commission rate, and base pay.',
    category: 'salary',
    faqs: [],
    related: ['after-tax-income', 'paycheck', 'take-home-pay', 'salary-increase'],
    generated: true,
  },
  {
    id: 'hourly-to-monthly',
    route: '/hourly-to-monthly-calculator',
    title: 'Hourly to Monthly Calculator',
    description: 'Convert an hourly wage to monthly income using hours per week and weeks per year.',
    category: 'salary',
    faqs: [],
    related: ['hourly-to-salary', 'monthly-salary', 'paycheck', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'monthly-to-hourly',
    route: '/monthly-to-hourly-calculator',
    title: 'Monthly to Hourly Calculator',
    description: 'Convert monthly income into an hourly wage using hours per week and weeks per year.',
    category: 'salary',
    faqs: [],
    related: ['salary-to-hourly', 'hourly-to-salary', 'weekly-pay', 'paycheck'],
    generated: true,
  },
  {
    id: 'future-value',
    route: '/future-value-calculator',
    title: 'Future Value Calculator',
    description: 'Calculate the future value of an investment with an interest rate and optional recurring contributions.',
    category: 'finance',
    faqs: [],
    related: ['compound-interest', 'investment-return', 'roi', 'inflation', 'present-value', 'net-present-value'],
    generated: true,
  },
  {
    id: 'present-value',
    route: '/present-value-calculator',
    title: 'Present Value Calculator',
    description: 'Calculate what a future amount is worth today using a discount rate and time horizon.',
    category: 'finance',
    faqs: [],
    related: ['future-value', 'inflation', 'investment-return', 'cagr', 'net-present-value'],
    generated: true,
  },
  {
    id: 'net-present-value',
    route: '/net-present-value-calculator',
    title: 'Net Present Value (NPV) Calculator',
    description: 'Calculate net present value for an investment using discount rate, cash flows, and an optional terminal value.',
    category: 'finance',
    faqs: [
      {
        question: "What does NPV mean?",
        answer: "Net present value is the present value of future cash inflows minus the initial investment. Positive NPV means the investment clears your required return (discount rate)."
      },
      {
        question: "What discount rate should I use?",
        answer: "Many people use a required return or hurdle rate that reflects risk (for example, 6%–12% depending on the investment). Higher discount rates penalize future cash flows more."
      },
      {
        question: "What is a terminal value?",
        answer: "Terminal value is the estimated value of the asset at the end of the projection period (like resale value or final lump sum). It is discounted back like any other cash flow."
      },
      {
        question: "Does NPV account for inflation?",
        answer: "NPV accounts for inflation only if your cash flows and discount rate are stated consistently in nominal (includes inflation) or real (inflation-adjusted) terms."
      }
    ],
    related: ['present-value', 'future-value', 'investment-return', 'roi', 'cagr'],
    generated: true,
  },
  {
    id: 'cagr',
    route: '/cagr-calculator',
    title: 'CAGR Calculator',
    description: 'Calculate compound annual growth rate (CAGR) to compare investment performance over time.',
    category: 'finance',
    faqs: [],
    related: ['roi', 'investment-return', 'future-value', 'inflation'],
    generated: true,
  },
  {
    id: 'rule-of-72',
    route: '/rule-of-72-calculator',
    title: 'Rule of 72 Calculator',
    description: 'Estimate how long it takes to double your money based on an annual return rate.',
    category: 'finance',
    faqs: [],
    related: ['cagr', 'compound-interest', 'future-value', 'inflation'],
    generated: true,
  },
  {
    id: 'dividend-yield',
    route: '/dividend-yield-calculator',
    title: 'Dividend Yield Calculator',
    description: 'Calculate dividend yield from price and dividend amount to compare income-producing investments.',
    category: 'finance',
    faqs: [],
    related: ['dividend-growth', 'dividend-reinvestment', 'investment-return', 'roi'],
    generated: true,
  },
  {
    id: 'dividend-growth',
    route: '/dividend-growth-calculator',
    title: 'Dividend Growth Calculator',
    description: 'Project future dividends based on a starting dividend and an annual dividend growth rate.',
    category: 'finance',
    faqs: [],
    related: ['dividend-yield', 'dividend-reinvestment', 'future-value', 'compound-interest'],
    generated: true,
  },
  {
    id: 'dividend-reinvestment',
    route: '/dividend-reinvestment-calculator',
    title: 'Dividend Reinvestment (DRIP) Calculator',
    description: 'Estimate portfolio growth when dividends are reinvested over time with yield and growth assumptions.',
    category: 'finance',
    faqs: [],
    related: ['dividend-yield', 'compound-interest', 'investment-return', 'cagr'],
    generated: true,
  },
  {
    id: 'expense-ratio',
    route: '/expense-ratio-calculator',
    title: 'Expense Ratio Calculator',
    description: 'Estimate how fund fees impact investment growth and compare outcomes over time.',
    category: 'finance',
    faqs: [],
    related: ['investment-fees', 'investment-return', 'future-value', 'cagr'],
    generated: true,
  },
  {
    id: 'inflation-adjusted-return',
    route: '/inflation-adjusted-return-calculator',
    title: 'Inflation-Adjusted Return Calculator',
    description: 'Convert nominal investment returns into inflation-adjusted results to understand real buying power.',
    category: 'finance',
    faqs: [],
    related: ['inflation', 'real-return', 'investment-return', 'cagr'],
    generated: true,
  },
  {
    id: 'real-return',
    route: '/real-return-calculator',
    title: 'Real Return Calculator',
    description: 'Calculate the real return rate after inflation to better compare long-term investment outcomes.',
    category: 'finance',
    faqs: [],
    related: ['inflation', 'inflation-adjusted-return', 'cagr', 'investment-return'],
    generated: true,
  },
  {
    id: 'stock-average-price',
    route: '/stock-average-price-calculator',
    title: 'Stock Average Price Calculator',
    description: 'Calculate your average cost per share across multiple purchases to understand your breakeven price.',
    category: 'finance',
    faqs: [],
    related: ['roi', 'investment-return', 'cagr', 'future-value'],
    generated: true,
  },
  {
    id: 'investment-fees',
    route: '/investment-fees-calculator',
    title: 'Investment Fees Calculator',
    description: 'Estimate how advisory fees and fund fees reduce portfolio growth over time.',
    category: 'finance',
    faqs: [],
    related: ['expense-ratio', 'investment-return', 'future-value', 'cagr'],
    generated: true,
  },
  {
    id: 'annuity',
    route: '/annuity-calculator',
    title: 'Annuity Calculator',
    description: 'Estimate future value or payment amounts for an annuity using a rate, term, and contribution.',
    category: 'finance',
    faqs: [],
    related: ['future-value', 'present-value', 'retirement', 'savings'],
    generated: true,
  },
  {
    id: 'annuity-payout',
    route: '/annuity-payout-calculator',
    title: 'Annuity Payout Calculator',
    description: 'Estimate monthly payout from an annuity based on balance, rate, and payout term.',
    category: 'finance',
    faqs: [],
    related: ['annuity', 'retirement', 'four-percent-rule', 'present-value'],
    generated: true,
  },
  {
    id: 'payback-period',
    route: '/payback-period-calculator',
    title: 'Payback Period Calculator',
    description: 'Estimate how long it takes for an investment to pay back its initial cost from annual cash flows.',
    category: 'finance',
    faqs: [],
    related: ['roi', 'investment-return', 'future-value', 'cagr'],
    generated: true,
  },
  {
    id: 'savings-goal',
    route: '/savings-goal-calculator',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much you need to save each month to reach a savings goal by a target date.',
    category: 'finance',
    faqs: [],
    related: ['savings', 'budget', 'emergency-fund', 'future-value'],
    generated: true,
  },
  {
    id: 'sinking-fund',
    route: '/sinking-fund-calculator',
    title: 'Sinking Fund Calculator',
    description: 'Plan a sinking fund by calculating a monthly amount needed for an upcoming expense.',
    category: 'finance',
    faqs: [],
    related: ['budget', 'savings-goal', 'emergency-fund', 'net-worth'],
    generated: true,
  },
  {
    id: 'debt-snowball',
    route: '/debt-snowball-calculator',
    title: 'Debt Snowball Calculator',
    description: 'Create a debt snowball payoff plan that prioritizes smallest balances first for quick wins.',
    category: 'finance',
    faqs: [],
    related: ['debt-payoff', 'credit-card-payoff', 'budget', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'debt-avalanche',
    route: '/debt-avalanche-calculator',
    title: 'Debt Avalanche Calculator',
    description: 'Create a debt avalanche payoff plan that prioritizes highest interest rates first to save money.',
    category: 'finance',
    faqs: [],
    related: ['debt-payoff', 'credit-card-payoff', 'budget', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'bill-split',
    route: '/bill-split-calculator',
    title: 'Bill Split Calculator',
    description: 'Split a bill between people and calculate tips and per-person totals quickly.',
    category: 'finance',
    faqs: [],
    related: ['budget', 'net-income', 'savings-rate', 'sinking-fund', 'savings-goal', 'emergency-fund'],
    generated: true,
  },
  {
    id: 'savings-rate',
    route: '/savings-rate-calculator',
    title: 'Savings Rate Calculator',
    description: 'Calculate your savings rate based on income and expenses to track progress toward financial goals.',
    category: 'finance',
    faqs: [],
    related: ['budget', 'net-income', 'fire', 'savings-goal'],
    generated: true,
  },
  {
    id: 'net-income',
    route: '/net-income-calculator',
    title: 'Net Income Calculator',
    description: 'Estimate net income after taxes and deductions to understand your real monthly take-home pay.',
    category: 'finance',
    faqs: [],
    related: ['take-home-pay', 'after-tax-income', 'budget', 'paycheck'],
    generated: true,
  },
  {
    id: 'income-tax',
    route: '/income-tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Estimate federal income tax and effective tax rate based on income and filing status.',
    category: 'tax',
    faqs: [
      {
        question: "How is federal income tax calculated?",
        answer: "The U.S. uses a progressive tax system with seven brackets (10%, 12%, 22%, 24%, 32%, 35%, and 37%). You only pay the higher rate on the portion of your income that falls within that specific bracket."
      },
      {
        question: "What is the standard deduction?",
        answer: "The standard deduction is a set dollar amount that reduces the income you're taxed on. Most taxpayers choose it instead of itemizing deductions like mortgage interest or charitable gifts."
      },
      {
        question: "What is the difference between marginal and effective tax rates?",
        answer: "Your marginal rate is the tax percentage on your last dollar of income (your highest bracket). Your effective rate is the actual percentage of your total income paid in taxes after all brackets and deductions are considered."
      },
      {
        question: "Does this calculator include state taxes?",
        answer: "This calculator focuses on federal income tax. State tax rates vary widely; some states have a flat rate, some are progressive, and some have no income tax at all."
      },
      {
        question: "How can I lower my taxable income?",
        answer: "Common ways to reduce taxable income include contributing to a 401(k) or Traditional IRA, contributing to a Health Savings Account (HSA), or claiming eligible tax credits and deductions."
      }
    ],
    related: ['effective-tax-rate', 'after-tax-income', 'take-home-pay', 'self-employment-tax', 'sales-tax'],
    relatedArticles: [
      { title: "How US Tax Brackets Work", href: "/blog/how-us-tax-brackets-work" },
      { title: "Marginal vs Effective Tax Rate", href: "/blog/marginal-vs-effective-tax-rate" }
    ],
    generated: true,
  },
  {
    id: 'tax-bracket',
    route: '/tax-bracket-calculator',
    title: 'Tax Bracket Calculator',
    description: 'Find your marginal tax bracket and estimate tax owed by bracket based on taxable income and filing status.',
    category: 'tax',
    faqs: [
      {
        question: "What is a marginal tax bracket?",
        answer: "Your marginal tax bracket is the rate applied to your last dollar of taxable income. Only the portion of income within that bracket is taxed at that higher rate."
      },
      {
        question: "What is an effective tax rate?",
        answer: "Your effective tax rate is total tax divided by total income (or taxable income for a simplified view). It is usually lower than your marginal rate because of lower rates in the earlier brackets."
      },
      {
        question: "Is this based on taxable income or gross income?",
        answer: "This calculator uses taxable income. If you only know gross income, use the income tax calculator and standard deduction assumptions to estimate taxable income."
      },
      {
        question: "Does this include credits, deductions, and state taxes?",
        answer: "No. This bracket breakdown focuses on federal brackets and does not model credits, itemized deductions, AMT, or state/local taxes."
      },
      {
        question: "Why can two people with the same income owe different taxes?",
        answer: "Filing status, deductions, credits, and other sources of income can change taxable income and the final tax owed."
      }
    ],
    related: ['income-tax', 'effective-tax-rate', 'after-tax-income', 'self-employment-tax', 'capital-gains-tax'],
    generated: true,
  },
  {
    id: 'sales-tax',
    route: '/sales-tax-calculator',
    title: 'Sales Tax Calculator',
    description: 'Calculate sales tax and the total purchase price based on a sales tax rate.',
    category: 'tax',
    faqs: [
      {
        question: "How is sales tax calculated?",
        answer: "Sales tax is calculated by multiplying the pre-tax price of an item by the local sales tax rate. For example, if you buy a $100 item with an 8% tax rate, the tax is $8 and the total is $108."
      },
      {
        question: "Is sales tax the same everywhere?",
        answer: "No, sales tax rates are set by states, counties, and cities. Some states like Oregon and Delaware have no sales tax, while others like California and New York have varying local rates."
      },
      {
        question: "How do I calculate price from the total (reverse sales tax)?",
        answer: "To find the pre-tax price from a total that includes tax, divide the total by (1 + tax rate). For a $108 total at 8% tax, calculate $108 / 1.08 = $100."
      },
      {
        question: "What items are typically exempt from sales tax?",
        answer: "Exemptions vary by state but often include groceries, prescription medications, and certain types of clothing or school supplies during tax-free holidays."
      },
      {
        question: "What is a 'use tax'?",
        answer: "Use tax is a tax on items purchased from out-of-state retailers (like online) for use in your home state when sales tax wasn't collected. It is usually the same rate as your local sales tax."
      }
    ],
    related: ['income-tax', 'effective-tax-rate', 'after-tax-income', 'budget'],
    relatedArticles: [
      { title: "States With No Income Tax", href: "/blog/states-with-no-income-tax" }
    ],
    generated: true,
  },
  {
    id: 'capital-gains-tax',
    route: '/capital-gains-tax-calculator',
    title: 'Capital Gains Tax Calculator',
    description: 'Estimate capital gains and potential tax owed when selling an investment at a profit.',
    category: 'tax',
    faqs: [
      {
        question: "What is capital gains tax?",
        answer: "Capital gains tax is a tax on the profit you make when you sell an asset (like stocks, real estate, or collectibles) for more than you paid for it."
      },
      {
        question: "What is the difference between short-term and long-term capital gains?",
        answer: "Short-term capital gains apply to assets held for one year or less and are taxed at ordinary income rates. Long-term capital gains apply to assets held for more than a year and are taxed at lower preferential rates (0%, 15%, or 20%)."
      },
      {
        question: "How is the capital gains tax rate determined?",
        answer: "The long-term capital gains rate depends on your filing status and total taxable income. Most individuals pay 15%. High earners may pay 20% plus a 3.8% Net Investment Income Tax (NIIT)."
      },
      {
        question: "Can I offset capital gains with capital losses?",
        answer: "Yes, you can use capital losses to offset capital gains in the same year. If your total losses exceed your total gains, you can typically use up to $3,000 to offset other income and carry the rest forward to future years."
      },
      {
        question: "Is there a capital gains exclusion for home sales?",
        answer: "Yes, if you've owned and used a home as your primary residence for at least two of the five years before selling, you can typically exclude up to $250,000 (single) or $500,000 (married filing jointly) of profit from tax."
      }
    ],
    related: ['income-tax', 'effective-tax-rate', 'roi', 'investment-return'],
    relatedArticles: [
      { title: "States With No Income Tax", href: "/blog/states-with-no-income-tax" }
    ],
    generated: true,
  },
  {
    id: 'self-employment-tax',
    route: '/self-employment-tax-calculator',
    title: 'Self-Employment Tax Calculator',
    description: 'Estimate self-employment tax based on net earnings and understand your Social Security and Medicare taxes.',
    category: 'tax',
    faqs: [
      {
        question: "What is self-employment tax?",
        answer: "Self-employment tax (SE tax) is the Social Security and Medicare tax for individuals who work for themselves. It's similar to the FICA taxes withheld from the pay of most wage earners."
      },
      {
        question: "What is the current self-employment tax rate?",
        answer: "The current SE tax rate is 15.3% of net earnings. This consists of 12.4% for Social Security and 2.9% for Medicare."
      },
      {
        question: "Is there an income limit for self-employment tax?",
        answer: "Only the Social Security portion (12.4%) has an income limit (adjusted annually by the SSA). The Medicare portion (2.9%) applies to all your self-employment income, and an additional 0.9% may apply to high earners."
      },
      {
        question: "Can I deduct self-employment tax?",
        answer: "Yes, you can deduct half of your self-employment tax from your gross income when calculating your income tax. This deduction is taken 'above the line' on your Form 1040."
      },
      {
        question: "When do I have to pay self-employment tax?",
        answer: "If your net earnings from self-employment were $400 or more, you must file Schedule SE and pay self-employment tax. You typically pay this through quarterly estimated tax payments."
      }
    ],
    related: ['income-tax', 'effective-tax-rate', 'after-tax-income', 'paycheck'],
    relatedArticles: [
      { title: "What is FICA: Social Security & Medicare", href: "/blog/what-is-fica-social-security-medicare" }
    ],
    generated: true,
  },
  {
    id: 'effective-tax-rate',
    route: '/effective-tax-rate-calculator',
    title: 'Effective Tax Rate Calculator',
    description: 'Calculate your effective tax rate based on total taxes paid and total income.',
    category: 'tax',
    faqs: [
      {
        question: "What is an effective tax rate?",
        answer: "Your effective tax rate is the actual percentage of your total income you pay in taxes. It is calculated by dividing your total tax liability by your total income."
      },
      {
        question: "How is it different from a marginal tax rate?",
        answer: "Your marginal tax rate is the rate on your last dollar of income (your highest tax bracket). Your effective rate is usually much lower because it reflects the average rate paid across all lower brackets and after deductions."
      },
      {
        question: "Why is my effective tax rate lower than my bracket?",
        answer: "In a progressive tax system, you pay lower rates on the initial portions of your income. After considering standard deductions and tax credits, the average rate you pay across all your income is lower than your highest marginal rate."
      },
      {
        question: "Does effective tax rate include payroll taxes?",
        answer: "Typically, people calculate effective income tax rates separately from payroll taxes (Social Security and Medicare), but you can calculate a total effective tax rate by including all taxes paid."
      },
      {
        question: "What is a good effective tax rate?",
        answer: "There is no single 'good' rate, as it depends on your income level and personal situation. However, understanding your effective rate is crucial for accurate budgeting and long-term financial planning."
      }
    ],
    related: ['income-tax', 'after-tax-income', 'take-home-pay', 'self-employment-tax'],
    relatedArticles: [
      { title: "Marginal vs Effective Tax Rate", href: "/blog/marginal-vs-effective-tax-rate" },
      { title: "How US Tax Brackets Work", href: "/blog/how-us-tax-brackets-work" }
    ],
    generated: true,
  },
  {
    id: 'credit-card-interest',
    route: '/credit-card-interest-calculator',
    title: 'Credit Card Interest Calculator',
    description: 'Estimate credit card interest charges based on balance, APR, and monthly payment.',
    category: 'credit-card',
    faqs: [],
    related: ['credit-card-payoff', 'credit-card-minimum-payment', 'balance-transfer', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'credit-card-minimum-payment',
    route: '/credit-card-minimum-payment-calculator',
    title: 'Credit Card Minimum Payment Calculator',
    description: 'Estimate payoff time and total interest if you only make minimum payments on your credit card.',
    category: 'credit-card',
    faqs: [],
    related: ['credit-card-payoff', 'credit-card-interest', 'balance-transfer', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'balance-transfer',
    route: '/balance-transfer-calculator',
    title: 'Balance Transfer Calculator',
    description: 'Estimate savings from a balance transfer by comparing APRs, fees, and a monthly payoff plan.',
    category: 'credit-card',
    faqs: [],
    related: ['credit-card-payoff', 'credit-card-interest', 'credit-card-minimum-payment', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'credit-utilization',
    route: '/credit-utilization-calculator',
    title: 'Credit Utilization Calculator',
    description: 'Calculate credit utilization across cards and see how balances and limits affect your utilization rate.',
    category: 'credit-card',
    faqs: [],
    related: ['credit-card-payoff', 'credit-card-interest', 'balance-transfer', 'debt-payoff'],
    generated: true,
  },
  {
    id: 'fire',
    route: '/fire-calculator',
    title: 'FIRE Calculator (Financial Independence)',
    description: 'Estimate your FIRE number and how long it may take to reach financial independence based on savings rate.',
    category: 'retirement',
    faqs: [],
    related: ['retirement', 'savings-rate', 'budget', 'four-percent-rule'],
    generated: true,
  },
  {
    id: 'roth-ira',
    route: '/roth-ira-calculator',
    title: 'Roth IRA Calculator',
    description: 'Estimate Roth IRA growth over time based on contributions, return rate, and years invested.',
    category: 'retirement',
    faqs: [],
    related: ['retirement', '401k', 'savings', 'compound-interest'],
    generated: true,
  },
  {
    id: 'ira',
    route: '/ira-calculator',
    title: 'IRA Calculator',
    description: 'Project IRA growth over time using contribution amounts, expected returns, and years to retirement.',
    category: 'retirement',
    faqs: [],
    related: ['roth-ira', 'retirement', '401k', 'compound-interest'],
    generated: true,
  },
  {
    id: 'four-percent-rule',
    route: '/four-percent-rule-calculator',
    title: '4% Rule Calculator',
    description: 'Estimate a sustainable retirement withdrawal amount using the 4% rule and your portfolio size.',
    category: 'retirement',
    faqs: [],
    related: ['retirement', 'fire', 'annuity-payout', 'inflation'],
    generated: true,
  },
  {
    id: 'pension',
    route: '/pension-calculator',
    title: 'Pension Calculator',
    description: 'Estimate pension income based on final salary, years of service, and accrual rate.',
    category: 'retirement',
    faqs: [],
    related: ['retirement', 'four-percent-rule', 'annuity-payout', 'savings'],
    generated: true,
  },
  {
    id: 'rmd',
    route: '/rmd-calculator',
    title: 'RMD Calculator',
    description: 'Estimate required minimum distributions (RMDs) based on your age and retirement account balance.',
    category: 'retirement',
    faqs: [],
    related: ['retirement', 'ira', 'four-percent-rule', 'annuity-payout'],
    generated: true,
  },
  {
    id: 'va-loan',
    route: '/va-loan-calculator',
    title: 'VA Loan Calculator',
    description: 'Estimate monthly payments for a VA home loan, including the VA funding fee and no down payment options.',
    category: 'mortgage',
    faqs: [
      {
        question: "Who is eligible for a VA loan?",
        answer: "VA loans are available to active-duty service members, veterans, and eligible surviving spouses who meet certain service requirements."
      },
      {
        question: "Do VA loans require a down payment?",
        answer: "No, one of the biggest benefits of a VA loan is that it typically requires $0 down payment for qualified borrowers."
      }
    ],
    related: ['mortgage-payment', 'mortgage-affordability', 'closing-costs'],
    generated: true,
  },
  {
    id: 'fha-loan',
    route: '/fha-loan-calculator',
    title: 'FHA Loan Calculator',
    description: 'Calculate monthly payments for an FHA loan, including upfront and monthly mortgage insurance premiums (MIP).',
    category: 'mortgage',
    faqs: [
      {
        question: "What is the minimum down payment for an FHA loan?",
        answer: "The minimum down payment for an FHA loan is 3.5% for borrowers with a credit score of 580 or higher."
      },
      {
        question: "Does an FHA loan require mortgage insurance?",
        answer: "Yes, FHA loans require both an upfront mortgage insurance premium (UFMIP) and an annual mortgage insurance premium (MIP) paid monthly."
      }
    ],
    related: ['mortgage-payment', 'mortgage-affordability', 'pmi'],
    generated: true,
  },
  {
    id: 'reverse-mortgage',
    route: '/reverse-mortgage-calculator',
    title: 'Reverse Mortgage Calculator',
    description: 'Estimate how much equity you can access through a Home Equity Conversion Mortgage (HECM) based on your age and home value.',
    category: 'mortgage',
    faqs: [
      {
        question: "What is a reverse mortgage?",
        answer: "A reverse mortgage allows homeowners aged 62 or older to borrow against their home equity without making monthly mortgage payments."
      }
    ],
    related: ['home-equity-loan', 'heloc', 'net-worth'],
    generated: true,
  },
  {
    id: 'student-loan-refinance',
    route: '/student-loan-refinance-calculator',
    title: 'Student Loan Refinance Calculator',
    description: 'Compare your current student loans to a new refinanced rate to see how much you can save on interest and monthly payments.',
    category: 'loan',
    faqs: [
      {
        question: "Should I refinance my federal student loans?",
        answer: "Refinancing federal loans into a private loan means losing federal benefits like income-driven repayment and forgiveness programs. Only do this if you value interest savings more."
      }
    ],
    related: ['student-loan', 'loan-comparison', 'refinance'],
    generated: true,
  },
  {
    id: 'parent-plus-loan',
    route: '/parent-plus-loan-calculator',
    title: 'Parent PLUS Loan Calculator',
    description: 'Estimate monthly payments and total interest for federal Parent PLUS loans used for a child\'s education.',
    category: 'loan',
    faqs: [
      {
        question: "What is a Parent PLUS loan?",
        answer: "A Parent PLUS loan is a federal loan available to parents of dependent undergraduate students to help pay for education expenses."
      }
    ],
    related: ['student-loan', 'loan-payment', 'personal-loan'],
    generated: true,
  },
  {
    id: 'estate-tax',
    route: '/estate-tax-calculator',
    title: 'Estate Tax Calculator',
    description: 'Estimate potential federal estate tax liability based on the total value of an estate and current exemption limits.',
    category: 'tax',
    faqs: [
      {
        question: "What is the federal estate tax exemption?",
        answer: "For 2024, the federal estate tax exemption is $13.61 million per individual. Estates valued below this amount typically owe no federal estate tax."
      }
    ],
    related: ['inheritance-tax', 'gift-tax', 'net-worth'],
    generated: true,
  },
  {
    id: 'inheritance-tax',
    route: '/inheritance-tax-calculator',
    title: 'Inheritance Tax Calculator',
    description: 'Estimate potential inheritance tax based on the state and your relationship to the deceased.',
    category: 'tax',
    faqs: [
      {
        question: "Is there a federal inheritance tax?",
        answer: "No, there is no federal inheritance tax. However, six states (IA, KY, MD, NE, NJ, PA) currently impose an inheritance tax."
      }
    ],
    related: ['estate-tax', 'gift-tax', 'income-tax'],
    generated: true,
  },
  {
    id: 'gift-tax',
    route: '/gift-tax-calculator',
    title: 'Gift Tax Calculator',
    description: 'Calculate potential gift tax implications for large gifts and understand the annual exclusion limits.',
    category: 'tax',
    faqs: [
      {
        question: "What is the annual gift tax exclusion?",
        answer: "For 2024, the annual exclusion is $18,000 per recipient. Gifts below this amount do not need to be reported and do not count against your lifetime exemption."
      }
    ],
    related: ['estate-tax', 'inheritance-tax', 'net-worth'],
    generated: true,
  },
  {
    id: 'social-security-benefits',
    route: '/social-security-benefits-calculator',
    title: 'Social Security Benefits Calculator',
    description: 'Estimate your future Social Security retirement benefits based on your earnings history and retirement age.',
    category: 'retirement',
    faqs: [
      {
        question: "At what age can I start collecting Social Security?",
        answer: "You can start as early as age 62, but your monthly benefit will be permanently reduced compared to waiting until your Full Retirement Age (FRA)."
      }
    ],
    related: ['retirement', 'pension', '401k'],
    generated: true,
  },
  {
    id: 'early-retirement',
    route: '/early-retirement-calculator',
    title: 'Early Retirement Calculator',
    description: 'Determine if you have enough savings to retire early and how long your portfolio will last.',
    category: 'retirement',
    faqs: [
      {
        question: "What is the 25x rule for early retirement?",
        answer: "A common rule of thumb is that you need 25 times your annual expenses saved to reach financial independence (based on the 4% rule)."
      }
    ],
    related: ['fire', 'four-percent-rule', 'retirement-savings'],
    generated: true,
  },
  {
    id: 'roth-vs-traditional-ira',
    route: '/roth-vs-traditional-ira-calculator',
    title: 'Roth vs. Traditional IRA Calculator',
    description: 'Compare the long-term tax advantages of a Roth IRA vs. a Traditional IRA based on your current and future tax brackets.',
    category: 'retirement',
    faqs: [
      {
        question: "Which is better: Roth or Traditional IRA?",
        answer: "Generally, a Roth IRA is better if you expect to be in a higher tax bracket in retirement. A Traditional IRA may be better if you need the tax deduction today."
      }
    ],
    related: ['roth-ira', 'ira', '401k'],
    generated: true,
  },
  {
    id: 'cost-of-living',
    route: '/cost-of-living-calculator',
    title: 'Cost of Living Calculator',
    description: 'Compare the cost of living between two cities and see how much you need to earn to maintain your current lifestyle.',
    category: 'finance',
    faqs: [
      {
        question: "What factors affect the cost of living?",
        answer: "Major factors include housing, taxes, groceries, utilities, transportation, and healthcare costs in a specific location."
      }
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'paycheck', 'take-home-pay', 'budget', 'net-income'],
    generated: true,
  },
  {
    id: 'severance-pay',
    route: '/severance-pay-calculator',
    title: 'Severance Pay Calculator',
    description: 'Estimate your net severance pay after taxes and see how long it will cover your essential expenses.',
    category: 'salary',
    faqs: [
      {
        question: "Is severance pay taxable?",
        answer: "Yes, severance pay is considered supplemental wages by the IRS and is subject to federal and state income taxes, as well as FICA taxes."
      }
    ],
    related: ['paycheck', 'emergency-fund', 'take-home-pay'],
    generated: true,
  },
  {
    id: 'crypto-return',
    route: '/crypto-return-calculator',
    title: 'Crypto Return Calculator',
    description: 'Calculate your profit or loss on cryptocurrency investments, including buy/sell prices and fees.',
    category: 'finance',
    faqs: [
      {
        question: "Are crypto gains taxable?",
        answer: "Yes, in the US and many other countries, selling cryptocurrency for a profit is subject to capital gains tax."
      }
    ],
    related: ['roi', 'investment-return', 'capital-gains-tax'],
    generated: true,
  },
  {
    id: 'bond-yield',
    route: '/bond-yield-calculator',
    title: 'Bond Yield Calculator',
    description: 'Calculate the current yield and yield to maturity (YTM) for a bond based on its price, coupon, and term.',
    category: 'finance',
    faqs: [
      {
        question: "What is yield to maturity (YTM)?",
        answer: "YTM is the total return anticipated on a bond if it is held until it matures, accounting for all interest payments and the difference between price and par value."
      }
    ],
    related: ['investment-return', 'future-value', 'roi'],
    generated: true,
  },
  {
    id: 'cd',
    route: '/cd-calculator',
    title: 'CD Calculator',
    description: 'Calculate how much interest you earn on a Certificate of Deposit. Enter your deposit amount, APY, and term to see total interest and final value.',
    category: 'finance',
    faqs: [
      {
        question: "What is a Certificate of Deposit (CD)?",
        answer: "A CD is a savings product offered by banks and credit unions that pays a fixed interest rate over a set term (typically 3 months to 5 years). In exchange for locking up your money, you earn a higher rate than a standard savings account. Early withdrawal usually incurs a penalty."
      },
      {
        question: "How is CD interest calculated?",
        answer: "Most CDs compound interest daily or monthly using the APY (Annual Percentage Yield). The formula is: Final Value = Principal × (1 + APY/100)^Years. The APY already accounts for compounding frequency, so you can use it directly for annual calculations."
      },
      {
        question: "What is the difference between APR and APY for CDs?",
        answer: "APR (Annual Percentage Rate) is the stated interest rate without compounding. APY (Annual Percentage Yield) reflects the effect of compounding over a year and is always equal to or higher than APR. Banks advertise APY for CDs to show the true earning power — always compare CDs using APY."
      },
      {
        question: "What are CD rates right now?",
        answer: "CD rates change frequently based on Federal Reserve policy. High-yield online banks and credit unions typically offer the best rates. As of recent Fed tightening cycles, 1-year CD rates have ranged from 4–5% APY at top institutions. Compare current rates at bankrate.com or your local bank."
      },
      {
        question: "What happens if I withdraw from a CD early?",
        answer: "Early withdrawal penalties vary by bank and CD term. Common penalties: 3 months' interest (short-term CDs) to 12–18 months' interest (long-term CDs). If you think you may need the funds, consider a no-penalty CD or a high-yield savings account instead."
      }
    ],
    related: ['savings', 'compound-interest', 'future-value', 'high-yield-savings'],
    generated: true,
  },
] as const satisfies readonly CalculatorSpecShape[];

export type CalculatorId = (typeof CALCULATOR_SPECS)[number]['id'];
export type CalculatorSpec = Omit<CalculatorSpecShape, 'id' | 'related'> & { id: CalculatorId; related: readonly CalculatorId[] };

const specMap: Record<CalculatorId, CalculatorSpec> = (CALCULATOR_SPECS as readonly CalculatorSpec[]).reduce((acc, spec) => {
  acc[spec.id] = spec;
  return acc;
}, {} as Record<CalculatorId, CalculatorSpec>);

export function getCalculatorSpec(id: CalculatorId): CalculatorSpec {
  return specMap[id];
}

export function getAllCalculatorRoutes(): `/${string}`[] {
  return CALCULATOR_SPECS.map(s => s.route);
}

const routeIdMap: Record<string, CalculatorId> = (CALCULATOR_SPECS as readonly { id: CalculatorId; route: `/${string}` }[]).reduce((acc, spec) => {
  acc[spec.route] = spec.id;
  return acc;
}, {} as Record<string, CalculatorId>);

export function getCalculatorSpecByRoute(route: `/${string}`): CalculatorSpec | undefined {
  const id = routeIdMap[route];
  return id ? getCalculatorSpec(id) : undefined;
}
