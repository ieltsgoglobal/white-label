"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"

export interface MatchingFeatureStatement {
    id?: number
    text: string
    selectedFeature?: string
}

export interface MatchingFeatureOption {
    letter: string
    description: string
}

export interface MatchingFeaturesQuestion {
    questionType: "matching"
    question: {
        question_statement?: string
        statements_title?: string,
        statements: MatchingFeatureStatement[]
        features_title?: string,
        features: MatchingFeatureOption[]
    }
}

export default function Matching(props: MatchingFeaturesQuestion) {
    const { statements, features, question_statement, statements_title, features_title } = props.question

    const [questions, setQuestions] = useState(() =>
        props.question?.statements?.map(s => ({ ...s, selectedFeature: "" })) || []
    )

    const handleAnswerChange = (id: number, value: string) => {
        const upper = value.toUpperCase()
        const allowed = features.map(f => f.letter)
        const clean = upper.length && allowed.includes(upper.charAt(upper.length - 1))
            ? upper.charAt(upper.length - 1)
            : ""
    }

    return (
        <div className="w-full bg-background rounded-3xl border border-border p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                    Questions {statements[0].id} - {statements[statements.length - 1].id}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                    Choose {statements.length} answers from the box and write correct letters <span className="font-bold">A – {features[features.length - 1].letter}</span> next to questions <span className="font-bold">{statements[0].id}-{statements[statements.length - 1].id}</span>.
                </p>
                {question_statement && <div className="mt-4 text-base text-foreground">{question_statement}</div>}
            </div>

            <div className="space-y-8">
                {/* Questions */}
                <div>
                    {statements_title && <h3 className="text-lg font-semibold text-foreground mb-3">{statements_title}</h3>}
                    <div className="space-y-6">
                        {questions.map((q) => (
                            <div key={q.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                <div className="flex-1">
                                    <p className="text-base leading-relaxed">
                                        {q.id !== undefined && <span className="font-bold mr-2">{q.id}</span>}
                                        {q.text}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {q.id !== undefined && (
                                        <AnswerInput
                                            questionNumber={q.id}
                                            className="w-12 h-12 text-center text-lg font-semibold border-2 border-border rounded"
                                            maxLength={1}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Feature Options */}
                <div>
                    {features_title && <h3 className="text-lg font-semibold text-foreground mb-3">{features_title}</h3>}
                    <Card className="border-2 border-border">
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                {features.map((feature) => (
                                    <div key={feature.letter} className="flex items-start gap-3">
                                        <span className="font-bold text-lg min-w-[24px]">{feature.letter}</span>
                                        <p className="text-base leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}