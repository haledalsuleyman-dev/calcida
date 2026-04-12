import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

interface CategoryPageProps {
  title: string;
  description: string;
  calculators: { name: string; description: string; href: string }[];
  children?: React.ReactNode;
  faq?: { question: string; answer: string }[];
}

export function CategoryPage({ title, description, calculators, children, faq }: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="block group">
            <Card className="h-full transition-shadow hover:shadow-md border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </CardTitle>
                <CardDescription>
                  {calc.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {children && (
        <div className="prose prose-blue max-w-none mb-16">
          {children}
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
