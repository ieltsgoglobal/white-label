import { useEffect, useState } from "react";
import SpeakingPagination from "./speakingPagination";
import Image from "next/image";
import SpeakingAudioPlayer from "./speaking-audio-player";
import SpeakingResponseTimer from "../additional-ui/speaking-response-timer";

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingMain({ test_id, onNext }: { test_id: string, onNext: () => void }) {
    const [speakingData, setSpeakingData] = useState<SpeakingPart[]>([])

    useEffect(() => {
        const loadTestData = async () => {
            try {
                const testDataModule = await import(`@/app/data/tests/test-${test_id}`)
                const { speaking_transcripts } = testDataModule.default || testDataModule
                setSpeakingData(speaking_transcripts)
                console.log(speaking_transcripts)
            } catch (error) {
                console.error("Failed to load test data:", error)
            }
        }

        loadTestData()
    }, [test_id])

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen w-full">
                <SpeakingAudioPlayer speakingData={speakingData} onNext={() => onNext()} />
                <div className="justify-center bg-white rounded-3xl border border-gray-100 min-w-full p-8">
                    <Image
                        src="/mock-tests/speaking-task/ielts-test-taker.png"
                        alt="IELTS Test Taker"
                        width={300}
                        height={200}
                        className="rounded-xl mx-auto"
                    />
                    <div className="w-full text-center mt-8">Speak after the Beep Sound!</div>
                </div>
                <div className="justify-center bg-white rounded-3xl border border-gray-100 min-w-full p-8">
                    <Image
                        src="/mock-tests/speaking-task/user-microphone.jpg"
                        alt="User Microphone"
                        width={300}
                        height={200}
                        className="rounded-xl mx-auto"
                    />
                    <SpeakingResponseTimer />
                </div>
            </div>

            <SpeakingPagination speakingData={speakingData} />
        </>
    )
}