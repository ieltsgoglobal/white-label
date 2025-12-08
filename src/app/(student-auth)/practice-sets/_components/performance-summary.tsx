"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StatItem = {
  title: string
  value: string | number
}

const fakeStats: StatItem[] = [
  { title: "Total Questions", value: 1500 },
  { title: "Questions Attempted", value: 2420 },
  { title: "Correct", value: 1876 },
  { title: "Accuracy", value: "78%" },
  { title: "Avg Time / Question", value: "41s" },
  { title: "Avg Time / Test", value: "39m" },
  { title: "Fastest Completion", value: "26m" },
  { title: "Slowest Completion", value: "72m" },
]

export function PerformanceSummary({ stats = fakeStats, section }: { stats: StatItem[], section: string }) {

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-pretty">{section.charAt(0).toUpperCase() + section.slice(1).toLowerCase() + " "} Performance Summary</span>
          <span className="text-muted-foreground text-xs">All-time</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((item) => (
            <KPI key={item.title} label={item.title} value={item.value} />
          ))}
        </div>
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
