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
                <CardTitle>Questions {mapQuestions.questions[0].id} -  {mapQuestions.questions[mapQuestions.questions.length - 1].id}</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">{mapQuestions.instructions}</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-8">
                    {/* Map Section */}
                    <div className="space-y-4">
                        {/* Map Image */}
                        <div className="border-2 border-gray-300 p-4 bg-white">
                            <img
                                src={mapQuestions.image_url}
                                alt="Inverness Aquarium Floor Plan"
                                className="w-full h-auto max-w-full"
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
