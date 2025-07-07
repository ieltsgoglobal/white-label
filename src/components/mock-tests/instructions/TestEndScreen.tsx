// components/TestEndScreen.tsx
"use client"

import { Button } from "@/components/ui/button"
import { submitAllMockAnswers } from "@/lib/firebase/firebase-functions"
import { useRouter } from "next/navigation"

export default function TestEndScreen() {
    const router = useRouter()

    const handleSubmit = async () => {
        // take answers from localstorage and save them in firebase 
        await submitAllMockAnswers() // also deletes the mock-answers localStorage
        router.push("/mock-tests/summary")
    }
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-transparent">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl w-full text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    You have reached the end of the test
                </h1>
                <p className="text-gray-600 mb-1">All of your answers have been saved.</p>
                <p className="text-gray-600 mb-6">
                    Please click the end test button below to finish the test.
                </p>
                <Button onClick={handleSubmit} className="w-48 text-white bg-black hover:bg-gray-800">
                    End Test
                </Button>
            </div>
        </div>
    )
}