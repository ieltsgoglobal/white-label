// lib/auth/check-auth.ts
// used in server components auth

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key");

export async function requireRole(role: string) {
    const token = cookies().get("token")?.value;
    if (!token) {
        redirect(`/login/${role}`);
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        if (payload.role !== role) {
            redirect(`/login/${role}`);
        }

        return payload;
    } catch {
        redirect(`/login/${role}`);
    }
}