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

// -------------------------------------------------
// Initialize empty user answers (listening or reading)
// -------------------------------------------------
export function initializePracticeSet(section: PracticeSetSection, totalQuestions: number = 40) {
    if (typeof window === "undefined") return

    const existing = sessionStorage.getItem(section)
    if (!existing) {
        const emptyAnswers: AnswerMap = {}
        for (let i = 1; i <= totalQuestions; i++) {
            emptyAnswers[i] = ""
        }
        sessionStorage.setItem(section, JSON.stringify(emptyAnswers))
    }
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