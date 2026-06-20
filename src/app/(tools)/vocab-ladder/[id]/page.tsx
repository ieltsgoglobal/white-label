"use client"

import { useParams } from "next/navigation"
import quizData from "../_lib/vocab-quiz-data.json"
import { VocabQuizDisplayQuestion } from "./_components/vocab-quiz-display-questions"
import { useEffect, useState } from "react"
import { VocabQuizProgressBar } from "./_components/vocab-quiz-progress-bar"
import { createVocabQuizSetSession } from "./_lib/vocab-quiz-session-storage"

export default function VocabLadderQuizPage() {

    // hack: we dont want child components to read sessionStorage until the parent updates it
    // this make sure child component doesnt load until sessionStorage loads
    const [isSessionStorageReady, setIsSessionStorageReady] = useState(false)

    const params = useParams()
    const id = params.id as string
    const quiz = quizData.quizzes.find((quiz) => quiz.id === id)

    // init the quiz in sessionStorage
    useEffect(() => {
        if (!quiz) return
        createVocabQuizSetSession(quiz)
        setIsSessionStorageReady(true)
    }, [quiz])

    if (!quiz) return <div>Quiz not found</div>
    if (!isSessionStorageReady) return null

    return (
        <div>
            <VocabQuizProgressBar />
            <VocabQuizDisplayQuestion />
        </div>
    )
}