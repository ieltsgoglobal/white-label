"use client"
import { isPracticeSetsGoingOn } from "@/app/(student-auth)/practice-sets/_utils/misc"
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader"
import { updateSpeakingAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { startRecording, stopRecordingWithMeta } from "@/lib/mock-tests/speaking/recorder"
import { uploadAudioToS3 } from "@/lib/mock-tests/speaking/s3Uploader"
import { updatePracticeSetsSpeakingAnswer } from "@/lib/practice-sets/user-submissions/sessionStorage"
import { useEffect, useRef, useState } from "react"

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
    const [isUploading, setIsUploading] = useState(false)
    const [isPracticeSectionGoingOn, setIsPracticeSectionGoingOn] = useState(isPracticeSetsGoingOn()) // will use to play the initial introduction video in speaking practice-sets
    const hasPlayed = useRef(false) // ref prevents race conditions 

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

        // prevents audios to run multiple time at once
        if (hasPlayed.current) return
        hasPlayed.current = true


        const playAllAudios = async () => {
            const part = speakingData[2]
            if (!part || part.questions.length === 0) return

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
                                        if (isPracticeSectionGoingOn) {
                                            // stores the answer in sessionStorage
                                            updatePracticeSetsSpeakingAnswer(question.id, url)
                                        } else {
                                            // stores the answers in localStorage
                                            updateSpeakingAnswer(question.id, url)
                                        }
                                    }
                                }
                                setIsUploading(false)

                                resolve()
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