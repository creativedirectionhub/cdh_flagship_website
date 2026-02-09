import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to database
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { success: false, message: 'Database not available' },
        { status: 500 }
      );
    }

    const { data: submission, error } = await supabase
      .from('ContactSubmission')
      .insert({
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        projectType: data.projectType ?? null,
        budget: data.budget ?? null,
        message: data.message,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    // Send email notification via Resend
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      if (RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@creativedirectionhub.com',
            to: 'support@creativedirectionhub.com',
            subject: `New Project Inquiry from ${data.name ?? 'Unknown'}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #0B0B0F; border-bottom: 3px solid #DB2777; padding-bottom: 12px; margin-bottom: 24px;">
                  New Project Inquiry
                </h2>
                
                <div style="background: #F9F9FB; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #6B7280; width: 120px;"><strong>Name:</strong></td>
                      <td style="padding: 8px 0; color: #0B0B0F;">${data.name ?? 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6B7280;"><strong>Email:</strong></td>
                      <td style="padding: 8px 0;"><a href="mailto:${data.email ?? ''}" style="color: #DB2777;">${data.email ?? 'Not provided'}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6B7280;"><strong>Company:</strong></td>
                      <td style="padding: 8px 0; color: #0B0B0F;">${data.company ?? 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6B7280;"><strong>Project Type:</strong></td>
                      <td style="padding: 8px 0; color: #0B0B0F;">${data.projectType ?? 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6B7280;"><strong>Budget:</strong></td>
                      <td style="padding: 8px 0; color: #0B0B0F;">${data.budget ?? 'Not specified'}</td>
                    </tr>
                  </table>
                </div>
                
                <div style="background: white; padding: 24px; border-radius: 12px; border-left: 4px solid #8B5CF6;">
                  <p style="color: #6B7280; margin: 0 0 8px 0; font-size: 14px;"><strong>Message:</strong></p>
                  <p style="color: #0B0B0F; margin: 0; line-height: 1.6;">${(data.message ?? '').replace(/\n/g, '<br>')}</p>
                </div>
                
                <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px; text-align: center;">
                  Submitted at: ${new Date().toLocaleString()}
                </p>
              </div>
            `,
          }),
        });
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submission?.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
