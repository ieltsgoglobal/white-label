import { Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TypingMetrics({ remainingSeconds }: { remainingSeconds: number }) {
  return (
    <section className="mt-8">
      <Card className="rounded-3xl">
        <CardContent className="flex items-center justify-center gap-3 p-4">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Clock3 className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-muted-foreground">Time remaining</p>
            <p className="text-2xl font-bold tabular-nums">{remainingSeconds}s</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
