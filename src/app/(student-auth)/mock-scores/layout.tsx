"use client"
import { getAllMockTestAttempts } from "@/lib/firebase/firebase-functions"
import { useEffect, useState } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"
import { MockAttemptContext } from "./_component/MockAttemptContext"
import { getCachedMockTestAttempts, setCachedMockTestAttempts } from "@/lib/cache/mock-scores/mockAttemptsCache"
import { useSearchParams } from "next/navigation"
import { requireRole } from "@/lib/auth/session/check-auth"


export default async function DemoLayout({ children }: { children: React.ReactNode }) {
    await requireRole(["student", "teacher"]);

    const [attempts, setAttempts] = useState<MockTestAttempt[]>([])

    // teacher review
    const searchParams = useSearchParams()
    const isTeacherReview = searchParams.get("teacher-review") === "true"
    const studentId = searchParams.get("studentid") || undefined


    useEffect(() => {
        async function fetchAttempts() {
            if (!isTeacherReview) {
                // if data cached then use it
                const cached = getCachedMockTestAttempts()
                if (cached) {
                    setAttempts(cached)
                    console.debug("Used cached attempts")
                    return
                }
            }


            const data = await getAllMockTestAttempts(studentId)
            if (data) {
                setAttempts(data)
                console.log(data)
                // cache data for 10 mins
                if (!isTeacherReview) {
                    setCachedMockTestAttempts(data)
                }
            }
        }

        fetchAttempts()
    }, [])

    return (
        // Content API stores all the mock test attempts
        <MockAttemptContext.Provider value={{ attempts }}>
            {children}
        </MockAttemptContext.Provider>
    )
}