"use client"
import { getAllMockTestAttempts } from "@/lib/firebase/firebase-functions"
import { useEffect, useState } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"
import { MockAttemptContext } from "./_component/MockAttemptContext"
import { getCachedMockTestAttempts, setCachedMockTestAttempts } from "@/lib/cache/mock-scores/mockAttemptsCache"
export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [attempts, setAttempts] = useState<MockTestAttempt[]>([])


    useEffect(() => {
        async function fetchAttempts() {
            // if data cached then use it
            const cached = getCachedMockTestAttempts()
            if (cached) {
                setAttempts(cached)
                console.debug("Used cached attempts")
                return
            }

            const data = await getAllMockTestAttempts()
            if (data) {
                setAttempts(data)
                // cache data for 10 mins
                setCachedMockTestAttempts(data)
                console.log(data)
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