import Link from 'next/link';
import { SeoIntro, SeoFormula, SeoExample } from '@/lib/calculatorSeoContent';

export function CalculatorIntro({
  description,
  intro,
  hub,
  related,
}: {
  description: string;
  intro: SeoIntro;
  hub: { name: string; href: `/${string}` };
  related: Array<{ name: string; href: `/${string}` }>;
}) {
  const relatedInline = related.slice(0, 2);
  return (
    <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-balance">
      <p className="font-medium text-gray-900 leading-snug">{description}</p>
      <p>
        Built specifically for <span className="text-gray-900 font-semibold">{intro.who}</span>, this engine analyzes <span className="text-gray-900 font-semibold">{intro.inputs.join(', ')}</span> to output {intro.result.toLowerCase()}.
      </p>
      <div className="pt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm border-t border-gray-100">
         <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Context:</span>
         <Link href={hub.href} className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
          {hub.name}
        </Link>
        <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
          Main Directory
        </Link>
        {relatedInline.map((r) => (
            <Link key={r.href} href={r.href} className="text-gray-500 hover:text-blue-600 font-bold transition-colors">
                {r.name}
            </Link>
        ))}
      </div>
    </div>
  );
}

export function CalculatorFormula({ formula }: { formula: SeoFormula }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl shadow-gray-200 overflow-x-auto no-scrollbar group">
        <div className="text-blue-400 font-mono text-xl md:text-2xl text-center whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
            {formula.expression}
        </div>
      </div>
      {formula.where.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
            {formula.where.map((w) => (
                <div key={w.symbol} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-mono font-bold shrink-0">{w.symbol}</div>
                    <div className="text-sm text-gray-600 leading-tight"><span className="font-bold text-gray-900 block mb-0.5">{w.meaning}</span> Description</div>
                </div>
            ))}
        </div>
      )}
      {formula.notes && formula.notes.length > 0 && (
        <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800 leading-relaxed italic">
          {formula.notes.map((n) => (
            <div key={n} className="flex gap-2">
                <span>&bull;</span>
                {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CalculatorExample({ example }: { example: SeoExample }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {example.inputs.map((i) => (
          <div key={i.label} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">{i.label}</span>
            <span className="text-lg font-black text-gray-900 tracking-tight">{i.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <div className="text-[10px] uppercase tracking-widest font-black text-blue-600 mb-1">Calculated Outcome</div>
            <div className="text-2xl font-black text-gray-900 tracking-tight leading-none">{example.resultLabel}</div>
        </div>
        <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-2xl font-black shadow-lg shadow-blue-200">
            {example.resultValue}
        </div>
      </div>
      {example.note && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-500 leading-relaxed">
            <svg className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {example.note}
        </div>
      )}
    </div>
  );
}

