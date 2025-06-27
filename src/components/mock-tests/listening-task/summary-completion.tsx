"use client"

import { Input } from "@/components/ui/input"

interface SummaryQuestion {
    questionType: "summary-completion"
    question: {
        id: number[]
        title: string
        passageTemplate: string
    }
}

export default function SummaryCompletion(props: SummaryQuestion) {
    const summaryQuestion: SummaryQuestion = props

    const handleAnswerChange = (id: number, value: string) => {
        const singleWord = value.trim().split(" ")[0]
        console.log(`Q${id}: ${singleWord}`)
    }

    const renderPassage = () => {
        const parts = summaryQuestion.question.passageTemplate.split(/(<\d+>)/g)

        return parts.map((part, index) => {
            const match = part.match(/^<(\d+)>$/)
            if (match) {
                const id = parseInt(match[1])
                return (
                    <span key={index} className="inline-flex items-center mx-1">
                        <span className="font-bold mr-2">{id}</span>
                        <Input
                            onChange={(e) => handleAnswerChange(id, e.target.value)}
                            className="w-32 text-center font-medium"
                            placeholder="____"
                        />
                    </span>
                )
            }
            return <span key={index}>{part}</span>
        })
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions {summaryQuestion.question.id[0]} - {summaryQuestion.question.id.at(-1)}
                </h2>
                <p className="text-sm font-medium text-blue-900">
                    Complete the summary below. Write NO MORE THAN ONE WORD from the text in each box.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-center mb-6">
                        {summaryQuestion.question.title}
                    </h3>
                    <p className="text-base leading-relaxed space-y-4">{renderPassage()}</p>
                </div>
            </div>
        </div>
    )
}