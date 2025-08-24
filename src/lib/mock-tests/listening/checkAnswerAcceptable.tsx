
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
            set.add(percentMatch[1] + " " + "%") // add number w/ % with gap
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


        // ✅ Dates handling
        const dateVariants = expandDateVariants(normalized)
        dateVariants.forEach(v => set.add(normalizeAnswer(v)))
    }

    return set
}


/**
 * Expand date forms:
 * e.g. "24th January" → ["24 january", "24th january", "january 24", "24 jan", "jan 24"]
 */
function expandDateVariants(value: string): string[] {
    const results: string[] = []

    const months: Record<string, string> = {
        january: "jan",
        february: "feb",
        march: "mar",
        april: "apr",
        may: "may",
        june: "jun",
        july: "jul",
        august: "aug",
        september: "sep",
        october: "oct",
        november: "nov",
        december: "dec",
    }

    // Match things like "24th january"
    const match = value.match(/^(\d{1,2})(st|nd|rd|th)?\s+([a-z]+)$/i)
    if (match) {
        const day = match[1]
        const month = match[3].toLowerCase()

        const short = months[month]
        if (short) {
            results.push(`${day} ${month}`)
            results.push(`${day} ${short}`)
            results.push(`${day}th ${month}`)
            results.push(`${day}th ${short}`)
            results.push(`${month} ${day}`)
            results.push(`${short} ${day}`)
        }
    }

    return results
}