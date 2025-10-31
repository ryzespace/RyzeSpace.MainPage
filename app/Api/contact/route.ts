// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, surname, email, message } = await req.json();

        // Konfiguracja Zimbra SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.ZIMBRA_HOST, // np. "mail.twojadomena.pl"
            port: 587,
            secure: false, // STARTTLS
            auth: {
                user: process.env.ZIMBRA_USER, // np. "kontakt@twojadomena.pl"
                pass: process.env.ZIMBRA_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name} ${surname}" <${email}>`,
            to: process.env.CONTACT_RECEIVER, // np. "biuro@twojadomena.pl"
            subject: 'New Contact Form Message',
            text: message,
            html: `<p><strong>Name:</strong> ${name} ${surname}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Zimbra send error:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
