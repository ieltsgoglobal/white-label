// _utils/hashFilename.ts

/**
 * Generate a deterministic, hashed version of a filename.
 * - Uses SHA-256 on (salt + pathStr) for uniqueness & security
 * - Preserves the original file extension (like Python's os.path.splitext)
 *
 * @param pathStr - The original filename or path
 * @param salt - Optional salt to avoid predictable hashes
 * @returns A hex-encoded hash string with the original file extension
 */
export async function hashFilename(
    pathStr: string,
    salt = "cb92f213-0396-4a54-a9cf-ad20a69f882e"
): Promise<{ ListeningQuestionsJsonUrl: string; ListeningQuestionsMP3Url: string; ListeningAnswerFileUrl: string, readingQuestionsJsonUrl: string; readingPassagesJsonUrl: string, writingQuestionsWithSampleAnswersJsonUrl: string, writingQuestionsTask1ImageUrl: string }> {
    // Encode input as Uint8Array for hashing
    // Concatenate the salt with the input filename to avoid collisions/attacks
    const encoder = new TextEncoder();

    // ---------- MP3 ----------
    // book_10/test_3/part_1.mp3 ------>> hash.mp3
    const mp3LogicalPath = pathStr.replace(/\.json$/, ".mp3");
    const dataMp3 = encoder.encode(salt + mp3LogicalPath);
    const hashBufferMp3 = await crypto.subtle.digest("SHA-256", dataMp3);
    const hashArrayMp3 = Array.from(new Uint8Array(hashBufferMp3));
    const hashHexMp3 = hashArrayMp3.map((b) => b.toString(16).padStart(2, "0")).join("");
    const mp3Name = hashHexMp3 + ".mp3";


    // ---------- ANSWERS ----------
    // book_10/test_3.json ------>> hash.json
    const answersLogicalPath = pathStr.replace(/\.json$/, ".json");
    const dataAnswers = encoder.encode(salt + answersLogicalPath);
    const hashBufferAnswers = await crypto.subtle.digest("SHA-256", dataAnswers);
    const hashArrayAnswers = Array.from(new Uint8Array(hashBufferAnswers));
    const hashHexAnswers = hashArrayAnswers.map((b) => b.toString(16).padStart(2, "0")).join("");
    const answersName = hashHexAnswers + ".json";

    // ---------- WRITING IMAGES ----------
    // book_10/test_3.jpg ------>> hash.jpg
    const writingImageLogicalPath = pathStr.replace(/\.json$/, ".jpg")
    const dataWritingImg = encoder.encode(salt + writingImageLogicalPath)
    const hashBufferWritingImg = await crypto.subtle.digest("SHA-256", dataWritingImg)
    const hashArrayWritingImg = Array.from(new Uint8Array(hashBufferWritingImg))
    const hashHexWritingImg = hashArrayWritingImg.map((b) => b.toString(16).padStart(2, "0")).join("")
    const writingImageName = hashHexWritingImg + ".jpg"



    // ---------- Listening Buckets ----------
    const LISTENING_JSON_BUCKET =
        "https://ielts-practice-sets-listening-question-data-json-files-8edfac2b.s3.ap-south-1.amazonaws.com";
    const LISTENING_AUDIO_BUCKET =
        "https://ielts-practice-sets-listening-question-audio-mp3-files-3f06f131.s3.ap-south-1.amazonaws.com";
    const LISTENING_ANSWERS_BUCKET =
        "https://ielts-practice-sets-listening-answer-data-json-files-225f3251.s3.ap-south-1.amazonaws.com"



    // ------------------------------------------------------------------------------------------------------------
    // --------------------------------  ADDED SUPPORT FOR READING FILES FROM HERE --------------------------------
    // ------------------------------------------------------------------------------------------------------------


    // ---------- Reading Buckets ----------

    const READING_JSON_BUCKET =
        "https://ielts-practice-sets-reading-question-data-json-files-f75a4a42.s3.ap-south-1.amazonaws.com";
    const READING_PASSAGES_BUCKET =
        "https://ielts-practice-sets-reading-passages-data-json-files-f7253c52.s3.ap-south-1.amazonaws.com"




    // ------------------------------------------------------------------------------------------------------------
    // --------------------------------  ADDED SUPPORT FOR WRITING FILES FROM HERE --------------------------------
    // ------------------------------------------------------------------------------------------------------------

    // ---------- Writing Buckets ----------

    const WRITING_JSON_BUCKET =
        "https://ielts-practice-sets-writing-question-data-json-files-0257c0b4.s3.ap-south-1.amazonaws.com";
    const WRITING_IMAGES_BUCKET =
        "https://ielts-practice-sets-writing-question-images-jpg-files-dc27cf3f.s3.ap-south-1.amazonaws.com";



    return {

        // ---------- LISTENING URLs ----------
        ListeningQuestionsJsonUrl: `${LISTENING_JSON_BUCKET}/${answersName}`,
        ListeningQuestionsMP3Url: `${LISTENING_AUDIO_BUCKET}/${mp3Name}`,
        ListeningAnswerFileUrl: `${LISTENING_ANSWERS_BUCKET}/${answersName}`,

        // ---------- READING URLs ----------
        readingQuestionsJsonUrl: `${READING_JSON_BUCKET}/${answersName}`,
        readingPassagesJsonUrl: `${READING_PASSAGES_BUCKET}/${answersName}`,

        // ---------- WRITING ----------
        writingQuestionsWithSampleAnswersJsonUrl: `${WRITING_JSON_BUCKET}/${answersName}`,
        writingQuestionsTask1ImageUrl: `${WRITING_IMAGES_BUCKET}/${writingImageName}`,

    };
}