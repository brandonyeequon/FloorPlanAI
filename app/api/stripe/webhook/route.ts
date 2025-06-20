import { NextRequest, NextResponse } from 'next/server';

// Stripe webhook disabled for frontend-only mode
export async function POST(request: NextRequest) {
  console.log('Mock Stripe webhook received');
  return NextResponse.json({ received: true });
}