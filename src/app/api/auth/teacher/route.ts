// app/api/teacher/login/route.ts
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { loginTeacher } from "@/lib/superbase/teacher-table"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"

export async function POST(req: Request) {
    const { username, password } = await req.json()

    const result = await loginTeacher(username, password)

    if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 401 })
    }

    const teacherId = result.teacher.id
    const teacherName = result.teacher.name

    const token = jwt.sign(
        {
            teacherId,
            teacherName,
            role: "teacher"
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