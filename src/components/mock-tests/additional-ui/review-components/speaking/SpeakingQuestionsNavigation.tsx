// components/SpeakingQuestionsNavigation.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SpeakingQuestionsNavigationProps {
    questions: { id: number; transcript: string; audioUrl: string }[];
    currentQuestionIndex: number;
    onSelectQuestion: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
}

export default function SpeakingQuestionsNavigation({
    questions,
    currentQuestionIndex,
    onSelectQuestion,
    onPrev,
    onNext,
}: SpeakingQuestionsNavigationProps) {
    return (
        <Card className="border border-border">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onPrev}
                        disabled={currentQuestionIndex === 0}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        {questions.map((_, index) => (
                            <Button
                                key={index}
                                size="sm"
                                variant={index === currentQuestionIndex ? "default" : "outline"}
                                onClick={() => onSelectQuestion(index)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onNext}
                        disabled={currentQuestionIndex === questions.length - 1}
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}