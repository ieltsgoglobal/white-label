import { getMockAnswers, updateListeningScore } from "../mockAnswersStorage"

type AnswerMap = Record<number, string>

interface ListeningComparison {
    userAnswers: AnswerMap
    realAnswers: AnswerMap
}

export async function evaluateListening(test_id: string) {
    const { userAnswers, realAnswers } = await getListeningComparison(test_id)

    // score = 0-40
    // band = 0-9

    const score = compareListeningAnswers(userAnswers, realAnswers)
    const band = calculateListeningBand(score)

    // store listeing band in localstorage
    updateListeningScore(band)

    console.log(userAnswers)
    console.log(realAnswers)

}

// get user attempt and actual answers
async function getListeningComparison(test_id: string): Promise<ListeningComparison> {
    let userAnswers: AnswerMap = {}
    let realAnswers: AnswerMap = {}

    // 1. Load user answers
    // 1. Load user answers
    const data = getMockAnswers()
    if (data?.listening) {
        userAnswers = Object.fromEntries(
            Object.entries(data.listening).filter(([, val]) => val.trim() !== "")
        )
    }

    // 2. Load real answers from `listeing_answers`
    try {
        const module = await import(`@/app/data/tests/test-${test_id}`)
        realAnswers = module.listening_answers || {}
    } catch (err) {
        console.error("Failed to load listening answers:", err)
    }

    return { userAnswers, realAnswers }
}

// compare user attempts and correct answers and calculate 0-9 score
function compareListeningAnswers(userAnswers: AnswerMap, realAnswers: AnswerMap): number {
    let correctCount = 0 // correct answer count

    for (const [idStr, correctAns] of Object.entries(realAnswers)) {
        const qid = Number(idStr)
        const userAns = (userAnswers[qid] || "").trim().toLowerCase()
        const real = correctAns.trim().toLowerCase()

        if (userAns === real) {
            correctCount++
        }
    }

    return correctCount
}

// 📊 Convert correct count to approximate IELTS band
function calculateListeningBand(score: number): number {
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