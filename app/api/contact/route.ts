import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminContactTemplate } from '@/app/emails/adminContactTemplate';
import { userConfirmationTemplate } from '@/app/emails/userConfirmationTemplate';

export async function POST(req: Request) {
  try {
    // const { firstName, email, phone, message } = await req.json();
    const payload = await req.json();
    const { fullName, email, phone = '', company, message } = payload ?? {};

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof company !== 'string' ||
      typeof message !== 'string' ||
      !fullName.trim() ||
      !email.trim() ||
      !company.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'Invalid or missing fields' },
        { status: 400 }
      );
    }

    // Create a transporter using SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter only in non-production (avoid latency in prod)
    if (process.env.NODE_ENV !== 'production') {
      await transporter.verify();
    }

    const html = adminContactTemplate({
      fullName,
      email,
      phone,
      company,
      message,
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER, // Sender address
      to: process.env.TO_EMAIL, // Receiver address
      subject: `New Contact Form Submission – Cwit For Future`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company}
        Message:
        ${message}
      `,
      html,
    };

    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userHtml = userConfirmationTemplate({ fullName });
    const userMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: email, // User's email
      subject: `Thank You for Contacting CWIT For Future`,
      text: `Dear ${fullName},\n\nThank you for reaching out to us. We have received your message and our team will get back to you as soon as possible.\n\nWe typically respond within 24-48 business hours.\n\nBest regards,\nCWIT For Future Team`,
      html: userHtml,
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
