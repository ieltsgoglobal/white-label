"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo, useState } from "react"

type Session = Record<string, any>

const fakeSessions = [
  {
    "date time": "2025-01-12 14:32",
    "duration min": 48,
    "score raw": 32,
    "score pct": 80,
    "correct": 32,
    "total": 40,
    "answered": 38,
    "skipped": 2,
    "flagged": 4,
    "review link": "/review/reading/12A",
  },
  {
    "date time": "2025-01-10 19:05",
    "duration min": 32,
    "score raw": 34,
    "score pct": 85,
    "correct": 34,
    "total": 40,
    "answered": 36,
    "skipped": 4,
    "flagged": 1,
    "review link": "/review/listening/8",
  },
  {
    "date time": "2025-01-08 16:11",
    "duration min": 62,
    "score raw": 28,
    "score pct": 70,
    "correct": 28,
    "total": 40,
    "answered": 35,
    "skipped": 5,
    "flagged": 3,
    "review link": "/review/reading/7C",
  },
  {
    "date time": "2025-01-06 11:47",
    "duration min": 30,
    "score raw": 36,
    "score pct": 90,
    "correct": 36,
    "total": 40,
    "answered": 40,
    "skipped": 0,
    "flagged": 2,
    "review link": "/review/listening/14",
  },
  {
    "date time": "2025-01-04 20:29",
    "duration min": 52,
    "score raw": 25,
    "score pct": 62,
    "correct": 25,
    "total": 40,
    "answered": 33,
    "skipped": 7,
    "flagged": 5,
    "review link": "/review/reading/9B",
  },
  {
    "date time": "2025-01-03 10:15",
    "duration min": 29,
    "score raw": 31,
    "score pct": 78,
    "correct": 31,
    "total": 40,
    "answered": 37,
    "skipped": 3,
    "flagged": 1,
    "review link": "/review/listening/6",
  },
]

export function RecentSessionsTable({ sessions = fakeSessions }: { sessions?: Session[] }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"date" | "score" | "duration">("date")

  const columns = Object.keys(sessions?.[0] || {})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = !q
      ? sessions
      : sessions.filter((s) => s.testName.toLowerCase().includes(q) || s.mode.toLowerCase().includes(q))
    if (sort === "date") {
      list = [...list].sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1))
    } else if (sort === "score") {
      list = [...list].sort((a, b) => b.scorePct - a.scorePct)
    } else if (sort === "duration") {
      list = [...list].sort((a, b) => a.durationMin - b.durationMin)
    }
    return list
  }, [sessions, query, sort])

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-pretty">Recent Practice Sessions</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Input
            placeholder="Search by test name or mode..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search sessions"
          />
          <div className="sm:col-start-3">
            <Select value={sort} onValueChange={(v) => setSort(v as any)}>
              <SelectTrigger aria-label="Sort sessions">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Newest</SelectItem>
                <SelectItem value="score">Highest score</SelectItem>
                <SelectItem value="duration">Shortest duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row, rowIndex) => (
              <TableRow key={rowIndex}>

                {columns.map((col, colIndex) => {
                  const value = row[col]

                  // if (col === "review link") {
                  //   return (
                  //     <TableCell key={colIndex}>
                  //       <a
                  //         href={value}
                  //         className="text-primary underline underline-offset-4"
                  //       >
                  //         Review
                  //       </a>
                  //     </TableCell>
                  //   )
                  // }

                  if (col === "duration min") {
                    return <TableCell key={colIndex}>{value}m</TableCell>
                  }

                  // Default render
                  return <TableCell key={colIndex}>{value}</TableCell>
                })}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
