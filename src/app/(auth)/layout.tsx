import { noIndexMetadata } from "@/lib/utils/seo";

export const metadata = noIndexMetadata;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
