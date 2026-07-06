import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "股市六爻神諭｜免費線上易經占卜",
  description:
    "擲幣六次，依易經六十四卦探索手中持股的市場啟示",

  openGraph: {
    title: "股市六爻神諭｜免費線上易經占卜",
    description:
      "擲幣六次，依易經六十四卦探索手中持股的市場啟示",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "股市六爻神諭",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "股市六爻神諭｜免費線上易經占卜",
    description:
      "擲幣六次，依易經六十四卦探索手中持股的市場啟示",
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
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}