import { getUserSession } from "@/lib/auth/session/check-auth"
import { redirect } from "next/navigation"

const SUPER_ADMIN_USER_IDS_CUSTOM = [
    "5cf3fb55-43ef-4b13-8ac2-d9fad0061123"
]

export default async function SuperAdminLayoutGuard({ children, }: { children: React.ReactNode }) {

    const session = await getUserSession()
    if (!session) redirect("/login/user")

    if (!SUPER_ADMIN_USER_IDS_CUSTOM.includes(session.userId)) redirect("/")

    return <>{children}</>
}
