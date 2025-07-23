"use client"
import { useState } from "react"
import SpeakingPart1Player from "./audio-players/speaking-part1"
import SpeakingPart2Player from "./audio-players/speaking-part2"
import SpeakingPart3Player from "./audio-players/speaking-part3"
import { evaluateAllSpeakingRecordings } from "@/lib/mock-tests/speaking/evaluate-speaking/process-speaking-evaluation"
import EarthLoader from "@/components/loaders/mock-tests/speaking/EarthLoader"

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingAudioPlayer({ speakingData, onNext }: { speakingData: SpeakingPart[], onNext: () => void }) {
    const [currentPart, setCurrentPart] = useState(1)
    const [isEvaluating, setIsEvaluating] = useState(false)

    const handlePart1Complete = () => {
        console.log("Part 1 finished. Moving to Part 2.")
        setCurrentPart(2)
    }

    const handlePart2Complete = () => {
        console.log("Part 2 finished. Moving to Part 3.")
        setCurrentPart(3)
    }

    const handlePart3Complete = async () => {
        console.log("Part 3 finished. All parts done.")

        // evaluate all s3 recordings
        setIsEvaluating(true)
        await evaluateAllSpeakingRecordings({ speakingData })
        console.log("✅ All Answers Evaluated and localStorage Updated")
        setIsEvaluating(false)
        onNext()
    }


    // direclty give url and id to second component
    const part2 = speakingData.find((p) => p.part === 2)
    const part2AudioUrl = part2?.questions[0].audioUrl
    const part2questionId = part2?.questions[0].id

    return (
        <>
            {/* show loader when tasks are being evaluated */}
            {isEvaluating && <EarthLoader />}

            {currentPart === 1 && (
                // send full speakingData in order to map/loop it
                // record user, store audio blob in s3 and store s3 link in localstorage, so that later can be evaluated
                <SpeakingPart1Player speakingData={speakingData} onComplete={handlePart1Complete} />
            )}
            {currentPart === 2 && part2AudioUrl && part2questionId && (
                <SpeakingPart2Player audioUrl={part2AudioUrl} questionId={part2questionId} onComplete={handlePart2Complete} />
            )}
            {currentPart === 3 && (
                // send full speakingData in order to map/loop it
                <SpeakingPart3Player speakingData={speakingData} onComplete={handlePart3Complete} />
            )}
        </>
    )
}