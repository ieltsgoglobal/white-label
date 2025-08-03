"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnswerRadio from "../additional-ui/AnswerRadio"

interface Question {
  id: number
  statement: string
}

interface TrueFalseNotGivenSection {
  questionType: "true-false-notgiven"
  questions: Question[]
}

const optionLabels = ["TRUE", "FALSE", "NOT GIVEN"]
const optionLetters = ["A", "B", "C"]

export default function TrueFalseNotGiven(props: TrueFalseNotGivenSection) {
  const section: TrueFalseNotGivenSection = props

  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="text-xl">
          Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
        </CardTitle>
        <p className="text-muted-foreground leading-relaxed">
          Choose <span className="font-bold">TRUE</span> if the statement agrees with the information given in the text, choose <span className="font-bold">FALSE</span> if the statement contradicts the information, or choose <span className="font-bold">NOT GIVEN</span> if there is no information on this.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {section.questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-lg text-foreground min-w-[32px]">{question.id}</span>
              <p className="text-foreground leading-relaxed font-medium">{question.statement}</p>
            </div>

            <div className="ml-11">
              <AnswerRadio question={{ id: question.id, options: optionLabels }} optionLetters={optionLetters} trueFalseNotGiven />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}