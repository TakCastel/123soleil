import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const fromAddress = process.env.RESEND_FROM || '1,2,3 Soleil <onboarding@resend.dev>';
const primaryEmail = process.env.CONTACT_EMAIL_PRIMARY || '123soleilcinemasolidaire@gmail.com';
const fallbackEmail = process.env.CONTACT_EMAIL_FALLBACK || '';

const genericErrorMessage =
  "Une erreur est survenue lors de l'envoi. Réessayez dans quelques instants, ou écrivez-nous directement à " +
  '123soleilcinemasolidaire@gmail.com.';

export async function POST(request: NextRequest) {
  if (!resend) {
    // Détail technique gardé côté serveur uniquement : l'utilisateur ne doit jamais voir "RESEND_API_KEY manquant".
    console.error('Contact API: configuration email manquante (RESEND_API_KEY).');
    return Response.json({ error: genericErrorMessage }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, message, hp_confirm: hpValue } = body as {
      name?: string;
      email?: string;
      message?: string;
      hp_confirm?: string; // honeypot : doit rester vide, un bot le remplit généralement
    };

    if (hpValue?.trim()) {
      return Response.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Tous les champs (nom, email, message) sont requis.' },
        { status: 400 }
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

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: primaryEmail,
      replyTo,
      subject,
      html,
      ...(fallbackEmail && { bcc: fallbackEmail }),
    });

    if (error) {
      console.error('Contact API error (Resend):', error);
      return Response.json({ error: genericErrorMessage }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return Response.json({ error: genericErrorMessage }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
