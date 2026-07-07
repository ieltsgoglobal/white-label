"use server"

import { createClient } from "@supabase/supabase-js"
import { WhatsappTemplateUserJourney } from "@/app/(tools)/whatsapp-dashboard/_lib/send-whatsapp-template"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // use SERVICE ROLE key on the server
)

// =======================================
// =============== SMS AUTH ==============
// =======================================


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

    // send first whatsapp message from the whatsappTemplateUserJouney class
    // its a non thread blocking process
    // so if lambda gets killed before its execution the message will not fire [but those are rare cases]
    void WhatsappTemplateUserJourney.sendPracticeReminder(phone).catch(console.error);

    console.log("newUser", newUser)
    return newUser
}

// =======================================
// ============= GOOGLE OAUTH ============
// =======================================


type CreateGoogleUserInput = {
    googleSub: string
    email: string
    name: string
}

export async function createOrGetGoogleUser({ googleSub, email, name }: CreateGoogleUserInput) {

    // Step 1: Check if user already exists
    const { data: existingUser, error: findError } = await supabase
        .from("user")
        .select("*")
        .eq("google_sub", googleSub)
        .maybeSingle()

    if (findError) {
        throw new Error(`Failed to check for existing Google user: ${findError.message}`)
    }

    if (existingUser) return existingUser

    // Step 2: Create new user if not exists
    const { data: newUser, error: insertError } = await supabase
        .from("user")
        .insert({
            name,
            email,
            google_sub: googleSub,
            phone: null,
            is_member: false,
        })
        .select("*")
        .single()

    if (insertError) {
        throw new Error(`Failed to create Google user: ${insertError.message}`)
    }

    return newUser
}



// ===============================================
// =============== GET USER METHODS ==============
// ===============================================

export type UserDetailsFromDB = {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    google_sub: string | null;

    is_member: boolean;
    membership_type: string | null;
    membership_started_at: string | null;
    membership_expires_at: string | null;
    membership_status: string | null;

    last_payment_id: string | null;
    last_payment_amount: number | null;
    last_payment_at: string | null;

    created_at: string;
    updated_at: string;
};

export async function getUserById(userId: string) {
    const { data: user, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single()

    if (error) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }

    return user
}


export async function getAllUsers(offset: number = 0, hasPhoneNumber = false, isMember = false): Promise<UserDetailsFromDB[]> {
    const limit_window = 50
    let query = supabase
        .from("user")
        .select("*")
        .order("created_at", { ascending: false })

    if (hasPhoneNumber) query = query.not("phone", "is", null).neq("phone", "");
    if (isMember) query = query.eq("is_member", true);

    const { data, error } = await query.range(offset, offset + limit_window - 1);

    if (error) throw new Error(`Failed to fetch users: ${error.message}`)

    return data;
}
