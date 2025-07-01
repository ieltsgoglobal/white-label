// lib/partner-function.ts
"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role key securely on the server side only
)

interface OrgData {
    name: string
    phone: string
    address: string
    email: string
    gst: string
    pan: string
}

export async function registerPartner(data: OrgData) {
    const { name, phone, address, email, gst, pan } = data

    if (!name || !email) {
        return { error: "Name and Email are required." }
    }

    // push data in table
    const { error } = await supabase.from("organization").insert({
        name, phone, address, email, gst, pan
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}