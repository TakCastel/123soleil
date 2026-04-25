import type { Metadata } from "next";
import { Slackey, Glegoo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    default: "1, 2, 3 Soleil – Association de cinéma à Avignon",
    template: "%s | 1, 2, 3 Soleil – Association cinéma Avignon",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${slackey.variable} ${glegoo.variable}`}>
      <body className={`antialiased bg-white text-[color:var(--neutral-dark)]`}>
        <Header />
        {/* Add extra top padding on small screens to accommodate smaller logo overlap */}
        <main className="min-h-screen pt-16 sm:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
