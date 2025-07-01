"use client"
import { useState } from "react"

interface SpeakingQuestion {
    id: number
    transcript: string
    audioUrl: string
}

interface SpeakingPart {
    part: number
    questions: SpeakingQuestion[]
}

export default function SpeakingPagination({ speakingData }: { speakingData: SpeakingPart[] }) {
    const [activeSection, setActiveSection] = useState(1)
    const [activePart, setActivePart] = useState(1)

    console.log(speakingData)
    if (!speakingData || speakingData.length === 0) return null

    const parts = speakingData.map((part) => ({
        name: `Part ${part.part}`,
        numbers: part.questions.map((q) => q.id),
    }))

    return (
        <div className="fixed w-full bottom-0 bg-white border-t border-gray-200 p-4 md:p-6">
            <div className="mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                    {parts.map((part, partIndex) => (
                        <div key={part.name} className="flex items-center gap-1 md:gap-2">
                            <span className="text-sm md:text-base font-medium text-gray-700 mr-2">{part.name}</span>
                            {part.numbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => {
                                        setActiveSection(number)
                                        setActivePart(partIndex + 1)
                                    }}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-medium transition-colors duration-200 ${activeSection === number
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}
                            {partIndex < parts.length - 1 && <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}