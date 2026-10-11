import { pageMetadata } from "@/lib/utils/seo";

export const metadata = pageMetadata(
  "IELTS Vocabulary Battle",
  "Make IELTS vocabulary practice more engaging with interactive challenges from IELTS Go Global.",
  "/vocab-battle"
);

export default function VocabBattleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
