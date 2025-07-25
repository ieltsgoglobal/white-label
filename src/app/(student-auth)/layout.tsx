"use client"

import StudentLogin from "@/components/login/student-login/student-login"
import { useState } from "react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return (
            <StudentLogin onSuccess={() => { setIsLoggedIn(true) }} />
        )
    }

    return <>{children}</>
}