import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal",
  description: "Portal",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1266444059498080" crossOrigin="anonymous" />
      <body
        className={`${openSans.variable} font-Satoshi antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
