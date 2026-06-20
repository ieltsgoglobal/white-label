"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VocabQuizSpeakWordButton } from "./vocab-quiz-speak-button"
import { getRandomVocabQuestionWhichIsNotCorrect, submitVocabQuizQuestionAnswer } from "../_lib/vocab-quiz-session-storage"
import { markVocabQuizSetAsCompletedByUpdatingLadder } from "../../_lib/vocab-ladder-data-manager"
import { VocabMainSoundMaker } from "../../_lib/vocab-main-sound-maker"
import { useRouter } from "next/navigation"

export function VocabQuizDisplayQuestion() {
    const router = useRouter()

    // get question which is not marked correct from sessionstorage
    const [question, setQuestion] = useState(() => getRandomVocabQuestionWhichIsNotCorrect())

    const [result, setResult] = useState<{ isCorrect: boolean; correctAnswer: string; explanation: string } | null>(null)

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    function onSubmit() {
        if (!question || !selectedAnswer) return

        const result = submitVocabQuizQuestionAnswer(question.id, selectedAnswer)
        if (!result) return

        playResultSound(result)

        setResult(result)
    }

    function onContinue() {
        const nextQuestion = getRandomVocabQuestionWhichIsNotCorrect()

        // no quesiton means that quiz has ended
        if (!nextQuestion) {
            markVocabQuizSetAsCompletedByUpdatingLadder()
            VocabMainSoundMaker.ladderLevelUnlocked()
            router.push("/vocab-ladder")
            return
        }

        VocabMainSoundMaker.continue()
        setQuestion(nextQuestion)
        setSelectedAnswer(null)
        setResult(null)
    }

    if (!question) { return null }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-2xl px-4 py-10">
                    <div className="mb-10">

                        <h1 className="flex text-4xl font-bold tracking-tight gap-2">
                            <VocabQuizSpeakWordButton word={question.word} />
                            <span>{question.word}</span>
                        </h1>

                        <p className="text-muted-foreground mt-3">
                            Select the correct meaning
                        </p>
                    </div>

                    <div className="space-y-4">
                        {question.options.map((option) => {
                            return (
                                <Card
                                    key={option}
                                    onClick={() => {
                                        if (result) return
                                        VocabMainSoundMaker.optionSelected()
                                        setSelectedAnswer(option)
                                    }}
                                    className={`
                                        cursor-pointer p-5 rounded-3xl border-2
                                        transition-all duration-150
                                        shadow-[0_6px_0_0_rgba(0,0,0,0.15)]
                                        hover:-translate-y-0.5
                                        active:translate-y-1
                                        active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]
                                        ${getOptionClassName({ option, selectedAnswer, result })}
                                    `}
                                >
                                    <div className="text-lg font-medium">
                                        {option}
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 border-t bg-background">
                <div className="max-w-2xl mx-auto p-4">
                    <Button
                        onClick={result ? onContinue : onSubmit}
                        disabled={!selectedAnswer && !result}
                        className={`
                            w-full h-14 text-lg rounded-2xl
                            shadow-[0_6px_0_0_rgba(0,0,0,0.2)]
                            hover:-translate-y-0.5
                            active:translate-y-1
                            active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)]
                            transition-all duration-150
                            ${result ? "scale-[1.02]" : ""}
                        `}
                    >
                        {result ? "Continue →" : "Check Answer"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

// MISC CODE

function getOptionClassName({
    option,
    selectedAnswer,
    result,
}: {
    option: string
    selectedAnswer: string | null
    result: {
        isCorrect: boolean
        correctAnswer: string
        explanation: string
    } | null
}) {
    if (!result) {
        return selectedAnswer === option
            ? "border-blue-500 bg-blue-50 shadow-[0_6px_0_0_rgb(59_130_246)]"
            : "border-border shadow-[0_6px_0_0_rgba(0,0,0,0.15)]"
    }

    if (option === result.correctAnswer) {
        return "border-green-500 bg-green-50 shadow-[0_6px_0_0_rgb(34_197_94)]"
    }

    if (selectedAnswer === option && option !== result.correctAnswer) {
        return "border-red-500 bg-red-50 shadow-[0_6px_0_0_rgb(239_68_68)]"
    }

    return "border-border shadow-[0_6px_0_0_rgba(0,0,0,0.15)]"

}


function playResultSound(result: { isCorrect: boolean }) {

    if (result.isCorrect) {
        VocabMainSoundMaker.correctAnswer()
        return
    }

    VocabMainSoundMaker.wrongAnswer()
}