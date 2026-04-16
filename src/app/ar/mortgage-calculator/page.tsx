import React from 'react';
import { Metadata } from 'next';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { ar } from '@/lib/dictionaries/ar';
import { AdSlot } from '@/components/ads/AdSlot';
import { softwareApplicationJsonLd, faqPageJsonLd, breadcrumbListJsonLd } from '@/lib/jsonld';
import { TrustBadge } from '@/components/TrustBadge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'حاسبة التمويل العقاري المدعوم 2026 | احسب قسطك السكني بدقة | كالسيدا',
  description: 'أفضل حاسبة تمويل عقاري لمقارنة البنوك السعودية والإماراتية لعام 2026. احسب التمويل المدعوم من سكني، الدفعة الأولى، وتكاليف السداد المبكر بدقة تامة.',
  keywords: 'حاسبة التمويل العقاري المدعوم، سكني 2026، حساب القسط العقاري، السداد المبكر للتمويل، بنك الراجحي، بنك الرياض، حاسبة التمويل العقاري الإمارات',
  alternates: {
    canonical: 'https://calcida.app/ar/mortgage-calculator',
    languages: {
      'en': 'https://calcida.app/mortgage-calculator',
      'ar': 'https://calcida.app/ar/mortgage-calculator',
    },
  },
};

const faqItems = [
  {
    question: 'كيف تعمل حاسبة التمويل العقاري المدعوم من سكني؟',
    answer: 'تقوم الحاسبة بخصم مبلغ الدعم السكني من إجمالي القسط الشهري بناءً على معايير "سكني 2026". يمكنك إدخال قيمة الدعم يدوياً في خانة الدفعات الإضافية لرؤية صافي القسط الشهري بعد الدعم.',
  },
  {
    question: 'هل يمكنني حساب السداد المبكر للتمويل العقاري في السعودية؟',
    answer: 'نعم، تتيح لك الحاسبة إضافة دفعات إضافية دورية. في السعودية، عند السداد المبكر، يتم خصم الأرباح المستقبلية للسنوات المتبقية وفقاً لضوابط البنك المركزي السعودي (ساما).',
  },
  {
    question: 'ما هي الدفعة الأولى المطلوبة للمسكن الأول؟',
    answer: 'في السعودية، تصل الدفعة الأولى للمسكن الأول المدعوم غالباً إلى 5% أو 10%، بينما تصل في الإمارات للمقيمين إلى حوالي 20%. يمكنك استخدام الحاسبة لتجربة مبالغ مختلفة للدفعة الأولى ورؤية تأثيرها على القسط.',
  },
  {
    question: 'كيف أحسب نسبة الاستقطاع (DBR) في التمويل العقاري؟',
    answer: 'نسبة الاستقطاع هي إجمالي التزاماتك الشهرية مقسومة على دخلك الشهري. البنوك في السعودية تشترط ألا تتجاوز نسبة الاستقطاع للتمويل العقاري 65% من الراتب، شاملة الديون الأخرى.',
  },
  {
    question: 'هل الدفع كل أسبوعين يوفر المال فعلياً؟',
    answer: 'نعم، من خلال الدفع كل أسبوعين، ينتهي بك الأمر بإجراء 13 دفعة كاملة في السنة بدلاً من 12. هذا يقلل من أصل القرض بشكل أسرع ويوفر سنوات من عمر القرض وآلاف الدولارات من الفوائد.',
  },
];

const schema = [
  softwareApplicationJsonLd({
    name: 'حاسبة الرهن العقاري - كالسيدا',
    description: 'أداة متقدمة لحساب دفعات الرهن العقاري، الضرائب، والتأمين، مع ميزة المقارنة بين الدفع الشهري وكل أسبوعين.',
    urlPath: '/ar/mortgage-calculator',
  }),
  faqPageJsonLd(faqItems),
  breadcrumbListJsonLd({
    items: [
      { name: 'الرئيسية', path: '/ar' },
      { name: 'حاسبات التمويل العقاري', path: '/ar/mortgage' },
      { name: 'حاسبة الرهن العقاري', path: '/ar/mortgage-calculator' },
    ],
  }),
];

const relatedCalculators = [
  { name: "حاسبة القروض", href: "/ar/loan-calculator" },
  { name: "حاسبة التقاعد", href: "/ar/retirement-calculator" },
  { name: "حاسبة الراتب", href: "/ar/salary-calculator" },
  { name: "حاسبة الفائدة المركبة", href: "/ar/compound-interest-calculator" },
];

const relatedArticles = [
  { title: "كيف تختار أفضل تمويل عقاري؟", href: "/ar/blog/best-mortgage-guide" },
  { title: "أهمية الدفعة المقدمة في تقليل الفوائد", href: "/ar/blog/down-payment-benefits" },
] as const;

export default function ArabicMortgageCalculatorPage() {
  return (
    <CalculatorLayout
      title="حاسبة الرهن العقاري"
      category={{ name: "التمويل العقاري", href: "/ar/mortgage" }}
      relatedCalculators={relatedCalculators}
      relatedArticles={relatedArticles}
      intro={
        <div dir="rtl">
          <TrustBadge />
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed mt-4">
            <p>
              تعتبر <strong>حاسبة الرهن العقاري</strong> من كالسيدا الأداة الأقوى والأكثر دقة المتاحة لمساعدتك في التخطيط لامتلاك منزل أحلامك. فهم الالتزام المالي طويل الأمد هو الخطوة الأولى والأساسية في رحلة شراء العقار.
            </p>
            <p>
              تتميز حاسبتنا بالشمولية، حيث لا تكتفي بحساب أصل القرض والفائدة فقط، بل تدمج التكاليف الأساسية الأخرى مثل ضرائب العقار، تأمين أصحاب المنازل، ورسوم اتحاد الملاك (HOA)، مما يعطيك صورة واقعية وحقيقية لميزانيتك الشهرية.
            </p>
            <p>
               استخدم خيار "الدفع كل أسبوعين" لرؤية كيف يمكن لهذا النظام البسيط أن يوفر لك آلاف الدولارات ويقلص سنوات من مدة السداد. ابدأ الآن بالتحكم في مستقبلك المالي.
            </p>
          </div>
          <AdSlot id="ar-mortgage-top-leaderboard" type="horizontal" className="mt-6" />
        </div>
      }
      faq={faqItems}
      howItWorks={
        <div dir="rtl" className="space-y-4">
          <p>تعمل الحاسبة من خلال أخذ المدخلات الأساسية وتطبيق معادلة الاستهلاك (Amortization) القياسية. إليك كيفية الاستفادة القصوى منها:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>تغيير الدفعة المقدمة:</strong> شاهد كيف تتغير نسبة الفائدة ودفعة PMI تلقائياً.</li>
            <li><strong>تعديل نسبة الفائدة:</strong> قارن بين سيناريوهات مختلفة بناءً على توقعاتك للسوق.</li>
            <li><strong>إضافة دفعات إضافية:</strong> ميزة قوية تظهر لك بوضوح سرعة سداد القرض عند دفع مبالغ بسيطة إضافية شهرياً.</li>
          </ul>
        </div>
      }
      guide={
        <div dir="rtl" className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">خطوات الاستخدام:</h3>
            <ol className="list-decimal pr-6 space-y-3">
              <li><strong>سعر المنزل:</strong> أدخل التكلفة الإجمالية للعقار.</li>
              <li><strong>الدفعة المقدمة:</strong> أدخل المبلغ نقداً أو كنسبة مئوية (20% هي النسبة الذهبية).</li>
              <li><strong>مدة القرض:</strong> اختر المدة الزمنية المفضلة (عادة 15 أو 30 سنة).</li>
              <li><strong>نسبة الفائدة:</strong> ضع النسبة المئوية السنوية التي حصلت عليها من البنك.</li>
              <li><strong>تفاصيل إضافية:</strong> أضف الضرائب والتأمين للحصول على "الدفعة الشاملة".</li>
            </ol>
          </section>
        </div>
      }
      formula={
        <div dir="rtl" className="bg-gray-50 p-4 rounded-xl border border-gray-100 italic text-center font-mono text-sm overflow-x-auto">
          M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
          <p className="mt-2 text-xs not-italic text-gray-500">حيث: M هي الدفعة، P أصل القرض، i الفائدة الشهرية، n عدد الأشهر.</p>
        </div>
      }
      example={
        <div dir="rtl" className="space-y-6">
          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
             <h3 className="text-xl font-bold text-blue-900 mb-2">سيناريو 1: التمويل العقاري في السعودية (المسكن الأول)</h3>
             <p className="text-sm text-blue-800 leading-relaxed">
               منزل بقيمة 800,000 ريال، دفعة أولى 10% (80,000 ريال)، قرض البنك 720,000 ريال بفائدة 4.5% لمدة 20 سنة. 
               النتيجة: القسط الشهري سيكون حوالي 4,555 ريال. مع دعم سكني قد ينخفض القسط بشكل كبير.
             </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
             <h3 className="text-xl font-bold text-gray-900 mb-2">سيناريو 2: الرهن العقاري في الإمارات (المقيمين)</h3>
             <p className="text-sm text-gray-700 leading-relaxed">
               شقة في دبي بقيمة 1,000,000 درهم، دفعة أولى 20% (200,000 درهم)، قرض 800,000 درهم بفائدة 5% لمدة 25 سنة.
               النتيجة: القسط الشهري سيكون حوالي 4,677 درهم، بالإضافة إلى رسوم التسجيل (4%).
             </p>
          </div>
        </div>
      }
      schema={schema}
      nextStep={{
        title: "ما هي خطوتك التالية؟",
        description: "بعد حساب الرهن العقاري، قد ترغب في معرفة ما إذا كان الاستئجار أو الشراء هو الخيار الأفضل لك حالياً.",
        primaryAction: { label: "حاسبة الإيجار مقابل الشراء", href: "/ar/rent-vs-buy" },
        secondaryActions: [
           { label: "حاسبة إعادة التمويل", href: "/ar/refinance-calculator" },
           { label: "دليل شراء المنزل الأول", href: "/blog/first-time-home-buyer" }
        ]
      }}
    >
      <div dir="rtl">
        <MortgageCalculator locale="ar" dictionary={ar} showExtraPayment showBiWeekly />
        
        {/* Semantic SEO Section */}
        <section className="mt-16 pt-8 border-t border-gray-100">
           <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">مواضيع ذات صلة بالبحث لعام 2026:</h4>
           <div className="flex flex-wrap gap-2 px-4 italic text-sm text-gray-400">
              <span>#حاسبة_التمويل_العقاري_بنك_الراجحي</span>
              <span>#سكني_الدفعة_الأولى</span>
              <span>#قرض_عقاري_بنك_البلاد</span>
              <span>#تمويل_عقاري_مصرف_الإنماء</span>
              <span>#حاسبة_الرهن_دبي</span>
              <span>#فوائد_القروض_العقارية_السعودية</span>
           </div>
        </section>

        <AdSlot id="ar-mortgage-bottom-rectangle" type="rectangle" className="mt-12" />
      </div>
    </CalculatorLayout>
  );
}
