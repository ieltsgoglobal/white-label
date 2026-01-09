// ---------------------------------------------
// useSubmissionAccess - WHAT I KNOW
// ---------------------------------------------
// this file is used to getSessionUser (boolean) (on-clinet-side)
// checkSubmissionAccess can be called by parent component to check access again after login
// generally its mereged by the CustomLoginDialog.tsx


// ---------------------------------------------
// useSubmissionAccess - WHAT AI WROTE
// ---------------------------------------------
//
// Client-side access guard for submission-related actions.
//
// Responsibilities:
// - Determines whether the current user is allowed to submit results
// - Exposes a re-check mechanism that can be triggered after login
//
// How it works:
// - Reads the active session via getSessionUser()
// - If no session exists → submissions are blocked
// - If session exists → submissions are allowed
//
// Why this exists:
// - Avoids duplicating session checks across components
// - Keeps auth logic out of UI components (SRP)
// - Allows parent components (e.g. CustomLoginDialog)
//   to re-validate access after a successful login
//
// Typical usage:
// - Used by QuizStatusCard to toggle "Submit" vs "Login required"
// - checkSubmissionAccess() is called after login to unlock submission
//
// Notes:
// - This hook is client-only by design
// - Assumes session state is authoritative on the client
//

"use client"

import { useEffect, useState, useCallback } from "react"
import { getSessionUser } from "@/lib/auth/session/get-user"

export function useSubmissionAccess() {
    const [isSubmissionBlocked, setIsSubmissionBlocked] = useState(true)

    // Re-checks session state and updates submission access.
    // Returns true if submission is allowed, false otherwise.
    const checkSubmissionAccess = useCallback(async () => {
        const session = await getSessionUser()
        setIsSubmissionBlocked(!session)
        return !!session
    }, [])

    // Initial access check on mount
    useEffect(() => {
        checkSubmissionAccess()
    }, [checkSubmissionAccess])

    return {
        isSubmissionBlocked,
        checkSubmissionAccess,
    }
}