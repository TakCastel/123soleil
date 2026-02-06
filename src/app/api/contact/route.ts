import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const primaryEmail = process.env.CONTACT_EMAIL_PRIMARY || '';
const fallbackEmail = process.env.CONTACT_EMAIL_FALLBACK || '';
const from = process.env.RESEND_FROM || '1,2,3 Soleil <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  if (!resend) {
    return Response.json(
      { error: 'Configuration email manquante (RESEND_API_KEY).' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Tous les champs (nom, email, message) sont requis.' },
        { status: 400 }
      );
    }

    const to = [primaryEmail].filter(Boolean);
    if (to.length === 0) {
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

    const { data, error } = await resend!.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      ...(fallbackEmail && { bcc: [fallbackEmail] })
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json(data);
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
