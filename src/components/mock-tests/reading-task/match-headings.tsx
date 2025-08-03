"use client"
import { Input } from "@/components/ui/input"
import AnswerInput from "../additional-ui/AnswerInput"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface Heading {
    number: string
    text: string
}

interface MatchHeadingsData {
    headings: Heading[]
    id: number[]
}

interface MatchHeadingsSection {
    questionType: "match-headings"
    question: MatchHeadingsData
}

export default function MatchHeadings(props: MatchHeadingsSection) {
    const section: MatchHeadingsSection = props

    const handleAnswerChange = (questionId: number, answer: string) => {
        console.log(`Q${questionId} = ${answer}`)
    }

    //convert index into ABCD
    const getSectionLabel = (index: number) => `Section ${String.fromCharCode(65 + index)}`

    return (
        <Card className="w-full rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    Questions {section.question.id[0]} - {section.question.id[section.question.id.length - 1]}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                    The text has {section.question.id.length} sections,{" "}
                    <span className="font-bold">
                        {String.fromCharCode(65)} - {String.fromCharCode(65 + section.question.id.length - 1)}
                    </span>
                    . Choose the correct heading for each section from the list of headings below. Write the correct number,{" "}
                    <span className="font-bold">
                        {section.question.headings[0].number} - {section.question.headings[section.question.headings.length - 1].number}
                    </span>
                    , in boxes{" "}
                    <span className="font-bold">
                        {section.question.id[0]} - {section.question.id[section.question.id.length - 1]}
                    </span>
                    .
                </p>
            </CardHeader>

            {/* Headings */}
            <div className="mb-8 p-6 border-2 border-border rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">List of Headings</h3>
                <div className="space-y-2">
                    {section.question.headings.map((heading) => (
                        <div key={heading.number} className="flex items-start space-x-3">
                            <span className="font-bold text-foreground min-w-[32px]">{heading.number}</span>
                            <span className="text-foreground">{heading.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {section.question.id.map((id, index) => (
                    <div key={id} className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg text-foreground min-w-[32px]">{id}</span>
                            <span className="text-foreground font-medium">{getSectionLabel(index)}</span>
                            <AnswerInput
                                className="w-20 h-10 border-2 border-blue-300 focus:border-blue-500 rounded-md px-3 text-center"
                                questionNumber={id}
                                maxLength={4}
                            />
                        </div>

                        {index < section.question.id.length - 1 && <div className="border-b border-border mt-4"></div>}
                    </div>
                ))}
            </div>
        </Card>
    )
}