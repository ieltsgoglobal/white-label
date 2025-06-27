"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

interface OneWordQuestion {
    id: number
    sentence: string
}

interface OneWordSection {
    type: "short-answer"
    topic: string
    questions: OneWordQuestion[]
}


export default function ShortAnswer(props: OneWordSection) {
    const [oneWordQuestions, setOneWordQuestions] = useState<OneWordSection>(props)

    const handleAnswerChange = (id: number, answer: string) => {
        // Only allow single words (no spaces)
        const cleanAnswer = answer.trim().replace(/\s+/g, "")
    }

    const renderSentenceWithBlank = (question: OneWordQuestion) => {
        const id = question.id
        const parts = question.sentence.split(`(${id}) _______`)

        return (
            <div className="flex items-center gap-2 text-sm leading-relaxed flex-wrap">
                <span>{parts[0]}</span>
                <Input
                    placeholder=""
                    onChange={(e) => handleAnswerChange(id, e.target.value)}
                    className="w-24 h-8 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-2 text-center"
                />
                <span>{parts[1] || ""}</span>
            </div>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Questions 21 - 24</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Complete the sentences below. Write ONE WORD ONLY in each box.</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Topic Header */}
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-lg">{oneWordQuestions.topic}</h3>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                        {oneWordQuestions.questions.map((question) => (
                            <div key={question.id} className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <span className="font-semibold text-blue-600 min-w-[2rem] mt-1">{question.id}</span>
                                    <div className="flex-1">{renderSentenceWithBlank(question)}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Word Count Reminder */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <p className="text-sm font-medium text-yellow-800">
                                Remember: Write <strong>ONE WORD ONLY</strong> in each box. No numbers or multiple words allowed.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
