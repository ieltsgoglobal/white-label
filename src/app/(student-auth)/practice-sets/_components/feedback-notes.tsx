"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Props = {
  flaggedQuestions: {
    id: string
    reason: string
    hintsUsed: number
    viewedExplanation: boolean
  }[]
}

export function FeedbackNotes({ flaggedQuestions }: Props) {
  const [items, setItems] = useState(flaggedQuestions)

  function markResolved(id: string) {
    setItems((list) => list.filter((q) => q.id !== id))
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-pretty">Feedback & Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {items.length === 0 ? (
          <div className="text-muted-foreground">No flagged questions. Great job!</div>
        ) : (
          <ul className="space-y-2">
            {items.map((q) => (
              <li key={q.id} className="rounded-lg border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{q.id}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-md">
                      Hints: {q.hintsUsed}
                    </Badge>
                    <Badge className="rounded-md" variant={q.viewedExplanation ? "default" : "secondary"}>
                      {q.viewedExplanation ? "Viewed Explanation" : "Explanation Pending"}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => markResolved(q.id)}>
                      Mark Resolved
                    </Button>
                  </div>
                </div>
                <div className="text-muted-foreground mt-1 text-xs">{q.reason}</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
