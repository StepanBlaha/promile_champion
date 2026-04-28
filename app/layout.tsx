import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Navbar from '@/components/Navbar/Navbar';
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
  title: "Šampión Promile",
  description: "Kdo dá nejvíc?",
  keywords: [
    "Drinking",
    "Chlastačka",
    "Oslava",
    "Promile",
    "Alkohol",
    "Alkohol tester"
  ],
  applicationName: "Šampión Promile",
  icons: {
    icon: [
      
      { url: "/Favicon/favicon_48x.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: [
      { url: "/Favicon/favicon_128x.png", sizes: "128x128", type: "image/png" },
      { url: "/Favicon/favicon_256x.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/Favicon/favicon_256x.png", sizes: "256x256", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Šampión Promile",
    description:
      "Kolik vypiješ?",
    siteName: "Šampión Promile",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Šampión Promile – kolik vypiješ?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Šampión Promile",
    description:
      "Kolik vypiješ?",
    images: ["/og-image.png"],
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
