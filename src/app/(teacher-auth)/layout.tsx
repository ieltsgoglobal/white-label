import { requireRole } from "@/lib/auth/session/check-auth";
import { noIndexMetadata } from "@/lib/utils/seo";

export const metadata = noIndexMetadata;

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    await requireRole("teacher");
    return <>{children}</>
}
