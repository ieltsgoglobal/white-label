"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type Props = {
  testName: string
  startedAt: string // ISO
  endsAt: string // ISO
  currentQuestion: number
  totalQuestions: number
  flaggedCount: number
  answered: number
  unanswered: number
}

export function CurrentTestStatus(props: Props) {
  const { testName, startedAt, endsAt, currentQuestion, totalQuestions, flaggedCount, answered, unanswered } = props

  const [now, setNow] = useState(() => Date.now())
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [paused])


  const timeRemaining = Math.max(0, new Date(endsAt).getTime() - now)
  const { h, m, s } = useMemo(() => msToHMS(timeRemaining), [timeRemaining])

  const progressPct = Math.min(100, Math.round((currentQuestion / totalQuestions) * 100))
  const answerPct = Math.min(100, Math.round((answered / Math.max(1, answered + unanswered)) * 100))

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-pretty">Current Test Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="rounded-lg border bg-background p-3">
          <div className="text-muted-foreground text-xs">Test</div>
          <div className="mt-1 font-medium">{testName}</div>
          <div className="text-muted-foreground mt-1 text-xs" aria-label="started at">
            Started: {new Date(startedAt).toLocaleString()}
          </div>
        </div>

        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-muted-foreground text-xs">Time Remaining</div>
              <div className="mt-1 font-medium" aria-live="polite">
                {h}:{m}:{s} {paused ? "(paused)" : ""}
              </div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground text-xs">Question Progress</div>
              <div className="mt-1 font-medium">
                Q{currentQuestion} of {totalQuestions}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Progress value={progressPct} aria-label="Question progress" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              onClick={() => { }}
              aria-label="Resume test (R)"
            >
              Resume
            </Button>
            <Button
              variant="secondary"
              onClick={() => { }}
            >
              Review Flagged
            </Button>
            <Button
              variant="outline"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Resume timer" : "Pause timer"}
            >
              {paused ? "Resume Timer" : "Pause Timer"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MiniStat label="Flagged" value={flaggedCount} />
          <MiniStat label="Answered" value={answered} />
          <MiniStat label="Unanswered" value={unanswered} />
        </div>

        <div className="rounded-lg border bg-background p-3">
          <div className="text-muted-foreground text-xs">Answer Completion</div>
          <div className="mt-1">
            <Progress value={answerPct} aria-label="Answered vs Unanswered" />
          </div>
          <div className="text-muted-foreground mt-1 text-xs">
            {answered} answered / {unanswered} unanswered
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  )
}

function msToHMS(ms: number) {
  const total = Math.floor(ms / 1000)
  const hh = Math.floor(total / 3600)
  const mm = Math.floor((total % 3600) / 60)
  const ss = total % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return { h: pad(hh), m: pad(mm), s: pad(ss) }
}
