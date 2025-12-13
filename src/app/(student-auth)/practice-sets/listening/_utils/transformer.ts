import { normalNumberToRoman } from "./misc"

// ------------------------- TABLE COMPLETION -------------------------------------
interface RawBody {
    items: any[][]
}

interface TableQuestion {
    id: number
    type: "table-completion"
    instructions: string
    multiWord: boolean
    tableData: {
        headers: string[]
        rows: Array<{
            cells: Array<{
                content: string
                id?: number | number[]
            }>
        }>
    }
}

export function transformBodyToTableQuestion(
    raw: RawBody,
    start: number,
    constraint: string,
    qStart: number,
    qEnd: number
): TableQuestion {
    let currentBlank = start

    const headers: string[] = raw.items[0]

    const rows = raw.items.slice(1).map((row, rowIndex, allRows) => {
        return {
            cells: row.map(cell => {
                if (typeof cell === "string") {
                    // split multiple <input> in same string
                    let ids: number[] = []
                    let content = cell
                    while (content.includes("<input>")) {
                        content = content.replace("<input>", `(${currentBlank})_______`)
                        ids.push(currentBlank)
                        currentBlank++
                    }
                    // support multiple blanks in one line
                    while (content.includes("<input[]>")) {
                        content = content.replace("<input[]>", `(${currentBlank})_______`)
                        ids.push(currentBlank)
                        currentBlank++
                    }
                    if (ids.length === 0) {
                        return { content }
                    } else if (ids.length === 1) {
                        return { content, id: ids[0] }
                    } else {
                        return { content, id: ids }
                    }

                } else if (Array.isArray(cell)) {
                    // Subpoints → join with \n
                    let subIds: number[] = []
                    let subLines = cell.map((sub: string) => {
                        let line = sub
                        while (line.includes("<input>")) {
                            line = line.replace("<input>", `(${currentBlank})_______`)
                            subIds.push(currentBlank)
                            currentBlank++
                        }
                        return `- ${line}`
                    })
                    const content = subLines.join("\n")
                    if (subIds.length === 0) {
                        return { content }
                    } else if (subIds.length === 1) {
                        return { content, id: subIds[0] }
                    } else {
                        return { content, id: subIds }
                    }
                } else if (cell && (cell as any).prefix) {
                    // Show the prefix
                    const text = String((cell as any).prefix)
                    const nextRow = allRows[rowIndex + 1]

                    // If rowspan=2 → insert "" at start of next row
                    if ((cell as any).rowspan === 2 && nextRow) {
                        if (nextRow[0] !== "") {
                            nextRow.unshift("")
                        }
                    }
                    return { content: text }
                } else if (cell && (cell.type === "example" || cell.type === "input-example")) {
                    // Convert example → plain string, keep the visible word
                    if (cell.items && cell.items.blocks) {
                        const text = cell.items.blocks
                            .map((b: any) =>
                                b.type === "input-example" ? b.content : b.content
                            )
                            .join("")
                        return { content: text }
                    }

                    // Case: directly "items": "The Food <input=Studio>"
                    if (typeof cell.items === "string") {
                        // Replace <input=Something> with just "Something"
                        const normalized = cell.items.replace(/<input=([^>]+)>/g, "$1")
                        return { content: normalized }
                    }

                    return { content: String(cell) }
                }
                else {
                    // fallback (shouldn’t normally hit)
                    return { content: String(cell) }
                }
            })
        }
    })

    // console.log("All rows:", JSON.stringify(rows, null, 2))

    return {
        id: qStart,
        type: "table-completion",
        instructions: "Complete the table below.",
        multiWord: constraint.includes("NO MORE THAN THREE WORDS") || constraint.includes("NO MORE THAN TWO WORDS"),
        tableData: {
            headers,
            rows
        }
    }
}


// ------------------------- MCQ SINGLE -------------------------------------
interface MCQQuestion {
    id: number
    question: string
    options: string[]
}

interface MCQSection {
    type: "multiple-choice-single"
    questions: MCQQuestion[]
}

export function transformToMCQ(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): MCQSection {
    if (type !== "option-abc") {
        throw new Error(`Unsupported question type for single choice: ${type}`)
    }

    const questions: MCQQuestion[] = body.items.map((item: any, index: number) => ({
        id: start + index,
        question: item.title.trim(),
        options: item.options.map((opt: string) => opt.trim()),
    }))

    return {
        type: "multiple-choice-single",
        questions,
    }
}


// ------------------------- MCQ MANY (Checkbox) -------------------------------------
interface MCQManyQuestion {
    id: number[]        // example: [17, 18]
    question: string
    options: string[]
}

interface MCQManySection {
    questionType: "multiple-choice-many"
    questions: MCQManyQuestion[]
    quantity: number
}

export function transformToMCQMany(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): MCQManySection {
    if (type !== "checkbox") {
        throw new Error(`Unsupported question type for multi choice: ${type}`)
    }

    const quantity = desc?.quantity ?? 2

    // A checkbox question is always one "title" with multiple options
    // but sometimes IELTS groups them into 2-question ranges like 17–18
    const question: MCQManyQuestion = {
        id: Array.from({ length: end - start + 1 }, (_, i) => start + i),
        question: body.title.trim(),
        options: body.options.map((opt: string) => opt.trim()),
    }

    return {
        questionType: "multiple-choice-many",
        questions: [question],
        quantity,
    }
}


// ------------------------- NOTE COMPLETION -------------------------------------

interface NoteBulletPoint {
    id?: number | number[]
    text: string
}

interface NoteSection {
    title: string
    bulletPoints: NoteBulletPoint[]
}

interface NoteCompletionSection {
    type: "note-completion"
    oneWord?: boolean
    numberAllowedInAnswer?: boolean
    topic: string
    sections: NoteSection[]
}

export function transformToNoteCompletion(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): NoteCompletionSection {
    if (type !== "input-note") {
        throw new Error(`Unsupported question type for notes: ${type}`)
    }

    let currentBlank = start
    const sections: NoteSection[] = []

    /**
    * Recursively processes a note item (string or object) and appends structured bullet points.
    * 
    * Responsibilities:
    *  - Detect and replace <input> placeholders with numbered blanks (e.g., "(31) _______").
    *  - Track IDs for blanks (single or multiple).
    *  - Apply indentation markers based on nesting level (subpoint, sub-subpoint).
    *  - Handle nested objects with `title`, `prefix`, and `items`.
    *  - Push each processed line into the `bulletPoints` array.
    */
    function processItem(item: any, level: number, bulletPoints: NoteBulletPoint[]) {
        // --- Case 1: Plain string item (normal note line) ---
        if (typeof item === "string") {
            let content = item
            let ids: number[] = []

            // Replace <input> placeholders with numbered blanks "(n) _______"
            while (content.includes("<input>")) {
                content = content.replace("<input>", `(${currentBlank}) _______`)
                ids.push(currentBlank)
                currentBlank++
            }

            // Add indentation markers depending on depth level
            //   level 1 → normal bullet
            //   level 2 → <<subpoint>>
            //   level 3 → <<subpoint_subpoint>>
            const prefix =
                level === 2 ? "<<subpoint>> " :
                    level === 3 ? "<<subpoint_subpoint>> " : ""

            // Push into bulletPoints with or without IDs
            if (ids.length === 0) {
                bulletPoints.push({ text: `${prefix}${content.trim()}` })
            } else if (ids.length === 1) {
                bulletPoints.push({ id: ids[0], text: `${prefix}${content.trim()}` })
            } else {
                bulletPoints.push({ id: ids, text: `${prefix}${content.trim()}` })
            }
        }

        // --- Case 1.5: Object with string items (support examples) ---
        if (item.type === "example") {
            const exampleText = item.items
                // replace <input=Angela> → Angela
                .replace(/<input=([^>]+)>/g, "$1")
                .trim()

            if (exampleText) {
                bulletPoints.push({ text: exampleText })
            }
        }

        // --- Case 2: Nested object with items (e.g., a titled block or prefixed group) ---
        else if (item.items && Array.isArray(item.items)) {

            // (2a) Handle inline titles (e.g., "The programme provided")
            // These are treated as plain text bullets
            if (item.title) {
                const titleText = typeof item.title === "string" ? item.title.trim() : ""
                if (titleText) {
                    bulletPoints.push({ text: titleText })
                }
            }

            // (2b) Handle prefix content (if exists) with optional blanks
            if (item.prefix) {
                let prefixContent = item.prefix
                let ids: number[] = []

                // Replace <input> in prefix
                while (prefixContent.includes("<input>")) {
                    prefixContent = prefixContent.replace("<input>", `(${currentBlank}) _______`)
                    ids.push(currentBlank)
                    currentBlank++
                }

                // Apply marker depending on depth
                const prefixMarker = level === 1
                    ? ""
                    : level === 2
                        ? "<<subpoint>> "
                        : "<<subpoint_subpoint>> "

                // Push prefix line into bulletPoints
                if (ids.length === 0) {
                    bulletPoints.push({ text: `${prefixMarker}${prefixContent.trim()}` })
                } else if (ids.length === 1) {
                    bulletPoints.push({ id: ids[0], text: `${prefixMarker}${prefixContent.trim()}` })
                } else {
                    bulletPoints.push({ id: ids, text: `${prefixMarker}${prefixContent.trim()}` })
                }
            }

            // (2c) Recursively process children with incremented depth level
            item.items.forEach((sub: any) => processItem(sub, level + 1, bulletPoints))
        }
    }

    // Root sections
    body.items.forEach((section: any) => {
        const bulletPoints: NoteBulletPoint[] = []

        if (typeof section === "string") {
            // Case: root-level string
            processItem(section, 1, bulletPoints)
            sections.push({ title: "", bulletPoints })
        } else if (Array.isArray(section)) {
            // Case: plain array of strings/atoms
            section.forEach((item: any) => processItem(item, 2, bulletPoints))
            sections.push({ title: "", bulletPoints })
        } else if (section.items && Array.isArray(section.items)) {
            // Case: structured object with title + items
            section.items.forEach((item: any) => processItem(item, 1, bulletPoints))
            sections.push({
                title: section.title ? section.title.trim() : "",
                bulletPoints,
            })
        } else if (section.type === "example") {
            processItem(section, 1, bulletPoints)
            sections.push({ title: "", bulletPoints })
        }
    })


    // console.log("All rows:", JSON.stringify(sections, null, 2))


    return {
        type: "note-completion",
        topic: body.title ?? "Notes",
        oneWord: (() => {
            const constraint = desc?.constraint?.toUpperCase() || ""
            if (constraint.includes("ONE WORD")) return true
            if (constraint.includes("TWO WORDS")) return false
            // default fallback
            return false
        })(),
        numberAllowedInAnswer: (() => {
            const constraint = desc?.constraint?.toUpperCase() || ""
            if (constraint.includes("A NUMBER")) return true
            // default fallback
            return false
        })(),
        sections,
    }
}

// ------------------------- MATCHING -------------------------------------

interface MatchingStatement {
    id: number
    text: string
}

interface MatchingFeature {
    letter: string
    description: string
}

interface MatchingQuestion {
    questionType: "matching"
    question: {
        question_statement?: string
        statements_title?: string
        statements: MatchingStatement[]
        features_title?: string
        features: MatchingFeature[]
    }
}

export function transformToMatching(
    body: any,
    start: number,
    end: number,
    type: string,
    desc: any
): MatchingQuestion {
    if (type !== "select-given-list") {
        throw new Error(`Unsupported question type for matching: ${type}`)
    }

    // Assign IDs incrementally, and remove <input> placeholders
    const statements: MatchingStatement[] = body.items.map((line: string, idx: number) => ({
        id: start + idx,
        text: line.replace(/<input>/g, "").trim(),
    }))

    const features: MatchingFeature[] = body.list.map((desc: string, idx: number) => ({
        letter: String.fromCharCode(65 + idx), // "A", "B", "C", ...
        description: desc.trim(),
    }))

    return {
        questionType: "matching",
        question: {
            question_statement: desc.text[0] ?? "",
            statements_title: body.title ?? "",
            statements,
            features_title: body.listTitle ?? "Options",
            features,
        },
    }
}



// ------------------------- IMAGE LABELING -------------------------------------

interface ImageLabelingQuestion {
    type: "image-labeling"
    image_url: string
    instructions: string
    questions: {
        id: number
        location: string
    }[]
}

export function transformToImageLabeling(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): ImageLabelingQuestion {
    if (type !== "select-given-diagram") {
        throw new Error(`Unsupported question type for image labeling: ${type}`)
    }

    const questions = body.items.map((line: string, idx: number) => ({
        id: start + idx,
        location: line.replace(/<input>/g, "").trim(),
    }))

    return {
        type: "image-labeling",
        image_url: body.img ? `https://www.jumpinto.com/resource/exam/ielts/image/a20/${body.img}` : "",
        instructions: desc?.textReadable?.[0] ?? "Label the map / plan / diagram below.",
        questions,
    }
}



// ------------------------- FORM COMPLETION -------------------------------------

interface FormQuestion {
    type: "form-completion"
    formData: {
        title: string
        address?: string
        sections: Array<{
            title?: string
            fields: Array<FormField>
        }>
    }
}

interface FormField {
    label: string
    content: string
    hasBlank?: boolean
    id: number | number[]
}

export function transformToFormCompletion(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): FormQuestion {
    if (type !== "input-form") {
        throw new Error(`Unsupported question type for form completion: ${type}`)
    }

    let currentBlank = start
    let address: string | undefined = undefined

    // ✅ we now build multiple sections instead of a flat fields[]
    const sections: { title?: string; fields: FormField[] }[] = []
    let currentSection: { title?: string; fields: FormField[] } = {
        title: "",
        fields: [],
    }
    sections.push(currentSection)

    body.items.forEach((row: any) => {
        // ✅ Section header rows become new sections
        if (row && typeof row === "object" && !Array.isArray(row) && row.title) {
            currentSection = { title: row.title, fields: [] }
            sections.push(currentSection)
            return
        }

        if (Array.isArray(row)) {
            const [labelRaw, valueRaw] = row

            let label = (typeof labelRaw === "string" ? labelRaw.trim() : "")
            if (!label.endsWith(":")) {
                label = label + ":"
            }

            const pushField = (
                label: string,
                content: string,
                hasBlank: boolean,
                id: number | number[]
            ) => {
                currentSection.fields.push({ label, content, hasBlank, id })
            }

            if (typeof valueRaw === "string") {
                let content = valueRaw
                const ids: number[] = []

                while (content.includes("<input>")) {
                    content = content.replace("<input>", `(${currentBlank}) _______`)
                    ids.push(currentBlank)
                    currentBlank++
                }

                if (ids.length === 0) {
                    pushField(label, content, false, -1)
                } else {
                    pushField(label, content, true, ids.length === 1 ? ids[0] : ids)
                }
            } else if (Array.isArray(valueRaw)) {
                let subIds: number[] = []
                let subLines = valueRaw.map((sub: string) => {
                    let line = sub
                    while (line.includes("<input>")) {
                        line = line.replace("<input>", `(${currentBlank}) _______`)
                        subIds.push(currentBlank)
                        currentBlank++
                    }
                    return "- " + line.trim()
                })

                const content = subLines.join("\n")

                if (subIds.length === 0) {
                    pushField(label, content, false, -1)
                } else {
                    pushField(label, content, true, subIds.length === 1 ? subIds[0] : subIds)
                }
            }
        }
    })

    // console.log("All sections:", JSON.stringify(sections, null, 2))

    return {
        type: "form-completion",
        formData: {
            title: body.title ?? "Form",
            address,
            sections,
        },
    }
}

// ------------------------- SENTENCE COMPLETION -------------------------------------

interface SentenceQuestion {
    id: number
    sentence: string
}

interface SentenceCompletionSection {
    questionType: "sentence-completion"
    questions: SentenceQuestion[]
    oneWord?: boolean
}

export function transformToSentenceCompletion(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): SentenceCompletionSection {
    if (type !== "input-sentence") {
        throw new Error(`Unsupported question type for sentence completion: ${type}`)
    }

    let currentBlank = start

    const questions: SentenceQuestion[] = body.items.map((line: string) => {
        let content = line.trim()

        // Replace each <input> with numbered blank
        while (content.includes("<input>")) {
            content = content.replace("<input>", `(${currentBlank}) _____`)
            currentBlank++
        }

        return {
            id: currentBlank - 1, // last id used
            sentence: content,
        }
    })

    const constraint = desc?.constraint?.toUpperCase() || ""
    const oneWord = constraint.includes("ONE WORD") ? true : undefined

    return {
        questionType: "sentence-completion",
        questions,
        ...(oneWord ? { oneWord } : {}), // only add if true
    }
}

// ------------------------- TRUE / FALSE / NOT GIVEN -------------------------------------

interface TrueFalseNotGivenQuestion {
    id: number
    statement: string
}

interface TrueFalseNotGivenSection {
    questionType: "true-false-notgiven"
    questions: TrueFalseNotGivenQuestion[]
}

/**
 * Converts raw body or body_smart data for True/False/Not Given type questions.
 * Supports both simple text arrays and tokenized ("blocks") smart bodies.
 */
export function transformToTrueFalseNotGiven(
    body: any,
    start: number,
    end: number
): TrueFalseNotGivenSection {
    // Prefer body_smart if present and valid
    let items: string[] = []

    if (body?.items && Array.isArray(body.items) && body.items.length > 0 && typeof body.items[0] === "string") {
        // simple body (plain string array)
        items = body.items.map((s: string) => s.trim())
    } else if (body?.items && Array.isArray(body.items) && typeof body.items[0] === "object" && body.items[0].blocks) {
        // body_smart style (tokenized)
        items = body.items.map((item: any) =>
            item.blocks.map((b: any) => b.content ?? "").join("").trim()
        )
    } else if (body?.body_smart?.items) {
        // nested structure under body.body_smart
        items = body.body_smart.items.map((item: any) =>
            item.blocks.map((b: any) => b.content ?? "").join("").trim()
        )
    } else {
        console.warn("transformToTrueFalseNotGiven: no valid items found")
    }

    // Fallback if somehow empty
    if (!items || items.length === 0) {
        items = []
    }

    const questions: TrueFalseNotGivenQuestion[] = items.map((text, idx) => ({
        id: start + idx,
        statement: text,
    }))

    return {
        questionType: "true-false-notgiven",
        questions,
    }
}


// ------------------------- MATCH PARAGRAPH INFORMATION -------------------------------------

interface MatchParagraphInformation {
    questionType: "match-paragraph-information"
    question: {
        information: { id: number; text: string }[]
        letters: string[]
    }
}

/**
 * Converts raw select-section body (paragraph information matching)
 * into structured MatchParagraphInformation format.
 * Supports both body.items and body_smart.items.
 */
export function transformToMatchParagraphInformation(
    body: any,
    start: number,
    end: number,
    desc?: any
): MatchParagraphInformation {
    let information: { id: number; text: string }[] = []

    // ✅ Prefer body_smart.items if available (tokenized format)
    if (body?.body_smart?.items && Array.isArray(body.body_smart.items)) {
        information = body.body_smart.items.map((item: any, idx: number) => {
            const sentence = item.blocks.map((b: any) => b.content ?? "").join("").trim()
            // find id inside block with type "input"
            const blockId =
                item.blocks.find((b: any) => b.type === "input")?.content ??
                start + idx
            return { id: Number(blockId), text: sentence.replace(/\d+$/, "").trim() }
        })
    } else if (body?.items && Array.isArray(body.items)) {
        // fallback for plain body
        information = body.items.map((line: string, idx: number) => {
            // extract id number from "<input>" or trailing digits
            const match = line.match(/(\d+)/)
            const id = match ? Number(match[1]) : start + idx
            return { id, text: line.replace(/<input>/g, "").trim() }
        })
    }

    // ✅ Determine paragraph letters (like A–G)
    const letters: string[] = (() => {
        if (desc?.sectionRange && Array.isArray(desc.sectionRange)) {
            const [startLetter, endLetter] = desc.sectionRange
            const range: string[] = []
            for (let code = startLetter.charCodeAt(0); code <= endLetter.charCodeAt(0); code++) {
                range.push(String.fromCharCode(code))
            }
            return range
        }
        return ["A", "B", "C", "D", "E"]
    })()

    return {
        questionType: "match-paragraph-information",
        question: {
            information,
            letters,
        },
    }
}


// ------------------------- SUMMARY COMPLETION -------------------------------------

interface SummaryCompletion {
    questionType: "summary-completion"
    multiWord?: boolean
    question: {
        id: number[]
        title: string
        passageTemplate: string
        optionList?: {
            letter: string
            text: string
        }[]
    }
}

/**
 * Supports:
 *  - input-summary (no list)
 *  - select-summary-given-list (with list of options)
 */
export function transformToSummaryCompletion(
    body: any,
    start: number,
    end: number,
    desc?: any
): SummaryCompletion {
    // ---------- 1️⃣ Extract title ----------
    const title =
        (body?.body_smart?.title?.blocks ?? body?.title?.blocks ?? [])
            .map((b: any) => b.content ?? "")
            .join("")
            .trim() || body?.title || "Summary"

    // ---------- 2️⃣ Build passageTemplate ----------
    let passage = ""

    // Prefer body_smart
    if (body?.body_smart?.items && Array.isArray(body.body_smart.items)) {
        passage = body.body_smart.items
            .map((item: any) =>
                item.blocks
                    .map((b: any) => {
                        if (b.type === "input" && typeof b.content === "number") {
                            return `<${b.content}>`
                        }
                        return b.content ?? ""
                    })
                    .join("")
            )
            .join("\n") // new line per passage
    } else if (body?.items && Array.isArray(body.items)) {
        // fallback
        passage = body.items
            .map((s: string) => s.replace(/<input>/g, () => `<${start++}>`))
            .join("\n")
    }

    // ---------- 3️⃣ Collect all numeric IDs (strict <number>) ----------
    const idMatches = Array.from(passage.matchAll(/<(\d+)>/g)).map((m) => Number(m[1]))

    // ---------- 4️⃣ Multi-word constraint ----------
    const constraint = desc?.constraint?.toUpperCase() || ""
    const multiWord =
        constraint.includes("THREE WORD") ||
        constraint.includes("NO MORE THAN THREE WORD") ||
        constraint.includes("NO MORE THAN TWO WORD")

    // ---------- 5️⃣ Optional option list ----------
    let optionList: { letter: string; text: string }[] | undefined = undefined

    // Case A: From body_smart.list
    if (body?.body_smart?.list && Array.isArray(body.body_smart.list)) {
        optionList = body.body_smart.list.map((opt: any, idx: number) => ({
            letter: String.fromCharCode(65 + idx),
            text: opt.blocks.map((b: any) => b.content ?? "").join("").trim(),
        }))
    }

    // Case B: From body.list (plain array)
    else if (body?.list && Array.isArray(body.list)) {
        optionList = body.list.map((text: string, idx: number) => ({
            letter: String.fromCharCode(65 + idx),
            text: text.trim(),
        }))
    }

    return {
        questionType: "summary-completion",
        ...(multiWord ? { multiWord } : {}),
        question: {
            id: idMatches,
            title,
            passageTemplate: passage.trim(),
            ...(optionList && optionList.length > 0 ? { optionList } : {}),
        },
    }
}

// ------------------------- YES / NO / NOT GIVEN -------------------------------------

interface YesNoNotGiven {
    questionType: "yes-no-notgiven"
    questions: {
        id: number
        statement: string
    }[]
}

export function transformToYesNoNotGiven(body: any, start: number, end: number): YesNoNotGiven {
    const questions: { id: number; statement: string }[] = []

    // ✅ Prefer body_smart if available
    if (body?.body_smart?.items && Array.isArray(body.body_smart.items)) {
        const qids = body.body_smart.item_qids || []
        body.body_smart.items.forEach((item: any, index: number) => {
            const statement = item.blocks.map((b: any) => b.content ?? "").join("").trim()
            const id = qids[index] ?? start + index
            questions.push({ id, statement })
        })
    }

    // ✅ Fallback to body.items if body_smart missing
    else if (body?.body?.items && Array.isArray(body.body.items)) {
        body.body.items.forEach((text: string, i: number) => {
            questions.push({ id: start + i, statement: text.trim() })
        })
    }

    return {
        questionType: "yes-no-notgiven",
        questions,
    }
}


// ------------------------- MATCH HEADINGS -------------------------------------

interface MatchHeadingsData {
    headings: { number: string; text: string }[]
    id: number[]
}

interface MatchHeadingsSection {
    questionType: "match-headings"
    question: MatchHeadingsData
}

export function transformToMatchHeadings(
    body: any,
    start: number,
    end: number,
    desc?: any
): MatchHeadingsSection {

    // Convert list of headings → numbered list
    const headings = body.list.map((text: string, idx: number) => ({
        number: normalNumberToRoman(idx + 1).toLowerCase(),   // 1 → I, 2 → II, 3 → III ...
        text: text.trim(),
    }));

    // Question IDs are sequential from start → end
    const id = Array.from({ length: end - start + 1 }, (_, i) => start + i)

    return {
        questionType: "match-headings",
        question: {
            headings,
            id,
        },
    }
}

// ------------------------- SHORT ANSWER -------------------------------------

// in reading short-answer only came once
// book16/test4 - contains short answer
// need to verify component works in listeing also

interface OneWordQuestion {
    id: number
    sentence: string
}

interface OneWordSection {
    type: "short-answer"
    topic?: string
    instructions?: string
    questions: OneWordQuestion[]
}

export function transformToShortAnswer(
    body: any,
    start: number,
    end: number,
    type: string,
    desc?: any
): OneWordSection {
    if (type !== "input-answer") {
        throw new Error(`Unsupported question type for short answer: ${type}`)
    }

    const constraint = desc?.constraint || ""
    const isReading = constraint.length > 0   // reading questions specify constraints
    const instructions = isReading
        ? `Choose ${constraint} from the passage for each answer..`
        : undefined

    let current = start

    const questions: OneWordQuestion[] = body.items.map((item: any) => {
        const id = current++
        return {
            id,
            sentence: `${item.title} \n(${id}) _______`
        }
    })

    return {
        type: "short-answer",
        // ...(topic ? { topic } : {}),
        ...(instructions ? { instructions } : {}),
        questions
    }
}