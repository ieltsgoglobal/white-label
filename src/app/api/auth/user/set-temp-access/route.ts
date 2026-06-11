// give user temp access
// mean write is_member: true for "USER cookie"

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "@/lib/superbase/user-table";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;

export async function POST(req: Request) {
    try {

        // Get current token
        const cookieStore = cookies();
        const existingToken = cookieStore.get("token")?.value;

        if (!existingToken) {
            return NextResponse.json(
                { error: "No existing session token found" },
                { status: 401 }
            );
        }

        // Decode old token to preserve all user details
        let decoded: any;
        try {
            decoded = jwt.verify(existingToken, JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await getUserById(decoded.userId);

        // Create new token with latest membership from Supabase
        const newToken = jwt.sign(
            {
                userId: user.id,
                userName: user.name,
                role: decoded.role,
                is_member: user.is_member,
            },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        // Replace the cookie
        cookies().set({
            name: "token",
            value: newToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: ONE_MONTH_SECONDS,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}