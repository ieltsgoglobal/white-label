import { useMockAttempts } from "@/app/(student-auth)/mock-scores/_component/MockAttemptContext";
import { Textarea } from "@/components/ui/textarea";
import { getReviewMode } from "@/lib/mock-tests/indexedDb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AnswerTextAreaProps {
    // value = what user has attempted
    value: string;
    setResponse: (val: string) => void;

    // 1 = TASK1, 2 = TASK2
    activeTab: 1 | 2
}

export default function AnswerTextArea({ value, setResponse, activeTab }: AnswerTextAreaProps) {


    // --------------------- MOCK TEST REVIEW CODE ----------------------

    const [isReviewMode, setIsReviewMode] = useState(false)

    // gets value of IsReviewMode ON from indexedDB
    useEffect(() => {
        getReviewMode().then((value) => {
            setIsReviewMode(value)
        })
    }, [])

    // display what user has done in test
    // pathname-id is basically the firebase collection id
    const { id } = useParams() as { id: string }

    // match the pathname-id with attempts we have to get the details of test we want to review
    const mockAttemptContext = useMockAttempts(false) // ⚠️ no crash if undefined
    const attempts = mockAttemptContext?.attempts || [] // use Context API to get test attempts done by user

    const [userAttemptedAnswer, setUserAttemptedAnswer] = useState("")
    const [aiScore, setAiScore] = useState<number | null>(null);

    useEffect(() => {
        if (!isReviewMode) return

        const loadData = async () => {
            // find the correct test attempt using id from useParams
            const matchingAttempt = attempts.find(attempt => attempt.id === id)
            if (!matchingAttempt) return

            // store what user has done in the test attempts
            const answers = matchingAttempt["writing"]
            console.log(answers)
            if (answers) {
                setUserAttemptedAnswer(answers[activeTab - 1].response || '')
            }

            // Select correct task score
            const score = activeTab === 1 ? matchingAttempt.scores?.writing.task1 : matchingAttempt.scores?.writing.task2;
            setAiScore(score ?? null);
        }
        loadData()
    }, [isReviewMode, id, attempts, activeTab])

    // ------------------------------------------------------------------------

    return (
        <div className="flex flex-col h-full">
            <Textarea
                placeholder="Write here..."
                value={isReviewMode ? userAttemptedAnswer : value}
                onChange={(e) => setResponse(e.target.value)}
                className="h-full min-h-[600px] resize-none border p-6 text-base leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {isReviewMode && aiScore !== null && (
                <div className="p-6 bg-muted-foreground/10 mt-4 rounded-md text-lg font-medium">
                    Score by AI for Task {activeTab}: <span className="text-blue-600">{aiScore} Band</span>
                </div>
            )}
        </div>
    )
}