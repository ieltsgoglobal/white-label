// components/AnswerInput.tsx
"use client"

import { Input } from "@/components/ui/input"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mockAnswersStorage"
import { loadCurrentMockSection } from "@/lib/indexedDb"
import { useEffect, useState } from "react"
import clsx from "clsx"

interface AnswerInputProps {
    questionNumber: number
    className: string
    maxLength?: number
    placeholder?: string
}

export default function AnswerInput({ className, questionNumber, maxLength, placeholder }: AnswerInputProps) {
    const [section, setSection] = useState<"listening" | "reading" | null>(null)
    const [value, setValue] = useState("")

    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (value === "listening" || value === "reading") {
                setSection(value)
            }
        })
    }, [])

    // When section or questionNumber changes, fetch stored answer
    useEffect(() => {
        if (section) {
            const stored = getFieldAnswer(section, questionNumber)
            setValue(stored || "")
        }
    }, [section, questionNumber])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value
        setValue(newVal)

        if (section) {
            updateMockAnswer(section, questionNumber, newVal)
        }
    }

    if (!section) return null // or a loading spinner


    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={clsx(className)}
            maxLength={maxLength}
        />
    )
}