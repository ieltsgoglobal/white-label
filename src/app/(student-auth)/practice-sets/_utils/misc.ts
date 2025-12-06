export function isPracticeSetsGoingOn(): boolean {
    if (typeof window === 'undefined') return false
    const url = window.location.href.toLowerCase()
    return url.includes('practice-sets')
}