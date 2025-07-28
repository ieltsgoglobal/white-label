// lib/teacher-table.ts
"use server"

import { createClient } from "@supabase/supabase-js"

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
    const { name, username, password, org_id } = data

    if (!name || !username || !password || !org_id) {
        return { error: "All fields are required." }
    }

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
        org_id,
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