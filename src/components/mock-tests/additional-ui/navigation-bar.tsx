"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Clock, Check } from "lucide-react"

interface NavigationBarProps {
    onSubmit: () => void
    initialMinutes?: number // defaults to 30
    hideTimer?: boolean
}

export default function NavigationBar({ onSubmit, initialMinutes = 30, hideTimer }: NavigationBarProps) {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
    const hasSubmittedRef = useRef(false)

    useEffect(() => {
        if (initialMinutes <= 0) return

        const timer = startTimer(setTimeLeft)
        return () => clearInterval(timer)
    }, [initialMinutes])

    const startTimer = (setTime: React.Dispatch<React.SetStateAction<number>>) => {
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    safeSubmit() // when timer ends
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return timer
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    // prevents from double submit
    const safeSubmit = () => {
        if (hasSubmittedRef.current) return
        hasSubmittedRef.current = true
        onSubmit()
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-1 bg-gray-800 dark:bg-black dark:border-b text-white">
            <div className="flex items-center justify-between h-16 px-6 py-3">
                <button className="flex items-center gap-2 text-white hover:text-gray-300">
                    <ArrowLeft className="w-4 h-4" />
                    <span>EXIT</span>
                </button>

                {hideTimer !== true &&
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{formatTime(timeLeft)} LEFT</span>
                    </div>
                }

                <button onClick={safeSubmit} className="flex items-center gap-2 text-white hover:text-gray-300">
                    <span>SUBMIT</span>
                    <Check className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
