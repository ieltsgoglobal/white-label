"use client"

import WritingQuestionDisplay from "@/components/mock-tests/writing-task/writingQuestionDisplay";
import { useEffect, useRef, useState } from "react"
import QuizStatusCard from "../../_components/QuizStatusCard";
import { evaluateWriting } from "@/lib/mock-tests/writing/evaluateWriting";
import EvalutaingTaskLoaderModal from "@/components/loaders/mock-tests/writing/evaluating-task-modal";
import { formatPracticeWritingQuestions } from "../_utils/formatPracticeWritingQuestions";
import { submitWritingAnswers } from "@/lib/postgress-aws/fetcher/practice-sets/user-submissions";
import { setReviewMode } from "@/lib/mock-tests/indexedDb";
import { buildUserResponsesWithScores } from "../_utils/misc";

interface WritingQuestion {
    id: number
    timeLimit: string
    wordLimit: string
    prompt: string[]
    image_url?: string
}

const TOTAL_WRITING_TASKS = 2

export default function WritingUI({ writingQuestions, sampleAnswers, writingQuestionsTask1ImageUrl }: { writingQuestions: any, sampleAnswers: any, writingQuestionsTask1ImageUrl: string }) {

    // ------------------- MISC ------------------------

    // turn OFF isReviewMode on load
    useEffect(() => {
        setReviewMode(false)
    }, [])


    // ------------------- FORMAT QUESTIONS ------------------------
    const [currentIndex, setCurrentIndex] = useState(0);

    const formattedQuestions = formatPracticeWritingQuestions(writingQuestions, writingQuestionsTask1ImageUrl)
    const currentFormattedQuestion = formattedQuestions[currentIndex];


    // ------------------- USER RESPONSES ---------------------------

    const [responses, setResponses] = useState<{ [key: number]: string }>({
        1: "",
        2: ""
    })

    // current response (to display user answer for ongoing question)
    const response = responses[currentIndex + 1];
    const setResponse = (val: string) => {
        setResponses((prev) => ({ ...prev, [currentIndex + 1]: val }));
    };


    // ------------------- STORE RESULTS (ONE OBJECT) -------------------

    const userWritingResults = useRef<{
        task1Score: number | null;
        task2Score: number | null;
        overall: number | null;
    }>({
        task1Score: null,
        task2Score: null,
        overall: null,
    });



    // ------------------- SUBMITTING & EVALUATING -------------------

    const [evaluatingResponse, setEvaluatingResponse] = useState(false)

    const handleCheckResults = async () => {
        setEvaluatingResponse(true)

        const result = await evaluateWriting(
            formattedQuestions,
            responses,
            { returnResults: true, storeAnswersInLocalStorage: false }
        )

        console.log("Evaluated writing result:", result);

        if (result) {
            userWritingResults.current = {
                task1Score: result.task1Score,
                task2Score: result.task2Score,
                overall: result.overall ?? null,
            };
        }
        setEvaluatingResponse(false)

        setReviewMode(true)
    }

    const handleStoreUserResponseWithScore = async ({ startedAt, timeTaken, }: { startedAt: Date; timeTaken: number; }) => {

        const user_responses_with_scores = buildUserResponsesWithScores(
            responses,
            userWritingResults.current
        );

        try {
            const response = await submitWritingAnswers({
                testPath: "book_12/writing_test_1",
                user_responses_with_scores,
                startedAt: startedAt.toISOString(),
                metadata: { device: "browser", timeTaken: timeTaken },
            });

            console.log("✅ Writing responses submission stored:", response);

        } catch (err) {
            console.error("❌ Error submitting writing responses:", err);
        }
    }

    return (
        <div className="p-4 space-y-4">

            {/* loader model while evaluating answers */}
            <EvalutaingTaskLoaderModal visible={evaluatingResponse} />

            <QuizStatusCard
                NextSet={() => {
                    if (currentIndex < TOTAL_WRITING_TASKS) {
                        setCurrentIndex((prev) => prev + 1);
                    }
                }}
                PrevSet={() => {
                    if (currentIndex > 0) {
                        setCurrentIndex((prev) => prev - 1);
                    }
                }}
                currentIndex={currentIndex}
                CheckResulsts={async ({ startedAt, timeTaken }) => {
                    await handleCheckResults();
                    await handleStoreUserResponseWithScore({ startedAt, timeTaken });
                }}
                MAX_INDEX={TOTAL_WRITING_TASKS}
                overallWritingScore={userWritingResults.current.overall}
            />

            <WritingQuestionDisplay
                activeTab={(currentIndex + 1) as 1 | 2}
                currentQuestion={currentFormattedQuestion}
                response={response}
                setResponse={setResponse}
            />

        </div>
    );
}