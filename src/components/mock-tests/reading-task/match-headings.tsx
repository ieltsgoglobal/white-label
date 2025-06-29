"use client"
import { Input } from "@/components/ui/input"

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
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Questions {section.question.id[0]} - {section.question.id[section.question.id.length - 1]}
                </h2>
                <p className="text-gray-700 leading-relaxed">
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
            </div>

            {/* Headings */}
            <div className="mb-8 p-6 border-2 border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">List of Headings</h3>
                <div className="space-y-2">
                    {section.question.headings.map((heading) => (
                        <div key={heading.number} className="flex items-start space-x-3">
                            <span className="font-bold text-gray-900 min-w-[32px]">{heading.number}</span>
                            <span className="text-gray-800">{heading.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {section.question.id.map((id, index) => (
                    <div key={id} className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg text-gray-900 min-w-[32px]">{id}</span>
                            <span className="text-gray-800 font-medium">{getSectionLabel(index)}</span>
                            <Input
                                className="w-20 h-10 border-2 border-blue-300 focus:border-blue-500 rounded-md px-3 text-center"
                                onChange={(e) => handleAnswerChange(id, e.target.value)}
                                placeholder=""
                                maxLength={4}
                            />
                        </div>

                        {index < section.question.id.length - 1 && <div className="border-b border-gray-100 mt-4"></div>}
                    </div>
                ))}
            </div>
        </div>
    )
}