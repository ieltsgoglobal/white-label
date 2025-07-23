"use client"
import { getAllMockTestAttempts } from "@/lib/firebase/firebase-functions"
import { useEffect, useState } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"
import { MockAttemptContext } from "./_component/MockAttemptContext"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    const [attempts, setAttempts] = useState<MockTestAttempt[]>([])

    useEffect(() => {
        async function fetchAttempts() {
            const data = await getAllMockTestAttempts()
            if (data) {
                setAttempts(data)
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