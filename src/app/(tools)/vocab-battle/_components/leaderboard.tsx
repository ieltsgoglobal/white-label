"use client"

import { Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type LeaderboardRow = {
  name: string
  points: string
  rank: number
}

export function LeaderboardDialog({
  rows = [],
  triggerClassName,
}: {
  rows?: LeaderboardRow[]
  triggerClassName?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}>
          <Trophy className="mr-2 h-4 w-4" />
          Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border-2 bg-white p-4 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)] sm:rounded-3xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold sm:text-2xl">Leaderboard</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {rows.length ? rows.map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between gap-3 rounded-2xl border-2 bg-white p-3 shadow-[0_4px_0_0_rgba(0,0,0,0.12)] sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    row.rank === 1 ? "bg-[#ff9700] text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {row.rank}
                </span>
                <span className="min-w-0 break-words font-semibold">{row.name}</span>
              </div>
              <span className="shrink-0 font-bold">{row.points} pts</span>
            </div>
          )) : (
            <div className="rounded-2xl border-2 bg-white p-4 text-sm text-muted-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.12)]">
              Leaderboard will appear after the first saved battle.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
