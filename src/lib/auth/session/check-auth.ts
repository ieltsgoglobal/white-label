// lib/auth/check-auth.ts
// used in server components auth
"use server"

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key");

// check roles for private paths
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



export type SessionPayload = {
    role: "organization" | "student" | "teacher";
    orgId?: string;
    organizationName?: string;
    studentId?: string;
    studentName?: string;
    teacherId?: string;
    teacherName?: string;
};

// for public paths, eg. userNav
export async function getUserSession(): Promise<SessionPayload | null> {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as SessionPayload;
    } catch {
        return null;
    }
}