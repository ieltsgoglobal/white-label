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
    questionId: number,
    constraint: string,
    start: number,
    end: number
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

                    // If rowspan=2 → insert "" at start of next row
                    if ((cell as any).rowspan === 2 && allRows[rowIndex + 1]) {
                        allRows[rowIndex + 1].unshift("")
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
        id: questionId,
        type: "table-completion",
        instructions: "Complete the table below.",
        multiWord: constraint.includes("NO MORE THAN THREE WORDS"),
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
            section.forEach((item: any) => processItem(item, 1, bulletPoints))
            sections.push({ title: "", bulletPoints })
        } else if (section.items && Array.isArray(section.items)) {
            // Case: structured object with title + items
            section.items.forEach((item: any) => processItem(item, 1, bulletPoints))
            sections.push({
                title: section.title ? section.title.trim() : "",
                bulletPoints,
            })
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
        })(), sections,
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
        question?: string
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
    type: string
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
            question: body.title ?? "",
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