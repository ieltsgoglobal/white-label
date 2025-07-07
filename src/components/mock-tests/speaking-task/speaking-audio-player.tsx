"use client"
import { useEffect, useState } from "react"
import SpeakingPart1Player from "./audio-players/speaking-part1"
import SpeakingPart2Player from "./audio-players/speaking-part2"
import SpeakingPart3Player from "./audio-players/speaking-part3"

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

    const handlePart1Complete = () => {
        console.log("Part 1 finished. Moving to Part 2.")
        setCurrentPart(2)
    }

    const handlePart2Complete = () => {
        console.log("Part 2 finished. Moving to Part 3.")
        setCurrentPart(3)
    }

    const handlePart3Complete = () => {
        console.log("Part 3 finished. All parts done.")
        // go to next section (TestEndScreen)
        onNext()
    }


    // direclty give url and id to second component
    const part2 = speakingData.find((p) => p.part === 2)
    const part2AudioUrl = part2?.questions[0].audioUrl
    const part2questionId = part2?.questions[0].id

    return (
        <>
            {currentPart === 1 && (
                // send full speakingData in order to map/loop it
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