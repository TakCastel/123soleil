'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const message = (formData.get('message') as string)?.trim() || '';

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage((data.error as string) || 'Erreur lors de l\'envoi. Réessayez.');
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Erreur réseau. Réessayez.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full px-4 py-3 border-2 border-black bg-white text-[color:var(--neutral-dark)] disabled:opacity-60"
        />
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
          className="w-full px-4 py-3 border-2 border-black bg-white text-[color:var(--neutral-dark)] disabled:opacity-60"
        />
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
          className="w-full px-4 py-3 border-2 border-black bg-white text-[color:var(--neutral-dark)] resize-y disabled:opacity-60"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">
          {errorMessage}
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
