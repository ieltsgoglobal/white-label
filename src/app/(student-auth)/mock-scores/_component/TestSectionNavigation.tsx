"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Headphones, FileText, PenTool, Mic } from "lucide-react"

interface TestNavigationProps {
    listeningScore?: number
    readingScore?: number
    writingScore?: number
    speakingScore?: number
    overallScore?: number
    maxScore?: number
    activeSection?: "listening" | "reading" | "writing" | "speaking"
    onSectionClick?: (section: string) => void
    onBackClick?: () => void
}

export default function TestSectionNavigation({
    listeningScore = 0,
    readingScore = 0,
    writingScore = 0,
    speakingScore = 0,
    overallScore = 0,
    maxScore = 9.0,
    activeSection = "listening",
    onSectionClick,
    onBackClick,
}: TestNavigationProps) {
    const sections = [
        {
            id: "listening",
            icon: Headphones,
            score: listeningScore,
            color:
                activeSection === "listening"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-gray-100 text-gray-700 border-gray-200",
        },
        {
            id: "reading",
            icon: FileText,
            score: readingScore,
            color:
                activeSection === "reading"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-gray-100 text-gray-700 border-gray-200",
        },
        {
            id: "writing",
            icon: PenTool,
            score: writingScore,
            color:
                activeSection === "writing"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-gray-100 text-gray-700 border-gray-200",
        },
        {
            id: "speaking",
            icon: Mic,
            score: speakingScore,
            color:
                activeSection === "speaking"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-gray-100 text-gray-700 border-gray-200",
        },
    ]

    return (
        <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
            {/* Back Button */}
            <Button variant="ghost" size="sm" onClick={onBackClick} className="p-2 hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Section Badges */}
            <div className="flex items-center gap-3">
                {sections.map((section) => {
                    const IconComponent = section.icon
                    return (
                        <Badge
                            key={section.id}
                            variant="outline"
                            className={`${section.color} px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 text-sm font-medium border`}
                            onClick={() => onSectionClick?.(section.id)}
                        >
                            <IconComponent className="h-4 w-4" />
                            <span>{section.score}</span>
                        </Badge>
                    )
                })}
            </div>

            {/* Overall Score */}
            <div className="ml-auto">
                <span className="text-gray-700 font-medium">
                    {overallScore}/{maxScore}
                </span>
            </div>
        </div>
    )
}
