"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import WritingQuestionDisplay from "./writingQuestionDisplay"
import WritingPagination from "./writing-paginaiton"

export default function WritingMain({ test_id }: { test_id: string }) {
    const [activeTab, setActiveTab] = useState(1)
    const [responses, setResponses] = useState<{ [key: number]: string }>({
        1: "",
        2: ""
    })

    const response = responses[activeTab]
    const setResponse = (val: string) => {
        setResponses((prev) => ({ ...prev, [activeTab]: val }))
    }

    const wordCount = response.trim() === "" ? 0 : response.trim().split(/\s+/).length
    const minimumWords = activeTab === 1 ? 150 : 250

    // Global Questions Data
    const writingQuestions = [
        {
            id: 1,
            timeLimit: "You should spend about 20 minutes on this task.",
            wordLimit: "Write at least 150 words.",
            prompt: [
                "The bar chart below gives information about the sales of electric cars in China, Europe, and the United States between 2016 and 2023.",
                "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
            ],
            image_url: "https://toeflbank-rest-api-production.s3.amazonaws.com/content/ielts/writing_question/image/WritingTask1_IELTS9_7000514fd16a4a62b482f06fbd37316f_ad454e7463b24b46b6124f1d8bc8f635.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWIENLWII7MD4MYBE%2F20250624%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250624T070418Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aDmFwLW5vcnRoZWFzdC0yIkcwRQIgHKDj20DsFU0GRsBco1caCNk%2FBqUuP6k4km4%2Fq6yAFfkCIQDvMDcsJm5aW0F4ZRWlpo3Q%2F5mb%2FHsnKmxNfUfoKkiwySqIBAgnEAIaDDQyOTc5MzE5NDUxMyIMkZgzWJ3pQIyp84UlKuUDPce9DTqvVRMI8LXzZK%2Fa8MGPzoPaNdBQ5YluDPKjuCzZtLSIAiVE2Gk5nFB4lHH2PuNBSOf%2FNd99DbHcSwuPJNzBy47T9WFtc75UmhoWLvz%2B79vLw1dhjBGVgUgobakVOkDToPNuCaKIE3yY5vadjOSdpHw7p6nkbgW5ExwiKy8ZeVI03KsPh%2Bb%2Bi6Q4Y3M2mPq%2BYrHwzRMFKF42d281%2B2Lacv6bhuu1i2lC2EX4QH6yD6MmXWmqBi22oSQy7lFh8L4I5OjrCIKoDln1m24YiKJ2%2B35jFbLUhEgy8wqTNCq9pOTR2oLlfZx0Aw0mwAfRdoyDpxk9L48o6Eh7uyJFnA983H38OH5wEBUSoJR820rceDDaNXaHZtUJHUpL3yY8CYieXaCvlxYnfzk3SbNKyijB40ELgJH%2Fj%2F0V1vEoUJDvXym8HnKBnQ7jIigR3v6y6S%2B%2Bj0xRUfFvWZ1MHOcTKWgrhmvSQMkmC%2BKdpuTsMY5lc%2BJrYLa7bZcL6QGJ%2BK58Wg1gssU8rgcYJNcw46mje6BEVmBi8ESS0i2XujBMbInnhmLXuX49ubJkUCGXXV5nQBuWVnINKQ17lSpInfMW9cB%2FSs9FPggzFU0vfz60%2Fqm%2F32qw%2BBlAt%2FL6gqqITxofZIfcabkwwoHpwgY6pQG%2FTFDzE6%2FxdtZ3vrnwrfvNIXO%2F5upKjH4ng0BgmLOMKsOAWUafdIe9k2kB3NIGHn%2ByFfvzvi2hvHBOtogk9MJinrT5IpVHMnGY3Io1J61X%2F3ihj9E%2FxxqE8D89NgVOIMeX0SdyiDAmnXJzH4MyezG7lcKlQQlQ7dGGfvAvwwhJsROHxjKC05LwSuhbORy%2B0%2Be1NHLRUFAnzoIT9F09GrmFkgVjLRc%3D&X-Amz-Signature=7f51577f5c24debfe04803f494084065ae410d7b5debf51393a78fc999ec218a"
        },
        {
            id: 2,
            timeLimit: "You should spend about 40 minutes on this task.",
            wordLimit: "Write at least 250 words.",
            prompt: [
                "Movies and television shows should not be used to study history due to their lack of historical accuracy.",
                "To what extent do you agree or disagree with this statement?",
                "Give reasons for your answer and include any relevant examples from your own knowledge or experience."
            ],
        }
    ]

    const currentQuestion = writingQuestions[activeTab - 1]

    return (
        <>

            <WritingQuestionDisplay
                currentQuestion={currentQuestion}
                response={response}
                setResponse={setResponse}
                wordCount={wordCount}
                minimumWords={minimumWords}
            />

            <WritingPagination
                activeTab={activeTab}
                totalTabs={writingQuestions.length}
                setActiveTab={setActiveTab}
            />
        </>
    )
}
