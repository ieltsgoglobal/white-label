"use client"

import { getMockAnswers } from "@/lib/mock-tests/mockAnswersStorage"
import { useEffect, useState } from "react"

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingPagination({ speakingData }: { speakingData: SpeakingPart[] }) {

    const parts = speakingData.map((part) => ({
        name: `Part ${part.part}`,
        numbers: part.questions.map((q) => q.id),
    }))


    // 🔄 Forces re-render when a new answer is stored in localStorage
    // Listens for the custom 'update-pagination' event dispatched from updateMockAnswer()
    // This allows pagination UI to reflect updated attempt states (e.g., highlight attempted questions)
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const handleUpdate = () => {
            setVersion((prev) => prev + 1) // triggers re-render
        }

        window.addEventListener("update-pagination", handleUpdate)
        return () => window.removeEventListener("update-pagination", handleUpdate)
    }, [])

    const renderNagivationButton = (number: number) => {
        const data = getMockAnswers()
        const spokenIds = data?.speaking?.map((item) => item.questionId) ?? []
        const isAnswered = spokenIds.includes(number)

        return (
            <button
                key={number}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 border 
                    ${isAnswered
                        ? "bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/60"
                    }`}
            >
                {number}
            </button>
        )
    }


    if (!speakingData || speakingData.length === 0) return null

    return (
        <div className="fixed w-full bottom-0 bg-background border-t border-border p-4 md:p-6">
            <div className="mx-auto w-full overflow-x-auto ">
                <div className="flex items-center justify-start gap-4 md:gap-4">
                    {parts.map((part, partIndex) => (
                        <div key={part.name} className="flex items-center gap-1 md:gap-2">
                            <span className="text-sm font-semibold text-muted-foreground min-w-[50px]">{part.name}</span>
                            {part.numbers.map((number) => {
                                return renderNagivationButton(number)
                            })}
                            {partIndex < parts.length - 1 && <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}