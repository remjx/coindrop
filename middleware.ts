import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from './src/cookies';

export function middleware(request: NextRequest): NextResponse {
  const isFirebaseUserAuthenticated = request.cookies.get(cookies.isFirebaseUserAuthenticated);
  if (request.nextUrl.pathname === '/' && isFirebaseUserAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if ((request.nextUrl.pathname.startsWith('/dashboard')
    || request.nextUrl.pathname.startsWith('/account'))
    && !isFirebaseUserAuthenticated
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/account'],
};
