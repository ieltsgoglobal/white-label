"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // use SERVICE ROLE key on the server
)

type CreateUserInput = {
    name: string
    phone: string
    is_member?: boolean
    membership_type?: string
    membership_started_at?: string
    membership_expires_at?: string
    membership_status?: string
    last_payment_id?: string
    last_payment_amount?: number
    last_payment_at?: string
}

export async function createOrGetUser(input: CreateUserInput) {
    const {
        name,
        phone,
        is_member = false,
        membership_type = null,
        membership_started_at = null,
        membership_expires_at = null,
        membership_status = null,
        last_payment_id = null,
        last_payment_amount = null,
        last_payment_at = null,
    } = input

    if (!name.trim() || !phone.trim()) {
        throw new Error("Name and phone are required.")
    }

    // Step 1: Check if user already exists
    const { data: existingUser, error: findError } = await supabase
        .from("user")
        .select("*")
        .eq("phone", phone)
        .maybeSingle()

    if (findError) {
        throw new Error(`Failed to check for existing user: ${findError.message}`)
    }

    if (existingUser) return existingUser

    // Step 2: Create new user if not exists
    const { data: newUser, error: insertError } = await supabase
        .from("user")
        .insert([
            {
                name,
                phone,
                is_member,
                membership_type,
                membership_started_at,
                membership_expires_at,
                membership_status,
                last_payment_id,
                last_payment_amount,
                last_payment_at,
            },
        ])
        .select("*")
        .single()

    if (insertError) {
        throw new Error(`Failed to create user: ${insertError.message}`)
    }

    console.log("newUser", newUser)
    return newUser
}