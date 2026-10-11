import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata(
  "IELTS Vocabulary Ladder",
  "Build your IELTS vocabulary with a daily interactive learning journey.",
  "/vocab-ladder"
);

export default function VocabLadderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
