import { NextResponse, type NextRequest } from 'next/server';

function hasFileExtension(pathname: string): boolean {
  const last = pathname.split('/').pop() ?? '';
  return last.includes('.');
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/') return NextResponse.next();
  if (pathname.startsWith('/_next')) return NextResponse.next();
  if (pathname.startsWith('/api')) return NextResponse.next();
  if (hasFileExtension(pathname)) return NextResponse.next();

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const normalized = pathname.replace(/\/+$/, '');
    const url = request.nextUrl.clone();
    url.pathname = normalized;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|api/).*)'],
};
