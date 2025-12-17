"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StatItem = {
  title: string
  value: string | number
}

export function PerformanceSummary({ stats, section }: { stats: StatItem[], section: string }) {

  const testsAttempted = Number(
    stats.find((s) => s.title === "Number of Tests Attempted")?.value ?? 0
  )

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-pretty">{section.charAt(0).toUpperCase() + section.slice(1).toLowerCase() + " "} Performance Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {testsAttempted > 0 ? <StatsGrid stats={stats} /> : <EmptyPerformanceState />}

      </CardContent>
    </Card>
  )
}

function KPI({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  )
}

function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((item) => (
        <KPI key={item.title} label={item.title} value={item.value} />
      ))}
    </div>
  )
}

function EmptyPerformanceState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        No performance data available yet
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Start attempting questions to see your progress here.
      </p>
    </div>
  )
}
