"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import {
  Loader2,
  Play,
  RotateCcw,
  Swords,
  Trophy,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { RulesDialog } from "./rules"
import { UserStatsDialog } from "./user-stats"
import type { VocabBattleStats } from "./user-stats"
import { LeaderboardDialog } from "./leaderboard"
import type { LeaderboardRow } from "./leaderboard"
import { VocabQuizSpeakWordButton } from "../../vocab-ladder/[id]/_components/vocab-quiz-speak-button"
import { NodeIcon } from "../../vocab-ladder/_components/vocab-helper-components"
import { VocabMainSoundMaker } from "../../vocab-ladder/_lib/vocab-main-sound-maker"
import { TOTAL_QUESTIONS } from "../_lib/socket"
import type { BattleQuestion, BattleStatus, FinalScore } from "../_lib/socket"

type VocabBattleUiProps = {
  connect: () => void
  finalScore: FinalScore | null
  notice: string
  question: BattleQuestion | null
  questionNumber: number
  selectedAnswer: string | null
  status: BattleStatus
  submitAnswer: (answer: string) => void
  leaderboard?: LeaderboardRow[]
  stats?: VocabBattleStats | null
}

export function VocabBattleUi({
  connect,
  finalScore,
  notice,
  question,
  questionNumber,
  selectedAnswer,
  status,
  submitAnswer,
  leaderboard = [],
  stats = null,
}: VocabBattleUiProps) {
  const isBusy = status === "connecting" || status === "waiting"
  const isPlaying = status === "playing" && question
  const lastStatusToastRef = useRef("")

  useEffect(() => {
    if (status === "idle" || !notice) return

    const toastKey = `${status}:${notice}`
    if (lastStatusToastRef.current === toastKey) return
    lastStatusToastRef.current = toastKey

    if (status === "error" || status === "opponent_left") {
      toast.error(notice)
      return
    }

    toast(notice)
  }, [notice, status])

  return (
    <main className="space-y-6">
      {isPlaying ? (
        <BattleQuestionCard
          question={question}
          questionNumber={questionNumber}
          selectedAnswer={selectedAnswer}
          onAnswer={submitAnswer}
        />
      ) : status === "finished" && finalScore ? (
        <ResultCard finalScore={finalScore} onConnect={connect} />
      ) : isBusy ? (
        <WaitingCard status={status} />
      ) : (
        <LobbyCard
          status={status}
          leaderboard={leaderboard}
          stats={stats}
          onConnect={connect}
        />
      )}
    </main>
  )
}

// MISC CODE

function LobbyCard({
  status,
  leaderboard,
  stats,
  onConnect,
}: {
  status: BattleStatus
  leaderboard: LeaderboardRow[]
  stats?: VocabBattleStats | null
  onConnect: () => void
}) {
  const isWaiting = status === "connecting" || status === "waiting"
  const isBusy = isWaiting
  const isRecoverable = status === "opponent_left" || status === "error"
  const title = isWaiting ? "Finding an opponent" : "Ready for Combat?"
  const description = isWaiting
    ? "Keep this page open. The first question appears when another student joins."
    : "Sharpen your lexicon and compete in a five-question vocabulary duel."

  return (
    <Card className="overflow-hidden rounded-3xl border-2 bg-white shadow-[3px_6px_0_0_rgba(0,0,0,0.12)]">
      <CardContent className="p-6 md:p-10">
        <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 bg-white px-6 py-14 text-center shadow-[0_8px_0_0_rgba(0,0,0,0.12)]">
          <div className="absolute right-10 top-10 hidden text-muted md:block">
            <Swords className="h-28 w-28 opacity-10" />
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_10px_0_#d87700]">
            <NodeIcon icon="star" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-normal sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => {
                VocabMainSoundMaker.buttonPressed()
                onConnect()
              }}
              disabled={isWaiting}
              size="lg"
              className="h-14 rounded-2xl bg-[#ff9700] px-8 text-base font-bold text-white shadow-[0_6px_0_0_#d87700] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#ff9700] active:translate-y-1 active:shadow-[0_2px_0_0_#d87700]"
            >
              {isBusy ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isBusy ? "Matching..." : "Start Battle"}
            </Button>
            <UserStatsDialog stats={stats} triggerClassName={secondaryActionClassName} />
            <LeaderboardDialog rows={leaderboard} triggerClassName={secondaryActionClassName} />
            <RulesDialog triggerClassName={secondaryActionClassName} />
            {isRecoverable ? (
              <Button
                variant="outline"
                onClick={() => {
                  VocabMainSoundMaker.buttonPressed()
                  onConnect()
                }}
                size="lg"
                className="h-14 rounded-2xl border-2 font-bold shadow-[0_5px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const secondaryActionClassName =
  "h-14 rounded-2xl border-2 px-5 font-bold shadow-[0_5px_0_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]"

function WaitingCard({ status }: { status: BattleStatus }) {
  const isConnecting = status === "connecting"

  return (
    <Card className="overflow-hidden rounded-3xl border-2 bg-white shadow-[3px_6px_0_0_rgba(0,0,0,0.12)]">
      <CardContent className="p-6 md:p-10">
        <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border-2 bg-white px-6 py-14 text-center shadow-[0_8px_0_0_rgba(0,0,0,0.12)]">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_10px_0_#d87700]">
            <Loader2 className="h-12 w-12 animate-spin" />
          </div>

          <h2 className="mt-8 text-3xl font-bold tracking-normal">
            {isConnecting ? "Connecting to battle server" : "Finding an opponent"}
          </h2>
        </div>
      </CardContent>
    </Card>
  )
}

function BattleQuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
}: {
  question: BattleQuestion
  questionNumber: number
  selectedAnswer: string | null
  onAnswer: (answer: string) => void
}) {
  return (
    <Card className="overflow-hidden rounded-3xl border-2 bg-white shadow-[3px_6px_0_0_rgba(0,0,0,0.12)]">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Question {questionNumber} of {TOTAL_QUESTIONS}</CardTitle>
          </div>
          <Badge className="bg-[#ff9700] text-white hover:bg-[#ff9700]">Live session</Badge>
        </div>
        <Progress
          value={(questionNumber / TOTAL_QUESTIONS) * 100}
          className="h-3 bg-[#ffe2b8] [&>div]:bg-[#ff9700]"
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-3xl border-2 bg-white p-8 text-center shadow-[0_6px_0_0_rgba(0,0,0,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a00]">Target word</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <VocabQuizSpeakWordButton word={question.word} />
            <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
              {question.word}
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose the closest meaning
          </p>
        </div>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option

            return (
              <Card
                key={option}
                onClick={() => {
                  if (selectedAnswer) return
                  VocabMainSoundMaker.optionSelected()
                  onAnswer(option)
                  toast.success("Answer submitted", {
                    description: "Waiting for your opponent before moving to the next word.",
                  })
                }}
                className={cn(
                  "cursor-pointer rounded-3xl border-2 p-5 transition-all duration-150 shadow-[0_6px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]",
                  selectedAnswer && "cursor-default hover:translate-y-0 active:translate-y-0",
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-[0_6px_0_0_rgb(59_130_246)]"
                    : "border-border"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg font-medium">{option}</span>
                </div>
              </Card>
            )
          })}
        </div>

      </CardContent>
    </Card>
  )
}

function ResultCard({
  finalScore,
  onConnect,
}: {
  finalScore: FinalScore
  onConnect: () => void
}) {
  return (
    <Card className="overflow-hidden rounded-3xl border-2 bg-white shadow-[3px_6px_0_0_rgba(0,0,0,0.12)]">
      <CardContent className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_10px_0_#d87700]">
          <Trophy className="h-11 w-11" />
        </div>

        <h2 className="mt-8 text-3xl font-bold tracking-normal">{getResultText(finalScore)}</h2>
        <p className="mt-2 text-sm text-muted-foreground">The five-question battle is complete.</p>
        <p className={cn("mt-2 text-sm font-bold text-[#ff8a00]", finalScore.saveStatus === "error" && "text-destructive")}>
          {getSaveStatusText(finalScore)}
        </p>

        <div className="mt-8 w-full max-w-sm rounded-3xl border-2 bg-white p-6 shadow-[0_6px_0_0_rgba(0,0,0,0.12)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff8a00]">Final score</p>
          <div className="mt-4 flex items-center justify-center gap-8">
            <div>
              <p className="text-4xl font-bold">{finalScore.score}</p>
              <p className="text-sm text-muted-foreground">You</p>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div>
              <p className="text-4xl font-bold">{finalScore.opponentScore}</p>
              <p className="text-sm text-muted-foreground">Opponent</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              VocabMainSoundMaker.buttonPressed()
              onConnect()
            }}
            className="h-14 rounded-2xl bg-[#ff9700] px-8 text-base font-bold text-white shadow-[0_6px_0_0_#d87700] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#ff9700] active:translate-y-1 active:shadow-[0_2px_0_0_#d87700]"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play again
          </Button>
          <Button onClick={() => { VocabMainSoundMaker.buttonPressed(); window.location.href = "/vocab-battle"; }} asChild variant="outline" className="h-14 rounded-2xl border-2 px-8 text-base font-bold shadow-[0_5px_0_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]">
            <Link href="/vocab-battle#" onClick={() => VocabMainSoundMaker.buttonPressed()}>
              Go to dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getResultText({ score, opponentScore }: FinalScore) {
  if (score === opponentScore) return "Draw"
  return score > opponentScore ? "You won" : "Opponent won"
}

function getSaveStatusText(finalScore: FinalScore) {
  if (finalScore.xpEarned) return `+${finalScore.xpEarned} XP earned`
  if (finalScore.saveStatus === "saving") return "Saving battle result..."
  if (finalScore.saveStatus === "error") return "Log in to save results."
  return ""
}
