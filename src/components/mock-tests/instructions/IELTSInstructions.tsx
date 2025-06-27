"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Headphones, BookOpen, PenTool, Mic, AlertTriangle, CheckCircle, Info } from "lucide-react"

const testSections = [
    {
        id: "listening",
        title: "Listening",
        duration: "30 minutes",
        questions: "40 questions",
        icon: Headphones,
        color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
        id: "reading",
        title: "Reading",
        duration: "60 minutes",
        questions: "40 questions",
        icon: BookOpen,
        color: "bg-green-100 text-green-800 border-green-200",
    },
    {
        id: "writing",
        title: "Writing",
        duration: "60 minutes",
        questions: "2 tasks",
        icon: PenTool,
        color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
        id: "speaking",
        title: "Speaking",
        duration: "11-14 minutes",
        questions: "3 parts",
        icon: Mic,
        color: "bg-purple-100 text-purple-800 border-purple-200",
    },
]

export default function IELTSInstructions() {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">IELTS Test Instructions</h1>
                    <p className="text-gray-600">International English Language Testing System</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="listening">Listening</TabsTrigger>
                        <TabsTrigger value="reading">Reading</TabsTrigger>
                        <TabsTrigger value="writing">Writing</TabsTrigger>
                        <TabsTrigger value="speaking">Speaking</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Info className="h-5 w-5" />
                                    Test Overview
                                </CardTitle>
                                <CardDescription>
                                    The IELTS test assesses your English language skills across four areas
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {testSections.map((section) => {
                                        const IconComponent = section.icon
                                        return (
                                            <div key={section.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                                <div className="flex-shrink-0">
                                                    <IconComponent className="h-8 w-8 text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{section.title}</h3>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {section.duration}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-xs">
                                                            {section.questions}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <Alert>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Total Test Time:</strong> Approximately 2 hours and 45 minutes
                                    </AlertDescription>
                                </Alert>

                                <div className="mt-6 space-y-4">
                                    <h3 className="font-semibold text-lg">General Instructions</h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            Arrive at the test center 30 minutes before your scheduled time
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            Bring valid identification (passport or national ID)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            No electronic devices, bags, or personal items allowed in the test room
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            Use only pencil for Listening and Reading; pen for Writing
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            Follow all instructions given by the test supervisor
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="listening" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Headphones className="h-5 w-5" />
                                    Listening Test Instructions
                                </CardTitle>
                                <CardDescription>30 minutes • 40 questions • 4 sections</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 justify-center py-2">
                                        <Clock className="h-4 w-4 mr-1" />
                                        30 minutes
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 justify-center py-2">40 questions</Badge>
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 justify-center py-2">4 sections</Badge>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Test Structure</h3>
                                    <div className="space-y-3">
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Section 1: Social Context</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Conversation between two people (e.g., booking accommodation)
                                            </p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 1-10
                                            </Badge>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Section 2: Social Context</h4>
                                            <p className="text-sm text-gray-600 mt-1">Monologue (e.g., speech about local facilities)</p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 11-20
                                            </Badge>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Section 3: Educational Context</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Conversation between 2-4 people (e.g., students discussing assignment)
                                            </p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 21-30
                                            </Badge>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Section 4: Educational Context</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Monologue on academic subject (e.g., university lecture)
                                            </p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 31-40
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Important:</strong> You will hear each recording only once. Write your answers as you
                                        listen.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Key Instructions</h3>
                                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                        <li>• Answer all questions in the order they appear</li>
                                        <li>• Transfer answers to answer sheet during the 10-minute transfer time</li>
                                        <li>• Check spelling and grammar carefully</li>
                                        <li>• Follow word limits exactly (e.g., "NO MORE THAN TWO WORDS")</li>
                                        <li>• Use pencil only</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reading" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Reading Test Instructions
                                </CardTitle>
                                <CardDescription>60 minutes • 40 questions • 3 passages</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Badge className="bg-green-100 text-green-800 border-green-200 justify-center py-2">
                                        <Clock className="h-4 w-4 mr-1" />
                                        60 minutes
                                    </Badge>
                                    <Badge className="bg-green-100 text-green-800 border-green-200 justify-center py-2">
                                        40 questions
                                    </Badge>
                                    <Badge className="bg-green-100 text-green-800 border-green-200 justify-center py-2">3 passages</Badge>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Test Structure</h3>
                                    <div className="space-y-3">
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Passage 1</h4>
                                            <p className="text-sm text-gray-600 mt-1">General interest topic, easier difficulty</p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 1-13/14
                                            </Badge>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Passage 2</h4>
                                            <p className="text-sm text-gray-600 mt-1">Work-related or general academic topic</p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 14/15-27
                                            </Badge>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-medium">Passage 3</h4>
                                            <p className="text-sm text-gray-600 mt-1">Complex academic topic, most difficult</p>
                                            <Badge variant="outline" className="mt-2">
                                                Questions 28-40
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <Alert>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Time Management:</strong> No extra time for transferring answers. Write directly on the
                                        answer sheet.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Question Types</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div>• Multiple choice</div>
                                        <div>• True/False/Not Given</div>
                                        <div>• Yes/No/Not Given</div>
                                        <div>• Matching headings</div>
                                        <div>• Sentence completion</div>
                                        <div>• Summary completion</div>
                                        <div>• Short answer questions</div>
                                        <div>• Diagram labeling</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Key Instructions</h3>
                                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                        <li>• Read instructions carefully for each question type</li>
                                        <li>• Manage your time: approximately 20 minutes per passage</li>
                                        <li>• Answer all questions, even if you're unsure</li>
                                        <li>• Check spelling and grammar</li>
                                        <li>• Use pencil only</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="writing" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PenTool className="h-5 w-5" />
                                    Writing Test Instructions
                                </CardTitle>
                                <CardDescription>60 minutes • 2 tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 justify-center py-2">
                                        <Clock className="h-4 w-4 mr-1" />
                                        60 minutes
                                    </Badge>
                                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 justify-center py-2">2 tasks</Badge>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Test Structure</h3>
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Task 1</h4>
                                                <Badge variant="outline">20 minutes</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Describe visual information (graph, chart, table, diagram, or map)
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    Minimum 150 words
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs">
                                                    33% of total score
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Task 2</h4>
                                                <Badge variant="outline">40 minutes</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Write an essay responding to a point of view, argument, or problem
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    Minimum 250 words
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs">
                                                    67% of total score
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Recommendation:</strong> Spend more time on Task 2 as it carries more weight in your final
                                        score.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Assessment Criteria</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <div className="font-medium">Task Achievement/Response</div>
                                            <div className="text-gray-600">How well you answer the question</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Coherence & Cohesion</div>
                                            <div className="text-gray-600">Organization and linking of ideas</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Lexical Resource</div>
                                            <div className="text-gray-600">Vocabulary range and accuracy</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Grammatical Range & Accuracy</div>
                                            <div className="text-gray-600">Grammar variety and correctness</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Key Instructions</h3>
                                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                        <li>• Use pen (not pencil) for writing tasks</li>
                                        <li>• Write clearly and legibly</li>
                                        <li>• Plan your time: 20 minutes for Task 1, 40 minutes for Task 2</li>
                                        <li>• Meet minimum word requirements</li>
                                        <li>• Answer both tasks completely</li>
                                        <li>• Check your work for errors</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="speaking" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mic className="h-5 w-5" />
                                    Speaking Test Instructions
                                </CardTitle>
                                <CardDescription>11-14 minutes • 3 parts • Face-to-face interview</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 justify-center py-2">
                                        <Clock className="h-4 w-4 mr-1" />
                                        11-14 minutes
                                    </Badge>
                                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 justify-center py-2">3 parts</Badge>
                                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 justify-center py-2">
                                        1-on-1 interview
                                    </Badge>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Test Structure</h3>
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Part 1: Introduction & Interview</h4>
                                                <Badge variant="outline">4-5 minutes</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                General questions about yourself, family, work, studies, and interests
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                Topics: Home, family, work, studies, hobbies, interests, etc.
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Part 2: Long Turn</h4>
                                                <Badge variant="outline">3-4 minutes</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Speak for 1-2 minutes on a given topic after 1 minute preparation
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                1 minute preparation + 1-2 minutes speaking + follow-up questions
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Part 3: Discussion</h4>
                                                <Badge variant="outline">4-5 minutes</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Discussion of abstract ideas related to Part 2 topic</p>
                                            <div className="text-xs text-gray-500">More complex questions requiring analysis and opinion</div>
                                        </div>
                                    </div>
                                </div>

                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Note:</strong> The speaking test may be scheduled on a different day from the other tests.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Assessment Criteria</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <div className="font-medium">Fluency & Coherence</div>
                                            <div className="text-gray-600">Speaking smoothly and logically</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Lexical Resource</div>
                                            <div className="text-gray-600">Vocabulary range and accuracy</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Grammatical Range & Accuracy</div>
                                            <div className="text-gray-600">Grammar variety and correctness</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">Pronunciation</div>
                                            <div className="text-gray-600">Clear speech and natural rhythm</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Key Instructions</h3>
                                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                        <li>• Speak clearly and at natural pace</li>
                                        <li>• Don't memorize answers - be natural and spontaneous</li>
                                        <li>• Ask for clarification if you don't understand</li>
                                        <li>• Extend your answers with examples and explanations</li>
                                        <li>• Stay calm and confident</li>
                                        <li>• The test is recorded for assessment purposes</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
