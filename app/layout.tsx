import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sanskar Gupta — Data Science & AI",
    template: "%s | Sanskar Gupta",
  },
  description: siteConfig.description,
  keywords: ["Sanskar Gupta", "Data Science", "AI", "Machine Learning", "NLP", "RAG", "Portfolio"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "Sanskar Gupta",
    title: "Sanskar Gupta — Data Science & AI",
    description: siteConfig.description,
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Sanskar Gupta portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanskar Gupta — Data Science & AI",
    description: siteConfig.description,
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#070909",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
