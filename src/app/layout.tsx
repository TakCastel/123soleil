import type { Metadata } from "next";
import { Slackey, Glegoo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "1, 2, 3 Soleil - Association Audiovisuelle",
  description: "Association audiovisuelle 1, 2, 3 Soleil - Films, documentaires, ateliers et projets jeunesse",
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
