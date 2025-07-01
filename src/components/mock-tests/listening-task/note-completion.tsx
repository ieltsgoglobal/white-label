"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import AnswerInput from "../additional-ui/AnswerInput"

interface NoteBulletPoint {
    id: number
    text: string
}

interface NoteSection {
    title: string
    bulletPoints: NoteBulletPoint[]
}

interface NoteCompletionSection {
    type: "note-completion"
    topic: string
    sections: NoteSection[]
}



export default function NoteCompletion(props: NoteCompletionSection) {
    const [noteQuestions, setNoteQuestions] = useState<NoteCompletionSection>(props)


    const handleAnswerChange = (id: number, answer: string) => {
        // Allow up to two words
        const words = answer.trim().split(/\s+/)
        const cleanAnswer = words.slice(0, 2).join(" ")
    }

    const renderBulletPoint = (bulletPoint: NoteBulletPoint) => {
        // handle <<subpoint>>
        const isSubpoint = bulletPoint.text.trim().startsWith("<<subpoint>>")
        const cleanText = bulletPoint.text
            .replace("<<subpoint>>", "")
            .trim()

        if (!bulletPoint.id) {
            return (
                <span className={`text-sm ${isSubpoint ? "ml-6" : ""}`}>
                    {cleanText}
                </span>
            )
        }


        const id = bulletPoint.id!
        const parts = cleanText.split(`(${id}) _______`)

        return (
            <div className={`flex items-center gap-2 text-sm leading-relaxed flex-wrap ${isSubpoint ? "ml-6" : ""}`}>
                <span>{parts[0]}</span>
                <span className="font-semibold text-blue-600">{id}</span>
                <AnswerInput
                    questionNumber={id}
                    className="w-32 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-2"
                />
                <span>{parts[1] || ""}</span>
            </div>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Questions {noteQuestions.sections[0].bulletPoints[0].id} - {noteQuestions.sections[noteQuestions.sections.length - 1].bulletPoints[noteQuestions.sections[noteQuestions.sections.length - 1].bulletPoints.length - 1].id}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Topic Header */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{noteQuestions.topic}</h2>
                    </div>

                    {/* Note Sections */}
                    <div className="space-y-8">
                        {noteQuestions.sections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-base font-semibold text-gray-800">{section.title}</h3>

                                <ul className="space-y-3 ml-4">
                                    {section.bulletPoints.map((bulletPoint, index) => {
                                        const isSubpoint = bulletPoint.text.trim().startsWith("<<subpoint>>")

                                        return (
                                            <li
                                                key={index}
                                                className={`flex items-start gap-2 ${isSubpoint ? "ml-8" : ""}`}
                                            >
                                                <span className={`text-sm mt-1.5 ${isSubpoint ? "opacity-50" : ""}`}>
                                                    {isSubpoint ? "◦" : "•"}
                                                </span>
                                                <div className="flex-1">{renderBulletPoint(bulletPoint)}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Word Limit Reminder */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <p className="text-sm font-medium text-blue-800">
                                Remember: Write <strong>NO MORE THAN TWO WORDS</strong> for each answer.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
