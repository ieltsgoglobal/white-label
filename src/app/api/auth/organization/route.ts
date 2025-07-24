import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { loginPartner } from "@/lib/superbase/organization-table"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const result = await loginPartner(email, password)

    if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 401 })
    }

    const orgId = result.org.id
    const organizationName = result.org.name

    const token = jwt.sign(
        {
            orgId,
            organizationName,
            role: "organization"
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    )

    cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    })

    return NextResponse.json(true)
}