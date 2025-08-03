"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import AnswerRadio from "../additional-ui/AnswerRadio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
    id: number
    statement: string
}

interface YesNoNotGivenSection {
    questionType: "yes-no-notgiven"
    questions: Question[]
}

const optionLabels = ["YES", "NO", "NOT GIVEN"]
const optionLetters = ["A", "B", "C"]


export default function YesNoNotGiven(props: YesNoNotGivenSection) {
    const section: YesNoNotGivenSection = props
    console.log(props)
    const handleAnswerChange = (questionId: number, answer: string) => {
        // track answers if needed
    }

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                    Do the following statements agree with the views given in the text? Choose <span className="font-bold">YES</span> if the statement agrees with the views, <span className="font-bold">NO</span> if it contradicts them, or <span className="font-bold">NOT GIVEN</span> if it is impossible to say what the writer thinks.
                </p>
            </CardHeader>

            <CardContent>
                {section.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4 mb-6">
                        <div className="flex items-start space-x-3">
                            <span className="font-bold text-lg text-foreground mt-1 min-w-[32px]">{question.id}</span>
                            <p className="text-foreground leading-relaxed font-medium">{question.statement}</p>
                        </div>

                        <div className="ml-11">
                            <AnswerRadio question={{ id: question.id, options: optionLabels }} optionLetters={optionLetters} trueFalseNotGiven />
                        </div>

                        {index < section.questions.length - 1 && <div className="border-b border-border mt-6"></div>}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}