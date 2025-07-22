"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Headphones, FileText, PenTool, Mic } from "lucide-react"
import { useParams } from "next/navigation"
import { useMockAttempts } from "./MockAttemptContext"
import { useEffect, useState } from "react"
import { Scores } from "@/types/mockTestAttempt"

type SectionType = "listening" | "reading" | "writing" | "speaking"

interface TestNavigationProps {
    activeSection: SectionType
    onSectionClick: (section: SectionType) => void
}

export default function TestSectionNavigation({ activeSection, onSectionClick }: TestNavigationProps) {


    // --------------------- MOCK TEST REVIEW CODE ----------------------

    const [scores, setScores] = useState<Scores>()

    // display what user has done in test
    // pathname-id is basically the firebase collection id
    const { id } = useParams() as { id: string }

    // match the pathname-id with attempts we have to get the details of test we want to review
    const mockAttemptContext = useMockAttempts(false) // ⚠️ no crash if undefined
    const attempts = mockAttemptContext?.attempts || [] // use Context API to get test attempts done by user

    useEffect(() => {

        const loadData = async () => {
            // find the correct test attempt using id from useParams
            const matchingAttempt = attempts.find(attempt => attempt.id === id)
            if (!matchingAttempt) return

            // store what user has done in the test attempts
            const scores = matchingAttempt["scores"]
            setScores(scores)
        }
        loadData()
    }, [id, attempts])

    // ------------------------------------------------------------------------



    if (!scores) return null
    const overallScore = Math.round((scores.listening + scores.reading + scores.writing.overall + scores?.speaking.overall_band) / 4)

    const sections = [
        {
            id: "listening",
            icon: Headphones,
            score: scores.listening,
        },
        {
            id: "reading",
            icon: FileText,
            score: scores.reading,
        },
        {
            id: "writing",
            icon: PenTool,
            score: scores.writing.overall,
        },
        {
            id: "speaking",
            icon: Mic,
            score: scores?.speaking.overall_band,
        },
    ]

    return (
        <div className="flex items-center gap-4 p-4 bg-background border-b border-border">
            {/* Back Button */}
            <Button variant="ghost" size="sm" onClick={() => { }} className="p-2 hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>

            <h1 className="font-semibold tracking-tight text-foreground/70">
                IELTS Mock Test Review
            </h1>

            {/* Section Badges */}
            <div className="flex items-center gap-3">
                {sections.map((section) => {
                    const IconComponent = section.icon
                    const isActive = section.id === activeSection
                    return (
                        <Badge
                            key={section.id}
                            variant="outline"
                            className={`${(isActive) && "bg-sky-100 text-sky-700 border-sky-200"} px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 text-sm font-medium border`}
                            onClick={() => { onSectionClick?.((section.id) as SectionType) }}
                        >
                            <IconComponent className="h-4 w-4" />
                            <span>{section.score}</span>
                        </Badge>
                    )
                })}
                <Badge
                    variant="outline"
                    className={`px-3 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 text-sm font-medium border`}
                >
                    {/* <IconComponent className="h-4 w-4" /> */}
                    <span>Overall Band Score: <strong>{overallScore}/9</strong></span>
                </Badge>
            </div>


        </div>
    )
}
