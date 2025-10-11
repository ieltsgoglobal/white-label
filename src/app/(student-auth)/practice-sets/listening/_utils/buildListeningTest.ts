// _utils/buildListeningTest.ts

import test from "node:test";
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



    // ------------------------------------------------
    // ---------------- GET AUDIO URLS ----------------
    // ------------------------------------------------

    const allData = await Promise.all(
        logicalPaths.map(async (path) => {
            const { ListeningQuestionsMP3Url } = await hashFilename(path);
            return { ListeningQuestionsMP3Url };
        })
    );

    const audioUrls = allData.map((d) => d.ListeningQuestionsMP3Url);



    // ------------------------------------------------
    // --------------- FETCH QUESTIONS ----------------
    // ------------------------------------------------

    const { ListeningQuestionsJsonUrl } = await hashFilename(testPath + ".json");

    let questions: any[][] = [];

    try {
        const resQ = await fetch(ListeningQuestionsJsonUrl, { cache: "no-store" });
        if (!resQ.ok) {
            throw new Error(`Failed to fetch questions for: ${ListeningQuestionsJsonUrl}`);
        }
        const dataQ = await resQ.json();

        /**
         * Expected JSON structure:
         * {
         *   "book": "book_11",
         *   "test": "test_3",
         *   "parts": {
         *     "part_1": { "data": { "test_question": [...] }, ... },
         *     "part_2": { "data": { "test_question": [...] }, ... },
         *     "part_3": { "data": { "test_question": [...] }, ... },
         *     "part_4": { "data": { "test_question": [...] }, ... }
         *   }
         * }
         */
        const partKeys = ["part_1", "part_2", "part_3", "part_4"];
        questions = partKeys.map((key) => {
            const part = dataQ.parts?.[key];
            return part?.data?.test_question || [];
        });

    } catch (err) {
        console.error("⚠️ Could not fetch questions:", err);
    }



    // ------------------------------------------------
    // -- ANSWERS FILE (all 40 answers in one file) --
    // ------------------------------------------------

    const { ListeningAnswerFileUrl } = await hashFilename(`${testPath}.json`);

    let answers: any[] = [];

    try {
        const resA = await fetch(ListeningAnswerFileUrl, { cache: "no-store" });
        if (!resA.ok) {
            throw new Error(`Failed to fetch answers for: ${ListeningAnswerFileUrl}`);
        }
        const answersJson = await resA.json();
        answers = sanitizeListeningAnswers(answersJson);

    } catch (err) {
        console.error("⚠️ Could not fetch answers:", err);
    }


    // Returned object includes:
    // - audioUrls: string[4]  → one audio file per part (10 Qs each)
    // - questions: Question[][] → Map array of 40 questions (4x10)
    // - answers: String[]     → all 40 correct answers for the test
    // - testPath: string      → unique identifier for the test (e.g. "book_20/test_2")
    return {
        audioUrls,
        questions,
        answers,
        testPath
    };
}