"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"

interface FlowChartSection {
    questionType: "flow-chart-completion"
    question: {
        image_url: string
        id: number[]
    }
}

export default function FlowChartCompletion(props: FlowChartSection) {
    const { image_url, id } = props.question // 🔥 FIX: correct destructure


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Questions {id[0]} - {id[id.length - 1]}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                    Complete the flow chart. Write NO MORE THAN THREE WORDS for each answer.
                </p>
            </CardHeader>
            <CardContent>
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
                <div className="flex flex-wrap gap-8">
                    {/* Flow Chart Image */}
                    <div className="border-2 border-gray-300 p-4 bg-white">
                        <img
                            src={image_url}
                            alt="Flowchart"
                            className="w-full h-auto max-w-full"
                        />
                    </div>

                    {/* Answer Inputs */}
                    <div className="space-y-4">
                        {id.map((qid) => (
                            <div key={qid} className="flex items-center gap-4 p-3 border rounded-lg">
                                <span className="font-semibold text-blue-600 min-w-[2rem]">{qid}</span>
                                <AnswerInput
                                    placeholder="Answer"
                                    questionNumber={qid}
                                    className="flex-1 text-sm font-medium"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}