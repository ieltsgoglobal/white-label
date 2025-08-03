"use client"


interface ReadingPaginationStripProps {
    allSections: any[]
    onJump: (sectionIndex: number, subsetIndex: number) => void
}


export default function ReadingPaginationStrip({ allSections, onJump }: ReadingPaginationStripProps) {
    // Create flat array of all questions with section/subset info
    const flattenedQuestions: { sectionIndex: number; subsetIndex: number }[] = []
    allSections.forEach((section, sectionIndex) => {
        section.questions.forEach((_: any, subsetIndex: number) => {
            flattenedQuestions.push({ sectionIndex, subsetIndex })
        })
    })

    const partLabels = ["Part A", "Part B", "Part C"]

    return (
        <div className="max-w-[95vw] overflow-x-auto scrollbar-hide max-h-12 mt-5 rounded-3xl px-4 py-1 bg-muted/40 border border-border">
            <div className="flex items-center justify-around gap-6 sm:gap-4 whitespace-nowrap">
                {allSections.map((_, sectionIndex) => {
                    // Extract questions belonging to this section
                    const sectionQuestions = flattenedQuestions.filter(q => q.sectionIndex === sectionIndex)
                    const partLabel = partLabels[sectionIndex] || `Part ${sectionIndex + 1}`
                    const startIndex = flattenedQuestions.findIndex(q => q.sectionIndex === sectionIndex)

                    return (
                        <div key={sectionIndex} className="flex items-center justify-center gap-1">
                            {/* Part Label */}
                            <div className="text-center group-hover:scale-105 transition-transform duration-300">
                                <h2 className="text-sm font-bold text-foreground/80 tracking-wider mb-1">{partLabel}</h2>
                                <div className="w-16 h-0.5 bg-slate-300 mx-auto" />
                            </div>

                            {/* Buttons for this section */}
                            <div className="flex gap-1">
                                {sectionQuestions.map(({ sectionIndex, subsetIndex }, i) => {
                                    const questionNumber = startIndex + i + 1
                                    return (
                                        <button
                                            key={`q-${questionNumber}`}
                                            onClick={() => onJump(sectionIndex, subsetIndex)}
                                            className="flex items-center justify-center min-w-8 h-8 px-3 text-sm font-medium rounded-3xl transition-colors text-foreground/80 hover:text-foreground hover:bg-muted"
                                        >
                                            {questionNumber}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}