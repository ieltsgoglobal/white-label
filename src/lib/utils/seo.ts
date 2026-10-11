import type { Metadata } from "next";

export const siteUrl = new URL("https://ieltsgoglobal.com");

const siteName = "IELTS Go Global";
const defaultImage = "/twitter-image.png";

export function pageMetadata(title: string, description: string, path: string, options?: { noIndex?: boolean }): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: options?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      type: "website",
      images: [{ url: defaultImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultImage]
    }
  };
}

export const noIndexMetadata: Metadata = {
  robots: { index: false, follow: false }
};
