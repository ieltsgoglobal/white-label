"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"

export interface MatchingSentenceStart {
    id: number
    text: string
    selectedAnswer?: string
}

export interface MatchingSentenceEndingsQuestion {
    questionType: "match-paragraph-information",
    question: {
        information: MatchingSentenceStart[]
        letters: string[]
    }
}


export default function MatchSentenceEndings(props: MatchingSentenceEndingsQuestion) {
    const matchingEndingsQuestion = props

    const [questions, setQuestions] = useState(
        matchingEndingsQuestion.question.information.map((q) => ({
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
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions {Math.min(...questions.map(q => q.id))} - {Math.max(...questions.map(q => q.id))}
                </h2>
                <p className="text-sm font-medium text-blue-900">
                    The reading passage has {props.question.letters.length} paragraphs, {props.question.letters[0]}–{props.question.letters[props.question.letters.length - 1]}.{" "}
                    Which paragraph contains the following information? Write the correct letter, {props.question.letters[0]}–{props.question.letters[props.question.letters.length - 1]}{" "}
                    in boxes {Math.min(...props.question.information.map(q => q.id))}–{Math.max(...props.question.information.map(q => q.id))} on your screen.{" "}
                    You may use any letter more than once.
                </p>
            </div>

            <div className="space-y-8">
                {/* Questions Section */}
                <div className="space-y-6">
                    {questions.map((question) => (
                        <div key={question.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                    <span className="font-bold mr-2">{question.id}</span>
                                    {question.text}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <AnswerInput
                                    questionNumber={question.id}
                                    className={`w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded`}
                                    maxLength={1}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
