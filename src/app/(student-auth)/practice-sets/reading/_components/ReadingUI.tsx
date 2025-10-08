"use client"

import { useEffect, useState } from "react";
import QuestionRenderer from "../../listening/_components/QuestionRenderer";
import QuizStatusCard from "../../listening/_components/QuizStatusCard";
import PassageDisplay from "./PassageDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveCurrentMockSection, setReviewMode } from "@/lib/mock-tests/indexedDb";
import { getPracticeSetAnswers, initializePracticeSet, storePracticeSetCorrectAnswers } from "@/lib/practice-sets/user-submissions/sessionStorage";
import { normalizePracticeSetsAnswers, transformAnswerAttemptsToJson } from "../../listening/_utils/misc";
import { submitReadingAnswers } from "@/lib/postgress-aws/fetcher/practice-sets/user-submissions";

type AttemptWithCorrectAnswers = {
    user: string;
    correct: string;
};


const MAX_PASSAGES = 3;
const TOTAL_QUESTIONS = 40;


export default function ReadingUI({ questions, passages, answers, testPath }: { questions: any[], passages: any[], answers: string[], testPath: string }) {

    if (!Array.isArray(questions) || questions.length === 0) {
        return <div className="text-muted-foreground">No reading data available.</div>;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestions = questions[currentIndex] || [];
    const currentPassage = passages[currentIndex] || {};

    const [userAttemptsWithAnswers, setUserAttemptsWithAnswers] = useState<AttemptWithCorrectAnswers[]>(
        Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
            user: "",
            correct: answers?.[i] || "",
        }))
    );

    const [forceRender, setforceRender] = useState(0);


    // turn OFF isReviewMode on load
    useEffect(() => {
        setReviewMode(false)
    }, [])

    // Initialize empty listening answers in session storage
    useEffect(() => {
        initializePracticeSet("practice-sets-reading")
    })

    // to tell child component that practice-sets-listening section is going on though indexedDB,
    useEffect(() => {
        saveCurrentMockSection("practice-sets-reading") // Save on mount
    }, [])

    // -------------------------------------------------
    // 🔁 Live sync user answers when sessionStorage updates
    // -------------------------------------------------
    useEffect(() => {
        const handleUpdate = () => {
            const updatedAnswers = getPracticeSetAnswers("practice-sets-reading") || {};
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
        storePracticeSetCorrectAnswers("practice-sets-reading", normalized)
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

            const response = await submitReadingAnswers({
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
            <QuizStatusCard
                NextSet={() => { setCurrentIndex((prev) => Math.min(prev + 1, MAX_PASSAGES - 1)) }}
                PrevSet={() => { setCurrentIndex((prev) => Math.max(prev - 1, 0)) }}
                currentIndex={currentIndex}
                CheckResulsts={({ startedAt, timeTaken }) => {
                    handleCheckResults();
                    handelSubmitScores({ startedAt, timeTaken })
                }}
                MAX_INDEX={MAX_PASSAGES - 1}
                userAttemptsWithAnswers={userAttemptsWithAnswers}
            />


            <div className="grid grid-cols-2 gap-8">
                <PassageDisplay
                    title={currentPassage.title}
                    text={currentPassage.text}
                    answer_key_range={currentPassage.answer_key_range}
                    task_part={currentPassage.task_part}
                />

                <div className="max-h-[100vh] bg-background/80 rounded-3xl border shadow-sm">
                    <ScrollArea className="h-full px-4 py-6">
                        <div className="flex flex-col gap-6">
                            {currentQuestions.map((questionRaw: any, index: number) => (
                                <QuestionRenderer
                                    // trick: this forces the AnswerInput.tsx to read the updated setReviewMode which is deep nested
                                    key={`${forceRender}-${index}`}
                                    questionRaw={questionRaw}
                                    index={index}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

        </div>
    )
}