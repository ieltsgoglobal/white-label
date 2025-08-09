import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { verifySubdomain } from "@/lib/utils/verify-subdomain";
import NotFound from "./not-found";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "IELTS Go Global | Practice & Evaluate for IELTS Success",
  description:
    "IELTS Go Global is your trusted platform for realistic IELTS practice tests, expert evaluations, and detailed performance analytics—helping students and educators succeed worldwide.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "IELTS Go Global | Practice & Evaluate for IELTS Success",
    description:
      "Take full-length IELTS mock tests, receive professional feedback, and track your progress. Trusted by students and teachers around the world.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Go Global | Your Trusted IELTS Practice Platform",
    description:
      "Get real IELTS practice tests, AI + expert feedback, and grow your IELTS band score.",
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const verifiedSubdomain = await verifySubdomain();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          {verifiedSubdomain === null ?
            <NotFound />
            :
            <>{children}</>
          }

        </ThemeProvider>
      </body>
    </html>
  );
}
