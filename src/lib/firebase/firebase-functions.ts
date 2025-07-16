import { getStudentId } from "../login/indexedDB"
import { db } from "./firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { clearMockAnswers, getMockAnswers } from "@/lib/mock-tests/mockAnswersStorage"
import { MockTestAttempt } from "@/types/mockTestAttempt"

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
        const studentId = await getStudentId()
        if (!studentId) {
            console.error("Missing student ID")
            return
        }

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


export async function getAllMockTestAttempts() {
    try {
        // Get studentId from indexedDB
        const studentId = await getStudentId()
        if (!studentId) {
            console.error("Missing student ID")
            return []
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