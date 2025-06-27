"use client"

import { Input } from "@/components/ui/input"

interface FlowChartQuestion {
    questionType: "flow-chart-completion"
    question: {
        image_url: string
        id: number[]
    }
}

export default function FlowChartCompletion(props: FlowChartQuestion) {
    const question: FlowChartQuestion = props

    const handleAnswerChange = (id: number, value: string) => {
        const cleanValue = value.trim().split(" ")[0] // Ensures only one word/number
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Questions {question.question.id[0]} - {question.question.id.at(-1)}
                </h2>
                <p className="text-sm font-medium text-blue-900">
                    Complete the flow-chart. Write <span className="font-bold">NO MORE THAN ONE WORD OR NUMBER</span> from the
                    text for each answer. Write your answers in boxes 16 - 20 below.
                </p>
            </div>

            <div className="space-y-6">
                {/* Flow Chart Image */}
                <img
                    src={question.question.image_url}
                    alt="Flowchart"
                    width={800}
                    height={600}
                    className="border rounded-xl"
                />

                {/* Answer Inputs */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <h3 className="text-lg font-bold mb-4">Your Answers</h3>
                    <div className="space-y-4">
                        {question.question.id.map((id) => (
                            <div key={id} className="flex items-center gap-4">
                                <label className="text-base font-medium text-gray-700 w-8">{id}</label>
                                <Input
                                    onChange={(e) => handleAnswerChange(id, e.target.value)}
                                    className="w-64 h-12 text-base border-gray-300"
                                    placeholder=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}