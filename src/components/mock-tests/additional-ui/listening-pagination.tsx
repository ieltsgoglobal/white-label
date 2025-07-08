"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ListeningPagination({ prevSection, nextSection }: { prevSection: () => void, nextSection: () => void }) {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const sections = [
        { title: "Section A", range: [1, 15] },
        { title: "Section B", range: [16, 28] },
        { title: "Section C", range: [29, 40] },
    ]


    const renderPageButton = (page: number) => (
        <button
            key={page}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 border bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-gray-800`}
        >
            {page}
        </button>
    )

    return (
        <div className="w-full fixed bottom-0 left-0 right-0 z-1 ">
            {/* Toggle Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="group relative bg-white border border-gray-300 border-b-0 rounded-t-xl px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
                >
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
                <div className="flex flex-col md:flex-row justify-between gap-4 p-4 sm:p-6 bg-white rounded-t-xl border-t border-l border-r border-gray-200">
                    {/* Sections */}
                    <div className="space-y-4 overflow-x-auto md:overflow-visible max-w-full">
                        {sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="min-w-[300px]">
                                <div className="flex items-start gap-3">
                                    <h3 className="text-sm font-semibold text-gray-700 min-w-[80px]">
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
                    <div className="flex items-center justify-start md:justify-end gap-2 shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={prevSection}
                            className="bg-white"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={nextSection}
                            className="bg-white"
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