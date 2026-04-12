import { getSiteUrl } from '@/lib/utils';

export interface JsonLdSoftwareApplicationInput {
  name: string;
  description: string;
  urlPath: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

export interface JsonLdFaqItem {
  question: string;
  answer: string;
}

export function softwareApplicationJsonLd(input: JsonLdSoftwareApplicationInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    applicationCategory: input.applicationCategory ?? 'FinanceApplication',
    operatingSystem: input.operatingSystem ?? 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: input.description,
    url: `${getSiteUrl()}${input.urlPath}`,
  };
}

export function faqPageJsonLd(items: JsonLdFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbListJsonLd(input: { items: { name: string; path: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: input.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path}`,
    })),
  };
}

