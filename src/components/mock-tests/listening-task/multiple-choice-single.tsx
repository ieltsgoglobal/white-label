"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import AnswerRadio from "../additional-ui/AnswerRadio"

interface MCQQuestion {
    id: number
    question: string
    options: string[]
}

interface MCQSection {
    type: "multiple-choice-single"
    questions: MCQQuestion[]
}

const optionLetters = ["A", "B", "C", "D", "E"]

export default function MultipleChoiceSingle(props: MCQSection) {
    const [mcqQuestions, setMcqQuestions] = useState<MCQSection>(props)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Questions {mcqQuestions.questions[0].id}–{mcqQuestions.questions[mcqQuestions.questions.length - 1].id}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                    Choose the correct letter between A - {String.fromCharCode(65 + mcqQuestions.questions[0].options.length - 1)}
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {mcqQuestions.questions.map((question, index) => (
                        <div key={question.id} className="space-y-4">
                            <div className="flex gap-3">
                                <span className="font-semibold text-blue-600 min-w-[2rem]">{question.id}.</span>
                                <p className="text-sm font-medium leading-relaxed">{question.question}</p>
                            </div>

                            <div className="ml-8">
                                <AnswerRadio question={question} optionLetters={optionLetters} />
                            </div>

                            {index < mcqQuestions.questions.length - 1 && <hr className="border-gray-200" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}