"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VocabQuizSetGetTotalAndCorrectQuestion } from "../_lib/vocab-quiz-session-storage"
import { useEffect, useState } from "react"
import { VocabMainSoundMaker } from "../../_lib/vocab-main-sound-maker"
import { useRouter } from "next/navigation"


export function VocabQuizProgressBar() {
    const router = useRouter()
    const [, forceUpdate] = useState(0)

    const { totalQuestions, correctAnswers } = VocabQuizSetGetTotalAndCorrectQuestion()

    const progress = totalQuestions === 0 ? 0 : (Number(correctAnswers) / Number(totalQuestions)) * 100

    // update the progress bar whenever the answer is submitted by user
    useEffect(() => {
        const handleUpdate = () => { forceUpdate((prev) => prev + 1) }
        window.addEventListener("used-to-update-quiz-progress-bar", handleUpdate)
        return () => { window.removeEventListener("used-to-update-quiz-progress-bar", handleUpdate) }
    }, [])

    return (
        <div className="sticky top-0 z-0 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { VocabMainSoundMaker.buttonPressed(); router.push("/vocab-ladder") }}
                    aria-label="Exit quiz"
                >
                    <X className="h-5 w-5" />
                </Button>

                <Progress value={progress} className="h-3 flex-1" />
            </div>
        </div>
    )
}
