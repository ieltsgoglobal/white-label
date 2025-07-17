"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { useEffect, useState } from "react"
import { getReviewMode, loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import { useParams } from "next/navigation"
import { useMockAttempts } from "@/app/(student-auth)/mock-scores/_component/MockAttemptContext"
import { AnswerMap } from "@/types/mockTestAttempt"
import { CheckCircle, XCircle } from "lucide-react"

interface QuestionProps {
    question: {
        id: number
        options: string[]
    }
    optionLetters: string[]
}

export default function AnswerRadio({ question, optionLetters }: QuestionProps) {
    const [section, setSection] = useState<"listening" | "reading" | null>(null)
    const [value, setValue] = useState("")

    const handleAnswerChange = (id: number, answer: string) => {
        setValue(answer) // ✅ update local UI state immediately
        if (section) {
            updateMockAnswer(section, id, answer)
        }
    }


    // --------------------- MOCK TEST REVIEW CODE ------------------------

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
            const answer = answers?.[question.id.toString()] || ""
            setValue(answer)

            // get test.id from attempts (so that we can load correct answers)
            setTestId(Number(matchingAttempt.testId))
        }
        loadData()
    }, [section, question.id, isReviewMode, id, attempts])

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
                const correctAnswer = correct[question.id.toString()]
                if (isReviewMode && correctAnswer && value) {
                    setIsCorrect(correctAnswer.trim().toLowerCase() === value.trim().toLowerCase())
                } else {
                    setIsCorrect(null)
                }
            } catch (err) {
                console.error("Failed to load correct answers:", err)
            }
        }

        loadAnswers()
    }, [testId, section])


    // ----------------------------------------------------------

    // When section or questionNumber changes, fetch stored answer
    useEffect(() => {
        if (!isReviewMode && section) {
            const stored = getFieldAnswer(section, question.id)
            setValue(stored || "")
        }
    }, [section, question.id])

    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (value === "listening" || value === "reading") {
                setSection(value)
            }
        })
    }, [])


    return (
        <RadioGroup
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
            value={value}
        >
            {question.options.map((optionText, idx) => {
                const letter = optionLetters[idx]
                const inputId = `q${question.id}-${letter}`

                // review variables
                const isSelected = value === letter
                const correctLetter = correctAnswers?.[question.id.toString()]
                const isCorrectChoice = letter === correctLetter

                const showGreenTick = isReviewMode && isSelected && isCorrect
                const showRedCross = isReviewMode && isSelected && isCorrect === false
                const showCorrectHighlight =
                    isReviewMode &&
                    isCorrectChoice &&
                    (value === "" || isCorrect === false)

                return (
                    <div key={letter} className="flex items-start space-x-3">
                        <span className="font-semibold mr-2">{letter}</span>
                        <RadioGroupItem
                            value={letter}
                            id={inputId}
                            className="mt-0.5"
                            disabled={isReviewMode}
                        />
                        <Label
                            htmlFor={inputId}
                            className="text-sm leading-relaxed cursor-pointer flex-1 flex items-center gap-2"
                        >
                            {optionText}
                            {showGreenTick && (
                                <CheckCircle className="text-green-500 h-5 w-5" />
                            )}
                            {showRedCross && (
                                <XCircle className="text-red-500 h-5 w-5" />
                            )}
                            {showCorrectHighlight && (
                                <span className="ml-2 text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded">
                                    Correct Answer
                                </span>
                            )}
                        </Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}