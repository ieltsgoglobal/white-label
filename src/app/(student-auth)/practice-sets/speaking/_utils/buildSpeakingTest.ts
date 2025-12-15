import { getPracticeSetsSpeakingSubmissions } from "@/lib/postgress-aws/helper-functions/practice-sets/user-submissions";
import { hashFilename } from "../../_utils/hashFilename";
import { pickRandomBookAndTest } from "../../_utils/pickRandomBookAndTest";
import { convertSpeakingData } from "./convertSpeakingData";

export async function buidSpeakingTest() {

    // Get all the already attempted questions by user
    const exclude_test_paths = await getPracticeSetsSpeakingSubmissions({ returnOnlyTestPaths: true })

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
    const { speakingQuestionsWithAudioUrlJsonUrl } = await hashFilename(`${testPath}.json`);

    let speakingQuestionWithAudioUrl;

    try {
        // ---------------------------------------------
        // ------ FETCH QUESITONS w/ AUDIO URL ---------
        // ---------------------------------------------

        const resQ = await fetch(speakingQuestionsWithAudioUrlJsonUrl, { cache: "no-store" });
        if (!resQ.ok)
            throw new Error(`❌ Failed to fetch speaking data: ${speakingQuestionsWithAudioUrlJsonUrl}`);

        const dataQ = await resQ.json();

        speakingQuestionWithAudioUrl = convertSpeakingData(dataQ);

    }
    catch (err) {
        console.error(err);
    }


    // returning format mentioned in convertSpeakingData()
    return {
        speakingQuestionWithAudioUrl
    }
}