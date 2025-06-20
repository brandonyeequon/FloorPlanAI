import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for demo request
const demoRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  projectType: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = demoRequestSchema.parse(body);
    
    // Email content
    const emailHtml = `
      <h2>New Demo Request from FloorPlanAI</h2>
      <div style="margin: 20px 0; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
        ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
        <p><strong>Role:</strong> ${validatedData.role}</p>
        ${validatedData.projectType ? `<p><strong>Project Type:</strong> ${validatedData.projectType}</p>` : ''}
        
        ${validatedData.message ? `
          <h3>Message</h3>
          <p style="background: #f9fafb; padding: 15px; border-radius: 4px;">${validatedData.message}</p>
        ` : ''}
        
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280; font-size: 14px;">
          <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
          <strong>From:</strong> FloorPlanAI Demo Request Form
        </p>
      </div>
    `;

    // Send email notification
    const emailResult = await resend.emails.send({
      from: 'FloorPlanAI <onboarding@resend.dev>', // Use verified domain in production
      to: [process.env.DEMO_NOTIFICATION_EMAIL || 'demo@floorplanai.com'],
      subject: `New Demo Request from ${validatedData.firstName} ${validatedData.lastName}`,
      html: emailHtml,
    });

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo request submitted successfully',
        emailId: emailResult.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Demo request error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}