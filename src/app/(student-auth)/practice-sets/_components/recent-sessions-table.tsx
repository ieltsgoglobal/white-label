"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo, useState } from "react"

type Session = {
  testName: string
  mode: "Practice" | "Mock" | "Timed" | string
  dateTime: string
  durationMin: number
  scoreRaw: number
  scorePct: number
  correct: number
  total: number
  answered: number
  skipped: number
  flagged: number
  reviewLink: string
}

export function RecentSessionsTable({ sessions }: { sessions: Session[] }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"date" | "score" | "duration">("date")

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
              <TableHead>Test Name</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Answered</TableHead>
              <TableHead>Skipped</TableHead>
              <TableHead>Flagged</TableHead>
              <TableHead className="text-right">Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{s.testName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-md">
                    {s.mode}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">{s.dateTime}</TableCell>
                <TableCell>{s.durationMin}m</TableCell>
                <TableCell>
                  {s.scoreRaw} / {s.total} ({s.scorePct}%)
                </TableCell>
                <TableCell>
                  {s.correct}/{s.total}
                </TableCell>
                <TableCell>{s.answered}</TableCell>
                <TableCell>{s.skipped}</TableCell>
                <TableCell>{s.flagged}</TableCell>
                <TableCell className="text-right">
                  <a href={s.reviewLink} className="text-primary underline underline-offset-4">
                    Review
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
