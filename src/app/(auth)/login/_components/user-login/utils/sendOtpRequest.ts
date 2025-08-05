export async function sendOtpRequest(to: string, encryptedOtp: string) {
    const res = await fetch("/api/auth/user/whapi/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, encryptedOtp }),
    })

    const result = await res.json()

    if (!res.ok) throw new Error(result.error || "Failed to send OTP")
    return result
}