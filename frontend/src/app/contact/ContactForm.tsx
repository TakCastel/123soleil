'use client';

import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: string; email?: string; message?: string };

function validateFields(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name) errors.name = 'Le nom est requis.';
  if (!email) {
    errors.email = 'L\'email est requis.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Veuillez entrer une adresse email valide.';
  }
  if (!message) errors.message = 'Le message est requis.';
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const message = (formData.get('message') as string)?.trim() || '';
    const website = (formData.get('website') as string)?.trim() || '';

    // Honeypot : champ invisible pour les humains, souvent rempli par les bots. On feint le succès sans envoyer.
    if (website) {
      setStatus('success');
      form.reset();
      return;
    }

    const errors = validateFields(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGlobalError('Veuillez corriger les champs indiqués.');
      setStatus('error');
      return;
    }

    setFieldErrors({});
    setGlobalError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setGlobalError((data.error as string) || 'Erreur lors de l\'envoi. Réessayez.');
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setGlobalError('Erreur réseau. Réessayez.');
    }
  }

  const inputErrorClass = 'border-red-600 focus:outline-red-600';
  const inputBaseClass = 'w-full px-4 py-3 border-2 border-black bg-white text-[color:var(--neutral-dark)] disabled:opacity-60';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot anti-spam : caché visuellement et du DOM tab order, mais présent pour les bots qui remplissent tout. */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="contact-name" className="block font-medium text-[color:var(--neutral-dark)] mb-2">
          Nom
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={status === 'sending'}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          className={`${inputBaseClass} ${fieldErrors.name ? inputErrorClass : ''}`}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="mt-1 text-red-600 text-sm" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="block font-medium text-[color:var(--neutral-dark)] mb-2">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={status === 'sending'}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
          className={`${inputBaseClass} ${fieldErrors.email ? inputErrorClass : ''}`}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="mt-1 text-red-600 text-sm" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-medium text-[color:var(--neutral-dark)] mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={status === 'sending'}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          className={`${inputBaseClass} resize-y ${fieldErrors.message ? inputErrorClass : ''}`}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-1 text-red-600 text-sm" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>
      {status === 'error' && globalError && (
        <p className="text-red-600 text-sm" role="alert">
          {globalError}
        </p>
      )}
      {status === 'success' && (
        <p className="text-green-700 text-sm" role="status">
          Message envoyé. Nous vous répondrons dès que possible.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="relative px-6 py-3 font-bold border-2 border-black bg-[color:var(--secondary)] text-white disabled:opacity-60"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer'}
      </button>
    </form>
  );
}
