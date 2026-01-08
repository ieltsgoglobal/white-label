'use client'

/**
 * Single localStorage key used to persist onboarding / site-tour state.
 *
 * Design decision:
 * - We intentionally store ALL onboarding data under ONE key
 * - This avoids key explosion and makes debugging & future migrations easier
 */
const STORAGE_KEY = 'site-onboarding-tour-data'

/**
 * Shape of the persisted onboarding data.
 *
 * visitedRoutes:
 * - A route is added here the FIRST time the user visits it
 * - If a route exists in this list, its onboarding tour
 *   must NEVER be shown again
 */
type OnboardingTourStore = {
    visitedRoutes: string[]
}

/**
 * Safely loads onboarding data from localStorage.
 *
 * Guarantees:
 * - Always returns a valid object shape
 * - Handles empty storage, corrupted JSON, or read failures gracefully
 * - Never throws — onboarding state must not break the app
 */
function loadStore(): OnboardingTourStore {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return { visitedRoutes: [] }
        return JSON.parse(raw)
    } catch {
        return { visitedRoutes: [] }
    }
}

/**
 * Persists the entire onboarding state back to localStorage.
 *
 * Centralizing writes here ensures:
 * - Consistent serialization
 * - Easy future migrations (e.g. IndexedDB)
 * - Safe failure handling
 */
function persistStore(store: OnboardingTourStore) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    } catch {
        // Fail silently — onboarding should never block user interaction
    }
}

/**
 * Records that a route has been visited.
 *
 * Important rule:
 * - Route visit == onboarding tour implicitly completed
 * - A visited route will NEVER show its tour again
 *
 * This function is idempotent:
 * - Calling it multiple times for the same route has no effect
 */
export function markRouteAsVisited(route: string) {
    const store = loadStore()

    if (!store.visitedRoutes.includes(route)) {
        store.visitedRoutes.push(route)
        persistStore(store)
    }
}

/**
 * Checks whether a route has already been visited.
 *
 * Used by the onboarding gate to decide:
 * - true  → do NOT show tour
 * - false → show tour
 */
export function hasRouteBeenVisited(route: string): boolean {
    return loadStore().visitedRoutes.includes(route)
}

/**
 * Development / debug helper.
 *
 * Completely removes all onboarding state.
 * Intended for:
 * - local development
 * - QA testing
 * - forcing tour re-runs
 */
export function resetAllOnboardingTourData() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // noop
    }
}