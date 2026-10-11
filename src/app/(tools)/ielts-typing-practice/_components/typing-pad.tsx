import { type KeyboardEvent, type RefObject } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TypingPadProps = {
  passage: string;
  currentIndex: number;
  currentCharacterWrong: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function TypingPad({ passage, currentIndex, currentCharacterWrong, inputRef, onFocus, onKeyDown }: TypingPadProps) {
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
    </Card>
  );
}
