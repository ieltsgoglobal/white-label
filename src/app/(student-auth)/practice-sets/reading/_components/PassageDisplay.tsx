"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PassageDisplayProps {
    title: string
    text: string
    answer_key_range?: [number, number]
    task_part?: number
}

/**
 * Utility: Format the passage text into individual paragraphs.
 * Each paragraph is separated by one or more newline characters.
 */
function formatTextToParagraphs(text: string): string[] {
    return text
        ? text
            .split(/\n+/) // Split on single or multiple newlines
            .map((p) => p.trim())
            .filter((p) => p.length > 0)
        : []
}

/**
 * Utility: Generate formatted question range string.
 * Example: [1, 13] -> "Questions 1–13"
 */
function getQuestionRange(answerKeyRange?: [number, number]): string {
    if (!answerKeyRange || answerKeyRange.length !== 2) return ""
    return `Questions ${answerKeyRange[0]}–${answerKeyRange[1]}`
}

/**
 * Utility: Convert paragraph index → alphabetical label.
 * 0 → A, 1 → B, 2 → C, etc.
 */
function getParagraphLabel(index: number): string {
    return String.fromCharCode(65 + index) // 65 = 'A'
}


/**
 * Component: PassageDisplay
 *
 * Renders an IELTS/TOEFL-style reading passage with:
 * - Title and question range header
 * - Scrollable content area
 * - Clear paragraph spacing and line breaks
 *
 * This component is purely presentational and does not handle state.
 */
export default function PassageDisplay({
    title,
    text,
    answer_key_range,
    task_part,
}: PassageDisplayProps) {
    // Format raw text into structured paragraphs
    const paragraphs = formatTextToParagraphs(text)
    // Derive human-readable question range label
    const qRange = getQuestionRange(answer_key_range)

    return (
        <Card className="max-h-[100vh] rounded-3xl shadow-md border bg-background/90 backdrop-blur-sm flex flex-col">
            {/* === Scroll Entire Card === */}
            <ScrollArea className="h-full w-full px-6 pb-6 rounded-3xl overflow-hidden">
                {/* === Header Section === */}
                <CardHeader className="flex-none pb-2 space-y-2 p-0 m-0 mt-6">
                    {/* Display passage number (e.g., PASSAGE 1) */}
                    {task_part && (
                        <p className="text-sm font-semibold text-muted-foreground uppercase">
                            Passage {task_part}
                        </p>
                    )}

                    {/* Display question range (e.g., Questions 1–13) */}
                    {qRange && (
                        <p className="text-sm text-muted-foreground">
                            You should spend about 20 minutes on <strong>{qRange}</strong> below.
                        </p>
                    )}

                    {/* Main passage title */}
                    <CardTitle className="text-2xl font-bold text-center pt-6">
                        {title}
                    </CardTitle>
                </CardHeader>

                {/* === Content Section === */}
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
                        {paragraphs.map((para, i) => (
                            <div key={i} className="flex flex-col items-start gap-1">
                                {/* Paragraph label (A, B, C, ...) */}
                                <span className="text-lg font-semibold min-w-[1.5rem]">
                                    {getParagraphLabel(i)}
                                </span>
                                {/* Paragraph text */}
                                <p className="flex-1">{para}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </ScrollArea>
        </Card >
    )
}