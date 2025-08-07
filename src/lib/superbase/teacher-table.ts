// lib/teacher-table.ts
"use server"

import { createClient } from "@supabase/supabase-js"
import { createTeacherSchemaServer } from "../schemas/teacher/create-teacher-schema"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface TeacherData {
    name: string
    username: string
    password: string
    org_id: string
}

export type Teacher = {
    id: string
    name: string
    username: string
    password: string
    org_id: string | null
    created_at: string
}



export async function createTeacher(data: TeacherData): Promise<{ success: true } | { error: string }> {

    // Zod Schema Validation
    const result = createTeacherSchemaServer.safeParse({
        ...data,
        orgId: data.org_id,
    })
    if (!result.success) {
        const message = result.error.issues[0]?.message ?? "Validation failed"
        return { error: message }
    }

    const { name, username, password, orgId } = result.data

    // Check for duplicate username
    const { data: existing, error: checkError } = await supabase
        .from("teacher")
        .select("id")
        .eq("username", username)
        .single()

    if (existing) {
        return { error: "Username already exists." }
    }

    if (checkError && checkError.code !== "PGRST116") {
        return { error: checkError.message }
    }

    const { error } = await supabase.from("teacher").insert({
        name,
        username,
        password,
        org_id: orgId,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function getTeachersByOrgId(org_id: string): Promise<{ teachers: Teacher[] } | { error: string }> {
    const { data, error } = await supabase
        .from("teacher")
        .select("*")
        .eq("org_id", org_id)
        .order("created_at", { ascending: false })

    if (error) {
        return { error: error.message }
    }

    return { teachers: data }
}

export async function loginTeacher(username: string, password: string): Promise<
    | { teacher: Teacher }
    | { error: string }
> {
    const { data, error } = await supabase
        .from("teacher")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single()

    if (error || !data) {
        return { error: "Invalid username or password." }
    }

    return { teacher: data }
}