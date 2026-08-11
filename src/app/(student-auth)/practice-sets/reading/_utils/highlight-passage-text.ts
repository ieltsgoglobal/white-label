/**
 * Stores highlighted reading passage words in sessionStorage.
 *
 * Format:
 * {
 *   "10-15": "hello",
 *   "32-37": "world"
 * }
 *
 * The key represents the word's character position,
 * allowing repeated words to be highlighted separately.
 */
const STORAGE_KEY = "reading-passage-text-highlighted-words";

type HighlightedWordsMap = Record<string, string>;

/**
 * Get all currently highlighted words.
 */
export function ReadingPassagegetHighlightedWords(): HighlightedWordsMap {
    if (typeof window === "undefined") return {};

    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
}

/**
 * Toggle a word highlight using its character position.
 * Adds it if not highlighted, removes it if already highlighted.
 */
export function ReadingPassagetoggleHighlightedWord(position: string, word: string) {
    const map = ReadingPassagegetHighlightedWords();

    map[position] ? delete map[position] : map[position] = word;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));

    return map;
}