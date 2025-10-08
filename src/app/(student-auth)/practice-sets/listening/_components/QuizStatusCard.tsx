"use client"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { getPracticeSetAnswers, getPracticeSetCorrectAnswers } from "@/lib/practice-sets/user-submissions/sessionStorage"
import { calculatePracticeSetScore } from "../_utils/misc"

type AttemptWithCorrectAnswers = {
  user: string;
  correct: string;
};

const TOTAL_QUESTIONS = 40;

export function QuizStatusCard({
  NextSet,
  PrevSet,
  currentIndex,
  CheckResulsts,
  MAX_INDEX,
  userAttemptsWithAnswers
}: {
  NextSet: () => void
  PrevSet: () => void
  currentIndex: number
  CheckResulsts: (data: { startedAt: Date; timeTaken: number }) => void
  MAX_INDEX: number,
  userAttemptsWithAnswers: AttemptWithCorrectAnswers[]
}) {
  const [startedAt] = useState<Date>(new Date())
  const [timeTaken, setTimeTaken] = useState<number>(0) // seconds
  const [isPaused, setIsPaused] = useState(false)
  const [hasPressedCheckResults, setHasPressedCheckResults] = useState(false)

  const [userScoreAfterSubmission, setUserScoreAfterSubmission] = useState<number | null>(null) // null means not submitted yet

  // Timer updater
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setTimeTaken((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Format helpers
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    const hh = h > 0 ? String(h).padStart(2, "0") + ":" : ""
    return `${hh}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const formatStartedAt = (date: Date) => {
    const h = date.getHours()
    const m = String(date.getMinutes()).padStart(2, "0")
    const hh = h % 12 || 12
    const suffix = h >= 12 ? "PM" : "AM"
    return `${hh}:${m} ${suffix}`
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="hidden">
      </CardHeader>

      <CardContent className="grid gap-4 mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Started At */}
          <div className="rounded-md border p-3">
            <Label htmlFor="started-at" className="text-muted-foreground">
              Started At
            </Label>
            <div id="started-at" className="mt-1 font-medium">
              {formatStartedAt(startedAt)}
            </div>
          </div>

          {/* Time Taken */}
          <div className="rounded-md border p-3">
            <Label htmlFor="time-taken" className="text-muted-foreground">
              Time Taken
            </Label>
            <div id="time-taken" className="mt-1 font-medium tabular-nums">
              {formatTime(timeTaken)}
            </div>
          </div>

          {hasPressedCheckResults ? (
            <>
              {/* Score (only after submission) */}
              <div className="rounded-md border p-3 border-green-600 bg-green-50">
                <Label className="text-muted-foreground text-green-600">Score</Label>
                <div className="mt-1 font-medium tabular-nums text-green-600">
                  {userScoreAfterSubmission !== null
                    ? `${userScoreAfterSubmission}/${TOTAL_QUESTIONS}`
                    : "-"}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Pause Timer */}
              < div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex flex-col">
                  <Label htmlFor="pause-timer" className="text-muted-foreground">
                    Pause Timer
                  </Label>
                  <span id="pause-timer-desc" className="sr-only">
                    Press to pause the timer
                  </span>
                </div>
                <Button onClick={() => setIsPaused((prev) => !prev)} id="pause-timer" aria-describedby="pause-timer-desc" variant="secondary">
                  {isPaused ? 'Play' : 'Stop'}
                </Button>
              </div>
            </>
          )}

          {/* Flag for review */}
          <div className="flex items-center justify-between rounded-md border p-3">
            <Label htmlFor="flag-review" className="text-muted-foreground">
              Report Error
            </Label>
            <Switch id="flag-review" aria-label="Flag this question for review" />
          </div>
        </div>
      </CardContent >

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Navigation / Actions */}
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
          <Button
            variant="ghost"
            aria-label="Go to previous question"
            onClick={PrevSet}
            disabled={currentIndex === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              // When "Check Results" is pressed:
              CheckResulsts({ startedAt, timeTaken });
              setHasPressedCheckResults(true);
              setIsPaused(true)

              // ----------------- CALCULATE SCORE ------------------
              const score = calculatePracticeSetScore(userAttemptsWithAnswers);
              setUserScoreAfterSubmission(score);
            }}
            variant="outline"
            aria-label="Check results"
          >
            Check Results
          </Button>
          <Button
            variant="outline"
            onClick={NextSet}
            disabled={currentIndex === MAX_INDEX}
          >
            Next Question
          </Button>
        </div>
      </CardFooter>
    </Card >
  )
}

export default QuizStatusCard
