"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import AnswerInput from "../additional-ui/AnswerInput"

interface OneWordQuestion {
    id: number
    sentence: string
}

interface OneWordSection {
    type: "short-answer"
    topic?: string
    instructions?: string
    questions: OneWordQuestion[]
}


export default function ShortAnswer(props: OneWordSection) {
    const [oneWordQuestions, setOneWordQuestions] = useState<OneWordSection>(props)

    const renderSentenceWithBlank = (question: OneWordQuestion) => {
        const id = question.id
        const parts = question.sentence.split(`(${id}) _______`)

        return (
            <div className="flex items-center gap-2 text-sm leading-relaxed flex-wrap">
                <span>{parts[0]}</span>
                <AnswerInput
                    questionNumber={id}
                    className="w-24 h-8 text-xs border-b-2 border-t-1 border-l-1 border-r-1 rounded-lg bg-transparent focus:bg-background px-2 text-center"
                />
                <span>{parts[1] || ""}</span>
            </div>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Questions {oneWordQuestions.questions[0].id} - {oneWordQuestions.questions[oneWordQuestions.questions.length - 1].id}</CardTitle>
                {/* if reading instruction are there then use it or else use default listening instructions */}
                {/* need to do this as we are using short-answer component for reading and listening but they have diffrent instructions  */}
                <p className="text-sm text-muted-foreground font-medium">
                    {oneWordQuestions.instructions ? `${oneWordQuestions.instructions}` : "Complete the sentences below. Write ONE WORD ONLY in each box."}
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Topic Header */}
                    {oneWordQuestions.topic &&
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-semibold text-lg">{oneWordQuestions.topic}</h3>
                        </div>
                    }

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
                    {/* default instruction are for listening questions but if we change instruction for reading questions then below code doesnt make sense w.r.t new instructions */}
                    {!oneWordQuestions.instructions &&
                        <div className="mt-6 p-4 bg-yellow-50 dark:bg-black border border-yellow-200 dark:border-white/20 rounded-lg">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <p className="text-sm font-medium text-yellow-800">
                                    Remember: Write <strong>ONE WORD ONLY</strong> in each box. No numbers or multiple words allowed.
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </CardContent>
        </Card>
    )
}
