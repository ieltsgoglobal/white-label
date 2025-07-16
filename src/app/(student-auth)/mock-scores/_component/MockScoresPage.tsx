"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, FileText, Headphones, BookOpen, Mic, Eye } from "lucide-react"
import { useMockAttempts } from "./MockAttemptContext"
import Link from "next/link"


function getScoreColor(score: number): string {
    if (score >= 7) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 5.5) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (score >= 4) return "bg-orange-100 text-orange-800 border-orange-200"
    return "bg-red-100 text-red-800 border-red-200"
}

function formatDate(timestamp: string): string {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function formatTime(timestamp: string): string {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })
}

export default function MockScoresPage() {
    //Get attempts from Context API
    const { attempts } = useMockAttempts()

    const handleReview = (testId: string) => {
        console.log(`Review test ${testId}`)
    }
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">IELTS Test Overview</h1>
                <p className="text-muted-foreground">Review your test performance and track your progress</p>
            </div>

            <div className="grid gap-6">
                {attempts.map((test, index) => (
                    <Card key={test.id} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Test Attempt #{attempts.length - index}
                                    </CardTitle>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(test.timestamp)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {formatTime(test.timestamp)}
                                        </div>
                                    </div>
                                </div>
                                {/* test.id is the firebase collection id */}
                                <Link href={`/mock-scores/review/${test.id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleReview(test.id)}
                                        className="flex items-center gap-2"
                                    >
                                        <Eye className="h-4 w-4" />
                                        Review
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Listening Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Headphones className="h-5 w-5 text-blue-600" />
                                        <h3 className="font-semibold">Listening</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <Badge
                                            variant="outline"
                                            className={`${getScoreColor(test.scores.listening)} font-mono text-lg px-3 py-1`}
                                        >
                                            {test.scores.listening.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Reading Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-green-600" />
                                        <h3 className="font-semibold">Reading</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <Badge
                                            variant="outline"
                                            className={`${getScoreColor(test.scores.reading)} font-mono text-lg px-3 py-1`}
                                        >
                                            {test.scores.reading.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Writing Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-semibold">Writing</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <Badge
                                            variant="outline"
                                            className={`${getScoreColor(test.scores.writing.overall)} font-mono text-lg px-3 py-1`}
                                        >
                                            {test.scores.writing.overall.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Speaking Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Mic className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-semibold">Speaking</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <Badge
                                            variant="outline"
                                            className={`${getScoreColor(test.scores.speaking.overall_band)} font-mono text-lg px-3 py-1`}
                                        >
                                            {test.scores.speaking.overall_band.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Overall Score */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">Overall Band Score:</span>
                                    <Badge
                                        variant="outline"
                                        className={`${getScoreColor(
                                            (test.scores.listening +
                                                test.scores.reading +
                                                test.scores.writing.overall +
                                                test.scores.speaking.overall_band) /
                                            4,
                                        )} font-mono text-xl px-4 py-2`}
                                    >
                                        {(
                                            (test.scores.listening +
                                                test.scores.reading +
                                                test.scores.writing.overall +
                                                test.scores.speaking.overall_band) /
                                            4
                                        ).toFixed(1)}
                                    </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">Test ID: {test.testId}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {attempts.length === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No test attempts yet</h3>
                        <p className="text-muted-foreground">Start your first IELTS practice test to see your results here.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}