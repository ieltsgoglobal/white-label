// used for Reading and listening pagination
export function extractIds(section: any): number[] {
    const ids: number[] = []

    for (const q of section.questions) {
        if (q.questionType === "form-completion") {
            for (const sec of q.formData.sections) {
                for (const field of sec.fields) {
                    if (field.id) ids.push(field.id)
                }
            }
        } else if (q.questionType === "table-completion") {
            for (const row of q.tableData.rows) {
                for (const cell of row.cells) {
                    if (cell.id !== undefined) {
                        if (Array.isArray(cell.id)) {
                            ids.push(...cell.id); // multiple blanks handle
                        } else {
                            ids.push(cell.id); // single blank handle
                        }
                    }
                }
            }
        } else if (
            q.questionType === "summary-completion" ||
            q.questionType === "flow-chart-completion"
        ) {
            if (q.question?.id) {
                if (Array.isArray(q.question.id)) {
                    ids.push(...q.question.id) // handle id:number[]
                } else {
                    ids.push(q.question.id) // handle id:number
                }
            }
        } else if (q.questionType === "note-completion") {
            for (const sec of q.sections) {
                for (const bp of sec.bulletPoints) {
                    if (bp.id) ids.push(bp.id)
                }
            }
        } else if (q.questionType === "matching") {
            for (const s of q.question.statements) {
                if (s.id) ids.push(s.id)
            }
        } else if (
            q.questionType === "sentence-completion" ||
            q.questionType === "image-labeling" ||
            q.questionType === "short-answer"
        ) {
            for (const sub of q.questions) {
                if (sub.id) ids.push(sub.id)
            }
        } else if (q.questionType === "multiple-choice-single") {
            for (const mcq of q.questions) {
                if (mcq.id) ids.push(mcq.id)
            }
        } else if (q.questionType === "multiple-choice-many") {
            for (const mcq of q.questions) {
                if (Array.isArray(mcq.id)) {
                    ids.push(...mcq.id)
                } else if (mcq.id) {
                    ids.push(mcq.id)
                }
            }
        }

        // Exclusive reading questions
        else if (
            q.questionType === "true-false-notgiven" ||
            q.questionType === "yes-no-notgiven"
        ) {
            for (const sub of q.questions) {
                if (sub.id) ids.push(sub.id)
            }
        } else if (q.questionType === "match-headings") {
            if (Array.isArray(q.question?.id)) {
                ids.push(...q.question.id)
            }
        } else if (q.questionType === "matching-sentence-endings") {
            for (const starter of q.question?.starting || []) {
                if (starter.id) ids.push(starter.id)
            }
        } else if (q.questionType === "matching-features") {
            for (const stmt of q.question?.statements || []) {
                if (stmt.id) ids.push(stmt.id)
            }
        } else if (q.questionType === "match-paragraph-information") {
            for (const info of q.question?.information || []) {
                if (info.id) ids.push(info.id)
            }
        }

        // Fallback generic handler
        // Will be not in use
        else if (q.questions) {
            for (const sub of q.questions) {
                if (Array.isArray(sub.id)) {
                    ids.push(...sub.id)
                } else if (sub.id) {
                    ids.push(sub.id)
                }
            }
        } else if (q.id) {
            if (Array.isArray(q.id)) {
                ids.push(...q.id)
            } else {
                ids.push(q.id)
            }
        }
    }

    return ids
}