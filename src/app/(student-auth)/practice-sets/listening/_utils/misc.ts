/**
 * Flatten nested answers JSON into a string[40].
 * - Preserves order (1 → 40).
 * - Strips whitespace around variants.
 * - Keeps the full "variant string" (you can later split by "|" for checking).
 *
 * @param answersJson - The raw JSON object with book/test/parts structure
 * @returns string[] - Array of answers (index 0 = Q1, index 39 = Q40)
 */
export function sanitizeListeningAnswers(answersJson: any): string[] {
    if (!answersJson?.parts) return [];

    // Flatten all parts → array of { question_id, correct_answer }
    const flat: { question_id: string; correct_answer: string }[] = Object.values(
        answersJson.parts
    ).flat() as any[];

    // Ensure they are sorted by numeric question_id
    flat.sort(
        (a, b) => Number(a.question_id) - Number(b.question_id)
    );

    // Map into string[] with trim
    return flat.map((item) => item.correct_answer.trim());
}



export type AttemptWithCorrectAnswers = {
    user: string;
    correct: string;
};

/**
 * Convert an array of attempts into an object keyed by question number.
 *
 * Example:
 * Input:
 *   [
 *     { user: "apple", correct: "apple" },
 *     { user: "dog", correct: "cat" }
 *   ]
 *
 * Output:
 *   {
 *     "1": { user: "apple", correct: "apple" },
 *     "2": { user: "dog", correct: "cat" }
 *   }
 *
 * @param attempts - Array of user attempts with correct answers
 * @returns Record<string, AttemptWithCorrectAnswers>
 */
export function transformAnswerAttemptsToJson(
    attempts: AttemptWithCorrectAnswers[]
): Record<string, AttemptWithCorrectAnswers> {
    return attempts.reduce((acc, attempt, idx) => {
        acc[(idx + 1).toString()] = attempt;
        return acc;
    }, {} as Record<string, AttemptWithCorrectAnswers>);
}



import { AnswerMap } from "@/types/mockTestAttempt"
/**
 * -------------------------------------------------
 * 📌 normalizeAnswers
 * -------------------------------------------------
 * Converts a plain array of answers (index-based)
 * into a 1-based, string-keyed AnswerMap object.
 *
 * Example:
 *   Input:  ["a", "b", "c"]
 *   Output: { "1": "a", "2": "b", "3": "c" }
 *
 * @param arr - Array of answers in order
 * @returns AnswerMap - Keys are "1"..."N", values are strings
 */
export function normalizePracticeSetsAnswers(arr: string[]): AnswerMap {
    return Object.fromEntries(
        arr.map((ans, i) => [(i + 1).toString(), ans]) // force string keys
    )
}

