"use client"
import { useEffect } from "react"

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingPart3Player({ speakingData, onComplete }: { speakingData: SpeakingPart[], onComplete: () => void }) {

    // Beep function
    const playBeep = () => {
        const beep = new Audio("/mock-tests/speaking-task/speaking_beep.mp3")
        return beep.play().catch((err) => console.error("Beep failed:", err))
    }

    useEffect(() => {
        const playAllAudios = async () => {
            const part = speakingData[2]
            if (!part || part.questions.length === 0) return

            for (const question of part.questions) {
                if (question.audioUrl) {
                    const audio = new Audio(question.audioUrl)

                    await new Promise<void>((resolve) => {
                        audio.addEventListener("ended", async () => {
                            await playBeep()
                            setTimeout(resolve, 10000) // wait 10 seconds after beep
                        })

                        audio.play().catch((err) => {
                            console.error("Audio play error:", err)
                            resolve() // still resolve to avoid hanging
                        })
                    })
                }
            }

            onComplete()
        }

        playAllAudios()
    }, [speakingData, onComplete])

    return null
}