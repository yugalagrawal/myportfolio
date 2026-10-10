import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/ui/MotionProvider";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://yugalagarwal.vercel.app";
const TITLE = "Yugal Agarwal — Product Manager";
const DESCRIPTION =
  "Product Manager with ~4 years building 0-to-1 products, AI-enabled workflows and data-driven platforms. Currently at LetsTransport; ex-Media.net. IIT (BHU) alumnus and founder of Nogozo (10K+ users, Shark Tank India S1 pre-finals).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Yugal Agarwal",
    "Product Manager",
    "PM Portfolio",
    "LetsTransport",
    "Media.net",
    "Nogozo",
    "0-to-1 Products",
    "AI Product Management",
    "Logistics",
    "AdTech",
    "IIT BHU",
  ],
  authors: [{ name: "Yugal Agarwal", url: SITE_URL }],
  creator: "Yugal Agarwal",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Yugal Agarwal",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
