import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  name: string
  studentId: string
  level: "Beginner" | "Intermediate" | "Advanced" | string
  totalTests: number
  accuracy: number
  totalStudyHours: number
  streakDays: number
  percentile?: number
}

export function ProfileSummaryCard(props: Props) {
  const { name, studentId, level, totalTests, accuracy, totalStudyHours, streakDays, percentile } = props

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-pretty">Profile Summary</span>
          <Badge variant="secondary" className="rounded-md">
            {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
        <Stat label="Student" value={name} subtle={studentId} />
        <Stat label="Tests Attempted" value={totalTests} />
        <Stat label="Overall Accuracy" value={`${accuracy}%`} />
        <Stat label="Study Time" value={`${totalStudyHours}h`} />
        <Stat label="Current Streak" value={`${streakDays} days`} />
        {typeof percentile === "number" ? <Stat label="Percentile" value={`${percentile}th`} /> : null}
      </CardContent>
    </Card>
  )
}

function Stat({ label, value, subtle }: { label: string; value: string | number; subtle?: string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
      {subtle ? <div className="text-muted-foreground mt-0.5 text-xs">{subtle}</div> : null}
    </div>
  )
}
