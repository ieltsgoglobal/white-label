"use client"

import { useState } from "react";
import QuestionRenderer from "../../listening/_components/QuestionRenderer";
import QuizStatusCard from "../../listening/_components/QuizStatusCard";
import PassageDisplay from "./PassageDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";

const MAX_PASSAGES = 3;

export default function ReadingUI({ questions, passages }: { questions: any[], passages: any[] }) {

    if (!Array.isArray(questions) || questions.length === 0) {
        return <div className="text-muted-foreground">No reading data available.</div>;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestions = questions[currentIndex] || [];
    const currentPassage = passages[currentIndex] || {};

    return (
        <div className="space-y-10 p-6 bg-muted-foreground/10">
            <QuizStatusCard
                NextSet={() => { setCurrentIndex((prev) => Math.min(prev + 1, MAX_PASSAGES - 1)) }}
                PrevSet={() => { setCurrentIndex((prev) => Math.max(prev - 1, 0)) }}
                currentIndex={currentIndex}
                CheckResulsts={() => { alert("Check Results clicked") }}
                MAX_INDEX={MAX_PASSAGES - 1}
            />


            <div className="grid grid-cols-2 gap-8">
                <PassageDisplay
                    title={currentPassage.title}
                    text={currentPassage.text}
                    answer_key_range={currentPassage.answer_key_range}
                    task_part={currentPassage.task_part}
                />

                <div className="max-h-[100vh] bg-background/80 rounded-3xl border shadow-sm">
                    <ScrollArea className="h-full px-4 py-6">
                        <div className="flex flex-col gap-6">
                            {currentQuestions.map((questionRaw: any, index: number) => (
                                <QuestionRenderer
                                    key={index}
                                    questionRaw={questionRaw}
                                    index={index}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

        </div>
    )
}