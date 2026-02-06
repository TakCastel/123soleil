import PageHeader from '@/components/PageHeader';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact - 1,2,3 Soleil',
  description: 'Contactez l\'association 1,2,3 Soleil par email.'
};

export default function Contact() {
  return (
    <div className="">
      <section className="bg-diagonal-primary dotted-overlay">
        <PageHeader
          seoTitle="Contact - 1,2,3 Soleil"
          mainTitle="Contact"
          subtitle="NOUS ÉCRIRE"
          description="Une question, une idée ou envie de nous rejoindre ? Envoyez-nous un message."
        />
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <ContactForm />
        <p className="mt-8 text-center text-[color:var(--neutral-dark)] text-sm">
          Vous pouvez aussi nous écrire à{' '}
          <a
            href={`mailto:${process.env.CONTACT_EMAIL_PRIMARY ?? '123soleilcinemasolidaire@gmail.com'}`}
            className="text-[color:var(--secondary)] font-medium hover:underline underline-offset-2"
          >
            {process.env.CONTACT_EMAIL_PRIMARY ?? '123soleilcinemasolidaire@gmail.com'}
          </a>
        </p>
      </div>
    </div>
  );
}
