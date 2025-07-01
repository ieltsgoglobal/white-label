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
import { saveCurrentMockSection, loadCurrentMockSection } from "@/lib/indexedDb"


export default function ListeningMain({ test_id }: { test_id: string }) {
    const [section, setSection] = useState<any>(null)
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0) // 0 to 3 = 4 sections

    // to tell child component that listeing section is going on
    useEffect(() => {
        saveCurrentMockSection("listening") // Save on mount
    }, [])

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

    const allSections = [
        section.listening_section_1,
        section.listening_section_2,
        section.listening_section_3,
        section.listening_section_4,
    ].filter(Boolean)

    const currentSection = allSections[currentSectionIndex]

    console.log(currentSection)
    return (
        <>
            <div className="w-[95vw]">
                {/* <ListeningAudioPlayer
                    audioList={allSections.map((sec: any) => sec.audio)}
                    onAudioEnded={() => {
                        if (currentSectionIndex < allSections.length - 1) {
                            setCurrentSectionIndex(currentSectionIndex + 1)
                        } else {
                            console.log("Test complete.")
                        }
                    }}
                /> */}

                {currentSection && (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        {currentSection.questions.map((question: any, index: number) =>
                            renderComponent(question, currentSectionIndex * 100 + index)
                        )}
                    </div>
                )}

            </div>
            <ListeningPagination
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
        </>
    )
}