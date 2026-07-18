import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tech Stack Advisor",
  description:
    "Recommandations de stack technique propulsees par Ministral 3 3B via Rodium AI.",
  openGraph: {
    title: "AI Tech Stack Advisor",
    description:
      "Decrivez votre projet et obtenez une architecture complete avec justifications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} flex min-h-screen flex-col antialiased`}
      >
        <div className="app-shell flex min-h-screen flex-col">
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-6 md:py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
