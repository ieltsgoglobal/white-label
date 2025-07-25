"use client"

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
    <div className="bg-background rounded-3xl border border-border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Choose <span className="font-bold">TRUE</span> if the statement agrees with the information given in the text, choose <span className="font-bold">FALSE</span> if the statement contradicts the information, or choose <span className="font-bold">NOT GIVEN</span> if there is no information on this.
        </p>
      </div>

      <div className="space-y-8">
        {section.questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-lg text-foreground mt-1 min-w-[32px]">{question.id}</span>
              <p className="text-foreground leading-relaxed font-medium">{question.statement}</p>
            </div>

            <div className="ml-11">
              <AnswerRadio question={{ id: question.id, options: optionLabels }} optionLetters={optionLetters} trueFalseNotGiven />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}