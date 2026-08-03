import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Foooter";
import PageTracker from "@/components/PageTracker";

// Use DM Sans as primary font (modern and readable)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DCLM AU - Deeper Christian Life Ministry Australia",
  description:
    "Deeper Christian Life Ministry Australia - Teaching the undiluted word of God, winning souls, and perfecting saints for the rapture.",
  keywords:
    "DCLM, Deeper Life, Christian Ministry, Australia, Bible Church, Prayer, Worship",
  authors: [{ name: "DCLM AU" }],
  creator: "Deeper Christian Life Ministry Australia",
  publisher: "Deeper Christian Life Ministry Australia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://dlcfau.dclm-au.org",
    siteName: "DCLM AU",
    title: "DCLM AU - Deeper Christian Life Ministry Australia",
    description:
      "Teaching the undiluted word of God, winning souls, and perfecting saints for the rapture.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DCLM Australia Ministry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCLM AU - Deeper Life Christian Ministry Australia",
    description:
      "Teaching the undiluted word of God, winning souls, and perfecting saints.",
    images: ["/assets/twitter-image.jpg"],
    creator: "@dclmau",
    site: "@dclmau",
  },
  alternates: {
    canonical: "https://dlcfau.dclm-au.org",
  },
  category: "religion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <PageTracker />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
