"use server"

import { createClient } from "@supabase/supabase-js"
import { getSubmitterIdServerSide } from "@/lib/auth/session/check-auth"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type InsertListeningInput = {
    testPath: string
    answers: any
    startedAt: string
    metadata?: any
}

type InsertReadingInput = InsertListeningInput

type InsertWritingInput = {
    testPath: string
    user_responses_with_scores: any
    startedAt: string
    metadata?: any
}

type InsertSpeakingInput = {
    testPath: string
    user_responses: any
    user_scores?: any
    startedAt: string
    metadata?: any
}

export async function insertListeningSubmission({
    testPath,
    answers,
    startedAt,
    metadata = {},
}: InsertListeningInput) {
    const userId = await getSubmitterIdServerSide()

    const { data, error } = await supabase
        .from("practice_sets_listening_submissions")
        .insert({
            user_id: userId,
            test_path: testPath,
            answers,
            started_at: startedAt,
            metadata,
        })
        .select("attempt_id")
        .single()

    if (error) throw new Error(`Failed to insert listening submission: ${error.message}`)

    return { success: true, attempt_id: data.attempt_id }
}

export async function insertReadingSubmission({
    testPath,
    answers,
    startedAt,
    metadata = {},
}: InsertReadingInput) {
    const userId = await getSubmitterIdServerSide()

    const { data, error } = await supabase
        .from("practice_sets_reading_submissions")
        .insert({
            user_id: userId,
            test_path: testPath,
            answers,
            started_at: startedAt,
            metadata,
        })
        .select("attempt_id")
        .single()

    if (error) throw new Error(`Failed to insert reading submission: ${error.message}`)

    return { success: true, attempt_id: data.attempt_id }
}

export async function insertWritingSubmission({
    testPath,
    user_responses_with_scores,
    startedAt,
    metadata = {},
}: InsertWritingInput) {
    const userId = await getSubmitterIdServerSide()

    const { data, error } = await supabase
        .from("practice_sets_writing_submissions")
        .insert({
            user_id: userId,
            test_path: testPath,
            user_responses_with_scores,
            started_at: startedAt,
            metadata,
        })
        .select("id")
        .single()

    if (error) throw new Error(`Failed to insert writing submission: ${error.message}`)

    return { success: true, id: data.id }
}

export async function insertSpeakingSubmission({
    testPath,
    user_responses,
    user_scores = null,
    startedAt,
    metadata = {},
}: InsertSpeakingInput) {
    const userId = await getSubmitterIdServerSide()

    const { data, error } = await supabase
        .from("practice_sets_speaking_submissions")
        .insert({
            user_id: userId,
            test_path: testPath,
            user_responses,
            user_scores,
            started_at: startedAt,
            metadata,
        })
        .select("id")
        .single()

    if (error) throw new Error(`Failed to insert speaking submission: ${error.message}`)

    return { success: true, id: data.id }
}

export async function getPracticeSetsListeningSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean } = {}) {
    const userId = await getSubmitterIdServerSide()
    if (!userId) return null

    const { data, error } = await supabase
        .from("practice_sets_listening_submissions")
        .select(returnOnlyTestPaths ? "test_path" : "*")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(20)

    if (error) throw new Error(`Failed to fetch listening submissions: ${error.message}`)

    return data
}

export async function getPracticeSetsReadingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean } = {}) {
    const userId = await getSubmitterIdServerSide()
    if (!userId) return null

    const { data, error } = await supabase
        .from("practice_sets_reading_submissions")
        .select(returnOnlyTestPaths ? "test_path" : "*")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(20)

    if (error) throw new Error(`Failed to fetch reading submissions: ${error.message}`)

    return data
}

export async function getPracticeSetsWritingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean } = {}) {
    const userId = await getSubmitterIdServerSide()
    if (!userId) return null

    const { data, error } = await supabase
        .from("practice_sets_writing_submissions")
        .select(returnOnlyTestPaths ? "test_path" : "*")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(20)

    if (error) throw new Error(`Failed to fetch writing submissions: ${error.message}`)

    return data
}

export async function getPracticeSetsSpeakingSubmissions({ returnOnlyTestPaths = false }: { returnOnlyTestPaths?: boolean } = {}) {
    const userId = await getSubmitterIdServerSide()
    if (!userId) return null

    const { data, error } = await supabase
        .from("practice_sets_speaking_submissions")
        .select(returnOnlyTestPaths ? "test_path" : "*")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(20)

    if (error) throw new Error(`Failed to fetch speaking submissions: ${error.message}`)

    return data
}
