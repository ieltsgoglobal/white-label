import { createContext, useContext } from "react"
import type { MockTestAttempt } from "@/types/mockTestAttempt"

interface MockAttemptContextType {
    attempts: MockTestAttempt[]
}

const MockAttemptContext = createContext<MockAttemptContextType | undefined>(undefined)

// safe means is it safe to call Context API , outside the wrapper
export function useMockAttempts(safe: boolean = true): MockAttemptContextType | undefined {
    const context = useContext(MockAttemptContext)

    if (!context && safe) {
        throw new Error("useMockAttempts must be used within MockAttemptProvider")
    }

    return context
}

export { MockAttemptContext }