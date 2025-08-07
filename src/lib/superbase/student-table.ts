"use server"

import { createClient } from "@supabase/supabase-js"
import { checkCredits, deductCredit } from "./organization-table"
import { createStudentSchemaServer } from "../schemas/student/create-student-schema"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role key securely on the server side only
)

// Create a new student
export async function createStudent(rawInput: unknown) {

    // 0. Validate input using Zod
    const parseResult = createStudentSchemaServer.safeParse(rawInput)
    if (!parseResult.success) {
        return { error: parseResult.error.errors[0]?.message ?? "Invalid input." }
    }

    const { name, username, password, revenue, teacher_id, orgId } = parseResult.data


    // 1. check credits are available or not
    const creditResult = await checkCredits(orgId)
    if ("error" in creditResult) {
        return { error: creditResult.error }
    }
    if (creditResult.credits < 1) {
        return { error: "Insufficient credits." }
    }

    // 2. Check if username already exists for this org
    const { data: existing, error: existingError } = await supabase
        .from("student")
        .select("id")
        .eq("username", username)
        .eq("org_id", orgId)
        .maybeSingle()

    if (existingError) {
        return { error: "Failed to check existing usernames." }
    }

    if (existing) {
        return { error: "Username already taken." }
    }

    // 3. Insert new student
    const { data: student, error: insertError } = await supabase
        .from("student")
        .insert([{ name, username, password, revenue, teacher_id, org_id: orgId }])
        .select()
        .single()

    if (insertError) {
        return { error: "Failed to create student." }
    }

    // 4. Deduct credit
    const creditDeductionResult = await deductCredit(orgId)
    if ("error" in creditDeductionResult) {
        return {
            error: "Student created but failed to deduct credit.",
            student,
        }
    }

    return { success: true, student }
}

// Get all students by org ID
export async function getStudentsByOrg(orgId: string) {
    const { data, error } = await supabase
        .from("student")
        .select("*")
        .eq("org_id", orgId)

    return { data, error }
}

// Delete student by ID
export async function deleteStudentById(studentId: string) {
    const { error } = await supabase
        .from("student")
        .delete()
        .eq("id", studentId)

    return { error }
}

// Optional: Update student password
export async function updateStudentPassword(studentId: string, newPassword: string) {
    const { error } = await supabase
        .from("student")
        .update({ password: newPassword })
        .eq("id", studentId)

    return { error }
}

// Log in a student by username and password
export async function loginStudent(username: string, password: string) {
    if (!username || !password) {
        return { error: "Username and password are required." }
    }

    // 1. Fetch the student by username
    const { data, error } = await supabase
        .from("student")
        .select("*")
        .eq("username", username)
        .single()

    if (error || !data) {
        return { error: "Student not found or invalid credentials." }
    }

    // 2. Compare passwords (plain for now; hash later if needed)
    if (data.password !== password) {
        return { error: "Incorrect password." }
    }

    // 3. Return student data (optional: exclude password)
    const { password: _, ...studentData } = data

    return { success: true, student: studentData }
}

// Get all students by teacher ID
export async function getStudentsByTeacherId(teacherId: string) {
    const { data, error } = await supabase
        .from("student")
        .select("*")
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false })

    if (error) {
        return { error: error.message }
    }

    return { students: data }
}