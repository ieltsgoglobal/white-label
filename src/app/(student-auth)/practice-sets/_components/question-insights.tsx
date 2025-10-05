"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"

type Insights = {
  avgTimePerQuestionSec: number
  commonMistakes: string[]
  accuracyByType: { type: string; accuracy: number }[]
  accuracyTrend: { date: string; accuracy: number }[]
  confidenceVsPerformance?: { label: string; accuracy: number }[]
}

export function QuestionInsights({ insights }: { insights: Insights }) {

  async function copyMistakes() {
    try {
      await navigator.clipboard.writeText(insights.commonMistakes.join("\n"))
    } catch {
    }
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-pretty">
          <span>Question Attempt Insights</span>
          <Button variant="secondary" onClick={copyMistakes}>
            Copy Tips
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-3">
          <div className="text-muted-foreground text-xs">Average Time per Question</div>
          <div className="mt-1 font-medium">{insights.avgTimePerQuestionSec}s</div>
        </div>

        <ChartContainer
          config={{ accuracy: { label: "Accuracy", color: "var(--color-chart-3)" } }}
          className="rounded-lg border bg-background p-3"
        >
          <BarChart data={insights.accuracyByType} margin={{ left: 8, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="accuracy" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>

        <div className="rounded-lg border bg-background p-3">
          <div className="text-muted-foreground text-xs">Most Common Mistakes</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {insights.commonMistakes.map((m, i) => (
              <li key={i} className="text-pretty">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
