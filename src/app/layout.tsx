import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";

import "./globals.css";

import ActiveExamTabGuard from "@/components/providers/active-exam-tab-guard";
import { CrispChat } from "@/components/providers/crisp-chat";
import { ThemeProvider } from "@/components/providers/theme-provider";
import OnboardingTourController from "@/components/site-tutorial/OnboardingTourController";
import { SessionActivity } from "@/components/session-activity/_components/session-activity";
import { Toaster } from "@/components/ui/sonner";
import { siteUrl } from "@/lib/utils/seo";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "IELTS Go Global | Practice & Evaluate for IELTS Success",
    template: "%s | IELTS Go Global"
  },
  description:
    "IELTS Go Global is your trusted platform for realistic IELTS practice tests, expert evaluations, and detailed performance analytics—helping students and educators succeed worldwide.",
  openGraph: {
    title: "IELTS Go Global | Practice & Evaluate for IELTS Success",
    description:
      "Take full-length IELTS mock tests, receive professional feedback, and track your progress. Trusted by students and teachers around the world.",
    type: "website",
    siteName: "IELTS Go Global",
    images: [{ url: "/twitter-image.png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Go Global | Your Trusted IELTS Practice Platform",
    description:
      "Get real IELTS practice tests, AI + expert feedback, and grow your IELTS band score.",
    images: ["/twitter-image.png"]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  // note: can add later when b2b operations start
  // const verifiedSubdomain = await verifySubdomain();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "IELTS Go Global",
            url: siteUrl.toString(),
            description: "IELTS practice tests, evaluations, and performance analytics."
          })}
        </Script>
        <GoogleTag />
        <CrispChat />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          <ActiveExamTabGuard>{children}</ActiveExamTabGuard>

          <OnboardingTourController />
          <SessionActivity />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}



function GoogleTag() {
  const googleAdsId = "AW-16561207539"; // goolge ad
  const ga4Id = "G-TQ59ZQHS1H"; // google analytics

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAdsId}');
          gtag('config', '${ga4Id}');
        `}
      </Script>
    </>
  );
}
