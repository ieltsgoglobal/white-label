// _utils/buildListeningTest.ts

import { hashFilename } from "../../_utils/hashFilename";
import { pickRandomBookAndTest } from "../../_utils/pickRandomBookAndTest";
import { sanitizeListeningAnswers } from "./misc";

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

    // 4. Map all test questions into one array
    const allQuestions = allData.map(
        (d) => d.json?.data?.test_question || []
    );

    // 5. Collect audio URLs (one per lecture/part)
    const audioUrls = allData.map((d) => d.mp3Url);

    // Now configuring the ALL 40 ANSWERS FILE
    // 6. neeed to add json cuz thats how the hashing is configured from starting
    const { answerFileUrl } = await hashFilename(`${testPath}.json`);

    // 7. Fetch answers JSON, Didnt run through loop as this file has all 40 answers
    let answers: any[] = [];
    try {
        const res = await fetch(answerFileUrl, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`Failed to fetch answers for: ${answerFileUrl}`);
        }
        const answersJson = await res.json();
        answers = sanitizeListeningAnswers(answersJson);

    } catch (err) {
        console.error("⚠️ Could not fetch answers:", err);
    }


    // Returned object includes:
    // - audioUrls: string[4]  → one audio file per part (10 Qs each)
    // - questions: Question[] → Map array of 40 questions (10 from each part)
    // - answers: String[]     → all 40 correct answers for the test
    // - testPath: string      → unique identifier for the test (e.g. "book_20/test_2")
    return {
        audioUrls,
        questions: allQuestions,
        answers,
        testPath
    };
}