"use client"
import { useEffect, useRef, useState } from "react"
import { startRecording, stopRecordingWithMeta } from "@/lib/mock-tests/speaking/recorder"
import { uploadAudioToS3 } from "@/lib/mock-tests/speaking/s3Uploader"
import { updateSpeakingAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import DotPulseLoader from "@/components/loaders/mock-tests/speaking/DotPulseLoader"
import { isPracticeSetsGoingOn } from "@/app/(student-auth)/practice-sets/_utils/misc"
import { updatePracticeSetsSpeakingAnswer } from "@/lib/practice-sets/user-submissions/sessionStorage"

export default function SpeakingPart2Player({ audioUrl, questionId, onComplete, }: { audioUrl: string, questionId: number, onComplete: () => void }) {
    const [isUploading, setIsUploading] = useState(false)
    const [isPracticeSectionGoingOn, setIsPracticeSectionGoingOn] = useState(isPracticeSetsGoingOn()) // will use to play the initial introduction video in speaking practice-sets
    const hasRunRef = useRef(false) // Prevents the sequence from running multiple times

    useEffect(() => {
        // Avoid re-running the audio sequence if the component re-renders
        if (hasRunRef.current) return
        hasRunRef.current = true

        const playAudio = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                const audio = new Audio(src)
                audio.addEventListener("ended", () => resolve())
                audio.addEventListener("error", () =>
                    reject(new Error(`Failed to play ${src}`))
                )
                audio.play().catch(reject)
            })
        }

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


        const runPart2Flow = async () => {
            try {
                // 1. Play static intro
                await playAudio(isPracticeSectionGoingOn ? "/practice-sets/speaking-task/part2/intro.mp3" : "/mock-tests/speaking-task/part2/intro.mp3")

                // 2. Play dynamic question (from part 2 data)
                if (!isPracticeSectionGoingOn) await playAudio(audioUrl) // practice-sets dont have any audio for part2

                // 3. Notify user that 1-minute preparation starts now
                await playAudio(isPracticeSectionGoingOn ? "/practice-sets/speaking-task/part2/timer-starts-now.mp3" : "/mock-tests/speaking-task/part2/timer-starts-now.mp3")

                // 4. Wait 60 seconds for user preparation
                await new Promise((res) => setTimeout(res, 60000))

                // 5. Notify that preparation time is over
                await playAudio(isPracticeSectionGoingOn ? "/practice-sets/speaking-task/part2/alr-prep-time-is-over.mp3" : "/mock-tests/speaking-task/part2/alr-prep-time-is-over.mp3")

                // ✅ Trigger the timer event (120 seconds for Part 2)
                // check speaking-response-timer.ts
                window.dispatchEvent(new CustomEvent("start-timer", { detail: { duration: 120 } }))

                // 6. Play beep before user starts speaking
                await playBeep()

                // 7. Start Recording -> Wait 2 minutes for user's response -> Store Response in S3 + Store S3 url in localstorage
                await startRecording()
                await new Promise((res) => setTimeout(res, 120000))
                const result = await stopRecordingWithMeta(questionId)
                if (result) {
                    setIsUploading(true)
                    const url = await uploadAudioToS3(result.blob, result.filename)
                    if (url) {
                        if (isPracticeSectionGoingOn) {
                            // stores the answer in sessionStorage
                            updatePracticeSetsSpeakingAnswer(questionId, url)
                        } else {
                            // stores the answers in localStorage
                            updateSpeakingAnswer(questionId, url)
                        }
                    }
                }
                setIsUploading(false)

                // 8. End message to the candidate
                await playAudio(isPracticeSectionGoingOn ? "/practice-sets/speaking-task/part2/ty-you-may-stop-speaking.mp3" : "/mock-tests/speaking-task/part2/ty-you-may-stop-speaking.mp3")

                onComplete()
            } catch (err) {
                console.error("Error in Speaking Part 2 sequence:", err)
            }
        }

        runPart2Flow()
    }, [audioUrl, onComplete])

    return (
        <>
            {isUploading && (
                <DotPulseLoader />
            )}
        </>
    )
}