import { checkAnswerAcceptable } from "../listening/checkAnswerAcceptable"
import { getMockAnswers, updateReadingScore } from "../mockAnswersStorage"

type AnswerMap = Record<number, string>

interface ReadingComparison {
    userAnswers: AnswerMap
    realAnswers: AnswerMap
}

export async function evaluateReading(test_id: string) {
    const { userAnswers, realAnswers } = await getReadingComparison(test_id)

    // score = 0-40
    // band = 0-9

    const score = compareReadingAnswers(userAnswers, realAnswers)
    const band = calculateReadingBand(score)

    // store reading band in localstorage
    updateReadingScore(band)

}

// get user attempt and actual answers
async function getReadingComparison(test_id: string): Promise<ReadingComparison> {
    let userAnswers: AnswerMap = {}
    let realAnswers: AnswerMap = {}

    // 1. Load user answers
    const data = getMockAnswers()
    if (data?.reading) {
        userAnswers = Object.fromEntries(
            Object.entries(data.reading).filter(([, val]) => val.trim() !== "")
        )
    }

    // 2. Load real answers from `reading_answers`
    try {
        const module = await import(`@/app/data/tests/test-${test_id}`)
        realAnswers = module.reading_answers || {}
    } catch (err) {
        console.error("Failed to load reading answers:", err)
    }


    return { userAnswers, realAnswers }
}

// compare user attempts and correct answers and calculate 0-9 score
function compareReadingAnswers(userAnswers: AnswerMap, realAnswers: AnswerMap): number {
    let correctCount = 0 // correct answer count

    for (const [idStr, correctAns] of Object.entries(realAnswers)) {
        const qid = Number(idStr)
        const userAns = (userAnswers[qid] || "").trim().toLowerCase()

        if (checkAnswerAcceptable(userAns, correctAns)) {
            correctCount++
        }
    }

    return correctCount
}

// 📊 Convert correct count to approximate IELTS band
function calculateReadingBand(score: number): number {
    if (score >= 39) return 9
    if (score >= 37) return 8.5
    if (score >= 35) return 8
    if (score >= 32) return 7.5
    if (score >= 30) return 7
    if (score >= 26) return 6.5
    if (score >= 23) return 6
    if (score >= 18) return 5.5
    if (score >= 16) return 5
    if (score >= 13) return 4.5
    if (score >= 10) return 4
    if (score >= 7) return 3.5
    if (score >= 5) return 3
    if (score >= 3) return 2.5
    return 0
}