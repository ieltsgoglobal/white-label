"use client"

import { useParams } from "next/navigation"
import { useMockAttempts } from "../../_component/MockAttemptContext"
import { MockTestAttempt } from "@/types/mockTestAttempt"
import TestSectionNavigation from "../../_component/TestSectionNavigation"
import { useEffect, useState } from "react"
import ListeningMain from "@/components/mock-tests/listening-task/listening-main"
import { setReviewMode } from "@/lib/mock-tests/indexedDb"
import ListeningReviewNavigation from "@/components/mock-tests/additional-ui/review-components/listening/ReviewSectionNavigation"
import ReadingMain from "@/components/mock-tests/reading-task/reading-main"
import WritingMain from "@/components/mock-tests/writing-task/writing-main"
import SpeakingReviewPage from "../../../../../components/mock-tests/additional-ui/review-components/speaking/SpeakingReviewPage"

export default function ReviewPage() {
    // pathname-id is basically the firebase collection id
    const { id } = useParams() as { id: string }

    // match the pathname-id with attempts we have to get the details of test we want to review
    const mockAttemptContext = useMockAttempts(true) // use Context API to get test attempts done by user
    const attempts = mockAttemptContext?.attempts || []

    // sets isReviewMode ON in indexedDB
    useEffect(() => {
        setReviewMode(true)
    }, [])

    // navigate through sections
    const [section, setSection] = useState<"listening" | "reading" | "writing" | "speaking">("listening")

    // Find the attempt by its unique Firestore doc ID
    const attempt: MockTestAttempt | undefined = attempts.find((a) => a.id === id)
    const testId = attempt?.testId || "Unknown Test ID"
    if (!attempt) {
        return (
            <div className="p-6 text-center text-red-500">
                ❌ Attempt not found for ID: <code>{id}</code>
            </div>
        )
    }

    return (
        <div>
            <TestSectionNavigation onSectionClick={setSection} activeSection={section} />
            <div className="bg-background flex items-center justify-center pb-10">

                {section === "listening" && (<ListeningMain test_id={testId} onNext={() => { }} />)}

                {section === "reading" && (
                    <div className="px-5">
                        <ReadingMain test_id={testId} onNext={() => { }} />
                    </div>
                )}
                {section === "writing" && (
                    <div className="px-5">
                        <WritingMain test_id={testId} onNext={() => { }} />
                    </div>
                )}
                {section === "speaking" && <SpeakingReviewPage />}

            </div>
        </div>

    )
}