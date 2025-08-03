"use client"

import { getAllMockTestAttempts } from "@/lib/firebase/firebase-functions"
import { useEffect, useMemo, useState } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"
import { MockAttemptContext } from "./_component/MockAttemptContext"
import { getCachedMockTestAttempts, setCachedMockTestAttempts } from "@/app/(student-auth)/mock-scores/_component/mockAttemptsCache"


export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [attempts, setAttempts] = useState<MockTestAttempt[]>([])

    // check teacher review and get studentId from url
    // Read URL params safely at initial render
    const { isTeacherReview, studentId } = useMemo(() => {
        if (typeof window === "undefined") return { isTeacherReview: false, studentId: undefined };
        const params = new URLSearchParams(window.location.search);
        return {
            isTeacherReview: params.get("teacher-review") === "true",
            studentId: params.get("studentid") || undefined,
        };
    }, []);

    // if teacher is checking then dont cache the data
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