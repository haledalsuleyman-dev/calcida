import Link from 'next/link';
import type { SeoExample, SeoFormula, SeoIntro } from '@/lib/calculatorSeoContent';

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
    <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
      <p>{description}</p>
      <p>
        This calculator is useful for {intro.who.toLowerCase()} You will typically enter {intro.inputs.join(', ')}.
      </p>
      <p>
        The result represents {intro.result.toLowerCase()} If you are browsing similar tools, start with{' '}
        <Link href={hub.href} className="text-blue-600 hover:underline font-medium">
          {hub.name}
        </Link>{' '}
        or view the full{' '}
        <Link href="/calculators" className="text-blue-600 hover:underline font-medium">
          calculators directory
        </Link>
        .
      </p>
      {relatedInline.length > 0 && (
        <p className="text-base text-gray-600">
          Also useful:{' '}
          {relatedInline.map((r, idx) => (
            <span key={r.href}>
              <Link href={r.href} className="text-blue-600 hover:underline font-medium">
                {r.name}
              </Link>
              {idx === relatedInline.length - 1 ? '.' : ', '}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function CalculatorFormula({ formula }: { formula: SeoFormula }) {
  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4 font-mono text-sm overflow-x-auto">
        <div className="text-gray-900">{formula.expression}</div>
      </div>
      {formula.where.length > 0 && (
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">Where:</div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {formula.where.map((w) => (
              <li key={w.symbol}>
                <span className="font-mono">{w.symbol}</span> = {w.meaning}
              </li>
            ))}
          </ul>
          {formula.notes && formula.notes.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              {formula.notes.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CalculatorExample({ example }: { example: SeoExample }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
        {example.inputs.map((i) => (
          <div key={i.label} className="flex justify-between gap-3 bg-gray-50 rounded-md p-3">
            <span className="font-medium text-gray-600">{i.label}</span>
            <span className="font-semibold text-gray-900">{i.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="font-semibold text-gray-900">{example.resultLabel}</div>
        <div className="text-lg font-bold text-blue-700">{example.resultValue}</div>
      </div>
      {example.note && <div className="mt-3 text-sm text-gray-600">{example.note}</div>}
    </div>
  );
}

