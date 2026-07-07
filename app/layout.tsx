import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "股市六爻神諭占卜",
  description: "以易經六爻卦象提供股市投資靈感參考，僅供娛樂與個人判斷輔助，不構成投資建議。",
  other: {
    "google-adsense-account": "ca-pub-6565823960984236",
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6565823960984236"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}