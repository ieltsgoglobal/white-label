"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AnswerInput from "../additional-ui/AnswerInput"

export interface MatchingSentenceStart {
    id: number
    text: string
    selectedAnswer?: string
}

// Possible sentence ending option
export interface MatchingSentenceEndingOption {
    letter: string
    text: string
}

// Main structure for the entire matching-sentence-endings question
export interface MatchingSentenceEndingsQuestion {
    questionType: "matching-sentence-endings"
    question: {
        starting: MatchingSentenceStart[]
        endings: MatchingSentenceEndingOption[]
    }
}


export default function MatchSentenceEndings(props: MatchingSentenceEndingsQuestion) {
    const matchingEndingsQuestion = props

    const [questions, setQuestions] = useState(
        matchingEndingsQuestion.question.starting.map((q) => ({
            ...q,
            selectedAnswer: "",
        }))
    )


    const handleAnswerChange = (questionId: number, value: string) => {
        // Only allow single letters A-G (case insensitive)
        const upperValue = value.toUpperCase()
        const validLetters = ["A", "B", "C", "D", "E", "F", "G"]
        const filteredValue =
            upperValue.length > 0 && validLetters.includes(upperValue.charAt(upperValue.length - 1))
                ? upperValue.charAt(upperValue.length - 1)
                : ""

    }

    return (
        <div className="bg-background rounded-3xl border border-border p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                    Questions {Math.min(...questions.map(q => q.id))} - {Math.max(...questions.map(q => q.id))}
                </h2>
                <p className="text-sm font-medium text-blue-900">
                    Complete each sentence with the correct ending, <span className="font-bold">A - G</span>, below. Write the
                    correct letter, <span className="font-bold">A - G</span>, in boxes 32 - 36.
                </p>
            </div>

            <div className="space-y-8">
                {/* Questions Section */}
                <div className="space-y-6">
                    {questions.map((question) => (
                        <div key={question.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                    <span className="font-bold mr-2">{question.id}</span>
                                    {question.text}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <AnswerInput
                                    questionNumber={question.id}
                                    className={`w-12 h-12 text-center text-lg font-semibold border-2 border-border rounded`}
                                    maxLength={1}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Answer Options Section */}
                <Card className="border-2 border-border">
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            {matchingEndingsQuestion.question.endings.map((option: MatchingSentenceEndingOption) => (
                                <div key={option.letter} className="flex items-start gap-3">
                                    <span className="font-bold text-lg min-w-[24px]">{option.letter}</span>
                                    <p className="text-base leading-relaxed">{option.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
