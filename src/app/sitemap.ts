import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils/seo";

export const SITE_PAGES_ARRAY = [
  "/",
  "/practice",
  "/coaching-batches",
  "/become-partner",
  "/contact",
  "/user-pricing",
  "/ielts-practice-learn-it-yourself",
  "/ielts-typing-practice",
  "/vocab-battle",
  "/vocab-ladder",
  "/ielts-speaking-partner",
  "/study-abroad-counselor",
  "/digital-card",
  "/policies/privacy",
  "/policies/return",
  "/policies/refund",
  "/terms-conditions"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES_ARRAY.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date()
  }));
}
