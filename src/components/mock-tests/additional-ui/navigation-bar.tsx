"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Check } from "lucide-react"

export default function NavigationBar({ onSubmit }: { onSubmit: () => void }) {
    const [timeLeft, setTimeLeft] = useState(30 * 60) // 13:54 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-1 bg-gray-800 dark:bg-black dark:border-b text-white">
            <div className="flex items-center justify-between h-16 px-6 py-3">
                <button className="flex items-center gap-2 text-white hover:text-gray-300">
                    <ArrowLeft className="w-4 h-4" />
                    <span>EXIT</span>
                </button>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{formatTime(timeLeft)} LEFT</span>
                </div>

                <button onClick={onSubmit} className="flex items-center gap-2 text-white hover:text-gray-300">
                    <span>SUBMIT</span>
                    <Check className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
