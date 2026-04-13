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

/**
 * WebSite schema with SearchAction — enables Google Sitelinks Searchbox.
 * Place this on the homepage once. The urlTemplate must match your search URL pattern.
 */
export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calcida',
    url,
    description:
      'Free financial calculators for mortgages, loans, salary, taxes, retirement, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/calculators?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization schema — strengthens E-E-A-T signals and brand knowledge graph.
 * Place this on the homepage or globally in the layout.
 */
export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calcida',
    url,
    logo: {
      '@type': 'ImageObject',
      url: `${url}/icon.png`,
    },
    description:
      'Calcida provides free, accurate financial calculators for mortgages, loans, salary, retirement, taxes, and personal finance.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${url}/contact`,
    },
    sameAs: [],
  };
}

