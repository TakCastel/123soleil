import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER || '';
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || '';

const transporter =
  gmailUser && gmailAppPassword
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailAppPassword },
      })
    : null;

const primaryEmail = process.env.CONTACT_EMAIL_PRIMARY || gmailUser;
const fallbackEmail = process.env.CONTACT_EMAIL_FALLBACK || '';

export async function POST(request: NextRequest) {
  if (!transporter) {
    return Response.json(
      { error: 'Configuration email manquante (GMAIL_USER / GMAIL_APP_PASSWORD).' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message, website } = body as {
      name?: string;
      email?: string;
      message?: string;
      website?: string; // honeypot : doit rester vide, un bot le remplit généralement
    };

    if (website?.trim()) {
      return Response.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Tous les champs (nom, email, message) sont requis.' },
        { status: 400 }
      );
    }

    if (!primaryEmail) {
      return Response.json(
        { error: 'Aucune adresse de destination configurée (CONTACT_EMAIL_PRIMARY).' },
        { status: 500 }
      );
    }

    const replyTo = email.trim();
    const subject = `[Site 1,2,3 Soleil] Message de ${name.trim()}`;
    const html = `
      <p><strong>Nom :</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email :</strong> ${escapeHtml(email.trim())}</p>
      <p><strong>Message :</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message.trim())}</pre>
    `;

    await transporter.sendMail({
      from: `"1,2,3 Soleil" <${gmailUser}>`,
      to: primaryEmail,
      replyTo,
      subject,
      html,
      ...(fallbackEmail && { bcc: fallbackEmail }),
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return Response.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
