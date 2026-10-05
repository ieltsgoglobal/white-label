"use client";

import { useTypingTest } from "../_lib/use-typing-test";
import { TypingMetrics } from "./typing-metrics";
import { TypingPad } from "./typing-pad";
import { TypingResultsDialog } from "./typing-results-dialog";

export function TypingPractice() {
  const typingTest = useTypingTest();

  return (
    <main>

      <TypingPad
        currentCharacterWrong={typingTest.currentCharacterWrong}
        currentIndex={typingTest.currentIndex}
        inputRef={typingTest.inputRef}
        isTransitioning={typingTest.isTransitioning}
        onFocus={typingTest.focusInput}
        onKeyDown={typingTest.handleKeyDown}
        passage={typingTest.passage}
      />

      <TypingMetrics remainingSeconds={typingTest.remainingSeconds} />

      <TypingResultsDialog
        accuracy={typingTest.accuracy}
        cpm={typingTest.cpm}
        onRetry={typingTest.reset}
        open={typingTest.openResults}
        wpm={typingTest.wpm}
      />
    </main>
  );
}
