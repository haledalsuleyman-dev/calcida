const fs = require('fs');
const path = require('path');

const MAP = {
  'mortgage/200000-mortgage-payment': '/mortgage-payment-calculator',
  'mortgage/300000-mortgage-payment': '/mortgage-payment-calculator',
  'mortgage/400000-mortgage-payment': '/mortgage-payment-calculator',
  'mortgage/how-much-house-can-i-afford-on-70000-salary': '/mortgage-affordability-calculator',
  'loan/10000-loan-monthly-payment': '/personal-loan-calculator',
  'loan/20000-loan-payment': '/personal-loan-calculator',
  'loan/personal-loan-interest-example': '/personal-loan-calculator',
  'salary/20-an-hour-is-how-much-a-year': '/hourly-to-salary-calculator',
  'salary/25-an-hour-is-how-much-a-year': '/hourly-to-salary-calculator',
  'salary/50000-to-hourly': '/salary-to-hourly-calculator',
  'salary/60000-after-tax': '/after-tax-income-calculator',
  'salary/70000-after-tax': '/after-tax-income-calculator',
  'salary/70000-monthly-pay': '/after-tax-income-calculator',
  'salary/80000-after-tax': '/after-tax-income-calculator'
};

for (const [route, parentCanonical] of Object.entries(MAP)) {
  const filePath = path.join(process.cwd(), 'src/app', route, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.error('File not found: ' + filePath);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace canonical
  content = content.replace(/alternates:\s*\{\s*canonical:\s*['"`][^`"']+['"`]\s*\}/g, `alternates: { canonical: '${parentCanonical}' }`);

  // Add robots if not exist
  if (!content.includes('robots:')) {
    content = content.replace(/(alternates:\s*\{[^}]+\},)/, "$1\n  robots: { index: false, follow: true },");
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed ' + filePath);
}
