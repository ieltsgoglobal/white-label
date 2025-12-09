import { hashFilename } from "../../_utils/hashFilename";
import { sanitizeReadingAnswers } from "../../listening/_utils/misc";
import { pickRandomBookAndTest } from "../../_utils/pickRandomBookAndTest";
import { getPracticeSetsReadingSubmissions } from "@/lib/postgress-aws/helper-functions/practice-sets/user-submissions";

/**
 * Build a full IELTS-style reading test.
 *
 * Returns:
 *  - `questions`: array of question blocks (task_1, task_2, task_3)
 *  - `passages`: array of reading passages (task_1, task_2, task_3)
 *  - `testPath`: unique test identifier like "book_10/test_3"
 */
export async function buildReadingTest() {

    // Get all the already attempted questions by user
    const exclude_test_paths = await getPracticeSetsReadingSubmissions("10000000-0000-0000-0000-000000000001", true)

    // 1️⃣ Pick a random reading test from available logical paths
    const logicalPaths = pickRandomBookAndTest(exclude_test_paths.map(r => r.test_path));

    // 2️⃣ Derive a canonical testPath (used for find reading questions from s3 bucket)
    // Example: "book_10/test_3"
    const testPath = logicalPaths[0]
        .split("/")
        .slice(0, 2)
        .join("/");

    // 3️⃣ Generate hashed URL for the reading questions JSON file
    // This ensures a deterministic path that matches the S3 reading bucket
    // we add .json as that is how the files were stores when uploaded to S3 initially
    const { readingQuestionsJsonUrl, readingPassagesJsonUrl } = await hashFilename(`${testPath}.json`);

    let questions = [];
    let passages = [];
    let answers: string[] = [];

    try {
        // ---------------------------------------------
        // ------------- FETCH QUESITONS ---------------
        // ---------------------------------------------
        const resQ = await fetch(readingQuestionsJsonUrl, { cache: "no-store" })
        if (!resQ.ok) throw new Error(`❌ Failed to fetch questions: ${readingQuestionsJsonUrl}`)
        const dataQ = await resQ.json()


        // 5️⃣ Extract all questions from the first task (for now)
        // The JSON structure looks like:
        // parts: {
        //   task_1: { code: 2000, data: { test_question: [...] }, msg: "OK" },
        //   task_2: { ... },
        //   task_3: { ... }
        // }
        //
        // ✅ This line grabs all test_question items inside task_1
        const partsQ = dataQ?.parts ?? {}
        questions[0] = partsQ?.task_1?.data?.test_question ?? []
        questions[1] = partsQ?.task_2?.data?.test_question ?? []
        questions[2] = partsQ?.task_3?.data?.test_question ?? []

        // ---------------------------------------------
        // -------------- FETCH PASSAGES ---------------
        // ---------------------------------------------
        const resP = await fetch(readingPassagesJsonUrl, { cache: "no-store" })
        if (!resP.ok) throw new Error(`❌ Failed to fetch passages: ${readingPassagesJsonUrl}`)
        const dataP = await resP.json()

        passages = dataP ?? []

        // ---------------------------------------------
        // -------- FETCH ANSWERS (LOCAL FILE) ---------
        // ---------------------------------------------
        const [bookId, testId] = testPath.match(/\d+/g)!.map(Number);
        const localAnswers = await import(
            `@/app/data/practice-questions/reading/answers/10_to_20__answers.json`
        );
        const raw_answers = (localAnswers.default || localAnswers).filter(
            (a: { book_id: number; test_id: number }) =>
                a.book_id === bookId && a.test_id === testId
        );
        answers = sanitizeReadingAnswers(raw_answers);

    } catch (err) {
        console.error("⚠️ Could not fetch reading questions:", err);
    }

    // 6️⃣ Return a consistent test structure
    // Future: you can expand this to include all 3 tasks like the listening builder.
    return {
        questions,
        passages,
        answers,
        testPath
    };
}