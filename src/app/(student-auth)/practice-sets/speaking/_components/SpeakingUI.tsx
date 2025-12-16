"use client"

import Image from "next/image";
import SpeakingAudioPlayer from "@/components/mock-tests/speaking-task/speaking-audio-player";
import SpeakingResponseTimer from "@/components/mock-tests/additional-ui/speaking-response-timer";
import SpeakingPagination from "@/components/mock-tests/speaking-task/speakingPagination";
import React, { useEffect } from "react";
import StartSectionConfirmationModal, { EndSectionConfirmationModel } from "./StartSectionConfirmationModal";
import { getPracticeSetSpeakingAnswers, getPracticeSetsSpeakingScores, initializePracticeSetSpeaking } from "@/lib/practice-sets/user-submissions/sessionStorage";
import SpeakingReviewPage from "@/components/mock-tests/additional-ui/review-components/speaking/SpeakingReviewPage";
import { Button } from "@/components/ui/button";
import { submitSpeakingAnswers } from "@/lib/postgress-aws/fetcher/practice-sets/user-submissions";
import SpeakingInstructionManager from "./SpeakingInstructionManager";

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
    displayQuestions?: string[]   // Part 2 cue-card bullet points
}

export interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingUI({ speakingData, testPath }: { speakingData: SpeakingPart[], testPath: string }) {

    const [stage, setStage] = React.useState<0 | 1 | 2 | 3>(0)
    const memoizedSpeakingData = React.useMemo(() => speakingData, [speakingData])


    // -------------------------------------------------
    // ------ Initialize empty speaking answers --------
    // -------------------------------------------------
    useEffect(() => {
        initializePracticeSetSpeaking()
    }, [])

    // -------------------------------------------------
    // ------------- Submiting Answers -----------------
    // -------------------------------------------------

    // const handleStoreUserResponseWithScore = async ({ startedAt, timeTaken, }: { startedAt: Date; timeTaken: number; }) => {
    const handleStoreUserResponseWithScore = async ({ startedAt = new Date(), timeTaken = 0, }: { startedAt?: Date; timeTaken?: number; }) => {

        try {
            const response = await submitSpeakingAnswers({
                testPath: testPath,
                user_responses: JSON.stringify(getPracticeSetSpeakingAnswers()),
                user_scores: JSON.stringify(getPracticeSetsSpeakingScores()),
                startedAt: startedAt.toISOString(),
                metadata: { device: "browser", timeTaken: timeTaken },
            });

            console.log("✅ Speaking responses submission stored:", response);

        } catch (err) {
            console.error("❌ Error submitting writing responses:", err);
        }
    }



    return (
        <>

            {stage === 0 && (
                <StartSectionConfirmationModal
                    isPlaying={stage == 0}
                    onContinue={() => { setStage(1) }}
                />
            )}

            {stage === 1 && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen w-full">
                        <SpeakingAudioPlayer speakingData={memoizedSpeakingData} onNext={() => { setStage(2) }} />

                        <div className="justify-center bg-white rounded-3xl border border-gray-100 min-w-full p-8">
                            <Image
                                src="/mock-tests/speaking-task/ielts-test-taker.png"
                                alt="IELTS Test Taker"
                                width={300}
                                height={200}
                                className="rounded-xl mx-auto"
                            />
                            <SpeakingInstructionManager />
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
            )}

            {stage === 2 && (
                <>
                    <EndSectionConfirmationModel onContinue={() => {
                        handleStoreUserResponseWithScore({})
                        setStage(3)
                    }} />
                </>
            )}

            {stage === 3 && (
                <div>
                    <div className="w-full mt-5 mx-5">
                        <Button>{`< `}Go Back (Dashboard)</Button>
                    </div>
                    <SpeakingReviewPage currentSpeakingPracticeSetsQuestions={memoizedSpeakingData} />
                </div>
            )}

        </>
    )
}