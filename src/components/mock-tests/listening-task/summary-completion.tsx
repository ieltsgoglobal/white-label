"use client"

import AnswerInput from "../additional-ui/AnswerInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SummaryQuestion {
    questionType: "summary-completion"
    question: {
        id: number[]
        title: string
        passageTemplate: string
        optionList?: {
            letter: string
            text: string
        }[]
    }
    multiWord?: boolean
}

export default function SummaryCompletion(props: SummaryQuestion) {
    const summaryQuestion: SummaryQuestion = props

    const handleAnswerChange = (id: number, value: string) => {
        const singleWord = value.trim().split(" ")[0]
        console.log(`Q${id}: ${singleWord}`)
    }

    const renderPassage = () => {
        // Split on any single line break
        const lines = summaryQuestion.question.passageTemplate.trim().split(/\n/g)

        return lines.map((line, lineIndex) => {
            const parts = line.split(/(<\d+>)/g)

            return (
                <div key={lineIndex} className="mb-4">
                    {parts.map((part, index) => {
                        const match = part.match(/^<(\d+)>$/)
                        if (match) {
                            const id = parseInt(match[1])
                            return (
                                <span key={index} className="inline-flex items-center mx-1">
                                    <span className="font-bold mr-2">{id}</span>
                                    <AnswerInput
                                        questionNumber={id}
                                        placeholder="____"
                                        className="w-32 text-center font-medium mr-1"
                                    />
                                </span>
                            )
                        }
                        return <span key={index}>{part}</span>
                    })}
                </div>
            )
        })
    }


    // sentence completion- Selecting from list of words/phrases
    const renderOptionList = () => {
        const list = summaryQuestion.question.optionList
        if (!list) return null

        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border border-border p-6 rounded-3xl">
                {list.map((item) => (
                    <div key={item.letter} className="text-sm font-medium text-foreground">
                        <span className="font-bold mr-2">{item.letter}</span>
                        {item.text}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    Questions {summaryQuestion.question.id[0]} - {summaryQuestion.question.id.at(-1)}
                </CardTitle>
                <p className="text-sm font-medium text-muted-foreground">
                    {summaryQuestion.question.optionList ?
                        `Complete the summary using the list of words or phrases below. Choose the correct letter from the list on your answer sheet.` :
                        `Complete the summary below. Write NO MORE THAN ${summaryQuestion.multiWord ? `THREE WORDS` : `ONE WORD`} ${" "} from the text in each box.`
                    }
                </p>


            </CardHeader>

            <CardContent className="space-y-6 mt-2" >

                {renderOptionList()}

                <div className="bg-muted/50 p-6 rounded-3xl">
                    <h3 className="text-xl font-bold text-center mb-6">
                        {summaryQuestion.question.title}
                    </h3>
                    <div className="text-base leading-relaxed space-y-4">{renderPassage()}</div>
                </div>
            </CardContent>
        </Card>
    )
}