"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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

    const handleAnswerChange = (id: number, answer: string) => {
        // handle logic here
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Questions {mcqQuestions.questions[0].id}–{mcqQuestions.questions[mcqQuestions.questions.length - 1].id}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                    Choose the correct letter, A, B or C.
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
                                <RadioGroup
                                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                                    className="space-y-3"
                                >
                                    {question.options.map((optionText, idx) => {
                                        const letter = optionLetters[idx]
                                        const inputId = `q${question.id}-${letter}`

                                        return (
                                            <div key={letter} className="flex items-start space-x-3">
                                                <span className="font-semibold mr-2">{letter}</span>
                                                <RadioGroupItem value={letter} id={inputId} className="mt-0.5" />
                                                <Label
                                                    htmlFor={inputId}
                                                    className="text-sm leading-relaxed cursor-pointer flex-1"
                                                >
                                                    {optionText}
                                                </Label>
                                            </div>
                                        )
                                    })}
                                </RadioGroup>
                            </div>

                            {index < mcqQuestions.questions.length - 1 && <hr className="border-gray-200" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}