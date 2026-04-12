import { getSiteUrl } from '@/lib/utils';

export function buildShareUrl(input: {
  path: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  baseUrl?: string;
}): string {
  const base = input.baseUrl ?? getSiteUrl();
  const url = new URL(input.path, base);
  const params = input.params ?? {};
  for (const [key, raw] of Object.entries(params)) {
    if (raw === null || raw === undefined) continue;
    url.searchParams.set(key, String(raw));
  }
  return url.toString();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

