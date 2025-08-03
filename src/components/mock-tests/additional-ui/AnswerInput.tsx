// components/AnswerInput.tsx
"use client"

import { Input } from "@/components/ui/input"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { getReviewMode, loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useMockAttempts } from "@/app/(student-auth)/mock-scores/_component/MockAttemptContext"
import { AnswerMap } from "@/types/mockTestAttempt"
import { checkAnswerAcceptable } from "@/lib/mock-tests/listening/checkAnswerAcceptable"

interface AnswerInputProps {
    questionNumber: number
    className: string
    maxLength?: number
    placeholder?: string
}

export default function AnswerInput({ className, questionNumber, maxLength, placeholder }: AnswerInputProps) {
    const [section, setSection] = useState<"listening" | "reading" | null>(null)
    const [value, setValue] = useState("")

    // --------------------- MOCK TEST REVIEW CODE ----------------------

    const [isReviewMode, setIsReviewMode] = useState(false)

    // gets value of IsReviewMode ON from indexedDB
    useEffect(() => {
        getReviewMode().then((value) => {
            setIsReviewMode(value)
        })
    }, [])

    // display what user has done in test
    // pathname-id is basically the firebase collection id
    const { id } = useParams() as { id: string }

    // match the pathname-id with attempts we have to get the details of test we want to review
    const mockAttemptContext = useMockAttempts(false) // ⚠️ no crash if undefined
    const attempts = mockAttemptContext?.attempts || [] // use Context API to get test attempts done by user

    // store test-id in variable (/data/mock-tests/tests/{test-id})
    const [testId, setTestId] = useState<number | null>(null)

    useEffect(() => {
        if (!section || !isReviewMode) return

        const loadData = async () => {
            // find the correct test attempt using id from useParams
            const matchingAttempt = attempts.find(attempt => attempt.id === id)
            if (!matchingAttempt) return

            // store what user has done in the test attempts
            const answers = matchingAttempt[section] // reading or listening
            const answer = answers?.[questionNumber.toString()] || ""
            setValue(answer)

            // get test.id from attempts (so that we can load correct answers)
            setTestId(Number(matchingAttempt.testId))
        }
        loadData()
    }, [section, questionNumber, isReviewMode, id, attempts])

    const [correctAnswers, setCorrectAnswers] = useState<AnswerMap>({})
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    // Load real answers from `listeing_answers` or `reading_answers`
    useEffect(() => {
        if (!testId || !section) return

        const loadAnswers = async () => {
            try {
                const module = await import(`@/app/data/tests/test-${testId}`)
                const correct =
                    section === "listening"
                        ? module.listening_answers || {}
                        : module.reading_answers || {}

                setCorrectAnswers(correct)

                // check if answers is correct or not
                const correctAnswer = correct[questionNumber.toString()]
                if (isReviewMode && correctAnswer && value) {
                    const isSame = checkAnswerAcceptable(value, correctAnswer)
                    setIsCorrect(isSame)
                } else {
                    setIsCorrect(null)
                }

            } catch (err) {
                console.error("Failed to load correct answers:", err)
            }
        }

        loadAnswers()
    }, [testId, section])


    // ------------------------------------------------------------------

    // check in which section we are dealing with (listening / reading)
    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (value === "listening" || value === "reading") {
                setSection(value)
            }
        })
    }, [])

    // When section or questionNumber changes, fetch stored answer
    useEffect(() => {
        if (!isReviewMode && section) {
            const stored = getFieldAnswer(section, questionNumber)
            setValue(stored || "")
        }
    }, [section, questionNumber])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value
        setValue(newVal)

        if (section) {
            updateMockAnswer(section, questionNumber, newVal)
        }
    }

    if (!section) return null // or a loading spinner


    return (
        <>
            <Input
                id={`${section}-q${questionNumber}`} // for smooth scolls
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={isReviewMode}
                style={{
                    width: value.length > 5
                        ? `${Math.max(40 + value.length * 6.5, 40 + 8 * 10)}px`
                        : undefined,
                    transition: "width 0.2s ease",
                }}
                maxLength={maxLength ? maxLength : 30}
                className={clsx(
                    className,
                    isReviewMode && (isCorrect
                        ? "border-green-500 text-green-700 bg-green-50"
                        : "border-red-500 text-red-700 bg-red-50")
                )}
            />
            {isReviewMode && isCorrect !== true && (
                <div
                    className="px-3 py-2 text-sm text-green-700 bg-green-50 border border-green-400 rounded-md w-fit"
                >
                    <span className="font-medium">
                        {correctAnswers?.[questionNumber.toString()] || "N/A"}
                    </span>
                </div>
            )}
        </>
    )
}