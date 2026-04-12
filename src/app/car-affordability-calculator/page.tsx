
import { CalculatorPage } from '@/components/CalculatorPage';
import { CarAffordabilityCalculator } from '@/components/calculators/loan/CarAffordabilityCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('car-affordability');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function CarAffordabilityPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Determining how much car you can afford is a matter of calculating the total purchase price based on your monthly budget, down payment, and loan interest rate.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Car Affordability Formula:</p>
            <p className="text-xl">Loan Amount = PMT x [((1 + r)^n - 1) / (r x (1 + r)^n)]</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>PMT = Monthly budget (max payment)</li>
                <li>r = Monthly interest rate (annual rate / 12)</li>
                <li>n = Total number of months (years x 12)</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li><strong>Monthly Budget:</strong> $400</li>
            <li><strong>Interest Rate:</strong> 5%</li>
            <li><strong>Loan Term:</strong> 5 Years</li>
            <li><strong>Down Payment:</strong> $5,000</li>
            <li><strong>Result:</strong> $21,196 (Loan) + $5,000 (Down) = <strong>$26,196 (Total Car Price)</strong></li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Buy a Car Without Ruining Your Finances</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Buying a car is one of the most significant financial decisions you'll make. Most people focus only on the monthly payment, but the true cost of car ownership includes insurance, fuel, maintenance, and depreciation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The 20/4/10 Rule: The Gold Standard for Car Buying</h2>
            <p className="mb-4">
              Financial experts recommend the 20/4/10 rule to ensure your car doesn't become a financial burden:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>20% Down Payment:</strong> Put down at least 20% of the purchase price. This helps prevent you from becoming "upside down" (owing more than the car is worth) the moment you drive off the lot.</li>
              <li><strong>4-Year Loan Term:</strong> Limit your car loan to 4 years (48 months). Shorter terms save you money on interest and ensure you're not paying for a car that's out of warranty.</li>
              <li><strong>10% Monthly Cost:</strong> Your total monthly car expenses (payment, insurance, fuel, and maintenance) should not exceed 10% of your gross (pre-tax) income.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Leasing vs. Buying: Which is Better?</h2>
            <p className="mb-4">
              The choice between leasing and buying depends on your priorities:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Leasing:</strong> Best for people who want a new car every few years, lower monthly payments, and no maintenance headaches. However, you never own the asset and there are often mileage limits.</li>
              <li><strong>Buying:</strong> Best for long-term ownership. While the monthly payments are higher, once the loan is paid off, you have an asset you can drive for years for "free." This is almost always the better financial move over the long term.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Don't Forget the Hidden Costs</h2>
            <p className="mb-4 text-blue-800">
              When using the calculator above, remember that your monthly budget should also account for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Auto Insurance:</strong> Often $100-$200 per month or more.</li>
              <li><strong>Fuel:</strong> Depending on your commute and the car's efficiency.</li>
              <li><strong>Maintenance:</strong> Aim to save at least $50-$100 per month for tires, oil changes, and repairs.</li>
            </ul>
          </section>
        </article>
      }
    >
      <CarAffordabilityCalculator />
    </CalculatorPage>
  );
}
