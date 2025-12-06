"use client"

import { Suspense, useMemo, useState } from "react"
import { CurrentTestStatus } from "./current-test-status"
import { PerformanceSummary } from "./performance-summary"
import { RecentSessionsTable } from "./recent-sessions-table"
import { QuestionInsights } from "./question-insights"
import { EngagementMetrics } from "./engagement-metrics"
import { FeedbackNotes } from "./feedback-notes"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ProfileSummaryCard } from "./profile-summary"

export default function PracticeSetsPage() {
    const profile = {
        name: "Aisha Khan",
        studentId: "STU-48291",
        level: "Intermediate",
        totalTests: 27,
        accuracy: 82,
        totalStudyHours: 114,
        streakDays: 5,
        percentile: 78,
    }

    const inProgress = {
        testName: "IELTS Listening Practice Set 3",
        startedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
        endsAt: new Date(Date.now() + 1000 * 60 * 33).toISOString(), // 33 mins remaining
        currentQuestion: 5,
        totalQuestions: 40,
        flaggedCount: 2,
        answered: 12,
        unanswered: 8,
    }

    const performance = {
        totals: {
            questionsAttempted: 1834,
            correct: 1504,
            incorrect: 330,
            accuracy: 82,
            avgTimePerQuestionSec: 48,
            avgTimePerTestMin: 42,
            fastestCompletionMin: 28,
            slowestCompletionMin: 65,
        },
        difficultyBreakdown: [
            { difficulty: "Easy", accuracy: 91 },
            { difficulty: "Medium", accuracy: 78 },
            { difficulty: "Hard", accuracy: 63 },
        ],
        topicBreakdown: [
            { topic: "Reading", accuracy: 84 },
            { topic: "Listening", accuracy: 79 },
            { topic: "Writing", accuracy: 68 },
            { topic: "Speaking", accuracy: 74 },
            { topic: "Grammar", accuracy: 88 },
            { topic: "Vocabulary", accuracy: 81 },
        ],
        accuracyTrend: [
            { date: "Aug", accuracy: 72 },
            { date: "Sep", accuracy: 75 },
            { date: "Oct", accuracy: 78 },
            { date: "Nov", accuracy: 79 },
            { date: "Dec", accuracy: 80 },
            { date: "Jan", accuracy: 81 },
            { date: "Feb", accuracy: 82 },
        ],
    }

    const recentSessions = [
        {
            testName: "IELTS Reading Mock 6",
            mode: "Mock",
            dateTime: "2025-09-25 18:30",
            durationMin: 47,
            scoreRaw: 34,
            scorePct: 85,
            correct: 34,
            total: 40,
            answered: 40,
            skipped: 0,
            flagged: 3,
            reviewLink: "#",
        },
        {
            testName: "Listening Practice Set 9",
            mode: "Practice",
            dateTime: "2025-09-24 07:15",
            durationMin: 32,
            scoreRaw: 29,
            scorePct: 73,
            correct: 29,
            total: 40,
            answered: 38,
            skipped: 2,
            flagged: 1,
            reviewLink: "#",
        },
        {
            testName: "Reading Timed Set 2",
            mode: "Timed",
            dateTime: "2025-09-22 21:05",
            durationMin: 40,
            scoreRaw: 30,
            scorePct: 75,
            correct: 30,
            total: 40,
            answered: 37,
            skipped: 3,
            flagged: 2,
            reviewLink: "#",
        },
    ]

    const insights = {
        avgTimePerQuestionSec: 48,
        commonMistakes: ["True/False/Not Given confusion", "Paraphrase traps", "Map/Diagram labeling"],
        accuracyByType: [
            { type: "MCQ", accuracy: 86 },
            { type: "Fill-in", accuracy: 78 },
            { type: "Table Completion", accuracy: 72 },
            { type: "Essay", accuracy: 65 },
        ],
        accuracyTrend: performance.accuracyTrend,
        confidenceVsPerformance: [
            { label: "Low", accuracy: 68 },
            { label: "Medium", accuracy: 79 },
            { label: "High", accuracy: 85 },
        ],
    }

    const engagement = {
        streakDays: profile.streakDays,
        avgDailyStudyMin: 38,
        testsPerWeek: 4,
        preferredTime: "Evening",
        devices: [
            { device: "Mobile", pct: 60 },
            { device: "Desktop", pct: 40 },
        ],
    }

    const notes = {
        flaggedQuestions: [
            { id: "R-6-Q12", reason: "Ambiguous paraphrase", hintsUsed: 1, viewedExplanation: true },
            { id: "L-3-Q27", reason: "Accent confusion", hintsUsed: 0, viewedExplanation: false },
            { id: "W-2-T1", reason: "Structure clarity", hintsUsed: 2, viewedExplanation: true },
        ],
    }

    const [module, setModule] = useState<"All" | "Reading" | "Listening" | "Writing" | "Speaking">("All")
    const [timeframe, setTimeframe] = useState<"7d" | "30d" | "all">("all")

    const filteredSessions = useMemo(() => {
        const byModule =
            module === "All"
                ? recentSessions
                : recentSessions.filter((s) => s.testName.toLowerCase().includes(module.toLowerCase()))
        if (timeframe === "7d") return byModule.slice(0, 1)
        if (timeframe === "30d") return byModule.slice(0, 2)
        return byModule
    }, [module, timeframe, recentSessions])

    const filteredPerformance = useMemo(() => {
        const copy = JSON.parse(JSON.stringify(performance))
        if (timeframe === "7d") copy.accuracyTrend = performance.accuracyTrend.slice(-3)
        if (timeframe === "30d") copy.accuracyTrend = performance.accuracyTrend.slice(-5)
        return copy
    }, [timeframe, performance])

    const filteredInsights = useMemo(() => {
        const copy = { ...insights }
        return copy
    }, []) // Removed insights from dependencies

    function handleStartPractice() {
    }

    function handleBuildCustom() {
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
            <section className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
                <ProfileSummaryCard {...profile} />
                <Suspense>
                    <CurrentTestStatus {...inProgress} />
                </Suspense>
                <EngagementMetrics {...engagement} />
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PerformanceSummary performance={filteredPerformance} />
                </div>
                <QuestionInsights insights={filteredInsights} />
            </section>

            <section className="mt-6 md:mt-8">
                <RecentSessionsTable sessions={filteredSessions} />
            </section>

            <section className="mt-6 md:mt-8">
                <FeedbackNotes {...notes} />
            </section>
        </main>
    )
}
