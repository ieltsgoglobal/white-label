import { requireRole } from "@/lib/auth/session/check-auth";
import { isSubdomain } from "@/lib/utils/verify-subdomain";

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    const subdomain: boolean | null = isSubdomain()


    if (subdomain === true) {
        await requireRole("student")
    } else (
        await requireRole("user")
    )

    return <>{children}</>
}