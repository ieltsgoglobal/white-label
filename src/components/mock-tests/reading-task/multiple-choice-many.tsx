"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface AnswerOption {
    letter: string
    text: string
}

interface QuestionGroup {
    id: number[]
    question: string
    options: AnswerOption[]
}

interface Section {
    questionType: "multiple-choice-many"
    questions: QuestionGroup[]
}

export default function MultipleChoiceMany(props: Section) {
    const [section, setSection] = useState<Section>(props)

    const handleOptionToggle = (groupIndex: number, letter: string) => {

    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions {section.questions[0].id[0]} - {section.questions.at(-1)?.id.at(-1)}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Choose <span className="font-bold">TWO</span> correct answers.
                </p>
            </div>

            <div className="space-y-8">
                {section.questions.map((group, groupIndex) => (
                    <div key={group.id.join("-")} className="space-y-4">
                        {/* Question */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-base font-medium">
                                <span className="font-bold mr-2">{group.id.join(", ")}</span>
                                {group.question}
                            </p>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3 ml-4">
                            {group.options.map((option) => (
                                <div
                                    key={option.letter}
                                    className="p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                                    onClick={() => handleOptionToggle(groupIndex, option.letter)}
                                >
                                    <div className="flex items-start gap-4">
                                        <Checkbox
                                            onChange={() => handleOptionToggle(groupIndex, option.letter)}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3">
                                                <span className="font-bold text-lg min-w-[24px]">{option.letter}</span>
                                                <p className="text-base leading-relaxed">{option.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}