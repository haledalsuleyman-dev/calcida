import { getSiteUrl } from '@/lib/utils';

export interface EmbedOptions {
  path: string;
  width?: number | string;
  height?: number | string;
  params?: Record<string, string | number | boolean | null | undefined>;
}

export function buildEmbedSrc(opts: EmbedOptions): string {
  const url = new URL(opts.path, getSiteUrl());
  const params = opts.params ?? {};
  for (const [key, raw] of Object.entries(params)) {
    if (raw === null || raw === undefined) continue;
    url.searchParams.set(key, String(raw));
  }
  url.searchParams.set('embed', '1');
  return url.toString();
}

