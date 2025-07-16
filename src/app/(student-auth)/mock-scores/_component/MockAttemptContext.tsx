// app/(student-auth)/mock-scores/MockAttemptContext.tsx
"use client"

import { createContext, useContext } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"

interface MockAttemptContextType {
    attempts: MockTestAttempt[]
}

const MockAttemptContext = createContext<MockAttemptContextType | undefined>(undefined)

export function useMockAttempts() {
    const context = useContext(MockAttemptContext)
    if (!context) {
        throw new Error("useMockAttempts must be used within MockAttemptProvider")
    }
    return context
}

export default MockAttemptContext