// _utils/pathPicker.ts

/**
 * Pick a random logical book + test combination,
 * and return all 4 parts for it.
 *
 * - Start: book_10/test_1/part_1
 * - End:   book_20/test_4/part_4
 * - Exclude: ["book_16", "book_16/test_4/part_1", "book_17", "book_18/test_3"]
 * 
 *  Example return:
 * [
 *   'book_13/test_3/part_1.json',
 *   'book_13/test_3/part_2.json',
 *   'book_13/test_3/part_3.json',
 *   'book_13/test_3/part_4.json'
 * ]
 */

export function pickRandomBookAndTest(excludeList: string[] = []): string[] {
    const start = { book: 10, test: 1, part: 1 };
    const end = { book: 20, test: 4, part: 4 };
    const exclude = [...excludeList, ...EXCLUDE_LISTENING_PRACTICE_TESTS, ...EXCLUDE_READING_PRACTICE_TESTS];

    // helper: check if a given path should be excluded
    const isExcluded = (path: string) => {
        return exclude.some((ex) => path.startsWith(ex));
    };

    // Build all valid book/test pairs
    const pairs: { book: number; test: number }[] = [];

    for (let b = start.book; b <= end.book; b++) {
        const maxTest = b === end.book ? end.test : 4;
        const minTest = b === start.book ? start.test : 1;

        for (let t = minTest; t <= maxTest; t++) {
            const firstPart = `book_${b}/test_${t}/part_1`;
            if (!isExcluded(firstPart)) {
                pairs.push({ book: b, test: t });
            }
        }
    }

    if (pairs.length === 0) {
        throw new Error("No valid book/test pairs available after exclusions");
    }

    // Pick random pair
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    // Build all 4 parts for this book/test
    const paths = Array.from({ length: 4 }, (_, i) => {
        const p = i + 1;
        const path = `book_${randomPair.book}/test_${randomPair.test}/part_${p}`;
        if (isExcluded(path)) return null;
        return path + ".json";
    }).filter(Boolean) as string[];

    return paths;
}



// tldr - why did we skip
// example_match_heading - example in match_heading is not supported
// structure_table - need to modify table or its rendering
// structure_note_completion - need to modify note_complettion component or its rendering
// image - missing image
// double_input_sentence_completion - no support double inputs in sentence completion
// everything_almost_fine - question does render, but the question misses some pieces of puzzle
// question_wording - the question renders fine, just we can alter question statement so that user can understand question type
// support_example - the audio_blob mentions the example, so we need to show the example to user

export const EXCLUDE_READING_PRACTICE_TESTS = [
    "book_10/test_1", // question 14-21 #example_match_heading
    "book_10/test_2", // question 22-25 #double_input_sentence_completion
    "book_10/test_3", // question 01-04 #example_match_heading

    "book_11/test_1", // question 20-26 #image
    "book_11/test_2", // question 09-13 #image

    "book_13/test_3", // question xx-yy #structure_table

    "book_15/test_1", // question 08-13 #structure_table

    "book_16/test_4", // question 1-06 #image

    "book_17/test_4", // question 7-13 #structure_table

    // "book_18/test_2" // question 01-08 #everything_almost_fine
    // "book_18/test_3" // question 24-26 #everything_almost_fine

    "book_19/test_3", // question 08-13 #structure_note_completion

    // "book_20/test_1", // question 31-35 #question_wording - matching
    // "book_20/test_2", // question 01-06 #question_wording - note_completion
    // "book_20/test_3", // question 34-36 #question_wording - matching

]
export const EXCLUDE_LISTENING_PRACTICE_TESTS = [
    // "book_10/test_2", // question 15-20 #question_wording - matching

    // "book_10/test_3", // question 16-20 #question_wording - matching
    // "book_10/test_3", // question 26-30 #question_wording - matching

    // "book_10/test_4", // question 25-30 #question_wording - matching

    "book_11/test_1", // question 15-20 #image

    "book_11/test_2", // question 17-20 #image

    // "book_11/test_3", // question 16-20 #question_wording - matching
    // "book_11/test_3", // question 27-30 #question_wording - matching

    "book_11/test_4", // question 17-20 #image

    // "book_12/test_2", // question 26-30 #question_wording - flow_chart_completion
    // "book_12/test_2", // question 31-40 #everything_almost_fine

    // "book_12/test_3", // question 21-26 #question_wording - flow_chart_completion

    "book_12/test_4", // question 15-20 #image

    "book_13/test_1", // question 14-20 #image
    // "book_13/test_1", // question 26-30 #question_wording - flow_chart_completion

    "book_14/test_2", // question 16-20 #image

    "book_15/test_2", // question 15-20 #image

    // "book_15/test_3", // quesiton 01-10 #everything_almost_fine

    "book_15/test_4", // question 11-16 #image

    "book_16/test_1", // question 15-20 #image

    // "book_16/test_3", // question 01-10 #everything_almost_fine

    "book_16/test_4", // quesiton 01-10 #structure_note_completion
    // "book_16/test_4" // quesiton 15-20 #image

    "book_18/test_1", // question 01-10 #structure_note_completion

    "book_18/test_2", // question 15-20 #image

    // "book_18/test_3", // question 01-04 #question_wording - form_completion

    "book_19/test_1", // question 16-20 #image

    // "book_19/test_2" // question 31-40 #everything_almost_fine

    "book_20/test_3", // question 17-20 #image
]
const EXCLUDE_WRITINGPRACTICE_TESTS = []
const EXCLUDE_SPEAKING_PRACTICE_TESTS = []