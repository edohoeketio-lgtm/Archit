import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Yard Studio | Architectural Precision",
    template: "%s | The Yard Studio"
  },
  description: "Defining spatial paradigms in the heart of Europe. We engineer spatial narratives through brutalist monumentality and intimate, crafted scale.",
  keywords: ["Architecture", "Design Studio", "Brutalism", "Urban Masterplanning", "Berlin", "Milan", "Spatial Strategy"],
  authors: [{ name: "The Yard Studio" }],
  creator: "The Yard Studio",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://theyard.studio",
    title: "The Yard Studio",
    description: "Architectural Precision Meets Radical Production.",
    siteName: "The Yard Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Yard Studio | Architectural Precision",
    description: "Defining spatial paradigms in the heart of Europe.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-charcoal selection:text-background">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
