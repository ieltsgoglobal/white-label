"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import SoundTest from "@/components/mock-tests/sound-check/SoundTest";
import MicCheck from "@/components/mock-tests/microphone-check/MicrophoneTest";
import ListeningInstructions from "@/components/mock-tests/instructions/listening-instructions";
import ListeningMain from "@/components/mock-tests/listening-task/listening-main";
import ReadingMain from "@/components/mock-tests/reading-task/reading-main";
import NavigationBar from "@/components/mock-tests/additional-ui/navigation-bar";
import WritingMain from "@/components/mock-tests/writing-task/writing-main";

export default function MockTestPage() {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(2);

    const nextPhase = () => {
        if (currentPhaseIndex < phases.length - 1) {
            setCurrentPhaseIndex((prev) => prev + 1);
        }
    };

    const phases = [
        { id: "sound", component: () => <SoundTest onNext={nextPhase} /> },
        { id: "mic", component: () => <MicCheck onNext={nextPhase} /> },
        { id: "listening instructions", component: () => <ListeningInstructions onNext={nextPhase} /> },
        { id: "listening task", component: () => <ListeningMain test_id="4" /> },
        { id: "reading task", component: () => <ReadingMain test_id="4" /> },
        { id: "writing task", component: () => <WritingMain test_id="4" /> },
    ];

    return (
        <>
            <NavigationBar onSubmit={nextPhase} />
            <div className="p-5 bg-gray-200">
                <Card className="min-h-[95vh] flex items-center justify-center bg-transparent border-none shadow-none">
                    {phases[currentPhaseIndex].component()}
                </Card>
            </div>
        </>


    );
}