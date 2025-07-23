"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { extractIds } from "@/lib/mock-tests/extract-ids"
import { getMockAnswers } from "@/lib/mock-tests/mockAnswersStorage"

interface SectionMeta {
    title: string
    range: [number, number]
}

export default function ListeningPagination({ allSections, prevSection, nextSection }: { allSections: any, prevSection: () => void, nextSection: () => void }) {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const sectionTitles = ["Section A", "Section B", "Section C", "Section D"]
    const sections: SectionMeta[] = allSections.map((section: any, index: number) => {
        const ids = extractIds(section)
        return {
            title: sectionTitles[index] || `Section ${index + 1}`,
            range: [Math.min(...ids), Math.max(...ids)]
        }
    })

    // 🔄 Forces re-render when a new answer is stored in localStorage
    // Listens for the custom 'update-pagination' event dispatched from updateMockAnswer()
    // This allows pagination UI to reflect updated attempt states (e.g., highlight attempted questions)
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const handleUpdate = () => {
            setVersion(prev => prev + 1) // triggers re-render
        }

        window.addEventListener("update-pagination", handleUpdate)
        return () => window.removeEventListener("update-pagination", handleUpdate)
    }, [])


    const renderPageButton = (page: number) => {
        // get answers from localstorage, filter out Listening Answers and then check which questions are having some kind of value, so that we can mark attempted question with bg-blue
        const answers = getMockAnswers()
        const isAttempted = answers?.listening?.[page]?.trim() !== ""

        return (
            <button
                onClick={() => { }}
                key={page}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 border 
                     ${isAttempted
                        ? "bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/60"
                    }`}
            >
                {page}
            </button>
        )
    }

    return (
        <div className="w-full fixed bottom-0 left-0 right-0 z-1 ">
            {/* Toggle Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="group relative bg-white border border-border border-b-0 rounded-t-xl px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <div className="flex items-center space-x-2 text-sm font-medium text-black/80">
                        {isCollapsed ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                <span>Show Navigation</span>
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                <span>Hide Navigation</span>
                            </>
                        )}
                    </div>
                </button>
            </div>

            {!isCollapsed && (
                <div className="flex flex-col md:flex-row justify-between gap-4 p-4 sm:p-6 bg-background rounded-t-xl border-t border-l border-r border-border">
                    {/* Sections */}
                    <div className="grid lg:grid-cols-2 gap-5">
                        {sections.map((section: { title: string; range: [number, number] }, sectionIndex: number) => (
                            <div key={sectionIndex}>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground min-w-[80px]">
                                        {section.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from({ length: section.range[1] - section.range[0] + 1 }, (_, i) =>
                                            section.range[0] + i
                                        ).map(renderPageButton)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-2 shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={prevSection}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={nextSection}
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}