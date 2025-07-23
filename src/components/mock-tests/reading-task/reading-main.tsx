"use client"

import { useEffect, useState } from "react"
import TrueFalseNotGiven from "./true-false-notgiven"
import YesNoNotGiven from "./yes-no-notgiven"
import MatchHeadings from "./match-headings"
import MatchSentenceEndings from "./match-sentence-endings"
import ReadingPagination from "../additional-ui/reading-pagination"
import MatchingFeatures from "./matching-features"
import ImageLabeling from "../listening-task/image-labeling"
import MultipleChoiceSingle from "../listening-task/multiple-choice-single"
import MultipleChoiceMany from "../listening-task/multiple-choice-many"
import SentenceCompletion from "../listening-task/sentence-completion"
import NoteCompletion from "../listening-task/note-completion"
import TableCompletion from "../listening-task/table-completion"
import FlowChartCompletion from "../listening-task/flow-chart-completion"
import SummaryCompletion from "../listening-task/summary-completion"
import ShortAnswer from "../listening-task/short-answer"
import MatchParagraphInformation from "./match-paragraph-information"
import { getReviewMode, saveCurrentMockSection, loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import NavigationBar from "../additional-ui/navigation-bar"
import { evaluateReading } from "@/lib/mock-tests/reading/evaluateReading"
import ReadingPaginationStrip from "../additional-ui/review-components/reading/ReadingPaginationStrip"

export default function ReadingMain({ test_id, onNext }: { test_id: string, onNext: () => void }) {
    const [section, setSection] = useState<any>(null)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [currentSubsetIndex, setCurrentSubsetIndex] = useState(0)
    const [isReviewMode, setIsReviewMode] = useState(false)

    // gets value of IsReviewMode ON from indexedDB
    useEffect(() => {
        getReviewMode().then((value) => {
            setIsReviewMode(value)
        })
    }, [])

    // to tell child component that reading section is going on
    useEffect(() => {
        saveCurrentMockSection("reading") // Save on mount
    }, [])

    // load test data questions
    useEffect(() => {
        const loadTestData = async () => {
            try {
                const testDataModule = await import(`@/app/data/tests/test-${test_id}`)
                setSection(testDataModule.default || testDataModule)
            } catch (error) {
                console.error("Failed to load test data:", error)
            }
        }

        loadTestData()
    }, [test_id])

    if (!section) {
        return <p className="text-center text-gray-500">Loading test data...</p>
    }

    const renderComponent = (question: any, index: number) => {
        switch (question.questionType) {
            case "multiple-choice-single":
                return <MultipleChoiceSingle key={`mcs-${index}`} {...question} />
            case "multiple-choice-many":
                return <MultipleChoiceMany key={`mcm-${index}`} {...question} />
            case "sentence-completion":
                return <SentenceCompletion key={`sc-${index}`} {...question} />
            case "note-completion":
                return <NoteCompletion key={`nc-${index}`} {...question} />
            case "table-completion":
                return <TableCompletion key={`tc-${index}`} {...question} />
            case "flow-chart-completion":
                return <FlowChartCompletion key={`fcc-${index}`} {...question} />
            case "summary-completion":
                return <SummaryCompletion key={`sumc-${index}`} {...question} />
            case "image-labeling":
                return <ImageLabeling key={`il-${index}`} {...question} />
            case "short-answer":
                return <ShortAnswer key={`sa-${index}`} {...question} />

            case "true-false-notgiven":
                return <TrueFalseNotGiven key={`tfn-${index}`} {...question} />
            case "yes-no-notgiven":
                return <YesNoNotGiven key={`ynn-${index}`} {...question} />
            case "match-headings":
                return <MatchHeadings key={`mh-${index}`} {...question} />
            case "matching-sentence-endings":
                return <MatchSentenceEndings key={`mse-${index}`} {...question} />
            case "matching-features":
                return <MatchingFeatures key={`mf-${index}`} {...question} />
            case "match-paragraph-information":
                return <MatchParagraphInformation key={`mpi-${index}`} {...question} />
            default:
                return null
        }
    }

    const allSections = [
        section.reading_section_1,
        section.reading_section_2,
        section.reading_section_3,
    ]

    //pagination functions
    const goToNextSubset = () => {
        const currentSection = allSections[currentSectionIndex]
        const isLastSubset = currentSubsetIndex === currentSection.questions.length - 1

        if (isLastSubset) {
            if (currentSectionIndex < allSections.length - 1) {
                // Move to next section
                setCurrentSectionIndex(prev => prev + 1)
                setCurrentSubsetIndex(0)
            } else {
                console.log("End of reading sections.")
            }
        } else {
            setCurrentSubsetIndex(prev => prev + 1)
        }
    }
    const goToPrevSubset = () => {
        if (currentSubsetIndex > 0) {
            setCurrentSubsetIndex(prev => prev - 1)
        } else if (currentSectionIndex > 0) {
            const prevSection = allSections[currentSectionIndex - 1]
            setCurrentSectionIndex(prev => prev - 1)
            setCurrentSubsetIndex(prevSection.questions.length - 1)
        }
    }

    const handleSubmitReading = async () => {
        //evaluate reading score and update score in localStorage
        await evaluateReading(test_id)
        onNext()
    }

    return (
        <div>
            {/* 30 MIN TIMER */}
            {!isReviewMode && <NavigationBar onSubmit={handleSubmitReading} />}

            {isReviewMode &&
                // returns index and subindex for navigation
                <ReadingPaginationStrip
                    allSections={allSections}
                    onJump={(sectionIndex, subsetIndex) => {
                        setCurrentSectionIndex(sectionIndex)
                        setCurrentSubsetIndex(subsetIndex)
                    }} />
            }

            <div className="mt-16">
                <div className="min-h-screen">
                    <div className="mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Reading Passage */}
                            <ReadingPassageDisplay
                                title={allSections[currentSectionIndex].reading_passage.title}
                                subtitle={allSections[currentSectionIndex].reading_passage.subtitle}
                                passage={allSections[currentSectionIndex].reading_passage.passage}
                            />

                            {/* Questions Section */}
                            {renderComponent(allSections[currentSectionIndex].questions[currentSubsetIndex], 0)}
                        </div>
                    </div>
                </div>
                {!isReviewMode &&
                    <ReadingPagination
                        allSections={allSections}
                        onNext={goToNextSubset}
                        onPrev={goToPrevSubset}
                        goToQuestion={(sectionIndex: number, subsetIndex: number) => {
                            setCurrentSectionIndex(sectionIndex);
                            setCurrentSubsetIndex(subsetIndex)
                        }}
                    />
                }
            </div>
        </div>
    )
}

function ReadingPassageDisplay({
    title,
    subtitle,
    passage,
}: {
    title: string
    subtitle?: string
    passage: string
}) {
    const paragraphs = passage
        .split("\n")
        .map(p => p.trim())
        .filter(p => p.length > 0)

    return (
        <div className="bg-background rounded-3xl border border-border p-8">
            <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-foreground mb-1">{title}</h1>
                {subtitle && <p className="text-sm italic text-muted-foreground leading-relaxed">{subtitle}</p>}
            </div>

            <div className="space-y-8">
                {paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex flex-col items-start text-sm">
                        <span className="font-bold text-sm text-foreground my-1 min-w-[32px]">{index + 1}</span>
                        <p className="text-foreground leading-relaxed text-justify whitespace-pre-line">{paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}