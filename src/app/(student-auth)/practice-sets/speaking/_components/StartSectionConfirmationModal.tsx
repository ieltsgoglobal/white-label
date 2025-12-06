"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import MicCheck from "@/components/mock-tests/microphone-check/MicrophoneTest"
import SoundTest from "@/components/mock-tests/sound-check/SoundTest"

type Stage = 1 | 2 | 3

export default function StartSectionConfirmationModal({
    isPlaying,
    onContinue,
}: {
    isPlaying: boolean
    onContinue: () => void
}) {
    const [stage, setStage] = useState<1 | 2 | 3>(1)

    const nextStage = () =>
        setStage((s) => (s < 3 ? ((s + 1) as Stage) : s))

    if (!isPlaying) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-[80vw] h-[90vh] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto">
                    {stage === 1 && <SoundTest onNext={nextStage} />}
                    {stage === 2 && <MicCheck onNext={nextStage} />}

                    {stage === 3 && (
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-semibold">All set to begin?</h2>
                            <p className="text-gray-600">
                                When you click start, the actual test will begin.
                            </p>
                            <Button size="lg" onClick={() => { onContinue() }}>
                                Continue
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}


export function EndSectionConfirmationModel({ onContinue }: { onContinue: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-[80vw] h-[90vh] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold">You’ve completed this section!</h2>
                        <p className="text-gray-600">
                            Great job! Click below to view your results and feedback.
                        </p>
                        <Button size="lg" onClick={() => onContinue()}>
                            View Results
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 