export interface SpeakingAnswer {
    questionId: number
    url: string
}

export interface WritingAnswer {
    questionId: number
    response: string
}

export interface BandScores {
    lexical_resource: number
    fluency_and_coherence: number
    pronunciation: number
    grammatical_range_and_accuracy: number
    overall_band: number
}

export interface WritingScore {
    task1: number
    task2: number
    overall: number
}

export interface Scores {
    speaking: BandScores
    writing: WritingScore
    listening: number
    reading: number
}

export interface AnswerMap {
    [questionId: string]: string
}

export interface MockTestAttempt {
    id: string
    testId: string
    timestamp: string
    listening: AnswerMap
    reading: AnswerMap
    speaking: SpeakingAnswer[]
    writing: WritingAnswer[]
    scores: Scores
}