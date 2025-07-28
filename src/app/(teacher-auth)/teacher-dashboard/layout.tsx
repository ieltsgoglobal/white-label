import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key")

export default async function TeacherDashboardLayout({ children }: { children: ReactNode }) {
    const token = cookies().get("token")?.value

    if (!token) {
        redirect("/teacher-login")
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)

        if (payload.role !== "teacher") {
            redirect("/teacher-login")
        }

        return <>{children}</>
    } catch {
        redirect("/teacher-login")
    }
}