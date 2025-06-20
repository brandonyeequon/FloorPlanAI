import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Authentication disabled for frontend-only mode
export async function middleware(request: NextRequest) {
  // Allow all routes without authentication
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'
};
