
export function checkAnswerAcceptable(userAnswer: string, correctAnswer: string): boolean {
    if (!userAnswer || !correctAnswer) return false

    const normalizedUser = normalizeAnswer(userAnswer)
    const acceptableAnswers = expandAcceptableAnswers(correctAnswer)

    console.log("acceptableAnswers", acceptableAnswers)
    console.log("useranswer", userAnswer)
    console.log("acceptableAnswers.has(normalizedUser)", acceptableAnswers.has(normalizedUser))
    return acceptableAnswers.has(normalizedUser)
}

function normalizeAnswer(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ") // normalize whitespace
}

function expandAcceptableAnswers(correctAnswer: string): Set<string> {
    const set = new Set<string>()
    const raw = correctAnswer.trim().toLowerCase()

    // apple/orange -> apple, orange
    const variants = raw.includes("/")
        ? raw.split("/").map(v => v.trim())
        : [raw]

    for (let variant of variants) {
        const normalized = normalizeAnswer(variant)
        set.add(normalized)

        // ✅ Case 1: "forest(s)" — add all three forms
        if (normalized.endsWith("(s)")) {
            const base = normalized.replace("(s)", "")
            set.add(base)           // "forest"
            set.add(base + "s")     // "forests"
            set.add(base + "(s)")   // "forest(s)" itself
            continue
        }

        // ✅ Case 2: "forests" — add itself + singular
        if (normalized.endsWith("s")) {
            const singular = normalized.slice(0, -1)
            set.add(singular)       // "forest"
            set.add(normalized)     // "forests"
            continue
        }

        // allow % to be optional: "60%" → "60"
        const percentMatch = normalized.match(/^(\d+)%$/)
        if (percentMatch) {
            set.add(percentMatch[1]) // add just the number
            set.add(percentMatch[1] + "%") // add number w/ %
        }


        // (optional) word: "(fixed) camera" → "camera", "fixed camera"
        // word (optional): "camera (fixed)" → "camera", "camera fixed"
        if (/\(.+\)/.test(variant)) {
            const withOption = normalized.replace(/[()]/g, "") // remove parentheses
            const withoutOption = normalized.replace(/\(.+?\)\s*/g, "") // remove word in parentheses

            set.add(normalizeAnswer(withOption))      // "fixed camera"
            set.add(normalizeAnswer(withoutOption))   // "camera"
            set.add(normalized)                       // "(fixed) camera"
            continue
        }
    }

    return set
}