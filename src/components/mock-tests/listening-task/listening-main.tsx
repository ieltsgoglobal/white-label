"use client"

import { useEffect, useState } from "react"
import TableCompletion from "./table-completion"
import FormCompletion from "./form-completion"
import ImageLabeling from "./image-labeling"
import NoteCompletion from "./note-completion"
import ShortAnswer from "./short-answer"
import ListeningAudioPlayer from "../additional-ui/listening-audio-player"
import ListeningPagination from "../additional-ui/listening-pagination"
import Matching from "./matching"
import MultipleChoiceSingle from "./multiple-choice-single"
import MultipleChoiceMany from "./multiple-choice-many"
import FlowChartCompletion from "./flow-chart-completion"
import SummaryCompletion from "./summary-completion"
import SentenceCompletion from "./sentence-completion"
import { getReviewMode, saveCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import NavigationBar from "../additional-ui/navigation-bar"
import { evaluateListening } from "@/lib/mock-tests/listening/evaluateListening"
import ReviewSectionNavigation from "../additional-ui/review-components/listening/ReviewSectionNavigation"


export default function ListeningMain({ test_id, onNext }: { test_id: string, onNext: () => void }) {
    const [section, setSection] = useState<any>(null)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0) // 0 to 3 = 4 sections
    const [isReviewMode, setIsReviewMode] = useState(false)

    // gets value of IsReviewMode ON from indexedDB
    useEffect(() => {
        getReviewMode().then((value) => {
            setIsReviewMode(value)
        })
    }, [])

    // to tell child component that listeing section is going on though indexedDB
    useEffect(() => {
        saveCurrentMockSection("listening") // Save on mount
    }, [])

    // load question for ts file
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

    // render appropriate quesiton type component
    const renderComponent = (question: any, index: number) => {
        const section = "listening"
        switch (question.questionType) {
            case "table-completion":
                return <TableCompletion key={`tc-${index}`} {...question} />
            case "form-completion":
                return <FormCompletion key={`fc-${index}`} {...question} />
            case "multiple-choice-single":
                return <MultipleChoiceSingle key={`mcs-${index}`} {...question} />
            case "multiple-choice-many":
                return <MultipleChoiceMany key={`mcm-${index}`} {...question} />
            case "image-labeling":
                return <ImageLabeling key={`il-${index}`} {...question} />
            case "short-answer":
                return <ShortAnswer key={`sa-${index}`} {...question} />
            case "note-completion":
                return <NoteCompletion key={`nc-${index}`} {...question} />
            case "matching":
                return <Matching key={`m-${index}`} {...question} />
            case "summary-completion":
                return <SummaryCompletion key={`sc-${index}`} {...question} />
            case "flow-chart-completion":
                return <FlowChartCompletion key={`fcc-${index}`} {...question} />
            case "sentence-completion":
                return <SentenceCompletion key={`sec-${index}`} {...question} />
            default:
                return null
        }
    }

    // only store data we need from while .ts file
    const allSections = [
        section.listening_section_1,
        section.listening_section_2,
        section.listening_section_3,
        section.listening_section_4,
    ].filter(Boolean)
    const currentSection = allSections[currentSectionIndex]

    const handleSubmitListening = async () => {
        //evaluate listening score and update score in localStorage
        await evaluateListening(test_id)
        onNext()
    }

    return (
        <div>
            {/* 30 MIN TIMER */}
            {!isReviewMode && <NavigationBar onSubmit={handleSubmitListening} />}

            {isReviewMode && <ReviewSectionNavigation onSelect={setCurrentSectionIndex} />}

            {!isReviewMode && (
                <ListeningAudioPlayer
                    audioList={allSections.map((sec: any) => sec.audio)}
                    onAudioEnded={() => {
                        if (currentSectionIndex < allSections.length - 1) {
                            setCurrentSectionIndex(currentSectionIndex + 1)
                        } else {
                            console.log("Test complete.")
                        }
                    }}
                />
            )}

            <div className="mt-16">
                <div className="w-[95vw]">
                    {currentSection && (
                        <div className="flex flex-col items-center justify-center space-y-6">
                            {currentSection.questions.map((question: any, index: number) =>
                                renderComponent(question, currentSectionIndex * 100 + index)
                            )}
                        </div>
                    )}
                </div>

                {!isReviewMode && (
                    <ListeningPagination
                        allSections={allSections} //giving allSections props to calculate which (1-40)Button goes to which (SectionA,B,C,D or Part1,2,3,4)section
                        goToSectionByQuestionId={(index: number) => { setCurrentSectionIndex(index) }}
                        prevSection={() => {
                            if (currentSectionIndex > 0) {
                                setCurrentSectionIndex(currentSectionIndex - 1)
                            }
                        }}
                        nextSection={() => {
                            if (currentSectionIndex < allSections.length - 1) {
                                setCurrentSectionIndex(currentSectionIndex + 1)
                            }
                        }}
                    />
                )}

            </div>
        </div>
    )
}