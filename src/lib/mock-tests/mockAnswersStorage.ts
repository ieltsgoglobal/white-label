// lib/mockAnswersStorage.ts
// localstorage

import { SpeakingBandBreakdown } from "./speaking/evaluate-speaking/band-summary"

const STORAGE_KEY = "mock-answers"

type AnswerMap = Record<number, string>

interface SpeakingAnswer {
    questionId: number
    url: string
}

interface WritingAnswer {
    questionId: number
    response: string
}

interface MockAnswers {
    listening: AnswerMap
    reading: AnswerMap
    speaking: SpeakingAnswer[]
    writing: WritingAnswer[]
    scores?: Scores
}

interface WritingScore {
    task1?: number
    task2?: number
    overall?: number
}

interface Scores {
    reading?: number
    listening?: number
    writing?: WritingScore
    speaking?: SpeakingBandBreakdown
}

// populate local storage to store responses (reading | listening | speaking)
export function initializeMockAnswers() {
    if (typeof window === "undefined") return // SSR safety

    // initialize empty 1 to 40 answers
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
        const emptyAnswers: AnswerMap = {}
        for (let i = 1; i <= 40; i++) {
            emptyAnswers[i] = ""
        }

        const initialData: MockAnswers = {
            listening: { ...emptyAnswers },
            reading: { ...emptyAnswers },
            speaking: [],
            writing: [],
            scores: {
                listening: undefined,
                reading: undefined,
                writing: undefined,
                speaking: undefined,
            },
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    }
}

// to retrieve all data
export function getMockAnswers(): MockAnswers | null {
    if (typeof window === "undefined") return null

    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
}


// to store new answer (reading | listening)
export function updateMockAnswer(
    section: "listening" | "reading",
    questionNumber: number,
    answer: string
) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    data[section][questionNumber] = answer
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    // 🔁 Dispatch custom event
    // Event that forces Reading & Listening Pagination to re-render to show Attempted Answers
    // Dispatches a custom 'update-pagination' event to trigger UI re-renders (e.g., to highlight attempted questions)
    window.dispatchEvent(new Event("update-pagination"))
}

// get answer for paticualar field (reading | listening)
export function getFieldAnswer(section: "reading" | "listening", questionNumber: number): string {
    if (typeof window === "undefined") return "";

    const data = localStorage.getItem("mock-answers");
    if (!data) return "";

    const parsed = JSON.parse(data);
    return parsed?.[section]?.[questionNumber] || "";
}


// to store speaking answer (questionId + S3 URL)
export function updateSpeakingAnswer(questionId: number, url: string) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    // remove any existing answer with the same questionId
    const filtered = data.speaking.filter((entry) => entry.questionId !== questionId)

    data.speaking = [...filtered, { questionId, url }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    // 🔁 Dispatch custom event
    // Event that forces Reading & Listening Pagination to re-render to show Attempted Answers
    // Dispatches a custom 'update-pagination' event to trigger UI re-renders (e.g., to highlight attempted questions)
    window.dispatchEvent(new Event("update-pagination"))
}

export function updateWritingAnswer(questionId: number, response: string) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    const existing = data.writing || []
    const filtered = existing.filter((entry) => entry.questionId !== questionId)
    const updated = [...filtered, { questionId, response }]
    data.writing = updated

    localStorage.setItem("mock-answers", JSON.stringify(data))
}

export function clearMockAnswers() {
    if (typeof window === "undefined") return

    localStorage.removeItem("mock-answers")
}

// --------------- HANDLE SCORE UPDATIONS ---------------
export function updateSpeakingScore(score: SpeakingBandBreakdown) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    data.scores = {
        ...data.scores,
        speaking: score
    }

    localStorage.setItem("mock-answers", JSON.stringify(data))
}

export function updateListeningScore(score: number) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    data.scores = {
        ...data.scores,
        listening: score
    }

    localStorage.setItem("mock-answers", JSON.stringify(data))
}

export function updateReadingScore(score: number) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    data.scores = {
        ...data.scores,
        reading: score
    }

    localStorage.setItem("mock-answers", JSON.stringify(data))
}

export function updateWritingScore(
    task1: number | null,
    task2: number | null,
    overall: number | undefined
) {
    if (typeof window === "undefined") return

    const data = getMockAnswers()
    if (!data) return

    if (task1 == null || task2 == null || overall == null) return

    data.scores = {
        ...data.scores,
        writing: {
            task1,
            task2,
            overall,
        },
    }

    localStorage.setItem("mock-answers", JSON.stringify(data))
}