import { AttemptWithCorrectAnswers, calculatePracticeSetScore } from "../listening/_utils/misc"

type StatItem = {
    title: string
    value: string | number
}

// --------------------------------------------------------
// -------------- SANITIZE READING ATTEMPTS ---------------
// --------------------------------------------------------

export type AnswerObject = {
    user: string
    correct: string
}

export type AnswersMap =
    | Record<string, AnswerObject>   // normal IELTS structure
    | Record<string, string>         // "q1": "A" style answers

export type AttemptMetadata = {
    device?: string
    timeTaken?: number
    [key: string]: any
}

export type PracticeSetsReadingSubmission = {
    attempt_id: string
    user_id: string
    test_path: string
    answers: AnswersMap
    started_at: string     // ISO timestamp
    submitted_at: string   // ISO timestamp
    metadata: AttemptMetadata
}


export function convertReadingSubmissionsToPerformanceSummaryData(
    submissions: PracticeSetsReadingSubmission[]
): StatItem[] {

    let correct = 0
    let totalTimeSec = 0
    let fastestCompletion = Infinity
    let slowestCompletion = -Infinity

    submissions.forEach((sub) => {
        const answers = sub.answers
        const entries = Object.values(answers)

        const attemptsForScoring: AttemptWithCorrectAnswers[] = []

        entries.forEach((val) => {
            if (typeof val !== "string") {
                attemptsForScoring.push({
                    user: (val.user ?? "").trim(),
                    correct: (val.correct ?? "").trim(),
                })
            }
        })

        const submissionCorrect = calculatePracticeSetScore(attemptsForScoring)

        correct += submissionCorrect

        const timeTakenInSec =
            typeof sub.metadata?.timeTaken === "number"
                ? sub.metadata.timeTaken
                : 0

        totalTimeSec += timeTakenInSec
        fastestCompletion = Math.min(fastestCompletion, timeTakenInSec)
        slowestCompletion = Math.max(slowestCompletion, timeTakenInSec)
    })

    const avgTimePerTestInMin = submissions.length
        ? Math.round(totalTimeSec / submissions.length / 60)
        : 0

    const fastestCompletionInMin =
        fastestCompletion === Infinity ? 0 : Math.round(fastestCompletion / 60)
    const slowestCompletionInMin =
        slowestCompletion === -Infinity ? 0 : Math.round(slowestCompletion / 60)

    // ------------------------------------
    // FINAL → RETURN ONLY KPIs AS ARRAY
    // ------------------------------------
    const stats: StatItem[] = [
        { title: "Number of Tests Attempted", value: submissions.length },
        { title: "Total Questions Attempted", value: submissions.length * 40 },
        { title: "Number of Correct Answers", value: correct },
        { title: "All Time Accuracy in %", value: `${((correct / (submissions.length * 40)) * 100).toFixed(3)}%` },
        { title: "Avg Time per Test", value: `${avgTimePerTestInMin}min` },
        { title: "Fastest Section Completion", value: `${fastestCompletionInMin}min` },
        { title: "Slowest Section Completion", value: `${slowestCompletionInMin}min` },
    ]

    return stats
}

// --------------------------------------------------------
// -------------- SANITIZE WRITING ATTEMPTS ---------------
// --------------------------------------------------------

type WritingTaskScore = {
    score: number | null
    response: string
}

type WritingResponsesWithScores = {
    task_1?: WritingTaskScore
    task_2?: WritingTaskScore
    overall?: number | null
}

export type PracticeSetsWritingSubmission = {
    id: string
    user_id: string
    test_path: string
    user_responses_with_scores: WritingResponsesWithScores
    started_at: string
    submitted_at: string
    metadata: AttemptMetadata
}

export function convertWritingSubmissionsToPerformanceSummaryData(
    submissions: PracticeSetsWritingSubmission[]
): StatItem[] {
    let totalOverall = 0
    let totalTask1 = 0
    let totalTask2 = 0

    let countOverall = 0
    let countTask1 = 0
    let countTask2 = 0

    let bestOverall = -Infinity
    let worstOverall = Infinity

    let totalTimeSec = 0
    let fastestCompletion = Infinity
    let slowestCompletion = -Infinity

    submissions.forEach(sub => {
        const scores = sub.user_responses_with_scores || {}

        const task1Score = scores.task_1?.score
        const task2Score = scores.task_2?.score

        if (typeof task1Score === "number") {
            totalTask1 += task1Score
            countTask1++
        }

        if (typeof task2Score === "number") {
            totalTask2 += task2Score
            countTask2++
        }

        let overall = scores.overall

        // If overall is missing, derive it from the available task scores
        if (typeof overall !== "number") {
            const parts: number[] = []
            if (typeof task1Score === "number") parts.push(task1Score)
            if (typeof task2Score === "number") parts.push(task2Score)

            if (parts.length > 0) {
                overall = parts.reduce((a, b) => a + b, 0) / parts.length
            } else {
                overall = null
            }
        }

        if (typeof overall === "number") {
            totalOverall += overall
            countOverall++

            if (overall > bestOverall) bestOverall = overall
            if (overall < worstOverall) worstOverall = overall
        }

        // ---------------- TIME (seconds in metadata.timeTaken) ----------------
        const timeTakenInSec =
            typeof sub.metadata?.timeTaken === "number"
                ? sub.metadata.timeTaken
                : 0

        totalTimeSec += timeTakenInSec
        fastestCompletion = Math.min(fastestCompletion, timeTakenInSec)
        slowestCompletion = Math.max(slowestCompletion, timeTakenInSec)
    })

    // --------------- AGGREGATED METRICS ----------------

    const avgOverallBand = countOverall
        ? Number((totalOverall / countOverall).toFixed(2))
        : 0

    const avgTask1Band = countTask1
        ? Number((totalTask1 / countTask1).toFixed(2))
        : 0

    const avgTask2Band = countTask2
        ? Number((totalTask2 / countTask2).toFixed(2))
        : 0

    const avgTimePerTestInMin = submissions.length
        ? Math.round(totalTimeSec / submissions.length / 60)
        : 0

    const fastestCompletionInMin =
        fastestCompletion === Infinity ? 0 : Math.round(fastestCompletion / 60)

    const slowestCompletionInMin =
        slowestCompletion === -Infinity ? 0 : Math.round(slowestCompletion / 60)

    const bestOverallBand = bestOverall === -Infinity ? 0 : bestOverall
    const worstOverallBand = worstOverall === Infinity ? 0 : worstOverall

    // ------------------------------------
    // FINAL → RETURN ONLY KPIs AS ARRAY
    // ------------------------------------
    const stats: StatItem[] = [
        {
            title: "Number of Writing Tests Attempted",
            value: submissions.length,
        },
        {
            title: "Average Overall Band",
            value: avgOverallBand,
        },
        {
            title: "Average Task 1 Band",
            value: avgTask1Band,
        },
        {
            title: "Average Task 2 Band",
            value: avgTask2Band,
        },
        {
            title: "Best Overall Band",
            value: bestOverallBand,
        },
        {
            title: "Worst Overall Band",
            value: worstOverallBand,
        },
        {
            title: "Avg Time per Test",
            value: `${avgTimePerTestInMin}min`,
        },
        {
            title: "Fastest Test Completion",
            value: `${fastestCompletionInMin}min`,
        },
        {
            title: "Slowest Test Completion",
            value: `${slowestCompletionInMin}min`,
        },
    ]

    return stats
}

// --------------------------------------------------------
// -------------- SANITIZE SPEAKING ATTEMPTS --------------
// --------------------------------------------------------

// --------------------------------------------------------
// -------------- SANITIZE SPEAKING ATTEMPTS ---------------
// --------------------------------------------------------

export type SpeakingScores = {
    overall_band: number | null
    pronunciation: number | null
    lexical_resource: number | null
    fluency_and_coherence: number | null
    grammatical_range_and_accuracy: number | null
}

export type PracticeSetsSpeakingSubmission = {
    id: string
    user_id: string
    test_path: string
    user_responses: Array<{ url: string; questionId: number }>
    user_scores: SpeakingScores | null
    started_at: string
    submitted_at: string
    metadata: AttemptMetadata
}

export function convertSpeakingSubmissionsToPerformanceSummaryData(
    submissions: PracticeSetsSpeakingSubmission[]
): StatItem[] {

    let totalOverall = 0
    let totalPron = 0
    let totalLex = 0
    let totalFluency = 0
    let totalGrammar = 0

    let countOverall = 0
    let countPron = 0
    let countLex = 0
    let countFluency = 0
    let countGrammar = 0

    let bestOverall = -Infinity
    let worstOverall = Infinity

    let totalTimeSec = 0
    let fastestCompletion = Infinity
    let slowestCompletion = -Infinity

    submissions.forEach(sub => {
        const scores = sub.user_scores

        if (scores) {
            // Overall
            if (typeof scores.overall_band === "number") {
                totalOverall += scores.overall_band
                countOverall++
                if (scores.overall_band > bestOverall) bestOverall = scores.overall_band
                if (scores.overall_band < worstOverall) worstOverall = scores.overall_band
            }

            // Pronunciation
            if (typeof scores.pronunciation === "number") {
                totalPron += scores.pronunciation
                countPron++
            }

            // Lexical Resource
            if (typeof scores.lexical_resource === "number") {
                totalLex += scores.lexical_resource
                countLex++
            }

            // Fluency & Coherence
            if (typeof scores.fluency_and_coherence === "number") {
                totalFluency += scores.fluency_and_coherence
                countFluency++
            }

            // Grammar
            if (typeof scores.grammatical_range_and_accuracy === "number") {
                totalGrammar += scores.grammatical_range_and_accuracy
                countGrammar++
            }
        }

        // TIME TAKEN
        const timeTakenInSec =
            typeof sub.metadata?.timeTaken === "number"
                ? sub.metadata.timeTaken
                : 0

        totalTimeSec += timeTakenInSec
        fastestCompletion = Math.min(fastestCompletion, timeTakenInSec)
        slowestCompletion = Math.max(slowestCompletion, timeTakenInSec)
    })

    // Averages
    const avgOverall = countOverall ? Number((totalOverall / countOverall).toFixed(2)) : 0
    const avgPron = countPron ? Number((totalPron / countPron).toFixed(2)) : 0
    const avgLex = countLex ? Number((totalLex / countLex).toFixed(2)) : 0
    const avgFluency = countFluency ? Number((totalFluency / countFluency).toFixed(2)) : 0
    const avgGrammar = countGrammar ? Number((totalGrammar / countGrammar).toFixed(2)) : 0

    const avgTimePerTestInMin = submissions.length
        ? Math.round(totalTimeSec / submissions.length / 60)
        : 0

    const fastestCompletionInMin =
        fastestCompletion === Infinity ? 0 : Math.round(fastestCompletion / 60)

    const slowestCompletionInMin =
        slowestCompletion === -Infinity ? 0 : Math.round(slowestCompletion / 60)

    const bestOverallBand = bestOverall === -Infinity ? 0 : bestOverall
    const worstOverallBand = worstOverall === Infinity ? 0 : worstOverall

    // Final KPIs
    const stats: StatItem[] = [
        { title: "Number of Speaking Tests Attempted", value: submissions.length },
        { title: "Average Overall Band", value: avgOverall },
        { title: "Average Pronunciation Band", value: avgPron },
        { title: "Average Lexical Resource Band", value: avgLex },
        { title: "Average Fluency & Coherence Band", value: avgFluency },
        { title: "Average Grammar Band", value: avgGrammar },
        { title: "Best Overall Band", value: bestOverallBand },
        { title: "Worst Overall Band", value: worstOverallBand },
        { title: "Avg Time per Test", value: `${avgTimePerTestInMin}min` },
        { title: "Fastest Test Completion", value: `${fastestCompletionInMin}min` },
        { title: "Slowest Test Completion", value: `${slowestCompletionInMin}min` },
    ]

    return stats
}



// --------------------------------------------------------
// ------ SANITIZE RECENT SESSIONS TABLE ROW DATA ---------
// --------------------------------------------------------

export function sanitizeRecentSessionsTableData(
    submissions: any[],
    section: string
) {

    return submissions.map(sub => {

        // ---------- COMMON ----------
        const startedAt = new Date(sub.started_at || sub.submitted_at);
        const timeTaken = typeof sub.metadata?.timeTaken === "number"
            ? Math.round(sub.metadata.timeTaken / 60)
            : 0;

        // Fallback
        const row = {
            "date time": startedAt.toISOString().slice(0, 16).replace("T", " "),
            "duration min": timeTaken,
            // "review link": `/review/${section}/${sub.test_path}`,

        };

        // ---------- READING / LISTENING ----------
        if (section === "reading" || section === "listening") {
            const rawAnswers = Object.values(sub.answers);

            const attemptsForScoring: AttemptWithCorrectAnswers[] = rawAnswers.map((val: any) => ({
                user: (val.user || "").trim(),
                correct: (val.correct || "").trim(),
            }));

            const correct = calculatePracticeSetScore(attemptsForScoring);

            const answered = attemptsForScoring.filter(a => a.user !== "").length;

            const total = attemptsForScoring.length;
            const skipped = total - answered;

            const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;

            return {
                ...row,
                "score raw": correct,
                "score pct": scorePct,
                "correct": correct,
                "total ques": total,
                "answered": answered,
                "skipped": skipped,
            };
        }

        // ---------- WRITING ----------
        if (section === "writing") {
            const scores = sub.user_responses_with_scores;
            const overall = scores?.overall ??
                ((scores?.task_1?.score ?? 0) + (scores?.task_2?.score ?? 0)) / 2;

            return {
                ...row,
                "overall band": overall ?? 0,
                "task 1 band": scores?.task_1?.score ?? 0,
                "task 2 band": scores?.task_2?.score ?? 0,
            };
        }

        // ---------- SPEAKING ----------
        if (section === "speaking") {
            const scores = sub.user_scores || {};

            return {
                ...row,
                "overall band": scores.overall_band ?? 0,
                "pronunciation": scores.pronunciation ?? 0,
                "lexical resource": scores.lexical_resource ?? 0,
                "fluency & coherence": scores.fluency_and_coherence ?? 0,
                "grammar": scores.grammatical_range_and_accuracy ?? 0,
            };
        }

        return row;
    });
}