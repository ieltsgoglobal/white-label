// lib/mock-tests/writing/evaluateWriting.ts

import { updateWritingAnswer, updateWritingScore } from "../mockAnswersStorage"

export async function evaluateWriting(writingQuestions: { id: number }[], responses: Record<number, string>) {
    let task1Score: number | null = null
    let task2Score: number | null = null

    // loop thorugh responses 1 and 2
    for (const q of writingQuestions) {
        const userResponse = responses[q.id]

        // if nothing in text then check 2nd task
        // push "" response in localStorage
        if (!userResponse.trim()) {
            updateWritingAnswer(q.id, "")
            continue
        }

        // store user answer attempt in localStorage
        updateWritingAnswer(q.id, userResponse)

        const score: number | undefined = await submitTask(q.id, userResponse)

        // Assign based on ID or position
        // Assign values after rounding them to nearest .5
        if (writingQuestions.indexOf(q) === 0) {
            task1Score = score != null ? Math.round(score * 2) / 2 : null
        } else {
            task2Score = score != null ? Math.round(score * 2) / 2 : null
        }
    }

    // if any score is null means user has not attempted OR grok AI evaluation not working
    // if task 1 is null, set task1score = 0
    // if task 2 is null, set task2score = 0
    if (task1Score === null) task1Score = 0
    if (task2Score === null) task2Score = 0


    // calculate overall score (task1 20mins & task2 40mins)
    let overall: number | undefined
    if (task1Score != null && task2Score != null) {
        overall = Math.round(((task1Score * 1 + task2Score * 2) / 3) * 2) / 2 // round to nearest 0.5
    }

    updateWritingScore(task1Score, task2Score, overall)
}

// get evaluation result and store it in localstorage
const submitTask = async (questionId: number, response: string) => {
    try {
        const res = await fetch("/api/writing-evaluation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskType: questionId,
                response,
            }),
            credentials: 'include',
        })

        const data = await res.json()

        // Extract score from JSON string (example: `{"overall_score": 7.5}`)
        // overall_score means avg of lexical, grammar ,coherence ...
        let score: number | undefined
        try {
            const parsed = JSON.parse(data.result)
            score = parsed.overall_score
        } catch (err) {
            console.error("Failed to parse evaluation result:", err)
        }

        return score

    } catch (err) {
        console.error(`Failed to evaluate task ${questionId}:`, err)
    }
}
