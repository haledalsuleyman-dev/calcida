import { describe, expect, it } from 'vitest';
import { softwareApplicationJsonLd, faqPageJsonLd, breadcrumbListJsonLd } from '@/lib/jsonld';

describe('jsonld helpers', () => {
  it('builds SoftwareApplication json-ld', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    const data = softwareApplicationJsonLd({
      name: 'Test Calculator',
      description: 'Desc',
      urlPath: '/test-calculator',
    });
    expect(data['@type']).toBe('SoftwareApplication');
    expect(data.url).toBe('https://example.com/test-calculator');
  });

  it('builds FAQPage json-ld', () => {
    const data = faqPageJsonLd([{ question: 'Q', answer: 'A' }]);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('A');
  });

  it('builds BreadcrumbList json-ld', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    const data = breadcrumbListJsonLd({ items: [{ name: 'Home', path: '/' }] });
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement[0].item).toBe('https://example.com/');
  });
});

