import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { getRandomTypingPassage, typingPassages } from "./typing-passages";

const TEST_DURATION = 60;
const PASSAGE_TRANSITION_DELAY = 2000;

type TestStatus = "idle" | "running" | "transitioning" | "finished";

const createTest = (passage: string) => ({
  passage,
  index: 0,
  remainingSeconds: TEST_DURATION,
  correctCharacters: 0,
  attemptedCharacters: 0,
  currentCharacterWrong: false,
  status: "idle" as TestStatus,
});

export function useTypingTest() {
  const [test, setTest] = useState(() => createTest(typingPassages[0]));
  const inputRef = useRef<HTMLInputElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement>();
  const wrongTypingAudioRef = useRef<HTMLAudioElement>();
  const { passage, index: currentIndex, remainingSeconds, correctCharacters, attemptedCharacters, currentCharacterWrong, status } = test;
  const isTransitioning = status === "transitioning";
  const isLocked = isTransitioning || status === "finished";
  const elapsedSeconds = TEST_DURATION - remainingSeconds;
  const wpm = elapsedSeconds ? Math.round((correctCharacters / 5) * (60 / elapsedSeconds)) : 0;
  const cpm = elapsedSeconds ? Math.round(correctCharacters * (60 / elapsedSeconds)) : 0;
  const accuracy = attemptedCharacters ? Math.round((correctCharacters / attemptedCharacters) * 100) : 0;

  const focusInput = useCallback(() => {
    if (!isLocked) inputRef.current?.focus();
  }, [isLocked]);

  const reset = useCallback(() => {
    setTest((current) => createTest(getRandomTypingPassage(current.passage)));
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if ((key.length !== 1 && key !== "Backspace") || isLocked || !remainingSeconds) return;

    event.preventDefault();
    const isCorrect = key === passage[currentIndex];
    const isLastCharacter = isCorrect && currentIndex === passage.length - 1;
    const audio = isCorrect ? typingAudioRef.current : wrongTypingAudioRef.current;

    if (audio) {
      audio.currentTime = 0;
      void audio.play();
    }

    setTest((current) => ({
      ...current,
      attemptedCharacters: current.attemptedCharacters + 1,
      correctCharacters: current.correctCharacters + Number(isCorrect),
      currentCharacterWrong: !isCorrect,
      index: current.index + Number(isCorrect),
      status: isLastCharacter ? "transitioning" : current.status === "idle" ? "running" : current.status,
    }));
  }, [currentIndex, isLocked, passage, remainingSeconds]);

  useEffect(() => {
    typingAudioRef.current = new Audio(new URL("../_sounds/typing.mp3", import.meta.url).toString());
    wrongTypingAudioRef.current = new Audio(new URL("../_sounds/wrong-typing.mp3", import.meta.url).toString());
    setTest((current) => createTest(getRandomTypingPassage(current.passage)));
  }, []);

  useEffect(() => {
    if (status !== "transitioning") return;

    const timeout = window.setTimeout(() => {
      setTest((current) => ({
        ...current,
        passage: getRandomTypingPassage(current.passage),
        index: 0,
        status: "running",
      }));
    }, PASSAGE_TRANSITION_DELAY);

    return () => window.clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    if (status !== "running" && status !== "transitioning") return;

    const interval = window.setInterval(() => {
      setTest((current) => ({
        ...current,
        remainingSeconds: Math.max(current.remainingSeconds - 1, 0),
        status: current.remainingSeconds === 1 ? "finished" : current.status,
      }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    focusInput();
  }, [currentIndex, focusInput, passage, status]);

  return {
    accuracy,
    cpm,
    currentCharacterWrong,
    currentIndex,
    focusInput,
    handleKeyDown,
    inputRef,
    isTransitioning,
    openResults: status === "finished",
    passage,
    remainingSeconds,
    reset,
    wpm,
  };
}
