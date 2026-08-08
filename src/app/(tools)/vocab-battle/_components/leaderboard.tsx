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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {rows.length ? rows.map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-2xl border-2 bg-white p-4 shadow-[0_4px_0_0_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    row.rank === 1 ? "bg-[#ff9700] text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {row.rank}
                </span>
                <span className="font-semibold">{row.name}</span>
              </div>
              <span className="font-bold">{row.points} pts</span>
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
