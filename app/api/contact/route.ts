import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminContactTemplate } from '@/app/emails/adminContactTemplate';
import { userConfirmationTemplate } from '@/app/emails/userConfirmationTemplate';
import { buildContactFormFields } from '@/app/lib/contact-form-config';
import { fetchDefaultContactPage, getContactPageFields } from '@/app/lib/contact-api';

export async function POST(req: Request) {
  try {
    // const { firstName, email, phone, message } = await req.json();
    const payload = await req.json();
    const {
      fullName: rawFullName,
      email: rawEmail,
      phone: rawPhone = '',
      company: rawCompany,
      message: rawMessage,
    } = payload ?? {};

    const fullName = typeof rawFullName === 'string' ? rawFullName.trim() : rawFullName;
    const email = typeof rawEmail === 'string' ? rawEmail.trim() : rawEmail;
    const phone = typeof rawPhone === 'string' ? rawPhone.trim() : rawPhone;
    const company = typeof rawCompany === 'string' ? rawCompany.trim() : rawCompany;
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : rawMessage;

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof company !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Invalid or missing fields' },
        { status: 400 }
      );
    }

    let cmsRecipientEmail: string | undefined;
    let configuredFields = buildContactFormFields(undefined);
    try {
      const contactPageRes = await fetchDefaultContactPage();
      const contactFields = getContactPageFields(contactPageRes.data);
      cmsRecipientEmail = contactFields?.contactFormSettings?.recipientEmail?.trim() || undefined;
      configuredFields = buildContactFormFields(
        (contactFields?.contactFormSettings ?? undefined) as Record<string, unknown> | undefined
      );
    } catch {
      cmsRecipientEmail = undefined;
    }

    const visibleFieldNames = new Set(configuredFields.map((field) => field.name));
    const requiredFieldNames = new Set(
      configuredFields.filter((field) => field.required).map((field) => field.name)
    );

    if (requiredFieldNames.has('fullName') && !fullName.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (requiredFieldNames.has('email') && !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (visibleFieldNames.has('email') && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email' },
        { status: 400 }
      );
    }

    if (requiredFieldNames.has('phone') && !phone.trim()) {
      return NextResponse.json(
        { error: 'Phone is required' },
        { status: 400 }
      );
    }

    if (requiredFieldNames.has('company') && !company.trim()) {
      return NextResponse.json(
        { error: 'Company is required' },
        { status: 400 }
      );
    }

    if (requiredFieldNames.has('message') && !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const resolvedRecipientEmail =
      cmsRecipientEmail ||
      process.env.TO_EMAIL;

    if (!resolvedRecipientEmail) {
      return NextResponse.json(
        { error: 'Recipient email is not configured' },
        { status: 500 }
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
      to: resolvedRecipientEmail, // Receiver address
      replyTo: email || undefined,
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
    let confirmationEmailSent = false;
    if (email) {
      const userHtml = userConfirmationTemplate({ fullName });
      const userMailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: email, // User's email
        subject: `Thank You for Contacting CWIT For Future`,
        text: `Dear ${fullName},\n\nThank you for reaching out to us. We have received your message and our team will get back to you as soon as possible.\n\nWe typically respond within 24-48 business hours.\n\nBest regards,\nCWIT For Future Team`,
        html: userHtml,
      };

      try {
        await transporter.sendMail(userMailOptions);
        confirmationEmailSent = true;
      } catch (confirmationError) {
        console.error('Error sending user confirmation email:', confirmationError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        confirmationEmailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
