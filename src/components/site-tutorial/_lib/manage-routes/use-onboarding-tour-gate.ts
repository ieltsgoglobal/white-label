'use client'

import { useEffect, useState } from 'react'
import { hasRouteBeenVisited, markRouteAsVisited } from './onboarding-tour-storage'

export function useOnboardingTourGate(pathname: string) {
    const [ready, setReady] = useState(false)
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        // client-only safety
        // make sure component loads when window is defined
        setReady(true)
    }, [])

    useEffect(() => {
        if (!ready) return

        const visited = hasRouteBeenVisited(pathname)

        // show tour ONLY on first visit
        setAllowed(!visited)

        markRouteAsVisited(pathname)
    }, [ready, pathname])

    return {
        ready,
        allowed,
    }
}