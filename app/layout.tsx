import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://promile-champion.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Šampión Promile",
  description: "Kdo dá nejvíc?",

  // ✅ LET NEXT HANDLE favicon.ico
  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Drinking",
    "Chlastačka",
    "Oslava",
    "Promile",
    "Alkohol",
    "Alkohol tester",
  ],

  applicationName: "Šampión Promile",

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Šampión Promile",
    description: "Kolik vypiješ?",
    siteName: "Šampión Promile",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // ✅ MUST be absolute
        width: 1200,
        height: 630,
        alt: "Šampión Promile – kolik vypiješ?",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Šampión Promile",
    description: "Kolik vypiješ?",
    images: [`${siteUrl}/og-image.png`], // ✅ absolute
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}