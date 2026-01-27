"use client"

import { getReviewMode, loadCurrentMockSection } from "@/lib/mock-tests/indexedDb"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useMockAttempts } from "@/app/(student-auth)/mock-scores/_component/MockAttemptContext"
import { AnswerMap } from "@/types/mockTestAttempt"
import { CheckCircle, XCircle } from "lucide-react"
import { getPracticeSetAnswer, getPracticeSetCorrectAnswers, updatePracticeSetAnswer } from "@/lib/practice-sets/user-submissions/sessionStorage"


interface AnswerCheckboxProps {
    questionKey: number[] //eg [11,12]
    options: string[]
    optionLetters: string[]
    maxSelectable: number
}

export default function AnswerCheckbox({ questionKey, options, optionLetters, maxSelectable }: AnswerCheckboxProps) {
    const [section, setSection] = useState<"listening" | "reading" | "practice-sets-listening" | "practice-sets-reading" | null>(null)
    const [selected, setSelected] = useState<string[]>([])

    const isInMockTestSection = section === "listening" || section === "reading";
    const isInPracticeSetSection = section === "practice-sets-listening" || section === "practice-sets-reading";


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
        if (!isInMockTestSection || !isReviewMode) return

        const loadData = async () => {
            // find the correct test attempt using id from useParams
            const matchingAttempt = attempts.find(attempt => attempt.id === id)
            if (!matchingAttempt) return

            // store what user has done in the test attempts
            const answers = matchingAttempt[section] // reading or listening
            const attemptValues = questionKey.map((k) => answers?.[k.toString()] || "")
            setSelected(attemptValues.filter(Boolean).sort())

            // get test.id from attempts (so that we can load correct answers)
            setTestId(Number(matchingAttempt.testId))
        }
        loadData()
    }, [section, questionKey, isReviewMode, id, attempts])

    const [correctAnswers, setCorrectAnswers] = useState<AnswerMap>({})

    // Load real answers from `listeing_answers` or `reading_answers`
    useEffect(() => {
        if (!testId || !isInMockTestSection) return

        const loadAnswers = async () => {
            try {
                const module = await import(`@/app/data/tests/test-${testId}`)
                const correct =
                    section === "listening"
                        ? module.listening_answers || {}
                        : module.reading_answers || {}

                setCorrectAnswers(correct)
            } catch (err) {
                console.error("Failed to load correct answers:", err)
            }
        }

        loadAnswers()
    }, [testId, section])


    // --------------------------------------------------------------------




    // -------------------- PRACTICE SETS REVIEW CODE ----------------------


    // Load real answers using event-listening during isInMockTestSection and isReviewMode
    // Loead real answers from sessionStorage
    useEffect(() => {
        if (!isInPracticeSetSection) return

        // 1️⃣ Load immediately from sessionStorage (if ListeningUI already stored or ReadingUI already stored)
        const storedCorrect = getPracticeSetCorrectAnswers(section)
        if (storedCorrect) {
            setCorrectAnswers(storedCorrect)
        }

    }, [isReviewMode, isInPracticeSetSection])


    // --------------------------------------------------------------------




    // check in which section we are dealing with (listening/ reading/ practice-sets-listening)
    useEffect(() => {
        loadCurrentMockSection().then((value) => {
            if (
                value === "listening" ||
                value === "reading" ||
                value === "practice-sets-listening" ||
                value === "practice-sets-reading"
            ) {
                setSection(value)
            }
        })
    }, [])


    // get particular answer, in this case all questionKeys
    useEffect(() => {

        const collected: string[] = []

        questionKey.forEach((id) => {
            let stored = ""

            // in mock tests we get the user answers from the context API `mockAttemptContext`
            if (!isReviewMode && isInMockTestSection) {
                stored = getFieldAnswer(section, id)
            }

            // isReviewMode removed cuz in ReviewMode we still fecth user answers from sessionStorage
            // so we need to fetch user answers from sessionStorage wheter we are in ReviewMode or not
            if (isInPracticeSetSection) {
                stored = getPracticeSetAnswer(section, id)
            }

            if (stored) collected.push(stored.trim())
        })

        // as we are in side-effect, I put extra if-condition here.
        // if-condition avoids overwriting `setSelected` with empty local/session storage values.
        if ((!isReviewMode && isInMockTestSection) || isInPracticeSetSection) {
            setSelected(collected.filter(Boolean).sort())
        }
    }, [section, questionKey, isReviewMode])


    // update localstorage on answer change
    const handleCheckboxChange = (letter: string, checked: boolean) => {
        let updated: string[]

        if (checked) {
            if (selected.length >= maxSelectable) return // prevent over-selecting
            updated = [...selected, letter]
        } else {
            updated = selected.filter((l) => l !== letter)
        }

        updated = updated.sort()
        setSelected(updated)
        console.log(updated)

        // match updated with localstorage questionKeys
        if (isInMockTestSection) {
            questionKey.forEach((id, index) => {
                updateMockAnswer(section, id, updated[index] || "")
            })
        }

        // match updated with sessionStorage questionKeys
        if (isInPracticeSetSection) {
            questionKey.forEach((id, index) => {
                updatePracticeSetAnswer(section, id, updated[index] || "")
            })
        }
    }

    return (
        <div id={`${section}-q${questionKey[0]}`} className="ml-8 space-y-3">
            {options.map((optionText, idx) => {
                const letter = optionLetters[idx]
                const inputId = `q${questionKey}-${letter}`

                // review variables
                const correctLetters = questionKey.map((k) => correctAnswers?.[k.toString()]?.trim()).filter(Boolean).sort()
                const isCorrectChoice = correctLetters.includes(letter)
                const isSelected = selected.includes(letter)

                const showCorrectHighlight =
                    isReviewMode && isCorrectChoice && (!isSelected || !selected.length)
                const showGreenTick = isReviewMode && isCorrectChoice && isSelected
                const showRedCross = isReviewMode && !isCorrectChoice && isSelected

                return (
                    <div key={letter} className="flex items-start space-x-3">
                        <Checkbox
                            id={inputId}
                            checked={selected.includes(letter)}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange(letter, !!checked)
                            }
                            disabled={isReviewMode}
                        />
                        <Label
                            htmlFor={inputId}
                            className="text-sm leading-relaxed cursor-pointer flex-1"
                        >
                            <span className="font-semibold mr-2">{letter}</span>
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
        </div>
    )
}