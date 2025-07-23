"use client"

import { useEffect, useState } from "react"
import WritingQuestionDisplay from "./writingQuestionDisplay"
import WritingPagination from "./writing-paginaiton"
import NavigationBar from "../additional-ui/navigation-bar"
import EvalutaingTaskLoaderModal from "@/components/loaders/mock-tests/writing/evaluating-task-modal"
import { evaluateWriting } from "@/lib/mock-tests/writing/evaluateWriting"
import { getReviewMode } from "@/lib/mock-tests/indexedDb"
import WritingReviewTaskNavigation from "../additional-ui/review-components/writing/WritingReviewTaskNavigation"

export interface WritingTask {
    id: number
    timeLimit: string
    wordLimit: string
    prompt: string[]
    image_url?: string
}

export default function WritingMain({ test_id, onNext }: { test_id: string, onNext: () => void }) {
    const [activeTab, setActiveTab] = useState<1 | 2>(1)
    const [responses, setResponses] = useState<{ [key: number]: string }>({
        1: "",
        2: ""
    })
    const [evaluatingResponse, setEvaluatingResponse] = useState(false) // loader

    // current response (to display user answer for ongoing question)
    const response = responses[activeTab]
    const setResponse = (val: string) => {
        setResponses((prev) => ({ ...prev, [activeTab]: val }))
    }

    // store writing questions here
    const [writingQuestions, setWritingQuestions] = useState<WritingTask[]>([])
    const currentQuestion = writingQuestions[activeTab - 1]

    // checks if ReviewMode is on through indexedDb
    const [isReviewMode, setIsReviewMode] = useState(false)

    // gets value of IsReviewMode ON from indexedDB
    useEffect(() => {
        getReviewMode().then((value) => {
            setIsReviewMode(value)
        })
    }, [])


    // load question from .ts file
    useEffect(() => {
        const loadTestData = async () => {
            try {
                const testDataModule = await import(`@/app/data/tests/test-${test_id}`)
                const { writingTasks } = testDataModule.default || testDataModule
                setWritingQuestions(writingTasks)
                console.log(writingTasks)
            } catch (error) {
                console.error("Failed to load test data:", error)
            }
        }

        loadTestData()
    }, [test_id])


    // after submitTask goto next section (speaking)
    const handleSubmit = async () => {
        setEvaluatingResponse(true)

        // evaluate both tasks and store user attempt and evalution result in localStorage
        await evaluateWriting(writingQuestions, responses)

        setEvaluatingResponse(false)
        onNext()
    }

    if (!currentQuestion) return (<>Loading...</>)

    return (
        <div>
            {/* loader model while evaluating answers */}
            <EvalutaingTaskLoaderModal visible={evaluatingResponse} />

            {/* 30 MIN TIMER */}
            {!isReviewMode && <NavigationBar onSubmit={handleSubmit} />}

            {isReviewMode && <WritingReviewTaskNavigation onSelect={setActiveTab} />}

            <div className="mt-16">
                {/* question type_2 just have extra image_url */}
                <WritingQuestionDisplay
                    activeTab={activeTab}
                    currentQuestion={currentQuestion}
                    response={response}
                    setResponse={setResponse}
                />

                {!isReviewMode &&
                    <WritingPagination
                        activeTab={activeTab}
                        totalTabs={writingQuestions.length}
                        setActiveTab={setActiveTab}
                    />
                }
            </div>
        </div>
    )
}
