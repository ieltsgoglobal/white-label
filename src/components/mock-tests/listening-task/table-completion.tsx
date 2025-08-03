"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getFieldAnswer, updateMockAnswer } from "@/lib/mock-tests/mockAnswersStorage"
import AnswerInput from "../additional-ui/AnswerInput"

interface TableQuestion {
    id: number
    type: "table-completion"
    instructions: string
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


export default function TableCompletion(props: TableQuestion) {
    const [tableQuestion, setTableQuestion] = useState<TableQuestion>(props)


    // I think 2 blanks have to be seperated by \n for them to be displayed
    const renderTableCell = (cell: any) => {
        if (typeof cell.id === "number") {
            const questionNumber = cell.id

            return (
                <div className="space-y-2">
                    {cell.content.split("\n").map((line: string, lineIndex: number) => {
                        if (line.includes(`(${questionNumber})`)) {
                            const parts = line.split(`(${questionNumber})_______`)
                            return (
                                <div key={lineIndex} className="inline items-center text-sm">
                                    <span>{parts[0]}</span>
                                    <span className="font-semibold text-blue-600 ml-1">({questionNumber})</span>
                                    <AnswerInput questionNumber={questionNumber} className="w-20 h-7 inline-block mx-1 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-background px-1" />
                                    <span>{parts[1] || ""}</span>
                                </div>
                            )
                        }
                        return (
                            <div key={lineIndex} className="text-sm">
                                {line}
                            </div>
                        )
                    })}
                </div>
            )
        } else if (Array.isArray(cell.id)) {
            const questionNumbers: number[] = cell.id

            let lineContent = cell.content
            let elements: (JSX.Element | string)[] = []

            questionNumbers.forEach((id) => {
                const [before, after = ""] = lineContent.split(`(${id})_______`)
                elements.push(before)
                elements.push(
                    <span key={`input-${id}`} className="inline-flex items-center mx-1">
                        <span className="font-semibold text-blue-600 mr-1">({id})</span>
                        <AnswerInput questionNumber={id} className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1" />
                    </span>
                )
                lineContent = after
            })

            elements.push(lineContent)

            return <div className="text-sm flex flex-wrap items-center">{elements}</div>
        } else {
            return <div className="text-sm whitespace-pre-line">{cell.content}</div>
        }
    }

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    {(() => {
                        const allIds = tableQuestion.tableData.rows.flatMap(row =>
                            row.cells.flatMap(cell => {
                                if (typeof cell.id === "number") return [cell.id]
                                if (Array.isArray(cell.id)) return cell.id
                                return []
                            })
                        )
                        const minId = Math.min(...allIds)
                        const maxId = Math.max(...allIds)
                        return minId === maxId ? `Question ${minId}` : `Questions ${minId}–${maxId}`
                    })()}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Complete the table below. Write ONE WORD OR A NUMBER.</p>
            </CardHeader>

            <CardContent className="mx-8 mb-8">
                <div className="space-y-6 -mx-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="bg-muted/50">
                                    {tableQuestion.tableData.headers.map((header, index) => (
                                        <th key={index} className="border border-border p-4 text-left font-semibold text-sm">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableQuestion.tableData.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-muted/30">
                                        {row.cells.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="border border-border p-4 align-top">
                                                {renderTableCell(cell)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
