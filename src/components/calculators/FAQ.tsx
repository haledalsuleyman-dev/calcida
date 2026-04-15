import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <section className="py-16 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 md:px-10">
            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                Common Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-50 last:border-0 py-2">
                <AccordionTrigger className="text-lg font-bold text-left hover:text-blue-600 transition-colors py-4 no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pt-2 pb-6 prose prose-blue max-w-none">
                    {item.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </div>
    </section>
  );
}
