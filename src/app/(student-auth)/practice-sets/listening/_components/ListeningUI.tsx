"use client";

import AudioPlayer from "./AudioPlayer";
import QuizStatusCard from "./QuizStatusCard";
import QuestionRenderer from "./QuestionRenderer";
import { useEffect, useState } from "react";
import { submitListeningAnswers } from "@/lib/postgress-aws/fetcher/user-submissions/listening";
import { saveCurrentMockSection, setReviewMode } from "@/lib/mock-tests/indexedDb";
import { normalizePracticeSetsAnswers, transformAnswerAttemptsToJson } from "../_utils/misc";
import { initializePracticeSet, storePracticeSetCorrectAnswers } from "@/lib/practice-sets/user-submissions/sessionStorage";

type AttemptWithCorrectAnswers = {
    user: string;
    correct: string;
};


const MAX_LECTURES = 4
const TOTAL_QUESTIONS = 40;

export default function ListeningUI({
    audioUrls,
    questions,
    testPath,
    answers,
}: {
    audioUrls: string[];
    questions: any[][];
    testPath: string
    answers: string[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentAudioUrl = audioUrls[currentIndex];
    const currentQuestion = questions[currentIndex];

    const [userAttemptsWithAnswers, setUserAttemptsWithAnswers] = useState<AttemptWithCorrectAnswers[]>(
        () =>
            Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
                user: "",
                correct: answers[i] || "",
            }))
    );

    const [forceRender, setforceRender] = useState(0);


    // turn OFF isReviewMode on load
    useEffect(() => {
        setReviewMode(false)
    }, [])

    // Initialize empty listening answers in session storage
    useEffect(() => {
        initializePracticeSet("practice-sets-listening")
    })

    // to tell child component that practice-sets-listening section is going on though indexedDB,
    useEffect(() => {
        saveCurrentMockSection("practice-sets-listening") // Save on mount
    }, [])

    // -------------------------------------------------
    // Store the correct answers (from S3) on mount
    // This ensures AnswerInput can access them immediately,
    // even before "Check Results" is pressed.
    // -------------------------------------------------
    useEffect(() => {
        const normalized = normalizePracticeSetsAnswers(answers)
        storePracticeSetCorrectAnswers("practice-sets-listening", normalized)
    }, [answers])

    async function handleCheckResults() {

        //  Turn on review mode so AnswerInput.tsx can show answers
        setReviewMode(true)
        setforceRender(n => n + 1); //trick: this forces the AnswerInput.tsx to read the updated setReviewMode

        try {
            // convert the array to json, beacuse answers coloums is a JSOB field
            const answersJson = transformAnswerAttemptsToJson(userAttemptsWithAnswers);

            const response = await submitListeningAnswers({
                userId: "00000000-0000-0000-0000-000000000001",
                testPath: testPath,
                answers: answersJson,
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
                    <QuestionRenderer
                        // trick: this forces the AnswerInput.tsx to read the updated setReviewMode which is deep nested
                        key={`${forceRender}-${index}`}
                        questionRaw={questionRaw}
                        index={index} />
                ))
            }
        </div >
    );
}