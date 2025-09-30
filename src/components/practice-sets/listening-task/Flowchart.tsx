// this component is made specially for practice sets
// as in mock test we use the image of the flowchart which make it look like image labeling

"use client"

import AnswerInput from "@/components/mock-tests/additional-ui/AnswerInput"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface FlowchartGroup {
    title?: string | { blocks: { content: string; type: string }[]; type: string }
    items?: string[]
}

interface FlowchartProps {
    body: {
        items: (string | string[] | FlowchartGroup)[]
        list: string[]
        title?: string
    }
    start: number
    end: number
    desc?: any
}


export default function Flowchart({ body, start, end, desc }: FlowchartProps) {
    let currentBlank = start

    // helper: render text with blanks replaced (supports multiple <input>)
    const renderWithBlanks = (text: string) => {
        const parts: (string | number)[] = []
        const segments = text.split("<input>")
        segments.forEach((seg, i) => {
            parts.push(seg)
            if (i < segments.length - 1) {
                parts.push(currentBlank)
                currentBlank++
            }
        })
        return parts
    }

    // render a single line with possible inputs
    const renderLine = (line: string, key?: number, asListItem = true) => {
        const parts = renderWithBlanks(line)
        const content = parts.map((part, i) =>
            typeof part === "number" ? (
                <span key={i} className="inline-flex items-center gap-1 mx-1">
                    <span className="font-semibold text-blue-600">({part})</span>
                    <AnswerInput
                        questionNumber={part}
                        className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 
          rounded-none bg-transparent focus:bg-background px-1"
                    />
                </span>
            ) : (
                <span key={i}>{part}</span>
            )
        )

        return asListItem ? (
            <li key={key} className="text-left">{content}</li>
        ) : (
            <div key={key} className="text-left">{content}</div>
        )
    }

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    {start === end
                        ? `Question ${start}`
                        : `Questions ${start}–${end}`}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                    {desc?.text?.[0] ?? "Complete the flowchart below."}
                </p>
            </CardHeader>
            <CardContent className="mx-auto max-w-3xl">
                {/* Options list */}
                {Array.isArray(body.list) && body.list.length > 0 && (
                    <div className="mb-6 p-3 border rounded-md grid grid-cols-2 gap-2">
                        {body.list.map((opt, idx) => (
                            <div key={idx}>
                                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt.trim()}
                            </div>
                        ))}
                    </div>
                )}

                {/* Flowchart items */}
                <div className="space-y-6">
                    {body.title && (
                        <h2 className="text-xl font-semibold text-center mb-8">
                            {typeof body.title === "string" ? body.title : ""}
                        </h2>
                    )}

                    {body.items.map((item, idx) => {
                        // arrow ↓
                        if (typeof item === "string" && item.trim() === "↓") {
                            return (
                                <div key={idx} className="text-center text-2xl font-bold text-gray-500">
                                    ↓
                                </div>
                            )
                        }

                        // group with title + items[]
                        if (typeof item === "object" && !Array.isArray(item) && "items" in item) {
                            return (
                                <div key={idx} className="max-w-2xl mx-auto p-3 border rounded">
                                    {item.title && (
                                        <h3 className="font-bold mb-3 uppercase text-left">
                                            {typeof item.title === "string" ? item.title : ""}
                                        </h3>
                                    )}
                                    <ul className="list-disc list-inside space-y-2">
                                        {item.items?.map((line, li) => renderLine(line, li))}
                                    </ul>
                                </div>
                            )
                        }

                        // plain string line
                        if (typeof item === "string") {
                            return (
                                <div key={idx} className="max-w-2xl mx-auto p-3 border rounded">
                                    <ul className="list-disc list-inside">{renderLine(item, idx, false)}</ul>
                                </div>
                            )
                        }

                        // string[] case (multiple lines)
                        if (Array.isArray(item)) {
                            return (
                                <div key={idx} className="max-w-2xl mx-auto p-3 border rounded">
                                    <ul className="list-disc list-inside space-y-2">
                                        {item.map((line, li) => renderLine(line, li))}
                                    </ul>
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </CardContent>
        </Card>
    )
}