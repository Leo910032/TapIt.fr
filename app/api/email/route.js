// app/api/email/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { to, subject, htmlContent } = await request.json();
    
    const response = await axios.post(
      'https://api.sendinblue.com/v3/smtp/email',
      {
        sender: { email: 'noreply@tapit.fr', name: 'TapIt' },
        to: [{ email: to }],
        subject,
        htmlContent
      },
      {
        headers: {
          'api-key': process.env.SMTP_API,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
