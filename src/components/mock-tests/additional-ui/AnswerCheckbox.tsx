"use client"

import { loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"


interface AnswerCheckboxProps {
    questionKey: number[] //eg [11,12]
    options: string[]
    optionLetters: string[]
    maxSelectable: number
}

export default function AnswerCheckbox({ questionKey, options, optionLetters, maxSelectable }: AnswerCheckboxProps) {
    const [section, setSection] = useState<"listening" | "reading" | null>(null)
    const [selected, setSelected] = useState<string[]>([])

    // check section
    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (value === "listening" || value === "reading") {
                setSection(value)
            }
        })
    }, [])


    //get particular answer, in this case all questionKeys
    useEffect(() => {
        if (!section) return

        const collected: string[] = []

        questionKey.forEach((id) => {
            const stored = getFieldAnswer(section, id)
            if (stored) {
                collected.push(stored.trim())
            }
        })

        setSelected(collected.filter(Boolean).sort())
    }, [section, questionKey])


    // update localstorage on answer change
    const handleCheckboxChange = (letter: string, checked: boolean) => {
        let updated: string[]

        if (checked) {
            if (selected.length >= maxSelectable) return // prevent over-selecting
            updated = [...selected, letter]
        } else {
            updated = selected.filter((l) => l !== letter)
        }

        updated = updated.sort()
        setSelected(updated)
        console.log(updated)

        // match updated with localstorage questionKeys
        if (section) {
            questionKey.forEach((id, index) => {
                updateMockAnswer(section, id, updated[index] || "")
            })
        }
    }

    return (
        <div className="ml-8 space-y-3">
            {options.map((optionText, idx) => {
                const letter = optionLetters[idx]
                const inputId = `q${questionKey}-${letter}`

                return (
                    <div key={letter} className="flex items-start space-x-3">
                        <Checkbox
                            id={inputId}
                            checked={selected.includes(letter)}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange(letter, !!checked)
                            }
                        />
                        <Label
                            htmlFor={inputId}
                            className="text-sm leading-relaxed cursor-pointer flex-1"
                        >
                            <span className="font-semibold mr-2">{letter}</span>
                            {optionText}
                        </Label>
                    </div>
                )
            })}
        </div>
    )
}