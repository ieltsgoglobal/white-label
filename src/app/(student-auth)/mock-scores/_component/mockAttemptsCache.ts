const SESSION_KEY = "mock-test-attempts"
const EXPIRY_KEY = "mock-test-attempts-expiry"
const EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

import type { MockTestAttempt } from "@/types/mockTestAttempt"

export function getCachedMockTestAttempts(): MockTestAttempt[] | null {
    try {
        const expiry = sessionStorage.getItem(EXPIRY_KEY)
        const cached = sessionStorage.getItem(SESSION_KEY)

        if (expiry && cached && Date.now() - parseInt(expiry) < EXPIRY_MS) {
            return JSON.parse(cached)
        }

        return null
    } catch (err) {
        console.warn("Error reading session cache", err)
        return null
    }
}

export function setCachedMockTestAttempts(data: MockTestAttempt[]): void {
    try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
        sessionStorage.setItem(EXPIRY_KEY, Date.now().toString())
    } catch (err) {
        console.warn("Error writing to session cache", err)
    }
}