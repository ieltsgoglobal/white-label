"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface FormQuestion {
    type: "form-completion"
    formData: {
        title: string
        address: string
        sections: Array<{
            title?: string
            fields: Array<{
                label: string
                content: string
                hasBlank: boolean
                id: number
            }>
        }>
    }
}


export default function FormCompletion(props: FormQuestion) {
    const [formQuestion, setFormQuestion] = useState<FormQuestion>(props)

    const handleFormAnswerChange = (id: number, answer: string) => {

    }

    // add blank for content
    const renderFormField = (field: any) => {
        if (!field.id) {
            return <span className="text-sm">{field.content}</span>
        }

        // Handle other fields with single blanks
        if (field.id) {
            const parts = field.content.split(`(${field.id}) _______`)
            return (
                <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span>{parts[0]}</span>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-blue-600">({field.id})</span>
                        <Input
                            placeholder=""
                            onChange={(e) => handleFormAnswerChange(field.id, e.target.value)}
                            className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1"
                        />
                    </div>
                    <span>{parts[1] || ""}</span>
                </div>
            )
        }

        return <span className="text-sm">{field.content}</span>
    }

    // add blank for labels
    const renderTextWithBlank = (text: string, id: number) => {
        const parts = text.split(`(${id}) ________`)
        if (parts.length === 2) {
            return (
                <>
                    <span>{parts[0]}</span>
                    <div className="inline-flex items-center gap-1">
                        <span className="font-semibold text-blue-600">({id})</span>
                        <Input
                            placeholder=""
                            onChange={(e) => handleFormAnswerChange(id, e.target.value)}
                            className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1"
                        />
                    </div>
                    <span>{parts[1]}</span>
                </>
            )
        }

        return <>{text}</>
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {(() => {
                        const allIds = formQuestion.formData.sections.flatMap(section =>
                            section.fields.map(field => field.id)
                        )
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
                    <div className="border-2 border-gray-400 p-6 bg-white">
                        {/* Form Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold mb-2">{formQuestion.formData.title}</h2>
                            <p className="text-sm text-gray-600">{formQuestion.formData.address}</p>
                        </div>

                        {/* Form Sections */}
                        {formQuestion.formData.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="w-full space-y-4">
                                {section.title && <h3 className="text-lg font-semibold mb-4">{section.title}</h3>}

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
