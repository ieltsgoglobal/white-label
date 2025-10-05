"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

type PerformanceData = {
  totals: {
    questionsAttempted: number
    correct: number
    incorrect: number
    accuracy: number
    avgTimePerQuestionSec: number
    avgTimePerTestMin: number
    fastestCompletionMin: number
    slowestCompletionMin: number
  }
  difficultyBreakdown: { difficulty: string; accuracy: number }[]
  topicBreakdown: { topic: string; accuracy: number }[]
  accuracyTrend: { date: string; accuracy: number }[]
}

export function PerformanceSummary({ performance }: { performance: PerformanceData }) {
  const { totals, topicBreakdown, accuracyTrend } = performance

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-pretty">Performance Summary</span>
          <span className="text-muted-foreground text-xs">All-time</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KPI label="Questions Attempted" value={totals.questionsAttempted.toLocaleString()} />
          <KPI label="Correct / Incorrect" value={`${totals.correct}/${totals.incorrect}`} />
          <KPI label="Accuracy" value={`${totals.accuracy}%`} />
          <KPI label="Avg Time/Question" value={`${totals.avgTimePerQuestionSec}s`} />
          <KPI label="Avg Time/Test" value={`${totals.avgTimePerTestMin}m`} />
          <KPI label="Fastest Completion" value={`${totals.fastestCompletionMin}m`} />
          <KPI label="Slowest Completion" value={`${totals.slowestCompletionMin}m`} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartContainer
            config={{
              accuracy: { label: "Accuracy", color: "var(--color-chart-1)" },
            }}
            className="rounded-lg border bg-background p-3"
          >
            <LineChart data={accuracyTrend} margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="accuracy" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>

          <ChartContainer
            config={{
              accuracy: { label: "Accuracy", color: "var(--color-chart-2)" },
            }}
            className="rounded-lg border bg-background p-3"
          >
            <BarChart data={topicBreakdown} margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent hideIcon />} />
              <Bar dataKey="accuracy" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
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
