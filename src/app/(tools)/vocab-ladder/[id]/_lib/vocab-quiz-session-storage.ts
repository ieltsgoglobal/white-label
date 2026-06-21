type Quiz = {
    id: string
    questions: {
        id: number
        word: string
        options: string[]
        correctAnswer: string
        explanation: string
    }[]
}
export type QuizQuestionProgress = {
    id: number
    word: string
    options: string[]
    correctAnswer: string
    explanation: string

    encountered: number

    selectedAnswer?: string
    isCorrect?: boolean
}

export type QuizSetSession = {
    quizId: string
    currentQuestionIndex: number
    questions: QuizQuestionProgress[]
}

type SubmitQuizQuestionAnswerResult = {
    isCorrect: boolean
    correctAnswer: string
    explanation: string
}

// ==========================================
// ========= QUIZ STORAGE LOGIC  ============
// ==========================================


const QUIZ_SET_SESSION_KEY = "quiz-set-session-storage-igg"

// used while init the quiz
// used when page is reloaded
export const createVocabQuizSetSession = (quiz: Quiz): QuizSetSession => {
    const session: QuizSetSession = {
        quizId: quiz.id,
        currentQuestionIndex: 0,
        questions: quiz.questions.map((question) => ({
            ...question,
            encountered: 0,
        })),
    }

    saveQuizSetSession(session)

    return session
}

// updates the nodes data in localstorage
const saveQuizSetSession = (session: QuizSetSession) => {
    sessionStorage.setItem(QUIZ_SET_SESSION_KEY, JSON.stringify(session))
}

const getQuizSetSession = (): QuizSetSession | null => {
    const raw = sessionStorage.getItem(QUIZ_SET_SESSION_KEY)

    return raw ? JSON.parse(raw) : null
}

// used in progress bar
export const VocabQuizSetGetTotalAndCorrectQuestion = () => {
    const session = getQuizSetSession()

    if (!session) { return { total: 0, correct: 0 } }

    return {
        totalQuestions: session.questions.length,
        correctAnswers: session.questions.filter((question) => question.isCorrect === true).length,
    }
}

// =====================================
// ========= MAIN QUIZ LOGIC  ==========
// =====================================

// used to get new question which is not marked as correct
// hack: we dont need to main another array for wrong answers duh
export const getRandomVocabQuestionWhichIsNotCorrect = () => {
    const session = getQuizSetSession()

    if (!session) return null

    const availableQuestions = session.questions.filter((question) => question.isCorrect !== true)

    if (availableQuestions.length === 0) { return null }

    // randomize and shuffle options while fetching the question
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    return { ...question, options: [...question.options].sort(() => Math.random() - 0.5) }
}

// when use press submit for any vocab question
// window event listner is for progress bar
export const submitVocabQuizQuestionAnswer = (questionId: number, selectedAnswer: string): SubmitQuizQuestionAnswerResult | null => {
    const session = getQuizSetSession()

    if (!session) return null

    const question = session.questions.find((question) => question.id === questionId)

    if (!question) return null

    const isCorrect = selectedAnswer === question.correctAnswer

    question.selectedAnswer = selectedAnswer
    question.isCorrect = isCorrect
    question.encountered += 1

    saveQuizSetSession(session)

    // used to update the quiz progress bar 
    // used in quiz-progress-bar.tsx
    window.dispatchEvent(new CustomEvent("used-to-update-quiz-progress-bar"))

    return { isCorrect, correctAnswer: question.correctAnswer, explanation: question.explanation }
}