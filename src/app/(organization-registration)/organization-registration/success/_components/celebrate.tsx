"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function Celebrate() {
    useEffect(() => {
        // fire a small burst
        const fire = (particleRatio: number, opts: confetti.Options = {}) => {
            confetti(
                Object.assign(
                    {
                        particleCount: Math.floor(200 * particleRatio),
                        spread: 70,
                        startVelocity: 40,
                        decay: 0.9,
                        scalar: 0.9,
                        ticks: 200,
                        origin: { y: 0.2 },
                    },
                    opts,
                ),
            )
        }

        fire(0.25, { spread: 26, startVelocity: 55 })
        fire(0.2, { spread: 60 })
        fire(0.35, { spread: 100, decay: 0.92, scalar: 1.1 })
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92 })
        fire(0.1, { spread: 120, startVelocity: 45 })

        // cleanup: confetti uses rAF; nothing persistent to cleanup
    }, [])

    return null
}
