"use client"

import { useEffect, useState } from "react"
import WritingQuestionDisplay from "./writingQuestionDisplay"
import WritingPagination from "./writing-paginaiton"
import NavigationBar from "../additional-ui/navigation-bar"
import { updateWritingAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import EvalutaingTaskLoaderModal from "@/components/loaders/mock-tests/writing/evaluating-task-modal"

export interface WritingTask {
    id: number
    timeLimit: string
    wordLimit: string
    prompt: string[]
    image_url?: string
}

export default function WritingMain({ test_id, onNext }: { test_id: string, onNext: () => void }) {
    const [activeTab, setActiveTab] = useState(1)
    const [responses, setResponses] = useState<{ [key: number]: string }>({
        1: "",
        2: ""
    })
    const [evaluatingResponse, setEvaluatingResponse] = useState(false)

    // current response (to display user answer for ongoing question)
    const response = responses[activeTab]
    const setResponse = (val: string) => {
        setResponses((prev) => ({ ...prev, [activeTab]: val }))
    }

    const wordCount = response.trim() === "" ? 0 : response.trim().split(/\s+/).length
    const minimumWords = activeTab === 1 ? 150 : 250

    // store writing questions here
    const [writingQuestions, setWritingQuestions] = useState<WritingTask[]>([])
    const currentQuestion = writingQuestions[activeTab - 1]

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


    // get evaluation result and store it in localstorage
    const submitTask = async (questionId: number, response: string) => {
        try {
            const res = await fetch("/api/writing-evaluation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    taskType: questionId,
                    response,
                }),
            })

            const data = await res.json()
            updateWritingAnswer(questionId, response, data.result)
        } catch (err) {
            console.error(`Failed to evaluate task ${questionId}:`, err)
        }
    }

    // after submitTask goto next section (speaking)
    const handleSubmit = async () => {
        setEvaluatingResponse(true)
        // loop thorugh responses 1 and 2
        for (const q of writingQuestions) {
            const userResponse = responses[q.id]
            if (!userResponse.trim()) continue

            await submitTask(q.id, userResponse)
        }

        setEvaluatingResponse(false)
        onNext()
    }

    if (!currentQuestion) return (<>Loading...</>)

    return (
        <div>
            {/* loader model while evaluating answers */}
            <EvalutaingTaskLoaderModal visible={evaluatingResponse} />

            <NavigationBar onSubmit={handleSubmit} />
            <div className="mt-16">
                {/* question type_2 just have extra image_url */}
                <WritingQuestionDisplay
                    currentQuestion={currentQuestion}
                    response={response}
                    setResponse={setResponse}
                    wordCount={wordCount}
                    minimumWords={minimumWords}
                />

                <WritingPagination
                    activeTab={activeTab}
                    totalTabs={writingQuestions.length}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    )
}
