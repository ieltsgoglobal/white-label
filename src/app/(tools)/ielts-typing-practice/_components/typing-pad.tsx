import { type KeyboardEvent, type RefObject } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TypingPadProps = {
  passage: string;
  currentIndex: number;
  currentCharacterWrong: boolean;
  isTransitioning: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function TypingPad({ passage, currentIndex, currentCharacterWrong, isTransitioning, inputRef, onFocus, onKeyDown }: TypingPadProps) {
  return (
    <Card className="relative mt-6 rounded-3xl" onClick={onFocus}>
      <div className="min-h-[18rem] rounded-2xl border bg-muted/40 p-6 font-mono text-xl leading-[2.2] tracking-wide sm:p-8 sm:text-2xl">
        {passage.split("").map((character, index) => (
          <span
            className={cn(
              index < currentIndex && "rounded bg-emerald-500/15 text-emerald-500",
              index === currentIndex && currentCharacterWrong && "rounded bg-destructive/20 text-destructive underline decoration-destructive",
              index === currentIndex && !currentCharacterWrong && "rounded bg-primary/15 text-foreground underline decoration-primary decoration-2 underline-offset-4",
              index > currentIndex && "text-muted-foreground",
            )}
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ))}
      </div>
      <input aria-label="Typing test input" className="sr-only" onKeyDown={onKeyDown} readOnly ref={inputRef} value="" />
      {isTransitioning && <Overlay icon={<CheckCircle2 className="h-8 w-8 text-primary" />} title="Paragraph complete!" description="Loading your next passage..." />}
    </Card>
  );
}

function Overlay({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="absolute inset-0 grid place-items-center rounded-3xl bg-background/90 p-6 text-center backdrop-blur-sm"><div className="space-y-2"><div className="mx-auto w-fit text-primary">{icon}</div><h2 className="text-xl font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{description}</p></div></div>;
}
