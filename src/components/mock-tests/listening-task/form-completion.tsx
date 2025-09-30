"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"

interface FormQuestion {
    type: "form-completion"
    formData: {
        title: string
        address?: string
        sections: Array<{
            title?: string
            fields: Array<{
                label: string
                content: string
                hasBlank?: boolean
                id: number | number[]
            }>
        }>
    }
}


export default function FormCompletion(props: FormQuestion) {
    const [formQuestion, setFormQuestion] = useState<FormQuestion>(props)

    // add blank for content
    const renderFormField = (field: any) => {
        if (!field.id) {
            return <span className="text-sm">{field.content}</span>
        }

        const lines = field.content.split("\n")

        // Handle other fields with single blanks and multiline content
        // Case 1: Single id
        if (typeof field.id === "number") {
            const id = field.id
            return (
                <div className="text-sm space-y-1">
                    {lines.map((line: string, index: number) => {
                        if (line.includes(`(${id})`)) {
                            const parts = line.split(`(${id}) _______`)
                            return (
                                <div key={index} className="flex items-center gap-2 flex-wrap">
                                    <span>{parts[0]}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-blue-600">({id})</span>
                                        <AnswerInput
                                            questionNumber={id}
                                            className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1"
                                        />
                                    </div>
                                    <span>{parts[1] || ""}</span>
                                </div>
                            )
                        }
                        return <div key={index}>{line}</div>
                    })}
                </div>
            )
        }

        // Case 2: Multiple ids
        if (Array.isArray(field.id)) {
            const ids: number[] = field.id
            return (
                <div className="text-sm space-y-1">
                    {lines.map((line: string, index: number) => {
                        let lineContent = line
                        let elements: (JSX.Element | string)[] = []

                        ids.forEach((id) => {
                            if (lineContent.includes(`(${id}) _______`)) {
                                const [before, after = ""] = lineContent.split(`(${id}) _______`)
                                elements.push(before)
                                elements.push(
                                    <span key={`input-${id}`} className="inline-flex items-center mx-1">
                                        <span className="font-semibold text-blue-600 mr-1">({id})</span>
                                        <AnswerInput
                                            questionNumber={id}
                                            className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1"
                                        />
                                    </span>
                                )
                                lineContent = after
                            }
                        })

                        elements.push(lineContent)

                        return (
                            <div key={index} className="flex flex-wrap items-center">
                                {elements}
                            </div>
                        )
                    })}
                </div>
            )
        }


        return <span className="text-sm">{field.content}</span>
    }

    // add blank for labels
    const renderTextWithBlank = (text: string, id: number | number[]) => {
        if (typeof id === "number") {
            const parts = text.split(`(${id}) ________`)
            if (parts.length === 2) {
                return (
                    <>
                        <span>{parts[0]}</span>
                        <div className="inline-flex items-center gap-1">
                            <span className="font-semibold text-blue-600">({id})</span>
                            <AnswerInput
                                questionNumber={id}
                                className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-background px-1"
                            />
                        </div>
                        <span>{parts[1]}</span>
                    </>
                )
            }
            return <>{text}</>
        }

        if (Array.isArray(id)) {
            let textContent = text
            let elements: (JSX.Element | string)[] = []

            id.forEach((num) => {
                if (textContent.includes(`(${num}) ________`)) {
                    const [before, after = ""] = textContent.split(`(${num}) ________`)
                    elements.push(before)
                    elements.push(
                        <span key={`label-${num}`} className="inline-flex items-center gap-1 mx-1">
                            <span className="font-semibold text-blue-600">({num})</span>
                            <AnswerInput
                                questionNumber={num}
                                className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-background px-1"
                            />
                        </span>
                    )
                    textContent = after
                }
            })

            elements.push(textContent)
            return <>{elements}</>
        }

        return <>{text}</>
    }
    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    {(() => {
                        const allIds = formQuestion.formData.sections
                            .flatMap(section => section.fields)
                            .map(field => field.id)
                            .filter((id): id is number => typeof id === "number");

                        const minId = Math.min(...allIds)
                        const maxId = Math.max(...allIds)
                        return minId === maxId ? `Question ${minId}` : `Questions ${minId}–${maxId}`
                    })()}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.</p>
            </CardHeader>
            <CardContent>
                <div className="max-w-4xl mx-auto">
                    {/* Form Container */}
                    <div className="border-2 border-border p-6 bg-background rounded-3xl">
                        {/* Form Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold mb-2">{formQuestion.formData.title}</h2>
                            {formQuestion.formData.address && <p className="text-sm text-muted">{formQuestion.formData.address}</p>}
                        </div>

                        {/* Form Sections */}
                        {formQuestion.formData.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="w-full space-y-4">
                                {section.title && <h3 className="text-lg font-semibold mb-4 mt-8">{section.title}</h3>}

                                {section.fields.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="flex justify-end gap-10 py-2">
                                        <div className="font-medium text-sm min-w-[120px] w-[30%] pt-1">
                                            {renderTextWithBlank(field.label, field.id)}
                                        </div>
                                        <div className="flex-1 w-[70%]">{renderFormField(field)}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
