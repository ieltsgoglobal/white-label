"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import SoundTest from "@/components/mock-tests/sound-check/SoundTest";
import MicCheck from "@/components/mock-tests/microphone-check/MicrophoneTest";
import ListeningInstructions from "@/components/mock-tests/instructions/listening-instructions";
import ListeningMain from "@/components/mock-tests/listening-task/listening-main";
import ReadingMain from "@/components/mock-tests/reading-task/reading-main";
import WritingMain from "@/components/mock-tests/writing-task/writing-main";
import SpeakingMain from "@/components/mock-tests/speaking-task/speaking-main";
import { initializeMockAnswers } from "@/lib/mock-tests/mockAnswersStorage";
import TestEndScreen from "@/components/mock-tests/instructions/TestEndScreen";
import { setReviewMode } from "@/lib/mock-tests/indexedDb";

export default function MockTestPage({ params }: { params: { id: string } }) {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const testId = params.id

    const nextPhase = () => {
        if (currentPhaseIndex < phases.length - 1) {
            setCurrentPhaseIndex((prev) => prev + 1);
        }
    };

    // setup localstorage for answer saving
    useEffect(() => {
        initializeMockAnswers()
    }, [])

    // turn OFF isReviewMode
    useEffect(() => {
        setReviewMode(false)
    }, [])



    const phases = [
        { id: "sound", component: () => <SoundTest onNext={nextPhase} /> },
        { id: "mic", component: () => <MicCheck onNext={nextPhase} /> },
        { id: "listening instructions", component: () => <ListeningInstructions onNext={nextPhase} /> },
        { id: "listening task", component: () => <ListeningMain test_id={testId} onNext={nextPhase} /> },
        { id: "reading task", component: () => <ReadingMain test_id={testId} onNext={nextPhase} /> },
        { id: "writing task", component: () => <WritingMain test_id={testId} onNext={nextPhase} /> },
        { id: "speaking task", component: () => <SpeakingMain test_id={testId} onNext={nextPhase} /> },
        { id: "End Test", component: () => <TestEndScreen /> },
    ];

    return (
        <div className="p-5 bg-gray-200 dark:bg-black">
            <Card className="min-h-[95vh] flex items-center justify-center bg-transparent border-none shadow-none">
                {phases[currentPhaseIndex].component()}
            </Card>
        </div>
    );
}