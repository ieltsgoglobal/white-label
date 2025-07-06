import { getStudentId } from "../login/indexedDB"
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"

/**
 * Save listening answers at mock-tests/{studentId}/{auto-id}
 */
export async function saveListeningAnswersFlat(listeningAnswers: Record<number, string>) {

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

    const attemptsRef = collection(db, "mock-tests", studentId, "attempts")

    await addDoc(attemptsRef, {
        testId,
        listening: listeningAnswers,
        timestamp: new Date().toISOString(),
    })
}