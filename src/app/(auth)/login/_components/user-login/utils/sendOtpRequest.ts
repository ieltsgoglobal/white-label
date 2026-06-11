// =====================================================
// ======== MAKE REQ TO TWILLIO FOR SENDING OTP ==========
// =====================================================

export async function sendOtpRequest(to: string, encryptedOtp: string) {
    const res = await fetch("/api/auth/user/twillio/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to })
    })

    const result = await res.json()

    if (!res.ok) throw new Error(result.error || "Failed to send OTP")
    return result
}

export async function verifyOtpRequest(to: string, code: string) {
    const res = await fetch("/api/auth/user/twillio/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ to, code }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to verify OTP");
    return result;
}

// =====================================================
// ======== MAKE REQ TO WHAPI FOR SENDING OTP ==========
// =====================================================

// export async function sendOtpRequest(to: string, encryptedOtp: string) {
//     const res = await fetch("/api/auth/user/whapi/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ to, encryptedOtp }),
//     })

//     const result = await res.json()

//     if (!res.ok) throw new Error(result.error || "Failed to send OTP")
//     return result
// }