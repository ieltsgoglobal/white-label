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

export function pickRandomBookAndTest(): string[] {
    const start = { book: 10, test: 1, part: 1 };
    const end = { book: 20, test: 4, part: 4 };
    const exclude = ["book_16", "book_16/test_4/part_1", "book_17", "book_18/test_3"];

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