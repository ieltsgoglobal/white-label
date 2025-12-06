"use client"

import React, { useEffect, useState } from "react";

interface CueBlock {
    title: string;
    items: string[];
}

export default function SpeakingTaskPart2CueCard({ hideOtherTexts }: { hideOtherTexts: (state: boolean) => void }) {
    const [visible, setVisible] = useState(false);

    // Stores the 3 cue-card blocks:
    // 1) Main title
    // 2) “You should say” section with bullet points
    // 3) Final line (“and explain why…”)
    const [cueBlocks, setCueBlocks] = useState<CueBlock[]>([]);

    useEffect(() => {
        // --------------------------------------------------
        // --- SHOW HANDLER — triggers when Part 2 starts ---
        // --------------------------------------------------
        const showHandler = (e: any) => {
            const speakingData = e.detail?.speakingData;
            if (!speakingData) return;

            // Find Part 2 data
            const part2 = speakingData.find((p: any) => p.part === 2);
            if (!part2 || part2.questions.length === 0) return;

            // Part 2 always has only 1 question object
            const q = part2.questions[0];

            // Main cue-card title
            const mainTitle = q.transcript;

            // Derived from convertSpeakingData() — these are the bullet points
            const displayQuestions = q.displayQuestions || [];

            // Last bullet point is always the "explain why..." line
            const finalLine =
                displayQuestions[displayQuestions.length - 1] || "";

            // Build the 3 visual cue-card blocks
            const cueBlock: CueBlock[] = [
                // Block 1 — Title only
                { title: mainTitle, items: [] },

                // Block 2 — You should say + first N-1 items
                {
                    title: "You should say:",
                    items: displayQuestions.slice(0, -1),
                },

                // Block 3 — Final line ("and explain why...")
                { title: finalLine, items: [] },
            ];

            // Save + show
            setCueBlocks(cueBlock);
            setVisible(true);
            hideOtherTexts(true);   // tell parent to hide all other texts
        };

        // ------------------------------------------------
        // -- HIDE HANDLER — hides the cue card on event --
        // ------------------------------------------------
        const hideHandler = () => {
            setVisible(false);
            hideOtherTexts(false);  // tell parent to show other available texts
        };

        // Listen for events fired by the speaking flow
        window.addEventListener("speaking-part2-cuecard-show", showHandler);
        window.addEventListener("speaking-part2-cuecard-hide", hideHandler);

        // Cleanup
        return () => {
            window.removeEventListener("speaking-part2-cuecard-show", showHandler);
            window.removeEventListener("speaking-part2-cuecard-hide", hideHandler);
        };
    }, []);

    if (!visible || cueBlocks.length === 0) return null;

    const main = cueBlocks[0];
    const cue = cueBlocks[1];
    const end = cueBlocks[2];

    return (
        <div className="border-4 border-black p-6 bg-white rounded-sm max-w-3xl mx-auto space-y-6 mt-8">

            {/* MAIN CUE-CARD TITLE */}
            <h2 className="text-xl font-bold text-gray-900">
                {main.title}
            </h2>

            {/* YOU SHOULD SAY SECTION */}
            <div>
                <div className="font-bold text-gray-900 mb-2">
                    {cue.title}``
                </div>

                <ul className="list-disc pl-6 text-gray-800 space-y-1">
                    {cue.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* FINAL LINE */}
            <div className="font-bold text-gray-900">
                {end.title}
            </div>
        </div>
    );
}