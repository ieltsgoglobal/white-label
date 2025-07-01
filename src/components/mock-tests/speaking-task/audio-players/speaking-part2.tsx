"use client"
import { useEffect, useRef } from "react"

export default function SpeakingPart2Player({ audioUrl, onComplete, }: { audioUrl: string, onComplete: () => void }) {
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

        const runPart2Flow = async () => {
            try {
                // 1. Play static intro
                await playAudio("/mock-tests/speaking-task/part2/intro.mp3")

                // 2. Play dynamic question (from part 2 data)
                await playAudio(audioUrl) //from parent component

                // 3. Notify user that 1-minute preparation starts now
                await playAudio("/mock-tests/speaking-task/part2/timer-starts-now.mp3")

                // 4. Wait 60 seconds for user preparation
                await new Promise((res) => setTimeout(res, 60000))

                // 5. Notify that preparation time is over
                await playAudio("/mock-tests/speaking-task/part2/alr-prep-time-is-over.mp3")

                // 6. Play beep before user starts speaking
                await playAudio("/mock-tests/speaking-task/speaking_beep.mp3")

                // 7. Wait 2 minutes for user's response
                await new Promise((res) => setTimeout(res, 120000))

                // 8. End message to the candidate
                await playAudio("/mock-tests/speaking-task/part2/ty-you-may-stop-speaking.mp3")

                onComplete()
            } catch (err) {
                console.error("Error in Speaking Part 2 sequence:", err)
            }
        }

        runPart2Flow()
    }, [audioUrl, onComplete])

    return null
}