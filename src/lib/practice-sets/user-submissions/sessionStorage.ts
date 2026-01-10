// lib/practiceSetsStorage.ts
// -------------------------------------------------
// 📌 This module manages *Practice Sets* state
// stored in sessionStorage. Unlike mock tests (localStorage),
// practice sets reset when the browser session ends.
//
// Keys (per section): 
//   - "practice-sets-listening"      → user answers
//   - "practice-sets-listening-correct" → correct answers (from S3)
//   - "practice-sets-reading"        → user answers (future)
//   - "practice-sets-reading-correct"   → correct answers (future)
//
// Data structure: AnswerMap = { [questionNumber: number]: string }
// -------------------------------------------------

type PracticeSetSection = "practice-sets-listening" | "practice-sets-reading"
type AnswerMap = Record<number, string>

// -------------------------------------------------------------------
// Initialize empty user answers (listening or reading) (FORCED RESET)
// -------------------------------------------------------------------
export function initializePracticeSet(section: PracticeSetSection, totalQuestions: number = 40) {
    if (typeof window === "undefined") return

    const emptyAnswers: AnswerMap = {}

    for (let i = 1; i <= totalQuestions; i++) {
        emptyAnswers[i] = ""
    }

    sessionStorage.setItem(section, JSON.stringify(emptyAnswers))
}

// -------------------------------------------------
// Retrieve ALL user answers
// -------------------------------------------------
export function getPracticeSetAnswers(section: PracticeSetSection): AnswerMap | null {
    if (typeof window === "undefined") return null

    const data = sessionStorage.getItem(section)
    return data ? JSON.parse(data) : null
}

// -------------------------------------------------
// Retrieve a SINGLE user answer
// -------------------------------------------------
export function getPracticeSetAnswer(section: PracticeSetSection, questionNumber: number): string {
    if (typeof window === "undefined") return ""

    const data = getPracticeSetAnswers(section)
    return data?.[questionNumber] || ""
}

// -------------------------------------------------
// Update a SINGLE user answer
// -------------------------------------------------
export function updatePracticeSetAnswer(
    section: PracticeSetSection,
    questionNumber: number,
    answer: string
) {
    if (typeof window === "undefined") return

    const data = getPracticeSetAnswers(section)
    if (!data) return

    data[questionNumber] = answer
    sessionStorage.setItem(section, JSON.stringify(data))

    // 🔁 Dispatch event → lets UI know answers changed
    window.dispatchEvent(new Event("update-practice-set"))
}

// -------------------------------------------------
// Clear ALL user answers
// -------------------------------------------------
export function clearPracticeSetAnswers(section: PracticeSetSection) {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(section)
}

// =================================================
// ✅ NEW: Correct Answers (from S3)
// =================================================

// Store correct answers fetched from S3
export function storePracticeSetCorrectAnswers(
    section: PracticeSetSection,
    answers: AnswerMap
) {
    if (typeof window === "undefined") return

    sessionStorage.setItem(`${section}-correct`, JSON.stringify(answers))

    // 🔔 Custom event → so AnswerInput can subscribe
    window.dispatchEvent(
        new CustomEvent("practice-set-correct-answers", {
            detail: { answers },
        })
    )
}

// Retrieve ALL correct answers
export function getPracticeSetCorrectAnswers(section: PracticeSetSection): AnswerMap | null {
    if (typeof window === "undefined") return null

    const data = sessionStorage.getItem(`${section}-correct`)
    return data ? JSON.parse(data) : null
}

// Retrieve a SINGLE correct answer
export function getPracticeSetCorrectAnswer(section: PracticeSetSection, questionNumber: number): string {
    if (typeof window === "undefined") return ""

    const data = getPracticeSetCorrectAnswers(section)
    return data?.[questionNumber] || ""
}

// Clear stored correct answers
export function clearPracticeSetCorrectAnswers(section: PracticeSetSection) {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(`${section}-correct`)
}


// =================================================
// 🎙️ SPEAKING ANSWERS (for Practice Sets)
// =================================================

interface PracticeSpeakingAnswer {
    questionId: number
    url: string
}

const PRACTICE_SPEAKING_KEY = "practice-sets-speaking"

// Initialize empty (FORCED RESET) speaking answers
export function initializePracticeSetSpeaking() {
    if (typeof window === "undefined") return

    const initialData: PracticeSpeakingAnswer[] = []

    // initialize with an empty array, same as mock answers
    // question IDs will be added dynamically later as user records
    sessionStorage.setItem(PRACTICE_SPEAKING_KEY, JSON.stringify(initialData))

    console.log("🆕 Initialized practice-sets-speaking in sessionStorage")
}

// Retrieve all speaking answers
export function getPracticeSetSpeakingAnswers(): PracticeSpeakingAnswer[] {
    if (typeof window === "undefined") return []
    const data = sessionStorage.getItem(PRACTICE_SPEAKING_KEY)
    return data ? JSON.parse(data) : []
}

// Retrieve a single speaking answer by questionId
export function getPracticeSpeakingAnswer(questionId: number): PracticeSpeakingAnswer | null {
    if (typeof window === "undefined") return null
    const data = getPracticeSetSpeakingAnswers()
    return data.find((entry) => entry.questionId === questionId) || null
}

// Update (add or replace) a speaking answer
export function updatePracticeSetsSpeakingAnswer(questionId: number, url: string) {
    if (typeof window === "undefined") return

    const existing = getPracticeSetSpeakingAnswers()

    // remove any existing answer with the same questionId
    const filtered = existing.filter((entry) => entry.questionId !== questionId)
    const updated = [...filtered, { questionId, url }]

    sessionStorage.setItem(PRACTICE_SPEAKING_KEY, JSON.stringify(updated))

    // 🔁 Dispatch custom event
    // Event that forces Reading & Listening & Writing & Speaking Pagination to re-render to show Attempted Answers
    // Dispatches a custom 'update-pagination' event to trigger UI re-renders (e.g., to highlight attempted questions)
    window.dispatchEvent(new Event("update-pagination"))
}

// Clear all speaking answers
export function clearPracticeSpeakingAnswers() {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(PRACTICE_SPEAKING_KEY)
}

// =====================================================
// 🏆 STORE SPEAKING BAND SCORES (EXCLUSIVE FOR SPEKAING)
// =====================================================

interface PracticeSpeakingScores {
    lexical_resource: number
    fluency_and_coherence: number
    pronunciation: number
    grammatical_range_and_accuracy: number
    overall_band: number
}

const PRACTICE_SPEAKING_SCORES_KEY = "practice-sets-speaking-scores"

// Store scores only during practice sessions
export function storePracticeSetsSpeakingScores(scores: PracticeSpeakingScores) {
    if (typeof window === "undefined") return

    sessionStorage.setItem(PRACTICE_SPEAKING_SCORES_KEY, JSON.stringify(scores))

    console.log("💾 Stored practice speaking scores:", scores)
}

// Retrieve stored speaking scores
export function getPracticeSetsSpeakingScores(): PracticeSpeakingScores | null {
    if (typeof window === "undefined") return null
    const data = sessionStorage.getItem(PRACTICE_SPEAKING_SCORES_KEY)
    return data ? JSON.parse(data) : null
}

// Clear scores (when user restarts a new practice set)
export function clearPracticeSetsSpeakingScores() {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(PRACTICE_SPEAKING_SCORES_KEY)
}



