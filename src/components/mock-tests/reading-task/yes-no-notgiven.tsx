"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
    id: number
    statement: string
}

interface YesNoNotGivenSection {
    questionType: "yes-no-notgiven"
    questions: Question[]
}

const options = [
    { value: "YES", label: "YES" },
    { value: "NO", label: "NO" },
    { value: "NOT GIVEN", label: "NOT GIVEN" }
]

export default function YesNoNotGiven(props: YesNoNotGivenSection) {
    const section: YesNoNotGivenSection = props
    console.log(props)
    const handleAnswerChange = (questionId: number, answer: string) => {
        // track answers if needed
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Do the following statements agree with the views given in the text? Choose <span className="font-bold">YES</span> if the statement agrees with the views, <span className="font-bold">NO</span> if it contradicts them, or <span className="font-bold">NOT GIVEN</span> if it is impossible to say what the writer thinks.
                </p>
            </div>

            <div className="space-y-8">
                {section.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <span className="font-bold text-lg text-gray-900 mt-1 min-w-[32px]">{question.id}</span>
                            <p className="text-gray-800 leading-relaxed font-medium">{question.statement}</p>
                        </div>

                        <div className="ml-11">
                            <RadioGroup
                                onValueChange={(value) => handleAnswerChange(question.id, value)}
                                className="space-y-3"
                            >
                                {options.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-3 group">
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`q${question.id}-${option.value}`}
                                            className="border-gray-300 text-black"
                                        />
                                        <Label
                                            htmlFor={`q${question.id}-${option.value}`}
                                            className="text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors font-medium"
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {index < section.questions.length - 1 && <div className="border-b border-gray-100 mt-6"></div>}
                    </div>
                ))}
            </div>
        </div>
    )
}