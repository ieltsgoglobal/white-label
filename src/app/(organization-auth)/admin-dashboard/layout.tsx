import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { requireRole } from "@/lib/auth/session/check-auth";

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    await requireRole("organization");

    return <AdminPanelLayout>{children}</AdminPanelLayout>;
}