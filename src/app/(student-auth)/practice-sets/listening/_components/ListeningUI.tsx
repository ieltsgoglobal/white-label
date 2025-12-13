"use client";

import AudioPlayer from "./AudioPlayer";
import QuizStatusCard from "../../_components/QuizStatusCard";
import QuestionRenderer from "./QuestionRenderer";
import { useEffect, useState } from "react";
import { saveCurrentMockSection, setReviewMode } from "@/lib/mock-tests/indexedDb";
import { normalizePracticeSetsAnswers, transformAnswerAttemptsToJson } from "../_utils/misc";
import { getPracticeSetAnswers, initializePracticeSet, storePracticeSetCorrectAnswers } from "@/lib/practice-sets/user-submissions/sessionStorage";
import { submitListeningAnswers } from "@/lib/postgress-aws/fetcher/practice-sets/user-submissions";

type AttemptWithCorrectAnswers = {
    user: string;
    correct: string;
};


export const MAX_LECTURES = 4
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
    // 🔁 Live sync user answers when sessionStorage updates
    // -------------------------------------------------
    useEffect(() => {
        const handleUpdate = () => {
            const updatedAnswers = getPracticeSetAnswers("practice-sets-listening") || {};
            setUserAttemptsWithAnswers((prev) =>
                prev.map((item, idx) => ({
                    ...item,
                    user: updatedAnswers[idx + 1] || "",
                }))
            );
        };

        window.addEventListener("update-practice-set", handleUpdate);
        return () => window.removeEventListener("update-practice-set", handleUpdate);
    }, []);

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
    }

    async function handelSubmitScores({ startedAt, timeTaken, }: { startedAt: Date; timeTaken: number; }) {
        try {
            // convert the array to json, beacuse answers coloums is a JSOB field
            const answersJson = transformAnswerAttemptsToJson(userAttemptsWithAnswers);

            const response = await submitListeningAnswers({
                userId: "10000000-0000-0000-0000-000000000001",
                testPath: testPath,
                answers: answersJson,
                startedAt: startedAt.toISOString(),
                metadata: { 'device': "browser", 'timeTaken': timeTaken },
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
                    CheckResulsts={async ({ startedAt, timeTaken }) => {
                        handleCheckResults();
                        handelSubmitScores({ startedAt, timeTaken })
                    }}
                    MAX_INDEX={MAX_LECTURES - 1}
                    userAttemptsWithAnswers={userAttemptsWithAnswers}
                />
            </div>

            {currentQuestion.map((questionRaw: any, index: number) => (
                <QuestionRenderer
                    // trick: this forces the AnswerInput.tsx to read the updated setReviewMode which is deep nested
                    key={`${forceRender}-${index}`}
                    questionRaw={questionRaw}
                    index={`${currentIndex} + ${index}`} />
            ))
            }
        </div >
    );
}