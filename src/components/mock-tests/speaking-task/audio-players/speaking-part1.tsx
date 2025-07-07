"use client"
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

    // Beep function
    const playBeep = () => {
        const beep = new Audio("/mock-tests/speaking-task/speaking_beep.mp3")
        return beep.play().catch((err) => console.error("Beep failed:", err))
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

                            // start recording after beep -> Record 10 seconds -> store blob in S3 + store S3 url in localstorage
                            await startRecording()
                            setTimeout(async () => {
                                const result = await stopRecordingWithMeta(question.id)
                                if (result) {
                                    const url = await uploadAudioToS3(result.blob, result.filename)
                                    if (url) {
                                        updateSpeakingAnswer(question.id, url)
                                    }
                                }
                                resolve()
                            }, 10000) // wait 10 seconds after beep
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