import { noIndexMetadata } from "@/lib/utils/seo";

export const metadata = noIndexMetadata;

export default function OrganizationAuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
