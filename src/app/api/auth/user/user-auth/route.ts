import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createOrGetUser } from "@/lib/superbase/user-table"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

export async function POST(req: Request) {
    const { name, phone } = await req.json()

    if (!name || !phone) {
        return NextResponse.json({ error: "Name and phone are required." }, { status: 400 })
    }

    try {
        const user = await createOrGetUser({ name, phone })
        console.log(user)

        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.name,
                role: "user",
                is_member: user.is_member
            },
            JWT_SECRET,
            { expiresIn: "1m" }
        )

        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60,
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}