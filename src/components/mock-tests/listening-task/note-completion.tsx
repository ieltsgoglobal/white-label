"use client"

import { useState, } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import AnswerInput from "../additional-ui/AnswerInput"

interface NoteBulletPoint {
    id?: number | number[]
    text: string
}

interface NoteSection {
    title: string
    bulletPoints: NoteBulletPoint[]
}

interface NoteCompletionSection {
    type: "note-completion"
    oneWord?: boolean
    numberAllowedInAnswer?: boolean
    topic: string
    sections: NoteSection[]
}



export default function NoteCompletion(props: NoteCompletionSection) {
    const [noteQuestions, setNoteQuestions] = useState<NoteCompletionSection>(props)

    const renderBulletPoint = (bulletPoint: NoteBulletPoint) => {
        const rawText = bulletPoint.text.trim()


        // detect levels
        const isSubpoint = rawText.startsWith("<<subpoint>>")
        const isSubSubpoint = rawText.startsWith("<<subpoint_subpoint>>")

        // clean marker from text
        const cleanText = rawText
            .replace("<<subpoint_subpoint>>", "")
            .replace("<<subpoint>>", "")
            .trim()

        if (!bulletPoint.id) {
            return (
                <span
                    className={`text-sm ${isSubSubpoint ? "ml-12" : isSubpoint ? "ml-6" : ""
                        }`}
                >
                    {cleanText}
                </span>
            )
        }


        // single id
        if (typeof bulletPoint.id === "number") {
            const id = bulletPoint.id!
            const parts = cleanText.split(`(${id}) _______`)

            return (
                <div
                    className={`flex items-center gap-2 text-sm leading-relaxed flex-wrap ${isSubSubpoint ? "ml-12" : isSubpoint ? "ml-6" : ""
                        }`}
                >
                    <span>{parts[0]}</span>
                    <span className="font-semibold text-blue-600">({id})</span>
                    <AnswerInput
                        questionNumber={id}
                        className="w-32 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-background px-2"
                    />
                    <span>{parts[1] || ""}</span>
                </div>
            )
        }

        // multiple ids in the same line
        if (Array.isArray(bulletPoint.id)) {
            let content = cleanText
            const elements: (JSX.Element | string)[] = []

            bulletPoint.id.forEach((id, idx) => {
                const [before, after = ""] = content.split(`(${id}) _______`)
                elements.push(before)
                elements.push(
                    <span key={`input-${id}`} className="inline-flex items-center mx-1">
                        <span className="font-semibold text-blue-600 mr-1">({id})</span>
                        <AnswerInput
                            questionNumber={id}
                            className="w-32 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-background px-2"
                        />
                    </span>
                )
                content = after
            })

            elements.push(content)

            return (
                <div
                    className={`text-sm flex flex-wrap items-center leading-relaxed ${isSubSubpoint ? "ml-12" : isSubpoint ? "ml-6" : ""
                        }`}
                >
                    {elements}
                </div>
            )
        }
    }


    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    {(() => {
                        const allIds = noteQuestions.sections
                            .flatMap(section =>
                                section.bulletPoints.flatMap(bp =>
                                    Array.isArray(bp.id) ? bp.id : bp.id ? [bp.id] : []
                                )
                            );

                        if (allIds.length === 0) return "No Questions";

                        const min = Math.min(...allIds);
                        const max = Math.max(...allIds);
                        return min === max ? `Question ${min}` : `Questions ${min}–${max}`;
                    })()}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Complete the notes below. Write NO MORE THAN {noteQuestions.oneWord ? `ONE WORD` : `TWO WORDS`} {noteQuestions.numberAllowedInAnswer && "AND/OR A NUMBER"} for each answer.</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Topic Header */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{noteQuestions.topic}</h2>
                    </div>

                    {/* Note Sections */}
                    <div className="space-y-6">
                        {noteQuestions.sections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-base font-semibold">{section.title}</h3>

                                <ul className="space-y-3 ml-4">
                                    {section.bulletPoints.map((bulletPoint, index) => {
                                        const rawText = bulletPoint.text.trim()
                                        const isSubpoint = rawText.startsWith("<<subpoint>>")
                                        const isSubSubpoint = rawText.startsWith("<<subpoint_subpoint>>")

                                        return (
                                            <li
                                                key={index}
                                                className={`flex items-start gap-2 ${isSubSubpoint
                                                    ? "ml-12"
                                                    : isSubpoint
                                                        ? "ml-8"
                                                        : ""
                                                    }`}
                                            >
                                                <span
                                                    className={`text-sm mt-0.5 ${isSubSubpoint
                                                        ? "opacity-40"
                                                        : isSubpoint
                                                            ? "opacity-50"
                                                            : ""
                                                        }`}
                                                >
                                                    {isSubSubpoint
                                                        ? "▪"
                                                        : isSubpoint
                                                            ? "◦"
                                                            : "•"}
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
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-black border border-blue-200 dark:border-white/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <p className="text-sm font-medium text-blue-800">
                                Remember: Write <strong>NO MORE THAN {noteQuestions.oneWord ? "ONE WORD" : "TWO WORDS"}</strong> for each answer.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
