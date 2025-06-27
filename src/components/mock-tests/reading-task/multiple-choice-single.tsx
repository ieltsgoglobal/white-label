"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  question: string
  options: string[]
}

interface MultipleChoiceSection {
  questionType: "multiple-choice-single"
  questions: Question[]
}

export default function MultipleChoiceSingle(props: MultipleChoiceSection) {
  const section: MultipleChoiceSection = props

  const handleAnswerChange = (questionId: number, answer: string) => {

  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Questions {section.questions[0].id} - {section.questions[section.questions.length - 1].id}
        </h2>
        <p className="text-gray-600">Choose the correct answer.</p>
      </div>

      <div className="space-y-8">
        {section.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-lg text-gray-900 mt-1 min-w-[32px]">{question.id}</span>
              <p className="text-gray-800 leading-relaxed font-medium">{question.question}</p>
            </div>

            <div className="ml-11">
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="space-y-4"
              >
                {question.options.map((option, optionIndex) => {
                  const label = String.fromCharCode(65 + optionIndex) // A, B, C, ...
                  return (
                    <div key={label} className="flex items-start space-x-3 group">
                      <RadioGroupItem
                        value={label}
                        id={`q${question.id}-${label}`}
                        className="mt-1 border-gray-300 text-black"
                      />
                      <Label
                        htmlFor={`q${question.id}-${label}`}
                        className="text-gray-700 leading-relaxed cursor-pointer flex-1 group-hover:text-gray-900 transition-colors"
                      >
                        <span className="font-semibold mr-3 text-gray-900">{label}</span>
                        {option}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            {/* {index < questions.length - 1 && <div className="border-b border-gray-100 mt-6"></div>} */}
          </div>
        ))}
      </div>
    </div>

  )
}
