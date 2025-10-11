// src/lib/mock-tests/writing/formatPracticeWritingQuestions.ts

export interface WritingTask {
    id: number
    timeLimit: string
    wordLimit: string
    prompt: string[]
    image_url?: string
}

/**
 * Converts practice-set style writingQuestions object ({task1, task2})
 * into an array format compatible with evaluateWriting() which we use in like mock test evaluation.
 */
export function formatPracticeWritingQuestions(writingQuestions: any, writingQuestionsTask1ImageUrl: string): WritingTask[] {
    if (!writingQuestions) return []

    const task1 = writingQuestions.task1
    const task2 = writingQuestions.task2

    const formatted: WritingTask[] = [
        {
            id: 1,
            timeLimit: "20 minutes",
            wordLimit: "(150 words minimum)",
            prompt: Array.isArray(task1.requirement) ? task1.requirement : [task1.requirement],
            image_url: writingQuestionsTask1ImageUrl ?? "",
        },
        {
            id: 2,
            timeLimit: "40 minutes",
            wordLimit: "(250 words minimum)",
            prompt: Array.isArray(task2.requirement) ? task2.requirement : [task2.requirement],
        },
    ]

    return formatted
}