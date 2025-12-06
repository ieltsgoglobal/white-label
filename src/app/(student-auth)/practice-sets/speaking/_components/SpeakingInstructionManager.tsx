import SpeakingTaskPart2CueCard from "@/components/mock-tests/speaking-task/part2-cue-card";
import { useState } from "react";

export default function SpeakingInstructionManager() {
    const [isCueCardVisible, setCueCardVisible] = useState(false);

    return (
        <div>
            {!isCueCardVisible && (
                <div className="w-full text-center mt-8">
                    Speak after the Beep Sound!
                </div>
            )}

            <SpeakingTaskPart2CueCard
                hideOtherTexts={setCueCardVisible}
            />
        </div>
    );
}