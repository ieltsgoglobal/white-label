"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type Props = {
  streakDays: number
  avgDailyStudyMin: number
  testsPerWeek: number
  preferredTime: string
  devices: { device: string; pct: number }[]
}

export function EngagementMetrics(props: Props) {
  const { streakDays, avgDailyStudyMin, testsPerWeek, preferredTime, devices } = props
  const [goal, setGoal] = useState(avgDailyStudyMin.toString())

  function saveGoal() {
    const n = Number(goal)
    if (!Number.isFinite(n) || n <= 0) {
      return
    }
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-pretty">
          <span>Engagement</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Set Daily Goal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Daily Study Goal (minutes)</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  aria-label="Daily study goal in minutes"
                />
                <Button onClick={saveGoal}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Practice Streak" value={`${streakDays} days`} />
        <Stat label="Avg Daily Study" value={`${avgDailyStudyMin} min`} />
        <Stat label="Tests / Week" value={testsPerWeek} />
        <Stat label="Preferred Time" value={preferredTime} />
        <div className="col-span-2 rounded-lg border bg-background p-3">
          <div className="text-muted-foreground text-xs">Devices Used</div>
          <ul className="mt-1 text-sm">
            {devices.map((d, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{d.device}</span>
                <span className="font-medium">{d.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  )
}
