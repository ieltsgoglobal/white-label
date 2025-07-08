"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import AnswerCheckbox from "../additional-ui/AnswerCheckbox"

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
                    Choose {props.questions[0].id.length} letters from between A - {String.fromCharCode(65 + (props.questions[0].options.length - 1))}.
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

                                <AnswerCheckbox
                                    questionKey={question.id}  // eg., [11,12]
                                    options={question.options}
                                    optionLetters={optionLetters}
                                    maxSelectable={props.questions[0].id.length}
                                />


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
