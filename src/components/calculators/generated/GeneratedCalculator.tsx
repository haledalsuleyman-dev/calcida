"use client";
import React from 'react';
import type { CalculatorId } from '@/lib/calculatorSpecs';
import { LoanLikeCalculator } from '@/components/calculators/generated/LoanLikeCalculator';
import { MortgageAffordabilityCalculator } from '@/components/calculators/generated/MortgageAffordabilityCalculator';
import { DownPaymentCalculator, PMICalculator, ClosingCostsCalculator, MortgagePointsCalculator, MortgageRateComparisonCalculator, VaLoanCalculator, FhaLoanCalculator, MortgageAprCalculator, PropertyTaxCalculator } from '@/components/calculators/generated/MortgageBasicsCalculators';
import { ARMCalculator, HELOCCalculator, HouseAffordabilityCalculator, InterestOnlyMortgageCalculator, MortgagePayoffCalculator, RentVsBuyCalculator, ReverseMortgageCalculator } from '@/components/calculators/generated/MortgageAdvancedCalculators';
import { AutoLeaseCalculator, DtiCalculator, ParentPlusLoanCalculator, PaydayLoanCalculator, SimpleInterestLoanCalculator, StudentLoanRefinanceCalculator } from '@/components/calculators/generated/LoanExtraCalculators';
import { BonusCalculator, CommissionCalculator, OvertimeCalculator, SalaryConversionCalculator, SalaryIncreaseCalculator, SeverancePayCalculator } from '@/components/calculators/generated/SalaryExtraCalculators';
import { CAGRCalculator, DividendGrowthCalculator, DividendReinvestmentCalculator, DividendYieldCalculator, FeeImpactCalculator, FutureValueCalculator, InflationAdjustedReturnCalculator, PaybackPeriodCalculator, PresentValueCalculator, NetPresentValueCalculator, RuleOf72Calculator, StockAveragePriceCalculator, CryptoReturnCalculator, BondYieldCalculator, AnnuityCalculator, AnnuityPayoutCalculator } from '@/components/calculators/generated/InvestmentExtraCalculators';
import { BillSplitCalculator, CostOfLivingCalculator, DebtStrategyCalculator, NetIncomeCalculator, SavingsGoalCalculator, SavingsRateCalculator, SinkingFundCalculator } from '@/components/calculators/generated/BudgetExtraCalculators';
import { CapitalGainsTaxCalculator, EffectiveTaxRateCalculator, EstateTaxCalculator, GiftTaxCalculator, IncomeTaxCalculator, InheritanceTaxCalculator, SalesTaxCalculator, SelfEmploymentTaxCalculator, TaxBracketCalculator } from '@/components/calculators/generated/TaxExtraCalculators';
import { BalanceTransferCalculator, CreditCardInterestCalculator, CreditCardMinimumPaymentCalculator, CreditUtilizationCalculator } from '@/components/calculators/generated/CreditCardExtraCalculators';
import { EarlyRetirementCalculator, FIRECalculator, FourPercentRuleCalculator, IraGrowthCalculator, PensionCalculator, RmdCalculator, RothVsTraditionalIraCalculator, SocialSecurityBenefitsCalculator } from '@/components/calculators/generated/RetirementExtraCalculators';

export function GeneratedCalculator({ id }: { id: CalculatorId }) {
  switch (id) {
    case 'mortgage-affordability':
      return <MortgageAffordabilityCalculator />;
    case 'mortgage-payoff':
      return <MortgagePayoffCalculator />;
    case 'house-affordability':
      return <HouseAffordabilityCalculator />;
    case 'down-payment':
      return <DownPaymentCalculator />;
    case 'pmi':
      return <PMICalculator />;
    case 'closing-costs':
      return <ClosingCostsCalculator />;
    case 'mortgage-points':
      return <MortgagePointsCalculator />;
    case 'interest-only-mortgage':
      return <InterestOnlyMortgageCalculator />;
    case 'adjustable-rate-mortgage':
      return <ARMCalculator />;
    case 'heloc':
      return <HELOCCalculator />;
    case 'rent-vs-buy':
      return <RentVsBuyCalculator />;
    case 'mortgage-interest':
      return <LoanLikeCalculator heading="Mortgage Interest Details" />;
    case 'home-equity-loan':
      return <LoanLikeCalculator heading="Home Equity Loan Details" />;
    case 'loan-interest':
      return <LoanLikeCalculator heading="Loan Interest Details" />;
    case 'loan-payment':
      return <LoanLikeCalculator heading="Loan Payment Details" />;
    case 'loan-amortization':
      return <LoanLikeCalculator heading="Loan Amortization Details" />;
    case 'loan-payoff':
      return <LoanLikeCalculator heading="Loan Payoff Details" />;
    case 'business-loan':
      return <LoanLikeCalculator heading="Business Loan Details" />;
    case 'boat-loan':
      return <LoanLikeCalculator heading="Boat Loan Details" />;
    case 'rv-loan':
      return <LoanLikeCalculator heading="RV Loan Details" />;
    case 'motorcycle-loan':
      return <LoanLikeCalculator heading="Motorcycle Loan Details" />;
    case 'consolidation-loan':
      return <LoanLikeCalculator heading="Consolidation Loan Details" />;
    case 'annuity':
      return <AnnuityCalculator />;
    case 'annuity-payout':
      return <AnnuityPayoutCalculator />;
    case 'mortgage-rate-comparison':
      return <MortgageRateComparisonCalculator />;
    case 'mortgage-apr':
      return <MortgageAprCalculator />;
    case 'property-tax':
      return <PropertyTaxCalculator />;
    case 'va-loan':
      return <VaLoanCalculator />;
    case 'fha-loan':
      return <FhaLoanCalculator />;
    case 'reverse-mortgage':
      return <ReverseMortgageCalculator />;

    case 'debt-to-income':
      return <DtiCalculator />;
    case 'simple-interest-loan':
      return <SimpleInterestLoanCalculator />;
    case 'payday-loan':
      return <PaydayLoanCalculator />;
    case 'parent-plus-loan':
      return <ParentPlusLoanCalculator />;
    case 'student-loan-refinance':
      return <StudentLoanRefinanceCalculator />;
    case 'auto-lease':
      return <AutoLeaseCalculator />;

    case 'weekly-pay':
      return <SalaryConversionCalculator mode="weekly" />;
    case 'biweekly-pay':
      return <SalaryConversionCalculator mode="biweekly" />;
    case 'monthly-salary':
      return <SalaryConversionCalculator mode="monthly" />;
    case 'hourly-to-monthly':
      return <SalaryConversionCalculator mode="hourly-to-monthly" />;
    case 'monthly-to-hourly':
      return <SalaryConversionCalculator mode="monthly-to-hourly" />;
    case 'overtime':
      return <OvertimeCalculator multiplier={1.5} />;
    case 'time-and-a-half':
      return <OvertimeCalculator multiplier={1.5} />;
    case 'salary-increase':
      return <SalaryIncreaseCalculator />;
    case 'bonus':
      return <BonusCalculator />;
    case 'commission':
      return <CommissionCalculator />;
    case 'severance-pay':
      return <SeverancePayCalculator />;

    case 'future-value':
      return <FutureValueCalculator />;
    case 'present-value':
      return <PresentValueCalculator />;
    case 'net-present-value':
      return <NetPresentValueCalculator />;
    case 'cagr':
      return <CAGRCalculator />;
    case 'rule-of-72':
      return <RuleOf72Calculator />;
    case 'dividend-yield':
      return <DividendYieldCalculator />;
    case 'dividend-growth':
      return <DividendGrowthCalculator />;
    case 'dividend-reinvestment':
      return <DividendReinvestmentCalculator />;
    case 'expense-ratio':
      return <FeeImpactCalculator label="Expense Ratio" />;
    case 'investment-fees':
      return <FeeImpactCalculator label="Fees" />;
    case 'inflation-adjusted-return':
      return <InflationAdjustedReturnCalculator />;
    case 'real-return':
      return <InflationAdjustedReturnCalculator />;
    case 'stock-average-price':
      return <StockAveragePriceCalculator />;
    case 'payback-period':
      return <PaybackPeriodCalculator />;
    case 'crypto-return':
      return <CryptoReturnCalculator />;
    case 'bond-yield':
      return <BondYieldCalculator />;

    case 'savings-goal':
      return <SavingsGoalCalculator />;
    case 'sinking-fund':
      return <SinkingFundCalculator />;
    case 'debt-snowball':
      return <DebtStrategyCalculator strategy="snowball" />;
    case 'debt-avalanche':
      return <DebtStrategyCalculator strategy="avalanche" />;
    case 'bill-split':
      return <BillSplitCalculator />;
    case 'savings-rate':
      return <SavingsRateCalculator />;
    case 'net-income':
      return <NetIncomeCalculator />;
    case 'cost-of-living':
      return <CostOfLivingCalculator />;

    case 'income-tax':
      return <IncomeTaxCalculator />;
    case 'sales-tax':
      return <SalesTaxCalculator />;
    case 'capital-gains-tax':
      return <CapitalGainsTaxCalculator />;
    case 'self-employment-tax':
      return <SelfEmploymentTaxCalculator />;
    case 'tax-bracket':
      return <TaxBracketCalculator />;
    case 'effective-tax-rate':
      return <EffectiveTaxRateCalculator />;
    case 'estate-tax':
      return <EstateTaxCalculator />;
    case 'inheritance-tax':
      return <InheritanceTaxCalculator />;
    case 'gift-tax':
      return <GiftTaxCalculator />;

    case 'credit-card-interest':
      return <CreditCardInterestCalculator />;
    case 'credit-card-minimum-payment':
      return <CreditCardMinimumPaymentCalculator />;
    case 'balance-transfer':
      return <BalanceTransferCalculator />;
    case 'credit-utilization':
      return <CreditUtilizationCalculator />;

    case 'fire':
      return <FIRECalculator />;
    case 'roth-ira':
      return <IraGrowthCalculator />;
    case 'ira':
      return <IraGrowthCalculator />;
    case 'four-percent-rule':
      return <FourPercentRuleCalculator />;
    case 'pension':
      return <PensionCalculator />;
    case 'rmd':
      return <RmdCalculator />;
    case 'social-security-benefits':
      return <SocialSecurityBenefitsCalculator />;
    case 'early-retirement':
      return <EarlyRetirementCalculator />;
    case 'roth-vs-traditional-ira':
      return <RothVsTraditionalIraCalculator />;

    default:
      return <LoanLikeCalculator heading="Loan Details" />;
  }
}

