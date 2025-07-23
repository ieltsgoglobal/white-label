"use client"
import { useEffect, useState } from "react"

export default function SpeakingResponseTimer() {
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

    useEffect(() => {
        const handleStart = (e: Event) => {
            const customEvent = e as CustomEvent<{ duration: number }>
            const duration = customEvent.detail.duration || 20
            setSecondsLeft(duration)

            const interval = setInterval(() => {
                setSecondsLeft((prev) => {

                    // remove the timer when it reaches 0
                    if (prev === null || prev <= 1) {
                        clearInterval(interval)
                        return null // ✅ hide timer
                    }
                    return prev - 1
                })
            }, 1000)
        }

        // onStartrecording, fire event listener with duration as details
        window.addEventListener("start-timer", handleStart)
        return () => window.removeEventListener("start-timer", handleStart)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        const label = seconds >= 60 ? "minutes" : "seconds"
        return `${mins}:${secs.toString().padStart(2, "0")} ${label}`
    }

    return (
        <div className="w-full text-center mt-8 text-3xl font-semibold">

            {/* if secondsLeft is null then show "" */}
            {secondsLeft !== null ? formatTime(secondsLeft) : ""}
        </div>
    )
}