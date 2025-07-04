// lib/partner-function.ts
"use server"

import bcrypt from "bcryptjs"
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
    password: string
    gst: string
    pan: string
    subdomain: string
}

export async function registerPartner(data: OrgData) {
    const { name, phone, address, email, password, gst, pan, subdomain } = data

    if (!name || !email) {
        return { error: "Name and Email are required." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    // push data in table
    const { error } = await supabase.from("organization").insert({
        name, phone, address, email, password: hashedPassword, gst, pan, subdomain
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}


// to check if subdomain exists or to return 404 error
export async function getAllSubdomains(): Promise<{ subdomains: string[] } | { error: string }> {
    const { data, error } = await supabase
        .from("organization")
        .select("subdomain")

    if (error) {
        return { error: error.message }
    }

    // extract just the subdomain strings
    const subdomains = data.map((org) => org.subdomain)
    return { subdomains }
}


// organization login checker
export async function loginPartner(email: string, password: string) {
    const { data, error } = await supabase
        .from("organization")
        .select("*")
        .eq("email", email)
        .single()

    if (error || !data) {
        return { error: "Invalid email or organization not found." }
    }

    const passwordMatch = await bcrypt.compare(password, data.password)

    if (!passwordMatch) {
        return { error: "Incorrect password." }
    }

    // Remove password before returning data (optional)
    const { password: _, ...orgData } = data

    return { success: true, org: orgData }
}


// Check organization credits (for before creating student)
export async function checkCredits(orgId: string): Promise<{ credits: number } | { error: string }> {
    const { data, error } = await supabase
        .from("organization")
        .select("credits")
        .eq("id", orgId)
        .single()

    if (error || !data) {
        return { error: "Organization not found or failed to fetch credits." }
    }

    return { credits: data.credits ?? 0 }
}


// Deduct 1 credit from organization (for while creating user)
export async function deductCredit(orgId: string): Promise<{ success: true } | { error: string }> {
    // Get current credits
    const { data, error } = await supabase
        .from("organization")
        .select("credits")
        .eq("id", orgId)
        .single()

    if (error || !data) {
        return { error: "Organization not found." }
    }

    const currentCredits = data.credits ?? 0

    if (currentCredits < 1) {
        return { error: "Insufficient credits." }
    }

    // Deduct 1 credit
    const { error: updateError } = await supabase
        .from("organization")
        .update({ credits: currentCredits - 1 })
        .eq("id", orgId)

    if (updateError) {
        return { error: "Failed to deduct credit." }
    }

    return { success: true }
}