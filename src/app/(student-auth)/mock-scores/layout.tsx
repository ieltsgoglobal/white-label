"use client"

import { getAllMockTestAttempts } from "@/lib/firebase/firebase-functions"
import { useEffect, useState } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"
import { MockAttemptContext } from "./_component/MockAttemptContext"
import { setReviewMode } from "@/lib/mock-tests/indexedDb"
import { useSearchParams } from "next/navigation"
import { getSessionUser, SessionUser } from "@/lib/auth/session/get-user"


export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [attempts, setAttempts] = useState<MockTestAttempt[]>([])
    const searchParams = useSearchParams()
    const studentIdParams = searchParams.get("studentid") || ""

    // if teacher is checking then dont cache the data
    useEffect(() => {
        async function fetchAttempts() {

            // if student is checking: get id from jwt
            // if teacher/org checking
            // : get id from params
            let studentId = studentIdParams;
            if (!studentIdParams) {
                const user: SessionUser | null = await getSessionUser();
                if (user?.role === "student") {
                    studentId = user.studentId
                }
            }

            const data = await getAllMockTestAttempts(studentId)
            if (data) {
                setAttempts(data)
            }
        }

        fetchAttempts()
    }, [])


    // sets isReviewMode ON in indexedDB
    useEffect(() => {
        setReviewMode(true)
    }, [])

    return (
        // Content API stores all the mock test attempts
        <MockAttemptContext.Provider value={{ attempts }}>
            {children}
        </MockAttemptContext.Provider>
    )
}