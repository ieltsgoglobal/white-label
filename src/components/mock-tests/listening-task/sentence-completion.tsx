"use client"

import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
interface Question {
    id: number
    sentence: string
}

interface SentenceCompletionSection {
    questionType: "sentence-completion"
    questions: Question[]
    oneWord?: boolean
}

// ✅ Use an object to wrap metadata and questions
export default function SentenceCompletion(props: SentenceCompletionSection) {
    const section: SentenceCompletionSection = props

    const handleAnswerChange = (questionId: number, answer: string) => {

    }

    const renderSentenceWithInput = (question: Question) => {
        // Split sentence on the placeholder (xx) _____
        const parts = question.sentence.split(/\(\d+\) _____/)

        return (
            <div className="text-foreground leading-relaxed font-medium items-center">
                <span>{parts[0]}</span>
                <AnswerInput
                    questionNumber={question.id}
                    className="inline-block w-40 h-9 mx-2 border-2 border-blue-300 dark:border-muted focus:border-blue-500 dark:focus:border-muted rounded-md px-3"
                />
                <span>{parts[1]}</span>
            </div>
        )
    }

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
                </CardTitle>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                    Complete the sentences. Write <span className="font-bold">NO MORE THAN {section.oneWord ? `ONE WORD` : `THREE WORDS`}</span> from the text in each box.
                </p>
            </CardHeader>

            <CardContent className="space-y-8">
                {section.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <span className="font-bold text-foreground mt-1 min-w-[32px]">{question.id}</span>
                            <div className="flex-1">{renderSentenceWithInput(question)}</div>
                        </div>

                        {index < section.questions.length - 1 && (
                            <div className="border-b border-border mt-6" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}