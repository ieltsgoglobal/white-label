"use client"
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader"
import { updateSpeakingAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { startRecording, stopRecordingWithMeta } from "@/lib/mock-tests/speaking/recorder"
import { uploadAudioToS3 } from "@/lib/mock-tests/speaking/s3Uploader"
import { useEffect, useState } from "react"

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingPart1Player({ speakingData, onComplete }: { speakingData: SpeakingPart[], onComplete: () => void }) {
    const [isUploading, setIsUploading] = useState(false)

    // Beep function
    const playBeep = () => {
        return new Promise<void>((resolve) => {
            const beep = new Audio("/mock-tests/speaking-task/speaking_beep.mp3")

            // Resolve only when beep finishes
            beep.addEventListener("ended", () => resolve(), { once: true })

            beep.play().catch((err) => {
                console.error("Beep failed:", err)
                resolve() // resolve anyway to avoid blocking
            })
        })
    }

    useEffect(() => {
        const playAllAudios = async () => {
            const part = speakingData[0]
            if (!part || part.questions.length === 0) return

            // loop through all questions
            for (const question of part.questions) {
                if (question.audioUrl) {
                    const audio = new Audio(question.audioUrl)

                    await new Promise<void>((resolve) => {
                        audio.addEventListener("ended", async () => {
                            await playBeep()

                            // ✅ Trigger the timer event (20 seconds for Part 1)
                            // check speaking-response-timer.ts
                            window.dispatchEvent(new CustomEvent("start-timer", { detail: { duration: 20 } }))

                            // start recording after beep -> Record 10 seconds -> store blob in S3 + store S3 url in localstorage
                            await startRecording()
                            setTimeout(async () => {
                                const result = await stopRecordingWithMeta(question.id)
                                if (result) {
                                    setIsUploading(true)
                                    const url = await uploadAudioToS3(result.blob, result.filename)
                                    if (url) {
                                        updateSpeakingAnswer(question.id, url)
                                    }
                                }
                                resolve()
                                setIsUploading(false)
                            }, 20000) // wait 10 seconds after beep
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

    return (
        <>
            {isUploading && (
                <DotPulseLoader />
            )}
        </>
    )
}