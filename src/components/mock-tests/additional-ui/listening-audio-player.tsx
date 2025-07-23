"use client"

import { useEffect, useRef, useState } from "react"

// ✅ Cache for previously loaded audio URLs
const audioCache = new Set<string>()

export default function ListeningAudioPlayer({ audioList, onAudioEnded }: { audioList: string[], onAudioEnded: () => void }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !audioList[currentIndex]) return
        const currentSrc = audioList[currentIndex]


        // ✅ Only update src/load if not already cached
        if (audio.src !== currentSrc) {
            if (!audioCache.has(currentSrc)) {
                audio.src = currentSrc
                audio.load()
                audioCache.add(currentSrc)
            } else {
                audio.src = currentSrc
            }
        }

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