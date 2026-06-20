import { createOrGetGoogleUser } from "@/lib/superbase/user-table"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30
const googleClientId = process.env.GOOGLE_CLIENT_ID!
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

export async function POST(request: Request) {

    try {
        const { credential } = await request.json()

        const googleUser = await verifyGoogleCredential(credential)

        const user = await createOrGetGoogleUser(googleUser)

        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.name,
                role: "user",
                is_member: user.is_member,
            },
            JWT_SECRET,
            { expiresIn: "30d" }
        )

        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: ONE_MONTH_SECONDS,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Google login failed:", error)
        return NextResponse.json({ error: "Google login failed." }, { status: 401 })
    }
}

// ===================================
// ========= GOOGLE VERIFY ===========
// ===================================

async function verifyGoogleCredential(credential: string) {
    if (!credential) { throw new Error("Google credential is required.") }

    const client = new OAuth2Client(googleClientId)

    const ticket = await client.verifyIdToken({ idToken: credential, audience: googleClientId })

    const payload = ticket.getPayload()

    if (!payload?.sub || !payload.email || !payload.email_verified) {
        throw new Error("Google account email is not verified.")
    }

    return {
        googleSub: payload.sub,
        email: payload.email,
        name: payload.name?.trim() || payload.email.split("@")[0],
    }
}