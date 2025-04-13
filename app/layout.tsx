import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";
import { cookies } from "next/headers";


const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameRead Portal",
  description: "GameRead Portal",
  openGraph: {
    title: "GameRead Portal",
    description: "GameRead Portal",
    images: ["/og.png"]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies()

  const theme = cookiesStore.get("theme")?.value || "dark"

  return (
    <html className={theme} lang="en">
      <body
        className={`${openSans.variable} font-Satoshi antialiased`}
      >
        {/* <Header defaultTheme={theme} /> */}
        {children}
        <Toaster position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
