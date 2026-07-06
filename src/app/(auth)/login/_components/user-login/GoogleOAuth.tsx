"use client"

import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader"
import Script from "next/script"
import { useState } from "react"

type GoogleCredentialResponse = {
    credential: string
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void
                    renderButton: (element: HTMLElement, options: Record<string, string | number>) => void
                }
            }
        }
    }
}

export function GoogleOAuth() {
    const [error, setError] = useState("")
    const [isRedirecting, setIsRedirecting] = useState(false)

    const handleGoogleLogin = async ({ credential }: GoogleCredentialResponse) => {
        setError("")
        setIsRedirecting(true)

        try {
            const response = await fetch("/api/auth/user/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
            })
            const result = await response.json()

            if (!response.ok) { throw new Error(result.error || "Google login failed") }

            window.location.href = document.referrer?.startsWith(window.location.origin) ? document.referrer : "/practice"
        } catch (error) {
            setIsRedirecting(false)
            setError(error instanceof Error ? error.message : "Google login failed")
        }
    }

    const initializeGoogleButton = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        const button = document.getElementById("google-user-login")

        if (!clientId || !button || !window.google) return

        window.google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleLogin })

        window.google.accounts.id.renderButton(button, {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: 320,
        })
    }

    return (
        <div className="grid gap-6">
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onReady={initializeGoogleButton}
            />
            <div id="google-user-login" className="flex min-h-10 justify-center">
                {isRedirecting && <DotPulseLoader />}
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
    )
}
