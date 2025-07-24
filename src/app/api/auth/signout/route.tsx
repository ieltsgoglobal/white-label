// app/api/auth/signout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    cookies().set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0, // Expires immediately
    });

    return NextResponse.json({ message: "Signed out successfully" }, { status: 200 });
}