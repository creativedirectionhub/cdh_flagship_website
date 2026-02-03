import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        projectType: data.projectType ?? null,
        budget: data.budget ?? null,
        message: data.message,
        status: 'new',
      },
    });

    // Send email notification
    try {
      const appUrl = process.env.NEXTAUTH_URL ?? '';
      let appName = 'Creative Direction Hub';
      let senderEmail = 'noreply@creativedirectionhub.com';
      
      try {
        if (appUrl) {
          const hostname = new URL(appUrl).hostname;
          appName = hostname.split('.')[0] ?? appName;
          senderEmail = `noreply@${hostname}`;
        }
      } catch {
        // Use defaults
      }

      const htmlBody = `
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
      `;

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_CONTACT_FORM_SUBMISSION,
          subject: `New Project Inquiry from ${data.name ?? 'Unknown'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'support@creativedirectionhub.com',
          sender_email: senderEmail,
          sender_alias: appName,
        }),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
