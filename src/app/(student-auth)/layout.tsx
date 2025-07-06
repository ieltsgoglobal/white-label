"use client"

import StudentLogin from "@/components/login/student-login/student-login"
import { saveStudentId } from "@/lib/login/indexedDB"
import { useState } from "react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return (
            <StudentLogin
                onLoginComplete={async (result: { student: { id: string } }) => {
                    await saveStudentId(result.student.id) // ✅ Save studentId to IndexedDB
                    setTimeout(() => {
                        setIsLoggedIn(true)
                    }, 50)
                }}
            />
        )
    }

    return <>{children}</>
}