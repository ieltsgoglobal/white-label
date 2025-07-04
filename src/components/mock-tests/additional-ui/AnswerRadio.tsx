"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { useEffect, useState } from "react"
import { loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"

interface QuestionProps {
    question: {
        id: number
        options: string[]
    }
    optionLetters: string[]
}

export default function AnswerRadio({ question, optionLetters }: QuestionProps) {
    const [section, setSection] = useState<"listening" | "reading" | null>(null)
    const [value, setValue] = useState("")

    const handleAnswerChange = (id: number, answer: string) => {
        setValue(answer) // ✅ update local UI state immediately
        if (section) {
            updateMockAnswer(section, id, answer)
        }
    }

    // When section or questionNumber changes, fetch stored answer
    useEffect(() => {
        if (section) {
            const stored = getFieldAnswer(section, question.id)
            setValue(stored || "")
        }
    }, [section, question.id])

    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (value === "listening" || value === "reading") {
                setSection(value)
            }
        })
    }, [])


    return (
        <RadioGroup
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
            value={value}
        >
            {question.options.map((optionText, idx) => {
                const letter = optionLetters[idx]
                const inputId = `q${question.id}-${letter}`

                return (
                    <div key={letter} className="flex items-start space-x-3">
                        <span className="font-semibold mr-2">{letter}</span>
                        <RadioGroupItem value={letter} id={inputId} className="mt-0.5" />
                        <Label
                            htmlFor={inputId}
                            className="text-sm leading-relaxed cursor-pointer flex-1"
                        >
                            {optionText}
                        </Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}