"use client"

import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnswerTextArea from "../additional-ui/AnswerTextArea"

interface WritingQuestion {
    id: number
    timeLimit: string
    wordLimit: string
    prompt: string[]
    image_url?: string
}

export default function WritingQuestionDisplay({
    activeTab,
    currentQuestion,
    response,
    setResponse,
}: {
    activeTab: 1 | 2
    currentQuestion: WritingQuestion
    response: string
    setResponse: (val: string) => void
}) {

    const wordCount = response.trim() === "" ? 0 : response.trim().split(/\s+/).length
    const minimumWords = activeTab === 1 ? 150 : 250

    return (
        <div className="mx-auto w-full min-h-screen mb-8">
            {/* Header */}
            <div className="mb-6 rounded-lg bg-background border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-muted-foreground">Part {currentQuestion.id}</h1>
                        <p className="text-muted-foreground">
                            {currentQuestion.timeLimit} {currentQuestion.wordLimit}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column - Task Description and Chart */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {currentQuestion.prompt.map((line, idx) => (
                                    <p key={idx} className="text-foreground leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart Placeholder */}
                    {currentQuestion.image_url && (
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                                    <div className="text-center">
                                        <img
                                            src={currentQuestion.image_url}
                                            alt="Writing task visual"
                                            className="w-full h-auto rounded-lg border"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column - Writing Area */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex-1">
                                <AnswerTextArea value={response} setResponse={setResponse} activeTab={activeTab} />
                            </div>

                            {/* Word Count */}
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Word Count:</span>
                                        <Badge
                                            variant={wordCount >= minimumWords ? "default" : "secondary"}
                                            className={wordCount >= minimumWords ? "bg-green-100 text-green-800" : ""}
                                        >
                                            {wordCount}
                                        </Badge>
                                        {wordCount >= minimumWords && (
                                            <span className="text-xs text-green-600">✓ Minimum reached</span>
                                        )}
                                    </div>
                                    {wordCount < minimumWords && (
                                        <span className="text-xs text-gray-500">
                                            {minimumWords - wordCount} words remaining
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}