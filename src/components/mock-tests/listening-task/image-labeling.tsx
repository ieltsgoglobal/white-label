"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"


// 4. Plan / Map / Diagram Labelling  
interface MapQuestion {
    id: number
    location?: string
}

interface MapSection {
    type: "image-labeling"
    image_url: string
    questions: MapQuestion[]
    instructions: string
}

export default function ImageLabeling(props: MapSection) {
    const [mapQuestions, setMapQuestions] = useState<MapSection>(props)

    const handleAnswerChange = (id: number, answer: string) => {
        // Only allow single letters A-J
        const cleanAnswer = answer
            .toUpperCase()
            .replace(/[^A-J]/g, "")
            .slice(0, 1)

    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl">
                    {mapQuestions.questions.length === 1
                        ? `Question ${mapQuestions.questions[0].id}`
                        : `Questions ${mapQuestions.questions[0].id} - ${mapQuestions.questions[mapQuestions.questions.length - 1].id}`}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">{mapQuestions.instructions}</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-8">
                    {/* Map Section */}
                    <div className="space-y-4">
                        {/* Map Image */}
                        <div className="max-h-[500px] overflow-y-auto border-2 border-border p-4 bg-background">
                            <img
                                src={mapQuestions.image_url}
                                alt="Loading image..."
                                className="w-full h-auto max-w-full"
                                onError={retryImageOnErrorCustomLogic}
                            />
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="space-y-4">
                        {mapQuestions.questions.map((question) => (
                            <div key={question.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <span className="font-semibold text-blue-600 min-w-[2rem]">{question.id}</span>
                                {question.location && <span className="flex-1 min-w-[7rem] text-sm">{question.location}</span>}
                                <AnswerInput
                                    questionNumber={question.id}
                                    className="w-full h-8 text-center text-sm font-bold"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// logic to directly use in a <img/> tag
// makes the <img/> component more robust
// single dropbox fails | single s3 fails | client network request fails
export function retryImageOnErrorCustomLogic(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget
    const retry = Number(img.dataset.retry || 0)

    // after 5 retry ask the user to check connection and reload image
    if (retry >= 5) {
        img.alt = "Image could not be loaded. Check your internet connection and click here to try again."
        img.style.cursor = "pointer"
        img.onclick = () => {
            img.dataset.retry = "0"
            img.style.cursor = ""
            img.onclick = null
            const url = new URL(img.src)
            url.searchParams.set("retry", Date.now().toString())
            img.src = url.toString()
        }
        return
    }

    // retry 5 times and display UI
    img.alt = `Loading image... Retrying (${retry + 1}/5)`
    img.dataset.retry = String(retry + 1)

    setTimeout(() => {
        const url = new URL(img.src);
        url.searchParams.set("retry", String(retry + 1));
        img.src = url.toString();
    }, 1000)
}


