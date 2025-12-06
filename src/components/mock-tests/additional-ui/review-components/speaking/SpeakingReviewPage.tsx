"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SpeakingReviewNavigation from "./SpeakingReviewNavigation"
import SpeakingQuestionsNavigation from "./SpeakingQuestionsNavigation"
import { useParams } from "next/navigation"
import { useMockAttempts } from "@/app/(student-auth)/mock-scores/_component/MockAttemptContext"
import { BandScores, SpeakingAnswer } from "@/types/mockTestAttempt"
import { SpeakingPart } from "@/components/mock-tests/speaking-task/speaking-main"
import AudioPlayerCard from "./AudioPlayer"
import { isPracticeSetsGoingOn } from "@/app/(student-auth)/practice-sets/_utils/misc"
import { getPracticeSetSpeakingAnswers, getPracticeSetsSpeakingScores } from "@/lib/practice-sets/user-submissions/sessionStorage"


const getBandColor = (score: number) => {
    if (score >= 7) return "text-green-600 bg-green-50"
    if (score >= 5.5) return "text-yellow-600 bg-yellow-50"
    if (score >= 4) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
}

const getBandLabel = (score: number) => {
    if (score >= 8.5) return "Expert"
    if (score >= 7.5) return "Very Good"
    if (score >= 6.5) return "Good"
    if (score >= 5.5) return "Modest"
    if (score >= 4.5) return "Limited"
    return "Extremely Limited"
}

export default function SpeakingReviewPage({ currentSpeakingPracticeSetsQuestions }: { currentSpeakingPracticeSetsQuestions?: SpeakingPart[] }) {

    const isPractice = isPracticeSetsGoingOn()

    // --------------------- MOCK TEST REVIEW CODE ----------------------

    // display what user has done in test
    // pathname-id is basically the firebase collection id
    const { id } = useParams() as { id: string }

    // match the pathname-id with attempts we have to get the details of test we want to review
    const mockAttemptContext = useMockAttempts(false) // ⚠️ no crash if undefined
    const attempts = mockAttemptContext?.attempts || [] // use Context API to get test attempts done by user

    // store test-id in variable (/data/mock-tests/tests/{test-id})
    const [testId, setTestId] = useState<number | null>(null)

    // what user has done
    const [userAttempts, setUserAttempts] = useState<SpeakingAnswer[]>()
    // user's overall scores 
    const [scores, setScores] = useState<BandScores>()

    useEffect(() => {

        const loadData = async () => {
            // find the correct test attempt using id from useParams
            const matchingAttempt = attempts.find(attempt => attempt.id === id)
            if (!matchingAttempt) return

            // store what user has done in the test attempts
            const answers = matchingAttempt["speaking"]
            setUserAttempts(answers)
            const scores = matchingAttempt["scores"]
            setScores(scores.speaking)

            // get test.id from attempts (so that we can load correct answers)
            setTestId(Number(matchingAttempt.testId))
        }

        if (!isPractice) {
            loadData()
        }
    }, [attempts])


    // get questionsData from .ts files
    const [questionsData, setQuestionsData] = useState<SpeakingPart[]>([])


    // get value for questionData, basicaly get questions to display
    useEffect(() => {
        const loadMockTestQuestionData = async () => {
            try {
                const testDataModule = await import(`@/app/data/tests/test-${testId}`)
                const { speaking_transcripts } = testDataModule.default || testDataModule
                setQuestionsData(speaking_transcripts)
                console.log(speaking_transcripts)
            } catch (error) {
                console.error("Failed to load test data:", error)
            }
        }

        if (!isPractice) {
            loadMockTestQuestionData()
        }
    }, [testId])

    // ------------------------------------------------------------------





    // ----------------------- PRACTICE SETS REVIEW CODE----------------------------

    useEffect(() => {
        const loadPracticeSetsSpeakingUserAnswers = async () => {

            // Get recorded speaking answers from sessionStorage
            const answers = getPracticeSetSpeakingAnswers()
            setUserAttempts(answers)

            // Get band scores (if already evaluated)
            const scores = getPracticeSetsSpeakingScores()
            setScores(scores || undefined)
        }

        if (isPractice) {
            loadPracticeSetsSpeakingUserAnswers()
        }

    }, [isPractice, currentSpeakingPracticeSetsQuestions])

    // get value for questionData, basicaly get questions to display
    useEffect(() => {
        const loadPracticeSetsSpeakingQuestions = async () => {
            if (!isPractice) return

            if (!currentSpeakingPracticeSetsQuestions) return
            setQuestionsData(currentSpeakingPracticeSetsQuestions)
        }

        if (isPractice) {
            loadPracticeSetsSpeakingQuestions()
        }

    }, [])

    // ------------------------------------------------------------------


    // from all data get secific 
    const [currectPartIndex, setCurrentPartIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const currentPart = questionsData[currectPartIndex]
    const currentPartQuestions = currentPart?.questions || []
    const currentQ = currentPartQuestions[currentQuestion]
    const currentUserAttempt = userAttempts?.find(a => a.questionId === currentQ?.id)

    return (
        <div className="w-full min-h-screen p-5">
            <div className="mx-auto space-y-6">

                <SpeakingReviewNavigation onSelect={setCurrentPartIndex} />

                <SpeakingQuestionsNavigation
                    questions={currentPartQuestions}
                    currentQuestionIndex={currentQuestion}
                    onSelectQuestion={setCurrentQuestion}
                    onPrev={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                    onNext={() => setCurrentQuestion((prev) => Math.min(currentPartQuestions.length - 1, prev + 1))}
                />

                {/* Main Question Interface */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Question Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
                                        <CardDescription>Speaking Part {currectPartIndex + 1}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Question Audio  */}
                                <AudioPlayerCard src={currentQ?.audioUrl || ""} question={currentQ?.transcript} variant="question" />

                                {/* User Attempt Answer */}
                                <AudioPlayerCard src={currentUserAttempt?.url || ""} variant="answer" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Scoring Panel */}
                    <div className="space-y-6">
                        <Card className="border border-border shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    Overall Speaking Score
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {scores && (
                                    <>
                                        <div className="text-center p-4 bg-background rounded-lg border border-border">
                                            <div className="text-3xl font-bold text-foreground">{scores.overall_band}</div>
                                            <div className="text-sm text-foreground">Overall Band</div>
                                            <div className="text-xs mt-1 text-muted-foreground">{getBandLabel(scores.overall_band)}</div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-3">
                                            {Object.entries(scores)
                                                .filter(([key]) => key !== "overall_band")
                                                .map(([key, value]) => (
                                                    <div key={key} className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium capitalize">{key.replace(/_/g, " ")}</span>
                                                            <Badge className={getBandColor(value)} variant="secondary">
                                                                {value}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={(value / 9) * 100} className="h-2" />
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
