import { NextRequest, NextResponse } from 'next/server';

// Stripe checkout disabled for frontend-only mode
export async function GET(request: NextRequest) {
  console.log('Mock Stripe checkout - redirecting to dashboard');
  return NextResponse.redirect(new URL('/dashboard', request.url));
}