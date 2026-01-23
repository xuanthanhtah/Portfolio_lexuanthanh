'use server'

import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields' };
  }

  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('messages')
      .insert([{ name, email, message }]);

    if (dbError) {
        console.error('Supabase error:', dbError);
        return { success: false, error: 'Failed to save message' };
    }

    // 2. Validate SMTP Configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration is incomplete. Please check .env.local file.');
      console.error('Missing:', {
        SMTP_HOST: !process.env.SMTP_HOST,
        SMTP_USER: !process.env.SMTP_USER,
        SMTP_PASS: !process.env.SMTP_PASS,
      });
      return { success: false, error: 'Email service is not configured. Please contact the administrator.' };
    }

    // 3. Send Email via Nodemailer
    console.log('Attempting to send email via:', process.env.SMTP_HOST);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `📬 New Contact Message from ${name}`,
      text: `
New Contact Message

Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                📬 New Contact Message
                            </h1>
                            <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                                You have received a new message from your portfolio
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <!-- Name -->
                            <div style="margin-bottom: 30px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 16px; border-radius: 12px; margin-bottom: 12px;">
                                    <span style="color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Name</span>
                                </div>
                                <p style="margin: 0; font-size: 18px; color: #1d1d1f; font-weight: 600;">
                                    ${name}
                                </p>
                            </div>
                            
                            <!-- Email -->
                            <div style="margin-bottom: 30px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 16px; border-radius: 12px; margin-bottom: 12px;">
                                    <span style="color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                                </div>
                                <p style="margin: 0; font-size: 16px; color: #667eea;">
                                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">
                                        ${email}
                                    </a>
                                </p>
                            </div>
                            
                            <!-- Message -->
                            <div style="margin-bottom: 30px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 16px; border-radius: 12px; margin-bottom: 12px;">
                                    <span style="color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message</span>
                                </div>
                                <div style="background-color: #f5f5f7; border-radius: 16px; padding: 20px; border-left: 4px solid #667eea;">
                                    <p style="margin: 0; font-size: 16px; color: #1d1d1f; line-height: 1.6; white-space: pre-wrap;">
${message}
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Reply Button -->
                            <div style="text-align: center; margin-top: 40px;">
                                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                    Reply to ${name.split(' ')[0]}
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f7; padding: 30px; text-align: center; border-top: 1px solid #e5e5e7;">
                            <p style="margin: 0; color: #86868b; font-size: 14px; line-height: 1.6;">
                                This message was sent from your portfolio contact form<br>
                                <span style="color: #d1d1d6;">Received on ${new Date().toLocaleString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</span>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return { success: true };

  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return { success: false, error: 'Email authentication failed. Please check SMTP credentials.' };
      }
      if (error.message.includes('ECONNREFUSED')) {
        return { success: false, error: 'Cannot connect to email server. Please check SMTP configuration.' };
      }
    }
    
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
