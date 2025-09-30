// _utils/buildListeningTest.ts

import { hashFilename } from "./hashFilename";
import { pickRandomBookAndTest } from "./pickRandomBookAndTest";

/**
 * Temporary fake answers generator.
 * In production this should be replaced with actual answer fetching logic
 * from the JSON payload or a backend service.
 *
 * @param questions - Array of test questions
 * @returns Array of fake answers, each mapped to a questionId
 */
function generateFakeAnswers(questions: any[]) {
    return questions.map((q, i) => ({
        questionId: q?.id ?? i + 1, // fallback to index if no id
        correct: Math.random() > 0.5 ? "Yes" : "No", // random stubbed value
    }));
}

/**
 * Build a full IELTS-style listening test.
 *
 * - Picks a random book + test combination (4 parts).
 * - Fetches all 4 JSON files and their corresponding MP3 audio files in parallel.
 * - Extracts and flattens all questions across the 4 parts.
 * - Generates placeholder answers (currently stubbed for development).
 *
 * @returns An object containing:
 *   - audioUrls: string[] (one MP3 URL per part)
 *   - questions: any[] (flattened list of test questions)
 *   - answers: any[] (fake answers for now)
 */
export async function buildListeningTest() {

    // 1. Pick random logical paths for 4 parts of a listening test
    const logicalPaths = pickRandomBookAndTest();

    // Derive testHash (assuming all 4 parts belong to the same test)
    // we be later used in storing answers given by the user
    // e.g. "book_20/test_2"
    const testPath = logicalPaths[0]
        .split("/")
        .slice(0, 2) // ["book_20", "test_2"]
        .join("/");

    // 2. Fetch JSON + MP3 for all 4 parts in parallel
    const allData = await Promise.all(
        logicalPaths.map(async (path) => {
            const { jsonUrl, mp3Url } = await hashFilename(path);
            const res = await fetch(jsonUrl, { cache: "no-store" });

            if (!res.ok) {
                throw new Error(`Failed to fetch JSON for path: ${jsonUrl}`);
            }

            const json = await res.json();
            return { mp3Url, json };
        })
    );

    // 3. Validate that all 4 lectures exist and are non-empty
    if (
        allData.length !== 4 ||
        allData.some(
            (d) =>
                !d.mp3Url ||
                !d.json?.data?.test_question ||
                d.json.data.test_question.length === 0
        )
    ) {
        throw new Error("Invalid listening test: one or more parts are missing audio/questions");
    }

    // 4. Flatten all test questions into one array
    const allQuestions = allData.map(
        (d) => d.json?.data?.test_question || []
    );

    // 5. Collect audio URLs (one per lecture/part)
    const audioUrls = allData.map((d) => d.mp3Url);

    // 6. Generate stubbed answers (replace with real logic later)
    const answers = generateFakeAnswers(allQuestions);

    return {
        audioUrls,
        questions: allQuestions,
        answers,
        testPath
    };
}