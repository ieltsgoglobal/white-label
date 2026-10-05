import { RefreshCcw, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type TypingResultsDialogProps = {
  open: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
  onRetry: () => void;
};

type ResultMetricProps = {
  value: string | number;
  label: string;
};

export function TypingResultsDialog({
  open,
  wpm,
  cpm,
  accuracy,
  onRetry,
}: TypingResultsDialogProps) {
  const feedback = wpm > 25
    ? {
        title: "Speed Master",
        message: "Amazing! Your typing speed is impressive.",
      }
    : {
        title: "Getting Better",
        message: "Good effort! Keep practicing to improve your speed.",
      };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onRetry()}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <button
          aria-label="Close results"
          className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={onRetry}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pt-3 text-center">
          <Trophy className="mx-auto h-10 w-10 text-primary" />
          <DialogTitle className="mt-3 text-3xl">{feedback.title}</DialogTitle>
          <DialogDescription className="mt-2 text-base">
            Your 60-second typing test is complete.
          </DialogDescription>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 text-center">
          <ResultMetric label="WPM" value={wpm} />
          <ResultMetric label="CPM" value={cpm} />
          <ResultMetric label="Accuracy" value={`${accuracy}%`} />
        </div>

        <p className="text-center text-muted-foreground">{feedback.message}</p>

        <Button className="mx-auto mt-2 gap-2" onClick={onRetry}>
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function ResultMetric({ value, label }: ResultMetricProps) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
