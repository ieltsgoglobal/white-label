import { getStudentId } from "@/lib/login/indexedDB"
import { uploadAudioToS3 } from "./s3Uploader" // ✅ use the real uploader


let mediaRecorder: MediaRecorder | null = null
let recordedChunks: Blob[] = []

export const startRecording = async (): Promise<void> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorder = new MediaRecorder(stream)
        recordedChunks = []

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data)
            }
        }

        mediaRecorder.start()
    } catch (error) {
        console.error("🎙️ Error starting recording:", error)
    }
}

export const stopRecordingWithMeta = async (questionId: number): Promise<{ blob: Blob; filename: string } | null> => {
    return new Promise(async (resolve) => {
        if (!mediaRecorder) return resolve(null)


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

        // using timestamp to create unique urls
        const timestamp = Date.now()
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "audio/webm" })
            const filename = `${studentId}test${testId}_q${questionId}_${timestamp}.webm`
            resolve({ blob, filename })
        }

        mediaRecorder.stop()
    })
}   