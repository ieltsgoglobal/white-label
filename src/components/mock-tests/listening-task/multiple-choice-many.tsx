"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MultipleChoiceManyQuestion {
    id: number[]
    instructions?: string
    question: string
    options: string[]
}

interface MultipleChoiceManySection {
    questionType: "multiple-choice-many"
    questions: MultipleChoiceManyQuestion[]
}

const optionLetters = ["A", "B", "C", "D", "E", "F", "G"]

export default function MultipleChoiceMany(props: MultipleChoiceManySection) {

    const handleCheckboxChange = (questionKey: string, value: string, checked: boolean) => {

    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Questions {props.questions[0].id[0]}–{props.questions[props.questions.length - 1].id[props.questions[props.questions.length - 1].id.length - 1]}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                    Choose TWO letters, A–E.
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {props.questions.map((question, index) => {
                        const questionKey = question.id.join("-") // key like "11-12"

                        return (
                            <div key={questionKey} className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="font-semibold text-blue-600 min-w-[2rem]">
                                        {question.id.join(", ")}.
                                    </span>
                                    <p className="text-sm font-medium leading-relaxed">
                                        {question.question}
                                    </p>
                                </div>

                                <div className="ml-8 space-y-3">
                                    {question.options.map((optionText, idx) => {
                                        const letter = optionLetters[idx]
                                        const inputId = `q${questionKey}-${letter}`

                                        return (
                                            <div key={letter} className="flex items-start space-x-3">
                                                <Checkbox
                                                    id={inputId}
                                                    onCheckedChange={(checked) =>
                                                        handleCheckboxChange(questionKey, letter, Boolean(checked))
                                                    }
                                                />
                                                <Label
                                                    htmlFor={inputId}
                                                    className="text-sm leading-relaxed cursor-pointer flex-1"
                                                >
                                                    <span className="font-semibold mr-2">{letter}</span>
                                                    {optionText}
                                                </Label>
                                            </div>
                                        )
                                    })}
                                </div>

                                {index < props.questions.length - 1 && (
                                    <hr className="border-gray-200" />
                                )}
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
