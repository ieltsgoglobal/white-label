import { requireRole } from "@/lib/auth/session/check-auth";

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    await requireRole("teacher");
    return <>{children}</>
}