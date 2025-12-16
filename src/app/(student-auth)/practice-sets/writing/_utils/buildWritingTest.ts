import { getPracticeSetsWritingSubmissions } from "@/lib/postgress-aws/helper-functions/practice-sets/user-submissions";
import { hashFilename } from "../../_utils/hashFilename";
import { pickRandomBookAndTest } from "../../_utils/pickRandomBookAndTest";

export async function buildWritingTest() {


    // Get all the already attempted questions by user
    const exclude_test_paths = await getPracticeSetsWritingSubmissions({ returnOnlyTestPaths: true })

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
    const { writingQuestionsWithSampleAnswersJsonUrl } = await hashFilename(`${testPath}.json`);
    const { writingQuestionsTask1ImageUrl } = await hashFilename(`${testPath}.jpg`);

    let writingQuestions;
    let sampleAnswers;

    try {
        // ---------------------------------------------
        // ------ FETCH QUESITONS w/ SAMPLE ANS --------
        // ---------------------------------------------

        const resQ = await fetch(writingQuestionsWithSampleAnswersJsonUrl, { cache: "no-store" });
        if (!resQ.ok)
            throw new Error(`❌ Failed to fetch writing data: ${writingQuestionsWithSampleAnswersJsonUrl}`);

        const dataQ = await resQ.json();

        /**
          * Expected JSON format:
          * {
          *   "task_1": {
          *     "data": {
          *       "test_text": {
          *         "title": "Consumer Durables in Britain",
          *         "requirement": ["The table below shows ..."],
          *         "sample": ["The table illustrates ..."]
          *       }
          *     }
          *   },
          *   "task_2": {
          *     "data": {
          *       "test_text": {
          *         "title": "Fatherhood and Motherhood",
          *         "requirement": ["‘Fatherhood ought to be ..."],
          *         "sample": ["The notion that parenting ..."]
          *       }
          *     }
          *   }
          * }
          */
        writingQuestions = {
            task1: dataQ.task_1.data.test_text,
            task2: dataQ.task_2.data.test_text,
        };
        sampleAnswers = {
            task1: writingQuestions.task1.sample,
            task2: writingQuestions.task2.sample,
        };
    }
    catch (err) {
        console.error(err);
    }


    // returning format:
    // writingQuestions: {
    //     task1: { title, requirement[], sample[] },
    //     task2: { title, requirement[], sample[] },
    // },
    // sampleAnswers: {
    //     task1: string[],
    //     task2: string[]
    // }
    return {
        writingQuestions,
        sampleAnswers,
        writingQuestionsTask1ImageUrl,
        testPath
    }
}