import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Yugal Agarwal — Product Manager",
  description:
    "Senior Product Manager building impactful digital products. Specializing in growth, platform strategy, and 0→1 product development.",
  keywords: ["Product Manager", "PM Portfolio", "Yugal Agarwal", "Growth", "Strategy"],
  authors: [{ name: "Yugal Agarwal" }],
  openGraph: {
    title: "Yugal Agarwal — Product Manager",
    description: "Senior Product Manager building impactful digital products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yugal Agarwal — Product Manager",
    description: "Senior Product Manager building impactful digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
