"use client"

import { getSessionUser } from "@/lib/auth/session/get-user"

export default function SpamAuthMe() {
    const handleSpam = async () => {
        for (let i = 0; i < 5; i++) {
            try {
                const user = await getSessionUser()
                console.log(`Call #${i + 1}:`, user)
            } catch (err) {
                console.error(`Call #${i + 1} failed:`, err)
            }
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Spam getSessionUser</h1>
            <button
                onClick={handleSpam}
                style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    background: "black",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                Call getSessionUser 5 times
            </button>
            <p>Click the button and check the console for 5 calls to <code>/api/auth/me</code>.</p>
        </div>
    )
}