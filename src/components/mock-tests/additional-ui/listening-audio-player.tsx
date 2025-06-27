"use client"

import { useEffect, useRef, useState } from "react"

export default function ListeningAudioPlayer({ audioList, onAudioEnded }: { audioList: string[], onAudioEnded: () => void }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !audioList[currentIndex]) return

        // Update audio source and prepare to play
        audio.src = audioList[currentIndex]
        audio.load()

        const handleCanPlay = () => {
            audio.play().catch((err) => {
                if (err.name !== "AbortError") {
                    console.warn("Autoplay failed:", err)
                }
            })
        }

        const handleEnded = () => {
            onAudioEnded()
            if (currentIndex < audioList.length - 1) {
                setCurrentIndex((prev) => prev + 1)
            }
        }

        audio.addEventListener("canplaythrough", handleCanPlay)
        audio.addEventListener("ended", handleEnded)

        return () => {
            audio.removeEventListener("canplaythrough", handleCanPlay)
            audio.removeEventListener("ended", handleEnded)
        }
    }, [currentIndex, audioList])

    return <audio ref={audioRef} preload="auto" />
}