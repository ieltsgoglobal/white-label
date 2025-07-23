"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WritingPaginationProps {
    activeTab: number
    totalTabs: number
    setActiveTab: (val: 1 | 2) => void
}

export default function WritingPagination({
    activeTab,
    totalTabs,
    setActiveTab,
}: WritingPaginationProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-1 flex justify-between items-center w-full bg-background px-6 py-4">
            <div className="flex gap-2">
                {Array.from({ length: totalTabs }, (_, idx) => {
                    const tabIndex = idx + 1
                    return (
                        <div className="flex items-center justify-center gap-4 mr-6">
                            <h3 className="text-sm font-semibold text-muted-foreground">
                                Part
                            </h3>

                            <button
                                key={tabIndex}
                                onClick={() => setActiveTab((tabIndex) as 1 | 2)}
                                className="w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 border bg-muted text-muted-foreground border-border hover:bg-muted/60"
                            >
                                <span>{tabIndex}</span>
                            </button>
                        </div>
                    )
                })}
            </div>


            <div className="hidden sm:flex items-center justify-start md:justify-end gap-2 shrink-0">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (activeTab > 1) {
                            setActiveTab((activeTab - 1) as 1 | 2)
                        }
                    }}
                    disabled={activeTab === 1}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (activeTab < totalTabs) {
                            setActiveTab((activeTab + 1) as 1 | 2)
                        }
                    }}
                    disabled={activeTab === totalTabs}
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}