"use client"

import { BarChart3, Flame, Medal, Trophy, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export type VocabBattleStats = {
  xp: number
  level: number
  wins: number
  losses: number
  draws: number
  totalDuels: number
  currentStreak: number
  bestStreak: number
}

export function UserStatsDialog({
  stats,
  triggerClassName,
}: {
  stats?: VocabBattleStats | null
  triggerClassName?: string
}) {
  const statItems = [
    { icon: Zap, label: "XP", value: stats ? stats.xp.toLocaleString() : "-" },
    { icon: Medal, label: "Level", value: stats ? stats.level.toString() : "-" },
    { icon: Trophy, label: "Wins", value: stats ? stats.wins.toString() : "-" },
    { icon: BarChart3, label: "Duels", value: stats ? stats.totalDuels.toString() : "-" },
  ]
  const xpProgress = stats ? Math.min((stats.xp % 1000) / 10, 100) : 0

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}>
          <BarChart3 className="mr-2 h-4 w-4" />
          Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border-2 bg-white p-4 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)] sm:max-w-xl sm:rounded-3xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold sm:text-2xl">Your Stats</DialogTitle>
        </DialogHeader>

        <div className="rounded-2xl border-2 bg-[#fff7e6] p-4 shadow-[0_5px_0_0_rgba(0,0,0,0.12)] sm:rounded-3xl sm:p-5 sm:shadow-[0_6px_0_0_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
                Battle level
              </p>
              <p className="mt-1 text-2xl font-extrabold sm:text-3xl">
                Level {stats ? stats.level : "-"}
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[5px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_6px_0_#d87700] sm:h-16 sm:w-16 sm:shadow-[0_7px_0_#d87700]">
              <Trophy className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
          </div>
          <Progress value={xpProgress} className="mt-5 h-3 bg-[#ffe2b8] [&>div]:bg-[#ff9700]" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {statItems.map((item) => (
            <StatTile key={item.label} {...item} />
          ))}
        </div>

        <Separator />

        <div className="space-y-3 text-sm">
          <InfoRow icon={Flame} label="Current streak" value={stats ? stats.currentStreak.toString() : "-"} />
          <InfoRow icon={Flame} label="Best streak" value={stats ? stats.bestStreak.toString() : "-"} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-2xl border-2 bg-white p-3 shadow-[0_5px_0_0_rgba(0,0,0,0.12)] sm:p-4">
      <Icon className="h-5 w-5 text-[#ff8a00]" />
      <div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 break-words text-xl font-extrabold sm:text-2xl">{value}</div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-white px-3 py-3 sm:px-4">
      <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-[#ff8a00]" />
        <span className="break-words">{label}</span>
      </span>
      <span className="shrink-0 font-medium">{value}</span>
    </div>
  )
}
