"use client"

import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"
interface Question {
    id: number
    sentence: string
}

interface SentenceCompletionSection {
    questionType: "sentence-completion"
    questions: Question[]
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
        <div className="w-full bg-background rounded-3xl border border-border p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    Complete the sentences. Write <span className="font-bold">NO MORE THAN THREE WORDS</span> from the text in each box.
                </p>
            </div>

            <div className="space-y-8">
                {section.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <span className="font-bold text-lg text-foreground mt-1 min-w-[32px]">{question.id}</span>
                            <div className="flex-1">{renderSentenceWithInput(question)}</div>
                        </div>

                        {index < section.questions.length - 1 && (
                            <div className="border-b border-border mt-6" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}