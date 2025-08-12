import { requireRole } from "@/lib/auth/session/check-auth";
import { userActiveAccess } from "@/lib/auth/session/has-access";
import { isSubdomain } from "@/lib/utils/verify-subdomain";

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    const subdomain: boolean | null = isSubdomain()

    // ieltsgoglobal - user login
    // org.ieltsgoglobal - student login
    if (subdomain === true) {
        await requireRole("student")
    } else (
        await userActiveAccess()
    )

    return <>{children}</>
}