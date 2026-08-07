import type { Metadata } from "next";
import { Slackey, Glegoo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import type React from "react";
import { getSiteUrl } from "@/lib/site-url";

const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
  display: "swap",
});

const glegoo = Glegoo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-glegoo",
  display: "swap",
});

const siteUrl = getSiteUrl();
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  ...(googleSiteVerification && {
    verification: {
      google: googleSiteVerification,
    },
  }),
  title: {
    default: "1,2,3 Soleil Cinéma Solidaire | Avignon",
    template: "%s | 1,2,3 Soleil Cinéma Solidaire",
  },
  description:
    "1, 2, 3 Soleil est une association de cinéma à Avignon dédiée à un cinéma solidaire et inclusif : ateliers, médiation artistique, films et projets jeunesse sur le territoire avignonnais.",
  keywords: [
    "association cinéma Avignon",
    "cinéma solidaire Avignon",
    "association audiovisuelle Avignon",
    "médiation artistique Avignon",
    "ateliers cinéma Avignon",
    "1 2 3 Soleil",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "1, 2, 3 Soleil – Association cinéma Avignon",
    title: "1, 2, 3 Soleil – Association de cinéma à Avignon",
    description:
      "Association de cinéma à Avignon pour un cinéma solidaire et inclusif : ateliers, médiation artistique, films et projets jeunesse.",
  },
  twitter: {
    card: "summary_large_image",
    title: "1, 2, 3 Soleil – Association cinéma Avignon",
    description:
      "Association de cinéma à Avignon pour un cinéma solidaire et inclusif.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Organization schema.org : aide Google à afficher un panneau de connaissance pour l'association. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "1, 2, 3 Soleil",
  alternateName: "1, 2, 3 Soleil Cinéma Solidaire",
  description:
    "Association de cinéma à Avignon dédiée à un cinéma solidaire et inclusif : ateliers, médiation artistique, films et projets jeunesse.",
  ...(siteUrl && { url: siteUrl, logo: `${siteUrl}/logo.jpg` }),
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Rue des Esc. Sainte-Anne",
    postalCode: "84000",
    addressLocality: "Avignon",
    addressCountry: "FR",
  },
  sameAs: ["https://www.facebook.com/123soleilcinemasolidaire/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${slackey.variable} ${glegoo.variable}`}>
      <body className={`antialiased bg-white text-[color:var(--neutral-dark)]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <Header />
          {/* Add extra top padding on small screens to accommodate smaller logo overlap */}
          <main className="min-h-screen pt-16 sm:pt-24">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
