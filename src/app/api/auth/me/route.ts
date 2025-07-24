import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { SessionUser } from "@/lib/auth/session/get-user"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

export async function GET() {
    const token = cookies().get("token")?.value

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as SessionUser

        switch (decoded.role) {
            case "student":
                return NextResponse.json({
                    role: "student",
                    studentId: decoded.studentId,
                    studentName: decoded.studentName
                })
            case "organization":
                return NextResponse.json({
                    role: "organization",
                    orgId: decoded.orgId,
                    organizationName: decoded.organizationName
                })
            case "teacher":
                return NextResponse.json({
                    role: "teacher",
                    teacherId: decoded.teacherId,
                })
            default:
                return NextResponse.json({ error: "Invalid role" }, { status: 400 })
        }
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
}