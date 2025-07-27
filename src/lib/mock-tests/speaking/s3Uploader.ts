export async function uploadAudioToS3(blob: Blob, filename: string): Promise<string | null> {
    const formData = new FormData()
    formData.append("file", blob)
    formData.append("filename", filename)

    try {
        const res = await fetch("/api/speaking-evaluation/s3-upload", {
            method: "POST",
            body: formData,
            credentials: "include",
        })

        if (!res.ok) {
            console.error("Upload failed with status:", res.status)
            return null
        }

        const data = await res.json()
        return data.url as string
    } catch (err) {
        console.error("Upload error:", err)
        return null
    }
}