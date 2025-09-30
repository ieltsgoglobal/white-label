"use client";

import AudioPlayer from "./AudioPlayer";
import QuizStatusCard from "./QuizStatusCard";
import QuestionRenderer from "./QuestionRenderer";
import { useState } from "react";
import { submitListeningAnswers } from "@/lib/postgress-aws/fetcher/user-submissions/listening";

const MAX_LECTURES = 4

export default function ListeningUI({
    audioUrls,
    questions,
    testPath
}: {
    audioUrls: string[];
    questions: any[][];
    testPath: string
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentAudioUrl = audioUrls[currentIndex];
    const currentQuestion = questions[currentIndex];

    async function handleCheckResults() {
        try {
            const response = await submitListeningAnswers({
                userId: "00000000-0000-0000-0000-000000000001",
                testPath: "book_20/test_3",
                answers: {}, // fill in later
                startedAt: new Date().toISOString(),
                metadata: { device: "browser" },
            });

            console.log("✅ Submission stored:", response);
        } catch (err) {
            console.error("❌ Error submitting:", err);
        }
    }

    return (
        <div className="space-y-10 p-6 bg-muted-foreground/10">
            <div className="flex gap-10">
                <AudioPlayer key={currentIndex} src={currentAudioUrl} />
                <QuizStatusCard
                    NextSet={() => setCurrentIndex((prev) => Math.min(prev + 1, MAX_LECTURES - 1))}
                    PrevSet={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    currentIndex={currentIndex}
                    maxIndex={MAX_LECTURES - 1}
                    CheckResulsts={handleCheckResults}
                />
            </div>

            {
                currentQuestion.map((questionRaw: any, index: number) => (
                    <QuestionRenderer key={index} questionRaw={questionRaw} index={index} />
                ))
            }
        </div >
    );
}