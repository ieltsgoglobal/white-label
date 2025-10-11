/**
 * Builds a unified JSON object containing the user's writing task responses
 * along with their evaluated scores and overall performance.
 *
 * This function is purely responsible for **data transformation** — 
 * it combines the raw user responses with their computed scores and returns
 * a structured JSON ready to be inserted into the database or used for analytics.
 *
 * @param responses - Object holding user's text responses for each writing task.
 *                    Example: { 1: "Essay text for Task 1", 2: "Essay text for Task 2" }
 * @param userWritingResults - Object containing evaluated band scores for each task
 *                             and the overall score.
 *                             Example: { task1Score: 7.0, task2Score: 6.5, overall: 6.75 }
 *
 * @returns JSON object in the shape expected by the DB column `user_responses_with_scores`.
 *          Example:
 *          {
 *            task_1: { response: "Essay text...", score: 7.0 },
 *            task_2: { response: "Another essay...", score: 6.5 },
 *            overall: 6.75
 *          }
 */
export function buildUserResponsesWithScores(responses: any, userWritingResults: any) {
    return {
        task_1: {
            response: responses[1],
            score: userWritingResults.task1Score,
        },
        task_2: {
            response: responses[2],
            score: userWritingResults.task2Score,
        },
        overall: userWritingResults.overall,
    };
}