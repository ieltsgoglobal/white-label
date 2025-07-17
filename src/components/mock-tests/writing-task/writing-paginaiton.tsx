"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

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
        <div className="fixed bottom-0 left-0 right-0 z-1 flex justify-between items-center w-full bg-white px-6 py-4">
            <div className="flex gap-2">
                {Array.from({ length: totalTabs }, (_, idx) => {
                    const tabIndex = idx + 1
                    return (
                        <Button
                            key={tabIndex}
                            variant={activeTab === tabIndex ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveTab((tabIndex) as 1 | 2)}
                            className="rounded-full"
                        >
                            <span className="mr-2">Part {tabIndex}</span>
                        </Button>
                    )
                })}
            </div>

            <Button
                className="rounded-full"
                size="sm"
                onClick={() => {
                    if (activeTab < totalTabs) {
                        setActiveTab((activeTab + 1) as 1 | 2)
                    }
                }}
                disabled={activeTab === totalTabs}
            >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}