import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';

const SITE_NAME = 'Calcida';

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  return new URL(pathname, base).toString();
}

function truncate(input: string, max: number): string {
  if (input.length <= max) return input;
  return `${input.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function cleanText(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function composeMetaTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

function calculatorMetaTitle(inputTitle: string, canonicalPath: string): string {
  const year = new Date().getFullYear();
  const isYearSensitive =
    canonicalPath.includes('paycheck') ||
    canonicalPath.includes('take-home') ||
    canonicalPath.includes('tax') ||
    canonicalPath.includes('401k') ||
    canonicalPath.includes('after-tax');

  if (isYearSensitive) {
    return `${inputTitle} (${year})`;
  }
  return inputTitle;
}

function calculatorMetaDescription(inputDescription: string): string {
  return truncate(cleanText(inputDescription), 160);
}

export function pageMetadata(input: {
  title: string;
  description: string;
  canonicalPath: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const title = cleanText(input.title);
  const description = truncate(cleanText(input.description), 160);
  const canonical = absoluteUrl(input.canonicalPath);
  const type = input.type ?? 'website';

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: composeMetaTitle(title),
      description,
      url: canonical,
      type,
      ...(type === 'article'
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: composeMetaTitle(title),
      description,
    },
  };
}

export function calculatorMetadata(input: {
  title: string;
  description: string;
  canonicalPath: string;
}): Metadata {
  const canonical = absoluteUrl(input.canonicalPath);
  const isCalculator = input.canonicalPath.endsWith('-calculator');
  const title = isCalculator ? calculatorMetaTitle(input.title, input.canonicalPath) : input.title;
  const description = isCalculator ? calculatorMetaDescription(input.description) : input.description;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: composeMetaTitle(title),
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: composeMetaTitle(title),
      description,
    },
  };
}
