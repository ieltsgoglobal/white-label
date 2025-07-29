"use client"

import StudentLogin from "@/components/login/student-login/student-login"
import { getSessionUser } from "@/lib/auth/session/get-user"
import { useEffect, useState } from "react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function checkUser() {
            const user = await getSessionUser()
            if (user?.role === "teacher") {
                console.log("Logged in as teacher")
                setIsLoggedIn(true)
            }
        }

        checkUser()
    }, [])

    if (!isLoggedIn) {
        return (
            <StudentLogin onSuccess={() => { setIsLoggedIn(true) }} />
        )
    }

    return <>{children}</>
}