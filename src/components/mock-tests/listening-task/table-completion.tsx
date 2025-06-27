"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface TableQuestion {
    id: number
    type: "table-completion"
    instructions: string
    tableData: {
        headers: string[]
        rows: Array<{
            cells: Array<{
                content: string
                id?: number // question number, if blank
            }>
        }>
    }
}

export default function TableCompletion(props: TableQuestion) {
    const [tableQuestion, setTableQuestion] = useState<TableQuestion>(props)
    const [isCompleted, setIsCompleted] = useState(false)

    const handleTableAnswerChange = (questionNumber: number, answer: string) => {

    }

    const renderTableCell = (cell: any) => {
        const questionNumber = typeof cell.id === "number" ? cell.id : null

        if (questionNumber) {
            return (
                <div className="space-y-2">
                    {cell.content.split("\n").map((line: string, lineIndex: number) => {
                        if (line.includes(`(${questionNumber})`)) {
                            const parts = line.split(`(${questionNumber})_______`)
                            return (
                                <div key={lineIndex} className="flex items-center gap-1 text-sm">
                                    <span>{parts[0]}</span>
                                    <span className="font-semibold text-blue-600">({questionNumber})</span>
                                    <Input
                                        placeholder=""
                                        onChange={(e) =>
                                            handleTableAnswerChange(questionNumber, e.target.value)
                                        }
                                        disabled={isCompleted}
                                        className="w-20 h-7 text-xs border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-white px-1"
                                    />
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
        }

        return <div className="text-sm whitespace-pre-line">{cell.content}</div>
    }

    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {(() => {
                        const allIds = tableQuestion.tableData.rows.flatMap(row =>
                            row.cells.map(cell => cell.id).filter((id): id is number => typeof id === "number")
                        )
                        const minId = Math.min(...allIds)
                        const maxId = Math.max(...allIds)
                        return minId === maxId ? `Question ${minId}` : `Questions ${minId}–${maxId}`
                    })()}
                </h2>
                <p className="text-sm text-muted-foreground font-medium">Complete the table below. Write ONE WORD OR A NUMBER.</p>
            </div>

            <CardContent>
                <div className="space-y-6 -mx-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    {tableQuestion.tableData.headers.map((header, index) => (
                                        <th key={index} className="border border-gray-300 p-4 text-left font-semibold text-sm">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableQuestion.tableData.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50">
                                        {row.cells.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300 p-4 align-top">
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
        </div>
    )
}
