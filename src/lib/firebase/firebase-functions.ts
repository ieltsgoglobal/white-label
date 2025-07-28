import { db } from "./firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { clearMockAnswers, getMockAnswers } from "@/lib/mock-tests/mockAnswersStorage"
import { MockTestAttempt } from "@/types/mockTestAttempt"
import { getSessionUser } from "../auth/session/get-user"

/**
 * Save listening answers at mock-tests/{studentId}/{auto-id}
 */

// submit reading, writing, speaking, listeing and thier scores

export async function submitAllMockAnswers() {
    try {
        // ✅ Get testId from the pathname: "/mock-tests/1"
        const pathname = window?.location?.pathname || ""
        const segments = pathname.split("/") // ["", "mock-tests", "1"]
        const testId = segments[2] // ⛔ Add validation if needed

        // Get studentId from indexedDB
        const user = await getSessionUser()
        if (!user || user.role !== "student") {
            console.error("Missing or invalid student session")
            return
        }
        const studentId = user.studentId


        // ✅ Get all local answers from localstorage
        const answers = getMockAnswers()
        if (!answers) {
            console.error("No mock answers found in localStorage.")
            return
        }

        // ✅ Firestore path: mock-tests/{studentId}/attempts/{auto-id}
        const attemptsRef = collection(db, "mock-tests", studentId, "attempts")
        await addDoc(attemptsRef, {
            testId,
            listening: answers.listening,
            reading: answers.reading,
            speaking: answers.speaking,
            writing: answers.writing,
            scores: answers.scores || {},
            timestamp: new Date().toISOString(),
        })

        console.log("Mock test answers successfully submitted.")

        //clear the localstorage mock-answers
        clearMockAnswers()
    } catch (error) {
        console.error("Failed to submit mock answers:", error)
    }
}


// when user check its scores
export async function getAllMockTestAttempts(studentIdParam?: string) {
    try {

        // if teacher is checkign then we pass student id
        let studentId = studentIdParam

        // If no studentId is passed, use logged-in student
        if (!studentId) {
            const user = await getSessionUser()
            if (!user || user.role !== "student") {
                console.error("Missing or invalid student session")
                return []
            }
            studentId = user.studentId
        }

        // Firestore path: mock-tests/{studentId}/attempts
        const attemptsRef = collection(db, "mock-tests", studentId, "attempts")
        const snapshot = await getDocs(attemptsRef)

        const attempts: MockTestAttempt[] = snapshot.docs.map((doc) => {
            const data = doc.data()

            return {
                id: doc.id,
                testId: data.testId,
                timestamp: data.timestamp,
                listening: data.listening,
                reading: data.reading,
                speaking: data.speaking,
                writing: data.writing,
                scores: data.scores,
            }
        })

        return attempts
    } catch (error) {
        console.error("Failed to fetch mock test attempts:", error)
        return []
    }
}
