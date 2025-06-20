import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

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
    console.log('Received form data:', JSON.stringify(body, null, 2));
    console.log('Role field value:', body.role);
    console.log('Role field type:', typeof body.role);
    console.log('Role field length:', body.role?.length);
    
    // Check if role is empty string and convert to undefined for better error handling
    const processedBody = {
      ...body,
      role: body.role === '' ? undefined : body.role
    };
    
    console.log('Processed body role:', processedBody.role);
    
    // Validate the request data
    const validatedData = demoRequestSchema.parse(processedBody);
    console.log('Validation successful');
    
    // Create email content
    const emailText = `
New Demo Request from FloorPlanAI

Contact Information:
Name: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
${validatedData.phone ? `Phone: ${validatedData.phone}` : ''}
${validatedData.company ? `Company: ${validatedData.company}` : ''}
Role: ${validatedData.role}
${validatedData.projectType ? `Project Type: ${validatedData.projectType}` : ''}

${validatedData.message ? `Message: ${validatedData.message}` : ''}

Submitted: ${new Date().toLocaleString()}
From: FloorPlanAI Demo Request Form
    `;

    // Your 2 unchanging email addresses
    const recipients = ['brandonyeequon@gmail.com', 'Samuelfennegan11@gmail.com'];

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });

    // Send email to both recipients
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: recipients,
      subject: `New Demo Request from ${validatedData.firstName} ${validatedData.lastName}`,
      text: emailText,
    };

    console.log('Sending email to:', recipients);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo request submitted successfully',
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Demo request error:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: error.errors,
          message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send demo request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}